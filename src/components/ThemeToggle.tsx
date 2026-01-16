"use client";

import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-24 h-8 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse" />;

    return (
        <div className="flex items-center p-1 bg-slate-200 dark:bg-white/10 rounded-full border border-slate-300 dark:border-white/5 shadow-inner transition-colors duration-300">
            <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-full transition-all duration-300 ${
                    theme === "light"
                        ? "bg-white text-orange-500 shadow-md scale-110"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Mode Clair"
            >
                <Sun size={14} />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-full transition-all duration-300 ${
                    theme === "system"
                        ? "bg-white dark:bg-slate-600 text-blue-500 dark:text-blue-300 shadow-md scale-110"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Système"
            >
                <Laptop size={14} />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-full transition-all duration-300 ${
                    theme === "dark"
                        ? "bg-slate-700 text-purple-400 shadow-md scale-110"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Mode Sombre"
            >
                <Moon size={14} />
            </button>
        </div>
    );
}