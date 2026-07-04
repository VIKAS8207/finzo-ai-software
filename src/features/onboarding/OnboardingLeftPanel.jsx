import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function OnboardingLeftPanel() {
  // --- TYPEWRITER STATE MACHINE ---
  const sequence = [
    { type: 'h1', text: "Transform your financial workflows with AI intelligence." },
    { type: 'p-main', text: "Set up your organization's workspace in minutes. Streamline portfolio management, automate compliance, and unlock real-time data insights tailored for modern finance teams." },
    { type: 'p-sys', text: "> Establishing secure terminal connection..." },
    { type: 'p-sys', text: "> Initializing portfolio analytics engine..." },
    { type: 'p-sys', text: "> Syncing with global financial grids..." },
    { type: 'p-sys', text: "> Workspace environment ready for configuration." }
  ];

  const [visibleLines, setVisibleLines] = useState([{ ...sequence[0], currentText: '' }]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < sequence.length) {
      const targetText = sequence[lineIndex].text;

      if (charIndex < targetText.length) {
        // Typing out characters
        const timeout = setTimeout(() => {
          setVisibleLines(prev => {
            const newLines = [...prev];
            newLines[lineIndex].currentText = targetText.substring(0, charIndex + 1);
            return newLines;
          });
          setCharIndex(c => c + 1);
        }, 20); // Speed of typing (lower = faster)
        
        return () => clearTimeout(timeout);
      } else {
        // Line complete, pause before starting the next line
        const timeout = setTimeout(() => {
          if (lineIndex + 1 < sequence.length) {
            setLineIndex(l => l + 1);
            setCharIndex(0);
            setVisibleLines(prev => [...prev, { ...sequence[lineIndex + 1], currentText: '' }]);
          }
        }, 600); // Pause interval between paragraphs
        
        return () => clearTimeout(timeout);
      }
    }
  }, [lineIndex, charIndex]);

  return (
    <div className="hidden lg:flex lg:w-5/12 p-12 flex-col relative text-finzo-white overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-20">
      
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
      <div className="z-10">
        <img src="/images/finzowhite.png" alt="Finzo Logo" className="h-6 object-contain" />
      </div>

      {/* Spacer to push content to the bottom */}
      <div className="flex-1"></div>

      {/* ========================================= */}
      {/* MIDDLE: Typewriter Content                */}
      {/* ========================================= */}
      <div className="z-10 pr-8 mb-8 flex flex-col gap-4 min-h-[350px] justify-end">
        {visibleLines.map((line, idx) => {
          const isLastLine = idx === visibleLines.length - 1;
          const isTypingComplete = lineIndex === sequence.length - 1 && charIndex >= sequence[sequence.length - 1].text.length;

          if (line.type === 'h1') {
            return (
              <h1 key={idx} className="text-3xl xl:text-4xl font-bold mb-2 leading-tight tracking-tight min-h-[80px]">
                {line.currentText}
                {isLastLine && !isTypingComplete && <span className="animate-pulse text-finzo-white/70">...</span>}
              </h1>
            );
          }
          
          if (line.type === 'p-main') {
            return (
              <p key={idx} className="text-finzo-white/80 leading-relaxed text-base xl:text-lg mb-4">
                {line.currentText}
                {isLastLine && !isTypingComplete && <span className="animate-pulse text-finzo-white/70">...</span>}
              </p>
            );
          }

          if (line.type === 'p-sys') {
            return (
              <p key={idx} className="text-[#a855f7] font-mono text-xs xl:text-sm tracking-wide opacity-80">
                {line.currentText}
                {isLastLine && <span className="animate-pulse text-finzo-white ml-1">_</span>}
              </p>
            );
          }

          return null;
        })}
      </div>

      {/* ========================================= */}
      {/* BOTTOM: Finzo AI Profile Snippet          */}
      {/* ========================================= */}
      <div className="z-10 flex items-center gap-4 border-t border-finzo-white/10 pt-6">
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