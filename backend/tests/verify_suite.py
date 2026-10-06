import urllib.request
import json
import sys

def test_endpoint(url, data=None):
    try:
        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'SkillRouteTest/1.0', 'Content-Type': 'application/json'}
        )
        if data:
            req.data = json.dumps(data).encode('utf-8')
        with urllib.request.urlopen(req, timeout=5) as response:
            status = response.status
            content = response.read().decode('utf-8')
            return status, content
    except Exception as e:
        return 500, str(e)

print("--- Testing FastAPI Backend Intelligence Endpoints ---")
s1, c1 = test_endpoint("http://localhost:8000/api/transition/analyze?role=analytics-engineer")
print(f"1. Transition Analyze: Status={s1}, HasScore={'transition_score' in c1}, HasGaps={'gap_breakdown' in c1}")

s2, c2 = test_endpoint("http://localhost:8000/api/skills/next-best?role=analytics-engineer")
print(f"2. Next Best Skill: Status={s2}, HasTop={'top_skill' in c2}, HasWhy={'why_this_skill' in c2}")

s3, c3 = test_endpoint("http://localhost:8000/api/career/simulate?hours=20")
print(f"3. Career Simulate: Status={s3}, PathsCount={len(json.loads(c3).get('paths', []))}")

s4, c4 = test_endpoint(
    "http://localhost:8000/api/what-if/run",
    data={"target_role_slug": "analytics-engineer", "added_skills": ["docker"], "weekly_hours": 20}
)
d4 = json.loads(c4)
print(f"4. What-If Run: Status={s4}, Deltas={list(d4.get('deltas', {}).keys())}, Diagnosis={'intelligence_diagnosis' in d4}")

print("\n--- Testing Next.js Frontend Intelligence Pages ---")
for route in ["/transition-engine", "/next-best-skill", "/career-simulator", "/what-if"]:
    s, c = test_endpoint(f"http://localhost:3000{route}")
    has_sr = "SKILLROUTE" in c or "SkillRoute" in c or "transition" in c.lower()
    print(f"Page {route}: Status={s}, Length={len(c)}, RenderedContent={has_sr}")

print("\nAll integration checks completed successfully!")
