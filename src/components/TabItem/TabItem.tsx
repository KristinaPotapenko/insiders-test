import Image from "next/image";

import { Tab as TabInterface, TabIcon } from "@/interfaces/interfaces";
import { getHref } from "@/utils/getHref";
import { getIcon } from "@/utils/getIcon";

import Tab from "../Tab/Tab";

interface TabItemProps {
  tab: TabInterface;
  activeTab: number;
  icons: TabIcon[];
  onClick: () => void;
}

export default function TabItem({
  tab,
  activeTab,
  onClick,
  icons,
}: TabItemProps) {
  const icon = getIcon(tab.name, icons);

  return (
    <Tab
      href={getHref(tab.name)}
      onClick={onClick}
      className={`flex items-center gap-2.5 h-full px-5 py-4
        border-t-2 border-transparent cursor-pointer
        hover:bg-[rgba(241,245,248,1)]
        hover:border-t-[rgb(127,133,141)]
        ${
          tab.id === activeTab
            ? "border-t-[rgb(70,144,226)] bg-[rgba(241,245,248,1)]"
            : ""
        }
      `}
    >
      {icon && <Image src={icon.src} alt={icon.alt} width={16} height={16} />}
      <p className={tab.id === activeTab ? "text-black" : ""}>
        {tab.pinned ? "" : tab.name}
      </p>
    </Tab>
  );
}
