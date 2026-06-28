import { useState } from 'react';
import { Sparkles, Mic, Send, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AiAssistantPage() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  // Vertical list prompts to match the reference image
  const suggestedPrompts = [
    "Help me review my current portfolio performance",
    "Compare the latest movements in tech stocks vs real estate",
    "How to identify high-yield diversification strategies?"
  ];

  const handleSend = (text) => {
    if (!text.trim()) return;
    // Push to the new route and pass the user's text inside the 'state' object
    navigate('/ai/chat', { state: { initialPrompt: text } });
  };

  return (
    // Transparent wrapper so your Layout's BackgroundCanvas shows through
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-transparent overflow-hidden font-spline-sans">
      
      {/* --- CUSTOM CSS FOR ANIMATIONS --- */}
      <style>{`
        /* Smooth panning for the bottom gradient */
        @keyframes pan-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-pan {
          background-size: 200% 200%;
          animation: pan-gradient 8s ease infinite;
        }
      `}</style>

      {/* --- AMBIENT MOVING BOTTOM GRADIENT --- */}
      {/* Sits at the very bottom, blurs upward, and slowly shifts left to right */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-r from-finzo-primary/10 via-[#a855f7]/15 to-finzo-secondary/10 blur-[60px] animate-pan pointer-events-none z-0"></div>

      {/* Central Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl -mt-16">
        
        {/* 1. HERO TEXT */}
        <h1 className="text-4xl md:text-5xl font-bold text-finzo-white mb-2 tracking-tight">
          Meet Finzo AI
        </h1>
        <p className="text-finzo-white/60 mb-10 text-base md:text-lg">
          Ask detailed questions for better responses
        </p>

        {/* 2. THE MAIN INPUT COMMAND CENTER (With Running Border) */}
        {/* p-[1px] creates the border thickness. overflow-hidden clips the spinning circle. */}
        <div className="relative w-full max-w-2xl mb-12 rounded-2xl overflow-hidden p-[1px] shadow-[0_0_40px_rgba(0,0,0,0.5)] group">
          
          {/* THE MAGIC: A spinning conic gradient acting as the glowing border */}
          {/* opacity increases when the user clicks into the form (group-focus-within) */}
          <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_0%,transparent_50%,#1746ea_75%,#a855f7_100%)] opacity-30 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
            className="relative z-10 flex flex-col bg-[#0a0a0a] rounded-[15px] p-4 min-h-[140px] transition-all"
          >
            {/* Top Area: Text Input */}
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything"
              className="flex-1 w-full bg-transparent text-base text-finzo-white placeholder-finzo-white/40 outline-none resize-none mb-4 custom-scrollbar"
              rows="3"
            />
            
            {/* Bottom Area: Toolbar */}
            <div className="flex items-center justify-between mt-auto">
              
              {/* Left Actions (Image & Paperclip) */}
              <div className="flex items-center gap-1">
                <button type="button" className="p-2 text-finzo-white/50 hover:text-finzo-white hover:bg-finzo-white/10 transition-colors rounded cursor-pointer">
                  <ImageIcon size={20} />
                </button>
              </div>
              
              {/* Right Actions (Mic & Send) */}
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  className="p-2 text-finzo-white/50 hover:text-finzo-secondary hover:bg-finzo-white/10 transition-colors rounded cursor-pointer"
                >
                  <Mic size={20} />
                </button>
                
                {/* Premium Circular Send Button */}
{/* Premium Circular Send Button */}
<button 
  type="submit"
  disabled={!inputValue.trim()}
  className={`relative w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center overflow-hidden group ${
    inputValue.trim() 
      ? 'bg-gradient-to-tr from-finzo-primary to-finzo-secondary text-finzo-white shadow-[0_0_15px_rgba(23,70,234,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 hover:scale-105 active:scale-95 cursor-pointer' 
      : 'bg-finzo-white/5 text-finzo-white/30 border border-finzo-white/10 cursor-not-allowed'
  }`}
>
  {/* Subtle inner shine effect that appears on hover */}
  {inputValue.trim() && (
    <div className="absolute inset-0 bg-finzo-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full pointer-events-none"></div>
  )}
  
  {/* The Send Icon (Paper Airplane) with a visual centering nudge */}
  <Send size={18} strokeWidth={2.5} className="relative z-10 -ml-0.5 mt-0.5" />
</button>
              </div>
              
            </div>
          </form>
        </div>

        {/* 3. SUGGESTED PROMPTS */}
        <div className="flex flex-col items-center gap-5 w-full">
          {suggestedPrompts.map((prompt, idx) => (
            <button 
              key={idx}
              onClick={() => handleSend(prompt)}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <Sparkles size={16} className="text-finzo-white/30 group-hover:text-[#818cf8] transition-colors shrink-0" />
              <span className="text-sm text-finzo-white/50 group-hover:text-finzo-white transition-colors text-center">
                {prompt}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* --- AI DISCLAIMER TEXT --- */}
      {/* Pinned to the absolute bottom of the container */}
      <div className="absolute bottom-6 z-20 text-center w-full pointer-events-none">
        <p className="text-[11px] text-finzo-white/30 font-medium tracking-wide">
          Finzo AI can make mistakes. Please verify important information.
        </p>
      </div>

    </div>
  );
}