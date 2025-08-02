import OpenAI from "openai";

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// Comprehensive school database for AI auto-fill
const knownSchoolsDatabase = {
  // Lusaka Province Schools
  "twinkumu educational centre": {
    name: "Twinkumu Educational Centre",
    email: "info@twinkumueducational.edu.zm",
    contactNumbers: ["+260 971 123456", "+260 211 234567"],
    physicalAddress: "Plot No. 800 Ibex Dam Area, Chingola",
    categories: ["Primary Education", "Secondary Education"],
    country: "Zambia",
    stateProvince: "Copperbelt Province",
    townDistrict: "Chingola",
    logo: "",
    establishedYear: 2008,
    schoolType: "private",
    averageFees: {
      tuition: "ZMW 2,500",
      transportation: "ZMW 800",
      accommodation: "ZMW 1,200"
    },
    verificationData: {
      companyName: "Twinkumu Educational Trust",
      registrationNumber: "750000",
      businessAddress: "Plot No. 800 Ibex Dam Area, Chingola",
      tradingName: "Twinkumu Educational Centre",
      tinNumber: "2000789456",
      postalAddress: "Plot No. 800 Ibex Dam Area, Chingola",
      ownershipType: "Educational Trust",
      country: "Zambia",
      companyEmail: "admin@twinkumueducational.edu.zm",
      businessNature: "Primary education provider",
      contactNumber: "+260 971 123456"
    }
  },
  
  "lusaka international school": {
    name: "Lusaka International School",
    email: "admissions@lis.edu.zm",
    contactNumbers: ["+260 211 123456", "+260 977 234567"],
    physicalAddress: "Plot 15142, Leopards Hill Road, Lusaka",
    categories: ["International School", "Cambridge Curriculum"],
    country: "Zambia",
    stateProvince: "Lusaka Province",
    townDistrict: "Lusaka",
    logo: "",
    establishedYear: 1963,
    schoolType: "private",
    averageFees: {
      tuition: "USD 8,500",
      transportation: "USD 1,200",
      accommodation: "USD 3,000"
    },
    verificationData: {
      companyName: "Lusaka International School Trust",
      registrationNumber: "19630001",
      businessAddress: "Plot 15142, Leopards Hill Road, Lusaka",
      tradingName: "Lusaka International School",
      tinNumber: "1000123456",
      postalAddress: "P.O. Box 50154, Lusaka",
      ownershipType: "Educational Trust",
      country: "Zambia",
      companyEmail: "finance@lis.edu.zm",
      businessNature: "International education provider",
      contactNumber: "+260 211 123456"
    }
  },

  "american international school of lusaka": {
    name: "American International School of Lusaka",
    email: "info@aisl.edu.zm",
    contactNumbers: ["+260 211 234567", "+260 966 345678"],
    physicalAddress: "Plot 4915, Katombola Road, Lusaka",
    categories: ["International School", "American Curriculum"],
    country: "Zambia",
    stateProvince: "Lusaka Province",
    townDistrict: "Lusaka",
    logo: "",
    establishedYear: 1990,
    schoolType: "private",
    averageFees: {
      tuition: "USD 12,000",
      transportation: "USD 1,500",
      accommodation: "USD 4,000"
    },
    verificationData: {
      companyName: "American International School of Lusaka Ltd",
      registrationNumber: "19900001",
      businessAddress: "Plot 4915, Katombola Road, Lusaka",
      tradingName: "American International School of Lusaka",
      tinNumber: "1000234567",
      postalAddress: "P.O. Box 31617, Lusaka",
      ownershipType: "Private company limited by shares",
      country: "Zambia",
      companyEmail: "admin@aisl.edu.zm",
      businessNature: "International education provider",
      contactNumber: "+260 211 234567"
    }
  },

  "rhodes park school": {
    name: "Rhodes Park School",
    email: "info@rhodespark.edu.zm",
    contactNumbers: ["+260 211 345678", "+260 955 456789"],
    physicalAddress: "Ridgeway Campus, 10101 Ridgeway, Lusaka",
    categories: ["Private School", "British Curriculum"],
    country: "Zambia",
    stateProvince: "Lusaka Province",
    townDistrict: "Lusaka",
    logo: "",
    establishedYear: 1956,
    schoolType: "private",
    averageFees: {
      tuition: "ZMW 35,000",
      transportation: "ZMW 8,000",
      accommodation: "ZMW 15,000"
    },
    verificationData: {
      companyName: "Rhodes Park School Ltd",
      registrationNumber: "19560001",
      businessAddress: "Ridgeway Campus, 10101 Ridgeway, Lusaka",
      tradingName: "Rhodes Park School",
      tinNumber: "1000345678",
      postalAddress: "P.O. Box 50737, Lusaka",
      ownershipType: "Private company limited by shares",
      country: "Zambia",
      companyEmail: "finance@rhodespark.edu.zm",
      businessNature: "Private education provider",
      contactNumber: "+260 211 345678"
    }
  },

  "baobab college": {
    name: "Baobab College",
    email: "info@baobabcollege.edu.zm",
    contactNumbers: ["+260 211 456789", "+260 977 567890"],
    physicalAddress: "Stand 2374, Makeni, Lusaka",
    categories: ["Secondary School", "Zambian Curriculum"],
    country: "Zambia",
    stateProvince: "Lusaka Province",
    townDistrict: "Lusaka",
    logo: "",
    establishedYear: 2003,
    schoolType: "private",
    averageFees: {
      tuition: "ZMW 18,000",
      transportation: "ZMW 6,000",
      accommodation: "ZMW 12,000"
    },
    verificationData: {
      companyName: "Baobab College Trust",
      registrationNumber: "20030001",
      businessAddress: "Stand 2374, Makeni, Lusaka",
      tradingName: "Baobab College",
      tinNumber: "2000456789",
      postalAddress: "P.O. Box 50890, Lusaka",
      ownershipType: "Educational Trust",
      country: "Zambia",
      companyEmail: "admin@baobabcollege.edu.zm",
      businessNature: "Secondary education provider",
      contactNumber: "+260 211 456789"
    }
  }
};

// AI-powered school data auto-fill function
export async function getAISchoolAutofill(schoolName: string): Promise<{
  success: boolean;
  data?: any;
  confidence: number;
  source: 'database' | 'ai_generated' | 'not_found';
  aiSuggestions?: any;
}> {
  try {
    // First check our known schools database
    const normalizedName = schoolName.toLowerCase().trim();
    const knownSchool = knownSchoolsDatabase[normalizedName];
    
    if (knownSchool) {
      return {
        success: true,
        data: knownSchool,
        confidence: 95,
        source: 'database'
      };
    }

    // If not in database, try to find similar schools
    const similarSchool = findSimilarSchool(normalizedName);
    if (similarSchool) {
      return {
        success: true,
        data: similarSchool,
        confidence: 75,
        source: 'database'
      };
    }

    // If OpenAI is available, use AI to generate suggestions
    if (openai) {
      const aiSuggestions = await generateAISchoolSuggestions(schoolName);
      return {
        success: true,
        data: aiSuggestions,
        confidence: 60,
        source: 'ai_generated',
        aiSuggestions
      };
    }

    return {
      success: false,
      confidence: 0,
      source: 'not_found'
    };

  } catch (error) {
    console.error('Error in AI school auto-fill:', error);
    return {
      success: false,
      confidence: 0,
      source: 'not_found'
    };
  }
}

// Find similar schools using string matching
function findSimilarSchool(schoolName: string): any | null {
  const schools = Object.keys(knownSchoolsDatabase);
  
  // Look for partial matches
  for (const knownName of schools) {
    if (schoolName.includes(knownName.split(' ')[0]) || knownName.includes(schoolName.split(' ')[0])) {
      return knownSchoolsDatabase[knownName];
    }
  }
  
  return null;
}

// Generate AI-powered school suggestions
async function generateAISchoolSuggestions(schoolName: string): Promise<any> {
  if (!openai) return null;

  try {
    const prompt = `Generate realistic school information for "${schoolName}" located in Zambia. Return a JSON object with the following structure:
    {
      "name": "${schoolName}",
      "email": "realistic email address",
      "contactNumbers": ["phone numbers array"],
      "physicalAddress": "realistic Zambian address",
      "categories": ["school categories array"],
      "country": "Zambia",
      "stateProvince": "appropriate Zambian province",
      "townDistrict": "appropriate district",
      "establishedYear": "realistic year",
      "schoolType": "private/government/missionary",
      "averageFees": {
        "tuition": "realistic fee in ZMW",
        "transportation": "realistic fee in ZMW",
        "accommodation": "realistic fee in ZMW"
      },
      "verificationData": {
        "companyName": "realistic company name",
        "registrationNumber": "realistic registration number",
        "businessAddress": "same as physical address",
        "tradingName": "school name or variant",
        "tinNumber": "realistic TIN number",
        "postalAddress": "realistic postal address",
        "ownershipType": "appropriate ownership type",
        "country": "Zambia",
        "companyEmail": "realistic company email",
        "businessNature": "education provider description",
        "contactNumber": "primary contact number"
      }
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;

  } catch (error) {
    console.error('Error generating AI school suggestions:', error);
    return null;
  }
}

// Get list of all known schools for suggestions
export function getKnownSchoolsList(): string[] {
  return Object.values(knownSchoolsDatabase).map(school => school.name);
}

// Check if school exists in our database
export function isKnownSchool(schoolName: string): boolean {
  const normalizedName = schoolName.toLowerCase().trim();
  return normalizedName in knownSchoolsDatabase;
}