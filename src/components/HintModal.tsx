import React, { useEffect } from 'react';
import { X, HelpCircle, Lightbulb, CheckCircle } from 'lucide-react';
import { RouteOption } from '../types';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hint: RouteOption['hint'];
  challengeNumber: number;
  routeTitle?: string;
  hintsUsedCount: number;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  hint,
  challengeNumber,
  routeTitle,
  hintsUsedCount,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-hint-title"
    >
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-950/80 rounded-lg text-amber-400 border border-amber-800">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-hint-title" className="text-base font-bold text-slate-100">
                Pista de Apoyo a la Investigación
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Expediente {challengeNumber} {routeTitle ? `• ${routeTitle}` : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Cerrar modal de pista"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-200">
          <div className="p-4 bg-amber-950/20 border border-amber-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              {hint.title}
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              {hint.content}
            </p>
          </div>

          {hint.guidingQuestions && hint.guidingQuestions.length > 0 && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                Preguntas Orientadoras para tu Análisis:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {hint.guidingQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold font-mono text-xs">0{idx + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-2 p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-400 font-mono">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Uso de apoyo transparente: Esta pista queda registrada en tu expediente ({hintsUsedCount} consultada(s)) sin penalización en tu progreso ni bloqueo de insignias.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Continuar con el expediente
          </button>
        </div>
      </div>
    </div>
  );
};
