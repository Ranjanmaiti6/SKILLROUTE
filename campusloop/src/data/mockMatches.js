export const initialMatches = [
  {
    id: "match-01",
    score: 92,
    confidence: "High",
    userReportId: "rep-101", // Ranjan's Lost Casio Calculator
    matchedReportId: "rep-102", // Priya's Found Casio Calculator
    reasons: [
      { label: "Same category", detail: "Electronics & Gadgets", match: true },
      { label: "Same campus location", detail: "Academic Block (Room 204)", match: true },
      { label: "Matching brand & model", detail: "Casio Scientific Calculator", match: true },
      { label: "Same date & close timeframe", detail: "Reported within 2 hours on 1 Oct", match: true },
      { label: "Matching color", detail: "Black / Dark Gray", match: true },
    ],
    summaryNote: "Found in Room 204 right where you reported losing your calculator earlier today.",
    status: "UNREVIEWED", // UNREVIEWED, CLAIM_REQUESTED, DISMISSED
  },
  {
    id: "match-02",
    score: 88,
    confidence: "High",
    userReportId: "rep-105", // Ranjan's Lost JBL Earphones
    matchedReportId: "rep-106", // Rohit's Found JBL Earbuds Case
    reasons: [
      { label: "Same category", detail: "Electronics & Gadgets", match: true },
      { label: "Same campus venue", detail: "Auditorium & Seminar Halls", match: true },
      { label: "Matching brand", detail: "JBL Wireless Earbuds", match: true },
      { label: "Same evening timeframe", detail: "Evening of 30 Sept after cultural rehearsal", match: true },
      { label: "Matching color", detail: "Matte Black", match: true },
    ],
    summaryNote: "Found on auditorium stage steps shortly after you lost yours in Row J.",
    status: "UNREVIEWED",
  },
];
