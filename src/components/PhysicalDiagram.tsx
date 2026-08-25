import React from 'react';
import { ChallengeId, RouteChoice } from '../types';

interface PhysicalDiagramProps {
  challengeId: ChallengeId;
  routeChoice?: RouteChoice;
}

export const PhysicalDiagram: React.FC<PhysicalDiagramProps> = ({ challengeId, routeChoice = 'A' }) => {
  return (
    <div className="w-full bg-slate-900/90 rounded-xl border border-slate-700/80 p-4 shadow-inner overflow-hidden">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
            Esquema Físico Instrumental — Diagrama Vectorial y Energético
          </span>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
          EXP-00{challengeId} {challengeId === 2 || challengeId === 3 ? `[Ruta ${routeChoice}]` : ''}
        </span>
      </div>

      <div className="w-full relative flex items-center justify-center min-h-[190px]">
        {challengeId === 1 && (
          <svg className="w-full max-w-lg h-44" viewBox="0 0 500 180" role="img" aria-label="Diagrama de vehículo de prueba desplazándose con velocidad constante">
            {/* Grid & Ground */}
            <line x1="20" y1="140" x2="480" y2="140" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="20" y1="145" x2="480" y2="145" stroke="#334155" strokeWidth="3" />
            
            {/* Motion lines behind */}
            <line x1="50" y1="100" x2="100" y2="100" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.6" />
            <line x1="70" y1="115" x2="110" y2="115" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.6" />
            
            {/* Vehicle body */}
            <rect x="140" y="85" width="130" height="40" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
            <rect x="170" y="65" width="70" height="24" rx="4" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5" />
            {/* Wheels */}
            <circle cx="170" cy="130" r="14" fill="#0f172a" stroke="#94a3b8" strokeWidth="3" />
            <circle cx="240" cy="130" r="14" fill="#0f172a" stroke="#94a3b8" strokeWidth="3" />

            {/* Mass annotation */}
            <text x="205" y="110" fill="#e2e8f0" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="monospace">
              m = 1200 kg
            </text>

            {/* Velocity vector */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
            </defs>
            <line x1="270" y1="105" x2="370" y2="105" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="320" y="92" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              v = 20 m/s (72 km/h)
            </text>

            {/* Energy callout */}
            <g transform="translate(370, 35)">
              <rect x="0" y="0" width="115" height="44" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
              <text x="57" y="18" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                ENERGÍA CINÉTICA
              </text>
              <text x="57" y="34" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                Ec = ½ m v²
              </text>
            </g>
          </svg>
        )}

        {challengeId === 2 && routeChoice === 'A' && (
          <svg className="w-full max-w-lg h-44" viewBox="0 0 500 180" role="img" aria-label="Diagrama de frenado con fuerza de fricción opuesta al movimiento">
            {/* Ground */}
            <line x1="20" y1="140" x2="480" y2="140" stroke="#64748b" strokeWidth="2" />
            <rect x="120" y="142" width="280" height="12" fill="#334155" />
            <text x="260" y="152" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
              ZONA DE FRENADO (d = 50 m)
            </text>

            {/* Vehicle at braking */}
            <rect x="180" y="85" width="120" height="38" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="205" cy="128" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2.5" />
            <circle cx="275" cy="128" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2.5" />
            <text x="240" y="108" fill="#f8fafc" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="monospace">
              m = 800 kg
            </text>

            {/* Velocity vectors initial & final */}
            <defs>
              <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
              <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>

            {/* Initial velocity indicator */}
            <text x="80" y="45" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">
              v_i = 25 m/s (Ec_i = 250 kJ)
            </text>
            <text x="320" y="45" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">
              v_f = 10 m/s (Ec_f = 40 kJ)
            </text>

            {/* Braking friction force vector (pointing left) */}
            <line x1="180" y1="104" x2="100" y2="104" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
            <text x="135" y="94" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              F_freno (W &lt; 0)
            </text>

            {/* Forward displacement vector */}
            <line x1="300" y1="104" x2="380" y2="104" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
            <text x="345" y="94" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              Δx = 50 m
            </text>
          </svg>
        )}

        {challengeId === 2 && routeChoice === 'B' && (
          <svg className="w-full max-w-lg h-44" viewBox="0 0 500 180" role="img" aria-label="Diagrama de aceleración por fuerza horizontal constante">
            {/* Low friction rail */}
            <line x1="20" y1="140" x2="480" y2="140" stroke="#0ea5e9" strokeWidth="3" />
            <line x1="20" y1="144" x2="480" y2="144" stroke="#0284c7" strokeWidth="1" />

            {/* Sled */}
            <rect x="150" y="90" width="100" height="35" rx="4" fill="#047857" stroke="#10b981" strokeWidth="2" />
            <circle cx="170" cy="130" r="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="230" cy="130" r="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
            <text x="200" y="112" fill="#ecfdf5" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              m = 50 kg
            </text>

            {/* Applied Force vector */}
            <defs>
              <marker id="arrow-cyan" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
              </marker>
            </defs>
            <line x1="250" y1="108" x2="360" y2="108" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrow-cyan)" />
            <text x="310" y="94" fill="#06b6d4" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              F_neta = 180 N
            </text>

            {/* Work & Velocity annotations */}
            <text x="80" y="55" fill="#94a3b8" fontSize="10" fontFamily="monospace">
              Inicio: v_i = 0 (Ec_i = 0 J)
            </text>
            <text x="300" y="55" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">
              d = 20 m → W = +3600 J
            </text>
          </svg>
        )}

        {challengeId === 3 && routeChoice === 'A' && (
          <svg className="w-full max-w-lg h-48" viewBox="0 0 500 190" role="img" aria-label="Diagrama de caída libre con transformación de energía potencial en cinética">
            {/* Vertical height scale */}
            <line x1="80" y1="20" x2="80" y2="160" stroke="#64748b" strokeWidth="2" />
            <line x1="75" y1="20" x2="85" y2="20" stroke="#64748b" strokeWidth="2" />
            <line x1="75" y1="90" x2="85" y2="90" stroke="#64748b" strokeWidth="2" />
            <line x1="75" y1="160" x2="85" y2="160" stroke="#64748b" strokeWidth="2" />
            
            <text x="65" y="24" fill="#38bdf8" fontSize="10" textAnchor="end" fontFamily="monospace">h = 45 m</text>
            <text x="65" y="94" fill="#38bdf8" fontSize="10" textAnchor="end" fontFamily="monospace">h = 22.5 m</text>
            <text x="65" y="164" fill="#38bdf8" fontSize="10" textAnchor="end" fontFamily="monospace">h = 0 m</text>

            {/* Position 1 (Top) */}
            <circle cx="160" cy="30" r="14" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
            <text x="160" y="34" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">2 kg</text>
            <text x="190" y="28" fill="#93c5fd" fontSize="10" fontFamily="monospace">Ep = 882 J</text>
            <text x="190" y="42" fill="#64748b" fontSize="10" fontFamily="monospace">Ec = 0 J (v=0)</text>

            {/* Position 2 (Middle) */}
            <circle cx="160" cy="90" r="14" fill="#6366f1" stroke="#a5b4fc" strokeWidth="2" />
            <text x="160" y="94" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">2 kg</text>
            <text x="190" y="88" fill="#a5b4fc" fontSize="10" fontFamily="monospace">Ep = 441 J</text>
            <text x="190" y="102" fill="#38bdf8" fontSize="10" fontFamily="monospace">Ec = 441 J</text>

            {/* Position 3 (Bottom) */}
            <circle cx="160" cy="150" r="14" fill="#06b6d4" stroke="#67e8f9" strokeWidth="2" />
            <text x="160" y="154" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">2 kg</text>
            <text x="190" y="148" fill="#64748b" fontSize="10" fontFamily="monospace">Ep = 0 J</text>
            <text x="190" y="162" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">Ec = 882 J (v=29.7 m/s)</text>

            {/* Total Energy invariant indicator */}
            <rect x="340" y="50" width="140" height="70" rx="8" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
            <text x="410" y="70" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              CONSERVACIÓN
            </text>
            <text x="410" y="88" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              Emec = Ep + Ec
            </text>
            <text x="410" y="106" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontFamily="monospace">
              = 882 J (Constante)
            </text>
          </svg>
        )}

        {challengeId === 3 && routeChoice === 'B' && (
          <svg className="w-full max-w-lg h-44" viewBox="0 0 500 180" role="img" aria-label="Diagrama de carro descendiendo por rampa curva sin fricción">
            {/* Curved ramp profile */}
            <path d="M 80 40 Q 140 140 400 140" fill="none" stroke="#38bdf8" strokeWidth="4" />
            <line x1="80" y1="40" x2="80" y2="140" stroke="#64748b" strokeDasharray="4 4" />
            <text x="60" y="90" fill="#38bdf8" fontSize="11" textAnchor="end" fontFamily="monospace">h = 5.0 m</text>

            {/* Cart at top */}
            <rect x="68" y="24" width="28" height="16" rx="3" fill="#6366f1" stroke="#a5b4fc" strokeWidth="1.5" />
            <text x="110" y="30" fill="#a5b4fc" fontSize="10" fontFamily="monospace">Cima: Ep = 196 J, Ec = 0 J</text>

            {/* Cart at bottom */}
            <rect x="360" y="124" width="28" height="16" rx="3" fill="#06b6d4" stroke="#67e8f9" strokeWidth="1.5" />
            <text x="320" y="165" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Base: Ep = 0 J, Ec = 196 J (v = 9.9 m/s)
            </text>

            {/* Mass annotation */}
            <text x="250" y="70" fill="#e2e8f0" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="monospace">
              m = 4.0 kg | Fricción despreciable
            </text>
          </svg>
        )}

        {challengeId === 4 && (
          <svg className="w-full max-w-lg h-48" viewBox="0 0 500 190" role="img" aria-label="Diagrama de tres fases: impulso motor, rampa de elevación y plataforma de frenado">
            {/* Phase 1: Flat motor track */}
            <line x1="20" y1="150" x2="160" y2="150" stroke="#10b981" strokeWidth="3" />
            <text x="90" y="170" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              FASE 1: Impulso (W=108 kJ)
            </text>

            {/* Phase 2: Incline ramp */}
            <path d="M 160 150 L 300 70" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <line x1="300" y1="70" x2="300" y2="150" stroke="#64748b" strokeDasharray="3 3" />
            <text x="310" y="115" fill="#60a5fa" fontSize="9" fontFamily="monospace">h = 10 m</text>
            <text x="230" y="90" fill="#3b82f6" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              FASE 2: Ascenso
            </text>

            {/* Phase 3: Elevated platform braking */}
            <line x1="300" y1="70" x2="480" y2="70" stroke="#ef4444" strokeWidth="3" />
            <text x="390" y="55" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              FASE 3: Frenado (F=2460 N)
            </text>
            <text x="390" y="90" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
              d = 20 m → v_final = 0
            </text>

            {/* Vehicle indicator at Phase 2 crest */}
            <rect x="285" y="56" width="30" height="14" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="250" y="170" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="monospace">
              Vagón m = 600 kg (Ec remanente = 49.2 kJ)
            </text>
          </svg>
        )}

        {challengeId === 5 && (
          <svg className="w-full max-w-lg h-48" viewBox="0 0 500 190" role="img" aria-label="Diagrama pericial de rampa de escape para camiones con lecho de grava">
            {/* Highway entry */}
            <line x1="20" y1="150" x2="140" y2="150" stroke="#64748b" strokeWidth="3" />
            <text x="75" y="170" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              v_1 = 30 m/s (108 km/h)
            </text>

            {/* Truck entering */}
            <rect x="40" y="115" width="65" height="32" rx="4" fill="#991b1b" stroke="#f87171" strokeWidth="1.5" />
            <text x="72" y="135" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              15,000 kg
            </text>

            {/* Gravel Escape Ramp */}
            <path d="M 140 150 L 460 70" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="4 2" />
            <line x1="460" y1="70" x2="460" y2="150" stroke="#64748b" strokeDasharray="3 3" />
            <text x="470" y="115" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">h = 12.0 m</text>

            {/* Energy callout bubbles */}
            <g transform="translate(160, 20)">
              <rect x="0" y="0" width="280" height="42" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1" />
              <text x="140" y="16" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                BALANCE ENERGÉTICO PERICIAL
              </text>
              <text x="140" y="32" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="monospace">
                Ec_inicial (6.75 MJ) = Ep_ganada (1.76 MJ) + W_grava (4.99 MJ)
              </text>
            </g>

            {/* Stopping mark */}
            <circle cx="440" cy="75" r="7" fill="#10b981" />
            <text x="430" y="60" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              v_2 = 0 m/s (Detención segura)
            </text>
          </svg>
        )}
      </div>
    </div>
  );
};
