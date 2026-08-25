import React, { useEffect } from 'react';
import { X, CheckCircle2, FileText, Compass, Sparkles, HelpCircle } from 'lucide-react';
import { ChallengeId, ChallengeSubmission } from '../types';
import { CHALLENGES_DATA } from '../data/challengesData';

interface DossierDetailModalProps {
  challengeId?: ChallengeId;
  submission: ChallengeSubmission | null;
  onClose: () => void;
}

export const DossierDetailModal: React.FC<DossierDetailModalProps> = ({
  challengeId,
  submission,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (challengeId) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [challengeId, onClose]);

  if (!challengeId || !submission) return null;

  const challenge = CHALLENGES_DATA.find(c => c.id === challengeId);
  if (!challenge) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dossier-detail-title"
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-950/80 rounded-lg text-emerald-400 border border-emerald-800">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="modal-dossier-detail-title" className="text-base font-bold text-slate-100">
                  {challenge.title}
                </h2>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Expediente Cerrado
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Registro pericial archivado en el expediente del laboratorio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label="Cerrar vista de expediente"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm">
          {/* Route info if applicable */}
          {submission.selectedRoute && (
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 mb-1">
                <Compass className="w-4 h-4" />
                <span>Ruta de Investigación Seleccionada: Ruta {submission.selectedRoute}</span>
              </div>
              {submission.routeJustification && (
                <div className="text-xs text-slate-300 mt-1">
                  <span className="text-slate-500 font-semibold block text-[10px] font-mono uppercase">
                    Justificación Estratégica:
                  </span>
                  <p className="italic text-slate-200 mt-0.5 font-serif text-sm">
                    "{submission.routeJustification}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Calculations Submitted */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Cálculos Cuantitativos Registrados:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(submission.calculationValues).map(([key, val]) => (
                <div key={key} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400 font-mono">{key}:</span>
                  <span className="font-mono font-bold text-emerald-400">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Written Physics Explanation */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Análisis y Argumentación Física Registrada:
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Evidencia de Aprendizaje Principal
              </span>
            </div>
            <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
              {submission.explanationText}
            </div>
          </div>

          {/* Quality & Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              Calidad física verificada
            </span>
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              Pistas consultadas: {submission.hintsUsedCount}
            </span>
            <span>Fecha de cierre: {submission.submittedAt}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Cerrar expediente
          </button>
        </div>
      </div>
    </div>
  );
};
