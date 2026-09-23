# SkillRoute 3–5 Minute Hackathon Live Demo Script

**Event:** Build For Bharat 2.0  
**Team:** ELITECORE  
**Presenter Flow:** Ranjan Maiti (Lead Architect)

---

## Turn-by-Turn Presentation Timing

| Time | Action | What Judges See | Key Talking Point |
|---|---|---|---|
| **0:00–0:20** | Introduce Ranjan's profile | Real problem in one person | *"Ranjan is a Data Analyst with 1.5 yrs experience in Delhi NCR. Traditional job boards spam him with Data Scientist jobs he isn't qualified for, or Junior Analyst roles he's outgrown."* |
| **0:20–0:45** | Open Capability Profile (`/profile`) | Capability extraction & confidence tags | *"SkillRoute separates explicit claims from evidence-backed skills (like his sales dashboard) and inferred potential. Notice we don't call everything 100%."* |
| **0:45–1:15** | Open Opportunity Map (`/opportunities`) | Reachable transition destinations | *"We don't show 500 job posts. We evaluate accessibility, prerequisite distance, and market signals. Analytics Engineer is 78% overlap; ML Engineer is a massive 110-hour jump."* |
| **1:15–1:50** | Select **Analytics Engineer** (`/transition/analytics-engineer`) | Signature Transition Graph | *"Here is the knowledge graph: Ranjan's SQL and Python form the bridge. Missing prerequisites like dbt and Kimball data modeling are highlighted in amber."* |
| **1:50–2:20** | Click **"Why this path?"** | Evidence-backed reasoning panel | *"No 'AI magic'. We expose skill overlap (78%), prerequisite coverage (6/8), market freshness, and assumptions. The LLM only explains what the graph computes."* |
| **2:20–2:50** | **KILLER DEMO MOMENT:** Move Time Budget Slider (`/pathway`) | Dynamic Pathway Recalculation | *"Ranjan only has 20 hours/week. Watch what happens: when we move the slider from 40 to 20, the engine recalculates the pathway from 6 weeks to 10 weeks and breaks down complex phases. SkillRoute adapts to constraints!"* |
| **2:50–3:20** | Open **Evidence Builder** (`/evidence`) | Learn → Build → Prove → Apply | *"How does Ranjan prove he knows dbt? Learn the core, build a warehouse project, prove it with a tested GitHub repo, and apply it in technical interviews."* |
| **3:20–3:50** | Show **Outcome Loop** (`/outcomes`) | Long-term moat & feedback | *"As Ranjan and thousands of users report applications, interviews, and offers, edge weights update. This transition feedback loop is our proprietary moat."* |
| **3:50–4:10** | **Closing Punchline** | Final Slide & Pitch | *"Others match people to jobs. EliteCore optimizes the transition that makes people ready for opportunity. From Skills Today → To Opportunities Tomorrow."* |

---

## 5 Critical Judge Questions & Quick Answers

1. **"Isn't this just another job recommender?"**
   > *"No. Traditional platforms rank jobs by keyword similarity. SkillRoute formulates career movement as a constrained graph path: Current Capability $\rightarrow$ Transferable Bridge $\rightarrow$ Missing Prerequisites $\rightarrow$ Optimized Sequence $\rightarrow$ Evidence. The output is a realistic transition pathway under time constraints, not a list of job postings."*

2. **"Where does your data come from?"**
   > *"We use verified public standards: ESCO v1.2.1 and O\*NET 31.0 for skill/occupation taxonomy, and Ministry of Labour's National Career Service (NCS) and WEF Future of Jobs 2025 for Indian and global demand context. We do not invent fake statistics."*

3. **"What if the LLM hallucinates?"**
   > *"The LLM never makes the recommendation. The transition score and pathway sequence are computed deterministically by graph search and constrained mathematical optimization. The LLM only formats the retrieved evidence into natural language."*

4. **"Why not just use embedding similarity?"**
   > *"Embedding similarity measures semantic closeness, not prerequisite dependency. In vector space, 'Python' and 'Machine Learning' are close together, but a candidate cannot jump to production MLOps without systems engineering, containerization, and data modeling. SkillRoute uses directed knowledge graphs to enforce prerequisites."*

5. **"What is your long-term moat?"**
   > *"A UI can be copied; a prompt can be copied. The moat is the transition knowledge graph combined with longitudinal outcome feedback. When users report learning completion, interviews, and job offers, the engine learns which pathways actually work in the real economy."*
