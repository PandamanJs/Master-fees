import { useState } from 'react';
import svgPaths from "../imports/svg-54j7y0rp8y";
import imgFeeMasterLoginPage from "figma:asset/ad73bfddb9e0d1de9c311e9886bad9067f61e75a.png";

interface ForgotPasswordPageProps {
  onCodeSent: (email: string, phone: string, method: 'email' | 'sms') => void;
  onBack: () => void;
}

function Frame30072() {
  return <div className="absolute h-6 left-[510px] top-[182px] w-[338px]" />;
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0">
      <div className="flex flex-col font-['Barlow:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[32px] text-left text-nowrap tracking-[0.25px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          Reset Password
        </p>
      </div>
    </div>
  );
}

function Frame2Email({ email, setEmail }: { email: string, setEmail: (value: string) => void }) {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-[381px]">
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Email Address</p>
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
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

function Frame2Phone({ phone, setPhone }: { phone: string, setPhone: (value: string) => void }) {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-[381px]">
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Phone Number (Optional)</p>
      </div>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone number"
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

function MethodSelection({ method, setMethod }: { method: 'email' | 'sms', setMethod: (method: 'email' | 'sms') => void }) {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-[381px]">
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Send reset code via</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setMethod('email')}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            method === 'email' 
              ? 'bg-[#3ed4af] border-[#3ed4af] text-white' 
              : 'border-[#5a5959] text-[#c6c6c6] hover:border-[#3ed4af]'
          }`}
        >
          <span className="font-['Poppins:Regular',_sans-serif] text-[14px]">Email</span>
        </button>
        <button
          onClick={() => setMethod('sms')}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            method === 'sms' 
              ? 'bg-[#3ed4af] border-[#3ed4af] text-white' 
              : 'border-[#5a5959] text-[#c6c6c6] hover:border-[#3ed4af]'
          }`}
        >
          <span className="font-['Poppins:Regular',_sans-serif] text-[14px]">SMS</span>
        </button>
      </div>
    </div>
  );
}

function Frame7({ email, setEmail, phone, setPhone, method, setMethod }: { 
  email: string, 
  setEmail: (value: string) => void,
  phone: string,
  setPhone: (value: string) => void,
  method: 'email' | 'sms',
  setMethod: (method: 'email' | 'sms') => void
}) {
  return (
    <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0">
      <Frame2Email email={email} setEmail={setEmail} />
      <Frame2Phone phone={phone} setPhone={setPhone} />
      <MethodSelection method={method} setMethod={setMethod} />
    </div>
  );
}

function Frame8({ email, setEmail, phone, setPhone, method, setMethod }: { 
  email: string, 
  setEmail: (value: string) => void,
  phone: string,
  setPhone: (value: string) => void,
  method: 'email' | 'sms',
  setMethod: (method: 'email' | 'sms') => void
}) {
  return (
    <div className="box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 relative shrink-0">
      <Frame6 />
      <Frame7 email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} method={method} setMethod={setMethod} />
      <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-[381px]">
        <div className="font-['Poppins:Light',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c6c6c6] text-[12px] text-left">
          <p className="block leading-[1.4] whitespace-pre-wrap">
            We'll send you a verification code to reset your password. 
            {method === 'sms' && phone ? ' Make sure your phone number is correct.' : ' Check your email for the code.'}
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame9({ email, setEmail, phone, setPhone, method, setMethod }: { 
  email: string, 
  setEmail: (value: string) => void,
  phone: string,
  setPhone: (value: string) => void,
  method: 'email' | 'sms',
  setMethod: (method: 'email' | 'sms') => void
}) {
  return (
    <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0">
      <Frame8 email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} method={method} setMethod={setMethod} />
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
        <p className="block leading-[normal] whitespace-pre">{loading ? 'Sending...' : 'Send Reset Code'}</p>
      </div>
    </button>
  );
}

function Frame10({ onSendCode, email, setEmail, phone, setPhone, method, setMethod, loading }: { 
  onSendCode: () => void,
  email: string, 
  setEmail: (value: string) => void,
  phone: string,
  setPhone: (value: string) => void,
  method: 'email' | 'sms',
  setMethod: (method: 'email' | 'sms') => void,
  loading: boolean
}) {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-8 items-start justify-start left-[119px] p-0 translate-y-[-50%]"
      style={{ top: "calc(50% - 20px)" }}
    >
      <Frame9 email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} method={method} setMethod={setMethod} />
      <Frame1 onClick={onSendCode} loading={loading} />
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

function Frame5({ onSendCode, onBack, email, setEmail, phone, setPhone, method, setMethod, loading }: { 
  onSendCode: () => void, 
  onBack: () => void,
  email: string, 
  setEmail: (value: string) => void,
  phone: string,
  setPhone: (value: string) => void,
  method: 'email' | 'sms',
  setMethod: (method: 'email' | 'sms') => void,
  loading: boolean
}) {
  return (
    <div className="absolute bg-[#021722] h-[100%] max-h-[780px] left-[-10px] overflow-clip top-[-10px] w-[630px]">
      <Frame10 onSendCode={onSendCode} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} method={method} setMethod={setMethod} loading={loading} />
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

function Group1000005067({ onSendCode, onBack, email, setEmail, phone, setPhone, method, setMethod, loading }: { 
  onSendCode: () => void, 
  onBack: () => void,
  email: string, 
  setEmail: (value: string) => void,
  phone: string,
  setPhone: (value: string) => void,
  method: 'email' | 'sms',
  setMethod: (method: 'email' | 'sms') => void,
  loading: boolean
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
          {`Don't worry! It happens to the best of us.`}
          <br />
          {` Enter your details below to reset your password.`}
        </p>
      </div>
      <Frame5 onSendCode={onSendCode} onBack={onBack} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} method={method} setMethod={setMethod} loading={loading} />
      <Group15 />
    </div>
  );
}

export default function ForgotPasswordPage({ onCodeSent, onBack }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState<'email' | 'sms'>('email');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    if (method === 'sms' && !phone) {
      alert('Please enter your phone number for SMS verification');
      return;
    }

    setLoading(true);
    try {
      // Import API inside the function to avoid import issues
      const { api } = await import('../utils/supabase/api');
      
      console.log('Requesting password reset for:', {
        email: email.trim().toLowerCase(),
        phone: phone,
        method: method
      });
      
      const response = await api.requestPasswordReset(email.trim().toLowerCase(), phone, method);
      
      console.log('Password reset request response:', response);
      
      if (response.success) {
        onCodeSent(email.trim().toLowerCase(), phone, method);
      } else {
        console.error('Password reset request failed:', response.error);
        alert(response.error || 'Failed to send reset code. Please try again.');
      }
    } catch (error) {
      console.error('Password reset request error:', error);
      alert('Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (!loading) {
      onBack();
    }
  };

  return (
    <div
      className="bg-center bg-cover bg-no-repeat relative w-full h-full max-h-[780px] overflow-hidden"
      data-name="Fee Master Forgot Password Page"
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
        onSendCode={handleSendCode} 
        onBack={handleBack}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        method={method}
        setMethod={setMethod}
        loading={loading}
      />
    </div>
  );
}