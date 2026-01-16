'use client';

import { useState } from 'react';
import { ShieldCheck, Server, Database, Lock, ChevronRight, Check, Copy } from 'lucide-react';
import Link from 'next/link';


function DocSidebar() {
    const links = [
        { title: "Introduction", id: "intro" },
        { title: "Authentification", id: "auth" },
        { title: "Check-In (Temps Réel)", id: "check" },
        { title: "Jumeau Numérique", id: "details" },
        { title: "Webhooks & Alertes", id: "webhooks" },
        { title: "Feedback & Réputation", id: "feedback" },
    ];

    return (
        <div className="hidden lg:block w-64 fixed left-0 top-20 bottom-0 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#020617] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 transition-colors duration-300">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Sommaire</h3>
            <ul className="space-y-1">
                {links.map((link) => (
                    <li key={link.id}>
                        <a
                            href={`#${link.id}`}
                            className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors border-l-2 border-transparent hover:border-blue-500"
                        >
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// --- COMPOSANT DIAGRAMME DE SÉQUENCE (ADAPTATIF) ---
function SequenceDiagram({ title, steps }: { title: string, steps: { from: string, to: string, label: string, type?: 'req' | 'res' | 'async' }[] }) {
    const POS: Record<string, number> = { 'App': 16.66, 'UGate': 50, 'DB': 83.33 };

    return (
        <div className="my-8 p-1 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-white/10 shadow-xl transition-colors duration-300">
            <div className="bg-slate-50 dark:bg-[#0B1121] rounded-xl p-8 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 transition-colors duration-300">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8 text-center">{title}</div>

                <div className="min-w-[600px] relative">
                    {/* 1. GRILLE DE FOND */}
                    <div className="absolute inset-0 flex pointer-events-none">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="w-1/3 flex justify-center">
                                <div className="w-px h-full border-l border-dashed border-slate-300 dark:border-slate-700"></div>
                            </div>
                        ))}
                    </div>

                    {/* 2. EN-TÊTES (ACTEURS) */}
                    <div className="grid grid-cols-3 mb-10 relative z-10">
                        <ActorIcon icon={<Server size={20}/>} label="Votre App" color="blue" />
                        <ActorIcon icon={<ShieldCheck size={20}/>} label="UGate API" color="emerald" />
                        <ActorIcon icon={<Database size={20}/>} label="Syndicats DB" color="slate" />
                    </div>

                    {/* 3. FLÈCHES (STEPS) */}
                    <div className="space-y-10 pb-4 relative z-10">
                        {steps.map((step, idx) => {
                            const start = POS[step.from];
                            const end = POS[step.to];
                            const isLeftToRight = start < end;
                            const leftPos = Math.min(start, end);
                            const widthPercent = Math.abs(end - start);

                            const colorClass = step.type === 'res' ? 'text-emerald-500 border-emerald-500/50' : step.type === 'async' ? 'text-amber-500 border-amber-500/50' : 'text-blue-500 border-blue-500/50';
                            const borderStyle = step.type === 'res' ? 'border-dashed' : 'border-solid';
                            const bgLabel = step.type === 'res' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/20' : step.type === 'async' ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-500/20' : 'text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-500/20';

                            return (
                                <div key={idx} className="relative h-6 w-full">
                                    <div
                                        className={`absolute top-1/2 border-t ${colorClass} ${borderStyle}`}
                                        style={{ left: `${leftPos}%`, width: `${widthPercent}%` }}
                                    >
                                        <div className={`absolute -top-2 ${isLeftToRight ? '-right-1.5' : '-left-1.5 rotate-180'} ${colorClass.split(' ')[0]}`}>
                                            <ChevronRight size={16} fill="currentColor" />
                                        </div>
                                        <div className="absolute w-full text-center -top-6 flex justify-center">
                                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${bgLabel}`}>
                                                {step.label}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ActorIcon({ icon, label, color }: {icon: any, label: string, color: string}) {
    // Mapping des couleurs pour le mode clair/sombre
    const colors: Record<string, string> = {
        blue: "bg-blue-100 border-blue-300 text-blue-600 dark:bg-blue-600/20 dark:border-blue-500 dark:text-blue-400",
        emerald: "bg-emerald-100 border-emerald-300 text-emerald-600 dark:bg-emerald-600/20 dark:border-emerald-500 dark:text-emerald-400",
        slate: "bg-slate-100 border-slate-300 text-slate-600 dark:bg-slate-700/20 dark:border-slate-600 dark:text-slate-400"
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 border rounded-lg flex items-center justify-center shadow-sm transition-colors duration-300 ${colors[color]}`}>
                {icon}
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-white transition-colors">{label}</span>
        </div>
    );
}

// --- COMPOSANT CODE BLOCK ---
function CodeBlock({ method, url, json }: { method: string, url: string, json: object }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(json, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Style du badge méthode
    const methodBadge = method === 'GET' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
        : method === 'POST' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
            : 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400';

    return (
        <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1121] group shadow-sm dark:shadow-none transition-colors duration-300">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded transition-colors ${methodBadge}`}>
                        {method}
                    </span>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 break-all">{url}</span>
                </div>
                <button onClick={handleCopy} className="text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-white transition-colors">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-600 dark:text-slate-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
                {JSON.stringify(json, null, 2)}
            </pre>
        </div>
    )
}

// --- PAGE PRINCIPALE ---
export default function DocsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-600 dark:text-slate-300 font-sans selection:bg-blue-500/30 transition-colors duration-300">
            {/* Sidebar Fixe */}
            <DocSidebar />

            <main className="lg:ml-64 py-12 px-6 lg:px-20 max-w-5xl transition-colors duration-300">

                {/* INTRO */}
                <section id="intro" className="mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Documentation API Compliance</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                        Intégrez la vérification syndicale dans vos applications de transport. Cette API fournit des données temps réel sur l'éligibilité des chauffeurs.
                    </p>
                    <div className="p-6 rounded-xl bg-blue-50 dark:bg-gradient-to-r dark:from-blue-900/20 dark:to-transparent border border-blue-200 dark:border-blue-500/20 flex gap-4 shadow-sm dark:shadow-none transition-colors">
                        <div className="shrink-0"><ShieldCheck className="text-blue-600 dark:text-blue-400" /></div>
                        <div>
                            <h4 className="text-slate-900 dark:text-white font-bold mb-1">Environnement Sandbox</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Pour les tests, utilisez l'ID chauffeur <code className="text-slate-700 bg-white border border-slate-200 px-1 rounded dark:text-white dark:bg-white/10 dark:border-transparent">driver-123</code> (Valide) ou <code className="text-slate-700 bg-white border border-slate-200 px-1 rounded dark:text-white dark:bg-white/10 dark:border-transparent">driver-456</code> (Rejeté).</p>
                        </div>
                    </div>
                </section>

                {/* AUTH */}
                <section id="auth" className="mb-20 border-t border-slate-200 dark:border-white/5 pt-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                        <Lock size={24} className="text-emerald-500 dark:text-emerald-400"/> Authentification
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Toutes les requêtes sécurisées nécessitent un jeton Bearer dans l'en-tête.
                    </p>
                    <CodeBlock
                        method="HEADER"
                        url="Authorization: Bearer <votre_token>"
                        json={{ error: "Unauthorized", status: 401, message: "Token missing or expired" }}
                    />
                </section>

                {/* ENDPOINT 1: CHECK */}
                <section id="check" className="mb-24 border-t border-slate-200 dark:border-white/5 pt-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 font-bold rounded text-xs">GET</span>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white break-all">/compliance/check/{`{driverId}`}</h2>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Vérifie l'éligibilité d'un chauffeur avant de lui attribuer une course. Cette route est optimisée pour une latence faible.
                    </p>

                    <SequenceDiagram
                        title="Flow de Vérification (Check-In)"
                        steps={[
                            { from: 'App', to: 'UGate', label: 'GET /check/driver-123', type: 'req' },
                            { from: 'UGate', to: 'DB', label: 'Redis Cache Lookup', type: 'req' },
                            { from: 'UGate', to: 'UGate', label: 'Compliance Rules', type: 'async' },
                            { from: 'UGate', to: 'App', label: '200 OK (AUTHORIZED)', type: 'res' }
                        ]}
                    />

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-4">Réponse Type</h3>
                    <CodeBlock
                        method="200 OK"
                        url="application/json"
                        json={{
                            syndicatDriverId: "synd-001",
                            verificationTimestamp: "2025-12-27T10:00:00Z",
                            globalStatus: "AUTHORIZED",
                            details: {
                                licenseValid: true,
                                insuranceValid: true,
                                membershipCurrent: true,
                                medicalCheck: true
                            },
                            restrictions: []
                        }}
                    />
                </section>

                {/* (Le reste des sections utilise les mêmes composants CodeBlock et SequenceDiagram, donc elles s'adapteront automatiquement) */}
                <section id="details" className="mb-24 border-t border-slate-200 dark:border-white/5 pt-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 font-bold rounded text-xs">GET</span>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white break-all">/compliance/details/{`{driverId}`}</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Récupère le profil officiel (Jumeau Numérique).
                    </p>
                    <CodeBlock method="200 OK" url="application/json" json={{ id: "driver-123", firstName: "Jean", isVerified: true }} />
                </section>

                <section id="webhooks" className="mb-24 border-t border-slate-200 dark:border-white/5 pt-12 relative">
                    <div className="absolute -left-6 top-12 w-1 h-20 bg-amber-500 rounded-r"></div>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 font-bold rounded text-xs">WEBHOOK</span>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white break-all">/syndicats/status-change</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        <strong>Critique :</strong> Notification de bannissement ou suspension.
                    </p>
                    <CodeBlock method="POST" url="Vers votre serveur" json={{ driverId: "driver-123", newStatus: "BANNED" }} />
                </section>

                <section id="feedback" className="mb-24 border-t border-slate-200 dark:border-white/5 pt-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 font-bold rounded text-xs">POST</span>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white break-all">/compliance/feedback</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Signalez un incident ou soumettez une note.
                    </p>
                    <CodeBlock method="POST" url="/compliance/feedback" json={{ driverId: "driver-123", rating: 5 }} />
                </section>

            </main>
        </div>
    );
}