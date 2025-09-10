import Image from "next/image";

import Tab from "../Tab/Tab";

const tabsIcon = [
  { id: 1, src: "/tabs/Lagerverwaltung.svg", alt: "Lagerverwaltung" },
  { id: 2, src: "/tabs/Dashboard.svg", alt: "Dashboard" },
  { id: 3, src: "/tabs/Banking.svg", alt: "Banking" },
  { id: 4, src: "/tabs/Telefonie.svg", alt: "Telefonie" },
  { id: 5, src: "/tabs/Accounting.svg", alt: "Accounting" },
  { id: 6, src: "/tabs/Verkauf.svg", alt: "Verkauf" },
  { id: 7, src: "/tabs/Statistik.svg", alt: "Statistik" },
  { id: 8, src: "/tabs/PostOffice.svg", alt: "Post Office" },
  { id: 9, src: "/tabs/Administration.svg", alt: "Administration" },
  { id: 10, src: "/tabs/Help.svg", alt: "Help" },
  { id: 11, src: "/tabs/Warenbestand.svg", alt: "Warenbestand" },
  { id: 12, src: "/tabs/Auswahllisten.svg", alt: "Auswahllisten" },
  { id: 13, src: "/tabs/Einkauf.svg", alt: "Einkauf" },
  { id: 14, src: "/tabs/Rechn.svg", alt: "Rechn" },
];

export default function TabsContainer() {
  const tabs = [
    { id: 1, name: "Lagerverwaltung", pinned: false },
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
    { id: 15, name: "Verkauf", pinned: false },
    { id: 16, name: "Post Office", pinned: false },
    { id: 17, name: "Telefonie", pinned: false },
  ];

  return (
    <nav className="flex w-full overflow-hidden">
      {tabs.map((tab, index) => {
        const href = `/${tab.name.toLowerCase().replace(/\s+/g, "-")}`;
        const isLast = index === tabs.length - 1;

        const icon = tabsIcon.find((icon) => icon.alt === tab.name);

        return (
          <div key={tab.id} className="flex items-center flex-shrink-0">
            <div className="flex items-center gap-2.5 px-5 py-4 flex-shrink-0">
              {icon && (
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={16}
                  height={16}
                  className="object-contain flex-shrink-0"
                />
              )}
              <Tab href={href}>{tab.name}</Tab>
            </div>
            {!isLast && (
              <div className="w-px h-4.5 bg-[rgba(174,182,206,0.2)] flex-shrink-0" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
