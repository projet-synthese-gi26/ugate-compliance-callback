import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body className="antialiased bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-300 transition-colors duration-300">
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