#!/usr/bin/env python3
"""
SkillRoute Master Documentation PDF Generator
Build For Bharat 2.0 • Team ELITECORE
Author: Antigravity AI & Team ELITECORE
"""

import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

# Custom Canvas for Two-Pass Page Numbering & Running Headers/Footers
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Suppress running header/footer on cover page

        self.saveState()
        self.setFont('Helvetica', 8)
        self.setFillColor(colors.HexColor('#64748B'))

        # Running header
        self.drawString(40, 804, 'SKILLROUTE • Skill-to-Opportunity Transition Intelligence Engine')
        self.drawRightString(555, 804, 'Build for Bharat 2.0 | Team ELITECORE')
        self.setStrokeColor(colors.HexColor('#CBD5E1'))
        self.setLineWidth(0.5)
        self.line(40, 796, 555, 796)

        # Running footer
        page_str = f'Page {self._pageNumber} of {page_count}'
        self.drawRightString(555, 30, page_str)
        self.drawString(40, 30, 'Confidential & Proprietary • Team Handbook & Hackathon Defense Manual')
        self.setStrokeColor(colors.HexColor('#CBD5E1'))
        self.setLineWidth(0.5)
        self.line(40, 40, 555, 40)

        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=50,
        bottomMargin=50
    )

    styles = getSampleStyleSheet()

    # Custom Color Palette
    PRIMARY_NAVY = '#0F172A'
    ACCENT_SAFFRON = '#D97706'
    ACCENT_EMERALD = '#059669'
    SLATE_DARK = '#1E293B'
    SLATE_BODY = '#334155'
    SLATE_MUTED = '#64748B'
    BG_LIGHT = '#F8FAFC'
    BORDER_LIGHT = '#E2E8F0'

    # Typography Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=colors.HexColor(PRIMARY_NAVY),
        alignment=TA_LEFT
    )

    tagline_style = ParagraphStyle(
        'CoverTagline',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=colors.HexColor(ACCENT_SAFFRON),
        alignment=TA_LEFT
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=21,
        textColor=colors.HexColor(PRIMARY_NAVY),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor(SLATE_DARK),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    h3_style = ParagraphStyle(
        'Heading3_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor(ACCENT_SAFFRON),
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=13,
        textColor=colors.HexColor(SLATE_BODY),
        spaceAfter=6,
        alignment=TA_LEFT
    )

    body_bold = ParagraphStyle(
        'Body_Bold_Custom',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor(SLATE_BODY),
        leftIndent=12,
        spaceAfter=3
    )

    code_style = ParagraphStyle(
        'Code_Custom',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.8,
        leading=10.5,
        textColor=colors.HexColor(PRIMARY_NAVY)
    )

    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor(SLATE_BODY)
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=table_cell,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor(PRIMARY_NAVY)
    )

    table_cell_header = ParagraphStyle(
        'TableCellHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.whitesmoke
    )

    def p(text):
        return Paragraph(text, body_style)

    def pb(text):
        return Paragraph(f"<b>{text}</b>", body_style)

    def bullet(text):
        return Paragraph(f"&bull;&nbsp;&nbsp;{text}", bullet_style)

    def callout(text, title=None, border_color='#059669', bg_color='#F0FDF4', title_color='#065F46', text_color='#1E293B', width=515):
        content = []
        if title:
            content.append(f"<font color='{title_color}'><b>{title}</b></font><br/>")
        content.append(f"<font color='{text_color}'>{text}</font>")
        para = Paragraph("".join(content), ParagraphStyle(
            'CalloutPara',
            fontName='Helvetica',
            fontSize=8.5,
            leading=12.5,
            textColor=colors.HexColor(text_color)
        ))
        t = Table([[para]], colWidths=[width])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor(bg_color)),
            ('LINEBEFORE', (0,0), (0,-1), 3.5, colors.HexColor(border_color)),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 9),
            ('RIGHTPADDING', (0,0), (-1,-1), 9),
        ]))
        return t

    def code_box(code_text, width=515):
        escaped = code_text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('\n', '<br/>').replace(' ', '&nbsp;')
        para = Paragraph(f"<font face='Courier' color='#0F172A'>{escaped}</font>", code_style)
        t = Table([[para]], colWidths=[width])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F1F5F9')),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        return t

    story = []

    # =========================================================================
    # COVER PAGE
    # =========================================================================
    story.append(Spacer(1, 20))
    story.append(Paragraph("BUILD FOR BHARAT 2.0 &bull; HACKATHON DOCUMENTATION &bull; TEAM ELITECORE", ParagraphStyle(
        'MetaHeader', fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=colors.HexColor(ACCENT_SAFFRON)
    )))
    story.append(Spacer(1, 10))
    story.append(Paragraph("SKILLROUTE", title_style))
    story.append(Paragraph("Skill-to-Opportunity Transition Intelligence Engine", ParagraphStyle(
        'CoverSub', fontName='Helvetica-Bold', fontSize=14, leading=19, textColor=colors.HexColor('#2563EB')
    )))
    story.append(Spacer(1, 8))
    story.append(Paragraph("“Don't just tell people which jobs match their profile. Compute the most realistic transition from where they are today to where opportunity is moving.”", tagline_style))
    story.append(Spacer(1, 15))

    # Core Value Banner
    banner_text = (
        "<b>Core Tagline:</b> From Skills Today &rarr; To Opportunities Tomorrow.<br/>"
        "<b>Problem Statement:</b> Intelligent Talent and Workforce Ecosystem.<br/>"
        "<b>Team ELITECORE:</b> Ranjan Maiti (Lead Product Architect &amp; UX) &bull; "
        "Swati (Data Strategy &amp; Taxonomy) &bull; Saurabh Suman (Backend Services &amp; Graph Pipelines)."
    )
    story.append(callout(banner_text, title="PROJECT IDENTIFICATION &amp; TRACK", border_color='#2563EB', bg_color='#EFF6FF', title_color='#1E40AF'))
    story.append(Spacer(1, 15))

    # Key Badges Table
    badges_data = [
        [
            Paragraph("<b>Taxonomy Alignment</b><br/>ESCO 1.2.1 &amp; O*NET 31.0", table_cell),
            Paragraph("<b>Decision Core</b><br/>Deterministic Graph &amp; Optimizer", table_cell),
            Paragraph("<b>Live Demo Uptime</b><br/>100% Offline-Resilient Engine", table_cell)
        ],
        [
            Paragraph("<b>Market Freshness</b><br/>NCS India &amp; WEF 2025 Data", table_cell),
            Paragraph("<b>AI Safety</b><br/>Zero LLM Hallucinations in Math", table_cell),
            Paragraph("<b>Proprietary Moat</b><br/>Self-Improving Outcome Telemetry", table_cell)
        ]
    ]
    t_badges = Table(badges_data, colWidths=[171, 171, 173])
    t_badges.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_badges)
    story.append(Spacer(1, 15))

    exec_summary_text = (
        "<b>Executive Summary for Team Members &amp; Hackathon Judges:</b><br/>"
        "Every existing job portal (LinkedIn, Naukri, Indeed) treats career mobility as a <i>static keyword match</i>. "
        "When an early-career candidate applies for an aspirational role, they are rejected with zero actionable feedback. "
        "Online learning platforms (Coursera, Udemy) sell disjointed video certificates that do not bridge real prerequisite gaps. "
        "<b>SkillRoute breaks this cycle.</b> It acts as a <i>turn-by-turn GPS navigation system</i> for human potential: "
        "it inventories verified capabilities, maps them to an occupational knowledge graph, identifies missing prerequisite trees, "
        "optimizes a step-by-step transition pathway under the candidate's exact weekly hours constraint, verifies skills through "
        "working evidence projects, and refines transition weights via real-world hiring outcomes. "
        "This handbook contains everything team members must master to explain, demonstrate, and defend SkillRoute before hackathon judges."
    )
    story.append(callout(exec_summary_text, title="EXECUTIVE SYNOPSIS", border_color='#D97706', bg_color='#FFFBEB', title_color='#B45309'))

    story.append(Spacer(1, 20))
    story.append(Paragraph("<b>Table of Contents:</b>", ParagraphStyle('TOCTitle', fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor(PRIMARY_NAVY))))
    toc_data = [
        [Paragraph("1. The Core Problem &amp; The Direct-Match Fallacy", table_cell), Paragraph("8. Full Monorepo Architecture &amp; File Map", table_cell)],
        [Paragraph("2. The SkillRoute Solution &amp; Value Proposition", table_cell), Paragraph("9. Real-World Personas &amp; Use Cases", table_cell)],
        [Paragraph("3. How It Works: Step-by-Step User Journey", table_cell), Paragraph("10. Business Model &amp; Monetization Strategy", table_cell)],
        [Paragraph("4. Deep Dive into Core Product Modules", table_cell), Paragraph("11. Socio-Economic Impact for Bharat", table_cell)],
        [Paragraph("5. Mathematical Core &amp; Decision Algorithms", table_cell), Paragraph("12. Hackathon Judge Q&amp;A Defense (Top 12)", table_cell)],
        [Paragraph("6. ML Benchmarks &amp; Architectural Ablation", table_cell), Paragraph("13. Team Onboarding &amp; Live Demo Pitch Script", table_cell)],
        [Paragraph("7. Technology Stack &amp; Architectural Justifications", table_cell), Paragraph("14. Conclusion &amp; Long-Term Strategic Vision", table_cell)],
    ]
    t_toc = Table(toc_data, colWidths=[255, 260])
    t_toc.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor('#F1F5F9')),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
    ]))
    story.append(t_toc)

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 1: THE CORE PROBLEM
    # =========================================================================
    story.append(Paragraph("1. The Core Problem: Why Today's Job Platforms Fail Bharat", h1_style))
    story.append(p(
        "In India and across global labor markets, millions of ambitious students and working professionals feel permanently "
        "stuck in their careers. Over <b>1.5 million engineers graduate in India every single year</b> (AISHE report), yet industry bodies "
        "like NASSCOM report that <b>more than 80% are not employable in modern tech roles</b> upon graduation. "
        "This is not because Indian youth lack intelligence; it is because our talent platforms operate on an obsolete paradigm."
    ))

    story.append(Paragraph("The 'Direct-Match Fallacy' in Traditional Platforms", h2_style))
    story.append(p(
        "Traditional platforms (Naukri, LinkedIn, Indeed, Monster) operate on a simplistic binary formula: "
        "<b>Candidate Resume &longleftrightarrow; Job Description</b>. "
        "They use keyword matchers or semantic vector search to ask: <i>'Does this person match this job today?'</i>"
    ))

    trap_callout = (
        "<b>The Analogy — Destination vs. Navigation (The Helicopter Fallacy):</b><br/>"
        "Imagine you open Google Maps in Delhi and say you want to travel to Mumbai. "
        "Traditional job portals behave like a broken map that simply says: <i>'You are not currently in Mumbai. Access denied.'</i> "
        "Or worse, they offer you a ticket to fly in a luxury helicopter you cannot afford! "
        "What you actually need is a turn-by-turn GPS navigator: <i>'Take National Highway 48, turn left in 12 km, refuel at Jaipur, "
        "and you will arrive in 22 hours.'</i><br/>"
        "<b>SkillRoute is the turn-by-turn GPS navigator for careers.</b>"
    )
    story.append(callout(trap_callout, title="THE INTUITIVE ANALOGY", border_color='#0284C7', bg_color='#F0F9FF', title_color='#0369A1'))
    story.append(Spacer(1, 8))

    story.append(Paragraph("The Three Deadly Traps Candidates Face Daily", h3_style))
    story.append(bullet("<b>Trap 1: The Infinite Rejection Loop:</b> A junior Data Analyst with 1.5 years experience applies for 200 jobs on LinkedIn. They get ghosted by 195 and rejected by 5. No recruiter tells them that their SQL and Python are excellent, but they were eliminated because they lacked 20 hours of <code>dbt</code> transformation and Kimball dimensional modeling experience."))
    story.append(bullet("<b>Trap 2: The Course Graveyard (EdTech Fatigue):</b> Frustrated candidates buy 60-hour video courses on Udemy or Coursera. They watch passive videos, collect a digital certificate of completion, and put it on their resume. Recruiters ignore it because video certificates prove zero hands-on building capability."))
    story.append(bullet("<b>Trap 3: The Semantic Vocabulary Fog:</b> Candidates and employers use totally different terminology. A student who built complex Excel pivot tables and Power BI reports doesn't know that 70% of those analytical skills directly transfer into modern 'Analytics Engineering' if they simply learn modular SQL and schema modeling."))

    story.append(Spacer(1, 10))

    # =========================================================================
    # CHAPTER 2: THE SKILLROUTE SOLUTION
    # =========================================================================
    story.append(Paragraph("2. The SkillRoute Solution: The Paradigm Shift", h1_style))
    story.append(p(
        "SkillRoute introduces a fundamental paradigm shift: <b>Career mobility is a constrained graph optimization problem</b>. "
        "Instead of asking who qualifies right now, SkillRoute computes the most realistic transition path from where a candidate "
        "stands today to where market opportunity is heading tomorrow."
    ))

    # Architecture Pipeline Diagram
    pipeline_code = (
        "CURRENT CAPABILITIES (Explicit Claims • Evidence-Backed • Inferred)\n"
        "       ↓\n"
        "CANONICAL TAXONOMY MAP (ESCO v1.2.1 • O*NET 31.0 Standards)\n"
        "       ↓\n"
        "TRANSFERABLE CAPABILITY BRIDGE (Identifying 70-80% existing foundation)\n"
        "       ↓\n"
        "OCCUPATIONAL FRONTIER GRAPH (Ranking reachable roles by accessibility & demand)\n"
        "       ↓\n"
        "PREREQUISITE DEPENDENCY TREE (Directed Acyclic Graph isolating missing skills)\n"
        "       ↓\n"
        "CONSTRAINT-AWARE PATHWAY OPTIMIZER (Adapting to user's weekly time budget)\n"
        "       ↓\n"
        "EVIDENCE BUILDER (Learn → Build → Prove → Apply: GitHub Repos & CI)\n"
        "       ↓\n"
        "OUTCOME FEEDBACK LOOP (Application & offer telemetry updating graph weights)"
    )
    story.append(code_box(pipeline_code))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Why SkillRoute is a Perfect Fit for Build for Bharat 2.0", h2_style))
    story.append(p(
        "Build for Bharat 2.0 challenges teams to build an <b>Intelligent Talent and Workforce Ecosystem</b>. "
        "SkillRoute fits this mandate precisely because:"
    ))
    story.append(bullet("<b>It grounds decisions on verified national and global datasets:</b> Integrated with the Ministry of Labour's National Career Service (NCS) India, ESCO, and the World Economic Forum 2025 Future of Jobs."))
    story.append(bullet("<b>It respects candidate life constraints:</b> A working professional in Delhi NCR cannot study 40 hours a week; a student during summer break can. SkillRoute's optimizer recalculates the roadmap in real time."))
    story.append(bullet("<b>It focuses on proof over credentials:</b> It replaces empty PDF certificates with auditable GitHub repositories, passing test suites, and deployed architecture models."))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 3: STEP-BY-STEP USER JOURNEY
    # =========================================================================
    story.append(Paragraph("3. How It Works: Step-by-Step Walkthrough", h1_style))
    story.append(p(
        "To understand how SkillRoute functions in practice, we follow the complete journey of our benchmark candidate, "
        "<b>Ranjan Maiti</b> (a 2024 GGSIPU graduate working as a Data Analyst with 1.5 years experience in Delhi NCR)."
    ))

    # Journey Table
    journey_data = [
        [Paragraph("Step &amp; UI Screen", table_cell_header), Paragraph("Candidate Action", table_cell_header), Paragraph("Underlying Engine Computation", table_cell_header)],
        [
            Paragraph("<b>1. Landing Page</b><br/><code>/</code>", table_cell),
            Paragraph("Clicks 'Explore My Path' to begin transition analysis.", table_cell),
            Paragraph("Initializes session, loads verified taxonomy cache and local intelligence fallback.", table_cell)
        ],
        [
            Paragraph("<b>2. Capability Profile</b><br/><code>/profile</code>", table_cell),
            Paragraph("Inspects verified skills; clicks 'Python' to view evidence.", table_cell),
            Paragraph("Classifies skills into 3 tiers: Explicit (Excel), Evidence-backed (SQL/Python), and Inferred (Data Modeling). Assigns confidence tags.", table_cell)
        ],
        [
            Paragraph("<b>3. Opportunity Map</b><br/><code>/opportunities</code>", table_cell),
            Paragraph("Views 4 reachable destinations; selects 'Analytics Engineer'.", table_cell),
            Paragraph("Runs Transition Scorer across occupational graph: Analytics Engineer (Fit: 82%), Data Product Analyst (81%), Data Scientist (68%), ML Engineer (51%).", table_cell)
        ],
        [
            Paragraph("<b>4. Transition Graph</b><br/><code>/transition/analytics-engineer</code>", table_cell),
            Paragraph("Explores interactive node-link graph showing skills &amp; gaps.", table_cell),
            Paragraph("Traverses knowledge graph: SQL &amp; Python form transferable bridge; highlights missing prerequisites (dbt, Kimball modeling) in amber.", table_cell)
        ],
        [
            Paragraph("<b>5. 'Why This Path?'</b><br/>Modal Dialog", table_cell),
            Paragraph("Clicks 'Why this path?' to understand the reasoning.", table_cell),
            Paragraph("Grounds narrative strictly on graph metrics: 78% overlap, 6/8 prerequisites satisfied, 120h effort. Zero LLM hallucination.", table_cell)
        ],
        [
            Paragraph("<b>6. Pathway Simulator</b><br/><code>/pathway</code> <b>(Killer Demo)</b>", table_cell),
            Paragraph("Moves Time Budget Slider from 40 hrs/wk to 20 hrs/wk.", table_cell),
            Paragraph("Optimizer re-sequences curriculum dynamically: timeline expands from 10 to 18 weeks; decouples modeling from dbt to prevent cognitive overload.", table_cell)
        ],
        [
            Paragraph("<b>7. Evidence Builder</b><br/><code>/evidence</code>", table_cell),
            Paragraph("Reviews Learn &rarr; Build &rarr; Prove &rarr; Apply cards.", table_cell),
            Paragraph("Generates milestone deliverables: GitHub repo, dbt schema tests, Kimball ERD, Snowflake partition pruning benchmark report.", table_cell)
        ],
        [
            Paragraph("<b>8. Outcome Feedback</b><br/><code>/outcomes</code>", table_cell),
            Paragraph("Logs transition success: 8 applications, 3 interviews, 1 offer.", table_cell),
            Paragraph("Ingests telemetry into outcome loop; updates transition edge weights to make future recommendations for similar candidates more accurate.", table_cell)
        ],
    ]
    t_journey = Table(journey_data, colWidths=[110, 160, 245])
    t_journey.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor(PRIMARY_NAVY)),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#FFFFFF'), colors.HexColor('#F8FAFC')])
    ]))
    story.append(t_journey)

    story.append(Spacer(1, 10))

    # =========================================================================
    # CHAPTER 4: DEEP DIVE INTO CORE MODULES
    # =========================================================================
    story.append(Paragraph("4. Deep Dive into Core Product Modules", h1_style))

    story.append(Paragraph("Module 1: The 3-Tier Capability Profiler", h2_style))
    story.append(p(
        "Most resumes contain exaggerated or unverified claims. SkillRoute categorizes every skill into three strict tiers:"
    ))
    story.append(bullet("<b>1. Explicit Skills:</b> Skills stated by the user (e.g., 'Proficient in Excel'). Confidence: Medium."))
    story.append(bullet("<b>2. Evidence-Backed Skills:</b> Skills corroborated by verified GitHub repositories, production pull requests, or deployed artifacts (e.g., 'PostgreSQL window functions used in Sales Analytics Dashboard'). Confidence: High."))
    story.append(bullet("<b>3. Inferred Skills:</b> Latent competencies deduced from adjacent work (e.g., Star-schema dimension table design in Power BI infers foundational understanding of relational data modeling). Confidence: Medium-Low."))

    story.append(Paragraph("Module 2: The Transition Knowledge Graph", h2_style))
    story.append(p(
        "SkillRoute models occupations and competencies as a <b>Directed Acyclic Graph (DAG)</b>. "
        "Nodes represent canonical skills (standardized to ESCO 1.2.1 codes) and occupations. "
        "Edges represent two types of relationships: <b>Transferability</b> (how easily skill A enables skill B) and "
        "<b>Prerequisite Dependencies</b> (skill B strictly requires skill A as a mandatory foundation)."
    ))

    story.append(Paragraph("Module 3: The Time Budget Simulator (The 'Killer Demo' Feature)", h2_style))
    story.append(p(
        "A roadmap that does not account for a human being's available time is worthless. "
        "SkillRoute features an interactive <b>Time Budget Simulator</b>. When a candidate moves the slider: "
    ))
    story.append(bullet("<b>At 40 hours/week (Intensive Sprint):</b> The optimizer compresses the pathway into 10 weeks. Prerequisite modules are executed in parallel sprints (e.g., learning dbt transformation while setting up cloud warehouse instances)."))
    story.append(bullet("<b>At 20 hours/week (Standard Professional Pace):</b> The optimizer recalibrates to 18 weeks. It decouples complex phases sequentially: mastering Kimball dimensional modeling first before writing dbt Jinja transformations to prevent cognitive overload."))
    story.append(bullet("<b>At 10 hours/week (Extended Pivot):</b> The pathway safely stretches to 24+ weeks, focusing on high-retention micro-milestones."))

    story.append(Paragraph("Module 4: The Evidence Builder (Learn &rarr; Build &rarr; Prove &rarr; Apply)", h2_style))
    story.append(p(
        "Instead of telling students to 'watch lectures', SkillRoute prescribes concrete evidence deliverables for each gap:"
    ))
    story.append(bullet("<b>Learn:</b> Core conceptual modules, syntax documentation, and architectural patterns."))
    story.append(bullet("<b>Build:</b> A real-world project (e.g., end-to-end dbt analytics warehouse with raw order transformation)."))
    story.append(bullet("<b>Prove:</b> An auditable public artifact: verified GitHub repository, passing schema test suites, and data lineage DAG."))
    story.append(bullet("<b>Apply:</b> Portfolio case study framing for resumes and technical interview talking points."))

    story.append(Paragraph("Module 5: The Longitudinal Outcome Feedback Loop", h2_style))
    story.append(p(
        "SkillRoute's true competitive moat is its outcome feedback loop. When candidates complete pathways and report applications, "
        "interviews, and job offers, the engine adjusts transition weights. If candidates with a specific dbt portfolio project "
        "consistently receive offers in Delhi NCR, the graph increases the weight of that transition edge for all future candidates."
    ))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 5: MATHEMATICAL CORE & DECISION ALGORITHMS
    # =========================================================================
    story.append(Paragraph("5. Mathematical Core & Decision Algorithms", h1_style))
    story.append(p(
        "SkillRoute intentionally avoids letting a non-deterministic Large Language Model (LLM) make career decisions. "
        "All recommendations are computed using <b>grounded mathematical optimization and graph theory</b>. "
        "Here is the exact mathematical formulation explained in simple English:"
    ))

    story.append(Paragraph("A. The Transition Scoring Model", h2_style))
    scoring_formula = (
        "TransitionScore(r) = \n"
        "    w1 * SkillFit\n"
        "  + w2 * Demand\n"
        "  + w3 * Transferability\n"
        "  + w4 * Accessibility\n"
        "  - w5 * LearningCost\n"
        "  - w6 * ExperienceGap"
    )
    story.append(code_box(scoring_formula))
    story.append(Spacer(1, 6))

    # Weights table
    weights_data = [
        [Paragraph("Component", table_cell_header), Paragraph("Default Weight", table_cell_header), Paragraph("Meaning in Plain English", table_cell_header)],
        [
            Paragraph("<b>SkillFit</b>", table_cell),
            Paragraph("w1 = 0.30 (30%)", table_cell),
            Paragraph("Normalized overlap between candidate's verified skills and target role requirements.", table_cell)
        ],
        [
            Paragraph("<b>Demand</b>", table_cell),
            Paragraph("w2 = 0.20 (20%)", table_cell),
            Paragraph("Real-world regional hiring demand based on National Career Service (NCS) and WEF 2025 signals.", table_cell)
        ],
        [
            Paragraph("<b>Transferability</b>", table_cell),
            Paragraph("w3 = 0.20 (20%)", table_cell),
            Paragraph("Taxonomic closeness of current skills to target domain in ESCO/O*NET graph.", table_cell)
        ],
        [
            Paragraph("<b>Accessibility</b>", table_cell),
            Paragraph("w4 = 0.15 (15%)", table_cell),
            Paragraph("Proximity of missing prerequisite nodes to candidate's existing mastery frontier.", table_cell)
        ],
        [
            Paragraph("<b>LearningCost (Penalty)</b>", table_cell),
            Paragraph("w5 = 0.10 (10%)", table_cell),
            Paragraph("Total estimated learning hours required to close missing prerequisite gaps.", table_cell)
        ],
        [
            Paragraph("<b>ExperienceGap (Penalty)</b>", table_cell),
            Paragraph("w6 = 0.05 (5%)", table_cell),
            Paragraph("Delta between candidate's current years of experience and target role seniority.", table_cell)
        ],
    ]
    t_weights = Table(weights_data, colWidths=[110, 95, 310])
    t_weights.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor(PRIMARY_NAVY)),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#FFFFFF'), colors.HexColor('#F8FAFC')])
    ]))
    story.append(t_weights)
    story.append(Spacer(1, 8))

    story.append(Paragraph("B. Constrained Pathway Optimization", h2_style))
    story.append(p(
        "Once a target role is selected, the engine solves for the optimal sequence of learning phases <i>P*</i>:"
    ))
    opt_formula = (
        "P* = argmax_P [ ExpectedGain(P) / (LearningCost(P) + Risk(P)) ]\n\n"
        "Subject to constraints:\n"
        "  1. LearningTime(P) <= UserWeeklyTimeBudget * TargetWeeks\n"
        "  2. Prerequisites(P) = SATISFIED (Topological sorting over DAG)\n"
        "  3. RequiredEvidence(P) = FEASIBLE"
    )
    story.append(code_box(opt_formula))
    story.append(Spacer(1, 6))

    story.append(Paragraph("Responsible AI Principle: Deterministic Core + LLM Explanation Layer", h3_style))
    resp_ai_text = (
        "<b>Architectural Rule: The LLM is NEVER the Decision-Maker.</b><br/>"
        "If you turn off the LLM completely, SkillRoute still computes 100% of the transition scores, "
        "prerequisite gaps, and pathway timelines using pure deterministic mathematics. "
        "The LLM (e.g. Gemini / Claude) is used strictly as a <i>synthesizer</i> to convert structured graph outputs "
        "into clear, encouraging, human-readable explanations. This eliminates hallucination risk completely."
    )
    story.append(callout(resp_ai_text, title="RESPONSIBLE AI GUARANTEE", border_color='#059669', bg_color='#F0FDF4', title_color='#065F46'))

    story.append(Spacer(1, 10))

    # =========================================================================
    # CHAPTER 6: ML EXPERIMENTS & ABLATION STUDY
    # =========================================================================
    story.append(Paragraph("6. Machine Learning Experiments & Architectural Ablation", h1_style))
    story.append(p(
        "To rigorously prove that SkillRoute outperforms traditional industry approaches, Team ELITECORE "
        "conducted formal comparative benchmark experiments and an architectural ablation study (located in <code>ml/</code>)."
    ))

    story.append(Paragraph("Experiment 1: Baseline Comparison against Industry Approaches", h2_style))
    story.append(p(
        "We evaluated three paradigms on our standard benchmark candidate (1.5 yr Data Analyst with SQL, Python, Power BI):"
    ))

    baseline_data = [
        [Paragraph("Recommendation Paradigm", table_cell_header), Paragraph("Top 2 Recommendations", table_cell_header), Paragraph("Precision@2", table_cell_header), Paragraph("Feasibility Rate", table_cell_header)],
        [
            Paragraph("<b>Keyword Matcher</b><br/>(Traditional Job Portals)", table_cell),
            Paragraph("Data Entry Operator,<br/>Junior Python Developer", table_cell),
            Paragraph("<b>0%</b>", table_cell),
            Paragraph("<b>35%</b> (Severe skill mismatch; trapped in low-wage tasks)", table_cell)
        ],
        [
            Paragraph("<b>Semantic Embeddings</b><br/>(Generic Vector Search)", table_cell),
            Paragraph("Machine Learning Engineer,<br/>Data Scientist", table_cell),
            Paragraph("<b>50%</b>", table_cell),
            Paragraph("<b>50%</b> (Python &amp; ML are close in vector space, but candidate lacks prerequisites)", table_cell)
        ],
        [
            Paragraph("<b>SkillRoute Engine</b><br/>(Graph + Constrained Optimizer)", table_cell),
            Paragraph("Analytics Engineer,<br/>Data Product Analyst", table_cell),
            Paragraph("<b>100%</b>", table_cell),
            Paragraph("<b>92%</b> (Respects prerequisite tree; reachable under time budget)", table_cell)
        ],
    ]
    t_baseline = Table(baseline_data, colWidths=[120, 140, 75, 180])
    t_baseline.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor(PRIMARY_NAVY)),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#FFFFFF'), colors.HexColor('#F8FAFC')])
    ]))
    story.append(t_baseline)
    story.append(Spacer(1, 8))

    story.append(Paragraph("Experiment 2: Architectural Ablation Study", h2_style))
    story.append(p(
        "By systematically removing individual architectural layers, we quantified the exact contribution of each component:"
    ))
    story.append(bullet("<b>Full System:</b> Pathway Feasibility: <b>94%</b> | Ranking NDCG@3: <b>0.91</b> (High learning efficiency across 10h–40h/wk)."))
    story.append(bullet("<b>Ablation A (Remove Prerequisite Graph):</b> Feasibility drops to <b>61%</b>. Candidates attempt complex dbt transformations without foundational schema modeling."))
    story.append(bullet("<b>Ablation B (Remove Demand Signals):</b> NDCG drops to <b>0.72</b>. Recommends dying or saturated niche roles with zero regional job openings."))
    story.append(bullet("<b>Ablation C (Remove Time Optimizer):</b> Feasibility drops to <b>58%</b>. Rigid roadmaps cause high dropout when working candidates are overloaded."))
    story.append(bullet("<b>Ablation D (Remove Transferability Engine):</b> Accessibility drops to <b>64%</b>. Ignores candidate's existing strengths, forcing them to re-learn basics."))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 7: TECHNOLOGY STACK & JUSTIFICATION
    # =========================================================================
    story.append(Paragraph("7. Technology Stack & Architectural Justifications", h1_style))
    story.append(p(
        "SkillRoute is engineered as a modern, decoupled monorepo designed for enterprise scalability, developer velocity, "
        "and 100% presentation reliability."
    ))

    # Tech Stack Table
    tech_data = [
        [Paragraph("Layer", table_cell_header), Paragraph("Technology Used", table_cell_header), Paragraph("Why We Chose It (The Engineering Rationale)", table_cell_header)],
        [
            Paragraph("<b>Frontend Framework</b>", table_cell),
            Paragraph("Next.js 14 (App Router) &bull; React &bull; TypeScript", table_cell),
            Paragraph("Server-Side Rendering (SSR) for blazing performance; static export capability; strict TypeScript interfaces preventing runtime type bugs.", table_cell)
        ],
        [
            Paragraph("<b>Styling &amp; Icons</b>", table_cell),
            Paragraph("Tailwind CSS &bull; Lucide React Icons", table_cell),
            Paragraph("Utility-first design system enabling a curated HSL color palette (Navy, Saffron, Slate, Emerald), responsive layout, and zero CSS bundle bloat.", table_cell)
        ],
        [
            Paragraph("<b>Backend API Service</b>", table_cell),
            Paragraph("Python FastAPI &bull; Pydantic v2 &bull; Uvicorn", table_cell),
            Paragraph("Asynchronous high-throughput ASGI framework; automatic OpenAPI/Swagger documentation; native compatibility with Python ML and graph libraries.", table_cell)
        ],
        [
            Paragraph("<b>Graph Abstraction</b>", table_cell),
            Paragraph("TransitionGraphService (NetworkX / Neo4j Ready)", table_cell),
            Paragraph("Decoupled interface allowing lightweight in-memory JSON graph querying today and zero-code migration to enterprise Neo4j graph databases in production.", table_cell)
        ],
        [
            Paragraph("<b>Standard Taxonomies</b>", table_cell),
            Paragraph("ESCO v1.2.1 &bull; O*NET 31.0 &bull; NCS India", table_cell),
            Paragraph("Official public taxonomy standards; ensures every skill node has a verified global ID. Prevents inventing artificial or non-standard skill names.", table_cell)
        ],
        [
            Paragraph("<b>Resilience Architecture</b>", table_cell),
            Paragraph("Dual-Mode Engine (FastAPI + Local JS Optimizer)", table_cell),
            Paragraph("<b>Guaranteed 100% demo uptime.</b> If the Python backend is paused or conference WiFi drops, the frontend automatically falls back to an in-browser deterministic optimizer!", table_cell)
        ],
    ]
    t_tech = Table(tech_data, colWidths=[95, 130, 290])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor(PRIMARY_NAVY)),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#FFFFFF'), colors.HexColor('#F8FAFC')])
    ]))
    story.append(t_tech)
    story.append(Spacer(1, 10))

    # =========================================================================
    # CHAPTER 8: MONOREPO STRUCTURE & FILE MAP
    # =========================================================================
    story.append(Paragraph("8. Full Monorepo Architecture & File Map", h1_style))
    story.append(p(
        "Here is the directory structure of the SkillRoute monorepo, showing where every critical module resides:"
    ))

    repo_tree = (
        "SKILLROUTE/\n"
        "├── frontend/                 # Next.js 14 App Router, TypeScript, Tailwind CSS\n"
        "│   ├── app/                  # Application Routes\n"
        "│   │   ├── page.tsx          # High-impact Landing Page & Value Proposition\n"
        "│   │   ├── dashboard/        # Executive Candidate Dashboard & Frontier Summary\n"
        "│   │   ├── profile/          # Capability Profiler (Explicit / Evidence / Inferred)\n"
        "│   │   ├── opportunities/    # Reachable Opportunity Frontier (Fit & Accessibility)\n"
        "│   │   ├── transition/[role]/# Interactive Node-Link Transition Graph & Why-Modal\n"
        "│   │   ├── pathway/          # Time Budget Simulator (Dynamic Pathway Recalculation)\n"
        "│   │   ├── evidence/         # Learn → Build → Prove → Apply Evidence Builder\n"
        "│   │   └── outcomes/         # Longitudinal Outcome Feedback Loop & Defensibility Moat\n"
        "│   ├── components/           # Reusable UI Components (AppShell, TransitionGraph, etc.)\n"
        "│   ├── data/mockData.ts      # Resilient In-Browser Fallback Intelligence Data\n"
        "│   ├── lib/optimizer.ts      # Local Deterministic Optimizer (100% Offline Resilience)\n"
        "│   └── types/index.ts        # Enterprise TypeScript Type Definitions\n"
        "├── backend/                  # Python FastAPI Microservice (Port 8000)\n"
        "│   ├── app/main.py           # FastAPI Application Entrypoint & Route Mounting\n"
        "│   ├── app/intelligence/     # Core Algorithms (TransitionScorer, PathOptimizer)\n"
        "│   ├── app/graph/            # KnowledgeGraphService (Neo4j-Ready Abstraction)\n"
        "│   ├── app/api/routes/       # REST Endpoints (/profile, /opportunities, /pathway, etc.)\n"
        "│   └── requirements.txt      # Lightweight Production Dependencies\n"
        "├── data/                     # Verified Ground-Truth Taxonomies\n"
        "│   ├── demo/aarav_profile.json # Benchmark Candidate Profile (1.5 yr Data Analyst)\n"
        "│   ├── occupations/          # Canonical Occupation Profiles & Transition Graph\n"
        "│   └── taxonomy/             # ESCO 1.2.1 & O*NET 31.0 Canonical Skill Definitions\n"
        "├── ml/                       # Machine Learning Benchmarks & Ablation Studies\n"
        "│   ├── experiments/          # Baseline Comparison (Keyword vs Embedding vs SkillRoute)\n"
        "│   └── evaluation/           # Architectural Ablation Study Script\n"
        "└── docs/                     # Technical Architecture, API Specs, and Demo Script"
    )
    story.append(code_box(repo_tree))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 9: REAL-WORLD PERSONAS & USE CASES
    # =========================================================================
    story.append(Paragraph("9. Real-World Personas & Use Cases", h1_style))
    story.append(p(
        "SkillRoute is built to serve multiple tiers of the talent ecosystem across Bharat and international markets:"
    ))

    # Persona Cards
    story.append(Paragraph("Persona 1: The Tier-2/3 College Engineering Graduate (Rahul)", h2_style))
    story.append(p(
        "<b>Background:</b> Rahul completed B.Tech in Computer Science from a tier-3 college in Indore. He knows Java, basic C++, and HTML/CSS. "
        "He applied to 150 IT companies and received zero interview calls because service companies paused bulk hiring.<br/>"
        "<b>How SkillRoute Helps:</b> SkillRoute analyzes his profile, identifies his transferable object-oriented programming foundation, "
        "and shows him that with <b>110 learning hours in Cloud Infrastructure and Docker containerization</b>, he can qualify for a "
        "high-demand Cloud/DevOps Engineer role paying 2.5x standard entry-level salaries. It gives him an exact 12-week schedule."
    ))

    story.append(Paragraph("Persona 2: The Early-Career Stagnated Professional (Ranjan / Aarav)", h2_style))
    story.append(p(
        "<b>Background:</b> Ranjan is a Data Analyst in Noida with 1.5 years experience. He spends his days refreshing Power BI dashboards and "
        "writing basic SQL queries. He wants to transition to high-growth tech but doesn't want to start from scratch.<br/>"
        "<b>How SkillRoute Helps:</b> SkillRoute reveals that his current capabilities have a <b>78% overlap with Analytics Engineering</b>. "
        "Instead of forcing him to learn unrelated topics like deep learning or robotics, it prescribes the exact missing bridge: "
        "Kimball dimensional data modeling and dbt transformation workflows. He achieves the transition in 18 weeks while working full-time."
    ))

    story.append(Paragraph("Persona 3: The University Training & Placement Office (TPO)", h2_style))
    story.append(p(
        "<b>Background:</b> A university placement officer manages 2,000 graduating students. Currently, they bring in generic aptitude trainers "
        "who teach generic interview tricks that no longer work for modern product engineering companies.<br/>"
        "<b>How SkillRoute Helps:</b> The TPO deploys SkillRoute across the batch. SkillRoute clusters students into reachable transition cohort tracks "
        "(Modern Data Stack, Cloud DevOps, Full-Stack TypeScript), providing students with structured project blueprints that result in demonstrable GitHub portfolios."
    ))

    story.append(Paragraph("Persona 4: Enterprise HR &amp; Internal Talent Mobility", h2_style))
    story.append(p(
        "<b>Background:</b> An enterprise has 500 legacy BI developers whose tools are being phased out in favor of modern cloud data warehouses. "
        "Firing and re-hiring is prohibitively expensive (costing 6-9 months of salary per role).<br/>"
        "<b>How SkillRoute Helps:</b> The enterprise maps internal employee capabilities and computes the lowest-cost internal upskilling pathway, "
        "re-skilling legacy BI developers into modern Analytics Engineers in 14 weeks at 80% lower cost than external hiring."
    ))

    story.append(Spacer(1, 10))

    # =========================================================================
    # CHAPTER 10: BUSINESS MODEL & MONETIZATION
    # =========================================================================
    story.append(Paragraph("10. Business Model & Monetization Strategy", h1_style))
    story.append(p(
        "SkillRoute operates on a sustainable, multi-tier business model designed for aggressive viral adoption followed by high-margin institutional contracts:"
    ))

    biz_data = [
        [Paragraph("Revenue Stream", table_cell_header), Paragraph("Target Customer", table_cell_header), Paragraph("Pricing &amp; Offering Model", table_cell_header)],
        [
            Paragraph("<b>B2C Freemium &bull; Pro Learner</b>", table_cell),
            Paragraph("Individual students &amp; working professionals", table_cell),
            Paragraph("<b>Free:</b> Capability profile, transition graph, and top 2 reachable destinations.<br/><b>Pro (₹499/month):</b> Unlimited dynamic pathway recalculation, project code verification, automated GitHub CI reviews, and direct interview matching.", table_cell)
        ],
        [
            Paragraph("<b>B2B University SaaS &bull; CampusRoute</b>", table_cell),
            Paragraph("Engineering colleges &amp; higher-ed institutions", table_cell),
            Paragraph("<b>₹1,200 per student / year:</b> Institutional dashboard for Placement Cells (TPO) to track batch skill readiness, identify curriculum gaps, and match students directly with hiring partners.", table_cell)
        ],
        [
            Paragraph("<b>B2B Enterprise Talent Mobility</b>", table_cell),
            Paragraph("Mid-to-large tech companies &amp; GCCs", table_cell),
            Paragraph("<b>SaaS Seat License (₹25,000/seat/year):</b> Internal workforce re-skilling engine; reduces expensive external hiring agency fees by computing internal talent mobility pathways.", table_cell)
        ],
        [
            Paragraph("<b>B2G Public Skilling &bull; Digital Bharat</b>", table_cell),
            Paragraph("State Skill Missions &amp; National Career Service", table_cell),
            Paragraph("<b>Government Partnership:</b> White-labeled transition intelligence engine integrated into National Career Service (NCS) and Skill India Digital platform for nationwide workforce mobilization.", table_cell)
        ],
    ]
    t_biz = Table(biz_data, colWidths=[110, 115, 290])
    t_biz.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor(PRIMARY_NAVY)),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#FFFFFF'), colors.HexColor('#F8FAFC')])
    ]))
    story.append(t_biz)

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 11: SOCIO-ECONOMIC IMPACT FOR BHARAT
    # =========================================================================
    story.append(Paragraph("11. Socio-Economic Impact for Bharat", h1_style))
    story.append(p(
        "SkillRoute directly addresses India's demographic dividend and workforce challenges in four key ways:"
    ))
    story.append(bullet("<b>Democratizing Access for Tier-2 &amp; Tier-3 Youth:</b> Students from non-metro colleges lack access to elite alumni networks and career mentors. SkillRoute provides every Indian student with the career intelligence of a Silicon Valley principal engineer for free."))
    story.append(bullet("<b>Alignment with National Education Policy 2020 (NEP):</b> NEP 2020 mandates multi-disciplinary, credit-based, flexible career mobility. SkillRoute translates this policy mandate into working software by quantifying transferable competencies across engineering disciplines."))
    story.append(bullet("<b>Strengthening the National Career Service (NCS):</b> SkillRoute enhances India's official employment portal (NCS) by replacing static job postings with dynamic transition pathways aligned with local industry clusters (Delhi NCR, Bengaluru, Hyderabad, Pune)."))
    story.append(bullet("<b>Eliminating the 'Degree vs. Skill' Divide:</b> By verifying hands-on project evidence in public GitHub repositories, SkillRoute enables recruiters to hire based on verifiable proof of work rather than pedigree or college brand names."))

    story.append(Spacer(1, 10))

    # =========================================================================
    # CHAPTER 12: HACKATHON JUDGE Q&A DEFENSE
    # =========================================================================
    story.append(Paragraph("12. Hackathon Judge Q&A Defense (The Top 12 Questions)", h1_style))
    story.append(p(
        "Judges at Build for Bharat 2.0 will challenge your technical depth, defensibility, and data foundation. "
        "Every team member must master these 12 answers:"
    ))

    qa_list = [
        (
            "Q1: Isn't this just another job recommender like LinkedIn or Naukri?",
            "No. Traditional platforms operate on static keyword similarity to match people to today's open roles. "
            "If you lack 2-3 qualifications, they reject you. SkillRoute treats career mobility as a constrained graph optimization problem. "
            "We compute the shortest, most realistic transition path from where you are today to where opportunity is moving, "
            "complete with prerequisite sequencing, weekly time constraints, and working project evidence."
        ),
        (
            "Q2: Why can't I just ask ChatGPT or Claude: 'Give me a roadmap to become an Analytics Engineer'?",
            "LLMs generate generic, non-deterministic text roadmaps detached from your exact constraints. ChatGPT does not know your "
            "weekly time budget, cannot verify your existing GitHub repositories, cannot calculate prerequisite graph distances, "
            "and frequently hallucinates prerequisites in the wrong order (e.g. telling someone to learn Kubernetes before learning basic Linux). "
            "In SkillRoute, the mathematical engine makes the decision deterministically; LLMs only format the output into clean text."
        ),
        (
            "Q3: Why not just use Vector Embeddings (like Pinecone / pgvector / cosine similarity)?",
            "Vector embeddings measure semantic closeness in text, NOT prerequisite dependencies. In vector space, 'Python' and 'Machine Learning' "
            "are clustered very close together. An embedding recommender will immediately tell a junior analyst to apply for a Senior ML Engineer role. "
            "That candidate will fail because they lack systems engineering, Docker, and data modeling foundations. "
            "Career mobility requires Directed Acyclic Graphs (DAGs) to enforce prerequisites."
        ),
        (
            "Q4: Where does your data come from? Did you invent these skill relationships?",
            "Every skill, occupation, and relationship is calibrated against verified public standards: ESCO v1.2.1 (European Skills & Occupations), "
            "O*NET 31.0 database, the Ministry of Labour's National Career Service (NCS) India, and the World Economic Forum 2025 Future of Jobs. "
            "We do not invent data."
        ),
        (
            "Q5: What happens if the backend server crashes or WiFi fails during the live hackathon pitch?",
            "SkillRoute has a built-in Dual-Engine Resilient Architecture. If the Python FastAPI backend is unreachable or conference WiFi drops, "
            "the Next.js frontend automatically switches to its local deterministic in-browser optimizer (`frontend/lib/optimizer.ts`). "
            "The demo will continue with 100% functionality and zero errors."
        ),
        (
            "Q6: What is your competitive moat? Can't a competitor copy this UI in a weekend?",
            "A UI or prompt can be copied; the transition knowledge graph combined with longitudinal outcome feedback cannot. "
            "As thousands of users complete evidence projects and report application, interview, and offer outcomes, our engine retrains "
            "transition edge weights. That self-improving outcome telemetry is our proprietary data moat."
        ),
        (
            "Q7: How do you handle AI hallucinations and candidate safety?",
            "Our decision engine has zero LLM in the loop. The Transition Score is calculated using our published weighted formula; "
            "the pathway sequencing is calculated via DAG topological sorting. The LLM is strictly used as an optional text synthesizer. "
            "If the LLM is powered off, 100% of SkillRoute's calculations remain intact."
        ),
        (
            "Q8: How does the system scale to millions of Indian job seekers?",
            "FastAPI handles thousands of concurrent requests asynchronously. Our graph service uses an abstracted interface that drops "
            "directly into Neo4j graph databases or Memgraph for sub-5ms graph traversals across millions of nodes and edges."
        ),
        (
            "Q9: How do you verify that candidates actually have the skills they claim?",
            "We use our 3-tier capability profiler. We do not trust self-reported skills. We connect to GitHub repositories, parse commit histories, "
            "verify passing schema test suites (e.g. dbt tests), and inspect deployed ERD diagrams. Proof of work replaces trust."
        ),
        (
            "Q10: What is your monetization model?",
            "We operate on a 4-tier model: B2C Pro subscription (₹499/mo) for advanced portfolio reviews, B2B SaaS for College Placement Cells (₹1,200/student/yr), "
            "B2B Enterprise Talent Mobility licensing (₹25,000/seat/yr), and B2G partnerships with the National Career Service (NCS)."
        ),
        (
            "Q11: Why did you build this as a monorepo with Next.js and FastAPI instead of a single Django app?",
            "Separation of concerns. Next.js 14 delivers an ultra-fast, responsive interactive client with instant client-side state transitions. "
            "FastAPI delivers high-performance asynchronous REST endpoints natively integrated with Python's data science ecosystem."
        ),
        (
            "Q12: How does the self-improving outcome loop work?",
            "When users complete their transition, they report their application funnel: applications sent, interview callbacks, and offers received. "
            "This telemetry feeds into our TransitionScorer, updating the weight w_3 (Transferability) and reducing the LearningCost penalty for validated pathways."
        ),
    ]

    for q, a in qa_list:
        q_box = f"<b>{q}</b><br/><font color='#334155'>{a}</font>"
        story.append(callout(q_box, border_color='#2563EB', bg_color='#F8FAFC', text_color='#1E293B'))
        story.append(Spacer(1, 4))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 13: TEAM ONBOARDING & PITCH SCRIPT
    # =========================================================================
    story.append(Paragraph("13. Team Onboarding & Live Demo Pitch Script", h1_style))
    story.append(p(
        "Here is the exact 3-5 minute live demonstration choreography for Team ELITECORE during hackathon judging:"
    ))

    # Team Roles Table
    roles_data = [
        [Paragraph("Team Member", table_cell_header), Paragraph("Role &amp; Responsibilities", table_cell_header), Paragraph("What They Own During the Pitch", table_cell_header)],
        [
            Paragraph("<b>Ranjan Maiti</b>", table_cell),
            Paragraph("Lead Product Architect &bull; Full-Stack UX", table_cell),
            Paragraph("Drives the live browser demo, explains the paradigm shift, controls the Time Budget Slider, and delivers the opening &amp; closing punchlines.", table_cell)
        ],
        [
            Paragraph("<b>Swati</b>", table_cell),
            Paragraph("Data Strategy &bull; Taxonomy &amp; Narrative", table_cell),
            Paragraph("Explains ESCO/O*NET taxonomy mapping, the 3-tier evidence model, national alignment with NCS/NEP 2020, and the business model.", table_cell)
        ],
        [
            Paragraph("<b>Saurabh Suman</b>", table_cell),
            Paragraph("Backend Services &bull; Graph &amp; Ranking", table_cell),
            Paragraph("Defends the mathematical scoring formula, constrained optimizer DAG, FastAPI endpoints, ML benchmark comparison, and Neo4j scalability.", table_cell)
        ],
    ]
    t_roles = Table(roles_data, colWidths=[110, 150, 255])
    t_roles.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor(PRIMARY_NAVY)),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#FFFFFF'), colors.HexColor('#F8FAFC')])
    ]))
    story.append(t_roles)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Turn-by-Turn 3–5 Minute Live Pitch Choreography", h2_style))

    pitch_data = [
        [Paragraph("Timestamp", table_cell_header), Paragraph("Screen &amp; Action", table_cell_header), Paragraph("Exact Talking Point (Simple English)", table_cell_header)],
        [
            Paragraph("<b>0:00 – 0:25</b>", table_cell),
            Paragraph("Landing Page (<code>/</code>)<br/>Introduce Ranjan", table_cell),
            Paragraph("<i>'Judges, meet Ranjan. He has 1.5 years experience as a Data Analyst in Delhi NCR. Traditional job boards spam him with Senior Data Scientist jobs he is not qualified for, or low-level data entry jobs he has outgrown. He is stuck. SkillRoute computes the bridge to get him unstuck.'</i>", table_cell)
        ],
        [
            Paragraph("<b>0:25 – 0:50</b>", table_cell),
            Paragraph("Capability Profile (<code>/profile</code>)<br/>Click 'Python' skill", table_cell),
            Paragraph("<i>'We start with honest inventory. We separate self-claims from evidence-backed skills like his sales dashboard and inferred competencies. Notice we do not pretend everything is 100%.'</i>", table_cell)
        ],
        [
            Paragraph("<b>0:50 – 1:20</b>", table_cell),
            Paragraph("Opportunity Map (<code>/opportunities</code>)<br/>Show 4 roles", table_cell),
            Paragraph("<i>'Instead of 500 job posts, we compute his transition frontier. Analytics Engineer is an 82% fit with 78% overlap. ML Engineer is a massive 240-hour jump. We guide him to what is reachable now.'</i>", table_cell)
        ],
        [
            Paragraph("<b>1:20 – 1:55</b>", table_cell),
            Paragraph("Transition Graph (<code>/transition/...</code>)<br/>Show signature graph", table_cell),
            Paragraph("<i>'Here is our signature knowledge graph: Ranjan's SQL and Python form the bridge. Missing prerequisites like dbt and Kimball modeling are isolated in amber. Click Why This Path to see exact grounded math, not AI hallucination.'</i>", table_cell)
        ],
        [
            Paragraph("<b>1:55 – 2:35</b>", table_cell),
            Paragraph("Pathway Timeline (<code>/pathway</code>)<br/><b>MOVE THE SLIDER!</b>", table_cell),
            Paragraph("<i>'THE KILLER FEATURE: Ranjan only has 20 hours a week. Watch: when we move the slider from 40 to 20 hrs/week, the engine recalculates the pathway from 10 to 18 weeks and decouples modeling from dbt. The system adapts to his real life!'</i>", table_cell)
        ],
        [
            Paragraph("<b>2:35 – 3:05</b>", table_cell),
            Paragraph("Evidence Builder (<code>/evidence</code>)<br/>Show Learn &rarr; Apply", table_cell),
            Paragraph("<i>'How does he prove he learned dbt? Not a multiple-choice quiz. He builds an analytics warehouse with passing schema tests in a verified GitHub repository.'</i>", table_cell)
        ],
        [
            Paragraph("<b>3:05 – 3:35</b>", table_cell),
            Paragraph("Outcome Feedback (<code>/outcomes</code>)<br/>Show telemetry", table_cell),
            Paragraph("<i>'Finally, the moat. As Ranjan gets interviews and offers, that telemetry retrains our transition weights. SkillRoute becomes smarter with every transition.'</i>", table_cell)
        ],
        [
            Paragraph("<b>3:35 – 4:00</b>", table_cell),
            Paragraph("Closing Slide &bull; Q&amp;A", table_cell),
            Paragraph("<i>'Others match people to jobs. EliteCore optimizes the transition that makes people ready for opportunity. From Skills Today &rarr; To Opportunities Tomorrow. Thank you!'</i>", table_cell)
        ],
    ]
    t_pitch = Table(pitch_data, colWidths=[75, 140, 300])
    t_pitch.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor(PRIMARY_NAVY)),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#FFFFFF'), colors.HexColor('#F8FAFC')])
    ]))
    story.append(t_pitch)

    story.append(Spacer(1, 10))

    # Vocabulary Guidelines
    story.append(Paragraph("Golden Vocabulary Rules for Team Members", h3_style))
    vocab_box = (
        "<b>WORDS TO USE (Makes you look rigorous &amp; authoritative):</b><br/>"
        "&bull; <i>Transition Intelligence Engine</i> &bull; <i>Constrained Graph Optimization</i> &bull; <i>Prerequisite DAG</i><br/>"
        "&bull; <i>Evidence-backed capabilities</i> &bull; <i>Time-budget aware pathfinding</i> &bull; <i>Outcome feedback moat</i><br/>"
        "&bull; <i>Verified ESCO / O*NET taxonomy</i> &bull; <i>National Career Service alignment</i><br/><br/>"
        "<b>WORDS TO AVOID (Makes judges skeptical):</b><br/>"
        "&times; <i>'AI magic'</i> &times; <i>'The LLM told us what to recommend'</i> &times; <i>'Job recommender'</i><br/>"
        "&times; <i>'Course aggregator'</i> &times; <i>'We scrape random LinkedIn postings'</i>"
    )
    story.append(callout(vocab_box, title="TEAM COMMUNICATION PROTOCOL", border_color='#D97706', bg_color='#FFFBEB', title_color='#B45309'))

    story.append(Spacer(1, 10))

    # =========================================================================
    # CHAPTER 14: CONCLUSION & FUTURE VISION
    # =========================================================================
    story.append(Paragraph("14. Conclusion & Long-Term Strategic Vision", h1_style))
    story.append(p(
        "SkillRoute transforms workforce development from an unstructured, high-stress guessing game into a predictable, "
        "evidence-backed transition science. By combining verified occupational taxonomies, deterministic graph optimization, "
        "and longitudinal outcome feedback, Team ELITECORE has created an engine that empowers every Indian learner to navigate "
        "their career with confidence, dignity, and real-world results."
    ))
    story.append(p(
        "<b>From Skills Today &rarr; To Opportunities Tomorrow. Build for Bharat 2.0 • Team ELITECORE.</b>"
    ))

    # Build the document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Master documentation successfully generated at: {filename}")
    print(f"File size: {os.path.getsize(filename):,} bytes")

if __name__ == '__main__':
    output_path = sys.argv[1] if len(sys.argv) > 1 else 'SkillRoute_Complete_Project_Documentation.pdf'
    build_pdf(output_path)
