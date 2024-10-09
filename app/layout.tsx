import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Calendly clone",
  description: "Set up meetup time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={` ${inter.variable} antialiased min-h-screen bg-background font-sans`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
