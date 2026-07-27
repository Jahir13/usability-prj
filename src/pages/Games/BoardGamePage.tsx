import { AppHeader } from "../../components/layout/AppHeader";
import { useUser } from "../../context/LingoContext";
import { useBoardGame } from "../../hooks/useBoardGame";
import { useBoardGameStrings } from "../../hooks/useBoardGameStrings";
import { GameSetupScreen } from "../../components/boardgame/GameSetupScreen";
import { TurnBanner } from "../../components/boardgame/TurnBanner";
import { DiceRoller } from "../../components/boardgame/DiceRoller";
import { BoardTrack } from "../../components/boardgame/BoardTrack";
import { PlayersSummary } from "../../components/boardgame/PlayersSummary";
import { ChallengeModal } from "../../components/boardgame/ChallengeModal";
import { WinnerScreen } from "../../components/boardgame/WinnerScreen";
import { Button } from "../../components/ui/Button";
import { WIN_XP_REWARD } from "../../config/boardGameConfig";

type BoardGamePageProps = {
  onNavigate: (route: string) => void;
};

export function BoardGamePage({ onNavigate }: BoardGamePageProps) {
  const { addXp } = useUser();
  const strings = useBoardGameStrings();
  const {
    state,
    rollDice,
    setPlayerCount,
    setPlayerName,
    confirmSetup,
    resolveChallenge,
    playAgain,
    resetToSetup,
  } = useBoardGame();

  const currentPlayer = state.players[state.currentPlayerIndex];
  const winner = state.players.find((p) => p.id === state.winnerId);

  const handleQuit = () => {
    resetToSetup();
    onNavigate("#/dashboard");
  };

  const handleStart = () => {
    const defaultNames = Array.from({ length: state.setupPlayerCount }, (_, i) =>
      strings.setupPlayerNamePlaceholder(i + 1)
    );
    confirmSetup(defaultNames);
  };

  const handleBackToGames = () => {
    addXp(WIN_XP_REWARD);
    onNavigate("#/dashboard");
  };

  return (
    <div className="min-h-screen bg-background-app">
      <AppHeader onHomeClick={handleQuit} onProfileClick={() => onNavigate("#/profile")} />

      <main className="pt-20 px-4 md:px-8 pb-10 box-border flex flex-col items-center" lang={strings.languageTag}>
        {state.phase === "setup" && (
          <GameSetupScreen
            playerCount={state.setupPlayerCount}
            names={state.setupNames}
            onChangePlayerCount={setPlayerCount}
            onChangeName={setPlayerName}
            onStart={handleStart}
          />
        )}

        {state.phase === "playing" && currentPlayer && (
          <div className="max-w-[720px] w-full flex flex-col gap-5 my-6">
            <TurnBanner announcement={state.announcement} />

            <div className="flex items-center justify-between flex-wrap gap-4">
              <DiceRoller
                value={state.dice.value}
                isRolling={state.dice.isRolling}
                disabled={state.turnLocked}
                currentPlayer={currentPlayer}
                onRoll={rollDice}
              />
              <Button type="button" variant="ghost" size="sm" onClick={handleQuit}>
                {strings.quitButton}
              </Button>
            </div>

            <BoardTrack players={state.players} />
            <PlayersSummary players={state.players} currentPlayerId={currentPlayer.id} />

            <ChallengeModal
              key={state.activeChallenge?.exercise.id ?? "none"}
              challenge={state.activeChallenge}
              currentPlayerName={currentPlayer.name}
              onResolve={resolveChallenge}
            />
          </div>
        )}

        {state.phase === "finished" && winner && (
          <WinnerScreen winnerName={winner.name} onPlayAgain={playAgain} onBackToGames={handleBackToGames} />
        )}
      </main>
    </div>
  );
}
