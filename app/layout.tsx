import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import TanstackProvider from "@/components/Providers/TanstackProvider";

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
        <TanstackProvider>
            <Provider>{children}</Provider>
        </TanstackProvider>
      </body>
    </html>
  );
}
