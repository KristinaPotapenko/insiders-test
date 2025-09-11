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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex ${poppins.variable} font-medium antialiased h-screen overflow-hidden`}
      >
        <aside className="w-16 h-full bg-white border-r border-[rgba(174,182,206,0.2)]"></aside>
        <div className="flex flex-col grow min-w-0 bg-[rgba(174,182,206,0.2)]">
          <header className="flex-shrink-0 w-full h-[69px] bg-white border-b border-[rgba(174,182,206,0.2)]"></header>
          <main className="flex flex-col flex-1 min-h-0">
            <div className="flex-shrink-0 bg-white pr-12 b-2.5">
              <TabsContainer />
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
