import { useState, useEffect, useRef } from "react";
import { useExerciseSession, useUser, useProgress } from "../../context/LingoContext";
import { getLevelContent, getTopicExercises } from "../../config/lessonsData";
import { CONFIG } from "../../config/constants";
import { isTypedAnswerCorrect, isReorderAnswerCorrect } from "../../utils/answers";
import { ChoiceExercise } from "../../components/exam/ChoiceExercise";
import { FillBlankExercise } from "../../components/exam/FillBlankExercise";
import { WritingExercise } from "../../components/exam/WritingExercise";
import { SpeakingExercise } from "../../components/exam/SpeakingExercise";
import { ListeningExercise } from "../../components/exam/ListeningExercise";
import { FeedbackModal } from "../../components/exam/FeedbackModal";
import { PauseModal } from "../../components/exam/PauseModal";
import { ResultsSummaryPage } from "../../components/exam/ResultsSummaryPage";
import { AppHeader } from "../../components/layout/AppHeader";
import { ReadableRegion } from "../../components/ui/ReadableRegion";
import { ArrowRight, HelpCircle } from "lucide-react";
import type { ActiveSkill, Exercise } from "../../types";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

type InteractiveExercisePageProps = {
  levelId: string;
  /** Id of the specific sub-lesson whose exercise bank should be played. */
  topicId: string;
  skill?: ActiveSkill;
  onNavigate: (route: string) => void;
};

const GUIDANCE_ID = "exercise-guidance";

/** Default guidance per exercise type, used when the content has no `hint`. */
function fallbackHint(exercise: Exercise): string {
  switch (exercise.type) {
    case "choice":
      return "Select one option only. Just one of them is correct.";
    case "input":
      return "Write only what the instruction asks for. Do not rewrite the whole sentence unless it says so.";
    case "reorder":
      return "Use every word once, in the correct order.";
    case "speaking":
      return "Say the sentence exactly as it is written, or type it with the keyboard option.";
    case "listening":
      return "Play the audio as many times as you need, or open the transcript.";
    default:
      return "";
  }
}

export function InteractiveExercisePage({
  levelId,
  topicId,
  skill = "grammar",
  onNavigate,
}: InteractiveExercisePageProps) {
  const { addXp } = useUser();
  const { progress, completeLevel, completeTopic } = useProgress();
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
  const [selectedWordIndexes, setSelectedWordIndexes] = useState<number[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDone, setRecordingDone] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  // Accessible keyboard alternative to the microphone for speaking exercises.
  const [useTypedAnswer, setUseTypedAnswer] = useState(false);
  const [typedSpeakingAnswer, setTypedSpeakingAnswer] = useState("");
  // The "How to answer" guidance starts collapsed; it is revealed only when
  // the person asks for it, so it does not hand out the exact answer upfront.
  const [showGuidance, setShowGuidance] = useState(false);

  /** Focus lands on the instruction of each new exercise (screen readers). */
  const instructionRef = useRef<HTMLHeadingElement>(null);

  const levelContent = getLevelContent(skill, levelId);
  const topics = levelContent?.lessonTopics || [];
  const currentTopic = topics.find((t) => t.id === topicId);
  const topicIndex = topics.findIndex((t) => t.id === topicId);
  const isLastTopicInLevel = topicIndex === -1 || topicIndex === topics.length - 1;

  // Initialize quiz session with the exercises belonging to this specific sub-lesson.
  useEffect(() => {
    const exercises = getTopicExercises(skill, levelId, topicId);
    startSession(topicId, exercises);
    return () => resetSession();
  }, [levelId, topicId, skill]);

  const currentQuestion: Exercise | undefined = session.exercises[session.currentExerciseIndex];

  // Reset local states on question index change
  useEffect(() => {
    setSelectedOption(null);
    setInputText("");
    setSelectedWordIndexes([]);
    setIsRecording(false);
    setRecordingDone(false);
    setIsSubmitted(false);
    setUseTypedAnswer(false);
    setTypedSpeakingAnswer("");
    setShowGuidance(false);
    instructionRef.current?.focus();
  }, [session.currentExerciseIndex]);

  if (!currentQuestion) {
    return <div className="p-10 text-center">Loading lesson...</div>;
  }

  const builtSentence = selectedWordIndexes
    .map((index) => currentQuestion.options?.[index] ?? "")
    .join(" ");

  const checkAnswer = () => {
    let correct = false;
    if (currentQuestion.type === "choice") {
      correct = selectedOption === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === "input") {
      correct = isTypedAnswerCorrect(currentQuestion, inputText);
    } else if (currentQuestion.type === "reorder") {
      correct = isReorderAnswerCorrect(currentQuestion, builtSentence);
    } else if (currentQuestion.type === "speaking") {
      correct = useTypedAnswer
        ? isTypedAnswerCorrect(currentQuestion, typedSpeakingAnswer)
        : recordingDone;
    } else if (currentQuestion.type === "listening") {
      correct = isTypedAnswerCorrect(currentQuestion, inputText);
    }

    setIsCorrect(correct);
    setIsSubmitted(true);
    submitAnswer(
      currentQuestion.id,
      selectedOption || inputText || builtSentence || typedSpeakingAnswer,
      correct
    );
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

  /** Adds the word if it is not used yet, removes it otherwise. */
  const handleWordToggle = (index: number) => {
    setSelectedWordIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRepeatLevel = () => {
    const exercises = getTopicExercises(skill, levelId, topicId);
    startSession(topicId, exercises);
  };

  const handleComplete = () => {
    const correctCount = session.results.filter((r) => r.isCorrect).length;
    const practiceXp = correctCount * CONFIG.XP.BASE_EXERCISE_XP;
    const lessonXp = currentTopic?.xpReward ?? 0;
    addXp(practiceXp + lessonXp);

    if (isLastTopicInLevel) {
      // Completing the final sub-lesson also marks the whole level as done
      // and unlocks the next level on the dashboard.
      completeLevel(skill, levelId);
      onNavigate("#/dashboard");
    } else {
      // Mark just this sub-lesson as done; the level stays "current" and
      // the next sub-lesson becomes active automatically.
      completeTopic(topicId);
      onNavigate(`#/learn/${skill}/${levelId}/lesson`);
    }
  };

  // Remaining time and progress percents
  const remainingTime = Math.max(0, CONFIG.TIMER.DEFAULT_DURATION_SECONDS - session.elapsedTime);
  const progressPercent = (session.currentExerciseIndex / session.exercises.length) * 100;
  const correctCount = session.results.filter((r) => r.isCorrect).length;

  const allLevels = progress.flatMap((sp) => sp.units?.flatMap((u) => u.levels) || sp.levels || []);
  const currentLevel = allLevels.find((l) => l.id === levelId);
  const lessonTitle = currentTopic?.title || currentLevel?.title || "Practice";

  if (session.isFinished) {
    return (
      <div className="min-h-screen bg-background-app">
        <AppHeader variant="default" onHomeClick={() => onNavigate("#/dashboard")} />
        <main className="py-20 px-6 box-border">
          <ResultsSummaryPage
            score={correctCount}
            total={session.exercises.length}
            xpEarned={correctCount * CONFIG.XP.BASE_EXERCISE_XP + (currentTopic?.xpReward ?? 0)}
            levelTitle={lessonTitle}
            continueLabel={isLastTopicInLevel ? "Back to Dashboard" : "Next Lesson"}
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
    (currentQuestion.type === "reorder" && selectedWordIndexes.length === 0) ||
    (currentQuestion.type === "speaking" &&
      (useTypedAnswer ? !typedSpeakingAnswer.trim() : !recordingDone)) ||
    (currentQuestion.type === "listening" && !inputText);

  const hintText = currentQuestion.hint || fallbackHint(currentQuestion);

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
            <span
              className={`text-labelSmall ${
                remainingTime < CONFIG.TIMER.WARNING_THRESHOLD_SECONDS
                  ? "text-danger-500"
                  : "text-text-secondary"
              }`}
            >
              <span aria-hidden="true">⏱️ </span>
              <span className="sr-only">Time left: </span>
              {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, "0")}
            </span>
          </div>

          <div className="text-left">
            {/*
              The instruction is the heading of the exercise and receives focus
              when the exercise changes, so screen reader users always hear the
              new task before reaching the answer controls.
            */}
            <h1
              ref={instructionRef}
              tabIndex={-1}
              className="font-heading text-brand text-text-primary m-0 mb-3 text-left focus-visible:outline-none"
            >
              {currentQuestion.instruction}
            </h1>
            <p className="sr-only">
              Exercise {session.currentExerciseIndex + 1} of {session.exercises.length} of the
              lesson {lessonTitle}.
            </p>
          </div>

          {/*
            Guidance region: collapsed by default so it does not hand out the
            answer upfront. It only appears once the person asks for it, and
            is focusable so tabbing through the exercise reaches the
            explanation of what exactly is expected.
          */}
          {hintText && (
            <div className="text-left">
              <button
                type="button"
                onClick={() => setShowGuidance((prev) => !prev)}
                aria-expanded={showGuidance}
                aria-controls={GUIDANCE_ID}
                className="inline-flex items-center gap-2 text-labelSmall text-primary-500 underline underline-offset-2 bg-transparent border-0 cursor-pointer p-1 rounded-sm hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
              >
                <HelpCircle size={16} aria-hidden="true" />
                {showGuidance ? "Hide how to answer" : "How to answer"}
              </button>

              {showGuidance && (
                <ReadableRegion
                  id={GUIDANCE_ID}
                  label="How to answer this exercise"
                  className="bg-primary-soft border-l-4 border-primary-500 p-4 px-5 text-left mt-2"
                >
                  <h2 className="text-eyebrow text-primary-500 m-0 mb-1">HOW TO ANSWER</h2>
                  <p className="text-bodySmall text-text-primary m-0">{hintText}</p>
                </ReadableRegion>
              )}
            </div>
          )}

          {/* Render specific question presentation elements */}
          <div className="min-h-[120px]">
            {currentQuestion.type === "choice" && currentQuestion.options && (
              <ChoiceExercise
                name={`choice-${currentQuestion.id}`}
                prompt={currentQuestion.prompt}
                options={currentQuestion.options}
                selectedOption={selectedOption}
                isSubmitted={isSubmitted}
                onSelect={setSelectedOption}
                describedBy={hintText && showGuidance ? GUIDANCE_ID : undefined}
              />
            )}
            {currentQuestion.type === "input" && (
              <FillBlankExercise
                prompt={currentQuestion.prompt}
                value={inputText}
                isSubmitted={isSubmitted}
                onChange={setInputText}
                answerLabel={currentQuestion.answerLabel}
                expectedFormat={currentQuestion.expectedFormat}
                describedBy={hintText && showGuidance ? GUIDANCE_ID : undefined}
              />
            )}
            {currentQuestion.type === "reorder" && currentQuestion.options && (
              <WritingExercise
                options={currentQuestion.options}
                selectedIndexes={selectedWordIndexes}
                isSubmitted={isSubmitted}
                onToggleWord={handleWordToggle}
                describedBy={hintText && showGuidance ? GUIDANCE_ID : undefined}
              />
            )}
            {currentQuestion.type === "speaking" && (
              <SpeakingExercise
                prompt={currentQuestion.prompt}
                isRecording={isRecording}
                recordingDone={recordingDone}
                isSubmitted={isSubmitted}
                onStartRecording={startRecording}
                useTypedAnswer={useTypedAnswer}
                typedAnswer={typedSpeakingAnswer}
                onToggleTypedAnswer={() => setUseTypedAnswer((prev) => !prev)}
                onTypedAnswerChange={setTypedSpeakingAnswer}
                answerLabel={currentQuestion.answerLabel}
                expectedFormat={currentQuestion.expectedFormat}
                describedBy={hintText && showGuidance ? GUIDANCE_ID : undefined}
              />
            )}
            {currentQuestion.type === "listening" && (
              <ListeningExercise
                value={inputText}
                isPlayingAudio={isPlayingAudio}
                isSubmitted={isSubmitted}
                onChange={setInputText}
                onPlayAudio={playTTS}
                transcriptText={currentQuestion.audioText || currentQuestion.correctAnswer}
                answerLabel={currentQuestion.answerLabel}
                expectedFormat={currentQuestion.expectedFormat}
                describedBy={hintText && showGuidance ? GUIDANCE_ID : undefined}
              />
            )}
          </div>

          {isSubmitted && (
            <FeedbackModal
              isCorrect={isCorrect}
              correctAnswer={currentQuestion.correctAnswer}
              translation={currentQuestion.translation}
              explanation={currentQuestion.explanation}
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
                <ArrowRight aria-hidden="true" size={18} />
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
