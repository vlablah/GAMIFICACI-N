import React from 'react';
import { BookOpen, Award, FileText, RotateCcw, ShieldCheck } from 'lucide-react';
import { ChallengeId, LabSessionState } from '../types';

interface HeaderProps {
  sessionState: LabSessionState;
  onOpenFormulas: () => void;
  onOpenBadges: () => void;
  onOpenDossier: () => void;
  onOpenReset: () => void;
  onGoToActiveChallenge: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  sessionState,
  onOpenFormulas,
  onOpenBadges,
  onOpenDossier,
  onOpenReset,
  onGoToActiveChallenge,
}) => {
  const closedCount = Object.values(sessionState.challengeStatuses).filter(s => s === 'closed').length;
  const badgesCount = (sessionState.badges.conceptual_mastery.obtained ? 1 : 0) +
                      (sessionState.badges.laboratory_strategist.obtained ? 1 : 0);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onGoToActiveChallenge}
            className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            title="Ir al espacio de trabajo del laboratorio"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-sm border border-blue-400/30">
              <ShieldCheck className="w-5 h-5 text-blue-100" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-slate-100 tracking-tight flex items-center gap-2">
                Laboratorio de Análisis Energético
                <span className="hidden sm:inline-flex text-[11px] font-mono font-medium px-2 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-800 rounded">
                  Física Mecánica
                </span>
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                <span>Rol: Investigador/a en formación</span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-slate-300">Expedientes: {closedCount}/5 cerrados</span>
              </p>
            </div>
          </button>
        </div>

        {/* Right Tools & Navigation */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Formula Reference Button */}
          <button
            id="btn-formulas"
            onClick={onOpenFormulas}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Abrir formulario y constantes de física"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">Formulario</span>
          </button>

          {/* Badges Button */}
          <button
            id="btn-badges"
            onClick={onOpenBadges}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label={`Insignias obtenidas: ${badgesCount} de 2`}
          >
            <Award className={`w-3.5 h-3.5 ${badgesCount > 0 ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>Insignias</span>
            <span className="font-mono text-[11px] px-1.5 py-0.2 bg-slate-900 text-amber-300 rounded font-semibold border border-slate-700">
              {badgesCount}/2
            </span>
          </button>

          {/* Dossier Summary Button */}
          <button
            id="btn-dossier"
            onClick={onOpenDossier}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Ver expediente completo del laboratorio"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Expediente General</span>
          </button>

          {/* Reset Experience Button */}
          <button
            id="btn-reset"
            onClick={onOpenReset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-red-300 hover:bg-red-950/40 border border-transparent hover:border-red-900 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            title="Reiniciar sesión de investigación"
            aria-label="Reiniciar sesión de investigación"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
