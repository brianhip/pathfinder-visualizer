import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Graph Algorithm Visualizer",
  description: "App to visualize the most common graph algorithms",
  icons: "https://static-00.iconduck.com/assets.00/world-map-emoji-2048x2048-v43s4j3l.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}
