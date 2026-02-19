import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/globals/SmoothScroll";
import "./globals.css";

const erode = localFont({
  src: [
    {
      path: "../fonts/Erode-Variable.ttf",
      style: "normal",
    },
    {
      path: "../fonts/Erode-VariableItalic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-erode",
  display: "swap",
});

const plusJakartaSans = localFont({
  src: [
    {
      path: "../fonts/PlusJakartaSans-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../fonts/PlusJakartaSans-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoftCo",
  description:
    "AI-powered P2P & AP automation, tailored to perfection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${erode.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
