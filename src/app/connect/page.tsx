import { checkCompliance, getOfficialProfile } from '@/lib/api';

import Link from 'next/link';
import { ShieldCheck, Lock } from 'lucide-react';
import ComplianceDashboard from "@/components/ComplianceCard";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ConnectPage({ searchParams }: Props) {
    const params = await searchParams;

    const driverId = params.driverId as string;
    const redirectUrl = params.redirectUrl as string;
    // 🔑 Récupération du token transmis
    const authToken = params.authToken as string;

    if (!driverId) return <ErrorState message="Paramètre ID manquant." />;

    // Appel API AVEC le token
    const [profile, compliance] = await Promise.all([
        getOfficialProfile(driverId, authToken),
        checkCompliance(driverId, authToken)
    ]);

    // Gestion d'erreur améliorée
    if (!profile || !compliance) {
        if (authToken) {
            return <ErrorState message="Accès refusé ou dossier introuvable. Vérifiez que votre session Admin est active." />;
        }
        return <ErrorState message="Dossier introuvable." />;
    }

    return (
        <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">

            {/* HEADER BACKGROUND : DEEP BLUE TO BLACK */}
            <div className="h-[50vh] w-full relative overflow-hidden bg-[#172554]">
                <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-700/20 rounded-full blur-[120px]"></div>

                {/* Orbes */}
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/40 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                {/* NAVBAR */}
                <div className="max-w-7xl mx-auto px-6 pt-10 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-lg ring-1 ring-white/10">
                            <ShieldCheck size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight leading-none">UGate<span className="text-blue-300">Connect</span></h1>
                            <p className="text-[10px] text-blue-200/80 uppercase tracking-[0.2em] font-bold mt-1">Official Verification</p>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#172554]/50 border border-blue-400/30 backdrop-blur-md text-[10px] text-blue-100 font-medium tracking-wide shadow-sm">
                        <Lock size={12} className="text-blue-300" />
                        <span>End-to-End Encrypted</span>
                    </div>
                </div>

                {/* TITRE HERO */}
                <div className="relative z-10 text-center mt-12 max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3 drop-shadow-md">
                        Portail de Conformité
                    </h2>
                    <p className="text-blue-100/70 text-base md:text-lg font-light leading-relaxed">
                        Vérification en temps réel de l'identité et des accréditations syndicales.
                    </p>
                </div>
            </div>

            {/* DASHBOARD */}
            <ComplianceDashboard
                profile={profile}
                compliance={compliance}
                redirectUrl={redirectUrl}
            />

            {/* FOOTER */}
            <div className="max-w-5xl mx-auto mt-16 pb-12 flex flex-col items-center relative z-10">
                <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Sécurisé par YowYob UGate</p>
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                </div>
            </div>

        </main>
    );
}

function ErrorState({ message }: { message: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="p-8 bg-white rounded-2xl shadow-xl border border-red-100 text-center max-w-sm">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={24} className="text-red-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Erreur système</h3>
                <p className="text-slate-500 text-sm mb-6">{message}</p>
                <Link href="/" className="text-xs font-bold text-slate-900 bg-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
                    Retour
                </Link>
            </div>
        </div>
    )
}