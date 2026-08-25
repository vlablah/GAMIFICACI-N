import React from 'react';
import { CheckCircle2, Lock, ArrowRight, Eye, HelpCircle, Award, Compass, Sparkles } from 'lucide-react';
import { ChallengeId, LabSessionState } from '../types';
import { CHALLENGES_DATA } from '../data/challengesData';

interface ProgressDossierProps {
  sessionState: LabSessionState;
  onSelectChallenge: (id: ChallengeId) => void;
  onViewClosedDetail: (id: ChallengeId) => void;
  onOpenBadges: () => void;
}

export const ProgressDossier: React.FC<ProgressDossierProps> = ({
  sessionState,
  onSelectChallenge,
  onViewClosedDetail,
  onOpenBadges,
}) => {
  const closedCount = Object.values(sessionState.challengeStatuses).filter(s => s === 'closed').length;
  const progressPercent = Math.round((closedCount / 5) * 100);

  return (
    <aside className="w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl flex flex-col gap-5">
      {/* Header & Overall progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Panel de Expedientes
          </span>
          <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-900/60">
            {closedCount}/5 Casos
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso general de expedientes cerrados"
          />
        </div>
      </div>

      {/* Expedientes list */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 px-1">
          Secuencia de Investigación
        </span>

        {CHALLENGES_DATA.map((challenge) => {
          const status = sessionState.challengeStatuses[challenge.id];
          const isCurrentActive = sessionState.currentChallengeId === challenge.id && sessionState.screen === 'lab_active';
          const submission = sessionState.submissions[challenge.id];
          const draft = sessionState.currentDrafts[challenge.id];
          const hintsCount = submission?.hintsUsedCount ?? draft?.hintsUsedCount ?? 0;

          return (
            <div
              key={challenge.id}
              className={`rounded-xl border p-3 transition-all ${
                isCurrentActive
                  ? 'bg-blue-950/40 border-blue-500/80 shadow-md ring-1 ring-blue-500/40'
                  : status === 'closed'
                  ? 'bg-slate-900/70 border-emerald-900/60 hover:border-emerald-700/80'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {status === 'closed' ? (
                    <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center justify-center shrink-0" title="Expediente cerrado">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  ) : status === 'active' ? (
                    <span className="w-6 h-6 rounded-full bg-blue-950 text-blue-400 border border-blue-600 flex items-center justify-center shrink-0 font-mono text-xs font-bold animate-pulse">
                      {challenge.id}
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-500 border border-slate-700 flex items-center justify-center shrink-0" title="Expediente bloqueado">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                  )}

                  <div>
                    <h2 className="text-xs sm:text-sm font-semibold text-slate-200">
                      {challenge.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                      {status === 'closed' && (
                        <span className="text-emerald-400 font-medium">● Estado: Cerrado</span>
                      )}
                      {status === 'active' && (
                        <span className="text-blue-400 font-medium font-mono">● Estado: En curso</span>
                      )}
                      {status === 'locked' && (
                        <span className="text-slate-500">● Estado: Bloqueado</span>
                      )}

                      {submission?.selectedRoute && (
                        <span className="font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded text-[10px]">
                          Ruta {submission.selectedRoute}
                        </span>
                      )}

                      {hintsCount > 0 && (
                        <span className="text-slate-400 flex items-center gap-0.5 text-[10px]" title="Pistas consultadas">
                          <HelpCircle className="w-3 h-3 text-amber-400/80" />
                          {hintsCount} {hintsCount === 1 ? 'pista' : 'pistas'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="shrink-0 pt-0.5">
                  {status === 'active' && (
                    <button
                      onClick={() => onSelectChallenge(challenge.id)}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      aria-label={`Continuar investigando ${challenge.title}`}
                    >
                      <span>Investigar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  {status === 'closed' && (
                    <button
                      onClick={() => onViewClosedDetail(challenge.id)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                      title="Consultar análisis registrado en este expediente"
                      aria-label={`Ver registro del ${challenge.title}`}
                    >
                      <Eye className="w-3 h-3 text-emerald-400" />
                      <span className="hidden sm:inline">Consultar</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badges preview widget */}
      <div className="pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
            Reconocimientos Oficiales
          </span>
          <button
            onClick={onOpenBadges}
            className="text-xs text-blue-400 hover:text-blue-300 underline font-medium"
          >
            Ver criterios
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Badge 1 */}
          <div
            onClick={onOpenBadges}
            className={`p-2.5 rounded-xl border flex flex-col gap-1 cursor-pointer transition-all ${
              sessionState.badges.conceptual_mastery.obtained
                ? 'bg-amber-950/30 border-amber-500/60 text-amber-200'
                : 'bg-slate-950/40 border-slate-800 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Award className={`w-4 h-4 ${sessionState.badges.conceptual_mastery.obtained ? 'text-amber-400' : 'text-slate-600'}`} />
              <span className="text-[11px] font-bold truncate">Dominio Conceptual</span>
            </div>
            <span className="text-[10px] leading-tight text-slate-400 line-clamp-2">
              {sessionState.badges.conceptual_mastery.obtained
                ? '✓ Obtenida por solidez física'
                : 'Pendiente de evaluación'}
            </span>
          </div>

          {/* Badge 2 */}
          <div
            onClick={onOpenBadges}
            className={`p-2.5 rounded-xl border flex flex-col gap-1 cursor-pointer transition-all ${
              sessionState.badges.laboratory_strategist.obtained
                ? 'bg-indigo-950/30 border-indigo-500/60 text-indigo-200'
                : 'bg-slate-950/40 border-slate-800 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Compass className={`w-4 h-4 ${sessionState.badges.laboratory_strategist.obtained ? 'text-indigo-400' : 'text-slate-600'}`} />
              <span className="text-[11px] font-bold truncate">Estratega del Lab</span>
            </div>
            <span className="text-[10px] leading-tight text-slate-400 line-clamp-2">
              {sessionState.badges.laboratory_strategist.obtained
                ? '✓ Obtenida por decisiones'
                : 'Pendiente de justificación'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
