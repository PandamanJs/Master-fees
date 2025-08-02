import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface SchoolSuggestionRequest {
  partialSchoolName?: string;
  country?: string;
  province?: string;
  district?: string;
  existingSchools: Array<{
    name: string;
    type: string;
    district: string;
  }>;
}

interface SchoolSuggestion {
  name: string;
  type: string;
  district: string;
  confidence: number;
  reasoning: string;
}

export async function generateSchoolSuggestions({
  partialSchoolName,
  country,
  province,
  district,
  existingSchools
}: SchoolSuggestionRequest): Promise<SchoolSuggestion[]> {
  try {
    const prompt = `You are an AI assistant specializing in educational institutions in ${country || 'Zambia'}. 
    
Based on the following information, suggest 3-5 most likely schools:
- Partial school name: "${partialSchoolName || 'Not provided'}"
- Country: ${country || 'Zambia'}
- Province: ${province || 'Not specified'}
- District: ${district || 'Not specified'}

Here are existing schools in the database for reference:
${existingSchools.slice(0, 20).map(school => `- ${school.name} (${school.type}, ${school.district})`).join('\n')}

Please suggest schools that:
1. Match the partial name if provided
2. Are geographically relevant to the specified location
3. Follow common naming patterns for schools in the region
4. Include a mix of different school types (Primary, Secondary, Combined, etc.)

For each suggestion, provide:
- name: The full school name
- type: School type (Primary School, Secondary School, Combined School, etc.)
- district: Most likely district based on the location info
- confidence: Confidence score (0-1)
- reasoning: Brief explanation for the suggestion

Respond with JSON in this exact format:
{
  "suggestions": [
    {
      "name": "Example School Name",
      "type": "Secondary School",
      "district": "Example District",
      "confidence": 0.85,
      "reasoning": "Matches partial name pattern and is common in the specified region"
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that helps suggest educational institutions based on partial information. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000
    });

    const result = JSON.parse(response.choices[0].message.content || '{"suggestions": []}');
    
    return result.suggestions || [];
  } catch (error) {
    console.error("Error generating school suggestions:", error);
    throw new Error("Failed to generate school suggestions");
  }
}

export async function enhanceSchoolName(partialName: string, location: { country?: string, province?: string, district?: string }): Promise<string[]> {
  try {
    const prompt = `Given the partial school name "${partialName}" in ${location.country || 'Zambia'}, ${location.province || ''}, ${location.district || ''}, 
    suggest 3 complete, realistic school names that could match.
    
    Consider common school naming patterns in the region:
    - [Location] Primary/Secondary School
    - [Name] Combined School
    - St. [Name] School
    - [Community/Area] Community School
    
    Respond with JSON: {"names": ["School Name 1", "School Name 2", "School Name 3"]}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 300
    });

    const result = JSON.parse(response.choices[0].message.content || '{"names": []}');
    return result.names || [];
  } catch (error) {
    console.error("Error enhancing school name:", error);
    return [];
  }
}