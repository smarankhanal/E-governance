import { useSyncExternalStore } from "react";
import { INITIAL_APPLICATIONS } from "../applicationData";
const SEED_STATUSES = [
  "Pending",
  "Approved",
  "Pending",
  "Rejected",
  "Approved",
  "Pending",
];

let state = INITIAL_APPLICATIONS.map((a, i) => ({
  ...a,
  id: i + 1,
  status: SEED_STATUSES[i % SEED_STATUSES.length],
  submittedAt: "2026-10-01",
}));

const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => state;

export const updateApplication = (data) => {
  state = state.map((a) => (a.id === data.id ? data : a));
  emit();
};

export const removeApplication = (id) => {
  state = state.filter((a) => a.id !== id);
  emit();
};

export const useApplications = () =>
  useSyncExternalStore(subscribe, getSnapshot);
