import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Search, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface School {
  name: string;
  type: string;
  district: string;
}

interface SchoolSearchDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SchoolSearchDropdown({ 
  value, 
  onChange, 
  placeholder = "Search for your school...", 
  className 
}: SchoolSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch schools data with search query
  const { data: schoolsData, isLoading } = useQuery({
    queryKey: ['/api/schools/lusaka', searchQuery],
    enabled: isOpen || searchQuery.length > 0,
  });

  const schools = (schoolsData as { schools: School[] })?.schools || [];

  // Filter schools based on search query
  const filteredSchools = schools.filter((school: School) =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSchool = (schoolName: string) => {
    onChange(schoolName);
    setSearchQuery('');
    setIsOpen(false);
  };

  const displayValue = value || placeholder;

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full border-0 bg-slate-700/30 backdrop-blur-sm text-white placeholder:text-slate-400 focus:bg-slate-600/30 focus:ring-2 focus:ring-emerald-400/30 rounded-xl h-12 text-center px-4 flex items-center justify-between transition-all duration-200",
          value ? "text-white" : "text-slate-400",
          className
        )}
      >
        <span className="truncate flex-1 text-center">
          {displayValue}
        </span>
        <ChevronDown className={cn(
          "w-4 h-4 ml-2 transition-transform duration-200",
          isOpen ? "rotate-180" : ""
        )} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="ultra-glass-light backdrop-blur-xl rounded-xl shadow-2xl border border-slate-600/20 max-h-80 overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-slate-600/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search schools..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border-0 rounded-lg text-white placeholder:text-slate-400 focus:bg-slate-600/50 focus:ring-2 focus:ring-emerald-400/30 text-sm"
                  autoFocus
                />
              </div>
            </div>

            {/* School List */}
            <div className="max-h-60 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-slate-400">
                  <div className="animate-spin w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full mx-auto mb-2"></div>
                  Loading schools...
                </div>
              ) : filteredSchools.length > 0 ? (
                <div className="py-2">
                  {filteredSchools.map((school: School, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleSelectSchool(school.name)}
                      className="w-full px-4 py-3 text-left hover:bg-slate-600/30 transition-colors duration-150 flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-white text-sm font-medium group-hover:text-emerald-300">
                          {school.name}
                        </div>
                        <div className="text-slate-400 text-xs capitalize">
                          {school.type} • {school.district}
                        </div>
                      </div>
                      {value === school.name && (
                        <Check className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="p-4 text-center text-slate-400">
                  <div className="text-sm">No schools found matching "{searchQuery}"</div>
                  <div className="text-xs mt-1">Try a different search term</div>
                </div>
              ) : (
                <div className="p-4 text-center text-slate-400 text-sm">
                  Start typing to search for schools
                </div>
              )}
            </div>

            {/* Footer */}
            {filteredSchools.length > 0 && (
              <div className="p-3 border-t border-slate-600/20 text-center">
                <div className="text-xs text-slate-400">
                  {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} found
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}