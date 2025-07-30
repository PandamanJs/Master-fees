import svgPaths from "./svg-y2ru38m37";

function VuesaxLinearSearchNormal() {
  return (
    <div
      className="absolute contents inset-0"
      data-name="vuesax/linear/search-normal"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="search-normal">
          <path
            d={svgPaths.p14d5dec0}
            id="Vector"
            stroke="var(--stroke-0, #9CA0A4)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={svgPaths.p355f1080}
            id="Vector_2"
            stroke="var(--stroke-0, #9CA0A4)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="Vector_3" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function SearchNormal1() {
  return (
    <div className="relative shrink-0 size-5" data-name="search-normal">
      <VuesaxLinearSearchNormal />
    </div>
  );
}

function TextInput() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-lg shrink-0 w-full"
      data-name="Text Input"
    >
      <div className="absolute border border-[#cbd2e0] border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start px-3 py-[11px] relative size-full">
          <SearchNormal1 />
          <div className="basis-0 css-i98s0w font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#9ca0a4] text-[12px] text-left tracking-[-0.12px]">
            <p className="block leading-[1.5]">Search</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 h-10 items-start justify-end p-0 relative shrink-0 w-[482px]"
      data-name="Input Field"
    >
      <TextInput />
    </div>
  );
}

function IconUpload2Line() {
  return (
    <div
      className="relative shrink-0 size-[17px]"
      data-name="Icon-upload-2-line"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 17 17"
      >
        <g id="Icon-upload-2-line">
          <path
            d={svgPaths.p1cd74a00}
            fill="var(--fill-0, #003049)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Label() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center px-1 py-0 relative shrink-0"
      data-name="Label"
    >
      <div className="flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#003049] text-[12px] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Import/Export</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-row gap-2 h-full items-center justify-center px-4 py-0 relative rounded-lg shrink-0"
      data-name="Button 2"
    >
      <IconUpload2Line />
      <Label />
    </div>
  );
}

function ButtonGroup() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 h-10 items-center justify-start p-0 relative shrink-0"
      data-name="ButtonGroup"
    >
      <Button2 />
    </div>
  );
}

function AddCircle() {
  return (
    <div
      className="[grid-area:1_/_1] ml-0 mt-0 relative size-6"
      data-name="add-circle"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="add-circle">
          <path
            d="M8 12H16"
            id="Vector"
            stroke="var(--stroke-0, #003049)"
            strokeLinecap="square"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M12 16V8"
            id="Vector_2"
            stroke="var(--stroke-0, #003049)"
            strokeLinecap="square"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <g id="Vector_3" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function VuesaxLinearAddCircle() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="vuesax/linear/add-circle"
    >
      <AddCircle />
    </div>
  );
}

function AddCircle1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0"
      data-name="add-circle"
    >
      <VuesaxLinearAddCircle />
    </div>
  );
}

function NewStudentButton() {
  return (
    <div
      className="bg-[#5dfcaf] box-border content-stretch flex flex-row gap-3 h-10 items-center justify-center pl-4 pr-[30px] py-4 relative rounded-lg shrink-0"
      data-name="new student button"
    >
      <AddCircle1 />
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003049] text-[12px] text-center text-nowrap">
        <p className="block leading-[1.45] whitespace-pre">New User</p>
      </div>
    </div>
  );
}

function Frame1707478668() {
  return (
    <div className="box-border content-stretch flex flex-row gap-[5px] items-center justify-start p-0 relative shrink-0">
      <ButtonGroup />
      <NewStudentButton />
    </div>
  );
}

export default function Frame1707478669() {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative size-full">
      <InputField />
      <Frame1707478668 />
    </div>
  );
}