import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { gsap } from 'gsap';

export default function GlobalSearch({ placeholder = "Ask finzo.ai anything..." }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // Refs for GSAP animation and click-outside detection
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Handle clicking outside the component to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the search bar is open, and the click happened outside of it, close it.
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // GSAP Animation Engine
  useEffect(() => {
    if (isExpanded) {
      // Expand Animation
      gsap.to(containerRef.current, {
        width: 300, // Expands to 300px
        duration: 0.5,
        ease: "expo.out", // A very snappy, modern easing curve
      });
      gsap.to(inputRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        delay: 0.1, // Wait a fraction of a second for the box to open before fading in text
      });
      inputRef.current.focus();
    } else {
      // Collapse Animation
      gsap.to(inputRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.2,
      });
      gsap.to(containerRef.current, {
        width: 36, // 36px is exactly 'w-9' to match your IconButton
        duration: 0.4,
        ease: "power3.inOut",
        delay: 0.1,
      });
    }
  }, [isExpanded]);

  const handleClear = (e) => {
    e.stopPropagation(); // Prevents the container from re-triggering the expand click
    setInputValue('');
    inputRef.current.focus();
  };

  return (
    // The container initializes at 36px (w-9) and h-9 to match your IconButton exactly.
    // We conditionally apply the blue border and shadow only when it's active.
    <div 
      ref={containerRef}
      className={`relative flex items-center h-9 bg-finzo-white/5 rounded overflow-hidden transition-colors duration-300 ${
        isExpanded 
          ? 'border border-finzo-white/10 shadow-[0_0_15px_rgba(23,70,234,0.2)]' 
          : 'border border-transparent hover:bg-finzo-white/10'
      }`}
      style={{ width: '36px' }} 
    >
      
      {/* Search Icon (Acts as the trigger) */}
      <button 
        onClick={() => setIsExpanded(true)}
        className={`w-9 h-9 flex items-center justify-center shrink-0 cursor-pointer ${
          isExpanded ? 'text-finzo-secondary' : 'text-finzo-white/70 hover:text-finzo-white'
        }`}
      >
        <Search size={18} />
      </button>

      {/* Input Field (Invisible until GSAP animates it) */}
      <input 
        ref={inputRef}
        type="text" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none text-sm text-finzo-white placeholder-finzo-white/40 opacity-0 pointer-events-none pr-2"
      />

      {/* Clear/Close 'X' Icon (Only shows when expanded and has text) */}
      <div className={`transition-opacity duration-200 ${isExpanded && inputValue ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={handleClear}
          className="w-8 h-8 flex items-center justify-center text-finzo-white/40 hover:text-finzo-white shrink-0 cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

    </div>
  );
}