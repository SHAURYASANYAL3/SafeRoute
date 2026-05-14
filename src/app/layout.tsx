import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeRoute | Student Safety Orchestration",
  description:
    "Adaptive student commute safety platform for proactive monitoring, check-ins, escalation, and recovery.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "SafeRoute",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#eff6ff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
