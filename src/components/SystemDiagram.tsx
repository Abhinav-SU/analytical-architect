import React from 'react';
import { motion } from 'framer-motion';

const SystemDiagram: React.FC = () => {
  const nodes = [
    { id: 1, x: 20, y: 20, delay: 0 },
    { id: 2, x: 80, y: 30, delay: 0.2 },
    { id: 3, x: 60, y: 70, delay: 0.4 },
    { id: 4, x: 10, y: 80, delay: 0.6 },
    { id: 5, x: 90, y: 85, delay: 0.8 },
  ];

  const connections = [
    { from: { x: 20, y: 20 }, to: { x: 80, y: 30 }, delay: 1 },
    { from: { x: 80, y: 30 }, to: { x: 60, y: 70 }, delay: 1.2 },
    { from: { x: 60, y: 70 }, to: { x: 10, y: 80 }, delay: 1.4 },
    { from: { x: 20, y: 20 }, to: { x: 60, y: 70 }, delay: 1.6 },
    { from: { x: 60, y: 70 }, to: { x: 90, y: 85 }, delay: 1.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {/* Connections */}
        {connections.map((connection, index) => (
          <motion.line
            key={`connection-${index}`}
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke="hsl(var(--primary))"
            strokeWidth="0.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              delay: connection.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="1"
            fill="hsl(var(--primary))"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: node.delay,
              ease: "easeOut"
            }}
          >
            <animate
              attributeName="r"
              values="1;1.5;1"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="3s"
              repeatCount="indefinite"
            />
          </motion.circle>
        ))}
        
        {/* Data flow particles */}
        {connections.map((connection, index) => (
          <motion.circle
            key={`particle-${index}`}
            r="0.3"
            fill="hsl(var(--accent))"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 4,
              delay: connection.delay + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              begin={`${connection.delay + 2}s`}
            >
              <mpath href={`#path-${index}`} />
            </animateMotion>
          </motion.circle>
        ))}
        
        {/* Hidden paths for particle motion */}
        <defs>
          {connections.map((connection, index) => (
            <path
              key={`path-${index}`}
              id={`path-${index}`}
              d={`M ${connection.from.x} ${connection.from.y} L ${connection.to.x} ${connection.to.y}`}
              fill="none"
            />
          ))}
        </defs>
      </svg>
    </div>
  );
};

export default SystemDiagram;