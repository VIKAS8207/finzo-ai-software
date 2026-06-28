import { Sparkles } from 'lucide-react';

export default function AiTypingIndicator() {
  return (
    <div className="message-bubble flex w-full justify-start items-center">
      
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-finzo-primary to-finzo-secondary flex items-center justify-center shrink-0 mr-4 shadow-[0_0_15px_rgba(23,70,234,0.3)]">
        <Sparkles size={14} className="text-finzo-white" />
      </div>
      
      {/* Classic Waving Circles (No borders, no background, just white dots) */}
      <div className="flex items-center gap-1.5 h-[44px] px-2">
        <div className="w-2 h-2 rounded-full bg-finzo-white/70 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-finzo-white/70 animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-finzo-white/70 animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      
    </div>
  );
}