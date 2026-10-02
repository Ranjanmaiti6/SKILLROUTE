import React from "react";

export function Badge({ type, children, className = "" }) {
  let badgeClass = "badge";

  switch (type) {
    case "LOST":
      badgeClass += " badge-lost";
      break;
    case "FOUND":
      badgeClass += " badge-found";
      break;
    case "RESOLVED":
      badgeClass += " badge-resolved";
      break;
    case "WARNING":
      badgeClass += " badge-warning";
      break;
    case "CATEGORY":
      badgeClass += " badge-category";
      break;
    default:
      badgeClass += " badge-category";
  }

  return <span className={`${badgeClass} ${className}`}>{children || type}</span>;
}
