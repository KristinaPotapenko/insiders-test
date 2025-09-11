import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getHref } from "@/utils/getHref";
import { getTabsFromStorage, saveTabsToStorage } from "@/utils/storage";
import { Tab } from "@/interfaces/interfaces";

export const useTabsState = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [tabs, setTabs] = useState<Tab[]>(() => {
    const stored = getTabsFromStorage();

    if (stored) if (stored?.length > 0) return stored;

    return [
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
    ];
  });

  useEffect(() => {
    saveTabsToStorage(tabs);
  }, [tabs]);

  const [activeTab, setActiveTab] = useState<number>(() => {
    const current = tabs.find((t) => getHref(t.name) === pathname);
    return current ? current.id : 0;
  });

  const handleDeleteTab = (id: number) => {
    const isActive = activeTab === id;
    const newTabs = tabs.filter((t) => t.id !== id);

    setTabs(newTabs);

    if (isActive) {
      if (newTabs.length > 0) {
        setActiveTab(newTabs[0].id);
        router.push(getHref(newTabs[0].name));
      } else {
        router.push("/");
      }
    }
  };

  const moveTab = (fromIndex: number, toIndex: number) => {
    const updated = [...tabs];

    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);

    setTabs(updated);
  };

  return { tabs, setTabs, activeTab, setActiveTab, handleDeleteTab, moveTab };
};
