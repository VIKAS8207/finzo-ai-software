import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Edit2, Check } from 'lucide-react';
import { gsap } from 'gsap';

// Import our reusable components
import AiInputBar from './components/AiInputBar';
import AiTypingIndicator from './components/AiTypingIndicator';
import BreadcrumbNav from '../../components/ui/BreadcrumbNav'; 

export default function AiChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialPrompt = location.state?.initialPrompt || "Hello!";

  const words = initialPrompt.split(' ');
  const defaultTitle = words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');
  const [chatTitle, setChatTitle] = useState(defaultTitle);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [messages, setMessages] = useState([]);
  
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const firstUserMessage = { id: Date.now(), sender: 'user', text: initialPrompt };
    setMessages([firstUserMessage]);
    
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          sender: 'ai', 
          text: "I've analyzed your request. Based on the current market data and your portfolio configuration, here is a detailed breakdown of the strategies you can implement right away." 
        }
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const messageElements = chatContainerRef.current?.querySelectorAll('.message-bubble');
    if (messageElements && messageElements.length > 0) {
      const newestMessage = messageElements[messageElements.length - 1];
      gsap.fromTo(newestMessage, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, sender: 'ai', text: "That's a great follow-up question. Here is how we can integrate that into the current workflow." }
      ]);
    }, 1500);
  };

  const handleSaveTitle = () => {
    if (!chatTitle.trim()) setChatTitle("Untitled Chat");
    setIsEditingTitle(false);
  };

  return (
    // THE MASTER CONTAINER: Takes full height, completely hides outer scrolling.
    <div className="w-full h-full flex flex-col overflow-hidden font-spline-sans relative">
      
      {/* ========================================================= */}
      {/* 1. FIXED TOP: Navbar (shrink-0 means it will NEVER shrink) */}
      {/* ========================================================= */}
      <div className="shrink-0 w-full border-b border-finzo-white/5  z-20">
        <div className="max-w-7xl mx-auto pt-6 px-6 md:pt-8 md:px-10 pb-4">
          <BreadcrumbNav 
            paths={[
              { label: 'Finzo AI', link: '/ai' },
              { label: 'Active Session' }
            ]}
          >
            <div className="flex items-center">
              {isEditingTitle ? (
                <div className="flex items-center gap-2 bg-finzo-white/10 rounded-[10px] px-3 py-1.5 border border-finzo-white/20">
                  <input
                    type="text"
                    autoFocus
                    value={chatTitle}
                    onChange={(e) => setChatTitle(e.target.value)}
                    onBlur={handleSaveTitle}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveTitle();
                    }}
                    className="bg-transparent text-sm text-finzo-white outline-none w-48"
                  />
                  <button onMouseDown={handleSaveTitle} className="text-finzo-secondary hover:text-finzo-primary cursor-pointer">
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditingTitle(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-finzo-white/80 hover:text-finzo-white hover:bg-finzo-white/5 rounded-[10px] transition-all group cursor-pointer"
                >
                  <span className="font-medium tracking-wide">{chatTitle}</span>
                  <Edit2 size={12} className="text-finzo-white/30 group-hover:text-finzo-white/80 transition-colors" />
                </button>
              )}
            </div>
          </BreadcrumbNav>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SCROLLING MIDDLE: Chat Canvas (flex-1 forces it to fill space) */}
      {/* ========================================================= */}
      <div className="flex-1 overflow-y-auto w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div 
          ref={chatContainerRef}
          className="w-full max-w-4xl mx-auto flex flex-col gap-8 px-6 pb-6 pt-6"
        >
          <div className="flex flex-col items-center justify-center pt-4 pb-8 opacity-80 select-none pointer-events-none">
            <Sparkles className="text-finzo-secondary mb-2" size={24} />
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-finzo-white via-[#a855f7] to-finzo-secondary tracking-wide">
              Finzo AI
            </h2>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`message-bubble flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-finzo-primary to-finzo-secondary flex items-center justify-center shrink-0 mr-4 mt-1 shadow-[0_0_15px_rgba(23,70,234,0.3)]">
                  <Sparkles size={14} className="text-finzo-white" />
                </div>
              )}

              <div 
                className={`max-w-[85%] md:max-w-[75%] p-4 text-[15px] leading-relaxed shadow-md ${
                  msg.sender === 'user' 
                    ? 'bg-finzo-white/10 rounded-[10px] rounded-tr-sm text-finzo-white backdrop-blur-sm' 
                    : 'bg-finzo-white/5 border border-finzo-white/10 rounded-[10px] rounded-tl-sm text-finzo-white/90'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && <AiTypingIndicator />}
          
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. FIXED BOTTOM: Input Bar (shrink-0 keeps it glued to bottom) */}
      {/* ========================================================= */}
      <div className="shrink-0 w-full bg-gradient-to-t from-finzo-fourth via-[#FFFFF] to-transparent pt-4 pb-6 z-20">
        <AiInputBar 
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
        />
      </div>

    </div>
  );
}