import React, { useState, useEffect } from 'react';
import { ChallengeId, LabSessionState, ChallengeSubmission } from './types';
import { CHALLENGES_DATA, INITIAL_BADGES } from './data/challengesData';
import { evaluateBadges } from './utils/physicsEvaluation';
import { Header } from './components/Header';
import { ProgressDossier } from './components/ProgressDossier';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MissionScreen } from './components/MissionScreen';
import { ChallengeView } from './components/ChallengeView';
import { DossierSummaryView } from './components/DossierSummaryView';
import { ClosingScreen } from './components/ClosingScreen';
import { FormulaReferenceModal } from './components/FormulaReferenceModal';
import { BadgesModal } from './components/BadgesModal';
import { HintModal } from './components/HintModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { DossierDetailModal } from './components/DossierDetailModal';

const INITIAL_STATE: LabSessionState = {
  currentChallengeId: 1,
  screen: 'welcome',
  challengeStatuses: {
    1: 'active',
    2: 'locked',
    3: 'locked',
    4: 'locked',
    5: 'locked',
  },
  submissions: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  },
  currentDrafts: {
    1: { routeJustification: '', calculationValues: {}, explanationText: '', hintsUsedCount: 0, attemptsCount: 0 },
    2: { selectedRoute: 'A', routeJustification: '', calculationValues: {}, explanationText: '', hintsUsedCount: 0, attemptsCount: 0 },
    3: { selectedRoute: 'A', routeJustification: '', calculationValues: {}, explanationText: '', hintsUsedCount: 0, attemptsCount: 0 },
    4: { routeJustification: '', calculationValues: {}, explanationText: '', hintsUsedCount: 0, attemptsCount: 0 },
    5: { routeJustification: '', calculationValues: {}, explanationText: '', hintsUsedCount: 0, attemptsCount: 0 },
  },
  badges: {
    conceptual_mastery: { ...INITIAL_BADGES.conceptual_mastery },
    laboratory_strategist: { ...INITIAL_BADGES.laboratory_strategist },
  },
  isCompleted: false,
  activeModal: 'none',
  selectedDossierDetailId: undefined,
};

export default function App() {
  const [session, setSession] = useState<LabSessionState>(() => {
    try {
      const saved = sessionStorage.getItem('laboratorio_analisis_energetico_session');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_STATE;
  });

  // Save session state to sessionStorage for transient persistence in active tab
  useEffect(() => {
    try {
      sessionStorage.setItem('laboratorio_analisis_energetico_session', JSON.stringify(session));
    } catch {
      // ignore
    }
  }, [session]);

  // Handle draft update
  const handleSaveDraft = (draft: {
    selectedRoute?: 'A' | 'B';
    routeJustification: string;
    calculationValues: Record<string, string>;
    explanationText: string;
    hintsUsedCount: number;
    attemptsCount: number;
  }) => {
    setSession((prev) => ({
      ...prev,
      currentDrafts: {
        ...prev.currentDrafts,
        [prev.currentChallengeId]: draft,
      },
    }));
  };

  // Handle successful submission of a challenge
  const handleSubmitSuccess = (submission: ChallengeSubmission) => {
    setSession((prev) => {
      const newSubmissions = {
        ...prev.submissions,
        [submission.challengeId]: submission,
      };

      const newStatuses = {
        ...prev.challengeStatuses,
        [submission.challengeId]: 'closed' as const,
      };

      // If there is a next challenge, unlock it
      const nextId = (submission.challengeId + 1) as ChallengeId;
      if (nextId <= 5 && newStatuses[nextId] === 'locked') {
        newStatuses[nextId] = 'active';
      }

      // Re-evaluate badges
      const evaluatedBadges = evaluateBadges(newSubmissions, prev.badges);

      const updatedBadges = {
        conceptual_mastery: {
          ...prev.badges.conceptual_mastery,
          obtained: evaluatedBadges.conceptual_mastery,
        },
        laboratory_strategist: {
          ...prev.badges.laboratory_strategist,
          obtained: evaluatedBadges.laboratory_strategist,
        },
      };

      return {
        ...prev,
        submissions: newSubmissions,
        challengeStatuses: newStatuses,
        badges: updatedBadges,
      };
    });
  };

  // Handle advancing to the next challenge
  const handleNextChallenge = () => {
    setSession((prev) => {
      const currentId = prev.currentChallengeId;
      if (currentId === 5) {
        return {
          ...prev,
          screen: 'final_closing',
          isCompleted: true,
        };
      }

      const nextId = (currentId + 1) as ChallengeId;
      return {
        ...prev,
        currentChallengeId: nextId,
        screen: 'lab_active',
        challengeStatuses: {
          ...prev.challengeStatuses,
          [nextId]: 'active',
        },
      };
    });
  };

  // Handle selecting a challenge to work on
  const handleSelectChallenge = (id: ChallengeId) => {
    if (session.challengeStatuses[id] === 'locked') return;
    setSession((prev) => ({
      ...prev,
      currentChallengeId: id,
      screen: 'lab_active',
    }));
  };

  // Handle opening hint
  const handleRequestHint = () => {
    setSession((prev) => {
      const currentDraft = prev.currentDrafts[prev.currentChallengeId];
      const updatedDraft = {
        ...currentDraft,
        hintsUsedCount: (currentDraft.hintsUsedCount || 0) + 1,
      };
      return {
        ...prev,
        activeModal: 'hint',
        currentDrafts: {
          ...prev.currentDrafts,
          [prev.currentChallengeId]: updatedDraft,
        },
      };
    });
  };

  // Handle resetting session
  const handleConfirmReset = () => {
    try {
      sessionStorage.removeItem('laboratorio_analisis_energetico_session');
    } catch {
      // ignore
    }
    setSession(INITIAL_STATE);
  };

  // Current active challenge data
  const currentChallenge = CHALLENGES_DATA.find((c) => c.id === session.currentChallengeId) || CHALLENGES_DATA[0];
  const currentDraft = session.currentDrafts[session.currentChallengeId];
  const currentRouteChoice = currentDraft?.selectedRoute || 'A';
  const currentRouteOption = currentChallenge.hasRouteSelection && currentChallenge.routes
    ? currentChallenge.routes[currentRouteChoice]
    : currentChallenge.singleRoute!;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header (available in all screens) */}
      <Header
        sessionState={session}
        onOpenFormulas={() => setSession((p) => ({ ...p, activeModal: 'formulas' }))}
        onOpenBadges={() => setSession((p) => ({ ...p, activeModal: 'badges' }))}
        onOpenDossier={() => setSession((p) => ({ ...p, screen: 'dossier_summary' }))}
        onOpenReset={() => setSession((p) => ({ ...p, activeModal: 'reset_confirm' }))}
        onGoToActiveChallenge={() => setSession((p) => ({ ...p, screen: 'lab_active' }))}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {session.screen === 'welcome' && (
          <WelcomeScreen
            onStart={() => setSession((p) => ({ ...p, screen: 'mission' }))}
          />
        )}

        {session.screen === 'mission' && (
          <MissionScreen
            onStartFirstChallenge={() =>
              setSession((p) => ({
                ...p,
                currentChallengeId: 1,
                screen: 'lab_active',
              }))
            }
          />
        )}

        {session.screen === 'lab_active' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left / Main Workspace: Challenge active form */}
            <div className="lg:col-span-8 space-y-6">
              <ChallengeView
                key={`${currentChallenge.id}-${currentDraft.selectedRoute || 'single'}`}
                challenge={currentChallenge}
                initialDraft={currentDraft}
                previousSubmission={session.submissions[currentChallenge.id]}
                onSaveDraft={handleSaveDraft}
                onSubmitSuccess={handleSubmitSuccess}
                onRequestHint={handleRequestHint}
                onNextChallenge={handleNextChallenge}
                isLastChallenge={currentChallenge.id === 5}
              />
            </div>

            {/* Right: Progress Dossier Sidebar */}
            <div className="lg:col-span-4 sticky top-20">
              <ProgressDossier
                sessionState={session}
                onSelectChallenge={handleSelectChallenge}
                onViewClosedDetail={(id) =>
                  setSession((p) => ({
                    ...p,
                    activeModal: 'dossier_detail',
                    selectedDossierDetailId: id,
                  }))
                }
                onOpenBadges={() => setSession((p) => ({ ...p, activeModal: 'badges' }))}
              />
            </div>
          </div>
        )}

        {session.screen === 'dossier_summary' && (
          <DossierSummaryView
            sessionState={session}
            onBackToLab={() => setSession((p) => ({ ...p, screen: 'lab_active' }))}
            onSelectChallenge={handleSelectChallenge}
          />
        )}

        {session.screen === 'final_closing' && (
          <ClosingScreen
            sessionState={session}
            onViewDossier={() => setSession((p) => ({ ...p, screen: 'dossier_summary' }))}
            onResetSession={handleConfirmReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-400 font-mono">
        <p>
          Laboratorio de Análisis Energético • Licenciatura en Enseñanza y Aprendizaje en Educación Secundaria (Física)
        </p>
      </footer>

      {/* Modals */}
      <FormulaReferenceModal
        isOpen={session.activeModal === 'formulas'}
        onClose={() => setSession((p) => ({ ...p, activeModal: 'none' }))}
      />

      <BadgesModal
        isOpen={session.activeModal === 'badges'}
        onClose={() => setSession((p) => ({ ...p, activeModal: 'none' }))}
        badges={session.badges}
      />

      <HintModal
        isOpen={session.activeModal === 'hint'}
        onClose={() => setSession((p) => ({ ...p, activeModal: 'none' }))}
        hint={currentRouteOption.hint}
        challengeNumber={session.currentChallengeId}
        routeTitle={currentRouteOption.title}
        hintsUsedCount={currentDraft.hintsUsedCount || 0}
      />

      <ResetConfirmModal
        isOpen={session.activeModal === 'reset_confirm'}
        onClose={() => setSession((p) => ({ ...p, activeModal: 'none' }))}
        onConfirmReset={handleConfirmReset}
      />

      <DossierDetailModal
        challengeId={session.selectedDossierDetailId}
        submission={session.selectedDossierDetailId ? session.submissions[session.selectedDossierDetailId] : null}
        onClose={() =>
          setSession((p) => ({
            ...p,
            activeModal: 'none',
            selectedDossierDetailId: undefined,
          }))
        }
      />
    </div>
  );
}
