'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TransitionGraphData, GraphNode } from '../../types';
import {
  GitFork,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';

interface TransitionGraphProps {
  data: TransitionGraphData;
}

// Fixed computational layout coordinates for 1000 x 480 SVG canvas
interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
  col: number;
}

const NODE_POSITIONS: Record<string, NodePosition> = {
  // Col 0: Current Role (Center-left origin)
  'node_current_role': { x: 30, y: 190, width: 140, height: 68, col: 0 },

  // Col 1: Current Capabilities (Around it)
  'node_skill_sql': { x: 215, y: 60, width: 135, height: 60, col: 1 },
  'node_skill_python': { x: 215, y: 150, width: 135, height: 60, col: 1 },
  'node_skill_stats': { x: 215, y: 240, width: 135, height: 60, col: 1 },
  'node_skill_powerbi': { x: 215, y: 330, width: 135, height: 60, col: 1 },

  // Col 2: Transferable Capabilities (Bridges)
  'node_trans_data_modeling': { x: 395, y: 105, width: 145, height: 64, col: 2 },
  'node_trans_etl': { x: 395, y: 220, width: 145, height: 64, col: 2 },

  // Col 3: Missing Skills (Prerequisite Gaps)
  'node_prereq_dbt': { x: 585, y: 105, width: 145, height: 64, col: 3 },
  'node_prereq_warehouse': { x: 585, y: 220, width: 145, height: 64, col: 3 },

  // Col 4: Target & Alternatives
  'node_target_role': { x: 775, y: 155, width: 165, height: 74, col: 4 },
  'node_alt_data_scientist': { x: 775, y: 45, width: 145, height: 55, col: 4 },
  'node_alt_product_analyst': { x: 775, y: 315, width: 145, height: 55, col: 4 }
};

// Explicit computational pathways
const PATH_CHAINS: Record<string, string[]> = {
  'node_skill_sql': [
    'node_current_role',
    'node_skill_sql',
    'node_trans_data_modeling',
    'node_prereq_dbt',
    'node_target_role'
  ],
  'node_skill_python': [
    'node_current_role',
    'node_skill_python',
    'node_trans_etl',
    'node_prereq_warehouse',
    'node_target_role'
  ],
  'node_skill_stats': [
    'node_current_role',
    'node_skill_stats',
    'node_alt_data_scientist'
  ],
  'node_skill_powerbi': [
    'node_current_role',
    'node_skill_powerbi',
    'node_trans_data_modeling',
    'node_alt_product_analyst',
    'node_target_role'
  ],
  'node_trans_data_modeling': [
    'node_current_role',
    'node_skill_sql',
    'node_skill_powerbi',
    'node_trans_data_modeling',
    'node_prereq_dbt',
    'node_target_role'
  ],
  'node_trans_etl': [
    'node_current_role',
    'node_skill_python',
    'node_trans_etl',
    'node_prereq_warehouse',
    'node_target_role'
  ],
  'node_prereq_dbt': [
    'node_current_role',
    'node_skill_sql',
    'node_trans_data_modeling',
    'node_prereq_dbt',
    'node_target_role'
  ],
  'node_prereq_warehouse': [
    'node_current_role',
    'node_skill_python',
    'node_trans_etl',
    'node_prereq_warehouse',
    'node_target_role'
  ],
  'node_target_role': [
    'node_current_role',
    'node_skill_sql',
    'node_skill_python',
    'node_trans_data_modeling',
    'node_trans_etl',
    'node_prereq_dbt',
    'node_prereq_warehouse',
    'node_target_role'
  ]
};

export const TransitionGraph: React.FC<TransitionGraphProps> = ({ data }) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node_prereq_dbt');

  const selectedNode = data.nodes.find((n) => n.id === selectedNodeId) || data.nodes[0];

  // Active highlighted node set based on hover or selection
  const activeChainNodes = useMemo(() => {
    const focusId = hoveredNodeId || selectedNodeId;
    if (focusId && PATH_CHAINS[focusId]) {
      return new Set(PATH_CHAINS[focusId]);
    }
    return new Set<string>();
  }, [hoveredNodeId, selectedNodeId]);

  // Visual state classes per spec:
  // Current capability: Blue
  // Transferable: Green
  // Missing: Saffron / muted red
  // Target: Navy
  const getNodeVisualStyles = (node: GraphNode, isHighlighted: boolean, isDimmed: boolean) => {
    let baseBorder = 'border-slate-300';
    let baseBg = 'bg-white';
    let badgeColor = 'bg-slate-100 text-slate-700';

    if (node.type === 'current_role') {
      baseBorder = 'border-brand-navy';
      baseBg = 'bg-slate-900 text-white';
      badgeColor = 'bg-white/20 text-white';
    } else if (node.type === 'current_capability') {
      // Blue
      baseBorder = 'border-blue-400';
      baseBg = isHighlighted ? 'bg-blue-50/90 text-blue-950 border-blue-600 ring-2 ring-blue-400/30' : 'bg-blue-50/40 text-blue-900';
      badgeColor = 'bg-blue-100/80 text-blue-800';
    } else if (node.type === 'transferable_capability') {
      // Green
      baseBorder = 'border-emerald-400';
      baseBg = isHighlighted ? 'bg-emerald-50/90 text-emerald-950 border-emerald-600 ring-2 ring-emerald-400/30' : 'bg-emerald-50/40 text-emerald-900';
      badgeColor = 'bg-emerald-100/80 text-emerald-800';
    } else if (node.type === 'missing_prerequisite') {
      // Saffron / muted red
      baseBorder = 'border-amber-400';
      baseBg = isHighlighted ? 'bg-amber-50/95 text-amber-950 border-amber-600 ring-2 ring-amber-400/30' : 'bg-amber-50/50 text-amber-900';
      badgeColor = 'bg-amber-100/80 text-amber-900';
    } else if (node.type === 'target_role') {
      if (node.id === 'node_target_role') {
        // Target: Navy
        baseBorder = 'border-brand-navy';
        baseBg = 'bg-brand-navy text-white ring-2 ring-brand-navy/30';
        badgeColor = 'bg-amber-400 text-slate-950';
      } else {
        baseBorder = 'border-slate-300';
        baseBg = 'bg-slate-50 text-slate-800';
        badgeColor = 'bg-slate-200 text-slate-700';
      }
    }

    const opacityClass = isDimmed ? 'opacity-25 grayscale-[30%] scale-98' : 'opacity-100 scale-100';

    return { baseBorder, baseBg, badgeColor, opacityClass };
  };

  return (
    <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-6">
      {/* Header & Graph Metadata */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-brand-border gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-brand-slate px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
              Computational Transition Graph
            </span>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Taxonomy: ESCO 1.2.1 • O*NET 31.0
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-brand-navy tracking-tight mt-1">
            Data Analyst → Analytics Engineer
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Hover over any node (e.g. <strong>SQL</strong>) to highlight its entire relationship path. Click to inspect prerequisites and evidence.
          </p>
        </div>

        {/* Visual State Color Legend (Phase 8 Spec) */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-50 p-2.5 rounded-lg border border-brand-borderLight">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-200" />
            <span className="font-semibold text-slate-700">Current (Blue)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-200" />
            <span className="font-semibold text-slate-700">Transferable (Green)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-2 ring-amber-200" />
            <span className="font-semibold text-slate-700">Missing (Saffron)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-navy ring-2 ring-slate-300" />
            <span className="font-semibold text-slate-700">Target (Navy)</span>
          </div>
        </div>
      </div>

      {/* Hero Computational Canvas */}
      <div className="relative w-full overflow-x-auto rounded-xl bg-slate-50/70 border border-brand-borderLight p-3 select-none">
        <div className="relative w-[980px] h-[440px] mx-auto">
          {/* SVG Connection Paths Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 980 440">
            <defs>
              <linearGradient id="edgeGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#166534" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0F1E36" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {data.edges.map((edge, idx) => {
              const fromPos = NODE_POSITIONS[edge.from];
              const toPos = NODE_POSITIONS[edge.to];
              if (!fromPos || !toPos) return null;

              const x1 = fromPos.x + fromPos.width;
              const y1 = fromPos.y + fromPos.height / 2;
              const x2 = toPos.x;
              const y2 = toPos.y + toPos.height / 2;
              const dx = (x2 - x1) * 0.5;

              const isEdgeInChain =
                activeChainNodes.size > 0 &&
                activeChainNodes.has(edge.from) &&
                activeChainNodes.has(edge.to);

              const isDimmed = activeChainNodes.size > 0 && !isEdgeInChain;

              return (
                <g key={idx}>
                  <path
                    d={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    stroke={isEdgeInChain ? 'url(#edgeGradActive)' : '#CBD5E1'}
                    strokeWidth={isEdgeInChain ? 3 : 1.5}
                    strokeDasharray={isEdgeInChain ? 'none' : '4 3'}
                    className={`transition-all duration-300 ${
                      isDimmed ? 'opacity-20' : isEdgeInChain ? 'opacity-100' : 'opacity-70'
                    }`}
                  />
                  {/* Active flow indicator dot on highlighted path */}
                  {isEdgeInChain && (
                    <circle
                      r="3.5"
                      fill="#D97706"
                      className="animate-pulse"
                    >
                      <animateMotion
                        path={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive HTML Node Elements (Rendered at exact coordinates) */}
          {data.nodes.map((node) => {
            const pos = NODE_POSITIONS[node.id];
            if (!pos) return null;

            const isHighlighted = activeChainNodes.has(node.id);
            const isDimmed = activeChainNodes.size > 0 && !isHighlighted;
            const isSelected = selectedNodeId === node.id;
            const styles = getNodeVisualStyles(node, isHighlighted, isDimmed);

            return (
              <div
                key={node.id}
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  width: `${pos.width}px`,
                  minHeight: `${pos.height}px`
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => setSelectedNodeId(node.id)}
                className={`absolute z-10 p-2.5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-md ${
                  styles.baseBorder
                } ${styles.baseBg} ${styles.opacityClass} ${
                  isSelected ? 'ring-2 ring-brand-navy shadow-md' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-extrabold text-xs tracking-tight truncate">
                    {node.label}
                  </span>
                  {node.type === 'missing_prerequisite' && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-200/90 text-amber-950 flex-shrink-0">
                      {node.metadata.effort_hrs}h
                    </span>
                  )}
                </div>

                <div className="text-[10px] opacity-80 mt-1 truncate">
                  {node.subtitle}
                </div>

                {isHighlighted && (
                  <div className="mt-1 pt-1 border-t border-black/10 flex items-center justify-between text-[9px] font-bold">
                    <span>PATH ACTIVE</span>
                    <span>→</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Tier Indicators Bar */}
      <div className="grid grid-cols-5 text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
        <div>01 Current Role</div>
        <div>02 Current Capabilities</div>
        <div>03 Transferable Bridges</div>
        <div>04 Missing Skills</div>
        <div>05 Target Destination</div>
      </div>

      {/* Selected Node Intelligence Inspector (Phase 8 Spec) */}
      {selectedNode && (
        <div className="p-5 rounded-xl bg-slate-50 border border-brand-border space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                {selectedNode.category}
              </span>
              <h3 className="text-base font-extrabold text-brand-navy">
                {selectedNode.label}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700">
                Status: {selectedNode.metadata.status || 'Verified Active Node'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            {/* Why it matters */}
            <div className="md:col-span-2 p-3.5 rounded-lg bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Why It Matters
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {selectedNode.metadata.why_it_matters ||
                  'Required for the selected transition. Bridges descriptive analytics into robust modular transformations.'}
              </p>
            </div>

            {/* Prerequisite status */}
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Prerequisite
              </span>
              <div className="text-brand-navy font-bold text-xs flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                <span>{selectedNode.metadata.prerequisite || selectedNode.metadata.prerequisite_satisfied || 'SQL ✓'}</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Prerequisite satisfied by Aarav</span>
            </div>

            {/* Estimated Effort & Evidence */}
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Estimated Effort
              </span>
              <div className="text-amber-800 font-extrabold text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{selectedNode.metadata.effort_hrs ?? 24} Hours</span>
              </div>
              <span className="text-[10px] text-slate-500 block truncate">
                {selectedNode.metadata.evidence || selectedNode.metadata.evidence_project || 'Analytics transformation project'}
              </span>
            </div>
          </div>

          {/* Action Row & Next Best Action (Phase 13 Spec: VIEW PATHWAY) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <span>Grounded in ESCO v1.2.1 & O*NET 31.0 canonical skills graph.</span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/evidence"
                className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-brand-navy bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
              >
                View Evidence Plan
              </Link>
              <Link
                href="/pathway"
                className="px-5 py-2 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>VIEW PATHWAY</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
