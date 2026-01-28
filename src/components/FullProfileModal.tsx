'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Maximize2, ChevronRight, UserSquare2, CarFront, ShieldCheck, ScanLine, ZoomIn } from 'lucide-react';
import { OfficialProfile } from '../lib/type';
import Image from 'next/image';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    profile: OfficialProfile;
}

export default function FullProfileModal({ isOpen, onClose, profile }: Props) {
    // État pour gérer l'image actuellement ouverte en grand (Lightbox)
    const [lightboxImage, setLightboxImage] = useState<{url: string, title: string} | null>(null);

    if (!isOpen) return null;

    return (
        <>
            <AnimatePresence>
                {/* 1. OVERLAY PRINCIPAL (Plus sombre et plus flou pour le focus) */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-[#020617]/80 backdrop-blur-md z-[50] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* 2. LA MODALE */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-slate-50 w-full max-w-6xl h-[85vh] rounded-[24px] shadow-2xl overflow-hidden flex flex-col border border-white/10 relative"
                    >
                        {/* --- HEADER STYLE "PASSPORT" (Bleu Nuit) --- */}
                        <div className="relative bg-[#0f172a] px-8 py-6 border-b border-slate-800 flex justify-between items-center z-10 overflow-hidden">
                            {/* Déco de fond header */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-slate-950"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>

                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-blue-400">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                        Dossier Numérique
                                        <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] border border-blue-500/30 uppercase tracking-widest font-bold">Certifié</span>
                                    </h2>
                                    <p className="text-slate-400 text-sm mt-0.5 font-light">
                                        Documents officiels de <span className="text-white font-medium">{profile.firstName} {profile.lastName}</span>
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="relative z-10 p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-colors text-slate-300 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* BODY SCROLLABLE */}
                        <div className="overflow-y-auto flex-1 p-6 md:p-10 scrollbar-thin scrollbar-thumb-slate-200">

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

                                {/* --- CARTE 1 : IDENTITÉ (CNI) --- */}
                                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 relative overflow-hidden group hover:border-blue-200 transition-colors">
                                    {/* En-tête de section */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                                <UserSquare2 size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">Identité Nationale</h3>
                                                <p className="text-xs text-slate-500">Preuve de citoyenneté</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">N° CNI</p>
                                            <p className="font-mono text-sm font-bold text-slate-700">{profile.cniNumber}</p>
                                        </div>
                                    </div>

                                    {/* Grille Documents */}
                                    <div className="space-y-4">
                                        <DocThumbnail
                                            label="Carte d'Identité (Recto)"
                                            url={profile.cniRectoUrl}
                                            onClick={() => setLightboxImage({url: profile.cniRectoUrl!, title: "CNI - Recto"})}
                                        />
                                        <div className="w-full h-px bg-slate-100"></div>
                                        <DocThumbnail
                                            label="Carte d'Identité (Verso)"
                                            url={profile.cniVersoUrl}
                                            onClick={() => setLightboxImage({url: profile.cniVersoUrl!, title: "CNI - Verso"})}
                                        />
                                    </div>
                                </section>

                                {/* --- CARTE 2 : PROFESSIONNEL (PERMIS) --- */}
                                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 relative overflow-hidden group hover:border-emerald-200 transition-colors">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                                <CarFront size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">Permis de Conduire</h3>
                                                <p className="text-xs text-slate-500">Catégorie B - Transport</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">N° Permis</p>
                                            <p className="font-mono text-sm font-bold text-slate-700">{profile.licenseNumber}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <DocThumbnail
                                            label="Permis de Conduire (Recto)"
                                            url={profile.licenseRectoUrl}
                                            onClick={() => setLightboxImage({url: profile.licenseRectoUrl!, title: "Permis - Recto"})}
                                        />
                                        <div className="w-full h-px bg-slate-100"></div>
                                        <DocThumbnail
                                            label="Permis de Conduire (Verso)"
                                            url={profile.licenseVersoUrl}
                                            onClick={() => setLightboxImage({url: profile.licenseVersoUrl!, title: "Permis - Verso"})}
                                        />
                                    </div>
                                </section>

                                {/* --- CARTE 3 : CV (Large) --- */}
                                {profile.cvUrl && (
                                    <section className="lg:col-span-2">
                                        <a
                                            href={profile.cvUrl}
                                            target="_blank"
                                            className="group flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    <FileText size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-lg">Curriculum Vitae Complet</p>
                                                    <p className="text-sm text-slate-500">Document PDF • Vérifié par le syndicat</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600 font-bold text-sm bg-slate-50 px-5 py-2.5 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                <Download size={18} />
                                                Télécharger
                                            </div>
                                        </a>
                                    </section>
                                )}
                            </div>

                            {/* Footer légal de la modale */}
                            <div className="mt-10 text-center text-slate-400 text-xs">
                                <p>Ces documents sont confidentiels et destinés uniquement à la vérification de conformité.</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* ========================================================
                3. LIGHTBOX PRO (Visionneuse Améliorée)
               ======================================================== */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/98 z-[100] flex flex-col items-center justify-center p-4 backdrop-blur-xl"
                        onClick={() => setLightboxImage(null)}
                    >
                        {/* Toolbar Lightbox */}
                        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
                            <div className="text-white">
                                <p className="text-sm font-bold opacity-90">{lightboxImage.title}</p>
                                <p className="text-xs opacity-50 uppercase tracking-widest">Visionneuse Haute Définition</p>
                            </div>
                            <div className="flex gap-4">
                                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors" title="Zoom">
                                    <ZoomIn size={20} />
                                </button>
                                <button
                                    className="p-2 bg-white/10 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-white transition-colors"
                                    onClick={() => setLightboxImage(null)}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Image Contained */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full h-full max-w-7xl flex items-center justify-center py-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={lightboxImage.url}
                                alt="Document Fullscreen"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        <div className="absolute bottom-8 px-4 py-2 bg-white/10 rounded-full text-white/60 text-xs font-medium backdrop-blur-sm">
                            Cliquez n'importe où pour fermer
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// COMPOSANT VIGNETTE (THUMBNAIL) RAFFINÉ
function DocThumbnail({ label, url, onClick }: { label: string, url?: string, onClick: () => void }) {
    return (
        <div className="flex items-center gap-4 group cursor-pointer" onClick={onClick}>
            {/* Zone Image */}
            <div className="relative w-32 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-blue-300">
                {url ? (
                    <>
                        <Image src={url} alt={label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        {/* Overlay Scan */}
                        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[1px]">
                            <ScanLine size={20} />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300 bg-slate-50">
                        <FileText size={20} className="mb-1 opacity-50"/>
                        <span className="text-[9px] uppercase font-bold tracking-wide">Vide</span>
                    </div>
                )}
            </div>

            {/* Zone Texte */}
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-700 text-sm truncate">{label}</h4>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 group-hover:text-blue-600 transition-colors">
                    <Maximize2 size={12} />
                    <span className="font-medium">Agrandir le document</span>
                </div>
            </div>

            {/* Chevron discret */}
            <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </div>
    )
}