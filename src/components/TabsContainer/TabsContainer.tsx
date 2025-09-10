"use client";

import { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Image from "next/image";
import { useOverflowTabs } from "@/hooks/useOverflowTabs";

import TabItem from "../TabItem/TabItem";
import { TabsDropdown } from "../TabsDropdown/TabsDropdown";

import { ChevronDown } from "lucide-react";

import { Tab, TabIcon as Icon } from "@/interfaces/interfaces";

const icons = [
  { id: 1, src: "/tabs/Lagerverwaltung.svg", alt: "Lagerverwaltung" },
  { id: 2, src: "/tabs/Dashboard.svg", alt: "Dashboard" },
  { id: 3, src: "/tabs/Banking.svg", alt: "Banking" },
  { id: 4, src: "/tabs/Telefonie.svg", alt: "Telefonie" },
  { id: 5, src: "/tabs/Accounting.svg", alt: "Accounting" },
  { id: 6, src: "/tabs/Verkauf.svg", alt: "Verkauf" },
  { id: 7, src: "/tabs/Statistik.svg", alt: "Statistik" },
  { id: 8, src: "/tabs/PostOffice.svg", alt: "Post Office" },
  { id: 9, src: "/tabs/Administration.svg", alt: "Administration" },
  { id: 10, src: "/tabs/Help.svg", alt: "Help" },
  { id: 11, src: "/tabs/Warenbestand.svg", alt: "Warenbestand" },
  { id: 12, src: "/tabs/Auswahllisten.svg", alt: "Auswahllisten" },
  { id: 13, src: "/tabs/Einkauf.svg", alt: "Einkauf" },
  { id: 14, src: "/tabs/Rechn.svg", alt: "Rechn" },
];

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
  icons: Icon[];
  onTabClick: (id: number) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  moveTab: (fromIndex: number, toIndex: number) => void;
}

const DraggableTab = ({
  tab,
  index,
  activeTab,
  icons,
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
        icons={icons}
        onClick={() => onTabClick(tab.id)}
        onMouseEnter={onMouseEnter}
      />
    </div>
  );
};

function TabsContainerInner() {
  const [tabs, setTabs] = useState([
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
  ]);

  const [activeTab, setActiveTab] = useState(2);
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
              icons={icons}
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
              icons={icons}
            />
          )}
        </>
      )}

      {contextMenu.visible &&
        contextMenu.tabId !== null &&
        (() => {
          const tab = tabs.find((t) => t.id === contextMenu.tabId);
          if (!tab) return null;

          const icon = icons.find((i) => i.alt === tab.name);

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
                icon && (
                  <Image src={icon.src} alt={icon.alt} width={16} height={16} />
                )
              ) : (
                <Image src="/staple.svg" alt="Staple" width={16} height={16} />
              )}
              <p className="text-[rgba(127,133,141,1)] text-sm">
                {tab.pinned ? tab.name : "Tab anpinnen"}
              </p>
            </div>
          );
        })()}
    </nav>
  );
}
