export type ChallengeId = 1 | 2 | 3 | 4 | 5;

export type RouteChoice = 'A' | 'B';

export type ChallengeStatus = 'locked' | 'active' | 'closed';

export interface RouteOption {
  id: RouteChoice;
  title: string;
  subtitle: string;
  description: string;
  scenarioData: Record<string, string | number>;
  expectedCalculation: Record<string, number>;
  calculationTolerance: number; // percentage or absolute
  calculationFields: {
    key: string;
    label: string;
    unit: string;
    placeholder: string;
    expectedValue: number;
    step?: string;
  }[];
  hint: {
    title: string;
    content: string;
    guidingQuestions: string[];
  };
  keyVariables: string[];
  keyConcepts: string[];
}

export interface ChallengeDefinition {
  id: ChallengeId;
  title: string;
  code: string;
  pedagogicalPurpose: string;
  mobilizedCapability: string;
  relatedContent: string;
  hasRouteSelection: boolean;
  routes?: {
    A: RouteOption;
    B: RouteOption;
  };
  singleRoute?: RouteOption;
  formulaReminder?: {
    formula: string;
    explanation: string;
    variables: { symbol: string; name: string; unit: string }[];
  };
}

export interface ChallengeSubmission {
  challengeId: ChallengeId;
  selectedRoute?: RouteChoice;
  routeJustification?: string;
  calculationValues: Record<string, string>;
  explanationText: string;
  submittedAt: string;
  isCorrectCalculation: boolean;
  isQualityExplanation: boolean;
  feedbackGiven: {
    type: 'success' | 'incomplete' | 'error';
    title: string;
    message: string;
    missingElements?: string[];
  };
  hintsUsedCount: number;
  attemptsCount: number;
}

export interface BadgeDefinition {
  id: 'conceptual_mastery' | 'laboratory_strategist';
  name: string;
  meaning: string;
  pedagogicalRecognition: string;
  criteriaDescription: string;
  iconName: string;
  obtained: boolean;
  awardedAtReto?: number;
}

export interface LabSessionState {
  currentChallengeId: ChallengeId;
  screen: 'welcome' | 'mission' | 'lab_active' | 'dossier_summary' | 'final_closing';
  challengeStatuses: Record<ChallengeId, ChallengeStatus>;
  submissions: Record<ChallengeId, ChallengeSubmission | null>;
  currentDrafts: Record<ChallengeId, {
    selectedRoute?: RouteChoice;
    routeJustification: string;
    calculationValues: Record<string, string>;
    explanationText: string;
    hintsUsedCount: number;
    attemptsCount: number;
  }>;
  badges: {
    conceptual_mastery: BadgeDefinition;
    laboratory_strategist: BadgeDefinition;
  };
  isCompleted: boolean;
  activeModal: 'none' | 'hint' | 'formulas' | 'badges' | 'reset_confirm' | 'dossier_detail';
  selectedDossierDetailId?: ChallengeId;
}
