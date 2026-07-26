import { useState, useEffect } from "react";
import { useExerciseSession, useUser, useProgress } from "../../context/LingoContext";
import { getLevelContent } from "../../config/lessonsData";
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
import { ArrowRight } from "lucide-react";
import type { ActiveSkill } from "../../types";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { gradeExercise } from "../../utils/gradeExercise";

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

  const levelContent = getLevelContent(skill, levelId);

  // Initialize quiz session
  useEffect(() => {
    const exercises = levelContent?.exercises || [];
    startSession(levelId, exercises);
    return () => resetSession();
  }, [levelId, skill]);

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
    return <div className="p-10 text-center">Loading lesson...</div>;
  }

  const checkAnswer = () => {
    const correct = gradeExercise(currentQuestion, {
      selectedOption,
      inputText,
      reorderedWords,
      recordingDone,
    });

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
    const exercises = levelContent?.exercises || [];
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
  const levelTitle = levelContent?.lessonTopics[0]?.title || currentLevel?.title || "Practice";

  if (session.isFinished) {
    return (
      <div className="min-h-screen bg-background-app">
        <AppHeader variant="default" onHomeClick={() => onNavigate("#/dashboard")} />
        <main className="py-20 px-6 box-border">
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
    <div className="min-h-screen bg-background-app">
      <AppHeader
        variant="exercise"
        progress={progressPercent}
        counter={remainingTime}
        onPause={() => togglePause(true)}
      />

      <main className="pt-16 px-4 md:px-8 box-border flex flex-col items-center">
        <Card className="max-w-[680px] w-full mx-auto my-10 p-8 flex flex-col gap-6">
          <div className="flex justify-between text-left">
            <span className="text-eyebrow text-primary-500">
              EXERCISE {session.currentExerciseIndex + 1} OF {session.exercises.length}
            </span>
            <span className={`text-labelSmall ${
              remainingTime < CONFIG.TIMER.WARNING_THRESHOLD_SECONDS ? "text-danger-500" : "text-text-secondary"
            }`}>
              ⏱️ {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, "0")}
            </span>
          </div>

          <div className="text-left">
            <h2 className="font-heading font-bold text-[20px] text-text-primary m-0 mb-3 text-left">
              {currentQuestion.instruction}
            </h2>
          </div>

          {/* Render specific question presentation elements */}
          <div className="min-h-[120px]">
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

          <div className="flex gap-4 w-full">
            <Button
              type="button"
              onClick={() => togglePause(true)}
              variant="secondary"
              size="lg"
              className="flex-1 font-medium"
            >
              Quit
            </Button>

            {!isSubmitted ? (
              <Button
                type="button"
                onClick={checkAnswer}
                disabled={isCheckDisabled}
                variant="primary"
                size="lg"
                className="flex-[2]"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextExercise}
                variant="primary"
                size="lg"
                className="bg-success-500 shadow-[0_6px_10px_rgba(60,201,122,0.35)] hover:shadow-[0_6px_20px_rgba(60,201,122,0.4)] focus-visible:ring-success-500 flex-[2] inline-flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight size={18} />
              </Button>
            )}
          </div>
        </Card>
      </main>

      <PauseModal
        isOpen={session.isPaused}
        onResume={() => togglePause(false)}
        onQuit={() => onNavigate("#/dashboard")}
      />
    </div>
  );
}
