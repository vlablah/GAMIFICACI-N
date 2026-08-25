import { ChallengeId, RouteChoice, ChallengeSubmission, RouteOption } from '../types';
import { CHALLENGES_DATA } from '../data/challengesData';

/**
 * Normalizes user numeric input (handles commas, spaces, units like J or m/s)
 */
export function parseNumericInput(raw: string): number | null {
  if (!raw || typeof raw !== 'string') return null;
  const clean = raw
    .trim()
    .replace(/,/g, '.')
    .replace(/[^\d.-]/g, '');
  if (clean === '' || clean === '-' || clean === '.') return null;
  const num = parseFloat(clean);
  return isNaN(num) ? null : num;
}

/**
 * Evaluates numerical calculation values against expected values with tolerance.
 */
export function evaluateCalculations(
  routeOption: RouteOption,
  userValues: Record<string, string>
): {
  isCorrect: boolean;
  fieldResults: Record<string, { entered: number | null; expected: number; isFieldCorrect: boolean; label: string }>;
  errorSummary?: string;
} {
  const fieldResults: Record<string, { entered: number | null; expected: number; isFieldCorrect: boolean; label: string }> = {};
  let allCorrect = true;
  const tolerance = routeOption.calculationTolerance || 0.08;

  for (const field of routeOption.calculationFields) {
    const rawVal = userValues[field.key];
    const parsedVal = parseNumericInput(rawVal);
    
    if (parsedVal === null) {
      allCorrect = false;
      fieldResults[field.key] = {
        entered: null,
        expected: field.expectedValue,
        isFieldCorrect: false,
        label: field.label,
      };
      continue;
    }

    const expected = field.expectedValue;
    // Check relative or absolute tolerance
    const diff = Math.abs(parsedVal - expected);
    const maxAllowedDiff = Math.max(Math.abs(expected) * tolerance, 0.5);

    // Also check if student entered in kJ instead of J or vice versa if expected >= 1000
    const enteredScaledToJ = parsedVal * 1000;
    const isScaledCorrect = expected >= 1000 && Math.abs(enteredScaledToJ - expected) <= Math.abs(expected) * tolerance;

    const isFieldCorrect = diff <= maxAllowedDiff || isScaledCorrect;

    if (!isFieldCorrect) {
      allCorrect = false;
    }

    fieldResults[field.key] = {
      entered: parsedVal,
      expected: field.expectedValue,
      isFieldCorrect,
      label: field.label,
    };
  }

  let errorSummary: string | undefined = undefined;
  if (!allCorrect) {
    const incorrectFields = Object.values(fieldResults).filter(f => !f.isFieldCorrect);
    errorSummary = `Revisa los valores en: ${incorrectFields.map(f => f.label).join(', ')}.`;
  }

  return { isCorrect: allCorrect, fieldResults, errorSummary };
}

/**
 * Evaluates the qualitative explanation submitted by the student based on pedagogical criteria.
 */
export function evaluateExplanation(
  challengeId: ChallengeId,
  routeOption: RouteOption,
  explanation: string
): {
  isQuality: boolean;
  scoreRatio: number;
  feedbackTitle: string;
  feedbackMessage: string;
  missingElements: string[];
} {
  const cleanText = (explanation || '').trim().toLowerCase();
  const wordCount = cleanText.split(/\s+/).filter(w => w.length > 0).length;
  const missingElements: string[] = [];

  // Minimum length check
  const minWords = challengeId === 5 ? 40 : challengeId === 4 ? 30 : 18;
  if (wordCount < minWords) {
    missingElements.push(`Extensión del análisis (se esperan al menos ${minWords} palabras argumentadas, redactaste ${wordCount})`);
  }

  // Key concepts check
  const foundConcepts = routeOption.keyConcepts.filter(concept => {
    const normalized = concept.toLowerCase();
    return cleanText.includes(normalized);
  });

  const conceptCoverage = foundConcepts.length / Math.max(routeOption.keyConcepts.length, 1);
  if (conceptCoverage < 0.25) {
    missingElements.push('Articulación de conceptos físicos clave (ej. relaciones causales, transferencias o transformaciones energéticas)');
  }

  // Physics connections based on challenge
  switch (challengeId) {
    case 1:
      if (!cleanText.includes('masa') && !cleanText.includes('velocidad') && !cleanText.includes('cuadrado')) {
        missingElements.push('Mención de cómo la energía cinética depende directamente de la masa y del cuadrado de la velocidad');
      }
      break;
    case 2:
      if (!cleanText.includes('trabajo') && !cleanText.includes('variaci') && !cleanText.includes('cambio') && !cleanText.includes('fuerza')) {
        missingElements.push('Conexión explícita entre el trabajo neto realizado y la variación (aumento o disminución) de energía cinética');
      }
      break;
    case 3:
      if (!cleanText.includes('conserva') && !cleanText.includes('potencial') && !cleanText.includes('transform')) {
        missingElements.push('Explicación de cómo la energía potencial gravitatoria se transforma en energía cinética conservando la energía mecánica total');
      }
      break;
    case 4:
      if (!cleanText.includes('fase') && !cleanText.includes('motor') && !cleanText.includes('rampa') && !cleanText.includes('freno')) {
        missingElements.push('Identificación y conexión de las distintas fases físicas del recorrido (impulso motor, conservación en elevación y frenado)');
      }
      break;
    case 5:
      if (!cleanText.includes('balance') && !cleanText.includes('disipa') && !cleanText.includes('grava') && !cleanText.includes('seguridad') && !cleanText.includes('fricci')) {
        missingElements.push('Balance energético integral que contraste la energía disipada por rozamiento en la grava con la ganancia en elevación potencial');
      }
      break;
  }

  const isQuality = missingElements.length === 0;
  const scoreRatio = Math.max(0, 1 - (missingElements.length * 0.35));

  let feedbackTitle = 'Análisis físico completo y riguroso';
  let feedbackMessage = 'Has conectado satisfactoriamente los cálculos cuantitativos con los principios físicos que rigen el fenómeno estudiado.';

  if (!isQuality) {
    feedbackTitle = 'Análisis incompleto: requiere mayor justificación física';
    feedbackMessage = 'Tu propuesta contiene elementos valiosos, pero el informe requiere profundizar en el razonamiento físico para fundamentar la conclusión.';
  }

  return {
    isQuality,
    scoreRatio,
    feedbackTitle,
    feedbackMessage,
    missingElements,
  };
}

/**
 * Evaluates route justification for challenges 2 and 3
 */
export function evaluateRouteJustification(justification: string): boolean {
  if (!justification) return false;
  const clean = justification.trim();
  const wordCount = clean.split(/\s+/).filter(w => w.length > 0).length;
  // A meaningful justification should be at least 8-10 words
  return wordCount >= 8;
}

/**
 * Checks overall badge acquisition rules
 */
export function evaluateBadges(
  submissions: Record<ChallengeId, ChallengeSubmission | null>,
  currentBadges: {
    conceptual_mastery: { obtained: boolean };
    laboratory_strategist: { obtained: boolean };
  }
): {
  conceptual_mastery: boolean;
  laboratory_strategist: boolean;
} {
  // Badge 1: Conceptual Mastery
  // Condition: All 5 challenges completed, quality explanation in >= 4 of 5 including Reto 5
  let qualityCount = 0;
  let hasReto5Quality = false;
  let all5Closed = true;

  for (let i = 1; i <= 5; i++) {
    const sub = submissions[i as ChallengeId];
    if (!sub) {
      all5Closed = false;
    } else {
      if (sub.isQualityExplanation) {
        qualityCount++;
        if (i === 5) hasReto5Quality = true;
      }
    }
  }

  const conceptualMasteryObtained = all5Closed && qualityCount >= 4 && hasReto5Quality;

  // Badge 2: Laboratory Strategist
  // Condition: Route selected in Reto 2 & 3, with valid written justification in both
  const sub2 = submissions[2];
  const sub3 = submissions[3];
  const hasValidJustification2 = sub2 && evaluateRouteJustification(sub2.routeJustification || '');
  const hasValidJustification3 = sub3 && evaluateRouteJustification(sub3.routeJustification || '');
  
  const strategistObtained = Boolean(hasValidJustification2 && hasValidJustification3);

  return {
    conceptual_mastery: currentBadges.conceptual_mastery.obtained || conceptualMasteryObtained,
    laboratory_strategist: currentBadges.laboratory_strategist.obtained || strategistObtained,
  };
}
