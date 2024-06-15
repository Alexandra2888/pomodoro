import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StyleProvider } from "@/contexts/style-context";
import { TimerProvider } from "@/contexts/sound-context";
import { SoundsProvider } from "@/contexts/timer-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<StyleProvider>
      <TimerProvider>
        <SoundsProvider>
            <body className={inter.className}>{children}</body>
                 </SoundsProvider>
      </TimerProvider>
    </StyleProvider>
    </html>
  );
}

   