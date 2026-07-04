import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function LoginPage() {
  const [currentView, setCurrentView] = useState('login');
  const [otpTimer, setOtpTimer] = useState(30);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- NEW: STATE FOR OUR CREDENTIALS ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const container = useRef();
  const showcaseImage = useRef();
  const formRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (currentView === 'otp' && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [currentView, otpTimer]);

  useGSAP(() => {
    gsap.fromTo(".anim-element", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out", overwrite: "auto" }
    );

    if (showcaseImage.current) {
      gsap.from(showcaseImage.current, {
        scale: 1.1, opacity: 0, duration: 2, ease: "power3.out", delay: 0.2
      });
    }
  }, { scope: container, dependencies: [currentView] });

  const handleViewChange = (view) => {
    setCurrentView(view);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setLoginError(''); // Clear errors when switching views
    if (view === 'otp') setOtpTimer(30);
  };

  // --- NEW: THE MAGIC DEMO ROUTING LOGIC ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (email === 'admin' && password === 'admin123') {
      // SCENE A: NEW USER FLOW
      // Remove the key so the RouteGuard forces them to Onboarding
      localStorage.removeItem('finzo_setup_complete');
      navigate('/loading');
      
    } else if (email === 'Admin@' && password === 'Admin@123') {
      // SCENE B: RETURNING USER FLOW
      // Inject the key so the RouteGuard lets them straight into the Dashboard
      localStorage.setItem('finzo_setup_complete', 'true');
      navigate('/loading');
      
    } else {
      // Show an error for anything else to make the prototype feel real
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const EyeIcon = ({ isVisible }) => (
    isVisible ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    )
  );

  return (
    <div ref={container} className="flex min-h-screen w-full bg-black text-finzo-white font-spline-sans overflow-hidden">
      
      <div className="w-full lg:w-1/2 flex flex-col px-8 lg:px-24 py-10 z-10 relative justify-center overflow-y-auto">
        <div ref={formRef} className="max-w-[400px] w-full mx-auto pb-10">
          
          <div className="anim-element mb-12">
            <img src="/images/finzowhite.png" alt="Finzo Logo" className="h-5 object-contain" />
          </div>

          {currentView === 'login' && (
            <>
              <div className="anim-element mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
                <p className="text-sm text-finzo-white/60">Please enter your details to sign in.</p>
              </div>

              <div className="anim-element flex gap-4 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded border border-finzo-white/20 hover:bg-finzo-white/10 transition-colors text-sm cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded border border-finzo-white/20 hover:bg-finzo-white/10 transition-colors text-sm cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.56.11 2.89.65 3.82 1.67-3.37 2.15-2.73 6.64.44 8.01-.76 1.34-1.61 2.65-2.84 3.29zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Apple
                </button>
              </div>

              <div className="anim-element flex items-center gap-4 mb-6">
                <div className="h-px bg-finzo-white/20 flex-1"></div>
                <span className="text-xs text-finzo-white/50">Or continue with</span>
                <div className="h-px bg-finzo-white/20 flex-1"></div>
              </div>

              {/* --> ATTACHED THE SUBMIT HANDLER HERE <-- */}
              <form className="space-y-4" autoComplete="off" onSubmit={handleLoginSubmit}>
                
                {/* Simulated Error Message */}
                {loginError && (
                  <div className="anim-element bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded text-xs text-center font-medium">
                    {loginError}
                  </div>
                )}

                <div className="anim-element">
                  <label className="block text-xs text-finzo-white/80 mb-1">Email Address</label>
                  <input 
                    type="text" 
                    autoComplete="off" 
                    placeholder="admin or Admin@" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-finzo-white/20 rounded px-4 py-3 text-sm focus:outline-none focus:border-finzo-secondary transition-colors" 
                  />
                </div>
                
                <div className="anim-element">
                  <label className="block text-xs text-finzo-white/80 mb-1">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      autoComplete="new-password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border border-finzo-white/20 rounded px-4 py-3 pr-10 text-sm focus:outline-none focus:border-finzo-secondary transition-colors" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-finzo-white/50 hover:text-finzo-white transition-colors cursor-pointer"
                    >
                      <EyeIcon isVisible={showPassword} />
                    </button>
                  </div>
                </div>
                
                <div className="anim-element flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="remember" className="w-4 h-4 rounded border-finzo-white/30 bg-transparent text-finzo-primary" />
                    <label htmlFor="remember" className="ml-2 text-xs text-finzo-white/60">Remember me</label>
                  </div>
                  <button type="button" onClick={() => handleViewChange('forgot')} className="text-xs text-finzo-secondary hover:text-finzo-white transition-colors cursor-pointer">
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className="anim-element w-full bg-gradient-to-r from-finzo-primary to-finzo-secondary text-finzo-white font-bold py-3 rounded mt-4 hover:opacity-90 transition-all cursor-pointer">
                  Sign In
                </button>
              </form>

              <p className="anim-element text-center mt-6 text-xs text-finzo-white/60">
                New user? <button onClick={() => handleViewChange('register')} className="text-finzo-secondary hover:text-finzo-white transition-colors cursor-pointer">Create an account</button>
              </p>
            </>
          )}

          {/* ... Keep the Register, Forgot, and OTP views exactly the same as your original code below this line ... */}
          {currentView === 'register' && (
            <>
              <div className="anim-element mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Create Account</h1>
                <p className="text-sm text-finzo-white/60">Fill in your details to register.</p>
              </div>

              <form className="space-y-4" autoComplete="off" onSubmit={(e) => { e.preventDefault(); handleViewChange('otp'); }}>
                <div className="anim-element">
                  <label className="block text-xs text-finzo-white/80 mb-1">Full Name</label>
                  <input type="text" autoComplete="off" placeholder="John Doe" className="w-full bg-transparent border border-finzo-white/20 rounded px-4 py-3 text-sm focus:outline-none focus:border-finzo-secondary transition-colors" required />
                </div>
                <div className="anim-element">
                  <label className="block text-xs text-finzo-white/80 mb-1">Phone Number</label>
                  <input type="tel" autoComplete="off" placeholder="+91 98765 43210" className="w-full bg-transparent border border-finzo-white/20 rounded px-4 py-3 text-sm focus:outline-none focus:border-finzo-secondary transition-colors" required />
                </div>
                <div className="anim-element">
                  <label className="block text-xs text-finzo-white/80 mb-1">Email Address</label>
                  <input type="email" autoComplete="off" placeholder="name@company.com" className="w-full bg-transparent border border-finzo-white/20 rounded px-4 py-3 text-sm focus:outline-none focus:border-finzo-secondary transition-colors" required />
                </div>
                
                <div className="anim-element">
                  <label className="block text-xs text-finzo-white/80 mb-1">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      autoComplete="new-password" 
                      placeholder="••••••••" 
                      className="w-full bg-transparent border border-finzo-white/20 rounded px-4 py-3 pr-10 text-sm focus:outline-none focus:border-finzo-secondary transition-colors" 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-finzo-white/50 hover:text-finzo-white transition-colors cursor-pointer"
                    >
                      <EyeIcon isVisible={showPassword} />
                    </button>
                  </div>
                </div>

                <div className="anim-element">
                  <label className="block text-xs text-finzo-white/80 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      autoComplete="new-password" 
                      placeholder="••••••••" 
                      className="w-full bg-transparent border border-finzo-white/20 rounded px-4 py-3 pr-10 text-sm focus:outline-none focus:border-finzo-secondary transition-colors" 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-finzo-white/50 hover:text-finzo-white transition-colors cursor-pointer"
                    >
                      <EyeIcon isVisible={showConfirmPassword} />
                    </button>
                  </div>
                </div>

                <button type="submit" className="anim-element w-full bg-gradient-to-r from-finzo-primary to-finzo-secondary text-finzo-white font-bold py-3 rounded mt-6 hover:opacity-90 transition-all cursor-pointer">
                  Register & Send OTP
                </button>
              </form>

              <p className="anim-element text-center mt-6 text-xs text-finzo-white/60">
                Already have an account? <button onClick={() => handleViewChange('login')} className="text-finzo-secondary hover:text-finzo-white transition-colors cursor-pointer">Log in</button>
              </p>
            </>
          )}

          {currentView === 'forgot' && (
            <>
              <div className="anim-element mb-8">
                <button onClick={() => handleViewChange('login')} className="text-finzo-white/60 hover:text-finzo-white text-xs flex items-center gap-1 mb-4 cursor-pointer">
                  ← Back to login
                </button>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Reset Password</h1>
                <p className="text-sm text-finzo-white/60">Enter your email to receive a secure OTP.</p>
              </div>

              <form className="space-y-4" autoComplete="off" onSubmit={(e) => { e.preventDefault(); handleViewChange('otp'); }}>
                <div className="anim-element">
                  <label className="block text-xs text-finzo-white/80 mb-1">Registered Email</label>
                  <input type="email" autoComplete="off" placeholder="name@company.com" className="w-full bg-transparent border border-finzo-white/20 rounded px-4 py-3 text-sm focus:outline-none focus:border-finzo-secondary transition-colors" required />
                </div>

                <button type="submit" className="anim-element w-full bg-gradient-to-r from-finzo-primary to-finzo-secondary text-finzo-white font-bold py-3 rounded mt-4 hover:opacity-90 transition-all cursor-pointer">
                  Send Recovery OTP
                </button>
              </form>
            </>
          )}

          {currentView === 'otp' && (
            <>
              <div className="anim-element mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Verify OTP</h1>
                <p className="text-sm text-finzo-white/60">We've sent a 4-digit code to your email/phone.</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleViewChange('login'); }}>
                <div className="anim-element">
                  <label className="block text-xs text-finzo-white/80 mb-2">Enter Secure Code</label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <input key={i} type="text" maxLength="1" className="w-14 h-14 text-center text-xl bg-transparent border border-finzo-white/20 rounded focus:outline-none focus:border-finzo-secondary transition-colors" />
                    ))}
                  </div>
                </div>

                <div className="anim-element flex items-center justify-between text-xs">
                  <span className="text-finzo-white/60">
                    Code expires in: <strong className="text-finzo-secondary">00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</strong>
                  </span>
                  <button type="button" disabled={otpTimer > 0} className={`transition-colors ${otpTimer > 0 ? 'text-finzo-white/30 cursor-not-allowed' : 'text-finzo-white hover:text-finzo-secondary cursor-pointer'}`}>
                    Resend Code
                  </button>
                </div>

                <button type="submit" className="anim-element w-full bg-gradient-to-r from-finzo-primary to-finzo-secondary text-finzo-white font-bold py-3 rounded mt-4 hover:opacity-90 transition-all cursor-pointer">
                  Verify & Continue
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 p-6">
        <div className="relative w-full h-full rounded overflow-hidden shadow-2xl bg-[#050505]">
          <img 
            ref={showcaseImage}
            src="/images/finzologin.png" 
            alt="Visual Showcase" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
    </div>
  );
}