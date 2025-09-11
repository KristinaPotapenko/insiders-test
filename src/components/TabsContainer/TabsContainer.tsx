"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useOverflowTabs } from "@/hooks/useOverflowTabs";
import { useTabsState } from "@/hooks/useTabsState";
import { useDropdown } from "@/hooks/useDropdown";
import { useContextMenu } from "@/hooks/useContextMenu";

import { TabsDropdown } from "../TabsDropdown/TabsDropdown";
import ContextMenu from "../ContextMenu/ContextMenu";
import TabsList from "../TabsList/TabsList";

import { ChevronDown } from "lucide-react";

export default function TabsContainer() {
  const { tabs, setTabs, activeTab, setActiveTab, handleDeleteTab, moveTab } =
    useTabsState();

  const { visibleTabs, overflowTabs, navRef, setTabRef } = useOverflowTabs({
    tabs,
  });

  const { dropdownOpen, setDropdownOpen } = useDropdown(navRef as any);

  const { contextMenu, setContextMenu, handleMouseEnter, handlePinToggle } =
    useContextMenu(setTabs);

  return (
    <DndProvider backend={HTML5Backend}>
      <nav ref={navRef} className="relative flex w-full">
        <TabsList
          tabs={tabs}
          visibleTabs={visibleTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setTabRef={setTabRef}
          onDelete={handleDeleteTab}
          moveTab={moveTab}
          onMouseEnter={handleMouseEnter}
        />

        {overflowTabs.length > 0 && (
          <>
            <ChevronDown
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex-shrink-0 w-6 h-6 cursor-pointer self-center mx-2
              ${
                dropdownOpen
                  ? "bg-primaryBlue text-white rotate-180 rounded"
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
                onDelete={handleDeleteTab}
              />
            )}
          </>
        )}

        <ContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          tabs={tabs}
          handlePinToggle={handlePinToggle}
        />
      </nav>
    </DndProvider>
  );
}
