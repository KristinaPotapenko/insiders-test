import Image from "next/image";

import { Tab as Tabinterface, TabIcon } from "@/interfaces/interfaces";

import { getHref } from "@/utils/getHref";
import { getIcon } from "@/utils/getIcon";

import Tab from "../Tab/Tab";

export interface TabsDropdownProps {
  tabs: Tabinterface[];
  activeTab: number;
  icons: TabIcon[];
  onSelect: (id: number) => void;
}

export function TabsDropdown({
  tabs,
  activeTab,
  onSelect,
  icons,
}: TabsDropdownProps) {
  return (
    <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-[rgba(233,233,233,0.7)] rounded-md shadow-lg z-50">
      {tabs.map((tab) => {
        const icon = getIcon(tab.name, icons);

        return (
          <Tab
            className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            key={tab.id}
            href={getHref(tab.name)}
            onClick={() => onSelect(tab.id)}
          >
            {icon && (
              <Image src={icon.src} alt={icon.alt} width={16} height={16} />
            )}
            <p className={tab.id === activeTab ? "text-black " : ""}>
              {tab.pinned ? "" : tab.name}{" "}
            </p>
          </Tab>
        );
      })}
    </div>
  );
}
