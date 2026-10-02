import { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

export function useClaims() {
  const { claims, submitClaim, updateClaimStatus } = useApp();
  const { user, isAdmin } = useAuth();

  const userClaims = useMemo(() => {
    if (isAdmin) return claims;
    return claims.filter((c) => c.claimantId === user.id || c.finderId === user.id);
  }, [claims, user.id, isAdmin]);

  const activeClaimsCount = useMemo(() => {
    return userClaims.filter((c) => c.status === "PENDING" || c.status === "UNDER_REVIEW").length;
  }, [userClaims]);

  return {
    claims: userClaims,
    allClaims: claims,
    activeClaimsCount,
    submitClaim,
    updateClaimStatus,
  };
}
