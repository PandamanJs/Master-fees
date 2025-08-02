import { useQuery } from '@tanstack/react-query';
import { Building2, Plus } from 'lucide-react';

interface School {
  name: string;
  type: string;
  district: string;
}

interface SchoolSuggestionsProps {
  query: string;
  onSelect: (schoolName: string) => void;
}

export function SchoolSuggestions({ query, onSelect }: SchoolSuggestionsProps) {
  const { data: schoolsData, isLoading } = useQuery({
    queryKey: ['/api/schools/zambia', query],
    enabled: query.length > 1,
  });

  const schools = (schoolsData as { schools: School[] })?.schools || [];
  
  // Filter schools based on query
  const filteredSchools = schools.filter((school: School) =>
    school.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5); // Limit to 5 suggestions

  if (isLoading) {
    return (
      <div className="p-3 text-slate-400 text-sm text-center">
        Searching schools...
      </div>
    );
  }

  return (
    <div className="py-2">
      {/* Show matching schools */}
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
      
      {/* Custom school option */}
      <button
        type="button"
        onClick={() => onSelect(query)}
        className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors duration-150 flex items-center gap-3 border-t border-slate-600/20"
      >
        <Plus className="w-4 h-4 text-emerald-400" />
        <div>
          <div className="text-white font-medium">Use "{query}"</div>
          <div className="text-slate-400 text-xs">Add as custom school</div>
        </div>
      </button>
      
      {filteredSchools.length === 0 && (
        <div className="px-4 py-3 text-slate-400 text-sm">
          No schools found. You can still use "{query}" as your school name.
        </div>
      )}
    </div>
  );
}