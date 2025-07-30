import { useState } from 'react';
import { toast } from "sonner@2.0.3";

interface ClassSelectionData {
  schoolName: string;
  institutionType: string;
  country: string;
  state: string;
  town: string;
  schoolEmail: string;
  contactNumbers: string;
  physicalAddress: string;
  schoolCategories: string;
  schoolLogo: File | null;
  selectedGrades: string[];
  classesPerGrade: number;
  exceptions: string;
  selectedClasses: string[];
}

function BackArrow({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="absolute left-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer group"
    >
      <svg 
        className="w-6 h-6 text-[#003049] group-hover:text-[#004060] transition-colors" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
    </button>
  );
}

function Frame1707478788({ 
  selectedClasses, 
  setSelectedClasses, 
  availableClasses 
}: { 
  selectedClasses: string[];
  setSelectedClasses: (classes: string[]) => void;
  availableClasses: string[];
}) {
  const handleClassToggle = (className: string) => {
    if (selectedClasses.includes(className)) {
      setSelectedClasses(selectedClasses.filter(c => c !== className));
    } else {
      setSelectedClasses([...selectedClasses, className]);
    }
  };

  const handleSelectAll = () => {
    if (selectedClasses.length === availableClasses.length) {
      setSelectedClasses([]);
    } else {
      setSelectedClasses([...availableClasses]);
    }
  };

  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 top-48 translate-x-[-50%] w-[871px]"
      style={{ left: "calc(50% + 0.5px)" }}
    >
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-center w-full">
        <p className="block leading-[20px]">
          Select the classes you want to group
        </p>
      </div>
      <div className="h-[383px] relative rounded-lg shrink-0 w-full">
        <div className="absolute border border-[#9ca0a4] border-solid inset-0 pointer-events-none rounded-lg" />
        <div className="absolute inset-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Select All Button */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleSelectAll}
                className="bg-[#003049] text-white px-4 py-2 rounded text-sm hover:bg-[#004060] transition-colors"
              >
                {selectedClasses.length === availableClasses.length ? 'Deselect All' : 'Select All'}
              </button>
              <div className="text-sm text-gray-600">
                {selectedClasses.length} of {availableClasses.length} classes selected
              </div>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-3 gap-3">
              {availableClasses.map((className) => (
                <button
                  key={className}
                  onClick={() => handleClassToggle(className)}
                  className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                    selectedClasses.includes(className)
                      ? 'bg-[#3ed4af] border-[#3ed4af] text-white shadow-md'
                      : 'bg-white border-[#9ca0a4] text-[#000000] hover:border-[#003049] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] text-[14px]">
                      {className}
                    </div>
                    {selectedClasses.includes(className) && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* No classes available message */}
            {availableClasses.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p>No classes available.</p>
                <p className="mt-1 text-sm">Please go back and set up your grades and classes per grade.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1707478787({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-[#003049] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-8 py-2.5 rounded-[10px] top-[665px] translate-x-[-50%] hover:bg-[#004060] transition-colors cursor-pointer"
      style={{ left: "calc(50% + 0.5px)" }}
    >
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[17px] text-left text-nowrap">
        <p className="block leading-[1.2] whitespace-pre">
          Proceed to Onboarding
        </p>
      </div>
    </button>
  );
}

export default function ClassSelectionPage({ 
  onComplete, 
  onBack,
  completePricingData
}: { 
  onComplete: (formData: ClassSelectionData) => void;
  onBack: () => void;
  completePricingData: {
    schoolName: string;
    institutionType: string;
    country: string;
    state: string;
    town: string;
    schoolEmail: string;
    contactNumbers: string;
    physicalAddress: string;
    schoolCategories: string;
    schoolLogo: File | null;
    selectedGrades: string[];
    classesPerGrade: number;
    exceptions: string;
  };
}) {
  // Generate available classes based on selected grades and classes per grade
  const generateAvailableClasses = (): string[] => {
    const classes: string[] = [];
    
    completePricingData.selectedGrades.forEach(grade => {
      for (let i = 1; i <= completePricingData.classesPerGrade; i++) {
        classes.push(`${grade} Class ${i}`);
      }
    });
    
    return classes;
  };

  const availableClasses = generateAvailableClasses();
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const handleProceed = () => {
    if (selectedClasses.length === 0) {
      toast.error("Please select at least one class to continue");
      return;
    }

    const finalData: ClassSelectionData = {
      ...completePricingData,
      selectedClasses
    };
    
    toast.success(`${selectedClasses.length} classes selected successfully!`);
    onComplete(finalData);
  };

  const handleBack = () => {
    toast.info("Returning to pricing structure");
    onBack();
  };

  return (
    <div 
      className="bg-[#ffffff] relative size-full" 
      data-name="Onboarding"
    >
      <BackArrow onBack={handleBack} />
      
      <Frame1707478788 
        selectedClasses={selectedClasses}
        setSelectedClasses={setSelectedClasses}
        availableClasses={availableClasses}
      />
      
      <div className="absolute flex flex-col font-['IBM_Plex_Sans_Devanagari:Bold',_sans-serif] justify-center leading-[0] left-[252px] not-italic text-[#000000] text-[32px] text-left text-nowrap top-[151px] translate-y-[-50%]">
        <p className="block leading-[1.2] whitespace-pre">Pricing Structure</p>
      </div>
      
      <Frame1707478787 onClick={handleProceed} />
    </div>
  );
}