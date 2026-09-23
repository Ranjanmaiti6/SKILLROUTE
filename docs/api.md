# SkillRoute REST API Specification

Base URL: `http://localhost:8000/api`

---

## 1. Profile Endpoints

### `GET /api/profile`
Returns the active candidate capability profile.

**Sample Response:**
```json
{
  "id": "ranjan_maiti_01",
  "name": "Ranjan Maiti",
  "current_role": "Data Analyst",
  "experience_years": 1.5,
  "location": "Delhi NCR, India",
  "current_capabilities": [
    {
      "id": "skill_python",
      "name": "Python",
      "category": "Programming & Scripting",
      "confidence": "high",
      "support_type": "evidence-backed",
      "evidence_sources": ["Expense Analytics Project", "Python ETL scripts"],
      "proficiency_level": "intermediate",
      "transferable_domains": ["Analytics Engineering", "Data Science"]
    }
  ]
}
```

---

## 2. Opportunity Endpoints

### `GET /api/opportunities`
Returns reachable career destinations with accessibility, overlap, and effort.

**Sample Response Item:**
```json
{
  "id": "analytics_engineer",
  "slug": "analytics-engineer",
  "title": "Analytics Engineer",
  "transition_accessibility": "High",
  "accessibility_score": 84,
  "skill_overlap_percentage": 78,
  "prerequisite_coverage": "6 / 8",
  "market_signal": {
    "trend": "Growing",
    "direction": "up",
    "regional_demand": "Strong in Delhi NCR, Bengaluru",
    "confidence": "High"
  },
  "estimated_learning_hours": 42
}
```

---

## 3. Transition & Knowledge Graph Endpoints

### `GET /api/transitions/{role_slug}/graph`
Returns nodes and edges connecting current capabilities to target role.

### `GET /api/transitions/{role_slug}/why`
Returns structured explainability metrics, assumptions, and alternatives.

---

## 4. Pathway Optimization Endpoint

### `POST /api/pathway/optimize`
Recomputes sequence and duration under user-specified weekly hours constraint.

**Request Payload:**
```json
{
  "profile_id": "ranjan_maiti_01",
  "target_role_id": "analytics_engineer",
  "weekly_hours_budget": 20
}
```

**Response Payload:**
```json
{
  "target_role_id": "analytics_engineer",
  "weekly_hours_budget": 20,
  "estimated_weeks": 10,
  "recalculated_badge": "Path recalculated: 10-Week Part-Time Pathway (20 hrs/wk)",
  "phases": [...]
}
```

---

## 5. Evidence & Outcome Endpoints

### `GET /api/evidence`
Returns the Learn $\rightarrow$ Build $\rightarrow$ Prove $\rightarrow$ Apply project checklist.

### `GET /api/outcomes`
Returns conversion telemetry (applications, interviews, offers).

### `POST /api/outcomes/feedback`
Submits completed transition feedback to refine transition probabilities.
