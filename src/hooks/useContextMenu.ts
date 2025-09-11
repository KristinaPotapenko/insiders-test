import React, { useState } from "react";

import { Tab } from "@/interfaces/interfaces";

export const useContextMenu = (
  setTabs: React.Dispatch<React.SetStateAction<Tab[]>>
) => {
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    tabId: number | null;
  }>({ visible: false, x: 0, y: 0, tabId: null });

  const handleMouseEnter = (e: React.MouseEvent, tabId: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setContextMenu({
      visible: true,
      x: rect.left + 20,
      y: rect.bottom - 10,
      tabId,
    });
  };

  const handlePinToggle = () => {
    if (contextMenu.tabId === null) return;

    setTabs((prev) => {
      const idx = prev.findIndex((t) => t.id === contextMenu.tabId);
      const tab = prev[idx];
      const updated = prev.filter((t) => t.id !== tab.id);

      if (tab.pinned) {
        updated.push({ ...tab, pinned: false });
      } else {
        const lastPinnedIndex = updated.map((t) => t.pinned).lastIndexOf(true);
        updated.splice(lastPinnedIndex + 1, 0, { ...tab, pinned: true });
      }
      return updated;
    });

    setContextMenu({ visible: false, x: 0, y: 0, tabId: null });
  };

  return { contextMenu, setContextMenu, handleMouseEnter, handlePinToggle };
};
