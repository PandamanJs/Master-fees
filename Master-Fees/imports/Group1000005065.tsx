import svgPaths from "./svg-jtzhigyz1t";

function TextCursor() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-0.5 items-center justify-start p-0 relative shrink-0"
      data-name="Text + Cursor"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#98a2b3] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">
          twalumbuaccsdept@gmail.com
        </p>
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
      <TextCursor />
    </div>
  );
}

function IconChevronDown() {
  return (
    <div className="relative shrink-0 size-5" data-name="icon / chevron-down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="icon / chevron-down">
          <path
            d={svgPaths.p3fbe5280}
            fill="var(--fill-0, #667185)"
            id="icon"
          />
        </g>
      </svg>
    </div>
  );
}

function InputFrame() {
  return (
    <div
      className="bg-[#ffffff] h-10 relative rounded-md shrink-0 w-full"
      data-name="Input Frame"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-10 items-center justify-start px-3 py-2 relative w-full">
          <LeftContent />
          <IconChevronDown />
        </div>
      </div>
      <div className="absolute border border-[#bbd2ec] border-solid inset-0 pointer-events-none rounded-md" />
    </div>
  );
}

function LabelFrame() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Label + Frame"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#353b45] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">
          Organization Email Address
        </p>
      </div>
      <InputFrame />
    </div>
  );
}

function TextCursor1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-0.5 items-center justify-start p-0 relative shrink-0"
      data-name="Text + Cursor"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#98a2b3] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">xxxxxxxxxxxxx</p>
      </div>
    </div>
  );
}

function LeftContent1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Left Content"
    >
      <TextCursor1 />
    </div>
  );
}

function IconChevronDown1() {
  return (
    <div className="relative shrink-0 size-5" data-name="icon / chevron-down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="icon / chevron-down">
          <path
            d={svgPaths.p3fbe5280}
            fill="var(--fill-0, #667185)"
            id="icon"
          />
        </g>
      </svg>
    </div>
  );
}

function InputFrame1() {
  return (
    <div
      className="bg-[#ffffff] h-10 relative rounded-md shrink-0 w-full"
      data-name="Input Frame"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-10 items-center justify-start px-3 py-2 relative w-full">
          <LeftContent1 />
          <IconChevronDown1 />
        </div>
      </div>
      <div className="absolute border border-[#bbd2ec] border-solid inset-0 pointer-events-none rounded-md" />
    </div>
  );
}

function LabelFrame1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Label + Frame"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#353b45] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">Password</p>
      </div>
      <InputFrame1 />
    </div>
  );
}

function Frame1000008255() {
  return (
    <div className="box-border content-stretch flex flex-col gap-7 items-start justify-start p-0 relative shrink-0 w-80">
      <LabelFrame />
      <LabelFrame1 />
    </div>
  );
}

function TextCursor2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-0.5 items-center justify-start p-0 relative shrink-0"
      data-name="Text + Cursor"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#98a2b3] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">
          Twalumbu Education Centre
        </p>
      </div>
    </div>
  );
}

function LeftContent2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Left Content"
    >
      <TextCursor2 />
    </div>
  );
}

function IconChevronDown2() {
  return (
    <div className="relative shrink-0 size-5" data-name="icon / chevron-down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="icon / chevron-down">
          <path
            d={svgPaths.p3fbe5280}
            fill="var(--fill-0, #667185)"
            id="icon"
          />
        </g>
      </svg>
    </div>
  );
}

function InputFrame2() {
  return (
    <div
      className="bg-[#ffffff] h-10 relative rounded-md shrink-0 w-full"
      data-name="Input Frame"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-10 items-center justify-start px-3 py-2 relative w-full">
          <LeftContent2 />
          <IconChevronDown2 />
        </div>
      </div>
      <div className="absolute border border-[#bbd2ec] border-solid inset-0 pointer-events-none rounded-md" />
    </div>
  );
}

function LabelFrame2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Label + Frame"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#353b45] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">
          Name of Institution
        </p>
      </div>
      <InputFrame2 />
    </div>
  );
}

function Frame1000008257() {
  return (
    <div className="box-border content-stretch flex flex-col gap-7 items-start justify-start p-0 relative shrink-0 w-full">
      <LabelFrame2 />
    </div>
  );
}

function IconImage() {
  return (
    <div
      className="absolute left-1/2 size-10 translate-x-[-50%] translate-y-[-50%]"
      data-name="icon-image"
      style={{ top: "calc(50% - 1px)" }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
      >
        <g id="icon-image">
          <g id="Shape">
            <path
              clipRule="evenodd"
              d={svgPaths.p302c4c00}
              fill="var(--fill-0, #C3D7EE)"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p3380b100}
              fill="var(--fill-0, #C3D7EE)"
              fillRule="evenodd"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ImagePlaceholder() {
  return (
    <div
      className="h-[210px] relative rounded-md shrink-0 w-full"
      data-name="Image Placeholder"
    >
      <div className="h-[210px] overflow-clip relative w-full">
        <IconImage />
      </div>
      <div className="absolute border border-[#bbd2ec] border-solid inset-0 pointer-events-none rounded-md" />
    </div>
  );
}

function LabelFrame3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Label + Frame"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#353b45] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">
          School Logo Upload
        </p>
      </div>
      <ImagePlaceholder />
    </div>
  );
}

function Frame1000008258() {
  return (
    <div className="box-border content-stretch flex flex-col gap-7 items-start justify-start p-0 relative shrink-0 w-full">
      <LabelFrame3 />
    </div>
  );
}

function Frame1707478633() {
  return (
    <div className="box-border content-stretch flex flex-col gap-7 items-start justify-start p-0 relative shrink-0 w-80">
      <Frame1000008257 />
      <Frame1000008258 />
    </div>
  );
}

function TextCursor3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-0.5 items-center justify-start p-0 relative shrink-0"
      data-name="Text + Cursor"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#98a2b3] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">
          Plot No. 809 Ibex Dam Area, Chongwe
        </p>
      </div>
    </div>
  );
}

function LeftContent3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Left Content"
    >
      <TextCursor3 />
    </div>
  );
}

function IconChevronDown3() {
  return (
    <div className="relative shrink-0 size-5" data-name="icon / chevron-down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="icon / chevron-down">
          <path
            d={svgPaths.p3fbe5280}
            fill="var(--fill-0, #667185)"
            id="icon"
          />
        </g>
      </svg>
    </div>
  );
}

function InputFrame3() {
  return (
    <div
      className="bg-[#ffffff] h-10 relative rounded-md shrink-0 w-full"
      data-name="Input Frame"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-10 items-center justify-start px-3 py-2 relative w-full">
          <LeftContent3 />
          <IconChevronDown3 />
        </div>
      </div>
      <div className="absolute border border-[#bbd2ec] border-solid inset-0 pointer-events-none rounded-md" />
    </div>
  );
}

function LabelFrame4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Label + Frame"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#353b45] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">
          Business Physical Address
        </p>
      </div>
      <InputFrame3 />
    </div>
  );
}

function TextCursor4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-0.5 items-center justify-start p-0 relative shrink-0"
      data-name="Text + Cursor"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#98a2b3] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">+260867485884</p>
      </div>
    </div>
  );
}

function LeftContent4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Left Content"
    >
      <TextCursor4 />
    </div>
  );
}

function IconChevronDown4() {
  return (
    <div className="relative shrink-0 size-5" data-name="icon / chevron-down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="icon / chevron-down">
          <path
            d={svgPaths.p3fbe5280}
            fill="var(--fill-0, #667185)"
            id="icon"
          />
        </g>
      </svg>
    </div>
  );
}

function InputFrame4() {
  return (
    <div
      className="bg-[#ffffff] h-10 relative rounded-md shrink-0 w-full"
      data-name="Input Frame"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-10 items-center justify-start px-3 py-2 relative w-full">
          <LeftContent4 />
          <IconChevronDown4 />
        </div>
      </div>
      <div className="absolute border border-[#bbd2ec] border-solid inset-0 pointer-events-none rounded-md" />
    </div>
  );
}

function LabelFrame5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Label + Frame"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#353b45] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">
          Official Telephone Number
        </p>
      </div>
      <InputFrame4 />
    </div>
  );
}

function TextCursor5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-0.5 items-center justify-start p-0 relative shrink-0"
      data-name="Text + Cursor"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#98a2b3] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">Primary School</p>
      </div>
    </div>
  );
}

function LeftContent5() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Left Content"
    >
      <TextCursor5 />
    </div>
  );
}

function IconChevronDown5() {
  return (
    <div className="relative shrink-0 size-5" data-name="icon / chevron-down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="icon / chevron-down">
          <path
            d={svgPaths.p3fbe5280}
            fill="var(--fill-0, #667185)"
            id="icon"
          />
        </g>
      </svg>
    </div>
  );
}

function InputFrame5() {
  return (
    <div
      className="bg-[#ffffff] h-10 relative rounded-md shrink-0 w-full"
      data-name="Input Frame"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-3 h-10 items-center justify-start px-3 py-2 relative w-full">
          <LeftContent5 />
          <IconChevronDown5 />
        </div>
      </div>
      <div className="absolute border border-[#bbd2ec] border-solid inset-0 pointer-events-none rounded-md" />
    </div>
  );
}

function LabelFrame6() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Label + Frame"
    >
      <div className="flex flex-col font-['Hanken_Grotesk:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#353b45] text-[14px] text-left text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">
          Organizational Category
        </p>
      </div>
      <InputFrame5 />
    </div>
  );
}

function Frame1000008256() {
  return (
    <div className="box-border content-stretch flex flex-col gap-7 items-start justify-start p-0 relative shrink-0 w-80">
      <LabelFrame4 />
      <LabelFrame5 />
      <LabelFrame6 />
    </div>
  );
}

function Frame1000008260() {
  return (
    <div className="box-border content-stretch flex flex-row gap-9 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame1000008255 />
      <Frame1707478633 />
      <Frame1000008256 />
    </div>
  );
}

function Frame1000008263() {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-[1032px]">
      <div className="font-['Hanken_Grotesk:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#000000] text-[18px] text-left w-full">
        <p className="block leading-[1.4]">Account Info</p>
      </div>
      <Frame1000008260 />
    </div>
  );
}

function Frame1000008264() {
  return (
    <div className="absolute bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 h-[528px] items-start justify-start left-0 p-[24px] rounded-2xl top-11 w-[1084px]">
      <div className="absolute border border-[#e4e7ec] border-solid inset-0 pointer-events-none rounded-2xl" />
      <Frame1000008263 />
    </div>
  );
}

function Frame1000008231() {
  return (
    <div className="box-border content-stretch flex flex-row gap-5 items-center justify-start leading-[0] p-0 relative shrink-0 text-center">
      <div className="flex flex-col font-['Hanken_Grotesk:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[#025864] text-[16px] w-[110px]">
        <p className="block leading-[1.45]">Account Info</p>
      </div>
      <div className="flex flex-col font-['Hanken_Grotesk:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[#c8ccd3] text-[14px] w-[110px]">
        <p className="block leading-[1.45]">Users</p>
      </div>
      <div className="flex flex-col font-['Hanken_Grotesk:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[#c8ccd3] text-[14px] w-[110px]">
        <p className="block leading-[1.45]">Banking Info</p>
      </div>
      <div className="flex flex-col font-['Hanken_Grotesk:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[#c8ccd3] text-[14px] w-[110px]">
        <p className="block leading-[1.45]">Pricing Structure</p>
      </div>
      <div className="flex flex-col font-['Hanken_Grotesk:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[#c8ccd3] text-[14px] w-[165px]">
        <p className="block leading-[1.45]">Account Verification</p>
      </div>
      <div className="flex flex-col font-['Hanken_Grotesk:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[#c8ccd3] text-[14px] w-[165px]">
        <p className="block leading-[1.45]">{`Subscription & Billing`}</p>
      </div>
    </div>
  );
}

function Frame1000008232() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0">
      <Frame1000008231 />
    </div>
  );
}

function MainContentContainer() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-9 items-start justify-start left-[3px] p-0 top-0"
      data-name="Main Content Container"
    >
      <Frame1000008232 />
    </div>
  );
}

export default function Group1000005065() {
  return (
    <div className="relative size-full">
      <Frame1000008264 />
      <MainContentContainer />
      <div className="absolute h-0 left-1 top-[31px] w-[110px]">
        <div className="absolute bottom-[-1.5px] left-[-1.364%] right-[-1.364%] top-[-1.5px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 114 4"
          >
            <path
              d="M2 2H112"
              id="Line 7"
              stroke="var(--stroke-0, #3ED4AF)"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}