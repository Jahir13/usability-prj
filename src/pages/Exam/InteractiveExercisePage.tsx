import { useState, useEffect } from "react";
import { useExerciseSession, useUser, useProgress } from "../../context/LingoContext";
import { EXERCISES_DATABASE } from "../../config/lessonsData";
import { CONFIG } from "../../config/constants";
import { ChoiceExercise } from "../../components/exam/ChoiceExercise";
import { FillBlankExercise } from "../../components/exam/FillBlankExercise";
import { WritingExercise } from "../../components/exam/WritingExercise";
import { SpeakingExercise } from "../../components/exam/SpeakingExercise";
import { ListeningExercise } from "../../components/exam/ListeningExercise";
import { FeedbackModal } from "../../components/exam/FeedbackModal";
import { PauseModal } from "../../components/exam/PauseModal";
import { ResultsSummaryPage } from "../../components/exam/ResultsSummaryPage";
import { AppHeader } from "../../components/layout/AppHeader";
import { figmaTokens } from "../../styles/tokens";
import { ArrowRight } from "lucide-react";
import type { ActiveSkill } from "../../types";

type InteractiveExercisePageProps = {
  levelId: string;
  skill?: ActiveSkill;
  onNavigate: (route: string) => void;
};

export function InteractiveExercisePage({
  levelId,
  skill = "grammar",
  onNavigate,
}: InteractiveExercisePageProps) {
  const { addXp } = useUser();
  const { progress, completeLevel } = useProgress();
  const {
    session,
    startSession,
    submitAnswer,
    togglePause,
    nextExercise,
    resetSession,
  } = useExerciseSession();

  // Local interaction states
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [reorderedWords, setReorderedWords] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDone, setRecordingDone] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Initialize quiz session
  useEffect(() => {
    const exercises = EXERCISES_DATABASE[levelId] || [];
    startSession(levelId, exercises);
    return () => resetSession();
  }, [levelId]);

  const currentQuestion = session.exercises[session.currentExerciseIndex];

  // Reset local states on question index change
  useEffect(() => {
    setSelectedOption(null);
    setInputText("");
    setReorderedWords([]);
    setIsRecording(false);
    setRecordingDone(false);
    setIsSubmitted(false);
  }, [session.currentExerciseIndex]);

  if (!currentQuestion) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading lesson...</div>;
  }

  const checkAnswer = () => {
    let correct = false;
    if (currentQuestion.type === "choice") {
      correct = selectedOption === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === "input") {
      correct = inputText.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    } else if (currentQuestion.type === "reorder") {
      correct = reorderedWords.join(" ").toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    } else if (currentQuestion.type === "speaking") {
      correct = recordingDone;
    } else if (currentQuestion.type === "listening") {
      const cleanInput = inputText.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      const cleanCorrect = currentQuestion.correctAnswer.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      correct = cleanInput === cleanCorrect;
    }

    setIsCorrect(correct);
    setIsSubmitted(true);
    submitAnswer(currentQuestion.id, selectedOption || inputText || reorderedWords.join(" "), correct);
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecordingDone(true);
    }, CONFIG.AUDIO.MOCK_RECORDING_DURATION_MS);
  };

  const playTTS = () => {
    if (!currentQuestion.audioText) return;
    setIsPlayingAudio(true);
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(currentQuestion.audioText);
      u.lang = "en-US";
      u.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(u);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  const handleWordSelect = (word: string) => {
    if (reorderedWords.includes(word)) {
      setReorderedWords((prev) => prev.filter((w) => w !== word));
    } else {
      setReorderedWords((prev) => [...prev, word]);
    }
  };

  const handleRepeatLevel = () => {
    const exercises = EXERCISES_DATABASE[levelId] || [];
    startSession(levelId, exercises);
  };

  const handleComplete = () => {
    const correctCount = session.results.filter((r) => r.isCorrect).length;
    const earned = correctCount * CONFIG.XP.BASE_EXERCISE_XP;
    addXp(earned);
    completeLevel(skill, levelId);
    onNavigate("#/dashboard");
  };

  // Remaining time and progress percents
  const remainingTime = Math.max(0, CONFIG.TIMER.DEFAULT_DURATION_SECONDS - session.elapsedTime);
  const progressPercent = (session.currentExerciseIndex / session.exercises.length) * 100;
  const correctCount = session.results.filter((r) => r.isCorrect).length;

  const allLevels = progress.flatMap((sp) => sp.units?.flatMap((u) => u.levels) || sp.levels || []);
  const currentLevel = allLevels.find((l) => l.id === levelId);
  const levelTitle = currentLevel?.title || "Grammar Practice";

  if (session.isFinished) {
    return (
      <div style={{ minHeight: "100vh", background: figmaTokens.colors.background.app }}>
        <AppHeader variant="default" onHomeClick={() => onNavigate("#/dashboard")} />
        <main style={{ padding: "80px 24px", boxSizing: "border-box" }}>
          <ResultsSummaryPage
            score={correctCount}
            total={session.exercises.length}
            xpEarned={correctCount * CONFIG.XP.BASE_EXERCISE_XP}
            levelTitle={levelTitle}
            onContinue={handleComplete}
            onRepeat={handleRepeatLevel}
          />
        </main>
      </div>
    );
  }

  const isCheckDisabled =
    (currentQuestion.type === "choice" && !selectedOption) ||
    (currentQuestion.type === "input" && !inputText) ||
    (currentQuestion.type === "reorder" && reorderedWords.length === 0) ||
    (currentQuestion.type === "speaking" && !recordingDone) ||
    (currentQuestion.type === "listening" && !inputText);

  return (
    <div style={{ minHeight: "100vh", background: figmaTokens.colors.background.app }}>
      <AppHeader
        variant="exercise"
        progress={progressPercent}
        counter={remainingTime}
        onPause={() => togglePause(true)}
      />

      <main style={{ 
        paddingTop: figmaTokens.layout.headerHeight, 
        paddingLeft: 24, 
        paddingRight: 24, 
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          maxWidth: 680,
          width: "100%",
          margin: "40px auto",
          background: figmaTokens.colors.surface.white,
          borderRadius: figmaTokens.layout.grammarLesson.cardRadius,
          border: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
          boxShadow: figmaTokens.layout.learningPath.unitCardShadow,
          padding: 32,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ ...figmaTokens.typography.styles.eyebrow, color: figmaTokens.colors.primary[500] }}>
              EXERCISE {session.currentExerciseIndex + 1} OF {session.exercises.length}
            </span>
            <span style={{ 
              ...figmaTokens.typography.styles.labelSmall, 
              color: remainingTime < CONFIG.TIMER.WARNING_THRESHOLD_SECONDS ? figmaTokens.colors.danger[500] : figmaTokens.colors.text.secondary 
            }}>
              ⏱️ {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, "0")}
            </span>
          </div>

          <div>
            <h2 style={{ 
              fontFamily: figmaTokens.typography.families.heading,
              fontWeight: figmaTokens.typography.weights.bold,
              fontSize: 20,
              color: figmaTokens.colors.text.primary,
              margin: "0 0 12px 0"
            }}>
              {currentQuestion.instruction}
            </h2>
          </div>

          {/* Render specific question presentation elements */}
          <div style={{ minHeight: 120 }}>
            {currentQuestion.type === "choice" && currentQuestion.options && (
              <ChoiceExercise
                prompt={currentQuestion.prompt}
                options={currentQuestion.options}
                selectedOption={selectedOption}
                isSubmitted={isSubmitted}
                onSelect={setSelectedOption}
              />
            )}
            {currentQuestion.type === "input" && (
              <FillBlankExercise
                prompt={currentQuestion.prompt}
                value={inputText}
                isSubmitted={isSubmitted}
                onChange={setInputText}
              />
            )}
            {currentQuestion.type === "reorder" && currentQuestion.options && (
              <WritingExercise
                options={currentQuestion.options}
                selectedWords={reorderedWords}
                isSubmitted={isSubmitted}
                onSelectWord={handleWordSelect}
              />
            )}
            {currentQuestion.type === "speaking" && (
              <SpeakingExercise
                prompt={currentQuestion.prompt}
                isRecording={isRecording}
                recordingDone={recordingDone}
                isSubmitted={isSubmitted}
                onStartRecording={startRecording}
              />
            )}
            {currentQuestion.type === "listening" && (
              <ListeningExercise
                value={inputText}
                isPlayingAudio={isPlayingAudio}
                isSubmitted={isSubmitted}
                onChange={setInputText}
                onPlayAudio={playTTS}
              />
            )}
          </div>

          {isSubmitted && (
            <FeedbackModal
              isCorrect={isCorrect}
              correctAnswer={currentQuestion.correctAnswer}
              translation={currentQuestion.translation}
            />
          )}

          <div style={{ display: "flex", gap: 16 }}>
            <button
              type="button"
              onClick={() => togglePause(true)}
              style={{
                height: 52,
                borderRadius: figmaTokens.layout.grammarLesson.startButtonRadius,
                border: `${figmaTokens.borderWidths.hairline}px solid ${figmaTokens.colors.border.default}`,
                background: figmaTokens.colors.surface.white,
                color: figmaTokens.colors.text.secondary,
                flex: 1,
                fontWeight: figmaTokens.typography.weights.medium,
                cursor: "pointer",
              }}
            >
              Quit
            </button>

            {!isSubmitted ? (
              <button
                type="button"
                onClick={checkAnswer}
                disabled={isCheckDisabled}
                style={{
                  height: 52,
                  borderRadius: figmaTokens.layout.grammarLesson.startButtonRadius,
                  border: 0,
                  background: figmaTokens.colors.primary[500],
                  color: figmaTokens.colors.text.onPrimary,
                  flex: 2,
                  fontWeight: figmaTokens.typography.weights.bold,
                  cursor: isCheckDisabled ? "not-allowed" : "pointer",
                  opacity: isCheckDisabled ? 0.6 : 1,
                }}
              >
                Check Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={nextExercise}
                style={{
                  height: 52,
                  borderRadius: figmaTokens.layout.grammarLesson.startButtonRadius,
                  border: 0,
                  background: figmaTokens.colors.success[500],
                  color: figmaTokens.colors.text.onPrimary,
                  flex: 2,
                  fontWeight: figmaTokens.typography.weights.bold,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                Continue
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </main>

      <PauseModal
        isOpen={session.isPaused}
        onResume={() => togglePause(false)}
        onQuit={() => onNavigate("#/dashboard")}
      />
    </div>
  );
}
