function Frame1707478689() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 top-[194px] translate-x-[-50%] w-[871px]"
      style={{ left: "calc(50% - 32.5px)" }}
    >
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-center w-full">
        <p className="block leading-[20px]">Official School Email</p>
      </div>
      <div className="h-[57px] relative rounded-lg shrink-0 w-full">
        <div className="absolute border border-[#9ca0a4] border-solid inset-0 pointer-events-none rounded-lg" />
      </div>
    </div>
  );
}

function Frame1707478690() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 top-[304px] translate-x-[-50%] w-[871px]"
      style={{ left: "calc(50% - 32.5px)" }}
    >
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-center w-full">
        <p className="block leading-[20px]">Official Contact Numbers</p>
      </div>
      <div className="h-[57px] relative rounded-lg shrink-0 w-full">
        <div className="absolute border border-[#9ca0a4] border-solid inset-0 pointer-events-none rounded-lg" />
      </div>
    </div>
  );
}

function Frame1707478691() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 top-[419px] translate-x-[-50%] w-[871px]"
      style={{ left: "calc(50% - 32.5px)" }}
    >
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-center w-full">
        <p className="block leading-[20px]">School Physical Address</p>
      </div>
      <div className="h-[57px] relative rounded-lg shrink-0 w-full">
        <div className="absolute border border-[#9ca0a4] border-solid inset-0 pointer-events-none rounded-lg" />
      </div>
    </div>
  );
}

function Frame1707478692() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-center w-full">
        <p className="block leading-[20px]">Select School Categories</p>
      </div>
      <div className="h-[57px] relative rounded-lg shrink-0 w-full">
        <div className="absolute border border-[#9ca0a4] border-solid inset-0 pointer-events-none rounded-lg" />
      </div>
    </div>
  );
}

function Frame1707478693() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-center w-full">
        <p className="block leading-[20px]">Upload School Logo</p>
      </div>
      <div className="h-[57px] relative rounded-lg shrink-0 w-full">
        <div className="absolute border border-[#9ca0a4] border-solid inset-0 pointer-events-none rounded-lg" />
      </div>
    </div>
  );
}

function Frame1707478788() {
  return (
    <div className="absolute box-border content-stretch flex flex-row gap-16 items-center justify-start left-[251px] p-0 top-[534px] w-[872px]">
      <Frame1707478692 />
      <Frame1707478693 />
    </div>
  );
}

function Frame1707478787() {
  return (
    <div
      className="absolute bg-[#003049] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-8 py-2.5 rounded-[10px] top-[664px] translate-x-[-50%]"
      style={{ left: "calc(50% - 32.5px)" }}
    >
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[17px] text-left text-nowrap">
        <p className="block leading-[1.2] whitespace-pre">
          Proceed to Onboarding
        </p>
      </div>
    </div>
  );
}

export default function Onboarding() {
  return (
    <div className="bg-[#ffffff] relative size-full" data-name="Onboarding">
      <Frame1707478689 />
      <Frame1707478690 />
      <Frame1707478691 />
      <Frame1707478788 />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans_Devanagari:Bold',_sans-serif] justify-center leading-[0] left-[252px] not-italic text-[#000000] text-[32px] text-left text-nowrap top-[151px] translate-y-[-50%]">
        <p className="block leading-[1.2] whitespace-pre">
          Detailed School Info
        </p>
      </div>
      <Frame1707478787 />
    </div>
  );
}