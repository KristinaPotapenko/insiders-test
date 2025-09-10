import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import TabsContainer from "@/components/TabsContainer/TabsContainer";

import { ChevronDown } from "lucide-react";

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
            <div className="relative flex items-center flex-shrink-0 bg-white pr-10">
              <TabsContainer />
              <ChevronDown className="absolute top-1/2 right-3 w-6 h-6 -translate-y-1/2" />
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
