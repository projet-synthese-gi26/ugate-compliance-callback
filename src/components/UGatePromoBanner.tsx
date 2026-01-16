'use client';

import { ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

export default function UGateBanner() {
    return (
        <a
            href="https://ugate.yowyob.com"
            target="_blank"
            className="block w-full mt-8 bg-ugate-900 text-white rounded-xl overflow-hidden shadow-lg border border-ugate-800 group transition-all hover:shadow-2xl hover:border-ugate-600"
        >
            <div className="relative px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Fond décoratif discret */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-ugate-600 rounded-full blur-[100px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

                <div className="flex items-start gap-5 relative z-10">
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 shrink-0">
                        <ShieldCheck size={32} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">Plateforme YowYob UGate</h3>
                        <p className="text-ugate-200 text-sm leading-relaxed max-w-md">
                            L'outil de référence pour la gestion syndicale. <br/>
                            Assurances, Cotisations et Conformité en temps réel.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-2 px-6 py-3 bg-white text-ugate-950 font-bold rounded-lg group-hover:bg-ugate-50 transition-colors shrink-0">
                    Accéder à l'espace membre
                    <ArrowRight size={18} />
                </div>
            </div>
        </a>
    );
}