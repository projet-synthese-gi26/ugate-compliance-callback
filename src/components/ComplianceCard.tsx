'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { OfficialProfile, ComplianceResponse } from '@/lib/type';
import Image from 'next/image';
import {
    BadgeCheck, Eye, ShieldCheck, AlertTriangle, HeartPulse,
    Car, Scale, Store, AlertOctagon, ExternalLink,
    Check, X, ArrowRight
} from 'lucide-react';
import FullProfileModal from './FullProfileModal';

interface Props {
    profile: OfficialProfile;
    compliance: ComplianceResponse;
    redirectUrl?: string; // On récupère l'URL pour le bouton manuel
}

export default function ComplianceDashboard({ profile, compliance, redirectUrl }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { details } = compliance;

    const isAuthorized = compliance.globalStatus === 'AUTHORIZED';
    const isRestricted = compliance.globalStatus === 'RESTRICTED';

    // --- PALETTE "JEWEL TONES" (Premium & Subtil) ---
    const theme = isAuthorized ? {
        // Teal / Emerald profond (Confiance, Sérénité)
        headerGradient: 'from-teal-900 to-slate-900',
        accentColor: 'text-teal-600',
        iconBg: 'bg-teal-500/10',
        borderColor: 'border-teal-100',
        iconMain: <ShieldCheck size={32} className="text-teal-400" />,
        label: 'Certifié Conforme',
        desc: 'L\'identité et les accréditations sont valides.'
    } : isRestricted ? {
        // Ocre / Bronze (Avertissement élégant)
        headerGradient: 'from-amber-900 to-slate-900',
        accentColor: 'text-amber-600',
        iconBg: 'bg-amber-500/10',
        borderColor: 'border-amber-100',
        iconMain: <Store size={32} className="text-amber-400" />,
        label: 'Limitation Syndicale',
        desc: 'Le syndicat est en cours de régularisation.'
    } : {
        // Rose / Cramoisi (Urgence maîtrisée)
        headerGradient: 'from-rose-950 to-slate-900',
        accentColor: 'text-rose-600',
        iconBg: 'bg-rose-500/10',
        borderColor: 'border-rose-100',
        iconMain: <AlertOctagon size={32} className="text-rose-500" />,
        label: 'Non Conforme',
        desc: 'Des bloquants critiques ont été détectés.'
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-6xl mx-auto relative z-20 mt-[-100px] px-4"
            >
                <div className="bg-white rounded-[24px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col lg:flex-row overflow-hidden ring-1 ring-slate-900/5">


                    <div className="w-full lg:w-[360px] bg-slate-50/30 p-8 flex flex-col items-center text-center border-r border-slate-100">

                        {/* Avatar */}
                        <div className="relative mb-5 group cursor-pointer" onClick={() => setIsModalOpen(true)}>
                            <div className="relative w-32 h-32 rounded-full p-1 bg-white border border-slate-100 shadow-lg">
                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                    <Image
                                        src={profile.photoUrl || `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}`}
                                        alt="Profile"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            {profile.isVerified && (
                                <div className="absolute bottom-1 right-1 bg-blue-600 text-white p-1.5 rounded-full ring-4 ring-slate-50 shadow-sm z-10">
                                    <BadgeCheck size={18} />
                                </div>
                            )}
                        </div>

                        <h1 className="text-xl font-bold text-slate-900">{profile.firstName} {profile.lastName}</h1>
                        <p className="text-xs text-slate-400 font-medium mb-6 mt-1 uppercase tracking-wider">Chauffeur Pro</p>

                        {/* ID Chips */}
                        <div className="flex flex-wrap justify-center gap-2 w-full mb-8">
                            <div className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-xs font-mono text-slate-600 shadow-sm">
                                Permis: {profile.licenseNumber}
                            </div>
                            <div className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-xs font-mono text-slate-600 shadow-sm">
                                CNI: {profile.cniNumber}
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-auto w-full py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-semibold text-sm hover:border-slate-300 hover:shadow-md transition-all flex items-center justify-center gap-2"
                        >
                            <Eye size={16} className="text-slate-400"/>
                            Voir dossier complet
                        </button>
                    </div>


                    <div className="flex-1 flex flex-col bg-white">

                        {/* 1. HEADER STATUT (Gradient sombre élégant) */}
                        <div className={`relative p-8 flex justify-between items-center bg-gradient-to-r ${theme.headerGradient} overflow-hidden`}>
                            {/* Texture noise subtile */}
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

                            <div className="relative z-10 flex items-center gap-5">
                                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 shadow-xl">
                                    {theme.iconMain}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">{theme.label}</h2>
                                    <p className="text-slate-300/80 text-sm font-light mt-0.5">{theme.desc}</p>
                                </div>
                            </div>

                            {/* Statut Live */}
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
                                <div className={`w-1.5 h-1.5 rounded-full ${isAuthorized ? 'bg-teal-400' : 'bg-rose-500'} animate-pulse`}></div>
                                <span className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Live Check</span>
                            </div>
                        </div>

                        {/* 2. GRID DETAILS (Clean Style) */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <CleanTile
                                label="Permis de Conduire"
                                isValid={details.licenseValid}
                                icon={<Car size={18}/>}
                                detail="Vérifié Ministère"
                                theme={theme}
                            />
                            <CleanTile
                                label="Assurance RC"
                                isValid={details.insuranceValid}
                                icon={<Scale size={18}/>}
                                detail={details.insuranceValid ? "Valide (AXA)" : "Document manquant"}
                                theme={theme}
                            />
                            <CleanTile
                                label="Statut Syndical"
                                isValid={details.membershipCurrent}
                                icon={<Store size={18}/>}
                                detail={isRestricted ? "Syndicat non agréé" : "Cotisation à jour"}
                                isWarning={isRestricted}
                                theme={theme}
                            />
                            <CleanTile
                                label="Aptitude Médicale"
                                isValid={details.medicalCheck}
                                icon={<HeartPulse size={18}/>}
                                detail="Visite médicale OK"
                                theme={theme}
                            />
                        </div>

                        {/* 3. FOOTER ACTION (Bouton Manuel) */}
                        <div className="p-8 pt-0 mt-auto">
                            <div className="h-px w-full bg-slate-100 mb-6"></div>

                            {isAuthorized ? (
                                // CAS SUCCÈS : Bouton de retour manuel
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <ShieldCheck size={16} />
                                        <span>Vérification terminée</span>
                                    </div>

                                    {redirectUrl && (
                                        <a
                                            href={`${redirectUrl}?status=valid&token=${compliance.syndicatDriverId}`}
                                            className="group flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5"
                                        >
                                            Continuer vers l'application
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                                        </a>
                                    )}
                                </div>
                            ) : (
                                // CAS ÉCHEC : Redirection UGate
                                <a href="https://ugate-frontend-bon.vercel.app/fr" target="_blank" className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 text-slate-700">
                                            <ExternalLink size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-slate-900 font-bold text-sm">Action Requise</h3>
                                            <p className="text-slate-500 text-xs">Mettre à jour le dossier sur UGate</p>
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                        Régulariser
                                    </div>
                                </a>
                            )}
                        </div>

                    </div>
                </div>
            </motion.div>

            <FullProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                profile={profile}
            />
        </>
    );
}


function CleanTile({ label, isValid, icon, detail, isWarning, theme }: any) {

    const statusColor = isValid ? 'text-teal-600' : isWarning ? 'text-amber-600' : 'text-rose-600';
    const statusBg = isValid ? 'bg-teal-50' : isWarning ? 'bg-amber-50' : 'bg-rose-50';

    return (
        <div className="flex items-start gap-4">
            {/* Icone dans un cercle doux */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${statusBg} ${statusColor}`}>
                {icon}
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</h4>
                    {/* Petite coche ou croix minimaliste */}
                    {isValid ? (
                        <Check size={14} className="text-teal-500" />
                    ) : (
                        <X size={14} className="text-rose-400" />
                    )}
                </div>
                <p className={`text-sm font-semibold ${isValid ? 'text-slate-700' : isWarning ? 'text-amber-700' : 'text-rose-700'}`}>
                    {detail}
                </p>
            </div>
        </div>
    )
}