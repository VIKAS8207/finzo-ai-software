export default function SidebarIcon({ icon: Icon, label, isActive, onClick }) {
  return (
    <div className="relative group flex justify-center w-full">
      <button 
        onClick={onClick}
        className={`w-12 h-12 rounded transition-all duration-200 cursor-pointer flex items-center justify-center
          ${isActive 
            ? 'bg-finzo-primary text-finzo-white shadow-[0_0_15px_rgba(23,70,234,0.4)]' 
            : 'text-finzo-white/60 hover:bg-finzo-white/10 hover:text-finzo-white'
          }
        `}
      >
        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-finzo-white" : ""} />
      </button>
      
      {/* Tooltip appears on hover */}
      <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-finzo-white text-black text-xs font-bold px-3 py-1.5 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
        {label}
      </span>
    </div>
  );
}