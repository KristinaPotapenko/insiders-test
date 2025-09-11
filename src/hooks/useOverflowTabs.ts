"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Tab } from "@/interfaces/interfaces";

export interface UseOverflowTabsParams {
  tabs: Tab[];
  containerWidth?: number;
  chevronWidth?: number;
}

export interface UseOverflowTabsResult {
  visibleTabs: Tab[];
  overflowTabs: Tab[];
  navRef: React.RefObject<HTMLDivElement | null>;
  setTabRef: (id: number, el: HTMLDivElement | null) => void;
}

export function useOverflowTabs({
  tabs,
  containerWidth,
  chevronWidth = 24,
}: UseOverflowTabsParams): UseOverflowTabsResult {
  const [visibleTabs, setVisibleTabs] = useState<Tab[]>(tabs);
  const [overflowTabs, setOverflowTabs] = useState<Tab[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const setTabRef = useCallback(
    (tabId: number, element: HTMLDivElement | null) => {
      if (element) {
        tabRefs.current.set(tabId, element);
      } else {
        tabRefs.current.delete(tabId);
      }
    },
    []
  );

  const calculateTabs = useCallback(() => {
    if (!navRef.current) return;

    const navWidth = containerWidth || navRef.current.offsetWidth;

    console.log(tabRefs);

    let totalWidth = 0;
    const visible: Tab[] = [];
    const overflow: Tab[] = [];

    tabs.forEach((tab) => {
      const tabElement = tabRefs.current.get(tab.id);

      const tabWidth = tabElement?.offsetWidth || 120;
      const availableWidth =
        navWidth - (overflow.length > 0 ? chevronWidth : 0);

      if (totalWidth + tabWidth <= availableWidth) {
        visible.push(tab);
        totalWidth += tabWidth;
      } else {
        overflow.push(tab);
      }
    });

    setVisibleTabs(visible);
    setOverflowTabs(overflow);
  }, [tabs, containerWidth, chevronWidth]);

  useEffect(() => {
    calculateTabs();
    window.addEventListener("resize", calculateTabs);
    return () => window.removeEventListener("resize", calculateTabs);
  }, [calculateTabs]);

  return { visibleTabs, overflowTabs, navRef, setTabRef };
}
