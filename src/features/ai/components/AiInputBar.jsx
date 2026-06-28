import { Paperclip, Mic, ArrowUp } from 'lucide-react';

export default function AiInputBar({ inputValue, setInputValue, handleSendMessage }) {
  return (
    <div className="shrink-0 w-full max-w-4xl mx-auto px-6 pb-6 pt-2">
      <form 
        onSubmit={handleSendMessage}
        className="relative flex items-center bg-black/60 backdrop-blur-xl border border-finzo-white/10 rounded-[10px] px-2 py-1.5 focus-within:border-finzo-primary/50 transition-all shadow-2xl"
      >
        {/* Left: Attachment */}
        <button 
          type="button" 
          className="p-2.5 text-finzo-white/50 hover:text-finzo-white hover:bg-finzo-white/10 transition-colors rounded-[10px] cursor-pointer shrink-0"
        >
          <Paperclip size={18} />
        </button>
        
        {/* Center: Slim Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Reply to Finzo AI..."
          className="flex-1 w-full bg-transparent text-sm text-finzo-white placeholder-finzo-white/40 outline-none px-3"
        />
        
        {/* Right: Mic & Send */}
        <div className="flex items-center gap-1 shrink-0">
          <button 
            type="button" 
            className="p-2.5 text-finzo-white/50 hover:text-finzo-secondary hover:bg-finzo-white/10 transition-colors rounded-[10px] cursor-pointer"
          >
            <Mic size={18} />
          </button>
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className={`w-9 h-9 rounded-[10px] transition-all cursor-pointer flex items-center justify-center ${
              inputValue.trim() 
                ? 'bg-[#818cf8] text-white hover:bg-finzo-primary shadow-[0_0_15px_rgba(70,117,255,0.4)]' 
                : 'bg-finzo-white/10 text-finzo-white/30 cursor-not-allowed'
            }`}
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </div>
  );
}