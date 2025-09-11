import { Tab } from "@/interfaces/interfaces";
import { getIcon } from "@/utils/getIcon";

interface ContextMenuProps {
  contextMenu: { visible: boolean; x: number; y: number; tabId: number | null };
  setContextMenu: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      x: number;
      y: number;
      tabId: number | null;
    }>
  >;
  tabs: Tab[];
  handlePinToggle: () => void;
}

export default function ContextMenu({
  contextMenu,
  setContextMenu,
  tabs,
  handlePinToggle,
}: ContextMenuProps) {
  if (!contextMenu.visible || contextMenu.tabId === null) return null;

  const tab = tabs.find((t) => t.id === contextMenu.tabId);
  if (!tab) return null;

  const Icon = getIcon(tab.name);
  const StapleIcon = getIcon("Staple");
  const pinnedClass = tab.pinned ? "text-black" : "text-gray";

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
        <Icon className={`w-4 h-4 flex-shrink-0 ${pinnedClass}`} />
      ) : (
        <StapleIcon className="w-4 h-4 flex-shrink-0 text-gray" />
      )}
      <p className={`text-sm ${pinnedClass}`}>
        {tab.pinned ? tab.name : "Tab anpinnen"}
      </p>
    </div>
  );
}
