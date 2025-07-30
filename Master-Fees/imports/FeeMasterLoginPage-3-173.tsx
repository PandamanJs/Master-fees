import svgPaths from "./svg-z08ybc5ltf";
import imgFeeMasterLoginPage from "figma:asset/ad73bfddb9e0d1de9c311e9886bad9067f61e75a.png";

function Frame30072() {
  return <div className="absolute h-6 left-[510px] top-[182px] w-[338px]" />;
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0">
      <div className="flex flex-col font-['Barlow:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[32px] text-left text-nowrap tracking-[0.25px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          Client Admin
        </p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Username</p>
      </div>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 381 1"
          >
            <line
              id="Line 1"
              stroke="var(--stroke-0, #5A5959)"
              x2="381"
              y1="0.5"
              y2="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function EyeSlashFill() {
  return (
    <div className="relative shrink-0 size-6" data-name="EyeSlashFill">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="EyeSlashFill">
          <path
            d={svgPaths.p13a85480}
            fill="var(--fill-0, #C6C6C6)"
            id="Vector"
          />
          <path
            d={svgPaths.pbf67fa0}
            fill="var(--fill-0, #C6C6C6)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="box-border content-stretch flex flex-row gap-[280px] items-start justify-start p-0 relative shrink-0">
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Password</p>
      </div>
      <EyeSlashFill />
    </div>
  );
}

function Frame3() {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame13 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 381 1"
          >
            <line
              id="Line 1"
              stroke="var(--stroke-0, #5A5959)"
              x2="381"
              y1="0.5"
              y2="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="box-border content-stretch flex flex-col gap-12 items-start justify-start p-0 relative shrink-0">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0">
      <Frame8 />
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          Forgot Password?
        </p>
      </div>
    </div>
  );
}

function Frame1({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#3ed4af] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-0 py-3 relative rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full hover:bg-[#36c19e] transition-colors cursor-pointer"
    >
      <div className="font-['Barlow:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[24px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Login</p>
      </div>
    </button>
  );
}

function Frame10({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-8 items-start justify-start left-[50%] translate-x-[-50%] p-0 translate-y-[-50%] w-[90%] max-w-[400px]"
      style={{ top: "calc(50% + 24px)" }}
    >
      <Frame9 />
      <Frame1 onClick={onLogin} />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#003049] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-6 py-3 relative rounded-lg shrink-0 w-[100px]">
      <div className="font-['Barlow:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Sign up</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute box-border content-stretch flex flex-row gap-[67px] items-center justify-start left-[136px] p-0 top-[780px]">
      <div className="flex flex-col font-['Microsoft_Sans_Serif:Regular',_sans-serif] h-[19px] justify-center leading-[0] not-italic relative shrink-0 text-[#707479] text-[13px] text-center w-[180px]">
        <p className="block leading-[1.2]">
          © All Rights Reserved 2025
          <br />
          {` Fee Master ltd.`}
        </p>
      </div>
      <Frame4 />
    </div>
  );
}

import CheckboxComponent from "./Checkbox-42-1932";
import { useState } from 'react';

function KeepMeLoggedInCheckbox({ keepLoggedIn, setKeepLoggedIn }: { keepLoggedIn: boolean, setKeepLoggedIn: (value: boolean) => void }) {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-2 items-center justify-start left-[120px] p-0 top-[752px] cursor-pointer"
      data-name="Checkbox"
      onClick={() => setKeepLoggedIn(!keepLoggedIn)}
    >
      <div className="relative">
        {keepLoggedIn ? (
          <div className="relative shrink-0 size-4">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 16 16"
            >
              <rect
                fill="#3ed4af"
                height="15"
                rx="1.5"
                stroke="#3ed4af"
                width="15"
                x="0.5"
                y="0.5"
              />
              <path
                d="M4 8l2.5 2.5L12 5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        ) : (
          <CheckboxComponent />
        )}
      </div>
    </div>
  );
}

function Frame5({ onLogin, keepLoggedIn, setKeepLoggedIn }: { onLogin: () => void, keepLoggedIn: boolean, setKeepLoggedIn: (value: boolean) => void }) {
  return (
    <div className="absolute bg-[#021722] h-[120%] left-[-18px] overflow-clip rounded-bl-[24px] rounded-tl-[24px] top-[-10%] w-[min(630px,45vw)]">
      <Frame10 onLogin={onLogin} />
      <Frame11 />
      <div 
        className="absolute flex flex-col font-['Poppins:Regular',_sans-serif] justify-center leading-[0] left-[148px] not-italic text-[#ffffff] text-[13px] text-left text-nowrap top-[761px] tracking-[0.25px] translate-y-[-50%] cursor-pointer"
        onClick={() => setKeepLoggedIn(!keepLoggedIn)}
      >
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          Keep me Logged in
        </p>
      </div>
      <KeepMeLoggedInCheckbox keepLoggedIn={keepLoggedIn} setKeepLoggedIn={setKeepLoggedIn} />
      <div className="absolute flex h-[303.993px] items-center justify-center left-3 top-[1370px] w-[213.041px]">
        <div className="flex-none rotate-[74.067deg]">
          <div
            className="h-[142.953px] relative w-[275.335px]"
            data-name="path60"
          >
            <div className="absolute bottom-[-12.242%] left-[-6.356%] right-[-6.356%] top-[-12.242%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 311 179"
              >
                <path
                  d={svgPaths.p7848980}
                  id="path60"
                  stroke="var(--stroke-0, #3ED4AF)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.47"
                  strokeWidth="35"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute h-[124px] left-[70%] top-[40px] w-[130px] transform -translate-x-1/2">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 130 124"
      >
        <g id="Group 15">
          <path
            d={svgPaths.p209a9c00}
            fill="var(--fill-0, #003049)"
            id="rect84"
          />
          <path
            d={svgPaths.p3a94f040}
            id="path60"
            stroke="var(--stroke-0, #5DFCAF)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </g>
      </svg>
    </div>
  );
}

export default function FeeMasterLoginPage({ onLogin }: { onLogin: () => void }) {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleLogin = () => {
    if (keepLoggedIn) {
      // Store login preference in localStorage or similar
      localStorage.setItem('keepLoggedIn', 'true');
    }
    onLogin();
  };

  return (
    <div
      className="bg-center bg-cover bg-no-repeat relative h-screen w-screen overflow-hidden"
      data-name="Fee Master Login Page"
      style={{ backgroundImage: `url('${imgFeeMasterLoginPage}')` }}
    >
      <div
        className="absolute bg-[#5a5959] h-[851px] left-[-601px] top-[-984px] w-[2222px]"
        data-name="loginbng 1"
      />
      <div
        className="absolute font-['Roboto:Regular',_sans-serif] font-normal leading-[0] left-[152px] text-[#000000] text-[14px] text-left text-nowrap top-[708px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">
          © All Rights Reserved. EduRoots
        </p>
      </div>
      <Frame30072 />
      <div className="absolute font-['Barlow:SemiBold',_sans-serif] leading-[0] left-[70%] not-italic text-[#3ed4af] text-[0px] text-center top-[25%] translate-x-[-50%] w-[90%] max-w-[700px]">
        <p className="leading-[normal]">
          <span className="text-[#3ed4af] text-[clamp(48px,8vw,96px)]">{` Master-`}</span>
          <span className="text-[clamp(48px,8vw,96px)]">Fee</span>
          <span className="text-[#3ed4af] text-[clamp(48px,8vw,96px)]">
            <br />
          </span>
          <span className="text-[#003049] text-[clamp(18px,3vw,36px)]">
            Smarter School Fee Management
          </span>
        </p>
      </div>
      <div className="absolute font-['Barlow:SemiBold',_sans-serif] leading-[0] left-[70%] not-italic text-[clamp(14px,2vw,20px)] text-[rgba(79,88,86,0.63)] text-center top-[50%] translate-x-[-50%] w-[90%] max-w-[568px]">
        <p className="block leading-[normal] whitespace-pre-wrap text-center py-[0px]">
          {`Automate collections, receipts, and reporting  so your staff focuses on what matters.`}
          <br />
          {` Increase revenue reliability, reduce workload, and gain full control of your finances.`}
        </p>
      </div>
      <div className="absolute flex h-[303.993px] items-center justify-center left-[536px] top-[465px] w-[213.041px]">
        <div className="flex-none rotate-[74.067deg]">
          <div
            className="h-[142.953px] relative w-[275.335px]"
            data-name="path60"
          >
            <div className="absolute bottom-[-12.242%] left-[-6.356%] right-[-6.356%] top-[-12.242%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 311 179"
              >
                <path
                  d={svgPaths.p7848980}
                  id="path60"
                  stroke="var(--stroke-0, #3ED4AF)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.47"
                  strokeWidth="35"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame5 onLogin={handleLogin} keepLoggedIn={keepLoggedIn} setKeepLoggedIn={setKeepLoggedIn} />
      <div className="absolute flex h-[341.217px] items-center justify-center left-[1294px] top-[11px] w-[233.79px]">
        <div className="flex-none rotate-[261.569deg]">
          <div
            className="h-[189.379px] relative w-[316.883px]"
            data-name="path60 (Stroke)"
          >
            <div className="absolute bottom-[-0.396%] left-[-0.237%] right-[-0.237%] top-[-0.396%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 319 192"
              >
                <path
                  d={svgPaths.p1df23f00}
                  id="path60 (Stroke)"
                  stroke="var(--stroke-0, #3ED4AF)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Group15 />
      <div className="absolute flex h-[426.93px] items-center justify-center left-[1134px] top-[874px] w-[349.244px]">
        <div className="flex-none rotate-[125.548deg]">
          <div
            className="h-[110.938px] relative w-[445.457px]"
            data-name="path60"
          >
            <div className="absolute bottom-[-15.778%] left-[-3.929%] right-[-3.929%] top-[-15.775%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 481 147"
              >
                <path
                  d={svgPaths.p77d8be0}
                  id="path60"
                  stroke="var(--stroke-0, #3ED4AF)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.47"
                  strokeWidth="35"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}