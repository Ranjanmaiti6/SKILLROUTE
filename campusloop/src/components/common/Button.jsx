import React from "react";

export function Button({
  children,
  variant = "primary", // primary, secondary, outline, danger
  size = "md", // sm, md, lg
  icon: Icon,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon size={size === "sm" ? 14 : 16} />}
      {children}
    </button>
  );
}
