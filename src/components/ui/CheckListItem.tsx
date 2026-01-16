import { CheckCircle2, XCircle } from 'lucide-react';

interface Props {
    label: string;
    isValid: boolean;
    delay?: number; // Pour l'animation en cascade
}

export default function CheckListItem({ label, isValid }: Props) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-3">
                {/* Indicateur visuel à gauche */}
                <div className={`w-1.5 h-1.5 rounded-full ${isValid ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
          {label}
        </span>
            </div>

            {isValid ? (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    <span>Valide</span>
                    <CheckCircle2 size={14} />
                </div>
            ) : (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    <span>Invalide</span>
                    <XCircle size={14} />
                </div>
            )}
        </div>
    );
}