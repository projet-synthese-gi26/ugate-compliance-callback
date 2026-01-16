'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, ArrowRight, Zap, Code2, Globe, LayoutTemplate, Link as LinkIcon, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DeveloperPortal() {
    const [driverId, setDriverId] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('https://ride-and-go.app/callback');
    const [copied, setCopied] = useState(false);
    const [exportFormat, setExportFormat] = useState<'code' | 'url'>('code');
    const [baseUrl, setBaseUrl] = useState('http://localhost:3000');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setBaseUrl(window.location.origin);
        }
    }, []);

    const generatedLink = `${baseUrl}/connect?driverId=${driverId || '{UUID}'}&redirectUrl=${encodeURIComponent(redirectUrl)}`;

    const codeString = `const verificationLink = \`
  ${baseUrl}/connect?
  driverId=\${driverId}&
  redirectUrl=\${callback}
\`;`;

    const handleCopy = () => {
        const textToCopy = exportFormat === 'code' ? codeString : generatedLink;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const fillMock = (id: string) => setDriverId(id);

    return (
        <main className="max-w-6xl mx-auto px-6 py-24 relative z-10">

            {/* --- BACKGROUND FX (Gestion des couleurs CLAIR vs SOMBRE) --- */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 transition-colors duration-500">
                {/* Mode Clair : Fond blanc vers gris // Mode Sombre : Fond bleu nuit vers noir */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#0f172a] dark:via-[#020617] dark:to-black"></div>

                {/* Grille : Grise en clair, Blanche en sombre (opacité réduite) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                {/* Orbe : Bleu ciel en clair, Bleu profond en sombre */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[120px] opacity-60 dark:opacity-40"></div>
            </div>

            {/* --- HERO SECTION --- */}
            <div className="text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-950/30 dark:border-blue-800/30 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm dark:shadow-none"
                >
                    <Zap size={12} className="text-blue-600 dark:text-blue-400" />
                    Compliance as a Service
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight"
                >
                    Intégrez la conformité <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 dark:from-blue-400 dark:via-blue-500 dark:to-blue-400">
                        en moins de 30 secondes.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
                >
                    Ne codez plus la logique syndicale. Générez un lien sécurisé UGate, redirigez vos chauffeurs, et recevez un statut certifié instantanément.
                </motion.p>
            </div>

            {/* --- LE GÉNÉRATEUR (THE PLAYGROUND) --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
            >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600 rounded-[34px] blur opacity-30 dark:opacity-20 transition-all duration-300"></div>

                {/* Conteneur Principal : Blanc (Light) vs Bleu Nuit (Dark) */}
                <div className="bg-white dark:bg-[#0B1121] rounded-[32px] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden relative transition-colors duration-300">

                    {/* Window Header */}
                    <div className="h-12 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 flex items-center px-6 gap-2 transition-colors">
                        <div className="w-3 h-3 rounded-full bg-rose-400 border border-rose-500/30"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/30"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/30"></div>
                        <div className="ml-4 text-xs font-mono text-slate-400 dark:text-slate-500 flex items-center gap-2">
                            <Code2 size={12} />
                            integration_builder
                        </div>
                    </div>

                    <div className="p-8 md:p-12 grid lg:grid-cols-2 gap-12">
                        {/* GAUCHE : INPUTS */}
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-baseline mb-3">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide transition-colors">
                                        1. ID du Chauffeur
                                    </label>
                                    <div className="flex gap-2 text-[10px] font-mono">
                                        <button onClick={() => fillMock('driver-123')} className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 rounded hover:bg-emerald-100 transition-colors">Mock: Valide</button>
                                        <button onClick={() => fillMock('driver-456')} className="px-2 py-1 bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20 rounded hover:bg-rose-100 transition-colors">Mock: Invalide</button>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    placeholder="ex: driver-123"
                                    value={driverId}
                                    onChange={(e) => setDriverId(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide mb-3 transition-colors">
                                    2. URL de retour (Callback)
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    value={redirectUrl}
                                    onChange={(e) => setRedirectUrl(e.target.value)}
                                />
                            </div>

                            <div className="pt-4">
                                <Link
                                    href={`/connect?driverId=${driverId || 'driver-123'}&redirectUrl=${encodeURIComponent(redirectUrl)}`}
                                    className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-500/20 dark:shadow-blue-900/20"
                                >
                                    Simuler l'expérience Utilisateur
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* DROITE : CODE */}
                        <div className="relative flex flex-col h-full">
                            <div className="flex justify-between items-end mb-3">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide transition-colors">
                                    3. Intégration
                                </label>
                                <div className="bg-slate-100 dark:bg-white/5 rounded-lg p-1 flex gap-1 border border-slate-200 dark:border-white/5 transition-colors">
                                    <button onClick={() => setExportFormat('code')} className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all flex items-center gap-1.5 ${exportFormat === 'code' ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}> <Code2 size={12}/> Code </button>
                                    <button onClick={() => setExportFormat('url')} className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all flex items-center gap-1.5 ${exportFormat === 'url' ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}> <LinkIcon size={12}/> URL </button>
                                </div>
                            </div>

                            {/* Zone Code : Toujours Sombre pour la lisibilité Syntaxique */}
                            <div className="group relative bg-[#0f172a] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden flex-1 min-h-[220px] flex flex-col shadow-inner transition-colors">
                                <div className="flex-1 p-6 overflow-x-auto scrollbar-hide">
                                    {exportFormat === 'code' ? (
                                        <div className="font-mono text-xs md:text-sm text-blue-100">
                                            <span className="text-purple-400">const</span> <span className="text-blue-400">verificationLink</span> = <span className="text-green-400">`</span><br/>
                                            &nbsp;&nbsp;{baseUrl}/connect?<br/>
                                            &nbsp;&nbsp;driverId=<span className="text-yellow-400">${`{driverId}`}</span>&<br/>
                                            &nbsp;&nbsp;redirectUrl=<span className="text-yellow-400">${`{callback}`}</span><br/>
                                            <span className="text-green-400">`</span>;
                                        </div>
                                    ) : (
                                        <div className="font-mono text-xs md:text-sm text-slate-300 break-all">
                                            {generatedLink}
                                        </div>
                                    )}
                                </div>
                                <div className="border-t border-white/5 bg-white/[0.02] p-2 flex justify-between items-center">
                                    <span className="text-[10px] text-slate-500 px-3">
                                        {exportFormat === 'code' ? 'TypeScript / JS Template' : 'HTTPS Standard Link'}
                                    </span>
                                    <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-colors border border-white/5">
                                        {copied ? <Check size={14} className="text-emerald-400"/> : <Copy size={14}/>}
                                        {copied ? 'Copié !' : 'Copier'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>


            <div className="mt-24 grid md:grid-cols-3 gap-8">
                <FeatureTile icon={<Globe className="text-blue-500 dark:text-blue-400" />} title="Hébergé & Sécurisé" desc="Infrastructure gérée par UGate. Certificats SSL et chiffrement bancaire inclus par défaut." />
                <FeatureTile icon={<Zap className="text-amber-500 dark:text-amber-400" />} title="Synchronisation Live" desc="Changements de statut (assurance, bannissement) répercutés en temps réel sur l'API." />
                <FeatureTile icon={<LayoutTemplate className="text-purple-500 dark:text-purple-400" />} title="Marque Blanche" desc="L'interface s'adapte à votre identité visuelle pour une expérience utilisateur fluide." />
            </div>
        </main>
    );
}


function FeatureTile({ icon, title, desc }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-blue-300 dark:hover:bg-white/10 transition-colors group shadow-sm dark:shadow-none">
            <div className="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-slate-100 dark:border-transparent">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">{desc}</p>
        </div>
    )
}