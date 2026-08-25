import React, { useEffect, useRef } from 'react';
import { X, BookOpen, Atom, HelpCircle, Layers } from 'lucide-react';

interface FormulaReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaReferenceModal: React.FC<FormulaReferenceModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="modal-formula-title">
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-950/80 rounded-lg text-blue-400 border border-blue-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-formula-title" className="text-base font-bold text-slate-100">
                Compendio de Fórmulas y Principios Energéticos
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Guía de referencia rápida del Laboratorio de Análisis Energético
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cerrar modal de fórmulas"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-200">
          {/* Card 1: Energía Cinética */}
          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-blue-400 flex items-center gap-1.5">
                <Atom className="w-4 h-4" />
                1. Energía Cinética Traslacional
              </h3>
              <span className="font-mono text-xs text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-900">
                Ec = ½ · m · v²
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mide la capacidad de un cuerpo con masa <strong className="text-slate-100">m</strong> (en kg) y velocidad <strong className="text-slate-100">v</strong> (en m/s) para transferir trabajo en virtud de su movimiento.
            </p>
            <div className="bg-slate-900 p-2.5 rounded-lg text-xs font-mono text-slate-300 flex flex-wrap gap-x-4 gap-y-1">
              <span>• m en kilogramos [kg]</span>
              <span>• v en metros por segundo [m/s]</span>
              <span>• Ec en Joules [J] o kilojoules [1 kJ = 1000 J]</span>
            </div>
          </div>

          {/* Card 2: Teorema Trabajo-Energía */}
          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-amber-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                2. Teorema del Trabajo y la Energía Cinética
              </h3>
              <span className="font-mono text-xs text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-900">
                W_neto = ΔEc = Ec_f - Ec_i
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              El trabajo neto realizado por la suma de todas las fuerzas actuantes es igual a la variación de la energía cinética del objeto.
            </p>
            <ul className="text-xs text-slate-400 space-y-1 pl-3 list-disc">
              <li><strong className="text-emerald-300">W &gt; 0 (Trabajo motor / acelerador):</strong> Aumenta la velocidad y la energía cinética.</li>
              <li><strong className="text-rose-300">W &lt; 0 (Trabajo resistente / frenado):</strong> Disminuye la velocidad; la fuerza se opone al desplazamiento.</li>
              <li><strong className="text-slate-200">Trabajo de una fuerza constante:</strong> <span className="font-mono text-amber-200">W = F · d · cos(θ)</span></li>
            </ul>
          </div>

          {/* Card 3: Conservación de la Energía Mecánica */}
          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-indigo-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                3. Conservación de la Energía Mecánica
              </h3>
              <span className="font-mono text-xs text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-900">
                Emec = Ec + Ep = Constante
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              En sistemas bajo la acción exclusiva de fuerzas conservativas (como la gravedad sin resistencia del aire significativa):
            </p>
            <div className="bg-slate-900 p-2.5 rounded-lg text-xs font-mono text-slate-300 space-y-1">
              <div>• Energía potencial gravitatoria: <strong className="text-indigo-300">Ep = m · g · h</strong> (donde g ≈ 9.8 m/s²)</div>
              <div>• Transformación: <strong className="text-indigo-300">Ec_1 + Ep_1 = Ec_2 + Ep_2</strong></div>
              <div>• Si intervienen fuerzas no conservativas (como fricción): <strong className="text-amber-300">ΔEmec = W_no_conservativo</strong></div>
            </div>
          </div>

          {/* Conversiones y Constantes */}
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
              Unidades y Conversiones Clave
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-400">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-blue-300">Velocidad:</span> 1 km/h = 1 / 3.6 m/s<br />
                (Ej: 72 km/h = 20 m/s; 108 km/h = 30 m/s)
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-blue-300">Energía:</span> 1 J = 1 N · m = 1 kg·m²/s²<br />
                1 kJ = 1,000 J | 1 MJ = 1,000,000 J
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Entendido, volver a la investigación
          </button>
        </div>
      </div>
    </div>
  );
};
