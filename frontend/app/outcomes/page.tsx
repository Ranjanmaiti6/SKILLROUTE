'use client';

import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import {
  LineChart,
  GitBranch,
  CheckCircle2,
  Briefcase,
  Users,
  Send,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function OutcomesPage() {
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    applications: 8,
    interviews: 3,
    offers: 1,
    roleTitle: 'Analytics Engineer',
    notes: 'The dbt testing project was the direct topic of my technical round.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedFeedback(true);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-brand-border pb-5">
          <div className="flex items-center gap-2">
            <LineChart className="w-4 h-4 text-brand-slate" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
              Outcome Intelligence & Self-Improving Moat
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-brand-navy mt-1">
            Your Transition Outcomes
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
            The strongest long-term asset of SkillRoute is not the UI or the LLM. It is the transition
            knowledge graph combined with observed real-world outcomes.
          </p>
        </div>

        {/* Demo Profile Label */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-brand-saffron" />
            <span>
              <strong>Fictional Demo Telemetry:</strong> Simulated outcome funnel for Ranjan Maiti’s transition to Analytics Engineer.
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-amber-200/50 px-2 py-0.5 rounded">
            Profile: ranjan_maiti_01
          </span>
        </div>

        {/* Transition Outcome Funnel */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-brand-navy">
            Transition Conversion Funnel
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
            <div className="p-4 rounded-lg bg-slate-50 border border-brand-borderLight space-y-1">
              <span className="text-[10px] text-brand-muted uppercase font-semibold">Step 01</span>
              <div className="text-2xl font-bold text-brand-navy">4</div>
              <div className="text-xs font-semibold text-slate-700">Skills Acquired</div>
              <div className="text-[10px] text-slate-400">SQL, dbt, Modeling, Warehousing</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-brand-borderLight space-y-1">
              <span className="text-[10px] text-brand-muted uppercase font-semibold">Step 02</span>
              <div className="text-2xl font-bold text-brand-navy">2</div>
              <div className="text-xs font-semibold text-slate-700">Evidence Repos</div>
              <div className="text-[10px] text-slate-400">Jaffle Shop + Star Schema</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-brand-borderLight space-y-1">
              <span className="text-[10px] text-brand-muted uppercase font-semibold">Step 03</span>
              <div className="text-2xl font-bold text-brand-navy">{feedbackForm.applications}</div>
              <div className="text-xs font-semibold text-slate-700">Applications</div>
              <div className="text-[10px] text-slate-400">Targeted to Analytics Eng</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-brand-borderLight space-y-1">
              <span className="text-[10px] text-brand-muted uppercase font-semibold">Step 04</span>
              <div className="text-2xl font-bold text-brand-slate">{feedbackForm.interviews}</div>
              <div className="text-xs font-semibold text-slate-700">Interviews</div>
              <div className="text-[10px] text-brand-green font-medium">37.5% Conversion</div>
            </div>

            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[10px] text-emerald-800 uppercase font-semibold">Step 05</span>
              <div className="text-2xl font-bold text-emerald-900">{feedbackForm.offers}</div>
              <div className="text-xs font-bold text-emerald-950">Offer Received</div>
              <div className="text-[10px] text-emerald-700 font-medium">Delhi NCR FinTech</div>
            </div>
          </div>
        </div>

        {/* The Moat: Outcome Feedback Loop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Explanation of the Moat */}
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-navy text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <h3 className="text-base font-bold text-brand-navy">
                The Self-Improving Outcome Loop
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              When users complete a pathway and report results, the engine measures which prerequisites actually mattered during interviews. Over time, edges in the graph receive Bayesian confidence updates:
            </p>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-brand-borderLight font-mono text-[11px] text-brand-navy space-y-1">
              <div>Recommendation ↓</div>
              <div>Skill Acquired ↓</div>
              <div>Evidence Created ↓</div>
              <div>Applications ↓ Interviews ↓ Offers ↓</div>
              <div className="text-brand-slate font-bold">Transition Probability Graph Update</div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              This feedback loop distinguishes SkillRoute from static course catalogs. A competitor can copy a prompt; they cannot copy a graph verified by thousands of Indian transition outcomes.
            </p>
          </div>

          {/* Simulated Feedback Contribution Form */}
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-brand-navy">
              Contribute Consented Outcome Feedback
            </h3>
            <p className="text-xs text-brand-muted">
              Your feedback refines transition probabilities for future learners across Bharat.
            </p>

            {submittedFeedback ? (
              <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-brand-green mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">
                  Outcome Recorded Successfully!
                </h4>
                <p className="text-xs text-emerald-800">
                  Transition graph edge weights for <strong>Data Analyst → Analytics Engineer</strong> have been updated with this datapoint.
                </p>
                <button
                  onClick={() => setSubmittedFeedback(false)}
                  className="mt-2 text-xs font-semibold text-brand-slate hover:underline"
                >
                  Submit another update
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-brand-navy mb-1">
                    Transition Target Role
                  </label>
                  <input
                    type="text"
                    value={feedbackForm.roleTitle}
                    disabled
                    className="w-full p-2 bg-slate-50 border border-brand-border rounded text-brand-navy font-semibold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-600 mb-1">Applications</label>
                    <input
                      type="number"
                      value={feedbackForm.applications}
                      onChange={(e) =>
                        setFeedbackForm({ ...feedbackForm, applications: Number(e.target.value) })
                      }
                      className="w-full p-2 border border-brand-border rounded text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Interviews</label>
                    <input
                      type="number"
                      value={feedbackForm.interviews}
                      onChange={(e) =>
                        setFeedbackForm({ ...feedbackForm, interviews: Number(e.target.value) })
                      }
                      className="w-full p-2 border border-brand-border rounded text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Offers</label>
                    <input
                      type="number"
                      value={feedbackForm.offers}
                      onChange={(e) =>
                        setFeedbackForm({ ...feedbackForm, offers: Number(e.target.value) })
                      }
                      className="w-full p-2 border border-brand-border rounded text-center font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Qualitative Transition Notes</label>
                  <textarea
                    rows={2}
                    value={feedbackForm.notes}
                    onChange={(e) =>
                      setFeedbackForm({ ...feedbackForm, notes: e.target.value })
                    }
                    className="w-full p-2 border border-brand-border rounded text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-navy hover:bg-brand-slate text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Outcome to Transition Graph</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Responsible AI Disclaimer */}
        <ResponsibleAIStamp />
      </div>
    </AppShell>
  );
}
