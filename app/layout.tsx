import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board Game Round Scorer",
  description: "Mobile-first round-by-round scoring app"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
