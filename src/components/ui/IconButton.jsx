export default function IconButton({ icon: Icon, onClick, hasBadge = false }) {
  return (
    <button 
      onClick={onClick}
      className="w-9 h-9 flex items-center justify-center bg-finzo-white/5 hover:bg-finzo-white/10 text-finzo-white/70 hover:text-finzo-white transition-colors rounded cursor-pointer relative"
    >
      <Icon size={18} />
      {hasBadge && (
        <span className="absolute top-2 right-2 w-2 h-2 bg-finzo-primary rounded-full"></span>
      )}
    </button>
  );
}