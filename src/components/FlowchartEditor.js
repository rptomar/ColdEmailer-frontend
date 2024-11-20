import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import ColdEmailNode from "./nodes/ColdEmailNode";
import WaitDelayNode from "./nodes/WaitDelayNode";
import LeadSourceNode from "./nodes/LeadSourceNode";
import { saveFlowchart } from "../api/flowchartApi";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const nodeTypes = {
  coldEmail: ColdEmailNode,
  waitDelay: WaitDelayNode,
  leadSource: LeadSourceNode,
};

const initialNodes = [
  { id: "1", type: "leadSource", position: { x: 250, y: 100 }, data: { heading: "Lead Source", text: "" } },
];

const initialEdges = [];

const FlowchartEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const navigate = useNavigate();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const addNode = (type) => {
    const id = `${nodes.length + 1}`;
    const newNode = {
      id,
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { heading: `${type} Node`, text: "" },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleTextChange = (id, field, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, [field]: value } } : node
      )
    );
  };

  const handleSave = async () => {
    const flowchart = {
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        heading: node.data.heading,
        text: node.data.text,
      })),
      edges,
    };
    console.log("Saved Flowchart:", flowchart);
    try {
        const response = await saveFlowchart(flowchart); // Call your save function
        if (response.data) {
          swal("Success", "FlowChart is Saved Successfully", "success").then(() => {
            navigate("/flowcharts"); // Navigate after successful submission
          });
        } else {
          swal("Error", "Error in saving flowchart", "error");
        }
      } catch (error) {
        console.error("Error saving flowchart:", error);
        swal("Error", "An unexpected error occurred", "error");
      }
    }

  return (
    <div className="flowchart-container">
      <div className="controls">
        <button onClick={() => addNode("coldEmail")}>Add Cold Email Node</button>
        <button onClick={() => addNode("waitDelay")}>Add Wait/Delay Node</button>
        <button onClick={() => addNode("leadSource")}>Add Lead Source Node</button>
        <button onClick={handleSave}>Save and Schedule Flowchart</button>
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              onTextChange: (field, value) => handleTextChange(node.id, field, value),
            },
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default FlowchartEditor;

