import "./globals.css";
import { Inter } from "next/font/google"; // 1. IMPORT
import { ThemeProvider } from "@/components/ThemeProvider";


const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body className={`${inter.className} antialiased bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-300 transition-colors duration-300`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}