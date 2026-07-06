import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search, CheckCircle2 } from 'lucide-react';

import MinimalInput from '../../components/ui/MinimalInput';
import MinimalSelect from '../../components/ui/MinimalSelect';
import Button from '../../components/ui/Button'; 
import PaymentStep from './PaymentStep';

export default function OnboardingRightPanel() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Conditional UI States
  const [isVerifying, setIsVerifying] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '', role: '', workPhone: '', department: '',
    gstin: '', legalName: '', regAddress: '', pan: '', displayName: '', industry: '', finYear: 'April', currency: 'INR', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, companyEmail: '', companyPhone: '',
    workEmail: '', password: '', termsAccepted: false,
    plan: 'growth', billingEmail: '', billingAddress: '', billingGstin: '',
  });

  const handleNext = (e) => {
    e.preventDefault();
    
    // Auto-fill Account email from Company email
    if (step === 2) {
      setFormData(prev => ({
        ...prev,
        workEmail: prev.workEmail || prev.companyEmail
      }));
    }
    
    // Auto-fill billing details from previous steps
    if (step === 3) {
      setFormData(prev => ({
        ...prev,
        billingEmail: prev.billingEmail || prev.workEmail,
        billingAddress: prev.billingAddress || prev.regAddress,
        billingGstin: prev.billingGstin || prev.gstin,
      }));
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinishSetup = (e) => {
    e.preventDefault();
    localStorage.setItem('finzo_setup_complete', 'true');
    navigate('/dashboard');
  };

  const handleVerifyGSTIN = () => {
    if (!formData.gstin) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setFormData(prev => ({ 
        ...prev, 
        legalName: 'Acme Technologies Pvt Ltd',
        displayName: 'Acme Technologies',
        regAddress: '123 Tech Park, Cyber City, Phase 2',
        pan: 'ABCDE1234F'
      }));
      setShowCompanyDetails(true);
    }, 1500);
  };

  return (
    // FIX: Changed from 'justify-center p-24' to 'h-full flex flex-col px-24'. 
    // This allows the container to span full height and handle scrolling properly.
    <div className="w-full lg:w-7/12 h-full relative flex flex-col px-6 sm:px-16 lg:px-24 overflow-y-auto bg-[#050505] custom-scrollbar">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-finzo-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* FIX: Added 'my-auto py-12'. my-auto handles the perfect vertical centering without breaking the scroll! */}
      <div className="w-full max-w-lg relative z-10 flex flex-col mx-auto my-auto py-12 lg:py-24">
        
        {/* --- Minimalist Text Navigation --- */}
        <div className="w-full mb-12 animate-in fade-in slide-in-from-top-4 duration-700 border-b border-finzo-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-bold tracking-widest uppercase">
            <span className={`transition-colors duration-300 ${step === 1 ? 'text-finzo-primary' : 'text-finzo-white/30'}`}>1. About you</span>
            <span className={`transition-colors duration-300 ${step === 2 ? 'text-finzo-primary' : 'text-finzo-white/30'}`}>2. Company</span>
            <span className={`transition-colors duration-300 ${step === 3 ? 'text-finzo-primary' : 'text-finzo-white/30'}`}>3. Account</span>
            <span className={`transition-colors duration-300 ${step === 4 ? 'text-finzo-primary' : 'text-finzo-white/30'}`}>4. Payment</span>
          </div>
        </div>

        <div className="w-full">

          {/* ============================================== */}
          {/* STEP 1: ABOUT YOU                              */}
          {/* ============================================== */}
          {step === 1 && (
            <form onSubmit={handleNext} className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-10">
                <h2 className="text-3xl font-light text-finzo-white mb-2">Personal Details</h2>
                <p className="text-sm text-finzo-white/50">Let's get to know you before setting up the workspace.</p>
              </div>

              <div className="space-y-8">
                <MinimalInput 
                  label="Full Name" required autoFocus placeholder="John Doe"
                  value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
                />
                <MinimalSelect 
                  label="Your Role" required placeholder="Select your role..."
                  value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  options={[
                    { value: "Founder/Owner", label: "Founder / Owner" },
                    { value: "CFO", label: "CFO" },
                    { value: "Finance Head", label: "Finance Head" },
                    { value: "Finance Manager", label: "Finance Manager" },
                    { value: "AP Executive", label: "AP Executive" },
                    { value: "Procurement Head", label: "Procurement Head" },
                    { value: "Auditor", label: "Auditor" },
                    { value: "Other", label: "Other" }
                  ]}
                />
                <MinimalInput 
                  label="Work Phone" type="tel" required placeholder="+91 98765 43210"
                  value={formData.workPhone} onChange={(e) => setFormData({ ...formData, workPhone: e.target.value })} 
                />
                <MinimalInput 
                  label="Department (Optional)" placeholder="e.g. Finance, Operations"
                  value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} 
                />
              </div>

              <div className="mt-6">
                <p className="text-xs text-finzo-white/40 leading-relaxed border-l-2 border-finzo-primary/50 pl-3">
                  You'll be set up as the Admin for your company workspace — you can invite your team later.
                </p>
              </div>

              <div className="flex justify-end mt-12">
                <Button type="submit" disabled={!formData.fullName || !formData.role || !formData.workPhone} icon={ChevronRight}>
                  Next Step
                </Button>
              </div>
            </form>
          )}

          {/* ============================================== */}
          {/* STEP 2: COMPANY                                */}
          {/* ============================================== */}
          {step === 2 && (
            <form onSubmit={handleNext} className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-10">
                <h2 className="text-3xl font-light text-finzo-white mb-2">Company Details</h2>
                <p className="text-sm text-finzo-white/50">Enter GSTIN to automatically fetch your business details.</p>
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <label className="block text-xs font-medium text-finzo-white/50 mb-1 uppercase tracking-widest">GSTIN Number</label>
                  <div className="flex items-end gap-4">
                    <input type="text" required autoFocus placeholder="22AAAAA0000A1Z5" maxLength="15" value={formData.gstin} onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })} className="flex-1 bg-transparent border-0 border-b border-finzo-white/20 px-0 py-2 text-base text-finzo-white placeholder-finzo-white/20 focus:outline-none focus:border-finzo-primary transition-colors uppercase rounded-none" />
                    <button type="button" onClick={handleVerifyGSTIN} disabled={formData.gstin.length < 15 || isVerifying} className="px-6 py-2 bg-finzo-white/5 border border-finzo-white/20 hover:border-finzo-primary text-finzo-white rounded-[10px] text-sm font-bold transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2">
                      {isVerifying ? <span className="animate-spin">⏳</span> : <Search size={16} />} Verify
                    </button>
                  </div>
                  {!showCompanyDetails && (
                    <button type="button" onClick={() => setShowCompanyDetails(true)} className="text-xs text-finzo-primary hover:text-finzo-white transition-colors mt-3 cursor-pointer">Don't have a GSTIN yet? Enter details manually</button>
                  )}
                </div>

                {showCompanyDetails && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-8">
                    <div className="p-4 bg-finzo-white/5 border border-finzo-white/10 rounded-[10px] space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={14} className="text-green-400" />
                        <span className="text-xs text-green-400 font-bold tracking-widest uppercase">Registry Data</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <MinimalInput label="Legal Name" value={formData.legalName} onChange={(e) => setFormData({ ...formData, legalName: e.target.value })} className="text-sm py-1" />
                        <MinimalInput label="PAN" value={formData.pan} onChange={(e) => setFormData({ ...formData, pan: e.target.value })} className="uppercase text-sm py-1" />
                        <MinimalInput label="Registered Address" containerClassName="col-span-2" value={formData.regAddress} onChange={(e) => setFormData({ ...formData, regAddress: e.target.value })} className="text-sm py-1" />
                      </div>
                    </div>

                    <MinimalInput 
                      label="Display Name (Shows in UI)" required 
                      value={formData.displayName} onChange={(e) => setFormData({ ...formData, displayName: e.target.value })} 
                    />

                    <div className="grid grid-cols-2 gap-6">
                      <MinimalSelect 
                        label="Industry" required 
                        value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        options={[ { value: "fintech", label: "Fintech" }, { value: "saas", label: "Software / SaaS" }, { value: "ecommerce", label: "E-Commerce" }, { value: "manufacturing", label: "Manufacturing" } ]}
                      />
                      <MinimalSelect 
                        label="Fin Year Start" 
                        value={formData.finYear} onChange={(e) => setFormData({ ...formData, finYear: e.target.value })}
                        options={[ { value: "April", label: "April (India)" }, { value: "January", label: "January" } ]}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <MinimalInput label="Company Email" type="email" value={formData.companyEmail} onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })} />
                      <MinimalInput label="Company Phone" type="tel" value={formData.companyPhone} onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })} />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-12">
                <Button variant="secondary" onClick={handleBack}>Back</Button>
                <Button type="submit" disabled={!showCompanyDetails || !formData.displayName} icon={ChevronRight}>
                  Next Step
                </Button>
              </div>
            </form>
          )}

          {/* ============================================== */}
          {/* STEP 3: ACCOUNT (VERIFICATION & SECURITY)      */}
          {/* ============================================== */}
          {step === 3 && (
            <form onSubmit={handleNext} className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-10">
                <h2 className="text-3xl font-light text-finzo-white mb-2">Verify & Secure Account</h2>
                <p className="text-sm text-finzo-white/50">Please verify your auto-filled details and set a secure password.</p>
              </div>

              <div className="space-y-8">
                <MinimalInput 
                  label="Full Name (Verified)" required value={formData.fullName} 
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
                />
                <MinimalInput 
                  label="Work Email (Verified)" type="email" required placeholder="admin@company.com"
                  value={formData.workEmail} onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })} 
                />
                <div>
                  <MinimalInput 
                    label="Set Password" type="password" required placeholder="••••••••"
                    value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  {/* Password Strength Meter */}
                  {formData.password && (
                    <div className="flex gap-1 mt-2">
                      <div className="h-1 flex-1 bg-red-500 rounded-none"></div>
                      <div className={`h-1 flex-1 rounded-none ${formData.password.length > 5 ? 'bg-yellow-500' : 'bg-finzo-white/10'}`}></div>
                      <div className={`h-1 flex-1 rounded-none ${formData.password.length > 8 ? 'bg-green-500' : 'bg-finzo-white/10'}`}></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 mt-8">
                <input type="checkbox" id="terms" required checked={formData.termsAccepted} onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })} className="mt-1 bg-transparent border-finzo-white/30 rounded-none cursor-pointer" />
                <label htmlFor="terms" className="text-xs text-finzo-white/50 cursor-pointer">I agree to the <span className="text-finzo-white underline">Terms of Service</span> and <span className="text-finzo-white underline">Privacy Policy</span>.</label>
              </div>

              <div className="flex items-center justify-between mt-12">
                <Button variant="secondary" onClick={handleBack}>Back</Button>
                <Button type="submit" disabled={!formData.workEmail || !formData.password || !formData.termsAccepted} icon={ChevronRight}>
                  Next Step
                </Button>
              </div>
            </form>
          )}

          {/* ============================================== */}
          {/* STEP 4: PAYMENT                                */}
          {/* ============================================== */}
          {step === 4 && (
            <PaymentStep 
              formData={formData} 
              setFormData={setFormData} 
              handleBack={handleBack} 
              handleFinishSetup={handleFinishSetup} 
            />
          )}

        </div>
      </div>
    </div>
  );
}