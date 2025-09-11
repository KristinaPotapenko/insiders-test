import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { DraggedTab, Tab } from "@/interfaces/interfaces";

import TabItem from "../TabItem/TabItem";

interface DraggableTabProps {
  tab: Tab;
  index: number;
  activeTab: number;
  onTabClick: (id: number) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onDelete: (id: number) => void;
  moveTab: (fromIndex: number, toIndex: number) => void;
}

export const DraggableTab = ({
  tab,
  index,
  activeTab,
  onTabClick,
  onMouseEnter,
  onDelete,
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
        onDelete={onDelete}
      />
    </div>
  );
};
