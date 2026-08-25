import React, { useState, useEffect } from 'react';
import {
  ChallengeDefinition,
  RouteChoice,
  ChallengeSubmission,
  RouteOption,
} from '../types';
import { PhysicalDiagram } from './PhysicalDiagram';
import {
  evaluateCalculations,
  evaluateExplanation,
  evaluateRouteJustification,
} from '../utils/physicsEvaluation';
import {
  Lightbulb,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Info,
  Compass,
  FileCheck,
  RefreshCw,
} from 'lucide-react';

interface ChallengeViewProps {
  challenge: ChallengeDefinition;
  initialDraft: {
    selectedRoute?: RouteChoice;
    routeJustification: string;
    calculationValues: Record<string, string>;
    explanationText: string;
    hintsUsedCount: number;
    attemptsCount: number;
  };
  previousSubmission: ChallengeSubmission | null;
  onSaveDraft: (draft: {
    selectedRoute?: RouteChoice;
    routeJustification: string;
    calculationValues: Record<string, string>;
    explanationText: string;
    hintsUsedCount: number;
    attemptsCount: number;
  }) => void;
  onSubmitSuccess: (submission: ChallengeSubmission) => void;
  onRequestHint: () => void;
  onNextChallenge: () => void;
  isLastChallenge: boolean;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  challenge,
  initialDraft,
  previousSubmission,
  onSaveDraft,
  onSubmitSuccess,
  onRequestHint,
  onNextChallenge,
  isLastChallenge,
}) => {
  // Local state initialized from draft
  const [selectedRoute, setSelectedRoute] = useState<RouteChoice>(
    initialDraft.selectedRoute || (challenge.hasRouteSelection ? 'A' : 'A')
  );
  const [routeJustification, setRouteJustification] = useState(
    initialDraft.routeJustification || ''
  );
  const [calcValues, setCalcValues] = useState<Record<string, string>>(
    initialDraft.calculationValues || {}
  );
  const [explanationText, setExplanationText] = useState(
    initialDraft.explanationText || ''
  );
  const [hintsCount, setHintsCount] = useState(initialDraft.hintsUsedCount || 0);
  const [attempts, setAttempts] = useState(initialDraft.attemptsCount || 0);

  // Submission feedback state
  const [feedback, setFeedback] = useState<{
    type: 'idle' | 'success' | 'incomplete' | 'error';
    title: string;
    message: string;
    missingElements?: string[];
    calculationErrors?: string;
  }>({
    type: previousSubmission ? 'success' : 'idle',
    title: previousSubmission?.feedbackGiven.title || '',
    message: previousSubmission?.feedbackGiven.message || '',
    missingElements: previousSubmission?.feedbackGiven.missingElements,
  });

  // Sync hints count from parent
  useEffect(() => {
    setHintsCount(initialDraft.hintsUsedCount);
  }, [initialDraft.hintsUsedCount]);

  // Keep draft saved
  const persistDraft = (
    newRoute = selectedRoute,
    newJust = routeJustification,
    newCalcs = calcValues,
    newExp = explanationText,
    newHints = hintsCount,
    newAttempts = attempts
  ) => {
    onSaveDraft({
      selectedRoute: newRoute,
      routeJustification: newJust,
      calculationValues: newCalcs,
      explanationText: newExp,
      hintsUsedCount: newHints,
      attemptsCount: newAttempts,
    });
  };

  // Determine the active route option
  const activeRouteOption: RouteOption = challenge.hasRouteSelection && challenge.routes
    ? challenge.routes[selectedRoute]
    : challenge.singleRoute!;

  // Handle route change
  const handleRouteChange = (route: RouteChoice) => {
    setSelectedRoute(route);
    // Reset specific calcs when switching routes
    const updatedCalcs: Record<string, string> = {};
    setCalcValues(updatedCalcs);
    setFeedback({ type: 'idle', title: '', message: '' });
    persistDraft(route, routeJustification, updatedCalcs, explanationText, hintsCount, attempts);
  };

  // Handle calculation inputs
  const handleCalcChange = (key: string, val: string) => {
    const next = { ...calcValues, [key]: val };
    setCalcValues(next);
    persistDraft(selectedRoute, routeJustification, next, explanationText, hintsCount, attempts);
  };

  // Handle explanation change
  const handleExplanationChange = (text: string) => {
    setExplanationText(text);
    persistDraft(selectedRoute, routeJustification, calcValues, text, hintsCount, attempts);
  };

  // Handle route justification change
  const handleJustificationChange = (text: string) => {
    setRouteJustification(text);
    persistDraft(selectedRoute, text, calcValues, explanationText, hintsCount, attempts);
  };

  // Evaluate and submit
  const handleValidateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // 1. Check if required fields are non-empty
    const emptyFields = activeRouteOption.calculationFields.filter(
      (f) => !calcValues[f.key] || calcValues[f.key].trim() === ''
    );
    if (emptyFields.length > 0) {
      setFeedback({
        type: 'error',
        title: 'Campos numéricos incompletos',
        message: `Por favor ingresa los cálculos requeridos en: ${emptyFields.map((f) => f.label).join(', ')}.`,
      });
      return;
    }

    if (!explanationText || explanationText.trim().length === 0) {
      setFeedback({
        type: 'incomplete',
        title: 'Falta la explicación física del fenómeno',
        message: 'El expediente requiere una redacción explicada del análisis energético, no únicamente los datos numéricos.',
        missingElements: ['Explicación y fundamentación física del fenómeno analizado'],
      });
      return;
    }

    // 2. Evaluate calculations
    const calcResult = evaluateCalculations(activeRouteOption, calcValues);

    // 3. Evaluate explanation
    const expResult = evaluateExplanation(challenge.id, activeRouteOption, explanationText);

    // 4. Evaluate route justification if applicable
    const isRouteJustified = challenge.hasRouteSelection
      ? evaluateRouteJustification(routeJustification)
      : true;

    if (!calcResult.isCorrect) {
      setFeedback({
        type: 'error',
        title: 'Inconsistencia en los cálculos cuantitativos',
        message: 'Revisa la aplicación de la fórmula o el orden de las operaciones matemáticas. Recuerda verificar las unidades.',
        calculationErrors: calcResult.errorSummary,
      });
      return;
    }

    if (!expResult.isQuality) {
      setFeedback({
        type: 'incomplete',
        title: expResult.feedbackTitle,
        message: expResult.feedbackMessage,
        missingElements: expResult.missingElements,
      });
      return;
    }

    // Success!
    const submission: ChallengeSubmission = {
      challengeId: challenge.id,
      selectedRoute: challenge.hasRouteSelection ? selectedRoute : undefined,
      routeJustification: challenge.hasRouteSelection ? routeJustification : undefined,
      calculationValues: calcValues,
      explanationText: explanationText,
      submittedAt: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      isCorrectCalculation: true,
      isQualityExplanation: true,
      feedbackGiven: {
        type: 'success',
        title: '¡Expediente Cerrado con Éxito!',
        message: `Has completado el análisis pericial del ${challenge.title} integrando cálculos precisos y una justificación física rigurosa.`,
      },
      hintsUsedCount: hintsCount,
      attemptsCount: newAttempts,
    };

    setFeedback({
      type: 'success',
      title: submission.feedbackGiven.title,
      message: submission.feedbackGiven.message,
    });

    onSubmitSuccess(submission);
  };

  const wordCount = explanationText
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  return (
    <div className="space-y-6">
      {/* Challenge Title Banner */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-800 rounded-lg">
              {challenge.code}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Contenido: {challenge.relatedContent}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Intentos: {attempts}</span>
            {hintsCount > 0 && (
              <span className="text-amber-400 font-semibold">• Pistas usadas: {hintsCount}</span>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-100">
            {challenge.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            <strong className="text-slate-300">Propósito Pedagógico:</strong> {challenge.pedagogicalPurpose}
          </p>
        </div>
      </div>

      {/* Route Selection (Retos 2 and 3) */}
      {challenge.hasRouteSelection && challenge.routes && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              <Compass className="w-4 h-4" />
              <span>Bifurcación de Investigación: Selecciona tu Ruta de Caso</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Ambas rutas tienen validez y rigor equivalente
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Route A Card */}
            <div
              onClick={() => handleRouteChange('A')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedRoute === 'A'
                  ? 'bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono font-bold text-xs px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-800 rounded">
                  Ruta A
                </span>
                {selectedRoute === 'A' && (
                  <span className="text-xs text-blue-400 font-semibold flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Seleccionada
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-100 mb-1">
                {challenge.routes.A.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {challenge.routes.A.description}
              </p>
            </div>

            {/* Route B Card */}
            <div
              onClick={() => handleRouteChange('B')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedRoute === 'B'
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono font-bold text-xs px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded">
                  Ruta B
                </span>
                {selectedRoute === 'B' && (
                  <span className="text-xs text-indigo-400 font-semibold flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Seleccionada
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-100 mb-1">
                {challenge.routes.B.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {challenge.routes.B.description}
              </p>
            </div>
          </div>

          {/* Route Justification Textarea */}
          <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
            <label
              htmlFor="route-justification"
              className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Justificación de Selección Estratégica (Insumo para la insignia Estratega del Laboratorio):
            </label>
            <textarea
              id="route-justification"
              rows={2}
              value={routeJustification}
              onChange={(e) => handleJustificationChange(e.target.value)}
              placeholder="Explica brevemente por qué consideras pertinente investigar este caso y qué fenómeno físico te interesa analizar en esta ruta..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 font-sans resize-none transition-colors"
            />
          </div>
        </div>
      )}

      {/* Case Description & Data */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
              Descripción del Fenómeno Experimental
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 mt-0.5">
              {activeRouteOption.title}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
            {activeRouteOption.subtitle}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
          {activeRouteOption.description}
        </p>

        {/* Data Table */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Variables y Condiciones Registradas en el Laboratorio:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {Object.entries(activeRouteOption.scenarioData).map(([key, val]) => (
              <div
                key={key}
                className="p-2.5 bg-slate-900 rounded-lg border border-slate-800/80 flex flex-col justify-center"
              >
                <span className="text-slate-400 text-[11px]">{key}</span>
                <span className="text-slate-100 font-bold mt-0.5">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Physical Diagram */}
        <PhysicalDiagram
          challengeId={challenge.id}
          routeChoice={challenge.hasRouteSelection ? selectedRoute : 'A'}
        />

        {/* Formula Reminder if present (Challenges 1, 2, 3) */}
        {challenge.formulaReminder && (
          <div className="p-3.5 bg-blue-950/30 rounded-xl border border-blue-900/60 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-300 font-mono">
                  Principio Guía: {challenge.formulaReminder.formula}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {challenge.formulaReminder.explanation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Form: Calculations & Written Physics Explanation */}
      <form onSubmit={handleValidateAndSubmit} className="space-y-6">
        {/* Calculation Inputs Card */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                1. Determinación Cuantitativa de Variables
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Ingresa los valores calculados aplicando las leyes físicas correspondientes
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Soporte de verificación automática
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activeRouteOption.calculationFields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label
                  htmlFor={`calc-${field.key}`}
                  className="text-xs font-mono font-medium text-slate-300 block"
                >
                  {field.label}
                </label>
                <div className="relative rounded-xl shadow-inner">
                  <input
                    id={`calc-${field.key}`}
                    type="text"
                    inputMode="decimal"
                    value={calcValues[field.key] || ''}
                    onChange={(e) => handleCalcChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-2.5 pl-3 pr-14 text-xs font-mono text-slate-100 placeholder:text-slate-600 transition-colors"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {field.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Written Physics Explanation Card */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-blue-300 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-400" />
                2. Análisis Explicado y Dictamen Físico (Evidencia Central de Aprendizaje)
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Articula con tus propias palabras qué ocurre energéticamente y cómo se justifican los resultados
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {wordCount} palabras redactadas
            </span>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
            <span className="font-mono font-bold text-slate-300 block text-[11px]">
              Criterios de Calidad Esperados en tu Explicación:
            </span>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-slate-300 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <span>Identifica variables relevantes (masa, velocidad, altura, fuerzas).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <span>Aplica la fórmula o principio físico correspondiente.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <span>Conecta el cálculo con el significado del fenómeno físico.</span>
              </li>
            </ul>
          </div>

          <div>
            <label htmlFor="physics-explanation" className="sr-only">
              Redacción del análisis y explicación física
            </label>
            <textarea
              id="physics-explanation"
              rows={challenge.id === 5 ? 7 : challenge.id === 4 ? 5 : 4}
              value={explanationText}
              onChange={(e) => handleExplanationChange(e.target.value)}
              placeholder={
                challenge.id === 1
                  ? "Describe con tus palabras el significado físico de la energía cinética calculada, explicando de qué variables depende y cómo influye el cuadrado de la velocidad en este vehículo..."
                  : challenge.id === 2
                  ? "Explica la relación entre el trabajo neto realizado por las fuerzas actuantes y la variación resultante de energía cinética en este caso..."
                  : challenge.id === 3
                  ? "Explica detalladamente cómo se transforma la energía potencial en cinética (o viceversa) a lo largo del recorrido y por qué la energía mecánica total se conserva..."
                  : challenge.id === 4
                  ? "Presenta un análisis articulado de las 3 fases del recorrido (impulso motor, conservación en elevación y frenado disipativo), conectando los principios físicos que rigen cada tramo..."
                  : "Redacta el Dictamen Pericial de Seguridad Energética para la rampa de escape: identifica el balance general de energía, explica cómo interactúan el desnivel gravitatorio y el lecho de grava, y fundamenta las recomendaciones finales..."
              }
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl p-4 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 font-sans leading-relaxed resize-y transition-colors min-h-[110px]"
            />
          </div>
        </div>

        {/* Feedback Section (Aria-live region for screen readers) */}
        <div aria-live="polite" aria-atomic="true">
          {feedback.type !== 'idle' && (
            <div
              className={`p-5 rounded-2xl border transition-all animate-fade-in ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200'
                  : feedback.type === 'incomplete'
                  ? 'bg-amber-950/40 border-amber-500/80 text-amber-200'
                  : 'bg-red-950/40 border-red-500/80 text-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : feedback.type === 'incomplete' ? (
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}

                <div className="space-y-2 flex-1 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm sm:text-base">
                      {feedback.title}
                    </h4>
                    <p className="mt-1 leading-relaxed text-slate-200">
                      {feedback.message}
                    </p>
                  </div>

                  {feedback.calculationErrors && (
                    <div className="p-2.5 bg-slate-950/80 rounded-lg border border-red-900/60 font-mono text-xs text-red-300">
                      {feedback.calculationErrors}
                    </div>
                  )}

                  {feedback.missingElements && feedback.missingElements.length > 0 && (
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-amber-900/60 space-y-1">
                      <span className="font-mono font-bold text-amber-300 uppercase tracking-wider text-[11px] block">
                        Aspectos que requieren mayor desarrollo en tu explicación:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {feedback.missingElements.map((el, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{el}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {feedback.type === 'success' && (
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                      <span className="text-xs font-mono text-emerald-400">
                        ✓ Registro archivado en el expediente del laboratorio
                      </span>
                      <button
                        type="button"
                        onClick={onNextChallenge}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      >
                        <span>
                          {isLastChallenge ? 'Ver Cierre y Resultados Finales' : 'Avanzar al Siguiente Expediente'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onRequestHint}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Solicitar Pista de Apoyo</span>
            <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
              {hintsCount} usadas
            </span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <Send className="w-4 h-4" />
              <span>Verificar y Enviar Análisis al Expediente</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
