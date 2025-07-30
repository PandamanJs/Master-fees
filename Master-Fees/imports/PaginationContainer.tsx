import svgPaths from "./svg-xzpgbx7l9p";

function IconFieldChevronDown() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="Icon / Field / Chevron Down"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Icon / Field / Chevron Down">
          <path
            d={svgPaths.pd1b0400}
            fill="var(--fill-0, #003049)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function FieldContent() {
  return (
    <div
      className="basis-0 bg-[#ffffff] box-border content-stretch flex flex-row gap-1 grow items-center justify-center min-h-px min-w-px px-[15px] py-2 relative rounded-[20px] shrink-0 w-[58px]"
      data-name="Field Content"
    >
      <div className="absolute border border-[#dddddd] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div
        className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#003049] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">10</p>
      </div>
      <IconFieldChevronDown />
    </div>
  );
}

function PageSelect() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 h-8 items-center justify-center p-0 relative rounded-[20px] shrink-0"
      data-name="Page Select"
    >
      <FieldContent />
    </div>
  );
}

function Pagination() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-2.5 items-center justify-start left-px p-0 top-0"
      data-name="Pagination"
    >
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#003049] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">Rows per page</p>
      </div>
      <PageSelect />
      <div
        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#003049] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">of 140 rows</p>
      </div>
    </div>
  );
}

function IconPaginationFirst() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="Icon / Pagination / First"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Icon / Pagination / First">
          <path
            d={svgPaths.p7933000}
            fill="var(--fill-0, #003049)"
            id="Vector"
          />
          <path
            d={svgPaths.p22afa4f0}
            fill="var(--fill-0, #003049)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Control() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-[20px] shrink-0 size-8"
      data-name="Control"
    >
      <div className="absolute border border-[#f1f1f1] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconPaginationFirst />
    </div>
  );
}

function IconPaginationPrev() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="Icon / Pagination / Prev"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Icon / Pagination / Prev">
          <path
            d={svgPaths.p1abd2a00}
            fill="var(--fill-0, #003049)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Control1() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-[20px] shrink-0 size-8"
      data-name="Control"
    >
      <div className="absolute border border-[#f1f1f1] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconPaginationPrev />
    </div>
  );
}

function Page() {
  return (
    <div
      className="bg-[#003049] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-[20px] shrink-0 size-8"
      data-name="Page"
    >
      <div
        className="font-['Roboto:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Page1() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-[20px] shrink-0 size-8"
      data-name="Page"
    >
      <div className="absolute border border-[#f1f1f1] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div
        className="font-['Roboto:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#003049] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Page2() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-[20px] shrink-0 size-8"
      data-name="Page"
    >
      <div className="absolute border border-[#f1f1f1] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div
        className="font-['Roboto:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#003049] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Page3() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-[20px] shrink-0 size-8"
      data-name="Page"
    >
      <div
        className="flex flex-col font-['Open_Sans:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#003049] text-[13px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">...</p>
      </div>
    </div>
  );
}

function Page4() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-[20px] shrink-0 size-8"
      data-name="Page"
    >
      <div className="absolute border border-[#f1f1f1] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div
        className="font-['Roboto:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#003049] text-[14px] text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">10</p>
      </div>
    </div>
  );
}

function IconPaginationNext() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="Icon / Pagination / Next"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Icon / Pagination / Next">
          <path
            d={svgPaths.pd0da00}
            fill="var(--fill-0, #003049)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Control2() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-[20px] shrink-0 size-8"
      data-name="Control"
    >
      <div className="absolute border border-[#f1f1f1] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconPaginationNext />
    </div>
  );
}

function IconPaginationLast() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="Icon / Pagination / Last"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Icon / Pagination / Last">
          <path
            d={svgPaths.pab9d700}
            fill="var(--fill-0, #003049)"
            id="Vector"
          />
          <path
            d={svgPaths.p3d333980}
            fill="var(--fill-0, #003049)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Control3() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative rounded-[20px] shrink-0 size-8"
      data-name="Control"
    >
      <div className="absolute border border-[#f1f1f1] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <IconPaginationLast />
    </div>
  );
}

function Pagination1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-[5px] items-start justify-start left-[808px] p-0 top-0"
      data-name="Pagination"
    >
      <Control />
      <Control1 />
      <Page />
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Control2 />
      <Control3 />
    </div>
  );
}

export default function PaginationContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative size-full"
      data-name="Pagination Container"
    >
      <Pagination />
      <Pagination1 />
    </div>
  );
}