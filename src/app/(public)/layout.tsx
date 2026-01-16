
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen transition-colors duration-300">

            <nav className="border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600/10 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/5">
                            <ShieldCheck size={20} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                            UGate <span className="text-blue-600 dark:text-blue-500">Dev</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-4 text-sm font-medium">

                        <ThemeToggle />

                        <div className="hidden md:flex items-center gap-6 ml-2 pl-6 border-l border-slate-200 dark:border-white/10">
                            <Link href="/docs" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white transition-colors">Documentation</Link>
                            <Link href="/api-ref" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white transition-colors">API Ref</Link>
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-400/20 text-xs font-bold uppercase tracking-wider">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></div>
                                System Operational
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {children}


            <footer className="border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#020617] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 opacity-50 text-slate-900 dark:text-white">
                        <ShieldCheck size={16} />
                        <span className="text-sm font-semibold">YowYob UGate © 2026</span>
                    </div>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-blue-600 dark:hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-white">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

