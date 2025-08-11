import OpenAI from 'openai';
import { logger, performanceMonitor } from './middleware/logger';

// Lazy initialization to avoid requiring OPENAI_API_KEY at startup
let openaiInstance: OpenAI | null = null;

const getOpenAI = (): OpenAI => {
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required for AI operations');
    }
    openaiInstance = new OpenAI({ apiKey });
  }
  return openaiInstance;
};

interface ExtractedCVData {
  personalInfo: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    portfolio?: string;
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
    skills: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  summary?: string;
}

interface CVExtractionOptions {
  includeSkillsAnalysis?: boolean;
  includeSalaryEstimate?: boolean;
  includeJobSuggestions?: boolean;
}

export class CVExtractionService {
  private static instance: CVExtractionService;

  private constructor() {}

  public static getInstance(): CVExtractionService {
    if (!CVExtractionService.instance) {
      CVExtractionService.instance = new CVExtractionService();
    }
    return CVExtractionService.instance;
  }

  /**
   * Extract structured data from CV text using OpenAI GPT-4o
   */
  async extractFromText(
    cvText: string, 
    options: CVExtractionOptions = {}
  ): Promise<ExtractedCVData> {
    const monitor = performanceMonitor();
    
    try {
      logger.info('Starting CV text extraction', { 
        textLength: cvText.length,
        options 
      });

      const systemPrompt = this.buildSystemPrompt(options);
      const userPrompt = this.buildUserPrompt(cvText, options);

      const openai = getOpenAI();
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // Latest model as per blueprint
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1, // Low temperature for consistent extraction
      });

      const extractedData = JSON.parse(response.choices[0].message.content || '{}');
      
      monitor.end('CV text extraction');
      logger.info('CV extraction completed successfully', {
        extractedFields: Object.keys(extractedData)
      });

      return this.validateAndFormatData(extractedData);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('CV text extraction failed', { error: errorMessage });
      throw new Error(`CV extraction failed: ${errorMessage}`);
    }
  }

  /**
   * Extract structured data from CV image using OpenAI Vision
   */
  async extractFromImage(
    imageBase64: string,
    options: CVExtractionOptions = {}
  ): Promise<ExtractedCVData> {
    const monitor = performanceMonitor();
    
    try {
      logger.info('Starting CV image extraction', { options });

      const systemPrompt = this.buildSystemPrompt(options);
      const userPrompt = this.buildUserPrompt("Please extract all text and information from this CV image.", options);

      const openai = getOpenAI();
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // Supports vision
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: userPrompt },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                  detail: "high" // High detail for better text extraction
                }
              }
            ]
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
        max_tokens: 4000
      });

      const extractedData = JSON.parse(response.choices[0].message.content || '{}');
      
      monitor.end('CV image extraction');
      logger.info('CV image extraction completed successfully', {
        extractedFields: Object.keys(extractedData)
      });

      return this.validateAndFormatData(extractedData);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('CV image extraction failed', { error: errorMessage });
      throw new Error(`CV image extraction failed: ${errorMessage}`);
    }
  }

  /**
   * Analyze skills and provide recommendations
   */
  async analyzeSkills(extractedData: ExtractedCVData): Promise<{
    skillsAnalysis: {
      strengths: string[];
      gaps: string[];
      recommendations: string[];
    };
    salaryEstimate?: {
      min: number;
      max: number;
      currency: string;
      location: string;
    };
    jobSuggestions?: Array<{
      title: string;
      matchScore: number;
      requiredSkills: string[];
      missingSkills: string[];
    }>;
  }> {
    const monitor = performanceMonitor();
    
    try {
      logger.info('Starting skills analysis');

      const openai = getOpenAI();
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert career advisor and recruiter. Analyze the provided CV data and provide detailed insights about skills, career opportunities, and salary expectations. Respond with valid JSON only.`
          },
          {
            role: "user",
            content: `Analyze this CV data and provide insights: ${JSON.stringify(extractedData)}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      });

      const analysis = JSON.parse(response.choices[0].message.content || '{}');
      
      monitor.end('Skills analysis');
      logger.info('Skills analysis completed successfully');

      return analysis;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Skills analysis failed', { error: errorMessage });
      throw new Error(`Skills analysis failed: ${errorMessage}`);
    }
  }

  private buildSystemPrompt(options: CVExtractionOptions): string {
    return `You are an expert CV/resume parser. Extract structured information from the provided CV text or image and return it as valid JSON.

Required JSON structure:
{
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string", 
    "address": "string",
    "linkedin": "string",
    "portfolio": "string"
  },
  "experience": [
    {
      "title": "string",
      "company": "string", 
      "duration": "string",
      "description": "string",
      "skills": ["array of skills used"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "year": "string",
      "gpa": "string"
    }
  ],
  "skills": {
    "technical": ["array"],
    "soft": ["array"], 
    "languages": ["array"]
  },
  "certifications": [
    {
      "name": "string",
      "issuer": "string", 
      "year": "string"
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["array"],
      "link": "string"
    }
  ],
  "summary": "string"
}

Guidelines:
- Extract all available information accurately
- Normalize dates to consistent format (YYYY or YYYY-YYYY)
- Categorize skills appropriately (technical vs soft skills)
- Clean and standardize company/institution names
- Extract quantifiable achievements where possible
- Return valid JSON only, no additional text
- If information is missing, use null or empty array/string as appropriate`;
  }

  private buildUserPrompt(cvText: string, options: CVExtractionOptions): string {
    let prompt = `Extract structured information from this CV:\n\n${cvText}`;
    
    if (options.includeSkillsAnalysis) {
      prompt += '\n\nAlso include analysis of skill strengths and gaps.';
    }
    
    if (options.includeSalaryEstimate) {
      prompt += '\n\nProvide salary estimation based on experience and skills.';
    }
    
    if (options.includeJobSuggestions) {
      prompt += '\n\nSuggest relevant job opportunities based on the profile.';
    }

    return prompt;
  }

  private validateAndFormatData(data: any): ExtractedCVData {
    // Ensure all required fields exist with proper defaults
    return {
      personalInfo: data.personalInfo || {},
      experience: Array.isArray(data.experience) ? data.experience : [],
      education: Array.isArray(data.education) ? data.education : [],
      skills: {
        technical: Array.isArray(data.skills?.technical) ? data.skills.technical : [],
        soft: Array.isArray(data.skills?.soft) ? data.skills.soft : [],
        languages: Array.isArray(data.skills?.languages) ? data.skills.languages : []
      },
      certifications: Array.isArray(data.certifications) ? data.certifications : [],
      projects: Array.isArray(data.projects) ? data.projects : [],
      summary: data.summary || ''
    };
  }
}

// Export singleton instance
export const cvExtractionService = CVExtractionService.getInstance();