import { Tab as TabInterface, TabIcon } from "@/interfaces/interfaces";
import { getHref } from "@/utils/getHref";
import { getIcon } from "@/utils/getIcon";

import Tab from "../Tab/Tab";

interface TabItemProps {
  tab: TabInterface;
  activeTab: number;
  onClick: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export default function TabItem({
  tab,
  activeTab,
  onClick,
  onMouseEnter,
}: TabItemProps) {
  const Icon = getIcon(tab.name);

  const isActive = tab.id === activeTab;
  const activeClass = isActive ? "text-black" : "";

  return (
    <Tab
      href={getHref(tab.name)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`flex items-center gap-2.5 h-full px-5 py-4
        border-t-2 border-transparent cursor-pointer
        hover:bg-[rgba(241,245,248,1)]
        hover:border-t-[rgb(127,133,141)]
        ${isActive ? "border-t-[rgb(70,144,226)] bg-[rgba(241,245,248,1)]" : ""}
      `}
    >
      <Icon
        className={`w-4 h-4 flex-shrink-0 text-[rgb(127,133,141)] ${activeClass}`}
      />
      {tab.pinned ? "" : <p className={activeClass}>{tab.name}</p>}
    </Tab>
  );
}
