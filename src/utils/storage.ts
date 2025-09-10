import { Tab } from "@/interfaces/interfaces";

const TABS_STORAGE_KEY = "tabs-order";

export const saveTabsToStorage = (tabs: Tab[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(tabs));
  }
};

export const getTabsFromStorage = (): Tab[] | null => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(TABS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};
