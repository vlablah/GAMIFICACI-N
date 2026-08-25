import React from 'react';
import { Award, Compass, CheckCircle2, ShieldCheck, FileText, Printer, RotateCcw } from 'lucide-react';
import { LabSessionState, ChallengeSubmission } from '../types';

interface ClosingScreenProps {
  sessionState: LabSessionState;
  onViewDossier: () => void;
  onResetSession: () => void;
}

export const ClosingScreen: React.FC<ClosingScreenProps> = ({
  sessionState,
  onViewDossier,
  onResetSession,
}) => {
  const totalHints = (Object.values(sessionState.submissions) as (ChallengeSubmission | null)[]).reduce(
    (acc, sub) => acc + (sub?.hintsUsedCount || 0),
    0
  );

  const badgesCount =
    (sessionState.badges.conceptual_mastery.obtained ? 1 : 0) +
    (sessionState.badges.laboratory_strategist.obtained ? 1 : 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Culmination Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 rounded-3xl border border-blue-800/60 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-lg border border-emerald-400/40">
              <ShieldCheck className="w-8 h-8 text-emerald-100" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Dictamen Pericial Final Aprobado
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
                ¡Misión Completada con Éxito!
              </h1>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Consolidación Oficial en el Laboratorio de Análisis Energético
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="Imprimir informe de certificación pericial"
            >
              <Printer className="w-4 h-4 text-slate-300" />
              <span>Imprimir Certificación</span>
            </button>
          </div>
        </div>

        {/* Narrative Recognition */}
        <div className="space-y-4 text-sm text-slate-200">
          <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3 leading-relaxed">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Reconocimiento Pericial del Laboratorio
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Has concluido satisfactoriamente la investigación de los <strong className="text-slate-100">5 expedientes energéticos</strong>, culminando con el <strong className="text-blue-300">Informe Pericial del Expediente 5</strong> sobre la rampa de escape para transporte pesado.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Tus análisis han demostrado una articulación sólida de la fórmula de la energía cinética (<span className="font-mono text-blue-300">Ec = ½mv²</span>), el teorema del trabajo y la energía cinética (<span className="font-mono text-amber-300">W_neto = ΔEc</span>), y la conservación de la energía mecánica con fuerzas disipativas (<span className="font-mono text-indigo-300">ΔEmec = W_nc</span>).
            </p>
          </div>

          {/* Badges Earned Section */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
              Insignias Oficiales Otorgadas ({badgesCount}/2):
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Badge 1 */}
              <div
                className={`p-5 rounded-2xl border flex items-start gap-3.5 transition-all ${
                  sessionState.badges.conceptual_mastery.obtained
                    ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-950/30'
                    : 'bg-slate-950/50 border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`p-3 rounded-xl border shrink-0 ${
                    sessionState.badges.conceptual_mastery.obtained
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : 'bg-slate-800 text-slate-600 border-slate-700'
                  }`}
                >
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-100">
                      {sessionState.badges.conceptual_mastery.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 block font-semibold">
                    {sessionState.badges.conceptual_mastery.obtained ? '✓ Obtenida' : 'No alcanzada'}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sessionState.badges.conceptual_mastery.meaning}
                  </p>
                </div>
              </div>

              {/* Badge 2 */}
              <div
                className={`p-5 rounded-2xl border flex items-start gap-3.5 transition-all ${
                  sessionState.badges.laboratory_strategist.obtained
                    ? 'bg-indigo-950/30 border-indigo-500/60 shadow-lg shadow-indigo-950/30'
                    : 'bg-slate-950/50 border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`p-3 rounded-xl border shrink-0 ${
                    sessionState.badges.laboratory_strategist.obtained
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40'
                      : 'bg-slate-800 text-slate-600 border-slate-700'
                  }`}
                >
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-100">
                      {sessionState.badges.laboratory_strategist.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-400 block font-semibold">
                    {sessionState.badges.laboratory_strategist.obtained ? '✓ Obtenida' : 'No alcanzada'}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sessionState.badges.laboratory_strategist.meaning}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dossier Statistics */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Resumen de Métricas de la Investigación:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Expedientes</span>
                <span className="text-emerald-400 font-bold text-base mt-1 block">5 / 5 Cerrados</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Rutas Elegidas</span>
                <span className="text-indigo-400 font-bold text-base mt-1 block">
                  {sessionState.submissions[2]?.selectedRoute && sessionState.submissions[3]?.selectedRoute
                    ? `Rutas ${sessionState.submissions[2]?.selectedRoute} & ${sessionState.submissions[3]?.selectedRoute}`
                    : '2 Completadas'}
                </span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Pistas Usadas</span>
                <span className="text-amber-400 font-bold text-base mt-1 block">{totalHints}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Insignias</span>
                <span className="text-blue-400 font-bold text-base mt-1 block">{badgesCount} de 2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={onResetSession}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Iniciar Nueva Sesión de Investigación</span>
          </button>

          <button
            id="btn-view-final-dossier"
            onClick={onViewDossier}
            className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <FileText className="w-4 h-4" />
            <span>Consultar Expediente Pericial Completo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
