import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import { keywordsForMetaData } from "@/utils/constants";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FileShare",
  description:
    "FileShare: Swift P2P file sharing and real-time chat. Experience seamless, secure data exchange with our WebRTC-powered Next.js app. Join us for instant messaging and efficient file transfer in a modern, user-friendly environment.",
  authors: [
    {
      name: "Bigyan Kalakaheti",
      url: "https://github.com/BigyanKalakheti/FileShare.git",
    },
  ],
  keywords: keywordsForMetaData,
  icons: {
    icon: "/fastdroplight.png",        // Fix path (remove dot)
    apple: "/fastdroplight.png",       // Add apple-touch-icon
  },
  manifest: "/manifest.json",          // 👈 Add this
  themeColor: "#0d1117",                // 👈 Add this
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
