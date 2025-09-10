"use client";

import { useEffect, useState } from "react";

import { Tab, TabIcon } from "@/interfaces/interfaces";
import { useOverflowTabs } from "@/hooks/useOverflowTabs";

import TabItem from "../TabItem/TabItem";
import { TabsDropdown } from "../TabsDropdown/TabsDropdown";

export interface TabsContainerProps {
  tabs: Tab[];
  icons: TabIcon[];
}
import { ChevronDown } from "lucide-react";

export default function TabsContainer({ tabs, icons }: TabsContainerProps) {
  const [activeTab, setActiveTab] = useState(2);
  const { visibleTabs, overflowTabs, navRef, setTabRef } = useOverflowTabs({
    tabs,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
            className="flex items-center flex-shrink-0"
          >
            <TabItem
              tab={tab}
              activeTab={activeTab}
              icons={icons}
              onClick={() => setActiveTab(tab.id)}
            />
            {index < tabs.length - 1 &&
              visibleTabs.some((t) => t.id === tabs[index + 1]?.id) && (
                <div className="w-px h-4.5 bg-[rgba(174,182,206,0.2)]" />
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
    </nav>
  );
}
