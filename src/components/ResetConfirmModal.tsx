import React, { useEffect } from 'react';
import { AlertTriangle, X, RotateCcw } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
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
      aria-labelledby="modal-reset-title"
    >
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
        <div className="flex items-center gap-3 text-red-400">
          <div className="p-2.5 bg-red-950/60 rounded-xl border border-red-800/80">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 id="modal-reset-title" className="text-base font-bold text-slate-100">
              ¿Reiniciar sesión de investigación?
            </h2>
            <p className="text-xs text-slate-400">
              Acción deliberada para una nueva sesión de laboratorio
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
          Esta acción restablecerá el estado del expediente al inicio (Expediente 1), borrando los borradores y respuestas enviadas en la sesión actual.
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirmReset();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Confirmar reinicio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
