import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  Layers,
  Users,
  Code,
  Database,
  Cloud,
  Cpu,
  Network,
  Zap,
} from "lucide-react";

const NetworkDiagram = () => {
  const nodes = [
    {
      id: 1,
      label: "Generative AI",
      icon: <Sparkles className="w-6 h-6" />,
      color: "#8b5cf6",
      position: { x: 15, y: 15 },
      size: "large",
    },
    {
      id: 2,
      label: "ML Models",
      icon: <Brain className="w-5 h-5" />,
      color: "#4f46e5",
      position: { x: 55, y: 10 },
      size: "medium",
    },
    {
      id: 3,
      label: "AI SaaS",
      icon: <Layers className="w-5 h-5" />,
      color: "#84cc16",
      position: { x: 75, y: 35 },
      size: "medium",
    },
    {
      id: 4,
      label: "Modern UI/UX",
      icon: <Code className="w-5 h-5" />,
      color: "#14b8a6",
      position: { x: 45, y: 55 },
      size: "medium",
    },
    {
      id: 5,
      label: "Serverless Architecture",
      icon: <Cloud className="w-5 h-5" />,
      color: "#06b6d4",
      position: { x: 65, y: 75 },
      size: "medium",
    },
    // Smaller satellite nodes
    {
      id: 6,
      icon: <Cpu className="w-4 h-4" />,
      color: "#8b5cf6",
      position: { x: 8, y: 8 },
      size: "small",
    },
    {
      id: 7,
      icon: <Network className="w-4 h-4" />,
      color: "#7c3aed",
      position: { x: 25, y: 5 },
      size: "small",
    },
    {
      id: 8,
      icon: <Database className="w-4 h-4" />,
      color: "#6366f1",
      position: { x: 62, y: 5 },
      size: "small",
    },
    {
      id: 9,
      icon: <Zap className="w-4 h-4" />,
      color: "#4f46e5",
      position: { x: 70, y: 15 },
      size: "small",
    },
    {
      id: 10,
      icon: <Users className="w-4 h-4" />,
      color: "#84cc16",
      position: { x: 85, y: 30 },
      size: "small",
    },
    {
      id: 11,
      icon: <Code className="w-4 h-4" />,
      color: "#65a30d",
      position: { x: 82, y: 45 },
      size: "small",
    },
    {
      id: 12,
      icon: <Database className="w-4 h-4" />,
      color: "#14b8a6",
      position: { x: 38, y: 62 },
      size: "small",
    },
    {
      id: 13,
      icon: <Cloud className="w-4 h-4" />,
      color: "#06b6d4",
      position: { x: 72, y: 85 },
      size: "small",
    },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 4 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
    { from: 1, to: 6 },
    { from: 1, to: 7 },
    { from: 2, to: 8 },
    { from: 2, to: 9 },
    { from: 3, to: 10 },
    { from: 3, to: 11 },
    { from: 4, to: 12 },
    { from: 5, to: 13 },
  ];

  const getNodeSize = (size: string) => {
    switch (size) {
      case "large":
        return { width: 140, height: 140 };
      case "medium":
        return { width: 100, height: 100 };
      case "small":
        return { width: 50, height: 50 };
      default:
        return { width: 100, height: 100 };
    }
  };

  return (
    <div className="network-diagram">
      <svg className="network-connections" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {connections.map((conn, index) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={index}
              x1={fromNode.position.x}
              y1={fromNode.position.y}
              x2={toNode.position.x}
              y2={toNode.position.y}
              stroke="url(#lineGradient)"
              strokeWidth="0.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Animated dots along connections */}
        {connections.slice(0, 5).map((conn, index) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.circle
              key={`dot-${index}`}
              r="0.3"
              fill="#4f46e5"
              initial={{
                cx: fromNode.position.x,
                cy: fromNode.position.y,
              }}
              animate={{
                cx: [fromNode.position.x, toNode.position.x, fromNode.position.x],
                cy: [fromNode.position.y, toNode.position.y, fromNode.position.y],
              }}
              transition={{
                duration: 3,
                delay: index * 0.6,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </svg>

      {nodes.map((node, index) => {
        const size = getNodeSize(node.size);
        return (
          <motion.div
            key={node.id}
            className={`network-node ${node.size}`}
            style={{
              left: `${node.position.x}%`,
              top: `${node.position.y}%`,
              backgroundColor: node.color,
              width: size.width,
              height: size.height,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: `0 0 30px ${node.color}80`,
            }}
          >
            <motion.div
              className="node-icon"
              animate={{
                rotate: node.size === "large" ? [0, 360] : 0,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {node.icon}
            </motion.div>
            {node.label && (
              <motion.div
                className="node-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {node.label}
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Orbital rings */}
      <motion.div
        className="orbital-ring ring-1"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orbital-ring ring-2"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="orbital-ring ring-3"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default NetworkDiagram;
