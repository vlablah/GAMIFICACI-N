import React, { useEffect } from 'react';
import { X, Award, Compass, CheckCircle2, Clock } from 'lucide-react';
import { BadgeDefinition } from '../types';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: {
    conceptual_mastery: BadgeDefinition;
    laboratory_strategist: BadgeDefinition;
  };
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, onClose, badges }) => {
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

  const badgeList = [badges.conceptual_mastery, badges.laboratory_strategist];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-badges-title"
    >
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-950/80 rounded-lg text-amber-400 border border-amber-800">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-badges-title" className="text-base font-bold text-slate-100">
                Insignias Oficiales de Investigación
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Reconocimiento de Dominio Conceptual y Autonomía Estratégica
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Cerrar modal de insignias"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
            En el <strong className="text-slate-100">Laboratorio de Análisis Energético</strong>, los reconocimientos premian la calidad del razonamiento físico y la fundamentación de las decisiones de investigación, no la simple acumulación de puntos.
          </p>

          {badgeList.map((badge) => {
            const isConceptual = badge.id === 'conceptual_mastery';
            const Icon = isConceptual ? Award : Compass;

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all ${
                  badge.obtained
                    ? isConceptual
                      ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-950/20'
                      : 'bg-indigo-950/30 border-indigo-500/60 shadow-lg shadow-indigo-950/20'
                    : 'bg-slate-950/50 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-inner ${
                        badge.obtained
                          ? isConceptual
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                            : 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40'
                          : 'bg-slate-800 text-slate-600 border-slate-700'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                        {badge.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">
                        {badge.pedagogicalRecognition}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold font-mono flex items-center gap-1 shrink-0 ${
                      badge.obtained
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {badge.obtained ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Obtenida</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>En evaluación</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="space-y-2 mt-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] font-mono block">
                      Significado Pedagógico:
                    </span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">{badge.meaning}</p>
                  </div>

                  <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] font-mono block">
                      Condición Exacta de Obtención:
                    </span>
                    <p className="text-slate-300 font-mono text-[11px] mt-0.5">{badge.criteriaDescription}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Cerrar panel
          </button>
        </div>
      </div>
    </div>
  );
};
