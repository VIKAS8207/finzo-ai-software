import { GripVertical } from 'lucide-react';
import { iconLookup } from './BlenderNode'; // Import the shared icons

const sidebarNodes = [
  { id: 'purchaseOrder', label: 'Purchase Order', color: '#1746ea' },
  { id: 'waybridge', label: 'Waybridge', color: '#a855f7' },
  { id: 'gatePass', label: 'Gate Pass', color: '#f59e0b' },
  { id: 'purchaseInvoice', label: 'Purchase Invoice', color: '#10b981' },
];

export default function WorkflowSidebar() {
  
  const onDragStart = (event, nodeLabel, nodeColor, iconId) => {
    event.dataTransfer.setData('label', nodeLabel);
    event.dataTransfer.setData('color', nodeColor);
    event.dataTransfer.setData('iconId', iconId);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="absolute top-6 left-6 bottom-6 w-64 bg-black/60 backdrop-blur-xl border border-finzo-white/10 rounded-[10px] p-4 flex flex-col gap-3 z-20 shadow-2xl overflow-y-auto custom-scrollbar">
      <h3 className="text-xs font-bold text-finzo-white/40 uppercase tracking-widest mb-2 px-1">Modules</h3>
      
      {sidebarNodes.map((node) => {
        const Icon = iconLookup[node.id];
        return (
          <div
            key={node.id}
            draggable
            onDragStart={(event) => onDragStart(event, node.label, node.color, node.id)}
            className="flex items-center gap-3 p-3 bg-finzo-white/5 hover:bg-finzo-white/10 border border-finzo-white/5 rounded-[10px] cursor-grab active:cursor-grabbing transition-colors group"
          >
            <GripVertical size={16} className="text-finzo-white/20 group-hover:text-finzo-white/50 transition-colors" />
            <div 
              className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 shadow-inner"
              style={{ backgroundColor: `${node.color}20`, color: node.color }}
            >
              <Icon size={16} />
            </div>
            <span className="text-sm font-medium text-finzo-white">{node.label}</span>
          </div>
        );
      })}
      
      <div className="mt-auto p-4 bg-finzo-white/5 border border-finzo-white/10 rounded-[10px]">
        <p className="text-xs text-finzo-white/50 leading-relaxed text-center">
          Drag a module and drop it onto the grid to connect them.
        </p>
      </div>
    </aside>
  );
}