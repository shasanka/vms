import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import { TopBar } from "@/components/TopBar";
import { LeftSideBar } from "@/components/LeftSideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VMS",
  description: "Visitor management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <TopBar />
        <main className="flex flex-row">
          <LeftSideBar />
          <section className="flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10;">
          </section>
        </main> */}
        {children}
      </body>
    </html>
  );
}
