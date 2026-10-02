import { initialReports } from "../data/mockReports";
import { initialMatches } from "../data/mockMatches";
import { initialClaims } from "../data/mockClaims";
import { initialNotifications } from "../data/mockNotifications";
import { currentUser } from "../data/mockUsers";

const STORAGE_KEYS = {
  REPORTS: "campusloop_reports_v1",
  MATCHES: "campusloop_matches_v1",
  CLAIMS: "campusloop_claims_v1",
  NOTIFICATIONS: "campusloop_notifs_v1",
  USER: "campusloop_user_v1",
};

export const storageService = {
  getReports: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return data ? JSON.parse(data) : initialReports;
    } catch {
      return initialReports;
    }
  },

  saveReports: (reports) => {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (e) {
      console.error("Failed to save reports to localStorage", e);
    }
  },

  getMatches: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MATCHES);
      return data ? JSON.parse(data) : initialMatches;
    } catch {
      return initialMatches;
    }
  },

  saveMatches: (matches) => {
    try {
      localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
    } catch (e) {
      console.error("Failed to save matches", e);
    }
  },

  getClaims: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLAIMS);
      return data ? JSON.parse(data) : initialClaims;
    } catch {
      return initialClaims;
    }
  },

  saveClaims: (claims) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(claims));
    } catch (e) {
      console.error("Failed to save claims", e);
    }
  },

  getNotifications: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  },

  saveNotifications: (notifs) => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    } catch (e) {
      console.error("Failed to save notifications", e);
    }
  },

  getUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : currentUser;
    } catch {
      return currentUser;
    }
  },

  saveUser: (user) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.error("Failed to save user", e);
    }
  },

  resetAllData: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.REPORTS);
      localStorage.removeItem(STORAGE_KEYS.MATCHES);
      localStorage.removeItem(STORAGE_KEYS.CLAIMS);
      localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (e) {
      console.error("Failed to reset storage", e);
    }
  },
};
