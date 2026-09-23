# SKILLROUTE

### Skill-to-Opportunity Transition Intelligence Engine
**Event:** BUILD FOR BHARAT 2.0  
**Problem Statement:** Intelligent Talent and Workforce Ecosystem  
**Team:** ELITECORE (Ranjan Maiti • Swati • Saurabh Suman)  

> **“Don't just tell people which jobs match their profile. Compute the most realistic transition from where they are today to where opportunity is moving.”**  
> *Core Tagline: From Skills Today → To Opportunities Tomorrow.*

---

## 1. What is SkillRoute?

Traditional career platforms operate on static candidate-to-job matching. When a candidate lacks qualifications, they receive either generic course recommendations or irrelevant job posts.

**SkillRoute changes the paradigm:**
```
Current Capability
       ↓
Capability Map (Explicit • Evidence-Backed • Inferred)
       ↓
Transferable Skills Bridge
       ↓
Transition Knowledge Graph (ESCO 1.2.1 / O*NET 31.0)
       ↓
Target Opportunity (Reachable Transitions)
       ↓
Missing Prerequisites (Prerequisite Tree)
       ↓
Optimized Skill Sequence (Constraint-Aware Optimizer)
       ↓
Evidence / Projects (Learn → Build → Prove → Apply)
       ↓
Opportunity
       ↓
Outcome Feedback Loop (Long-Term Defensibility Moat)
```

SkillRoute answers the single critical question:
**"What should I learn next, in what order, and which opportunity will that unlock?"**

---

## 2. Monorepo Architecture

```
SKILLROUTE/
│
├── frontend/             # Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide
│   ├── app/              # Routes: /, /dashboard, /profile, /opportunities, /transition/[role], /pathway, /evidence, /outcomes
│   ├── components/       # AppShell, TransitionGraph, WhyThisPath, TimeBudgetSlider, EvidenceBuilder, etc.
│   ├── data/             # Resilient mock intelligence data for guaranteed offline demo uptime
│   ├── types/            # TypeScript interfaces (Profile, Skill, Transition, Pathway, Evidence)
│   └── lib/              # API client and local optimizer fallback
│
├── backend/              # Python FastAPI service
│   ├── app/
│   │   ├── intelligence/ # TransitionScorer, PathOptimizer, Explainability
│   │   ├── graph/        # KnowledgeGraphService (Neo4j-ready abstraction)
│   │   ├── api/routes/   # REST routes (/profile, /opportunities, /transitions, /pathway, /evidence, /outcomes)
│   │   └── schemas/      # Pydantic v2 data models
│   └── tests/            # Automated test suite
│
├── data/                 # Verified foundation datasets
│   ├── demo/             # Ranjan Maiti fictional test profile
│   ├── taxonomy/         # ESCO v1.2.1 and O*NET 31.0 skill definitions
│   ├── occupations/      # Transition profiles and graph relationships
│   └── processed/        # Market signals (NCS India, WEF 2025)
│
├── ml/                   # Machine learning evaluation & experiments
│   ├── experiments/      # Baseline comparison (Keyword vs Embedding vs SkillRoute)
│   ├── evaluation/       # Architectural ablation study
│   └── README.md         # Mathematical decision model formulation
│
├── docs/                 # Architectural specifications, API schemas, and 3–5 min demo script
│   ├── architecture.md
│   ├── api.md
│   └── demo-script.md
│
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## 3. Quick Start (Running Locally)

### Prerequisites
- Node.js 18+ (tested on Node v22)
- Python 3.10+ (tested on Python 3.14)

### Running Backend (FastAPI)
```bash
cd skillroute/backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
API Documentation will be live at: `http://localhost:8000/docs`

### Running Frontend (Next.js)
```bash
cd skillroute/frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

> **Resilient Offline Demo Mode:** If the backend is not started, the frontend automatically falls back to its deterministic local intelligence engine, ensuring 100% demo uptime during live hackathon presentations.

---

## 4. Key Hackathon Demo Flow (3–5 Minutes)

1. **Landing Page (`/`):** Explains paradigm shift: *"From Skills Today to Opportunities Tomorrow"*. Click **"Explore My Path"**.
2. **Executive Dashboard (`/dashboard`):** Ranjan Maiti profile summary, capability distribution, and active pathway metrics.
3. **Capability Profile (`/profile`):** Inspect explicit, evidence-backed, and inferred skills. Click **Python** to open the side panel showing evidence projects and transferable roles.
4. **Opportunity Map (`/opportunities`):** 5 reachable destinations with transition fit, overlap, and effort. Click **Analyze Transition** on **Analytics Engineer**.
5. **Transition Graph (`/transition/analytics-engineer`):** Signature node-link graph showing current role $\rightarrow$ transferable skills $\rightarrow$ missing prerequisites (dbt, Kimball modeling) $\rightarrow$ target role.
6. **"Why This Path?" Modal:** Click **"Why this path?"** to inspect grounded metrics (78% overlap, 6/8 prerequisites, 42h effort, recent market freshness).
7. **THE KILLER FEATURE — Time Budget Simulator (`/pathway`):** Move the slider from **40 hrs/week** to **20 hrs/week**. The system visibly recalculates the pathway from 6 weeks to 10 weeks and adapts the sequencing!
8. **Evidence Builder (`/evidence`):** Learn $\rightarrow$ Build $\rightarrow$ Prove $\rightarrow$ Apply framework with interactive status toggles.
9. **Outcome Feedback Loop (`/outcomes`):** Review application-to-offer funnel and simulated feedback contribution that trains future transition edge weights.

---

## 5. Mathematical Core & Responsible AI

### Transition Scoring Model
$$\text{TransitionScore}(r) = w_1 \cdot \text{SkillFit} + w_2 \cdot \text{Demand} + w_3 \cdot \text{Transferability} + w_4 \cdot \text{Accessibility} - w_5 \cdot \text{LearningCost} - w_6 \cdot \text{ExperienceGap}$$

### Constraint-Aware Optimizer
$$P^* = \arg\max_P \left[ \frac{\text{ExpectedGain}(P)}{\text{Cost}(P) + \text{Risk}(P)} \right] \quad \text{s.t.} \quad \text{Time}(P) \le \text{Budget}, \; \text{Prerequisites Satisfied}$$

### Responsible AI Statement
- Recommendations are **evidence-grounded estimates under stated constraints**, not guarantees.
- Large Language Models are used strictly for human-readable synthesis; core decisions are computed by graph search and constrained optimization.

---

## 6. Team ELITECORE
- **Ranjan Maiti:** Lead Product Architect, Transition UX, Full-Stack Integration
- **Swati:** Data Strategy, Taxonomy Mapping, Evaluation & Product Narrative
- **Saurabh Suman:** Backend Services, Data Pipelines, Graph/Ranking Services
