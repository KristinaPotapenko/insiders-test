import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

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
      <body className={`flex ${poppins.variable} antialiased`}>
        <aside className="w-16 h-screen bg-white border-r border-[rgba(174,182,206,0.2)]"></aside>
        <div className="grow bg-[rgba(174,182,206,0.2)]">
          <header className="w-full h-[69px] bg-white border-b border-[rgba(174,182,206,0.2)]"></header>
          {children}
        </div>
      </body>
    </html>
  );
}
