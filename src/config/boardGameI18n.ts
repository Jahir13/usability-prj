import type { BoardGameAnnouncement } from "../types/boardGame";

type AnnouncementFormatter = (announcement: BoardGameAnnouncement) => string;

export interface BoardGameStrings {
  launcherTitle: string;
  launcherDescription: string;
  launcherPlayButton: string;
  launcherComingSoon: string;
  setupSubtitle: string;
  setupPlayerCountLabel: string;
  setupPlayerNameLabel: (n: number) => string;
  setupPlayerNamePlaceholder: (n: number) => string;
  setupStartButton: string;
  rollDiceButton: string;
  rollDiceAriaLabel: (name: string) => string;
  quitButton: string;
  squareLabel: (n: number) => string;
  squareStart: string;
  squareChallenge: string;
  squareFinish: string;
  squareOccupancy: (names: string) => string;
  currentTurnTag: string;
  playersListLabel: string;
  boardLabel: string;
  challengeHeading: (name: string) => string;
  challengeSubmit: string;
  challengeContinue: string;
  winnerHeading: (name: string) => string;
  winnerSubtitle: string;
  winnerPlayAgain: string;
  winnerBackToGames: string;
  announce: AnnouncementFormatter;
}

// Board Race is always in English — same as the rest of the app's exercise
// content, which is always English regardless of the player's profile
// (English is the language being learned, not a display-language setting).
export const BOARD_GAME_STRINGS: BoardGameStrings = {
  launcherTitle: "Board Race",
  launcherDescription:
    "A pass-and-play board game for 2–5 players. Roll the dice, answer the question — get it right and you advance, get it wrong and you stay put.",
  launcherPlayButton: "Play the board game",
  launcherComingSoon: "More games coming soon.",
  setupSubtitle: "Pass the device around — first to land exactly on the finish wins.",
  setupPlayerCountLabel: "Number of players",
  setupPlayerNameLabel: (n) => `Player ${n} name`,
  setupPlayerNamePlaceholder: (n) => `Player ${n}`,
  setupStartButton: "Start game",
  rollDiceButton: "Roll dice",
  rollDiceAriaLabel: (name) => `Roll dice for ${name}`,
  quitButton: "Quit to Games",
  squareLabel: (n) => `Square ${n}`,
  squareStart: "Start",
  squareChallenge: "Challenge",
  squareFinish: "Finish",
  squareOccupancy: (names) => `On this square: ${names}`,
  currentTurnTag: "(current turn)",
  playersListLabel: "Players",
  boardLabel: "Board game track",
  challengeHeading: (name) => `${name}'s challenge`,
  challengeSubmit: "Submit answer",
  challengeContinue: "Continue",
  winnerHeading: (name) => `${name} wins!`,
  winnerSubtitle: "Great game — practicing pays off.",
  winnerPlayAgain: "Play again",
  winnerBackToGames: "Back to Games",
  announce: (a) => {
    switch (a.key) {
      case "turnStart":
        return `${a.name}'s turn. Roll the dice!`;
      case "correctAdvance":
        if (a.won) return `${a.name} rolled a ${a.value}, answered correctly, and landed exactly on the finish — ${a.name} wins!`;
        if (a.bounced) return `${a.name} rolled a ${a.value}, answered correctly, overshot the finish, and bounced back to square ${a.square}.`;
        return `${a.name} rolled a ${a.value}, answered correctly, and advanced to square ${a.square}.`;
      case "incorrectStay":
        return `${a.name} rolled a ${a.value} but didn't answer correctly — stays on square ${a.square}.`;
    }
  },
};
