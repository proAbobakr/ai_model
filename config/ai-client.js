import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config.js';
import { logger } from './logger.js';

/**
 * Unified AI Client
 * Provides a consistent interface for all AI providers
 */
class AIClient {
  constructor() {
    this.provider = config.aiProvider;
    this.initializeClients();
  }

  initializeClients() {
    // Initialize OpenAI
    if (config.openaiApiKey) {
      this.openai = new OpenAI({
        apiKey: config.openaiApiKey,
      });
    }

    // Initialize Anthropic
    if (config.anthropicApiKey) {
      this.anthropic = new Anthropic({
        apiKey: config.anthropicApiKey,
      });
    }

    // Initialize Google Gemini
    if (config.geminiApiKey) {
      this.gemini = new GoogleGenerativeAI(config.geminiApiKey);
    }

    // Initialize Kimi2 (Moonshot AI) - Uses OpenAI-compatible API
    if (config.kimi2ApiKey) {
      this.kimi2 = new OpenAI({
        apiKey: config.kimi2ApiKey,
        baseURL: config.kimi2BaseUrl,
      });
    }

    // Initialize Grok (xAI) - Uses OpenAI-compatible API
    if (config.grokApiKey) {
      this.grok = new OpenAI({
        apiKey: config.grokApiKey,
        baseURL: config.grokBaseUrl,
      });
    }
  }

  /**
   * Generate completion with the configured AI provider
   * @param {string} systemPrompt - System instructions
   * @param {string} userPrompt - User message
   * @param {Object} options - Additional options (temperature, maxTokens, etc.)
   * @returns {Promise<Object>} - AI response
   */
  async generateCompletion(systemPrompt, userPrompt, options = {}) {
    const {
      temperature = 0.7,
      maxTokens = 4000,
      provider = this.provider,
    } = options;

    try {
      switch (provider) {
        case 'openai':
          return await this.generateOpenAI(systemPrompt, userPrompt, temperature, maxTokens);

        case 'anthropic':
          return await this.generateAnthropic(systemPrompt, userPrompt, temperature, maxTokens);

        case 'gemini':
          return await this.generateGemini(systemPrompt, userPrompt, temperature, maxTokens);

        case 'kimi2':
          return await this.generateKimi2(systemPrompt, userPrompt, temperature, maxTokens);

        case 'grok':
          return await this.generateGrok(systemPrompt, userPrompt, temperature, maxTokens);

        default:
          throw new Error(`Unsupported AI provider: ${provider}`);
      }
    } catch (error) {
      logger.error(`Error generating completion with ${provider}:`, error);
      throw error;
    }
  }

  /**
   * Generate completion with OpenAI
   */
  async generateOpenAI(systemPrompt, userPrompt, temperature, maxTokens) {
    if (!this.openai) {
      throw new Error('OpenAI client not initialized. Check API key.');
    }

    const response = await this.openai.chat.completions.create({
      model: config.openaiModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature,
      max_tokens: maxTokens,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    return {
      content,
      parsed: this.parseJSON(content),
      provider: 'openai',
      model: config.openaiModel
    };
  }

  /**
   * Generate completion with Anthropic Claude
   */
  async generateAnthropic(systemPrompt, userPrompt, temperature, maxTokens) {
    if (!this.anthropic) {
      throw new Error('Anthropic client not initialized. Check API key.');
    }

    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    const response = await this.anthropic.messages.create({
      model: config.anthropicModel,
      max_tokens: maxTokens,
      temperature,
      messages: [{
        role: 'user',
        content: fullPrompt
      }]
    });

    const content = response.content[0].text;
    return {
      content,
      parsed: this.parseJSON(content),
      provider: 'anthropic',
      model: config.anthropicModel
    };
  }

  /**
   * Generate completion with Google Gemini
   */
  async generateGemini(systemPrompt, userPrompt, temperature, maxTokens) {
    if (!this.gemini) {
      throw new Error('Gemini client not initialized. Check API key.');
    }

    const model = this.gemini.getGenerativeModel({
      model: config.geminiModel,
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
      }
    });

    const fullPrompt = `${systemPrompt}\n\n${userPrompt}\n\nProvide your response in JSON format.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const content = response.text();

    return {
      content,
      parsed: this.parseJSON(content),
      provider: 'gemini',
      model: config.geminiModel
    };
  }

  /**
   * Generate completion with Kimi2 (Moonshot AI)
   */
  async generateKimi2(systemPrompt, userPrompt, temperature, maxTokens) {
    if (!this.kimi2) {
      throw new Error('Kimi2 client not initialized. Check API key.');
    }

    const response = await this.kimi2.chat.completions.create({
      model: config.kimi2Model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature,
      max_tokens: maxTokens,
    });

    const content = response.choices[0].message.content;
    return {
      content,
      parsed: this.parseJSON(content),
      provider: 'kimi2',
      model: config.kimi2Model
    };
  }

  /**
   * Generate completion with Grok (xAI)
   */
  async generateGrok(systemPrompt, userPrompt, temperature, maxTokens) {
    if (!this.grok) {
      throw new Error('Grok client not initialized. Check API key.');
    }

    const response = await this.grok.chat.completions.create({
      model: config.grokModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature,
      max_tokens: maxTokens,
    });

    const content = response.choices[0].message.content;
    return {
      content,
      parsed: this.parseJSON(content),
      provider: 'grok',
      model: config.grokModel
    };
  }

  /**
   * Parse JSON from AI response
   */
  parseJSON(content) {
    try {
      // Try to extract JSON from code blocks
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) ||
                       content.match(/```\s*([\s\S]*?)\s*```/) ||
                       content.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        return JSON.parse(jsonStr);
      }

      // Try parsing the entire content
      return JSON.parse(content);
    } catch (error) {
      logger.warn('Failed to parse JSON from AI response');
      return { content, format: 'text' };
    }
  }

  /**
   * Get available providers
   */
  getAvailableProviders() {
    const providers = [];
    if (config.openaiApiKey) providers.push('openai');
    if (config.anthropicApiKey) providers.push('anthropic');
    if (config.geminiApiKey) providers.push('gemini');
    if (config.kimi2ApiKey) providers.push('kimi2');
    if (config.grokApiKey) providers.push('grok');
    return providers;
  }

  /**
   * Check if a provider is available
   */
  isProviderAvailable(provider) {
    return this.getAvailableProviders().includes(provider);
  }

  /**
   * Get current provider
   */
  getCurrentProvider() {
    return this.provider;
  }

  /**
   * Switch provider temporarily for a request
   */
  async generateWithProvider(provider, systemPrompt, userPrompt, options = {}) {
    if (!this.isProviderAvailable(provider)) {
      throw new Error(`Provider ${provider} is not available. Check API key configuration.`);
    }

    return await this.generateCompletion(systemPrompt, userPrompt, {
      ...options,
      provider
    });
  }
}

// Export singleton instance
export const aiClient = new AIClient();
export default AIClient;
