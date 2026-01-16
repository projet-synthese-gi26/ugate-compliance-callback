'use client';

import { useState } from 'react';
import { ShieldCheck, Server, Database, Lock, ChevronRight, Check, Copy, BellRing, ArrowLeftRight } from 'lucide-react';
import Link from 'next/link';

// --- COMPOSANT DE NAVIGATION (SIDEBAR) ---
function DocSidebar() {
    const links = [
        { title: "Introduction", id: "intro" },
        { title: "Authentification", id: "auth" },
        { title: "Check-In (Temps Réel)", id: "check" },
        { title: "Jumeau Numérique", id: "details" },
        { title: "Webhooks & Alertes", id: "webhooks" }, // Ajouté
        { title: "Feedback & Réputation", id: "feedback" },
    ];

    return (
        <div className="hidden lg:block w-64 fixed left-0 top-20 bottom-0 border-r border-white/5 bg-[#020617] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-800">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Sommaire</h3>
            <ul className="space-y-1">
                {links.map((link) => (
                    <li key={link.id}>
                        <a
                            href={`#${link.id}`}
                            className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors border-l-2 border-transparent hover:border-blue-500"
                        >
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// --- COMPOSANT DIAGRAMME DE SÉQUENCE (CORRIGÉ & ALIGNÉ) ---
// --- COMPOSANT DIAGRAMME DE SÉQUENCE (ROBUSTE & GRID) ---
function SequenceDiagram({ title, steps }: { title: string, steps: { from: string, to: string, label: string, type?: 'req' | 'res' | 'async' }[] }) {
    // Configuration des positions (En pourcentage du conteneur)
    // On divise l'espace en 6 segments. Les acteurs sont à 1/6, 3/6 (1/2), et 5/6.
    const POS: Record<string, number> = { 'App': 16.66, 'UGate': 50, 'DB': 83.33 };

    return (
        <div className="my-8 p-1 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl">
            <div className="bg-[#0B1121] rounded-xl p-8 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8 text-center">{title}</div>

                {/* CONTENEUR À LARGEUR FIXE MINIMALE (Empêche l'écrasement) */}
                <div className="min-w-[600px] relative">

                    {/* 1. GRILLE DE FOND (Lignes Verticales) */}
                    <div className="absolute inset-0 flex pointer-events-none">
                        {/* Colonne 1 (App) */}
                        <div className="w-1/3 flex justify-center">
                            <div className="w-px h-full border-l border-dashed border-slate-700"></div>
                        </div>
                        {/* Colonne 2 (UGate) */}
                        <div className="w-1/3 flex justify-center">
                            <div className="w-px h-full border-l border-dashed border-slate-700"></div>
                        </div>
                        {/* Colonne 3 (DB) */}
                        <div className="w-1/3 flex justify-center">
                            <div className="w-px h-full border-l border-dashed border-slate-700"></div>
                        </div>
                    </div>

                    {/* 2. EN-TÊTES (ACTEURS) - Utilisation de Grid pour l'alignement parfait */}
                    <div className="grid grid-cols-3 mb-10 relative z-10">
                        {/* Actor 1: App */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 bg-blue-600/20 border border-blue-500 rounded-lg flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                <Server size={20}/>
                            </div>
                            <span className="text-sm font-bold text-white">Votre App</span>
                        </div>
                        {/* Actor 2: UGate */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 bg-emerald-600/20 border border-emerald-500 rounded-lg flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                <ShieldCheck size={20}/>
                            </div>
                            <span className="text-sm font-bold text-white">UGate API</span>
                        </div>
                        {/* Actor 3: DB */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 bg-slate-700/20 border border-slate-600 rounded-lg flex items-center justify-center text-slate-400">
                                <Database size={20}/>
                            </div>
                            <span className="text-sm font-bold text-white">Syndicats DB</span>
                        </div>
                    </div>

                    {/* 3. FLÈCHES (STEPS) */}
                    <div className="space-y-10 pb-4 relative z-10">
                        {steps.map((step, idx) => {
                            const start = POS[step.from];
                            const end = POS[step.to];

                            // Calculs de positionnement
                            const isLeftToRight = start < end;
                            const leftPos = Math.min(start, end);
                            const widthPercent = Math.abs(end - start);

                            // Styles dynamiques
                            const colorClass = step.type === 'res' ? 'text-emerald-500 border-emerald-500/50' : step.type === 'async' ? 'text-amber-500 border-amber-500/50' : 'text-blue-500 border-blue-500/50';
                            const borderStyle = step.type === 'res' ? 'border-dashed' : 'border-solid';
                            const bgLabel = step.type === 'res' ? 'text-emerald-400' : step.type === 'async' ? 'text-amber-400' : 'text-blue-300';

                            return (
                                <div key={idx} className="relative h-6 w-full">
                                    <div
                                        className={`absolute top-1/2 border-t ${colorClass} ${borderStyle}`}
                                        style={{
                                            left: `${leftPos}%`,
                                            width: `${widthPercent}%`
                                        }}
                                    >
                                        {/* Pointe de flèche */}
                                        <div className={`absolute -top-2 ${isLeftToRight ? '-right-1.5' : '-left-1.5 rotate-180'} ${colorClass.split(' ')[0]}`}>
                                            <ChevronRight size={16} fill="currentColor" />
                                        </div>

                                        {/* Label au dessus */}
                                        <div className="absolute w-full text-center -top-6 flex justify-center">
                                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border border-white/5 bg-[#0B1121] ${bgLabel}`}>
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

// --- COMPOSANT CODE BLOCK ---
function CodeBlock({ method, url, json }: { method: string, url: string, json: object }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(json, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-[#0B1121] group">
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${method === 'GET' ? 'bg-blue-500/20 text-blue-400' : method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {method}
                    </span>
                    <span className="font-mono text-xs text-slate-400 break-all">{url}</span>
                </div>
                <button onClick={handleCopy} className="text-slate-500 hover:text-white transition-colors">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
                {JSON.stringify(json, null, 2)}
            </pre>
        </div>
    )
}

// --- PAGE PRINCIPALE ---
export default function DocsPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">

            {/* NAVBAR FIXE */}
            <nav className="fixed top-0 left-0 right-0 h-20 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 z-50 flex items-center px-6 lg:px-12 justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <ShieldCheck size={18} />
                    </div>
                    <span className="font-bold text-white tracking-tight">UGate <span className="text-slate-600">Docs</span></span>
                </Link>
                <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:bg-white/10">
                    Retour au portail
                </Link>
            </nav>

            <DocSidebar />

            <main className="lg:ml-64 pt-32 pb-24 px-6 lg:px-20 max-w-5xl">

                {/* INTRO */}
                <section id="intro" className="mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Documentation API Compliance</h1>
                    <p className="text-lg text-slate-400 leading-relaxed mb-8">
                        Intégrez la vérification syndicale dans vos applications de transport. Cette API fournit des données temps réel sur l'éligibilité des chauffeurs.
                    </p>
                    <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/20 flex gap-4">
                        <div className="shrink-0"><ShieldCheck className="text-blue-400" /></div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Environnement Sandbox</h4>
                            <p className="text-sm text-slate-400">Pour les tests, utilisez l'ID chauffeur <code className="text-white bg-white/10 px-1 rounded">driver-123</code> (Valide) ou <code className="text-white bg-white/10 px-1 rounded">driver-456</code> (Rejeté).</p>
                        </div>
                    </div>
                </section>

                {/* AUTH */}
                <section id="auth" className="mb-20 border-t border-white/5 pt-12">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <Lock size={24} className="text-emerald-400"/> Authentification
                    </h2>
                    <p className="text-slate-400 mb-6">
                        Toutes les requêtes sécurisées nécessitent un jeton Bearer dans l'en-tête.
                    </p>
                    <CodeBlock
                        method="HEADER"
                        url="Authorization: Bearer <votre_token>"
                        json={{ error: "Unauthorized", status: 401, message: "Token missing or expired" }}
                    />
                </section>

                {/* ENDPOINT 1: CHECK */}
                <section id="check" className="mb-24 border-t border-white/5 pt-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 font-bold rounded text-xs">GET</span>
                        <h2 className="text-2xl font-bold text-white break-all">/compliance/check/{`{driverId}`}</h2>
                    </div>

                    <p className="text-slate-400 mb-6">
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

                    <h3 className="text-lg font-bold text-white mt-8 mb-4">Réponse Type</h3>
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


                {/* ENDPOINT 2: DETAILS */}
                <section id="details" className="mb-24 border-t border-white/5 pt-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 font-bold rounded text-xs">GET</span>
                        <h2 className="text-2xl font-bold text-white break-all">/compliance/details/{`{driverId}`}</h2>
                    </div>

                    <p className="text-slate-400 mb-6">
                        Récupère le profil officiel (Jumeau Numérique) pour affichage dans votre application. Les URLs des documents sont signées et temporaires.
                    </p>

                    <CodeBlock
                        method="200 OK"
                        url="application/json"
                        json={{
                            id: "driver-123",
                            firstName: "Jean",
                            lastName: "EKTO",
                            photoUrl: "https://cdn.ugate.io/...",
                            cniNumber: "11223344",
                            isVerified: true
                        }}
                    />
                </section>

                {/* ENDPOINT 3: WEBHOOKS (NEW) */}
                <section id="webhooks" className="mb-24 border-t border-white/5 pt-12 relative">
                    <div className="absolute -left-6 top-12 w-1 h-20 bg-amber-500 rounded-r"></div>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-400 font-bold rounded text-xs">WEBHOOK</span>
                        <h2 className="text-2xl font-bold text-white break-all">/syndicats/status-change</h2>
                    </div>

                    <p className="text-slate-400 mb-6">
                        <strong>Critique :</strong> Configurez ce webhook pour être notifié si un chauffeur est <strong>banni</strong> ou suspendu par son syndicat alors qu'il est en service.
                    </p>

                    <SequenceDiagram
                        title="Notification de Bannissement (Push)"
                        steps={[
                            { from: 'DB', to: 'UGate', label: 'Admin Banni Chauffeur', type: 'async' },
                            { from: 'UGate', to: 'App', label: 'POST /your-webhook', type: 'req' },
                            { from: 'App', to: 'UGate', label: '200 OK (Ack)', type: 'res' }
                        ]}
                    />

                    <CodeBlock
                        method="POST"
                        url="Vers votre serveur"
                        json={{
                            driverId: "driver-123",
                            newStatus: "BANNED",
                            reason: "Fraude détectée sur assurance",
                            timestamp: "2025-12-27T14:00:00Z"
                        }}
                    />
                </section>

                {/* ENDPOINT 4: FEEDBACK */}
                <section id="feedback" className="mb-24 border-t border-white/5 pt-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 font-bold rounded text-xs">POST</span>
                        <h2 className="text-2xl font-bold text-white break-all">/compliance/feedback</h2>
                    </div>

                    <p className="text-slate-400 mb-6">
                        Signalez un incident ou soumettez une note. UGate met à jour le score de réputation du chauffeur.
                    </p>

                    <SequenceDiagram
                        title="Soumission d'avis"
                        steps={[
                            { from: 'App', to: 'UGate', label: 'POST /feedback', type: 'req' },
                            { from: 'UGate', to: 'App', label: '202 Accepted', type: 'res' },
                            { from: 'UGate', to: 'DB', label: 'Async Processing', type: 'async' }
                        ]}
                    />
                </section>

            </main>
        </div>
    );
}