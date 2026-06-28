import { Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BreadcrumbNav({ paths = [], children }) {
  const navigate = useNavigate();

  return (
    // Flex container with justify-between pushes the breadcrumbs to the left and {children} to the right
    <nav className="w-full flex items-center justify-between mb-2">
      
      {/* LEFT SIDE: The Breadcrumb Trail */}
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-finzo-white/40">
        <Home 
          size={14} 
          className="hover:text-finzo-primary cursor-pointer transition-colors" 
          onClick={() => navigate('/dashboard')}
        />
        
        {paths.map((path, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight size={14} />
            <span 
              onClick={() => path.link && navigate(path.link)}
              className={`${
                index === paths.length - 1 
                  ? 'text-finzo-primary cursor-default' // Last item is blue and not clickable
                  : 'hover:text-finzo-primary cursor-pointer transition-colors'
              }`}
            >
              {path.label}
            </span>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE: Open space for future buttons, dropdowns, etc. */}
      <div className="flex items-center gap-3">
        {children}
      </div>

    </nav>
  );
}