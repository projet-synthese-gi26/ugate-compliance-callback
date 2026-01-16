'use client';

import { useState } from 'react';
import { Copy, Check, Terminal, ArrowRight, ShieldCheck, Zap, Code2, Globe, LayoutTemplate, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DeveloperPortal() {
    const [driverId, setDriverId] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('https://ride-and-go.app/callback');
    const [copied, setCopied] = useState(false);

    // NOUVEAU : État pour gérer le format d'affichage (Code ou URL)
    const [exportFormat, setExportFormat] = useState<'code' | 'url'>('code');

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const generatedLink = `${baseUrl}/connect?driverId=${driverId || '{UUID}'}&redirectUrl=${encodeURIComponent(redirectUrl)}`;

    // Contenu textuel à copier selon le format choisi
    const codeString = `const verificationLink = \`
  ${baseUrl}/connect?
  driverId=\${driverId}&
  redirectUrl=\${callback}
\`;`;

    const handleCopy = () => {
        // On copie soit le code JS, soit l'URL brute selon l'onglet actif
        const textToCopy = exportFormat === 'code' ? codeString : generatedLink;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const fillMock = (id: string) => setDriverId(id);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-200">

            {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#020617] to-black"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] opacity-40"></div>
            </div>

            {/* --- NAVBAR --- */}
            <nav className="border-b border-white/5 bg-[#020617]/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/5">
                            <ShieldCheck size={20} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">UGate <span className="text-blue-500">Dev</span></span>
                    </div>

                    <div className="flex items-center gap-6 text-sm font-medium">
                        <a href="/docs" className="hover:text-white transition-colors">Documentation</a>
                        <a href="api-ref" className="hover:text-white transition-colors">API Reference</a>
                        <div className="h-4 w-px bg-white/10"></div>
                        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 text-xs font-bold uppercase tracking-wider">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                            System Operational
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-24 relative z-10">

                {/* --- HERO SECTION --- */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/30 border border-blue-800/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-8"
                    >
                        <Zap size={12} className="text-blue-400" />
                        Compliance as a Service
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
                    >
                        Intégrez la conformité <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600">
              en moins de 30 secondes.
            </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        Ne codez plus la logique syndicale. Générez un lien sécurisé UGate, redirigez vos chauffeurs, et recevez un statut certifié instantanément.
                    </motion.p>
                </div>

                {/* --- LE GÉNÉRATEUR (THE PLAYGROUND) --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[34px] blur opacity-20"></div>

                    <div className="bg-[#0B1121] rounded-[32px] border border-white/10 shadow-2xl overflow-hidden relative">

                        {/* Header façon fenêtre */}
                        <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                            <div className="ml-4 text-xs font-mono text-slate-500 flex items-center gap-2">
                                <Code2 size={12} />
                                integration_builder
                            </div>
                        </div>

                        <div className="p-8 md:p-12 grid lg:grid-cols-2 gap-12">

                            {/* LEFT: INPUTS */}
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-baseline mb-3">
                                        <label className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                                            1. ID du Chauffeur
                                        </label>
                                        <div className="flex gap-2 text-[10px] font-mono">
                                            <button onClick={() => fillMock('driver-123')} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">Mock: Valide</button>
                                            <button onClick={() => fillMock('driver-456')} className="px-2 py-1 bg-rose-500/10 text-rose-400 rounded border border-rose-500/20 hover:bg-rose-500/20 transition-colors">Mock: Invalide</button>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white font-mono text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                                        placeholder="ex: driver-123"
                                        value={driverId}
                                        onChange={(e) => setDriverId(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-200 uppercase tracking-wide mb-3">
                                        2. URL de retour (Callback)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white font-mono text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                                        value={redirectUrl}
                                        onChange={(e) => setRedirectUrl(e.target.value)}
                                    />
                                </div>

                                <div className="pt-4">
                                    <Link
                                        href={`/connect?driverId=${driverId || 'driver-123'}&redirectUrl=${encodeURIComponent(redirectUrl)}`}
                                        className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
                                    >
                                        Simuler l'expérience Utilisateur
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <p className="text-center text-xs text-slate-500 mt-3">
                                        Ouvre la page de conformité dans ce navigateur.
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT: OUTPUT CODE */}
                            <div className="relative flex flex-col h-full">

                                <div className="flex justify-between items-end mb-3">
                                    <label className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                                        3. Intégration
                                    </label>

                                    {/* --- SELECTEUR DE FORMAT (Tabs) --- */}
                                    <div className="bg-white/5 rounded-lg p-1 flex gap-1 border border-white/5">
                                        <button
                                            onClick={() => setExportFormat('code')}
                                            className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all flex items-center gap-1.5 ${exportFormat === 'code' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                        >
                                            <Code2 size={12} />
                                            Code
                                        </button>
                                        <button
                                            onClick={() => setExportFormat('url')}
                                            className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all flex items-center gap-1.5 ${exportFormat === 'url' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                        >
                                            <LinkIcon size={12} />
                                            URL
                                        </button>
                                    </div>
                                </div>

                                <div className="group relative bg-[#020617] border border-white/10 rounded-xl overflow-hidden flex-1 min-h-[220px] flex flex-col">

                                    {/* Affichage Conditionnel */}
                                    <div className="flex-1 p-6 overflow-x-auto scrollbar-hide">
                                        {exportFormat === 'code' ? (
                                            // VUE CODE JS
                                            <div className="font-mono text-xs md:text-sm text-blue-100">
                                                <span className="text-purple-400">const</span> <span className="text-blue-400">verificationLink</span> = <span className="text-green-400">`</span><br/>
                                                &nbsp;&nbsp;{baseUrl}/connect?<br/>
                                                &nbsp;&nbsp;driverId=<span className="text-yellow-400">${`{driverId}`}</span>&<br/>
                                                &nbsp;&nbsp;redirectUrl=<span className="text-yellow-400">${`{callback}`}</span><br/>
                                                <span className="text-green-400">`</span>;
                                            </div>
                                        ) : (
                                            // VUE URL SIMPLE
                                            <div className="font-mono text-xs md:text-sm text-slate-300 break-all">
                                                {generatedLink}
                                            </div>
                                        )}
                                    </div>

                                    {/* Copy Bar */}
                                    <div className="border-t border-white/5 bg-white/[0.02] p-2 flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 px-3">
                                    {exportFormat === 'code' ? 'TypeScript / JS Template' : 'HTTPS Standard Link'}
                                </span>
                                        <button
                                            onClick={handleCopy}
                                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-colors border border-white/5"
                                        >
                                            {copied ? <Check size={14} className="text-emerald-400"/> : <Copy size={14}/>}
                                            {copied ? 'Copié !' : 'Copier'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>

                {/* --- FEATURES GRID --- */}
                <div className="mt-24 grid md:grid-cols-3 gap-8">
                    <FeatureTile
                        icon={<Globe className="text-blue-400" />}
                        title="Hébergé & Sécurisé"
                        desc="Infrastructure gérée par UGate. Certificats SSL et chiffrement bancaire inclus par défaut."
                    />
                    <FeatureTile
                        icon={<Zap className="text-amber-400" />}
                        title="Synchronisation Live"
                        desc="Changements de statut (assurance, bannissement) répercutés en temps réel sur l'API."
                    />
                    <FeatureTile
                        icon={<LayoutTemplate className="text-purple-400" />}
                        title="Marque Blanche"
                        desc="L'interface s'adapte à votre identité visuelle pour une expérience utilisateur fluide."
                    />
                </div>

            </main>

            {/* FOOTER */}
            <footer className="border-t border-white/5 mt-20 bg-[#020617]">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 opacity-50">
                        <ShieldCheck size={16} />
                        <span className="text-sm font-semibold">YowYob UGate © 2025</span>
                    </div>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Terms</a>
                        <a href="#" className="hover:text-white">Contact API Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureTile({ icon, title, desc }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
        </div>
    )
}