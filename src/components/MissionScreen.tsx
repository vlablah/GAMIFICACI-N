import React from 'react';
import { ArrowRight, Shield, Target, FileSpreadsheet, Award, Lightbulb, Compass } from 'lucide-react';

interface MissionScreenProps {
  onStartFirstChallenge: () => void;
}

export const MissionScreen: React.FC<MissionScreenProps> = ({ onStartFirstChallenge }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
        {/* Mission Briefing Header */}
        <div className="border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-1">
            <Shield className="w-4 h-4" />
            <span>Asignación Oficial de Misión de Investigación</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100">
            Protocolo de Operación del Laboratorio
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Objetivo: Resolver y dictaminar los 5 expedientes energéticos asignados
          </p>
        </div>

        {/* Narrative & Objectives */}
        <div className="space-y-6 text-sm text-slate-300">
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              1. Tu Rol y Propósito Educativo
            </h2>
            <p className="text-xs leading-relaxed text-slate-300">
              Como docente en formación de la especialidad en Física, tu meta es <strong className="text-slate-100">interpretar y analizar situaciones reales aplicando el concepto de energía cinética</strong>. No se trata únicamente de calcular números: se espera que articules explicaciones rigurosas que conecten las fórmulas con el comportamiento de los cuerpos.
            </p>
          </div>

          {/* Sequence of 5 Challenges */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-400" />
              2. Arquitectura de los 5 Expedientes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-mono text-blue-400 font-bold block mb-0.5">Expediente 1 (Introductorio)</span>
                <span>Cálculo directo de Ec = ½mv² con andamiaje explícito para calibración de variables.</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-mono text-indigo-400 font-bold block mb-0.5">Expediente 2 (Elección de Ruta)</span>
                <span>Teorema Trabajo-Energía (W_neto = ΔEc). Elige entre frenado disipativo o aceleración por empuje.</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-mono text-amber-400 font-bold block mb-0.5">Expediente 3 (Elección de Ruta)</span>
                <span>Conservación de la energía mecánica (Emec = cte). Elige entre caída libre vertical o descenso curvo.</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-mono text-emerald-400 font-bold block mb-0.5">Expediente 4 (Integración)</span>
                <span>Caso multi-fase acoplado: Impulso motor, ascenso en rampa y frenado horizontal final.</span>
              </div>
              <div className="sm:col-span-2 p-3 bg-blue-950/30 rounded-xl border border-blue-900/60">
                <span className="font-mono text-blue-300 font-bold block mb-0.5">Expediente 5 (Caso Integrador Central — Informe Pericial)</span>
                <span>Auditoría auténtica de seguridad en rampa de escape para camiones de carga con lecho de grava.</span>
              </div>
            </div>
          </div>

          {/* Rules & Transparency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
                <Lightbulb className="w-4 h-4" />
                <span>Pistas de Apoyo Transparentes</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Puedes solicitar pistas en cualquier momento. Se registran en tu expediente con fines de transparencia pedagógica, sin penalizaciones arbitrarias.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-400 font-bold font-mono">
                <Award className="w-4 h-4" />
                <span>Insignias de Reconocimiento</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Podrás obtener la insignia de <em>Dominio Conceptual</em> por la calidad de tus explicaciones y la de <em>Estratega</em> por la solidez de tus elecciones de ruta.
              </p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            id="btn-open-exp-1"
            onClick={onStartFirstChallenge}
            className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span>Abrir Expediente 1: El vehículo en movimiento</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
