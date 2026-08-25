import React from 'react';
import { ShieldCheck, ArrowRight, Atom, CheckCircle, Compass, Award, BookOpen } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
        {/* Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg border border-blue-400/40">
              <ShieldCheck className="w-7 h-7 text-blue-100" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                Objeto de Aprendizaje Interactivo • Física Mecánica
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                Laboratorio de Análisis Energético
              </h1>
            </div>
          </div>
          <div className="text-right font-mono text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span>Licenciatura en Enseñanza y Aprendizaje</span>
            <span className="text-slate-600 block text-[11px]">Especialidad en Física</span>
          </div>
        </div>

        {/* Premise & Welcome */}
        <div className="space-y-4">
          <div className="bg-blue-950/30 border border-blue-900/50 rounded-2xl p-5 sm:p-6 space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-blue-300 flex items-center gap-2">
              <Atom className="w-5 h-5 text-blue-400" />
              Bienvenido/a al Equipo de Investigación Energética
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Te incorporas como <strong className="text-slate-100 font-semibold">investigador/a</strong> a nuestro laboratorio especializado en explicar y cuantificar fenómenos físicos de la vida cotidiana e industrial aplicando los principios de la <strong className="text-blue-300">energía cinética</strong>, el <strong className="text-amber-300">teorema del trabajo y la energía</strong>, y la <strong className="text-indigo-300">conservación de la energía mecánica</strong>.
            </p>
          </div>

          {/* Key Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center border border-blue-800">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-200 text-sm">5 Expedientes Progresivos</h3>
              <p className="text-slate-400 leading-relaxed">
                Avanza desde casos introductorios guiados hasta la redacción del dictamen pericial en el caso integrador auténtico.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center border border-indigo-800">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-200 text-sm">Autonomía y Rutas</h3>
              <p className="text-slate-400 leading-relaxed">
                Toma decisiones investigativas eligiendo entre rutas equivalentes en los casos de aplicación y justifica tu estrategia.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center border border-amber-800">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-200 text-sm">Evidencia de Aprendizaje</h3>
              <p className="text-slate-400 leading-relaxed">
                El avance se consolida mediante tu explicación y razonamiento físico articulado, más allá del simple cálculo numérico.
              </p>
            </div>
          </div>
        </div>

        {/* Start Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Sesión estimada: 90 a 120 minutos • Navegación por teclado y apoyo inclusivo</span>
          </div>

          <button
            id="btn-start-lab"
            onClick={onStart}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span>Ingresar al Laboratorio y Recibir Misión</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
