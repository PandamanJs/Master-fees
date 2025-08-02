// Fallback AI-like suggestions when OpenAI API is unavailable
interface School {
  name: string;
  type: string;
  district: string;
}

interface FallbackSuggestion {
  name: string;
  type: string;
  district: string;
  confidence: number;
  reasoning: string;
}

export function generateFallbackSuggestions({
  partialSchoolName,
  country,
  province,
  district,
  existingSchools
}: {
  partialSchoolName?: string;
  country?: string;
  province?: string;
  district?: string;
  existingSchools: School[];
}): FallbackSuggestion[] {
  const suggestions: FallbackSuggestion[] = [];
  
  // Helper function to calculate similarity score
  const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();
    
    if (s1.includes(s2) || s2.includes(s1)) return 0.9;
    
    // Simple Jaccard similarity for words
    const words1 = s1.split(' ');
    const words2 = s2.split(' ');
    const intersection = words1.filter(word => words2.includes(word));
    const union = Array.from(new Set([...words1, ...words2]));
    
    return intersection.length / union.length;
  };

  if (partialSchoolName && partialSchoolName.length > 2) {
    // Find schools with similar names
    const nameMatches = existingSchools
      .map(school => ({
        ...school,
        similarity: calculateSimilarity(school.name, partialSchoolName)
      }))
      .filter(school => school.similarity > 0.3)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);

    nameMatches.forEach(match => {
      suggestions.push({
        name: match.name,
        type: match.type,
        district: match.district,
        confidence: match.similarity,
        reasoning: `Strong name similarity with existing school in database`
      });
    });
  }

  // Location-based suggestions
  if (district || province) {
    const locationMatches = existingSchools
      .filter(school => {
        if (district && school.district.toLowerCase().includes(district.toLowerCase())) return true;
        if (province && school.district.toLowerCase().includes(province.toLowerCase())) return true;
        return false;
      })
      .slice(0, 2);

    locationMatches.forEach(match => {
      if (!suggestions.find(s => s.name === match.name)) {
        suggestions.push({
          name: match.name,
          type: match.type,
          district: match.district,
          confidence: 0.7,
          reasoning: `Located in the specified region`
        });
      }
    });
  }

  // Generate pattern-based suggestions
  if (partialSchoolName && suggestions.length < 3) {
    const commonPatterns = [
      { suffix: 'Primary School', type: 'Primary School' },
      { suffix: 'Secondary School', type: 'Secondary School' },
      { suffix: 'Combined School', type: 'Combined School' },
      { suffix: 'Community School', type: 'Community School' }
    ];

    const targetDistrict = district || province || 'Central District';
    
    commonPatterns.forEach(pattern => {
      const suggestedName = `${partialSchoolName} ${pattern.suffix}`;
      if (!suggestions.find(s => s.name === suggestedName)) {
        suggestions.push({
          name: suggestedName,
          type: pattern.type,
          district: targetDistrict,
          confidence: 0.6,
          reasoning: `Common naming pattern for schools in the region`
        });
      }
    });
  }

  // If we still need more suggestions, add some location-based patterns
  if (suggestions.length < 3 && (district || province)) {
    const locationName = district || province || 'Central';
    const cleanLocationName = locationName.replace(/\s+(Province|District)$/i, '');
    
    const locationPatterns = [
      `${cleanLocationName} Primary School`,
      `${cleanLocationName} Secondary School`,
      `St. Mary's ${cleanLocationName}`
    ];

    locationPatterns.forEach(name => {
      if (!suggestions.find(s => s.name === name) && suggestions.length < 5) {
        suggestions.push({
          name,
          type: name.includes('Primary') ? 'Primary School' : 'Secondary School',
          district: district || `${cleanLocationName} District`,
          confidence: 0.5,
          reasoning: `Geographic naming pattern common in the area`
        });
      }
    });
  }

  return suggestions.slice(0, 5); // Return max 5 suggestions
}