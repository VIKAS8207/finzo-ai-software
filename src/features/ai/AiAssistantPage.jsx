import { useState } from 'react';
import { Paperclip, Sparkles, Mic, ArrowUp, Image as ImageIcon } from 'lucide-react';
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
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-transparent overflow-hidden">
      
      {/* Central Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl -mt-20">
        
        {/* 1. HERO TEXT */}
        <h1 className="text-4xl md:text-5xl font-bold text-finzo-white mb-2 tracking-tight">
          Meet Finzo AI
        </h1>
        <p className="text-finzo-white/60 mb-10 text-base md:text-lg">
          Ask detailed questions for better responses
        </p>

        {/* 2. THE MAIN INPUT COMMAND CENTER (Expanded Height) */}
        <div className="relative w-full max-w-2xl mb-12">
          
          {/* Subtle multi-color glow at the bottom */}
          <div className="absolute -bottom-2 left-10 right-10 h-6 bg-gradient-to-r from-finzo-primary via-[#a855f7] to-finzo-secondary rounded blur-xl opacity-40 pointer-events-none"></div>
          
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
            className="relative flex flex-col bg-black/60 backdrop-blur-xl border border-finzo-white/10 rounded-2xl p-4 min-h-[140px] focus-within:border-finzo-primary/50 transition-all shadow-2xl"
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
                <button type="button" className="p-2 text-finzo-white/50 hover:text-finzo-white hover:bg-finzo-white/10 transition-colors rounded cursor-pointer">
                  <Paperclip size={20} />
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
                
                {/* Circular Send Button */}
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`p-2.5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                    inputValue.trim() 
                      ? 'bg-[#818cf8] text-white hover:bg-finzo-primary shadow-[0_0_15px_rgba(70,117,255,0.4)]' 
                      : 'bg-finzo-white/10 text-finzo-white/30 cursor-not-allowed'
                  }`}
                >
                  <ArrowUp size={20} strokeWidth={2.5} />
                </button>
              </div>
              
            </div>
          </form>
        </div>

        {/* 3. SUGGESTED PROMPTS (Perfectly Centered) */}
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
    </div>
  );
}