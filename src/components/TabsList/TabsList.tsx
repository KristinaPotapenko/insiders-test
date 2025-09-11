import { Tab } from "@/interfaces/interfaces";
import { DraggableTab } from "../DraggableTab/DraggableTab";

interface TabsListProps {
  tabs: Tab[];
  visibleTabs: Tab[];
  activeTab: number;
  setActiveTab: (id: number) => void;
  setTabRef: (id: number, el: HTMLDivElement | null) => void;
  onDelete: (id: number) => void;
  moveTab: (from: number, to: number) => void;
  onMouseEnter: (e: React.MouseEvent, tabId: number) => void;
}

export default function TabsList({
  tabs,
  visibleTabs,
  activeTab,
  setActiveTab,
  setTabRef,
  onDelete,
  moveTab,
  onMouseEnter,
}: TabsListProps) {
  return (
    <>
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
              onMouseEnter={(e) => onMouseEnter(e, tab.id)}
              onDelete={onDelete}
              moveTab={moveTab}
            />
            {index < tabs.length - 1 && (
              <div className="absolute right-0 top-1/4 h-1/2 w-px bg-grayTransparent pointer-events-none" />
            )}
          </div>
        );
      })}
    </>
  );
}
