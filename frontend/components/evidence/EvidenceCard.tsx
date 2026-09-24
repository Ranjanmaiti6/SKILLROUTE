'use client';

import React, { useState } from 'react';
import { EvidenceArtifact } from '../../types';
import {
  BookOpen,
  Hammer,
  CheckCircle2,
  Send,
  ExternalLink,
  PlusCircle,
  Link as LinkIcon,
  ShieldCheck,
  Sparkles,
  Check,
  X,
  Play,
  FileCheck
} from 'lucide-react';

export type EvidenceStatus = 'not-started' | 'in-progress' | 'evidenced' | 'verified';

interface ExtendedEvidenceArtifact extends Omit<EvidenceArtifact, 'status'> {
  status: EvidenceStatus;
  priority?: string;
  githubUrl?: string;
}

interface EvidenceCardProps {
  artifact: ExtendedEvidenceArtifact;
  onStatusChange: (id: string, newStatus: EvidenceStatus, repoUrl?: string) => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ artifact, onStatusChange }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [inputUrl, setInputUrl] = useState(artifact.githubUrl || artifact.repository_link || '');
  const [criteria, setCriteria] = useState({
    tested: true,
    gitHistory: true,
    erdDoc: true,
    ciPassing: true
  });

  const getPriorityBadge = (p?: string) => {
    if (p?.includes('P0') || artifact.skill_name.includes('dbt') || artifact.skill_name.includes('Modeling')) {
      return (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
          P0 Critical Gap
        </span>
      );
    }
    if (p?.includes('P1') || artifact.skill_name.includes('Warehouse')) {
      return (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
          P1 High Priority
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
        P2 Medium Priority
      </span>
    );
  };

  const getStatusBadge = (status: EvidenceStatus) => {
    switch (status) {
      case 'not-started':
        return (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Not Started
          </span>
        );
      case 'in-progress':
        return (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
            In Progress
          </span>
        );
      case 'evidenced':
        return (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
            Evidenced
          </span>
        );
      case 'verified':
        return (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-700" />
            <span>Verified</span>
          </span>
        );
    }
  };

  const handleSaveLink = () => {
    onStatusChange(artifact.id, 'evidenced', inputUrl);
    setShowLinkModal(false);
  };

  const handleVerify = () => {
    onStatusChange(artifact.id, 'verified');
    setShowVerifyModal(false);
  };

  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 hover:border-slate-300 hover:shadow-xs transition-all space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-slate">
              {artifact.category}
            </span>
            {getPriorityBadge(artifact.priority)}
            {getStatusBadge(artifact.status)}
          </div>
          <h3 className="text-base font-extrabold text-brand-navy">
            {artifact.skill_name}
          </h3>
        </div>

        {/* Action Buttons: Start This Project | Add Existing Evidence | Mark as Verified */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onStatusChange(artifact.id, 'in-progress')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              artifact.status === 'in-progress'
                ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <Play className="w-3 h-3" />
            <span>Start This Project</span>
          </button>

          <button
            type="button"
            onClick={() => setShowLinkModal(true)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              artifact.status === 'evidenced'
                ? 'bg-blue-600 text-white border-blue-700 shadow-2xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Add Existing Evidence</span>
          </button>

          <button
            type="button"
            onClick={() => setShowVerifyModal(true)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1.5 ${
              artifact.status === 'verified'
                ? 'bg-brand-green text-white border-emerald-700 shadow-2xs'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Mark as Verified</span>
          </button>
        </div>
      </div>

      {/* The 4-Step Recipe: LEARN -> BUILD -> PROVE -> APPLY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        {/* LEARN */}
        <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-200/80 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-blue-900 uppercase tracking-wider text-[10px]">
            <BookOpen className="w-3.5 h-3.5 text-brand-blue" />
            <span>01 LEARN</span>
          </div>
          <div className="text-[10px] text-slate-500 font-medium">What to study (specific)</div>
          <p className="text-slate-800 leading-relaxed text-[11px] mt-1">{artifact.learn}</p>
        </div>

        {/* BUILD */}
        <div className="p-3.5 rounded-lg bg-amber-50/60 border border-amber-200/80 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase tracking-wider text-[10px]">
            <Hammer className="w-3.5 h-3.5 text-amber-700" />
            <span>02 BUILD</span>
          </div>
          <div className="text-[10px] text-slate-500 font-medium">What project to create</div>
          <p className="text-slate-800 leading-relaxed text-[11px] mt-1">{artifact.build}</p>
        </div>

        {/* PROVE */}
        <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200/80 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 uppercase tracking-wider text-[10px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>03 PROVE</span>
          </div>
          <div className="text-[10px] text-slate-500 font-medium">Demonstrable artifacts</div>
          <p className="text-slate-800 leading-relaxed text-[11px] mt-1">{artifact.prove}</p>
        </div>

        {/* APPLY */}
        <div className="p-3.5 rounded-lg bg-purple-50/60 border border-purple-200/80 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-purple-900 uppercase tracking-wider text-[10px]">
            <Send className="w-3.5 h-3.5 text-purple-700" />
            <span>04 APPLY</span>
          </div>
          <div className="text-[10px] text-slate-500 font-medium">Resume & interview framing</div>
          <p className="text-slate-800 leading-relaxed text-[11px] mt-1">{artifact.apply}</p>
        </div>
      </div>

      {/* Artifact Verification Link Footer */}
      {(artifact.githubUrl || artifact.repository_link) && (
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px]">{artifact.verification_notes || 'Verified code repository linked'}</span>
          </div>
          <a
            href={artifact.githubUrl || artifact.repository_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand-navy hover:text-brand-blue font-semibold text-xs transition-colors"
          >
            <span className="font-mono">{artifact.githubUrl || artifact.repository_link}</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      )}

      {/* MODAL 1: Add Existing Evidence */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-2xs animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl border border-brand-border max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-bold text-sm text-brand-navy">Add Existing Evidence Link</h4>
              <button onClick={() => setShowLinkModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Link your public GitHub repository, PR, or live dashboard proving <strong>{artifact.skill_name}</strong>:
            </p>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://github.com/aaravsharma/project-name"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveLink}
                className="px-4 py-1.5 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800"
              >
                Attach & Mark Evidenced
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Mark as Verified Criteria Checklist */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-2xs animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl border border-brand-border max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-sm text-brand-navy">Verification Criteria Checklist</h4>
              </div>
              <button onClick={() => setShowVerifyModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Before marking <strong>{artifact.skill_name}</strong> as verified, confirm the empirical standards:
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={criteria.tested}
                  onChange={(e) => setCriteria({ ...criteria, tested: e.target.checked })}
                  className="rounded text-brand-navy accent-brand-navy"
                />
                <span>Passes schema tests on benchmark data (unique, not-null)</span>
              </label>
              <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={criteria.gitHistory}
                  onChange={(e) => setCriteria({ ...criteria, gitHistory: e.target.checked })}
                  className="rounded text-brand-navy accent-brand-navy"
                />
                <span>Clean Git commit history with meaningful PR description</span>
              </label>
              <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={criteria.erdDoc}
                  onChange={(e) => setCriteria({ ...criteria, erdDoc: e.target.checked })}
                  className="rounded text-brand-navy accent-brand-navy"
                />
                <span>Documented architectural ERD or data lineage diagram</span>
              </label>
              <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={criteria.ciPassing}
                  onChange={(e) => setCriteria({ ...criteria, ciPassing: e.target.checked })}
                  className="rounded text-brand-navy accent-brand-navy"
                />
                <span>Continuous Integration automated build passing badge</span>
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowVerifyModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerify}
                className="px-4 py-1.5 text-xs font-bold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
              >
                Confirm Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
