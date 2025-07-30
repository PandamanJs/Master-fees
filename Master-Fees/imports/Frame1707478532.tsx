import svgPaths from "./svg-vlrjf2pwt3";
import { useState } from 'react';

function Frame1707478523({ totalRevenue }: { totalRevenue: number }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#003049] text-left w-[353px] transition-all duration-300">
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center relative shrink-0 text-[16px] tracking-[-0.8px] w-full">
        <p className="block leading-[24px]">Total Revenue</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Medium',_sans-serif] justify-center relative shrink-0 text-[40px] w-full">
        <p className="block leading-[42px] transition-all duration-300 hover:text-[#025864] cursor-default" title={`Exact amount: ${formatCurrency(totalRevenue)}`}>
          {formatCurrency(totalRevenue)}
        </p>
      </div>
    </div>
  );
}

function Frame1707478524({ totalBalance }: { totalBalance: number }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="box-border content-stretch flex flex-col items-end justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#003049] text-right w-[310px] transition-all duration-300">
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center relative shrink-0 text-[16px] tracking-[-0.8px] w-full">
        <p className="block leading-[24px]">Total Balance</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Medium',_sans-serif] justify-center relative shrink-0 text-[40px] w-full">
        <p className="block leading-[40px] transition-all duration-300 hover:text-[#025864] cursor-default" title={`Available balance: ${formatCurrency(totalBalance)}`}>
          {formatCurrency(totalBalance)}
        </p>
      </div>
    </div>
  );
}

function Frame1707478525({ totalRevenue, totalBalance }: { totalRevenue: number; totalBalance: number }) {
  return (
    <div className="box-border content-stretch flex flex-row gap-[257px] items-center justify-start p-0 relative shrink-0 w-[921px] transition-all duration-300">
      <Frame1707478523 totalRevenue={totalRevenue} />
      <Frame1707478524 totalBalance={totalBalance} />
    </div>
  );
}

function Frame1707478530() {
  return (
    <div className="bg-[#f2fcfa] relative rounded-xl shrink-0 w-[921px]">
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start overflow-clip p-0 relative w-[921px]">
        <div className="bg-[#c0f1e5] h-[43px] relative rounded-xl shrink-0 w-[701px]">
          <div className="absolute border border-[#3ed4af] border-solid inset-0 pointer-events-none rounded-xl" />
        </div>
      </div>
      <div className="absolute border-2 border-[#2ed1a9] border-solid inset-0 pointer-events-none rounded-xl" />
    </div>
  );
}

function VuesaxOutlineSetting2() {
  return (
    <div
      className="absolute contents inset-0"
      data-name="vuesax/outline/setting-2"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15 15"
      >
        <g id="setting-2">
          <path
            d={svgPaths.p13db0280}
            fill="var(--fill-0, #003049)"
            id="Vector"
          />
          <path
            d={svgPaths.p24accc80}
            fill="var(--fill-0, #003049)"
            id="Vector_2"
          />
          <g id="Vector_3" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function Setting3() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="setting-2">
      <VuesaxOutlineSetting2 />
    </div>
  );
}

function Frame1707478522({ onSettingsClick }: { onSettingsClick?: () => void }) {
  return (
    <button 
      onClick={onSettingsClick}
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-2 relative shrink-0 hover:bg-[#f0f8f6] transition-colors rounded-md cursor-pointer group"
      aria-label="Open settings"
    >
      <Setting3 />
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003049] text-[12px] text-center text-nowrap group-hover:text-[#025864]">
        <p className="block leading-[24px] whitespace-pre">Settings</p>
      </div>
    </button>
  );
}

function TermDropdown({ selectedTerm, onTermChange }: { selectedTerm: string; onTermChange: (term: string) => Promise<void> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const terms = ['Term 1', 'Term 2', 'Term 3'];

  const handleTermChange = async (term: string) => {
    if (term === selectedTerm) {
      setIsOpen(false);
      return;
    }
    
    try {
      setIsLoading(true);
      await onTermChange(term);
      setIsOpen(false);
    } catch (error) {
      console.error('Error changing term:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-1 px-2 py-1 hover:bg-[#f0f8f6] transition-colors rounded-md group disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Select term"
      >
        <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003049] text-[12px] text-center text-nowrap group-hover:text-[#025864]">
          <p className="block leading-[24px] whitespace-pre">{selectedTerm}</p>
        </div>
        <div className={`size-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          {isLoading ? (
            <svg className="block size-full animate-spin" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <circle cx="6" cy="6" r="4" stroke="#003049" strokeWidth="1" fill="none" strokeDasharray="6 2" />
            </svg>
          ) : (
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#003049" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </button>
      
      {isOpen && !isLoading && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-[80px]">
            {terms.map((term) => (
              <button
                key={term}
                onClick={() => handleTermChange(term)}
                disabled={isLoading}
                className={`w-full text-left px-3 py-2 text-[12px] font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] hover:bg-[#f0f8f6] transition-colors first:rounded-t-md last:rounded-b-md disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedTerm === term ? 'bg-[#e9f1ef] text-[#025864]' : 'text-[#003049]'
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Frame1707478526({ selectedTerm, onTermChange, onSettingsClick }: { 
  selectedTerm: string; 
  onTermChange: (term: string) => Promise<void>; 
  onSettingsClick?: () => void; 
}) {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-[921px]">
      <TermDropdown selectedTerm={selectedTerm} onTermChange={onTermChange} />
      <Frame1707478522 onSettingsClick={onSettingsClick} />
    </div>
  );
}

interface Frame1707478532Props {
  selectedTerm?: string;
  onTermChange?: (term: string) => Promise<void>;
  onSettingsClick?: () => void;
  totalRevenue?: number;
  totalBalance?: number;
}

export default function Frame1707478532({ 
  selectedTerm = 'Term 2', 
  onTermChange = async () => {}, 
  onSettingsClick,
  totalRevenue = 0,
  totalBalance = 0
}: Frame1707478532Props) {
  return (
    <div className="bg-[#f8f8f8] box-border content-stretch flex flex-col gap-[5px] items-center justify-start px-0 py-6 relative size-full">
      <Frame1707478525 totalRevenue={totalRevenue} totalBalance={totalBalance} />
      <Frame1707478530 />
      <Frame1707478526 
        selectedTerm={selectedTerm} 
        onTermChange={onTermChange} 
        onSettingsClick={onSettingsClick} 
      />
    </div>
  );
}