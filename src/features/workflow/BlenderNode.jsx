import { Handle, Position, useReactFlow } from 'reactflow';
import { FileText, Truck, ShieldCheck, Receipt, Trash2, ChevronRight } from 'lucide-react';

// Shared icons
export const iconLookup = {
  purchaseOrder: FileText,
  waybridge: Truck,
  gatePass: ShieldCheck,
  purchaseInvoice: Receipt,
};

export default function BlenderNode({ id, data }) {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    // Removed overflow-hidden so the handles can sit perfectly on the outer edges
    <div className="w-[280px] bg-[#121212] rounded-[10px] border border-finzo-white/10 shadow-2xl font-spline-sans">
      
      {/* 1. HEADER (Matches the reference image exactly) */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-[#1a1a1a] rounded-t-[10px] border-b border-finzo-white/5">
        <div className="flex items-center gap-2.5">
          {/* Colored square icon */}
          <div 
            className="w-2.5 h-2.5 rounded-[2px]" 
            style={{ backgroundColor: data.color || '#10b981' }}
          ></div>
          <span className="text-xs font-bold text-finzo-white tracking-wide">{data.label}</span>
        </div>
        <button onClick={onDelete} className="text-finzo-white/40 hover:text-finzo-white transition-colors cursor-pointer">
          <Trash2 size={14} />
        </button>
      </div>

      {/* 2. BODY (Row-based Ports & Controls) */}
      <div className="p-3 flex flex-col gap-3 rounded-b-[10px] bg-[#121212]">
        
        {/* Connection Ports Area */}
        <div className="flex flex-col gap-2.5 relative">
          
          {/* Row 1: Left & Right Ports */}
          <div className="flex justify-between items-center relative">
            <div className="flex items-center gap-2">
              <Handle 
                type="target" 
                id="in-data" 
                position={Position.Left} 
                className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] border-none !-left-[17px]" 
              />
              <span className="text-[11px] font-medium text-finzo-white/70">Document Data</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-finzo-white/70">Validated Output</span>
              <Handle 
                type="source" 
                id="out-valid" 
                position={Position.Right} 
                className="w-2.5 h-2.5 rounded-full bg-[#22c55e] border-none !-right-[17px]" 
              />
            </div>
          </div>

          {/* Row 2: Left Port Only */}
          <div className="flex justify-between items-center relative">
            <div className="flex items-center gap-2">
              <Handle 
                type="target" 
                id="in-ref" 
                position={Position.Left} 
                className="w-2.5 h-2.5 rounded-full bg-[#22c55e] border-none !-left-[17px]" 
              />
              <span className="text-[11px] font-medium text-finzo-white/70">Reference API</span>
            </div>
          </div>

          {/* Row 3: Left Port Only */}
          <div className="flex justify-between items-center relative">
            <div className="flex items-center gap-2">
              <Handle 
                type="target" 
                id="in-lora" 
                position={Position.Left} 
                className="w-2.5 h-2.5 rounded-full bg-[#ec4899] border-none !-left-[17px]" 
              />
              <span className="text-[11px] font-medium text-finzo-white/70">Approval Rules</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px w-full bg-finzo-white/5 my-1"></div>

        {/* Form Controls (Matches Reference Image) */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-finzo-white/50 font-medium tracking-wide">Model</span>
          <div className="w-full bg-[#1a1a1a] border border-finzo-white/10 rounded-md p-2 flex items-center cursor-pointer hover:border-finzo-white/20 transition-colors">
            <span className="text-xs text-finzo-white font-medium">Finzo Extract V2</span>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 mt-1 cursor-pointer">
          <input 
            type="checkbox" 
            defaultChecked 
            className="w-3.5 h-3.5 rounded-sm bg-[#1a1a1a] border-finzo-white/20 accent-finzo-white cursor-pointer" 
          />
          <span className="text-[11px] text-finzo-white/70">Use strict validation</span>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-finzo-white/5 my-1"></div>

        {/* Advanced Settings Expander */}
        <div className="flex items-center justify-between cursor-pointer group pb-1">
          <span className="text-[11px] font-medium text-finzo-white/70 group-hover:text-finzo-white transition-colors">
            Advanced settings
          </span>
          <ChevronRight size={14} className="text-finzo-white/40 group-hover:text-finzo-white transition-colors" />
        </div>

      </div>
    </div>
  );
}