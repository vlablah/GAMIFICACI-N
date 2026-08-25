import React from 'react';
import { FileText, Award, Compass, CheckCircle2, Lock, ArrowLeft, Printer, Sparkles, HelpCircle } from 'lucide-react';
import { LabSessionState, ChallengeId } from '../types';
import { CHALLENGES_DATA } from '../data/challengesData';

interface DossierSummaryViewProps {
  sessionState: LabSessionState;
  onBackToLab: () => void;
  onSelectChallenge: (id: ChallengeId) => void;
}

export const DossierSummaryView: React.FC<DossierSummaryViewProps> = ({
  sessionState,
  onBackToLab,
  onSelectChallenge,
}) => {
  const closedCount = Object.values(sessionState.challengeStatuses).filter(s => s === 'closed').length;
  const badgesCount = (sessionState.badges.conceptual_mastery.obtained ? 1 : 0) +
                      (sessionState.badges.laboratory_strategist.obtained ? 1 : 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Dossier Header */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Expediente Pericial Consolidado</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100">
            Registro General del Laboratorio de Análisis Energético
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Estado global: {closedCount} de 5 expedientes cerrados • {badgesCount} de 2 insignias oficiales obtenidas
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
            title="Imprimir o guardar expediente en PDF"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span>Imprimir / Guardar</span>
          </button>

          <button
            onClick={onBackToLab}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Laboratorio</span>
          </button>
        </div>
      </div>

      {/* Badges Summary Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Insignias de Reconocimiento Evaluadas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Badge 1 */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              sessionState.badges.conceptual_mastery.obtained
                ? 'bg-amber-950/30 border-amber-500/60'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div
              className={`p-2.5 rounded-xl border shrink-0 ${
                sessionState.badges.conceptual_mastery.obtained
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                  : 'bg-slate-800 text-slate-600 border-slate-700'
              }`}
            >
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-100">
                  {sessionState.badges.conceptual_mastery.name}
                </h3>
                {sessionState.badges.conceptual_mastery.obtained && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Obtenida
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {sessionState.badges.conceptual_mastery.meaning}
              </p>
            </div>
          </div>

          {/* Badge 2 */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              sessionState.badges.laboratory_strategist.obtained
                ? 'bg-indigo-950/30 border-indigo-500/60'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div
              className={`p-2.5 rounded-xl border shrink-0 ${
                sessionState.badges.laboratory_strategist.obtained
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40'
                  : 'bg-slate-800 text-slate-600 border-slate-700'
              }`}
            >
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-100">
                  {sessionState.badges.laboratory_strategist.name}
                </h3>
                {sessionState.badges.laboratory_strategist.obtained && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Obtenida
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {sessionState.badges.laboratory_strategist.meaning}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case-by-Case Dossier Record */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
          Desglose de Evidencias por Expediente
        </h2>

        {CHALLENGES_DATA.map((challenge) => {
          const status = sessionState.challengeStatuses[challenge.id];
          const submission = sessionState.submissions[challenge.id];

          return (
            <div
              key={challenge.id}
              className={`bg-slate-900/90 rounded-2xl border p-5 sm:p-6 shadow-xl space-y-4 ${
                status === 'closed'
                  ? 'border-emerald-900/60'
                  : status === 'active'
                  ? 'border-blue-900/80'
                  : 'border-slate-800/80 opacity-70'
              }`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  {status === 'closed' ? (
                    <span className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  ) : status === 'active' ? (
                    <span className="w-7 h-7 rounded-lg bg-blue-950 text-blue-400 border border-blue-600 flex items-center justify-center font-mono font-bold text-xs">
                      {challenge.id}
                    </span>
                  ) : (
                    <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-500 border border-slate-700 flex items-center justify-center">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                  )}

                  <div>
                    <h3 className="text-sm font-bold text-slate-100">
                      {challenge.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      Contenido: {challenge.relatedContent}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                      status === 'closed'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : status === 'active'
                        ? 'bg-blue-950 text-blue-300 border-blue-800'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {status === 'closed' ? 'Expediente Cerrado' : status === 'active' ? 'En Investigación Activa' : 'Bloqueado'}
                  </span>

                  {status === 'active' && (
                    <button
                      onClick={() => {
                        onSelectChallenge(challenge.id);
                        onBackToLab();
                      }}
                      className="px-2.5 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500"
                    >
                      Continuar Caso
                    </button>
                  )}
                </div>
              </div>

              {/* If closed, show complete archived response */}
              {status === 'closed' && submission ? (
                <div className="space-y-4 text-xs">
                  {submission.selectedRoute && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="font-mono text-indigo-400 font-bold flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Ruta Investigada: Ruta {submission.selectedRoute}</span>
                      </div>
                      {submission.routeJustification && (
                        <p className="text-slate-300 italic font-serif mt-0.5">
                          "{submission.routeJustification}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Calculations */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(submission.calculationValues).map(([key, val]) => (
                      <div key={key} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex flex-col justify-center">
                        <span className="text-slate-400 text-[10px] font-mono">{key}</span>
                        <span className="font-mono font-bold text-emerald-400 mt-0.5">{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Explanation text */}
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider block">
                      Análisis y Argumentación Física Registrada:
                    </span>
                    <p className="text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                      {submission.explanationText}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                    <span>Hora de dictamen: {submission.submittedAt}</span>
                    <span>Pistas utilizadas: {submission.hintsUsedCount}</span>
                    <span>Intentos requeridos: {submission.attemptsCount}</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 font-mono py-2">
                  {status === 'active'
                    ? 'El expediente está abierto y en proceso de análisis por el investigador/a.'
                    : 'Este expediente se desbloqueará una vez cerrado el reto precedente.'}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
