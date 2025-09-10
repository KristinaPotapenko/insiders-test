import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import TabsContainer from "@/components/TabsContainer/TabsContainer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Insiders Test",
  description:
    "Test project for Insiders company. Built with Next.js, Tailwind CSS, and modern frontend practices.",
};

const tabs = [
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
  { id: 15, name: "Verkauf", pinned: false },
  { id: 16, name: "Post Office", pinned: false },
  { id: 17, name: "Telefonie", pinned: false },
];

const icons = [
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex ${poppins.variable} antialiased h-screen overflow-hidden`}
      >
        <aside className="w-16 h-full bg-white border-r border-[rgba(174,182,206,0.2)]"></aside>
        <div className="flex flex-col grow min-w-0 bg-[rgba(174,182,206,0.2)]">
          <header className="flex-shrink-0 w-full h-[69px] bg-white border-b border-[rgba(174,182,206,0.2)]"></header>
          <main className="flex flex-col flex-1 min-h-0">
            <div className="flex-shrink-0 bg-white pr-12 b-2.5">
              <TabsContainer tabs={tabs} icons={icons} />
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
