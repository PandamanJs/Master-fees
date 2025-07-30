import { useState } from 'react';
import svgPaths from "../imports/svg-54j7y0rp8y";
import imgFeeMasterLoginPage from "figma:asset/ad73bfddb9e0d1de9c311e9886bad9067f61e75a.png";

interface ResetPasswordPageProps {
  email: string;
  phone: string;
  method: 'email' | 'sms';
  onPasswordReset: (schoolId: string, schoolName: string, accessToken: string) => void;
  onBack: () => void;
  onResendCode: () => void;
}

function Frame30072() {
  return <div className="absolute h-6 left-[510px] top-[182px] w-[338px]" />;
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0">
      <div className="flex flex-col font-['Barlow:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[32px] text-left text-nowrap tracking-[0.25px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          Verify & Reset
        </p>
      </div>
    </div>
  );
}

function Frame2Code({ code, setCode }: { code: string, setCode: (value: string) => void }) {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-[381px]">
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Verification Code</p>
      </div>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
        placeholder="Enter 6-digit code"
        className="w-full bg-transparent border-none outline-none text-[#c6c6c6] text-[16px] font-['Poppins:Regular',_sans-serif] pb-2 text-center letter-spacing-wider"
        style={{ color: '#c6c6c6', letterSpacing: '0.5em' }}
        maxLength={6}
      />
      <div className="h-0 relative shrink-0 w-[381px]">
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

function Frame13Password({ newPassword, setNewPassword, showPassword, setShowPassword }: { 
  newPassword: string, 
  setNewPassword: (value: string) => void,
  showPassword: boolean,
  setShowPassword: (value: boolean) => void
}) {
  return (
    <div className="box-border content-stretch flex flex-row gap-[280px] items-start justify-start p-0 relative shrink-0">
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">New Password</p>
      </div>
      <button onClick={() => setShowPassword(!showPassword)} className="hover:opacity-70 transition-opacity">
        <EyeSlashFill />
      </button>
    </div>
  );
}

function Frame3Password({ newPassword, setNewPassword, showPassword, setShowPassword }: { 
  newPassword: string, 
  setNewPassword: (value: string) => void,
  showPassword: boolean,
  setShowPassword: (value: boolean) => void
}) {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-[381px]">
      <Frame13Password newPassword={newPassword} setNewPassword={setNewPassword} showPassword={showPassword} setShowPassword={setShowPassword} />
      <input
        type={showPassword ? "text" : "password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter your new password"
        className="w-full bg-transparent border-none outline-none text-[#c6c6c6] text-[16px] font-['Poppins:Regular',_sans-serif] pb-2"
        style={{ color: '#c6c6c6' }}
      />
      <div className="h-0 relative shrink-0 w-[381px]">
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

function Frame13Confirm({ confirmPassword, setConfirmPassword, showConfirmPassword, setShowConfirmPassword }: { 
  confirmPassword: string, 
  setConfirmPassword: (value: string) => void,
  showConfirmPassword: boolean,
  setShowConfirmPassword: (value: boolean) => void
}) {
  return (
    <div className="box-border content-stretch flex flex-row gap-[220px] items-start justify-start p-0 relative shrink-0">
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Confirm Password</p>
      </div>
      <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="hover:opacity-70 transition-opacity">
        <EyeSlashFill />
      </button>
    </div>
  );
}

function Frame3Confirm({ confirmPassword, setConfirmPassword, showConfirmPassword, setShowConfirmPassword }: { 
  confirmPassword: string, 
  setConfirmPassword: (value: string) => void,
  showConfirmPassword: boolean,
  setShowConfirmPassword: (value: boolean) => void
}) {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-[381px]">
      <Frame13Confirm confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} />
      <input
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your new password"
        className="w-full bg-transparent border-none outline-none text-[#c6c6c6] text-[16px] font-['Poppins:Regular',_sans-serif] pb-2"
        style={{ color: '#c6c6c6' }}
      />
      <div className="h-0 relative shrink-0 w-[381px]">
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

function Frame7({ code, setCode, newPassword, setNewPassword, confirmPassword, setConfirmPassword, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, method, contactInfo }: { 
  code: string,
  setCode: (value: string) => void,
  newPassword: string, 
  setNewPassword: (value: string) => void,
  confirmPassword: string,
  setConfirmPassword: (value: string) => void,
  showPassword: boolean,
  setShowPassword: (value: boolean) => void,
  showConfirmPassword: boolean,
  setShowConfirmPassword: (value: boolean) => void,
  method: 'email' | 'sms',
  contactInfo: string
}) {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0">
      <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-[381px]">
        <div className="font-['Poppins:Light',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[12px] text-left">
          <p className="block leading-[1.4] whitespace-pre-wrap">
            Enter the verification code sent to your {method === 'email' ? 'email' : 'phone'}: {contactInfo}
          </p>
        </div>
      </div>
      <Frame2Code code={code} setCode={setCode} />
      <Frame3Password newPassword={newPassword} setNewPassword={setNewPassword} showPassword={showPassword} setShowPassword={setShowPassword} />
      <Frame3Confirm confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} />
    </div>
  );
}

function Frame8({ code, setCode, newPassword, setNewPassword, confirmPassword, setConfirmPassword, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, method, contactInfo }: { 
  code: string,
  setCode: (value: string) => void,
  newPassword: string, 
  setNewPassword: (value: string) => void,
  confirmPassword: string,
  setConfirmPassword: (value: string) => void,
  showPassword: boolean,
  setShowPassword: (value: boolean) => void,
  showConfirmPassword: boolean,
  setShowConfirmPassword: (value: boolean) => void,
  method: 'email' | 'sms',
  contactInfo: string
}) {
  return (
    <div className="box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 relative shrink-0">
      <Frame6 />
      <Frame7 code={code} setCode={setCode} newPassword={newPassword} setNewPassword={setNewPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} method={method} contactInfo={contactInfo} />
    </div>
  );
}

function Frame9({ code, setCode, newPassword, setNewPassword, confirmPassword, setConfirmPassword, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, method, contactInfo, onResendCode }: { 
  code: string,
  setCode: (value: string) => void,
  newPassword: string, 
  setNewPassword: (value: string) => void,
  confirmPassword: string,
  setConfirmPassword: (value: string) => void,
  showPassword: boolean,
  setShowPassword: (value: boolean) => void,
  showConfirmPassword: boolean,
  setShowConfirmPassword: (value: boolean) => void,
  method: 'email' | 'sms',
  contactInfo: string,
  onResendCode: () => void
}) {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0">
      <Frame8 code={code} setCode={setCode} newPassword={newPassword} setNewPassword={setNewPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} method={method} contactInfo={contactInfo} />
      <button 
        onClick={onResendCode}
        className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[14px] text-left text-nowrap hover:text-[#3ed4af] transition-colors"
      >
        <p className="block leading-[normal] whitespace-pre">
          Didn't receive the code? Resend
        </p>
      </button>
    </div>
  );
}

function Frame1({ onClick, loading }: { onClick: () => void, loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-[#3ed4af] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-0 py-3 relative rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[393px] hover:bg-[#36c19e] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="font-['Barlow:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[24px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">{loading ? 'Resetting...' : 'Reset Password'}</p>
      </div>
    </button>
  );
}

function Frame10({ onResetPassword, code, setCode, newPassword, setNewPassword, confirmPassword, setConfirmPassword, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, method, contactInfo, loading, onResendCode }: { 
  onResetPassword: () => void,
  code: string,
  setCode: (value: string) => void,
  newPassword: string, 
  setNewPassword: (value: string) => void,
  confirmPassword: string,
  setConfirmPassword: (value: string) => void,
  showPassword: boolean,
  setShowPassword: (value: boolean) => void,
  showConfirmPassword: boolean,
  setShowConfirmPassword: (value: boolean) => void,
  method: 'email' | 'sms',
  contactInfo: string,
  loading: boolean,
  onResendCode: () => void
}) {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-6 items-start justify-start left-[119px] p-0 translate-y-[-50%]"
      style={{ top: "calc(50% - 40px)" }}
    >
      <Frame9 code={code} setCode={setCode} newPassword={newPassword} setNewPassword={setNewPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} method={method} contactInfo={contactInfo} onResendCode={onResendCode} />
      <Frame1 onClick={onResetPassword} loading={loading} />
    </div>
  );
}

function Frame4({ onBack, loading }: { onBack: () => void, loading: boolean }) {
  return (
    <button
      onClick={onBack}
      disabled={loading}
      className="bg-[#003049] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-6 py-3 relative rounded-lg shrink-0 w-[100px] hover:bg-[#004060] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="font-['Barlow:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Back</p>
      </div>
    </button>
  );
}

function Frame11({ onBack, loading }: { onBack: () => void, loading: boolean }) {
  return (
    <div className="absolute box-border content-stretch flex flex-row gap-[67px] items-center justify-start left-[260px] p-0 bottom-[40px]">
      <Frame4 onBack={onBack} loading={loading} />
    </div>
  );
}

function Frame5({ onResetPassword, onBack, code, setCode, newPassword, setNewPassword, confirmPassword, setConfirmPassword, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, method, contactInfo, loading, onResendCode }: { 
  onResetPassword: () => void, 
  onBack: () => void,
  code: string,
  setCode: (value: string) => void,
  newPassword: string, 
  setNewPassword: (value: string) => void,
  confirmPassword: string,
  setConfirmPassword: (value: string) => void,
  showPassword: boolean,
  setShowPassword: (value: boolean) => void,
  showConfirmPassword: boolean,
  setShowConfirmPassword: (value: boolean) => void,
  method: 'email' | 'sms',
  contactInfo: string,
  loading: boolean,
  onResendCode: () => void
}) {
  return (
    <div className="absolute bg-[#021722] h-[100%] max-h-[780px] left-[-10px] overflow-clip top-[-10px] w-[630px]">
      <Frame10 onResetPassword={onResetPassword} code={code} setCode={setCode} newPassword={newPassword} setNewPassword={setNewPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} method={method} contactInfo={contactInfo} loading={loading} onResendCode={onResendCode} />
      <Frame11 onBack={onBack} loading={loading} />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute h-[124px] left-[988px] top-[80px] w-[130px]">
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

function Group1000005067({ onResetPassword, onBack, code, setCode, newPassword, setNewPassword, confirmPassword, setConfirmPassword, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, method, contactInfo, loading, onResendCode }: { 
  onResetPassword: () => void, 
  onBack: () => void,
  code: string,
  setCode: (value: string) => void,
  newPassword: string, 
  setNewPassword: (value: string) => void,
  confirmPassword: string,
  setConfirmPassword: (value: string) => void,
  showPassword: boolean,
  setShowPassword: (value: boolean) => void,
  showConfirmPassword: boolean,
  setShowConfirmPassword: (value: boolean) => void,
  method: 'email' | 'sms',
  contactInfo: string,
  loading: boolean,
  onResendCode: () => void
}) {
  return (
    <div className="absolute contents left-[-10px] top-[-10px]">
      <Frame30072 />
      <div className="absolute font-['Barlow:SemiBold',_sans-serif] h-[268px] leading-[0] left-[1033.5px] not-italic text-[#3ed4af] text-[0px] text-center top-[200px] translate-x-[-50%] w-[711px]">
        <p className="leading-[normal]">
          <span className="text-[#3ed4af] text-[96px]">{` Master-`}</span>
          <span className="text-[96px]">Fees</span>
          <span className="text-[#3ed4af] text-[96px]">
            <br />
          </span>
          <span className="text-[#003049] text-[36px]">
            Smarter School Fee Management
          </span>
        </p>
      </div>
      <div className="absolute font-['Barlow:SemiBold',_sans-serif] h-[123px] leading-[0] left-[1035px] not-italic text-[20px] text-[rgba(79,88,86,0.63)] text-center top-[380px] translate-x-[-50%] w-[568px]">
        <p className="block leading-[normal] whitespace-pre-wrap">
          {`Almost done! Enter the code and create a new secure password.`}
          <br />
          {` Your account will be ready in just a moment.`}
        </p>
      </div>
      <Frame5 onResetPassword={onResetPassword} onBack={onBack} code={code} setCode={setCode} newPassword={newPassword} setNewPassword={setNewPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} method={method} contactInfo={contactInfo} loading={loading} onResendCode={onResendCode} />
      <Group15 />
    </div>
  );
}

export default function ResetPasswordPage({ email, phone, method, onPasswordReset, onBack, onResendCode }: ResetPasswordPageProps) {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactInfo = method === 'email' ? email : phone;

  const handleResetPassword = async () => {
    if (!code || code.length !== 6) {
      alert('Please enter the 6-digit verification code');
      return;
    }

    if (!newPassword) {
      alert('Please enter a new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      // Import API inside the function to avoid import issues
      const { api } = await import('../utils/supabase/api');
      
      console.log('Attempting password reset with:', {
        email: email,
        code: code,
        codeLength: code.length
      });
      
      const response = await api.resetPassword(email, code, newPassword);
      
      console.log('Password reset response:', response);
      
      if (response.success && response.data) {
        const { schoolId, schoolName, accessToken } = response.data;
        onPasswordReset(schoolId, schoolName, accessToken);
      } else {
        console.error('Password reset failed:', response.error);
        alert(response.error || 'Failed to reset password. Please check your code and try again.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (!loading) {
      onBack();
    }
  };

  const handleResendCode = () => {
    if (!loading) {
      onResendCode();
    }
  };

  return (
    <div
      className="bg-center bg-cover bg-no-repeat relative w-full h-full max-h-[780px] overflow-hidden"
      data-name="Fee Master Reset Password Page"
      style={{ backgroundImage: `url('${imgFeeMasterLoginPage}')` }}
    >
      <div
        className="absolute bg-[#5a5959] h-[851px] left-[-601px] top-[-984px] w-[2222px]"
        data-name="loginbng 1"
      />
      <div className="absolute flex flex-col font-['Microsoft_Sans_Serif:Regular',_sans-serif] h-[19px] justify-center leading-[0] left-[1052px] not-italic text-[13px] text-center text-neutral-900 bottom-[40px] translate-x-[-50%] translate-y-[-50%] w-[180px]">
        <p className="block leading-[1.2]">
          © All Rights Reserved 2025
          <br />
          {` Master-Fees ltd.`}
        </p>
      </div>
      <Group1000005067 
        onResetPassword={handleResetPassword} 
        onBack={handleBack}
        code={code}
        setCode={setCode}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        method={method}
        contactInfo={contactInfo}
        loading={loading}
        onResendCode={handleResendCode}
      />
    </div>
  );
}