import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/adp/ThemeProvider";
import MainLayout from "@/components/adp/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADP — Associação Desportiva do Piquiri | Das Águas Nasce a Força",
  description:
    "Site oficial da Associação Desportiva do Piquiri (ADP). Fundada em 19 de abril de 2026, no Paraná, Brasil. Conheça nossa história, elenco, notícias e muito mais.",
  keywords: [
    "ADP",
    "Associação Desportiva do Piquiri",
    "futebol",
    "Paraná",
    "Brasil",
    "clube de futebol",
    "Arena Piquiri",
  ],
  authors: [{ name: "ADP - Associação Desportiva do Piquiri" }],
  icons: {
    icon: "/123.png",
  },
  openGraph: {
    title: "ADP — Associação Desportiva do Piquiri",
    description: "Das águas nasce a força. Site oficial do clube paranaense.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <MainLayout>
            {children}
          </MainLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
