'use client';

import { useState } from 'react';
import { ShieldCheck, Copy, Check, ChevronRight, Hash, Box, Layers, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- TYPES DE DONNÉES (Simulant ton Swagger) ---
type Endpoint = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    summary: string;
    description: string;
    params?: { name: string; type: string; required: boolean; desc: string }[];
    body?: { name: string; type: string; required: boolean; desc: string }[];
    responses: { code: number; desc: string; json: object }[];
};

const apiData: Record<string, Endpoint[]> = {
    "Conformité": [
        {
            method: 'GET',
            path: '/compliance/check/{driverId}',
            summary: "Vérifier l'éligibilité (Check-In)",
            description: "Vérifie en temps réel le statut syndical, les suspensions et la validité du dossier. Utilise un cache Redis pour la haute performance.",
            params: [
                { name: 'driverId', type: 'uuid', required: true, desc: "L'identifiant unique du chauffeur." }
            ],
            responses: [
                {
                    code: 200,
                    desc: "OK - Vérification effectuée",
                    json: {
                        syndicatDriverId: "synd-001",
                        globalStatus: "AUTHORIZED",
                        details: { licenseValid: true, insuranceValid: true, membershipCurrent: true },
                        restrictions: []
                    }
                },
                {
                    code: 404,
                    desc: "Chauffeur introuvable",
                    json: { error: "Driver not found", code: "NOT_FOUND" }
                }
            ]
        },
        {
            method: 'GET',
            path: '/compliance/details/{driverId}',
            summary: "Récupérer le Jumeau Numérique",
            description: "Récupère les données certifiées par le syndicat (Nom légal, Photo officielle, Véhicule déclaré) pour affichage client.",
            params: [
                { name: 'driverId', type: 'uuid', required: true, desc: "L'identifiant unique du chauffeur." }
            ],
            responses: [
                {
                    code: 200,
                    desc: "OK - Profil trouvé",
                    json: { id: "driver-123", firstName: "Jean", lastName: "EKTO", photoUrl: "https://...", isVerified: true }
                }
            ]
        },
        {
            method: 'POST',
            path: '/compliance/feedback',
            summary: "Soumettre un avis ou signalement",
            description: "Permet de transmettre un feedback (Note, Commentaire, Incident grave) vers le dossier syndical.",
            body: [
                { name: 'driverId', type: 'uuid', required: true, desc: "ID du chauffeur concerné." },
                { name: 'rating', type: 'integer (1-5)', required: true, desc: "Note attribuée." },
                { name: 'severity', type: 'string', required: false, desc: "Niveau (LOW, MEDIUM, HIGH)." },
                { name: 'comment', type: 'string', required: false, desc: "Détails de l'incident." }
            ],
            responses: [
                {
                    code: 202,
                    desc: "Accepted - Traitement asynchrone",
                    json: { status: "ACCEPTED", ticketId: "tkt-998877" }
                }
            ]
        }
    ],
    "Syndicats": [
        {
            method: 'GET',
            path: '/syndicates',
            summary: "Lister les syndicats",
            description: "Récupère une liste paginée des syndicats enregistrés sur la plateforme.",
            params: [
                { name: 'page', type: 'integer', required: false, desc: "Numéro de page (défaut 0)." },
                { name: 'size', type: 'integer', required: false, desc: "Éléments par page (défaut 10)." }
            ],
            responses: [
                {
                    code: 200,
                    desc: "OK",
                    json: { content: [{ id: "syn-1", name: "Syndicat A" }], page: 0, totalPages: 5 }
                }
            ]
        }
    ]
};

// --- COMPOSANT MAIN ---
export default function ApiReferencePage() {
    const [activeTab, setActiveTab] = useState('curl'); // curl | node | python

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">

            {/* NAVBAR FIXE (Copie conforme des autres pages) */}
            <nav className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 z-50 flex items-center px-6 lg:px-8 justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <ShieldCheck size={18} />
                    </div>
                    <span className="font-bold text-white tracking-tight">UGate <span className="text-slate-600">Ref</span></span>
                </Link>
                <Link href="/docs" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
                    Retour Documentation
                </Link>
            </nav>

            <div className="pt-16 flex">

                {/* 1. SIDEBAR NAVIGATION (Sticky Left) */}
                <aside className="hidden lg:block w-64 fixed top-16 bottom-0 left-0 border-r border-white/5 bg-[#020617] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
                    {Object.entries(apiData).map(([category, endpoints]) => (
                        <div key={category} className="mb-8">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Layers size={12} /> {category}
                            </h3>
                            <ul className="space-y-1">
                                {endpoints.map((ep, i) => (
                                    <li key={i}>
                                        <a href={`#${ep.method}-${ep.path}`} className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-xs font-mono text-slate-400 hover:text-white truncate">
                                            <span className={`w-1.5 h-1.5 rounded-full ${ep.method === 'GET' ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
                                            {ep.path}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </aside>

                {/* 2. MAIN CONTENT & 3. CODE COLUMN */}
                <main className="lg:ml-64 w-full grid grid-cols-1 xl:grid-cols-2">

                    {/* COLUMN 2 : DESCRIPTIONS (Scrollable) */}
                    <div className="p-8 lg:p-12 xl:border-r border-white/5 min-h-screen">
                        <div className="mb-12">
                            <h1 className="text-4xl font-bold text-white mb-4">API Reference</h1>
                            <p className="text-slate-400 text-lg font-light leading-relaxed">
                                Bienvenue sur la référence technique complète de l'API UGate.
                                Toutes les réponses sont au format JSON. L'URL de base est <code className="text-white bg-white/10 px-1 py-0.5 rounded text-sm">https://api.ugate.io/v1</code>.
                            </p>
                        </div>

                        {Object.entries(apiData).map(([category, endpoints]) => (
                            <div key={category} className="mb-20">
                                <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">{category}</h2>

                                {endpoints.map((ep, idx) => (
                                    <div key={idx} id={`${ep.method}-${ep.path}`} className="mb-20 scroll-mt-24 group">
                                        {/* Header Endpoint */}
                                        <div className="flex items-start gap-4 mb-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        ep.method === 'GET' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    }`}>
                                        {ep.method}
                                    </span>
                                            <h3 className="font-mono text-lg text-white font-medium break-all">{ep.path}</h3>
                                        </div>

                                        <p className="text-slate-400 mb-8 leading-relaxed">{ep.description}</p>

                                        {/* TABLEAU PARAMETRES */}
                                        {(ep.params || ep.body) && (
                                            <div className="mb-8">
                                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                                                    {ep.body ? 'Body Parameters' : 'Query Parameters'}
                                                </h4>
                                                <div className="border-t border-white/10">
                                                    {[...(ep.params || []), ...(ep.body || [])].map((param, pIdx) => (
                                                        <div key={pIdx} className="py-4 border-b border-white/10 grid grid-cols-12 gap-4">
                                                            <div className="col-span-4 font-mono text-sm text-blue-300">
                                                                {param.name}
                                                                {param.required && <span className="ml-2 text-[10px] text-rose-500 font-bold uppercase">Required</span>}
                                                            </div>
                                                            <div className="col-span-8">
                                                                <div className="text-xs text-slate-500 font-mono mb-1">{param.type}</div>
                                                                <div className="text-sm text-slate-400">{param.desc}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* COLUMN 3 : CODE EXAMPLES (Sticky) */}
                    <div className="hidden xl:block bg-[#0B1121] border-l border-white/5 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto p-8 lg:p-12">
                        <div className="space-y-20">
                            {/* Un bloc vide pour l'intro */}
                            <div className="h-32"></div>

                            {Object.values(apiData).flat().map((ep, idx) => (
                                <div key={idx} className="mb-32">
                                    {/* Onglets Code */}
                                    <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-2">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-auto">Exemple de requête</span>
                                        <button className={`text-xs font-bold hover:text-white transition-colors ${activeTab === 'curl' ? 'text-white' : 'text-slate-600'}`} onClick={() => setActiveTab('curl')}>cURL</button>
                                        <button className={`text-xs font-bold hover:text-white transition-colors ${activeTab === 'node' ? 'text-white' : 'text-slate-600'}`} onClick={() => setActiveTab('node')}>Node.js</button>
                                    </div>

                                    <div className="bg-[#020617] rounded-xl border border-white/10 p-4 mb-6 relative group/code">
                                        <CopyButton text={`curl -X ${ep.method} https://api.ugate.io${ep.path}`} />
                                        <pre className="font-mono text-xs text-blue-100 overflow-x-auto">
                                    {activeTab === 'curl' && `curl -X ${ep.method} https://api.ugate.io/v1${ep.path} \\
  -H "Authorization: Bearer <token>"${ep.body ? ` \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(ep.responses[0].json, null, 2)}'` : ''}`}
                                            {activeTab === 'node' && `const response = await fetch('https://api.ugate.io/v1${ep.path}', {
  method: '${ep.method}',
  headers: { 'Authorization': 'Bearer <token>' }
});`}
                                </pre>
                                    </div>

                                    {/* Response Block */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Réponse</span>
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                            <span className="text-[10px] font-mono text-emerald-400 font-bold">{ep.responses[0].code}</span>
                                        </div>
                                    </div>

                                    <div className="bg-[#020617] rounded-xl border border-white/10 p-4 relative group/code">
                                        <CopyButton text={JSON.stringify(ep.responses[0].json, null, 2)} />
                                        <pre className="font-mono text-xs text-emerald-100/80 overflow-x-auto">
                                    {JSON.stringify(ep.responses[0].json, null, 2)}
                                </pre>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white opacity-0 group-hover/code:opacity-100 transition-all"
        >
            {copied ? <Check size={14} className="text-emerald-400"/> : <Copy size={14}/>}
        </button>
    )
}