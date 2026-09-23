'use client';

import React, { useState } from 'react';
import { TransitionGraphData, GraphNode } from '../../types';
import { Info, GitCommit, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface TransitionGraphProps {
  data: TransitionGraphData;
}

export const TransitionGraph: React.FC<TransitionGraphProps> = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(
    data.nodes.find((n) => n.id === 'node_prereq_dbt') || data.nodes[0]
  );

  const getNodeColor = (color: string, isSelected: boolean) => {
    switch (color) {
      case 'navy':
        return isSelected
          ? 'border-brand-navy bg-slate-900 text-white shadow-md'
          : 'border-brand-navy/30 bg-slate-50 text-brand-navy hover:border-brand-navy';
      case 'slate':
        return isSelected
          ? 'border-brand-slate bg-brand-slate text-white shadow-md'
          : 'border-brand-slate/40 bg-blue-50/60 text-brand-slate hover:border-brand-slate';
      case 'amber':
        return isSelected
          ? 'border-brand-saffron bg-amber-600 text-white shadow-md'
          : 'border-amber-400 bg-amber-50 text-amber-900 hover:border-amber-500';
      case 'emerald':
        return isSelected
          ? 'border-brand-green bg-emerald-700 text-white shadow-md'
          : 'border-emerald-500/40 bg-emerald-50 text-emerald-900 hover:border-emerald-600';
      default:
        return 'border-slate-300 bg-white text-slate-800';
    }
  };

  // Group nodes into pipeline stages
  const stageCurrent = data.nodes.filter((n) => n.type === 'current_role');
  const stageCapabilities = data.nodes.filter((n) => n.type === 'current_capability');
  const stageTransfer = data.nodes.filter((n) => n.type === 'transferable_capability');
  const stagePrereq = data.nodes.filter((n) => n.type === 'missing_prerequisite');
  const stageTarget = data.nodes.filter((n) => n.type === 'target_role');

  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs">
      {/* Graph Header & Legend */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 mb-5 border-b border-brand-border gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-slate">
              SkillRoute Knowledge Graph
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              Taxonomy: ESCO 1.2.1 • O*NET 31.0
            </span>
          </div>
          <h2 className="text-lg font-bold text-brand-navy mt-0.5">
            Transition Graph: Data Analyst → Analytics Engineer
          </h2>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-navy" />
            <span className="text-slate-600">Current Capability</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-slate" />
            <span className="text-slate-600">Transferable Bridge</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-saffron" />
            <span className="text-slate-600">Missing Prerequisite</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
            <span className="text-slate-600">Target Opportunity</span>
          </div>
        </div>
      </div>

      {/* Interactive Node Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[420px]">
        {/* Stage 1: Current State & Capabilities */}
        <div className="space-y-3 p-3.5 bg-slate-50/80 rounded-lg border border-brand-borderLight flex flex-col">
          <div className="text-[11px] font-bold text-brand-navy uppercase tracking-wider flex items-center justify-between">
            <span>01 Current State</span>
            <span className="text-slate-400">Verified</span>
          </div>

          {stageCurrent.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${getNodeColor(
                node.color,
                selectedNode?.id === node.id
              )}`}
            >
              <div className="font-bold text-xs">{node.label}</div>
              <div className="text-[10px] opacity-80 mt-0.5">{node.subtitle}</div>
            </div>
          ))}

          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider pt-2">
            Active Capabilities
          </div>
          {stageCapabilities.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-2.5 rounded-md border text-left cursor-pointer transition-all ${getNodeColor(
                node.color,
                selectedNode?.id === node.id
              )}`}
            >
              <div className="font-semibold text-xs">{node.label}</div>
              <div className="text-[10px] opacity-75 mt-0.5">{node.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Stage 2: Transferable Bridge */}
        <div className="space-y-3 p-3.5 bg-blue-50/30 rounded-lg border border-blue-100 flex flex-col justify-center">
          <div className="text-[11px] font-bold text-brand-slate uppercase tracking-wider flex items-center justify-between">
            <span>02 Transferable Bridge</span>
            <Sparkles className="w-3.5 h-3.5 text-brand-slate" />
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            Adjacent competencies unlocked by existing SQL and analytical foundations.
          </p>

          {stageTransfer.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${getNodeColor(
                node.color,
                selectedNode?.id === node.id
              )}`}
            >
              <div className="font-bold text-xs">{node.label}</div>
              <div className="text-[10px] opacity-80 mt-0.5">{node.subtitle}</div>
              {node.metadata.transfer_efficiency && (
                <div className="mt-2 text-[10px] font-medium bg-black/5 rounded px-1.5 py-0.5 w-fit">
                  Transfer Efficiency: {node.metadata.transfer_efficiency * 100}%
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stage 3: Missing Prerequisites */}
        <div className="space-y-3 p-3.5 bg-amber-50/40 rounded-lg border border-amber-200/60 flex flex-col justify-center">
          <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center justify-between">
            <span>03 Missing Prerequisites</span>
            <AlertCircle className="w-3.5 h-3.5 text-brand-saffron" />
          </div>
          <p className="text-[11px] text-amber-800/80 leading-tight">
            Critical prerequisite gap required before target role readiness.
          </p>

          {stagePrereq.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${getNodeColor(
                node.color,
                selectedNode?.id === node.id
              )}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">{node.label}</span>
                <span className="text-[10px] font-semibold">{node.metadata.effort_hrs}h</span>
              </div>
              <div className="text-[10px] opacity-85 mt-0.5">{node.subtitle}</div>
              <div className="mt-2 flex items-center justify-between text-[10px]">
                <span className="font-medium">{node.metadata.priority}</span>
                <span className="capitalize">{node.metadata.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stage 4: Target Role Opportunity */}
        <div className="space-y-3 p-3.5 bg-emerald-50/40 rounded-lg border border-emerald-200/60 flex flex-col justify-center">
          <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center justify-between">
            <span>04 Target Opportunity</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
          </div>
          <p className="text-[11px] text-emerald-800/80 leading-tight">
            High-accessibility destination role optimized under constraints.
          </p>

          {stageTarget.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${getNodeColor(
                node.color,
                selectedNode?.id === node.id
              )}`}
            >
              <div className="font-bold text-sm">{node.label}</div>
              <div className="text-[11px] opacity-85 mt-1">{node.subtitle}</div>
              <div className="mt-3 pt-2.5 border-t border-black/10 text-[10px] space-y-1">
                <div>{node.metadata.market_readiness}</div>
                <div className="font-medium">{node.metadata.regional_signals}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Node Inspection Sheet */}
      {selectedNode && (
        <div className="mt-5 p-4 rounded-lg bg-slate-50 border border-brand-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Selected Node: {selectedNode.category}
              </span>
              <span className="text-[10px] font-mono bg-white px-1.5 py-0.2 border border-slate-200 rounded text-slate-600">
                ID: {selectedNode.id}
              </span>
            </div>
            <h4 className="text-sm font-bold text-brand-navy">{selectedNode.label}</h4>
            <p className="text-xs text-slate-600">
              {selectedNode.metadata.evidence ||
                selectedNode.metadata.evidence_project ||
                selectedNode.metadata.market_readiness ||
                selectedNode.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-brand-muted">Prerequisite Depth</div>
              <div className="text-xs font-bold text-brand-navy">
                {selectedNode.metadata.prerequisite_depth ?? 0} Levels
              </div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-brand-navy border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors"
            >
              Deselect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
