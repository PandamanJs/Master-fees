function CheckboxInactiveDefault() {
  return (
    <div
      className="relative shrink-0 size-4"
      data-name="Checkbox/Inactive/Default"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Checkbox/Inactive/Default">
          <rect
            fill="var(--fill-0, white)"
            height="15"
            id="Plate"
            rx="1.5"
            stroke="var(--stroke-0, #434343)"
            width="15"
            x="0.5"
            y="0.5"
          />
        </g>
      </svg>
    </div>
  );
}

export default function Checkbox() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative size-full"
      data-name="Checkbox"
    >
      <CheckboxInactiveDefault />
    </div>
  );
}