import { useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Save } from 'lucide-react';

// Import our newly created components
import BlenderNode from './BlenderNode';
import WorkflowSidebar from './WorkflowSidebar';

// Register the custom node type
const nodeTypes = {
  blenderStyle: BlenderNode,
};

function FlowBuilder() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ 
      ...params, 
      animated: true, 
      style: { stroke: '#1746ea', strokeWidth: 2 } 
    }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const label = event.dataTransfer.getData('label');
      const color = event.dataTransfer.getData('color');
      const iconId = event.dataTransfer.getData('iconId');

      if (!label) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `node_${Date.now()}`,
        type: 'blenderStyle', 
        position,
        data: { label, color, iconId },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  return (
    // Kept your custom gradient with finzo-fourth
    <div className="w-full h-full flex relative overflow-hidden bg-finzo-fourth bg-gradient-to-br from-finzo-fourth via-finzo-primary/10 to-finzo-secondary/20">
      
      {/* Single Blue Save Button */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-finzo-primary hover:bg-finzo-secondary text-finzo-white text-sm font-bold rounded-[10px] transition-all shadow-[0_0_20px_rgba(23,70,234,0.3)] cursor-pointer">
          <Save size={16} />
          <span>Save Flow</span>
        </button>
      </div>

      {/* IMPORTED SIDEBAR COMPONENT */}
      <WorkflowSidebar />

      {/* REACT FLOW CANVAS */}
      <div className="absolute inset-0 w-full h-full z-10" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {/* Explicitly set variant="dots" and increased size to 3 for prominence */}
          <Background 
            variant="dots" 
            color="#000000" 
            gap={24} 
            size={3} 
            opacity={1} 
          />
          
          <Controls 
            position="bottom-right"
            style={{ 
              margin: '24px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderRadius: '10px',
              overflow: 'hidden'
            }} 
            className="bg-white [&>button]:!fill-black [&>button]:!bg-white [&>button]:!border-b-black/10 hover:[&>button]:bg-gray-50"
          />
        </ReactFlow>
      </div>

    </div>
  );
}

// Wrapper Component
export default function WorkflowPage() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}