import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center gap-4">
                {/* Logo Animation */}
                <div className="relative">
                    <div className="absolute inset-0 bg-ugate-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
                    <div className="bg-white p-4 rounded-2xl shadow-lg relative">
                        <Loader2 className="h-8 w-8 text-ugate-600 animate-spin" />
                    </div>
                </div>

                <div className="text-center mt-4">
                    <h2 className="text-lg font-bold text-slate-900">Vérification UGate</h2>
                    <p className="text-slate-500 text-sm">Analyse de la conformité en cours...</p>
                </div>
            </div>
        </div>
    );
}