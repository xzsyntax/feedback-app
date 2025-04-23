import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geribildirim Uygulaması",
  description: "Next.js ile geliştirilmiş geribildirim toplama ve yönetim uygulaması",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
