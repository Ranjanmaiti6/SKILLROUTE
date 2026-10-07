#!/usr/bin/env python3
"""
SkillRoute Executive 4-Page Master Documentation Generator
Creates an ultra-dense, beautifully styled 4-page PDF defense manual.
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
        self.saveState()
        self.setFont('Helvetica-Bold', 7.5)
        self.setFillColor(colors.HexColor('#0F172A'))

        # Running header
        self.drawString(36, 810, 'SKILLROUTE • Skill-to-Opportunity Transition Intelligence Engine')
        self.setFont('Helvetica', 7.5)
        self.setFillColor(colors.HexColor('#64748B'))
        self.drawRightString(559, 810, 'Build For Bharat 2.0 | Team ELITECORE')
        self.setStrokeColor(colors.HexColor('#CBD5E1'))
        self.setLineWidth(0.5)
        self.line(36, 804, 559, 804)

        # Running footer
        page_str = f'Page {self._pageNumber} of {page_count}'
        self.drawRightString(559, 24, page_str)
        self.drawString(36, 24, 'SkillRoute Executive Defense Manual • Confidential & Proprietary • Build For Bharat 2.0')
        self.setStrokeColor(colors.HexColor('#CBD5E1'))
        self.setLineWidth(0.5)
        self.line(36, 33, 559, 33)

        self.restoreState()

def build_pdf(filename="SkillRoute_Executive_Project_Documentation.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=42,
        bottomMargin=42
    )

    styles = getSampleStyleSheet()

    # Color Tokens
    PRIMARY_NAVY = colors.HexColor('#0F172A')
    BRAND_BLUE = colors.HexColor('#1E40AF')
    ACCENT_AMBER = colors.HexColor('#D97706')
    SUCCESS_EMERALD = colors.HexColor('#059669')
    CARD_BG = colors.HexColor('#F8FAFC')
    CARD_BORDER = colors.HexColor('#E2E8F0')
    TEXT_DARK = colors.HexColor('#0F172A')
    TEXT_MUTED = colors.HexColor('#475569')

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=18,
        textColor=PRIMARY_NAVY
    )

    subtitle_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=ACCENT_AMBER
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=PRIMARY_NAVY,
        spaceBefore=4,
        spaceAfter=3
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=BRAND_BLUE,
        spaceBefore=3,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.2,
        leading=9.5,
        textColor=TEXT_DARK,
        alignment=TA_JUSTIFY
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.2,
        leading=9.6,
        textColor=PRIMARY_NAVY
    )

    badge_style = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.8,
        leading=8.5,
        textColor=colors.white,
        alignment=TA_CENTER
    )

    tbl_header = ParagraphStyle(
        'TblHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=8.5,
        textColor=PRIMARY_NAVY
    )

    tbl_cell = ParagraphStyle(
        'TblCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=6.5,
        leading=8.2,
        textColor=TEXT_DARK
    )

    qa_q = ParagraphStyle(
        'QA_Q',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.2,
        leading=9.2,
        textColor=BRAND_BLUE
    )

    qa_a = ParagraphStyle(
        'QA_A',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=6.8,
        leading=8.8,
        textColor=TEXT_DARK,
        alignment=TA_JUSTIFY
    )

    story = []

    # =========================================================================
    # PAGE 1: EXECUTIVE SUMMARY, THE PROBLEM & THE PARADIGM SHIFT
    # =========================================================================

    # Title Banner Block
    banner_data = [
        [
            Paragraph("<b>SKILLROUTE: Skill-to-Opportunity Transition Intelligence Engine</b>", title_style),
            Paragraph("<b>BUILD FOR BHARAT 2.0</b><br/><font color='#64748B'>Team ELITECORE</font>", ParagraphStyle('HRight', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=10, alignment=TA_RIGHT, textColor=PRIMARY_NAVY))
        ],
        [
            Paragraph("<b>Core Tagline:</b> <i>“Don't just tell people which jobs match their profile. Compute the most realistic transition from where they are today to where opportunity is moving.”</i>", subtitle_style),
            Paragraph("<b>Lead Architect:</b> Ranjan Maiti<br/><b>Data & ML:</b> Swati • Saurabh Suman", ParagraphStyle('SubRight', parent=styles['Normal'], fontName='Helvetica', fontSize=7, leading=9, alignment=TA_RIGHT, textColor=TEXT_MUTED))
        ]
    ]
    banner_table = Table(banner_data, colWidths=[380, 143])
    banner_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY_NAVY, spaceBefore=1, spaceAfter=5))

    # Executive Summary in Plain English Callout
    exec_summary_text = Paragraph(
        "<b>What is SkillRoute in One Sentence?</b> SkillRoute is a turn-by-turn <b>GPS navigation system for careers</b>. Instead of rejecting candidates because they miss 1 or 2 skills, SkillRoute maps their existing verified skills, identifies realistic adjacent career destinations, calculates the exact missing prerequisite tree, and optimizes an evidence-backed learning roadmap tailored to their weekly study budget.",
        callout_style
    )
    exec_table = Table([[exec_summary_text]], colWidths=[523])
    exec_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#EFF6FF')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#BFDBFE')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(exec_table)
    story.append(Spacer(1, 5))

    # Section 1: The Core Problem
    story.append(Paragraph("1. The Core Problem: Why Traditional Talent Platforms Fail Bharat", h1_style))
    story.append(Paragraph(
        "Over <b>1.5 million engineers graduate in India every year</b> (AISHE). Yet, NASSCOM and industry studies report that <b>over 80% are deemed unemployable in modern tech roles</b>. This is NOT an intellect failure; it is a platform failure caused by the <b>Direct-Match Fallacy</b>.",
        body_style
    ))
    story.append(Spacer(1, 3))

    # 3 Traps Comparison Table
    traps_data = [
        [
            Paragraph("<b>Trap 1: The Direct-Match Fallacy</b>", h2_style),
            Paragraph("<b>Trap 2: The Course Graveyard</b>", h2_style),
            Paragraph("<b>Trap 3: Semantic Vocabulary Fog</b>", h2_style)
        ],
        [
            Paragraph("Job portals (LinkedIn, Naukri) do simple string matches ($Resume \\leftrightarrow Job$). An 80% match is treated as a <b>100% rejection</b>. Candidates are rejected with zero feedback on how to bridge the 20% gap.", body_style),
            Paragraph("EdTech platforms (Coursera, Udemy) sell 80-hour passive video courses with certificates that recruiters ignore because video watching does not prove practical competence.", body_style),
            Paragraph("Candidates describe skills in local terms ('Excel pivot tables'), while employers search for 'Dimensional Modeling'. Candidates don't realize their analytical base is 75% transferable!", body_style)
        ]
    ]
    traps_table = Table(traps_data, colWidths=[171, 171, 171])
    traps_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(traps_table)
    story.append(Spacer(1, 5))

    # The Google Maps Analogy
    story.append(Paragraph("The Google Maps Analogy (The Helicopter Fallacy):", h2_style))
    story.append(Paragraph(
        "Imagine opening Google Maps in Delhi and searching for Mumbai. Traditional platforms act like a broken map saying: <i>“You are not in Mumbai. Access denied.”</i> Or they offer a luxury helicopter ride you cannot afford. What you need is <b>turn-by-turn navigation</b>: <i>“Take NH 48, turn left in 12 km, refuel in Jaipur, arrive in 22 hours.”</i> <b>SkillRoute is that turn-by-turn GPS for your career.</b>",
        body_style
    ))
    story.append(Spacer(1, 5))

    # Section 2: The Paradigm Shift
    story.append(Paragraph("2. How SkillRoute Solves It: The Paradigm Shift", h1_style))
    story.append(Paragraph(
        "SkillRoute replaces static resume matching with a <b>graph-based transition engine</b> grounded in international occupational taxonomies (<b>ESCO 1.2.1, O*NET 31.0, and NCS India</b>):",
        body_style
    ))
    story.append(Spacer(1, 3))

    flow_data = [
        [
            Paragraph("<b>Current Capability</b><br/>Explicit • Evidence • Inferred", ParagraphStyle('F1', parent=badge_style, textColor=PRIMARY_NAVY)),
            Paragraph("<b>→</b>", ParagraphStyle('Arrow', parent=styles['Normal'], alignment=TA_CENTER, fontName='Helvetica-Bold', fontSize=10, textColor=BRAND_BLUE)),
            Paragraph("<b>Transferable Bridge</b><br/>Recognize 70-80% existing base", ParagraphStyle('F2', parent=badge_style, textColor=PRIMARY_NAVY)),
            Paragraph("<b>→</b>", ParagraphStyle('Arrow', parent=styles['Normal'], alignment=TA_CENTER, fontName='Helvetica-Bold', fontSize=10, textColor=BRAND_BLUE)),
            Paragraph("<b>Transition Graph</b><br/>Rank reachable opportunities", ParagraphStyle('F3', parent=badge_style, textColor=PRIMARY_NAVY)),
            Paragraph("<b>→</b>", ParagraphStyle('Arrow', parent=styles['Normal'], alignment=TA_CENTER, fontName='Helvetica-Bold', fontSize=10, textColor=BRAND_BLUE)),
            Paragraph("<b>Pathway Optimizer</b><br/>Time-budget sequencing", ParagraphStyle('F4', parent=badge_style, textColor=PRIMARY_NAVY)),
            Paragraph("<b>→</b>", ParagraphStyle('Arrow', parent=styles['Normal'], alignment=TA_CENTER, fontName='Helvetica-Bold', fontSize=10, textColor=BRAND_BLUE)),
            Paragraph("<b>Evidence & Offer</b><br/>GitHub repos & offer feedback", ParagraphStyle('F5', parent=badge_style, textColor=PRIMARY_NAVY)),
        ]
    ]
    flow_table = Table(flow_data, colWidths=[96, 12, 106, 12, 102, 12, 94, 12, 77])
    flow_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), colors.HexColor('#FEF3C7')),
        ('BACKGROUND', (2,0), (2,0), colors.HexColor('#E0F2FE')),
        ('BACKGROUND', (4,0), (4,0), colors.HexColor('#DCFCE7')),
        ('BACKGROUND', (6,0), (6,0), colors.HexColor('#F3E8FF')),
        ('BACKGROUND', (8,0), (8,0), colors.HexColor('#FCE7F3')),
        ('BOX', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 2),
        ('RIGHTPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(flow_table)
    story.append(Spacer(1, 5))

    # Benchmark Persona Example
    story.append(Paragraph("<b>Concrete Benchmark Example: Ranjan Maiti (Build For Bharat 2.0 Lead Persona)</b>", h2_style))
    story.append(Paragraph(
        "• <b>Current State:</b> Data Analyst with 1.5 yrs experience in Delhi NCR. Strong in SQL & Python, but rejected by senior recruiters.<br/>"
        "• <b>Traditional Portal:</b> <i>“Match: 45%. Missing: dbt, Snowflake, Kimball Modeling. Application Rejected.”</i> (Zero guidance).<br/>"
        "• <b>SkillRoute Result:</b> Identifies <b>Analytics Engineer</b> as 82% fit. Isolates SQL/Python as transferable bridge. Identifies Kimball Modeling & dbt as missing prerequisites. Re-sequences learning into 10 weeks (at 20 hrs/week) and assigns 4 verified GitHub project deliverables.",
        body_style
    ))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: USER JOURNEY & DETAILED PRODUCT FEATURES
    # =========================================================================

    story.append(Paragraph("3. Step-by-Step User Journey & Core Features", h1_style))
    story.append(Paragraph(
        "SkillRoute provides an end-to-end interactive decision suite. Each page route is dedicated to one step of the career transition journey:",
        body_style
    ))
    story.append(Spacer(1, 3))

    features_table_data = [
        [
            Paragraph("<b>Page & Route</b>", tbl_header),
            Paragraph("<b>User Action</b>", tbl_header),
            Paragraph("<b>Underlying Computational Intelligence</b>", tbl_header),
            Paragraph("<b>Concrete Deliverable</b>", tbl_header)
        ],
        [
            Paragraph("<b>1. Executive Dashboard</b><br/><code>/dashboard</code>", tbl_cell),
            Paragraph("Logs in via Google or 1-click persona. Reviews transition readiness.", tbl_cell),
            Paragraph("Aggregates profile capability scores, market demand index, and active transition velocity into a single decision radar.", tbl_cell),
            Paragraph("High-level transition summary, verified skill count, active target role status.", tbl_cell)
        ],
        [
            Paragraph("<b>2. Capability Profile</b><br/><code>/profile</code>", tbl_cell),
            Paragraph("Inspects 3 tiers of skills; clicks Python to view evidence.", tbl_cell),
            Paragraph("Categorizes capabilities into <b>Explicit</b> (stated), <b>Evidence-Backed</b> (GitHub/tests), and <b>Inferred</b> (derived from adjacent graph nodes).", tbl_cell),
            Paragraph("Interactive skill badge panel with confidence metrics and transferable roles.", tbl_cell)
        ],
        [
            Paragraph("<b>3. Opportunity Map</b><br/><code>/opportunities</code>", tbl_cell),
            Paragraph("Reviews 4 reachable destinations; selects target role.", tbl_cell),
            Paragraph("Computes multi-factor Transition Fit scores: Analytics Engineer (82% fit), Data Product Analyst (81%), Data Scientist (68%), ML Engineer (51%).", tbl_cell),
            Paragraph("Comparative opportunity cards ranked by effort, market demand, and transition fit.", tbl_cell)
        ],
        [
            Paragraph("<b>4. Transition Graph</b><br/><code>/transition/[role]</code>", tbl_cell),
            Paragraph("Explores interactive node-link network visualization.", tbl_cell),
            Paragraph("Visualizes candidate nodes $\\rightarrow$ transferable skill bridge (SQL, Python) $\\rightarrow$ missing prerequisite tree (Kimball, dbt) $\\rightarrow$ target occupation.", tbl_cell),
            Paragraph("Node-link graph + <b>“Why This Path?”</b> modal with grounded mathematical metrics.", tbl_cell)
        ],
        [
            Paragraph("<b>5. Pathway Simulator</b><br/><code>/pathway</code><br/><b>(KILLER FEATURE)</b>", tbl_cell),
            Paragraph("<b>Adjusts time budget slider</b> from 40 hrs/wk to 20 hrs/wk in real-time.", tbl_cell),
            Paragraph("<b>Dynamic Constraint-Aware Optimizer:</b> Immediately re-sequences learning milestones; expands timeline from 10 to 18 weeks; decouples modeling from dbt.", tbl_cell),
            Paragraph("Dynamic multi-week roadmap that guarantees zero cognitive overload and respects time.", tbl_cell)
        ],
        [
            Paragraph("<b>6. Evidence Builder</b><br/><code>/evidence</code>", tbl_cell),
            Paragraph("Works through <b>Learn → Build → Prove → Apply</b> milestones.", tbl_cell),
            Paragraph("Replaces course certificates with verified artifacts: GitHub commit histories, automated dbt schema tests, and Snowflake partition benchmarks.", tbl_cell),
            Paragraph("4 interactive milestone cards with verified evidence links, code repos, and tests.", tbl_cell)
        ],
        [
            Paragraph("<b>7. Outcome Feedback</b><br/><code>/outcomes</code>", tbl_cell),
            Paragraph("Reports interview callbacks and offer letters received.", tbl_cell),
            Paragraph("<b>Reinforcement Telemetry Loop:</b> Logs application-to-offer funnel (8 apps $\\rightarrow$ 3 callbacks $\\rightarrow$ 1 offer); updates graph edge weights.", tbl_cell),
            Paragraph("Self-improving graph dataset that strengthens recommendations for future candidates.", tbl_cell)
        ]
    ]

    feat_table = Table(features_table_data, colWidths=[90, 115, 200, 118])
    feat_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
        ('BOX', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(feat_table)
    story.append(Spacer(1, 5))

    # Section 4: System Architecture & Tech Stack
    story.append(Paragraph("4. System Architecture: Dual-Engine Full-Stack Engineering", h1_style))
    story.append(Paragraph(
        "SkillRoute is built with a high-performance, production-ready decoupled architecture with guaranteed offline resilience:",
        body_style
    ))
    story.append(Spacer(1, 3))

    arch_data = [
        [
            Paragraph("<b>Frontend (Next.js 14 App Router)</b>", h2_style),
            Paragraph("<b>Backend (FastAPI & Graph Core)</b>", h2_style),
            Paragraph("<b>Offline Uptime Moat (Dual Engine)</b>", h2_style)
        ],
        [
            Paragraph("• React 18, TypeScript, Tailwind CSS, Lucide.<br/>• Client-side state machine with instant reactivity.<br/>• Google OAuth 2.0 & fallback local authentication.<br/>• Interactive node-link SVG transition visualizer.", body_style),
            Paragraph("• Python 3.10+ asynchronous REST microservice.<br/>• Transition scoring & DAG topological sort optimizer.<br/>• In-memory taxonomy graph (ESCO 1.2.1 & O*NET 31.0).<br/>• Neo4j-ready service abstraction layer.", body_style),
            Paragraph("• <b>Dual-Engine Architecture:</b> If backend server or WiFi disconnects, frontend automatically switches to client-side TypeScript optimizer (<code>optimizer.ts</code>).<br/>• <b>100% Guaranteed Pitch Uptime.</b>", body_style)
        ]
    ]
    arch_table = Table(arch_data, colWidths=[171, 171, 171])
    arch_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(arch_table)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: MATHEMATICAL MODEL, OPTIMIZER & EVIDENCE FRAMEWORK
    # =========================================================================

    story.append(Paragraph("5. Mathematical Formulation & Decision Intelligence Core", h1_style))
    story.append(Paragraph(
        "Unlike black-box LLMs that hallucinate career advice, SkillRoute's recommendations are <b>grounded in deterministic graph mathematics and constrained optimization</b>.",
        body_style
    ))
    story.append(Spacer(1, 3))

    # Math Formulation Box
    math_text = Paragraph(
        "<b>A. Transition Scoring Model:</b> For candidate profile $c$ and target occupation $r$:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>TransitionScore</b>$(r) = w_1 \\cdot \\text{SkillFit} + w_2 \\cdot \\text{Demand} + w_3 \\cdot \\text{Transferability} + w_4 \\cdot \\text{Accessibility} - w_5 \\cdot \\text{LearningCost} - w_6 \\cdot \\text{ExperienceGap}$<br/>"
        "• <b>SkillFit $\\in [0, 1]$:</b> Direct overlap between candidate verified skills and ESCO essential requirements.<br/>"
        "• <b>Demand $\\in [0, 1]$:</b> Hiring indicators from National Career Service (NCS) India and WEF Future of Jobs 2025.<br/>"
        "• <b>Transferability $\\in [0, 1]$:</b> Cosine distance of graph skill vectors between current role and target role.<br/>"
        "• <b>Accessibility $\\in [0, 1]$:</b> Proximity of missing prerequisites to the candidate's current capability boundary.<br/>"
        "• <b>LearningCost $\\in [0, 1]$:</b> Cumulative study hours required to close the highest-priority skill gaps.<br/>"
        "• <b>ExperienceGap $\\in [0, 1]$:</b> Penalty factor for missing years of domain seniority.<br/><br/>"
        "<b>B. Constrained Pathway Optimization Formulation:</b> For candidate sequence of skills $P$:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>P*</b> $= \\arg\\max_P \\left[ \\frac{\\text{ExpectedOpportunityGain}(P)}{\\text{LearningCost}(P) + \\text{Risk}(P)} \\right] \\quad \\text{subject to:} \\quad \\text{TotalTime}(P) \\le \\text{WeeklyBudget} \\times N, \\quad \\text{Prerequisites Satisfied (DAG)}$",
        callout_style
    )
    math_table = Table([[math_text]], colWidths=[523])
    math_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(math_table)
    story.append(Spacer(1, 5))

    # Section 6: Evidence Framework
    story.append(Paragraph("6. The “Learn → Build → Prove → Apply” Evidence Framework", h1_style))
    story.append(Paragraph(
        "Certificates are dead in 2026. Hiring managers demand proof. SkillRoute turns every skill gap into a 4-stage empirical verification pipeline:",
        body_style
    ))
    story.append(Spacer(1, 3))

    evidence_data = [
        [
            Paragraph("<b>Stage 1: LEARN (Targeted Knowledge)</b>", h2_style),
            Paragraph("<b>Stage 2: BUILD (Production Artifact)</b>", h2_style)
        ],
        [
            Paragraph("No 40-hour bloated courses. Candidate completes 8 hours of focused documentation on Kimball dimensional modeling (fact vs dimension tables, star schema).", body_style),
            Paragraph("Candidate constructs a public GitHub repository with an eCommerce dimensional warehouse schema modeled in dbt with modular transformations.", body_style)
        ],
        [
            Paragraph("<b>Stage 3: PROVE (Automated Test Suite)</b>", h2_style),
            Paragraph("<b>Stage 4: APPLY (Recruiter-Ready Signal)</b>", h2_style)
        ],
        [
            Paragraph("Candidate executes automated dbt schema tests (unique, not_null, relationship integrity) and generates Snowflake partition benchmark reports.", body_style),
            Paragraph("SkillRoute creates a 1-page evidence dossier linking directly to code commits, verified test runs, and interactive ERD diagrams for hiring managers.", body_style)
        ]
    ]
    ev_table = Table(evidence_data, colWidths=[256, 256])
    ev_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(ev_table)
    story.append(Spacer(1, 5))

    # Section 7: Socio-Economic Impact for Bharat
    story.append(Paragraph("7. Socio-Economic Impact for Bharat", h1_style))
    story.append(Paragraph(
        "• <b>Tier-2 / Tier-3 College Democratization:</b> Gives every student from Indore, Patna, or Coimbatore the exact career intelligence that used to require a ₹50 Lakh private mentor.<br/>"
        "• <b>National Education Policy (NEP 2020) Alignment:</b> Directly fulfills NEP 2020 mandates for flexible, modular, credit-based skill pathways.<br/>"
        "• <b>National Career Service (NCS India) Modernization:</b> Upgrades static government job boards into dynamic transition navigators.<br/>"
        "• <b>Eliminating Fake Credentials:</b> Replaces fraudulent resume claims with verifiable code evidence, lowering screening costs for Indian enterprises.",
        body_style
    ))
    story.append(Spacer(1, 5))

    # Section 8: Business & Monetization Model
    story.append(Paragraph("8. Business & Monetization Model", h1_style))
    biz_data = [
        [
            Paragraph("<b>B2C Freemium (Learners)</b>", h2_style),
            Paragraph("<b>B2B Universities (Colleges)</b>", h2_style),
            Paragraph("<b>B2B Enterprise (Workforce Mobility)</b>", h2_style)
        ],
        [
            Paragraph("• Free: 1 Transition Path & Profile.<br/>• Pro (₹499/mo): Unlimited pathways, time budget simulator, automated GitHub evidence audit.", body_style),
            Paragraph("• ₹1,200/student/year.<br/>• Institutional placement dashboard; identifies curriculum skill gaps against live employer demand.", body_style),
            Paragraph("• ₹25,000/seat/year.<br/>• Internal workforce redeployment engine; retrains existing employees for emerging roles instead of expensive layoffs.", body_style)
        ]
    ]
    biz_table = Table(biz_data, colWidths=[171, 171, 171])
    biz_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(biz_table)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 4: HACKATHON JUDGE Q&A DEFENSE (TOP 12 WINNING ANSWERS)
    # =========================================================================

    story.append(Paragraph("9. Hackathon Judge Q&A Defense (Top 12 Questions & Winning Answers)", h1_style))
    story.append(Paragraph(
        "Judges at Build For Bharat 2.0 evaluate technical depth, defensibility, and originality. Below is Team ELITECORE's battle-tested defense manual:",
        body_style
    ))
    story.append(Spacer(1, 2))

    qas = [
        ("Q1: Isn't this just another job recommendation engine like LinkedIn or Naukri?",
         "<b>Winning Defense:</b> No. LinkedIn and Naukri do static candidate-to-job matching ($Candidate \\leftrightarrow Job$). When you miss 2 skills, they reject you with zero guidance. SkillRoute treats career mobility as a <b>constrained graph optimization problem</b>. We don't just show open jobs; we compute the shortest realistic path from where you are today to where opportunity is moving."),
        ("Q2: Why can't I just ask ChatGPT or Claude to give me a career roadmap?",
         "<b>Winning Defense:</b> LLMs generate generic, non-deterministic text roadmaps disconnected from real constraints. ChatGPT doesn't know your weekly study budget, cannot evaluate prerequisite Directed Acyclic Graphs (DAGs), hallucinates dependencies out of order, and cannot verify GitHub code. SkillRoute computes decisions mathematically; LLMs are only used for text formatting."),
        ("Q3: Why not use Vector Embeddings (Cosine Similarity / Pinecone)?",
         "<b>Winning Defense:</b> Vector embeddings measure semantic closeness, NOT prerequisite hierarchy. In vector space, 'Python' and 'Machine Learning' are close together, causing vector engines to falsely recommend senior ML Engineer roles to junior analysts who lack MLOps fundamentals. Transition science requires Directed Acyclic Graphs (DAGs)."),
        ("Q4: What is your competitive defensibility moat?",
         "<b>Winning Defense:</b> A UI can be copied; our <b>Transition Knowledge Graph + Longitudinal Outcome Feedback Loop</b> cannot. Every time a candidate completes evidence and reports application callbacks, our reinforcement feedback loop retrains transition edge weights. That data moat compounds over time."),
        ("Q5: How do you verify skills without trusting the user's self-declaration?",
         "<b>Winning Defense:</b> Our 3-Tier Capability Profiler separates claims into <i>Explicit</i>, <i>Inferred</i>, and <i>Evidence-Backed</i>. For evidence-backed skills, our engine inspects public GitHub repositories, commit histories, passing dbt schema tests, and Snowflake SQL execution plans. Proof of work replaces trust."),
        ("Q6: What if the backend crashes or WiFi fails during the live hackathon pitch?",
         "<b>Winning Defense:</b> We engineered a <b>Dual-Engine Resilient Architecture</b>. If the FastAPI backend drops, the Next.js frontend instantly falls back to an in-browser deterministic optimizer (<code>optimizer.ts</code>). Our live demo has 100% guaranteed presentation uptime."),
        ("Q7: Where does your taxonomy data come from? Did you make it up?",
         "<b>Winning Defense:</b> We use verified public standards: European Skills/Competences (ESCO v1.2.1), O*NET 31.0, National Career Service (NCS) India, and World Economic Forum (WEF) Future of Jobs 2025. Zero synthetic or invented data."),
        ("Q8: How does this scale to 10 million active job seekers?",
         "<b>Winning Defense:</b> FastAPI processes thousands of concurrent requests asynchronously with Pydantic v2 validation. Our knowledge graph service is written with an abstracted graph interface that connects directly to Neo4j, enabling sub-5ms traversals across millions of nodes."),
        ("Q9: What is the killer feature in your live demo?",
         "<b>Winning Defense:</b> The <b>Time Budget Simulator (<code>/pathway</code>)</b>. When you move the weekly slider from 40 to 20 hours/week, the engine visibly recalculates the pathway from 10 to 18 weeks and decouples dependent modules in real time to prevent cognitive burnout."),
        ("Q10: Why did you choose Next.js and FastAPI instead of a single Django framework?",
         "<b>Winning Defense:</b> Clean separation of concerns. Next.js 14 delivers instant, fluid reactive UI with zero layout shifts. FastAPI delivers blazing-fast asynchronous computation natively integrated with Python's data science and graph ecosystem."),
        ("Q11: How do you prevent AI hallucinations?",
         "<b>Winning Defense:</b> By removing generative AI from the core decision loop. Scoring, ranking, and pathway sequencing are computed purely with deterministic graph algorithms. The system never guesses or hallucinates a transition step."),
        ("Q12: How does this align with the Build For Bharat 2.0 hackathon vision?",
         "<b>Winning Defense:</b> Build For Bharat demands scalable, high-impact workforce infrastructure. SkillRoute democratizes elite career intelligence for millions of tier-2/3 youth, bridging the employability gap with dignity and verified proof.")
    ]

    qa_table_data = []
    for q, a in qas:
        qa_table_data.append([
            Paragraph(f"<b>{q}</b>", qa_q),
            Paragraph(a, qa_a)
        ])

    qa_table = Table(qa_table_data, colWidths=[180, 335])
    qa_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(qa_table)
    story.append(Spacer(1, 3))

    # Team & Closing Box
    team_data = [
        [
            Paragraph("<b>Team ELITECORE:</b> Ranjan Maiti (Lead Architect) • Swati (Data & Taxonomy) • Saurabh Suman (Backend & Graph)", ParagraphStyle('T1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7, textColor=PRIMARY_NAVY)),
            Paragraph("<b>Status:</b> Production Ready • Build For Bharat 2.0", ParagraphStyle('T2', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7, alignment=TA_RIGHT, textColor=SUCCESS_EMERALD))
        ]
    ]
    team_table = Table(team_data, colWidths=[360, 155])
    team_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F1F5F9')),
        ('BOX', (0,0), (-1,-1), 0.5, CARD_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(team_table)

    # Build the document with custom numbered canvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {filename}")

if __name__ == "__main__":
    out_pdf = "SkillRoute_Executive_Project_Documentation.pdf"
    if len(sys.argv) > 1:
        out_pdf = sys.argv[1]
    build_pdf(out_pdf)
