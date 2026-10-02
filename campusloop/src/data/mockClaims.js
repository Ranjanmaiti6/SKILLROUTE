export const initialClaims = [
  {
    id: "clm-201",
    reportId: "rep-103", // Blue College Backpack
    reportTitle: "Blue College Backpack",
    reportType: "FOUND",
    reportImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    reportLocation: "Canteen & Food Court",
    claimantId: "usr_ranjan",
    claimantName: "Ranjan Maiti",
    claimantContact: "ranjan.m@campus.edu",
    finderId: "usr_aarav",
    finderName: "Aarav Sharma",
    step: 2, // 1: Claim submitted, 2: Verify under review, 3: Confirmed / Handover ready
    status: "UNDER_REVIEW", // PENDING, UNDER_REVIEW, APPROVED, REJECTED, HANDED_OVER
    verificationQuestion: "What textbook or specific subject notebook is inside the main compartment?",
    claimantAnswer: "Blue spiral register with my name on the cover and Thermodynamics 3rd sem notes.",
    submissionDate: "2026-10-01T15:30:00.000Z",
    notes: "Claim under review by finder Aarav Sharma and Canteen Manager counter.",
    handoverLocation: "Canteen Manager Office counter",
  },
  {
    id: "clm-202",
    reportId: "rep-113", // Reading glasses
    reportTitle: "Transparent Frame Reading Glasses in Black Case",
    reportType: "FOUND",
    reportImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    reportLocation: "Seminar Hall A",
    claimantId: "usr_rahul",
    claimantName: "Rahul Sen (CSE 2nd Year)",
    finderId: "usr_ranjan",
    finderName: "Ranjan Maiti",
    step: 3,
    status: "APPROVED",
    verificationQuestion: "What color is the cleaning cloth inside the case?",
    claimantAnswer: "Sky blue microfiber cloth with Lenskart logo.",
    submissionDate: "2026-09-30T16:00:00.000Z",
    notes: "Verified and returned in person outside Seminar Hall on 30 Sept.",
    handoverLocation: "In person",
  },
];
