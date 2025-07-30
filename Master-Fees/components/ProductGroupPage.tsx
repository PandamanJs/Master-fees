import { useState } from 'react';
import { toast } from "sonner@2.0.3";

interface ProductGroup {
  id: string;
  name: string;
  classes: string[];
}

interface FinalOnboardingData {
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
  productGroups: ProductGroup[];
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
  productGroups, 
  setProductGroups, 
  availableClasses 
}: { 
  productGroups: ProductGroup[];
  setProductGroups: (groups: ProductGroup[]) => void;
  availableClasses: string[];
}) {
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [editingGroup, setEditingGroup] = useState<string | null>(null);

  const handleAddGroup = () => {
    if (!newGroupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }
    if (selectedClasses.length === 0) {
      toast.error("Please select at least one class for the group");
      return;
    }

    const newGroup: ProductGroup = {
      id: Date.now().toString(),
      name: newGroupName.trim(),
      classes: [...selectedClasses]
    };

    setProductGroups([...productGroups, newGroup]);
    setNewGroupName('');
    setSelectedClasses([]);
    toast.success(`Product group "${newGroup.name}" created successfully`);
  };

  const handleDeleteGroup = (groupId: string) => {
    const groupName = productGroups.find(g => g.id === groupId)?.name;
    setProductGroups(productGroups.filter(g => g.id !== groupId));
    toast.success(`Product group "${groupName}" deleted successfully`);
  };

  const handleEditGroup = (groupId: string) => {
    const group = productGroups.find(g => g.id === groupId);
    if (group) {
      setEditingGroup(groupId);
      setNewGroupName(group.name);
      setSelectedClasses([...group.classes]);
    }
  };

  const handleSaveEdit = () => {
    if (!newGroupName.trim() || !editingGroup) return;
    
    setProductGroups(productGroups.map(group => 
      group.id === editingGroup 
        ? { ...group, name: newGroupName.trim(), classes: [...selectedClasses] }
        : group
    ));
    
    setEditingGroup(null);
    setNewGroupName('');
    setSelectedClasses([]);
    toast.success("Product group updated successfully");
  };

  const handleCancelEdit = () => {
    setEditingGroup(null);
    setNewGroupName('');
    setSelectedClasses([]);
  };

  const handleClassToggle = (className: string) => {
    if (selectedClasses.includes(className)) {
      setSelectedClasses(selectedClasses.filter(c => c !== className));
    } else {
      setSelectedClasses([...selectedClasses, className]);
    }
  };

  // Get classes that are not already assigned to other groups (excluding the one being edited)
  const getAvailableClassesForSelection = () => {
    const assignedClasses = productGroups
      .filter(group => group.id !== editingGroup)
      .flatMap(group => group.classes);
    return availableClasses.filter(className => !assignedClasses.includes(className));
  };

  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 top-[202px] translate-x-[-50%] w-[871px]"
      style={{ left: "calc(50% + 0.5px)" }}
    >
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-center w-full">
        <p className="block leading-[20px]">
          Would you like to Group your selected classes? Create Product Groups. For
          example, Early Childhood, Lower Primary, Junior Secondary, Senior
          Secondary. You can Delete, Add or edit the Classes
        </p>
      </div>
      <div className="h-[383px] relative rounded-lg shrink-0 w-full">
        <div className="absolute border border-[#9ca0a4] border-solid inset-0 pointer-events-none rounded-lg" />
        <div className="absolute inset-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Add/Edit Group Form */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingGroup ? 'Edit Group Name' : 'Group Name'}
                  </label>
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="e.g., Early Childhood"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003049]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Classes
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-20 overflow-y-auto">
                    {getAvailableClassesForSelection().map((className) => (
                      <button
                        key={className}
                        onClick={() => handleClassToggle(className)}
                        className={`px-2 py-1 text-xs rounded border transition-colors ${
                          selectedClasses.includes(className)
                            ? 'bg-[#3ed4af] border-[#3ed4af] text-white'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-[#003049]'
                        }`}
                      >
                        {className}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {editingGroup ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="bg-[#3ed4af] text-white px-4 py-2 rounded text-sm hover:bg-[#36c19e] transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleAddGroup}
                      className="bg-[#003049] text-white px-4 py-2 rounded text-sm hover:bg-[#004060] transition-colors"
                    >
                      Add Group
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Existing Groups */}
            {productGroups.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Product Groups:</h4>
                {productGroups.map((group) => (
                  <div key={group.id} className="bg-white border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{group.name}</h5>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {group.classes.map((className) => (
                            <span
                              key={className}
                              className="inline-block bg-[#e9f1ef] text-[#025864] px-2 py-1 rounded text-xs"
                            >
                              {className}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => handleEditGroup(group.id)}
                          className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded border border-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGroup(group.id)}
                          className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded border border-red-600 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Default suggestion */}
            {productGroups.length === 0 && availableClasses.length > 0 && (
              <div className="text-center text-gray-500 text-sm">
                <p>No product groups created yet.</p>
                <p className="mt-1">Consider creating groups like "Early Childhood", "Primary", "Secondary", etc.</p>
                <p className="mt-1 text-xs">You have {availableClasses.length} selected classes available for grouping.</p>
              </div>
            )}

            {/* No classes available */}
            {availableClasses.length === 0 && (
              <div className="text-center text-gray-500 text-sm">
                <p>No classes available for grouping.</p>
                <p className="mt-1">Please go back and select some classes first.</p>
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
          Complete Setup
        </p>
      </div>
    </button>
  );
}

export default function ProductGroupPage({ 
  onComplete, 
  onBack,
  completePricingData
}: { 
  onComplete: (formData: FinalOnboardingData) => void;
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
    selectedClasses: string[];
  };
}) {
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);

  // Use the selected classes from the previous step
  const availableClasses = completePricingData.selectedClasses;

  const handleProceed = () => {
    const finalData: FinalOnboardingData = {
      ...completePricingData,
      productGroups
    };
    
    toast.success(`Onboarding completed successfully! Welcome to Master-Fees, ${completePricingData.schoolName}!`);
    onComplete(finalData);
  };

  const handleBack = () => {
    toast.info("Returning to class selection");
    onBack();
  };

  return (
    <div 
      className="bg-[#ffffff] relative size-full" 
      data-name="Onboarding"
    >
      <BackArrow onBack={handleBack} />
      
      <Frame1707478788 
        productGroups={productGroups}
        setProductGroups={setProductGroups}
        availableClasses={availableClasses}
      />
      
      <div className="absolute flex flex-col font-['IBM_Plex_Sans_Devanagari:Bold',_sans-serif] justify-center leading-[0] left-[252px] not-italic text-[#000000] text-[32px] text-left text-nowrap top-[151px] translate-y-[-50%]">
        <p className="block leading-[1.2] whitespace-pre">Pricing Structure</p>
      </div>
      
      <Frame1707478787 onClick={handleProceed} />
    </div>
  );
}