import { ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

// Helper simple pour les classes conditionnelles (si tu n'as pas de fichier utils)
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

interface Props {
    status: 'AUTHORIZED' | 'REJECTED' | 'PENDING' | 'BANNED' | string;
}

export default function StatusBadge({ status }: Props) {
    const isAuthorized = status === 'AUTHORIZED';
    const isRejected = status === 'REJECTED' || status === 'BANNED';

    return (
        <div className={classNames(
            "flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md shadow-sm",
            isAuthorized
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700"
                : isRejected
                    ? "bg-red-500/10 border-red-500/20 text-red-700"
                    : "bg-blue-500/10 border-blue-500/20 text-blue-700"
        )}>
            {isAuthorized && <ShieldCheck size={16} className="text-emerald-600" />}
            {isRejected && <AlertTriangle size={16} className="text-red-600" />}
            {!isAuthorized && !isRejected && <Clock size={16} className="text-blue-600" />}

            <span className="text-xs font-bold tracking-wide uppercase">
        {isAuthorized ? 'Identité Certifiée' : isRejected ? 'Non Conforme' : 'En Analyse'}
      </span>
        </div>
    );
}