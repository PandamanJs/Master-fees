import svgPaths from "./svg-sbijk77vqf";

function ConnectionsTitleContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-start leading-[0] p-0 relative shrink-0 text-left text-nowrap"
      data-name="Connections Title Container"
    >
      <div className="font-['Hanken_Grotesk:Regular',_sans-serif] font-normal relative shrink-0 text-[#000000] text-[0px]">
        <p className="block font-['Hanken_Grotesk:Bold',_sans-serif] font-bold leading-[40px] text-[25px] text-nowrap whitespace-pre">
          System Settings
        </p>
      </div>
      <div className="font-['Hanken_Grotesk:Light',_sans-serif] font-light relative shrink-0 text-[#808080] text-[16px]">
        <p className="block leading-[1.3] text-nowrap whitespace-pre">
          Setup and edit system settings and preferences
        </p>
      </div>
    </div>
  );
}

function IconLeft() {
  return (
    <div className="relative shrink-0 size-5" data-name="Icon-left">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Icon-left">
          <path
            d={svgPaths.p2d604c00}
            id="Icon"
            stroke="var(--stroke-0, #475367)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.67"
          />
        </g>
      </svg>
    </div>
  );
}

function TextCursor() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-0.5 items-center justify-start p-0 relative shrink-0"
      data-name="Text + Cursor"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#667185] text-[16px] text-left text-nowrap">
        <p className="block leading-[1.3] whitespace-pre">Search Settings</p>
      </div>
    </div>
  );
}

function LeftContent() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Left Content"
    >
      <IconLeft />
      <TextCursor />
    </div>
  );
}

function InputFrame() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-md shrink-0 w-full"
      data-name="Input Frame"
    >
      <div className="absolute border border-[#e4e7ec] border-solid inset-0 pointer-events-none rounded-md" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-[12px] relative w-full">
          <LeftContent />
        </div>
      </div>
    </div>
  );
}

function LabelFrame() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Label + Frame"
    >
      <InputFrame />
    </div>
  );
}

function InputMasterBox() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Input / Master / Box"
    >
      <LabelFrame />
    </div>
  );
}

function SearchBar() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col h-11 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Search Bar"
    >
      <InputMasterBox />
    </div>
  );
}

function SearchBar1() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col h-11 items-start justify-center p-0 relative shrink-0 w-[379px]"
      data-name="Search bar"
    >
      <SearchBar />
    </div>
  );
}

function Frame1000008233() {
  return (
    <div className="box-border content-stretch flex flex-row gap-5 items-center justify-start p-0 relative shrink-0">
      <SearchBar1 />
    </div>
  );
}

function ConnectionsHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Connections Header"
    >
      <ConnectionsTitleContainer />
      <Frame1000008233 />
    </div>
  );
}

export default function ConnectionsContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-7 items-start justify-start p-0 relative size-full"
      data-name="Connections Container"
    >
      <ConnectionsHeader />
    </div>
  );
}