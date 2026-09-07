import type { Metadata } from "next";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ELEGANT NAIL — Boutique Nail Artistry | Pure Precision",
  description:
    "High-end luxury boutique nail salon. Meticulously crafted manicures tailored to your signature style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${montserrat.variable} h-full antialiased bg-[#050505] text-white selection:bg-white selection:text-black`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#050505] text-neutral-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
