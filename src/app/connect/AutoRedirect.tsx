'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
    to: string;
}

export default function AutoRedirect({ to }: Props) {
    const [timeLeft, setTimeLeft] = useState(3);

    useEffect(() => {
        // Compte à rebours
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // Redirection effective
        const redirectTimer = setTimeout(() => {
            // On utilise window.location pour sortir du domaine Next.js vers l'app externe
            window.location.href = to;
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(redirectTimer);
        };
    }, [to]);

    return (
        <div className="mt-8 flex flex-col items-center animate-pulse">
            <div className="flex items-center gap-2 text-ugate-600 font-semibold mb-1">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Redirection sécurisée...</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
                Retour vers l'application partenaire dans {timeLeft}s
            </p>

            {/* Barre de progression visuelle */}
            <div className="w-48 h-1 bg-slate-200 rounded-full mt-3 overflow-hidden">
                <div
                    className="h-full bg-ugate-500 transition-all duration-1000 ease-linear"
                    style={{ width: `${((3 - timeLeft) / 3) * 100}%` }}
                ></div>
            </div>
        </div>
    );
}