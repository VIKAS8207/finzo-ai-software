import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  Bell, Settings, LayoutDashboard, FileInput, BarChart2, 
  Globe, Users, HelpCircle, ChevronLeft, ChevronDown, MessageCircleMore, MessageSquare, FileUp, Route, RouteIcon
} from 'lucide-react';

// Imported Reusable Components
import BackgroundCanvas from '../ui/BackgroundCanvas';
import GlobalSearch from '../ui/GlobalSearch';
import IconButton from '../ui/IconButton';
import SidebarIcon from '../ui/SidebarIcon';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  
  const subMenus = {
    dashboard: ['Overview', 'Performance', 'Recent Activity'],
    portfolio: ['Vendor Report', 'Erorr', 'Manual Approval'],
    ai:        ['Chat Assistant', 'Data Insights', 'Automation'],
    community: ['Forums', 'Leaderboard', 'Events'],
    support:   ['FAQ', 'Contact Agent', 'My Tickets']
  };

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    if (subMenus[menuId]) {
      setIsSubMenuOpen(true);
    } else {
      setIsSubMenuOpen(false);
    }

    if (menuId === 'portfolio') {
    navigate('/portfolio/upload');
    } else if (menuId === 'dashboard') {
      navigate('/dashboard');
    }

    if (menuId === 'ai') {
      navigate('/ai');
    } else if (menuId === 'dashboard') {
      navigate('/dashboard');
    }

    if (menuId === 'flow') {
    navigate('/workflow');
  }else if (menuId === 'dashboard') {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black text-finzo-white font-spline-sans overflow-hidden">

      {/* ========================================= */}
      {/* 1. TOP NAVBAR (Global Level)              */}
      {/* ========================================= */}
      <header className="h-16 w-full shrink-0 flex items-center justify-between pr-8 pl-4 bg-black z-30 relative">
        
        {/* LEFT: Logo + Firm Dropdown */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 cursor-pointer pl-2">
            <div className="w-8 h-8 p-[2px] flex items-center justify-center overflow-hidden">
              <img src="/images/finzosmalllogo.png" alt="Finzo Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="w-px h-6 bg-finzo-white/10 hidden sm:block"></div>

          <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-finzo-white/5 cursor-pointer transition-colors">
            <span className="text-sm font-bold text-finzo-white tracking-wide">Finzo Software</span>
            <ChevronDown size={16} className="text-finzo-white/50" />
          </div>
        </div>

        {/* RIGHT: Using Reusable Components */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 pr-6">
            <GlobalSearch />
            <IconButton icon={Bell} hasBadge={true} onClick={() => console.log('Notifications opened')} />
            <IconButton icon={Settings} onClick={() => console.log('Settings opened')} />
          </div>

          {/* Profile block */}
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded bg-gradient-to-tr from-finzo-primary to-finzo-third p-[2px]">
              <div className="w-full h-full bg-finzo-fourth rounded overflow-hidden flex items-center justify-center">
                <span className="text-sm font-bold text-finzo-white">V</span>
              </div>
            </div>
            <div className="hidden xl:block">
              <p className="text-sm font-bold leading-tight">Vikas V.</p>
              <p className="text-xs text-finzo-white/50">Admin</p>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================= */}
      {/* BOTTOM SECTION (Sidebars + Main Content)    */}
      {/* ========================================= */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* 2. FIXED PRIMARY SIDEBAR */}
        <aside className="w-[80px] min-w-[80px] h-full border-r border-finzo-white/5 flex flex-col items-center py-6 gap-2 bg-black z-30">
          <nav className="flex-1 flex flex-col gap-4 w-full px-3">
            <SidebarIcon icon={LayoutDashboard} label="Home" isActive={activeMenu === 'dashboard'} onClick={() => handleMenuClick('dashboard')} />
            <SidebarIcon icon={FileInput} label="Upload Document" isActive={activeMenu === 'portfolio'} onClick={() => handleMenuClick('portfolio')} />
            <SidebarIcon icon={MessageCircleMore } label="AI Assistant" isActive={activeMenu === 'ai'} onClick={() => handleMenuClick('ai')} />
            <SidebarIcon icon={Route} label="Work Flow" isActive={activeMenu === 'flow'} onClick={() => handleMenuClick('flow')} />
            
            <div className="my-2 border-b border-finzo-white/10 w-8 mx-auto"></div>
            
            <SidebarIcon icon={Users} label="Community" isActive={activeMenu === 'community'} onClick={() => handleMenuClick('community')} />
            <SidebarIcon icon={HelpCircle} label="Support" isActive={activeMenu === 'support'} onClick={() => handleMenuClick('support')} />
          </nav>
        </aside>

        {/* 3. INTERACTIVE SECONDARY SIDEBAR */}
        <aside 
          className={`h-full border-r border-black bg-[#080808] transition-all duration-300 ease-in-out z-20 flex flex-col whitespace-nowrap overflow-hidden
          ${isSubMenuOpen ? 'w-[200px] opacity-100' : 'w-0 opacity-0 border-r-0'}`}
        >
          <div className="p-6 overflow-hidden flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-bold tracking-widest text-finzo-white/40 uppercase">
                {activeMenu}
              </h2>
              <button onClick={() => setIsSubMenuOpen(false)} className="text-finzo-white/40 hover:text-finzo-white transition-colors cursor-pointer">
                <ChevronLeft size={18} />
              </button>
            </div>
            
            <ul className="flex-1 flex flex-col gap-2">
              {subMenus[activeMenu]?.map((item, idx) => (
                <li key={idx}>
                  <button className="w-full text-left px-4 py-2 rounded text-sm text-finzo-white/70 hover:bg-finzo-white/5 hover:text-finzo-white transition-colors cursor-pointer">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* 4. MAIN CONTENT CANVAS */}
        <main className="flex-1 relative z-10 rounded-tl-[15px] border-t border-l border-black overflow-hidden bg-black mt-1">
          <BackgroundCanvas />
          <div className="absolute inset-0 w-full h-full overflow-y-auto z-10 custom-scrollbar">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}