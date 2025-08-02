import { useQuery, useMutation } from '@tanstack/react-query';
import { Building2, Plus, Sparkles, Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface School {
  name: string;
  type: string;
  district: string;
}

interface AISuggestion {
  name: string;
  type: string;
  district: string;
  confidence: number;
  reasoning: string;
}

interface SchoolSuggestionsProps {
  query: string;
  onSelect: (schoolName: string) => void;
  country?: string;
  province?: string;
  district?: string;
}

export function SchoolSuggestions({ query, onSelect, country, province, district }: SchoolSuggestionsProps) {
  const { data: schoolsData, isLoading } = useQuery({
    queryKey: ['/api/schools/zambia', query],
    enabled: query.length > 1,
  });

  const schools = (schoolsData as { schools: School[] })?.schools || [];
  
  // Filter schools based on query
  const filteredSchools = schools.filter((school: School) =>
    school.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3); // Limit to 3 to make room for AI suggestions

  // AI suggestions mutation
  const aiSuggestionsMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('/api/schools/ai-suggest', 'POST', {
        partialSchoolName: query,
        country,
        province,
        district
      });
    },
  });

  const aiSuggestions = (aiSuggestionsMutation.data as any)?.suggestions || [];

  const handleAIGenerate = () => {
    if (!aiSuggestionsMutation.isPending) {
      aiSuggestionsMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="p-3 text-slate-400 text-sm text-center">
        Searching schools...
      </div>
    );
  }

  return (
    <div className="py-2">
      {/* Show matching schools from database */}
      {filteredSchools.map((school, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(school.name)}
          className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-150 flex items-center gap-3"
        >
          <Building2 className="w-4 h-4 text-slate-400" />
          <div>
            <div className="text-white font-medium">{school.name}</div>
            <div className="text-slate-400 text-xs">{school.district}</div>
          </div>
        </button>
      ))}

      {/* AI Suggestions Section */}
      {query.length > 2 && (
        <>
          {filteredSchools.length > 0 && <div className="border-t border-slate-600/20 my-2" />}
          
          {/* AI Generate Button */}
          {!aiSuggestionsMutation.data && (
            <button
              type="button"
              onClick={handleAIGenerate}
              disabled={aiSuggestionsMutation.isPending}
              className="w-full px-4 py-3 text-left hover:bg-emerald-600/20 transition-colors duration-150 flex items-center gap-3 bg-emerald-600/10 rounded-lg mx-2 mb-2"
            >
              {aiSuggestionsMutation.isPending ? (
                <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-emerald-400" />
              )}
              <div>
                <div className="text-emerald-400 font-medium">
                  {aiSuggestionsMutation.isPending ? 'Generating AI suggestions...' : 'Get AI school suggestions'}
                </div>
                <div className="text-slate-400 text-xs">One-click intelligent recommendations</div>
              </div>
            </button>
          )}

          {/* AI Suggestions */}
          {aiSuggestions.map((suggestion, index) => (
            <button
              key={`ai-${index}`}
              type="button"
              onClick={() => onSelect(suggestion.name)}
              className="w-full px-4 py-3 text-left hover:bg-emerald-600/20 transition-colors duration-150 flex items-center gap-3"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{suggestion.name}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-600/20 text-emerald-400">
                    {Math.round(suggestion.confidence * 100)}%
                  </span>
                </div>
                <div className="text-slate-400 text-xs">{suggestion.district} • {suggestion.type}</div>
                <div className="text-slate-500 text-xs mt-1">{suggestion.reasoning}</div>
              </div>
            </button>
          ))}

          {aiSuggestionsMutation.isError && (
            <div className="px-4 py-3 text-red-400 text-sm">
              Failed to generate AI suggestions. Please try again.
            </div>
          )}
        </>
      )}
      
      {/* Custom school option */}
      <div className="border-t border-slate-600/20 mt-2" />
      <button
        type="button"
        onClick={() => onSelect(query)}
        className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-150 flex items-center gap-3"
      >
        <Plus className="w-4 h-4 text-emerald-400" />
        <div>
          <div className="text-white font-medium">Use "{query}"</div>
          <div className="text-slate-400 text-xs">Add as custom school</div>
        </div>
      </button>
      
      {filteredSchools.length === 0 && !aiSuggestionsMutation.data && (
        <div className="px-4 py-3 text-slate-400 text-sm">
          No schools found. Try the AI suggestions or use "{query}" as your school name.
        </div>
      )}
    </div>
  );
}