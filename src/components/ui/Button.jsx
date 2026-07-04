import { ChevronRight } from 'lucide-react';

export default function Button({ 
  variant = 'primary', 
  children, 
  disabled = false, 
  onClick, 
  type = "button",
  icon: Icon = null 
}) {
  if (variant === 'secondary') {
    return (
      <button 
        type={type} 
        onClick={onClick} 
        className="text-sm font-bold text-finzo-white/50 hover:text-finzo-white transition-colors cursor-pointer"
      >
        {children}
      </button>
    );
  }

  // Primary Variant
  return (
    <button 
      type={type} 
      disabled={disabled} 
      onClick={onClick} 
      className={`px-8 py-2.5 rounded-[10px] font-bold transition-all flex items-center gap-2 ${
        !disabled 
          ? 'bg-finzo-primary text-white hover:bg-finzo-secondary shadow-[0_0_20px_rgba(23,70,234,0.3)] cursor-pointer hover:scale-[1.02]' 
          : 'bg-finzo-white/5 text-finzo-white/30 cursor-not-allowed'
      }`}
    >
      {children} 
      {Icon && <Icon size={18} />}
    </button>
  );
}