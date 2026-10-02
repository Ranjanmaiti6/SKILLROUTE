export function calculateReportMatch(reportA, reportB) {
  // Only match opposite types: one LOST and one FOUND
  if (reportA.type === reportB.type) return null;

  let score = 0;
  const reasons = [];

  // 1. Category match
  if (reportA.category && reportB.category && reportA.category === reportB.category) {
    score += 35;
    reasons.push({ label: "Same category", detail: reportA.category, match: true });
  }

  // 2. Location match
  if (reportA.location && reportB.location && reportA.location === reportB.location) {
    score += 25;
    reasons.push({ label: "Same campus location", detail: reportA.location, match: true });
  } else if (
    reportA.specificPlace &&
    reportB.specificPlace &&
    (reportA.specificPlace.toLowerCase().includes(reportB.location.toLowerCase()) ||
     reportB.specificPlace.toLowerCase().includes(reportA.location.toLowerCase()))
  ) {
    score += 15;
    reasons.push({ label: "Nearby campus area", detail: "Proximity match", match: true });
  }

  // 3. Brand or Color match
  const brandMatch = reportA.brand && reportB.brand &&
    (reportA.brand.toLowerCase().includes(reportB.brand.toLowerCase()) ||
     reportB.brand.toLowerCase().includes(reportA.brand.toLowerCase()));
  if (brandMatch) {
    score += 20;
    reasons.push({ label: "Matching brand", detail: reportA.brand, match: true });
  }

  const colorMatch = reportA.color && reportB.color &&
    (reportA.color.toLowerCase().includes(reportB.color.toLowerCase()) ||
     reportB.color.toLowerCase().includes(reportA.color.toLowerCase()));
  if (colorMatch) {
    score += 10;
    reasons.push({ label: "Similar color", detail: reportA.color, match: true });
  }

  // 4. Keyword text overlap in title / description
  const wordsA = (reportA.title + " " + reportA.description)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !["with", "this", "that", "near", "have", "from", "left", "found", "lost"].includes(w));

  const wordsB = (reportB.title + " " + reportB.description)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3);

  const commonWords = wordsA.filter((w) => wordsB.includes(w));
  if (commonWords.length > 0) {
    const bonus = Math.min(commonWords.length * 5, 20);
    score += bonus;
    reasons.push({
      label: "Similar description keywords",
      detail: `Matched "${commonWords.slice(0, 3).join(", ")}"`,
      match: true,
    });
  }

  // Date proximity (within 3 days)
  if (reportA.date && reportB.date) {
    const diffTime = Math.abs(new Date(reportA.date) - new Date(reportB.date));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 3) {
      score += 10;
      reasons.push({ label: "Close date reported", detail: `${diffDays === 0 ? "Same day" : `${diffDays} days apart`}`, match: true });
    }
  }

  // Cap score at 96 unless identical
  const finalScore = Math.min(Math.max(score, 40), 96);

  return {
    score: finalScore,
    confidence: finalScore > 75 ? "High" : finalScore > 55 ? "Medium" : "Low",
    reasons,
  };
}
