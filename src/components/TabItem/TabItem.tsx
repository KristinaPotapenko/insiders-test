import { Tab as TabInterface, TabIcon } from "@/interfaces/interfaces";
import { getHref } from "@/utils/getHref";
import { getIcon } from "@/utils/getIcon";

import Tab from "../Tab/Tab";
import Close from "../Close/Close";

interface TabItemProps {
  tab: TabInterface;
  activeTab: number;
  onClick: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onDelete?: (id: number) => void;
}

export default function TabItem({
  tab,
  activeTab,
  onClick,
  onMouseEnter,
  onDelete,
}: TabItemProps) {
  const Icon = getIcon(tab.name);

  const isActive = tab.id === activeTab;
  const activeClass = isActive ? "text-black" : "text-gray";

  return (
    <Tab
      href={getHref(tab.name)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`flex items-center gap-2.5 h-full px-5 py-4
        border-t-2 border-transparent cursor-pointer
        hover:bg-offWhite
        hover:border-t-gray
        ${isActive ? "border-t-primaryBlue bg-offWhite" : ""}
      `}
    >
      <Icon className={`w-4 h-4 flex-shrink-0 ${activeClass}`} />
      {tab.pinned ? "" : <p className={activeClass}>{tab.name}</p>}
      {isActive && onDelete && <Close onDelete={onDelete} id={tab.id} />}
    </Tab>
  );
}
