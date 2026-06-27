import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function LoadingScreen() {
  const navigate = useNavigate();
  
  // Refs for direct DOM manipulation (highly performant)
  const logoRef = useRef(null);
  const progressBarRef = useRef(null);
  const percentageRef = useRef(null);

  useGSAP(() => {
    // 1. Subtle fade and slide up for the logo
    gsap.fromTo(logoRef.current, 
      { opacity: 0, y: 10 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // 2. Animate the slim loading bar width
    gsap.to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut",
    });

    // 3. Animate the percentage counter
    // We animate a dummy object { val: 0 } and update the DOM directly
    gsap.to({ val: 0 }, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: function() {
        if (percentageRef.current) {
          // Math.round keeps it a clean integer
          percentageRef.current.innerText = Math.round(this.targets()[0].val) + "%";
        }
      },
      onComplete: () => {
        // Add a tiny 200ms delay so the user actually registers it hitting "100%"
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 200);
      }
    });
  });

  return (
    // Black background, taking full screen
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black text-finzo-white overflow-hidden">
      
      {/* Center Container */}
      <div className="flex flex-col items-center w-full max-w-[240px]">
        
        {/* Logo */}
        <img 
          ref={logoRef}
          src="/images/finzowhite.png" 
          alt="Finzo Logo" 
          className="h-8 object-contain mb-8"
        />
        
        {/* Slim Modern Loading Bar Track */}
        <div className="w-full h-[2px] bg-finzo-white/10 rounded-full overflow-hidden">
          {/* The actual progress fill */}
          <div 
            ref={progressBarRef}
            className="h-full w-0 rounded-full bg-gradient-to-r from-finzo-primary to-finzo-secondary shadow-[0_0_10px_rgba(23,70,234,0.5)]"
          ></div>
        </div>
      </div>

      {/* Bottom Right Percentage Counter */}
      {/* Uses absolute positioning to lock it to the corner, and font-cousine for that technical monospace look */}
      <div className="absolute bottom-10 right-12 text-finzo-white/50 font-cousine tracking-widest text-sm font-bold">
        <span ref={percentageRef}>0%</span>
      </div>

    </div>
  );
}