// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google"; // ou Geist

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <body className={`${inter.className} antialiased bg-gray-50 text-slate-900`}>
        {children}
        </body>
        </html>
    );
}