"use client";

import { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { usePathname } from "next/navigation";

import { useOverflowTabs } from "@/hooks/useOverflowTabs";
import { getHref } from "@/utils/getHref";
import { getTabsFromStorage, saveTabsToStorage } from "@/utils/storage";

import TabItem from "../TabItem/TabItem";
import { TabsDropdown } from "../TabsDropdown/TabsDropdown";

import { ChevronDown } from "lucide-react";

import { Tab } from "@/interfaces/interfaces";
import { getIcon } from "@/utils/getIcon";

export default function TabsContainer() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TabsContainerInner />
    </DndProvider>
  );
}

interface DraggedTab {
  id: number;
  index: number;
}

interface DraggableTabProps {
  tab: Tab;
  index: number;
  activeTab: number;
  onTabClick: (id: number) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  moveTab: (fromIndex: number, toIndex: number) => void;
}

const DraggableTab = ({
  tab,
  index,
  activeTab,
  onTabClick,
  onMouseEnter,
  moveTab,
}: DraggableTabProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "tab",
    item: { id: tab.id, index } as DraggedTab,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "tab",
    hover: (draggedItem: DraggedTab) => {
      if (draggedItem.id !== tab.id) {
        moveTab(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      drag(ref);
      drop(ref);
    }
  }, [drag, drop]);

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="flex items-center flex-shrink-0 h-full"
    >
      <TabItem
        tab={tab}
        activeTab={activeTab}
        onClick={() => onTabClick(tab.id)}
        onMouseEnter={onMouseEnter}
      />
    </div>
  );
};

function TabsContainerInner() {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const storedTabs = getTabsFromStorage();
    if (storedTabs) {
      return storedTabs;
    }

    return [
      { id: 1, name: "Lagerverwaltung", pinned: true },
      { id: 2, name: "Dashboard", pinned: false },
      { id: 3, name: "Banking", pinned: false },
      { id: 4, name: "Telefonie", pinned: false },
      { id: 5, name: "Accounting", pinned: false },
      { id: 6, name: "Verkauf", pinned: false },
      { id: 7, name: "Statistik", pinned: false },
      { id: 8, name: "Post Office", pinned: false },
      { id: 9, name: "Administration", pinned: false },
      { id: 10, name: "Help", pinned: false },
      { id: 11, name: "Warenbestand", pinned: false },
      { id: 12, name: "Auswahllisten", pinned: false },
      { id: 13, name: "Einkauf", pinned: false },
      { id: 14, name: "Rechn", pinned: false },
    ];
  });

  useEffect(() => {
    saveTabsToStorage(tabs);
  }, [tabs]);

  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState<number>(() => {
    const currentTab = tabs.find((tab) => getHref(tab.name) === pathname);
    return currentTab ? currentTab.id : 2;
  });

  const { visibleTabs, overflowTabs, navRef, setTabRef } = useOverflowTabs({
    tabs,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    tabId: number | null;
  }>({ visible: false, x: 0, y: 0, tabId: null });

  const moveTab = (fromIndex: number, toIndex: number) => {
    const visibleTabIds = visibleTabs.map((t) => t.id);
    const fromTab = tabs[fromIndex];
    const toTab = tabs[toIndex];

    if (
      !visibleTabIds.includes(fromTab.id) ||
      !visibleTabIds.includes(toTab.id)
    ) {
      return;
    }

    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      const [movedTab] = newTabs.splice(fromIndex, 1);
      newTabs.splice(toIndex, 0, movedTab);
      return newTabs;
    });
  };

  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleMouseEnter = (
    e: React.MouseEvent,
    tabId: number,
    pinned: boolean
  ) => {
    e.preventDefault();
    if (e.currentTarget) {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();

      setContextMenu({
        visible: true,
        x: rect.left + 20,
        y: rect.bottom - 10,
        tabId,
      });
    }
  };

  const handlePinToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (contextMenu.tabId === null) return;

    setTabs((prevTabs) => {
      const tabIndex = prevTabs.findIndex((t) => t.id === contextMenu.tabId);
      const tab = prevTabs[tabIndex];
      const newTabs = prevTabs.filter((t) => t.id !== tab.id);

      if (tab.pinned) {
        const unpinnedTab = { ...tab, pinned: false };
        newTabs.push(unpinnedTab);
        return newTabs;
      } else {
        const pinnedTab = { ...tab, pinned: true };
        const lastPinnedIndex = newTabs.map((t) => t.pinned).lastIndexOf(true);
        newTabs.splice(lastPinnedIndex + 1, 0, pinnedTab);
        return newTabs;
      }
    });

    setContextMenu({ visible: false, x: 0, y: 0, tabId: null });
  };

  return (
    <nav ref={navRef} className="relative flex w-full">
      {tabs.map((tab, index) => {
        const isVisible = visibleTabs.some((t) => t.id === tab.id);

        if (!isVisible) {
          return (
            <div
              key={tab.id}
              ref={(el) => setTabRef(tab.id, el)}
              className="absolute opacity-0 pointer-events-none"
            />
          );
        }
        return (
          <div
            key={tab.id}
            ref={(el) => setTabRef(tab.id, el)}
            className="relative flex items-center flex-shrink-0"
          >
            <DraggableTab
              tab={tab}
              index={index}
              activeTab={activeTab}
              onTabClick={setActiveTab}
              onMouseEnter={(e: React.MouseEvent) =>
                handleMouseEnter(e, tab.id, tab.pinned)
              }
              moveTab={moveTab}
            />
            {index < tabs.length - 1 && (
              <div className="absolute right-0 top-1/4 h-1/2 w-px bg-[rgba(174,182,206,0.2)] pointer-events-none" />
            )}
          </div>
        );
      })}

      {overflowTabs.length > 0 && (
        <>
          <ChevronDown
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex-shrink-0 w-6 h-6 cursor-pointer self-center mx-2
              ${
                dropdownOpen
                  ? "bg-[rgba(70,144,226,1)] text-white rotate-180 rounded"
                  : ""
              }
            `}
          />
          {dropdownOpen && (
            <TabsDropdown
              tabs={overflowTabs}
              activeTab={activeTab}
              onSelect={(id) => {
                setActiveTab(id);
                setDropdownOpen(false);
              }}
            />
          )}
        </>
      )}

      {contextMenu.visible &&
        contextMenu.tabId !== null &&
        (() => {
          const tab = tabs.find((t) => t.id === contextMenu.tabId);
          if (!tab) return null;

          const Icon = getIcon(tab.name);
          const StapleIcon = getIcon("Staple");

          const pinnedClass = tab.pinned ? "text-black" : "";

          return (
            <div
              className="fixed flex items-center gap-2.5 p-3 bg-white border border-gray-200 rounded-md shadow-lg cursor-pointer z-50"
              style={{ top: contextMenu.y, left: contextMenu.x }}
              onClick={handlePinToggle}
              onMouseEnter={() =>
                setContextMenu((prev) => ({ ...prev, visible: true }))
              }
              onMouseLeave={() =>
                setContextMenu({ visible: false, x: 0, y: 0, tabId: null })
              }
            >
              {tab.pinned ? (
                <Icon
                  className={`w-4 h-4 flex-shrink-0 text-[rgb(127,133,141)] ${pinnedClass}`}
                />
              ) : (
                <StapleIcon className="w-4 h-4 flex-shrink-0 text-[rgb(127,133,141)]" />
              )}
              <p
                className={`text-[rgba(127,133,141,1)] text-sm ${pinnedClass}`}
              >
                {tab.pinned ? tab.name : "Tab anpinnen"}
              </p>
            </div>
          );
        })()}
    </nav>
  );
}
