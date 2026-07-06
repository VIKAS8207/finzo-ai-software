import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const contentSets = [
  {
    heading: "Transform your financial workflows with AI intelligence.",
    para: "Set up your organization's workspace in minutes. Streamline portfolio management, automate compliance, and unlock real-time data insights tailored for modern finance teams."
  },
  {
    heading: "Automate reconciliation with zero human error.",
    para: "Our AI engine matches thousands of ledger entries instantly. Detect anomalies, flag duplicate invoices, and maintain perfect audit trails without breaking a single sweat."
  },
  {
    heading: "Real-time analytics for decisive financial moves.",
    para: "Stop waiting for month-end reports. Get dynamic cash flow forecasting, vendor spend analysis, and actionable insights delivered straight to your live dashboard."
  }
];

export default function OnboardingLeftPanel() {
  // State Machine for the Typewriter Loop
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [headingText, setHeadingText] = useState('');
  const [paraText, setParaText] = useState('');
  
  // Phases: 'typing-heading' -> 'typing-para' -> 'pausing' -> 'fading-out'
  const [phase, setPhase] = useState('typing-heading'); 

  useEffect(() => {
    let timeout;
    const currentSet = contentSets[currentSetIndex];

    if (phase === 'typing-heading') {
      if (headingText.length < currentSet.heading.length) {
        timeout = setTimeout(() => {
          setHeadingText(currentSet.heading.substring(0, headingText.length + 1));
        }, 30); // Typing speed for heading
      } else {
        timeout = setTimeout(() => setPhase('typing-para'), 300); // Pause before paragraph starts
      }
    } 
    else if (phase === 'typing-para') {
      if (paraText.length < currentSet.para.length) {
        timeout = setTimeout(() => {
          setParaText(currentSet.para.substring(0, paraText.length + 1));
        }, 15); // Typing speed for paragraph (slightly faster)
      } else {
        setPhase('pausing');
      }
    } 
    else if (phase === 'pausing') {
      // Keep the text on screen for 4 seconds so the user can read it
      timeout = setTimeout(() => {
        setPhase('fading-out');
      }, 4000); 
    } 
    else if (phase === 'fading-out') {
      // Allow 500ms for CSS fade out, then reset everything for the next text set
      timeout = setTimeout(() => {
        setHeadingText('');
        setParaText('');
        setCurrentSetIndex((prev) => (prev + 1) % contentSets.length);
        setPhase('typing-heading');
      }, 500); 
    }

    return () => clearTimeout(timeout);
  }, [headingText, paraText, phase, currentSetIndex]);

  return (
    // CHANGE: Uses h-full. Since the parent is now h-screen, this panel perfectly locks to the screen size.
    <div className="hidden lg:flex lg:w-5/12 h-full p-12 flex-col relative text-finzo-white overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-20">
      
      {/* ========================================= */}
      {/* GLITTERY AI BACKGROUND & GRADIENTS          */}
      {/* ========================================= */}
      <div className="absolute inset-0 bg-gradient-to-br from-finzo-primary via-[#1a369d] to-[#0a1230] z-0"></div>
      
      {/* Glitter / Dot Matrix Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_1.5px)] bg-[size:24px_24px] z-0"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a855f7]/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-finzo-white/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* ========================================= */}
      {/* TOP: Logo                                 */}
      {/* ========================================= */}
      <div className="z-10 shrink-0">
        <img src="/images/finzowhite.png" alt="Finzo Logo" className="h-6 object-contain" />
      </div>

      {/* CHANGE: Spacer to push everything below it down towards the bottom */}
      <div className="flex-1"></div>

      {/* ========================================= */}
      {/* MIDDLE: Typewriter Content Loop           */}
      {/* ========================================= */}
      <div className="z-10 pr-8 flex flex-col justify-end mb-8 min-h-[200px]">
        
        {/* CSS Fade Transition Wrapper */}
        <div className={`transition-opacity duration-500 ${phase === 'fading-out' ? 'opacity-0' : 'opacity-100'}`}>
          
          <h1 className="text-3xl xl:text-4xl font-bold mb-4 leading-tight tracking-tight min-h-[80px]">
            {headingText}
            {phase === 'typing-heading' && <span className="animate-pulse text-finzo-white/70 ml-1">_</span>}
          </h1>
          
          <p className="text-finzo-white/80 leading-relaxed text-base xl:text-lg min-h-[100px]">
            {paraText}
            {phase === 'typing-para' && <span className="animate-pulse text-finzo-white/70 ml-1">_</span>}
            {phase === 'pausing' && <span className="animate-pulse text-finzo-white ml-2">...</span>}
          </p>

        </div>
      </div>

      {/* ========================================= */}
      {/* BOTTOM: Finzo AI Profile Snippet          */}
      {/* ========================================= */}
      <div className="z-10 shrink-0 flex items-center gap-4 border-t border-finzo-white/10 pt-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-finzo-primary to-[#a855f7] flex items-center justify-center overflow-hidden border-2 border-finzo-white/20 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <Sparkles className="text-finzo-white" size={20} />
        </div>
        <div>
          <p className="font-bold text-sm tracking-wide">Finzo AI</p>
          <p className="text-xs text-finzo-white/70 font-medium">Your AI Helper</p>
        </div>
      </div>

    </div>
  );
}