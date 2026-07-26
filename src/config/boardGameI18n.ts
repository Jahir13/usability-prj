import type { BoardGameAnnouncement } from "../types/boardGame";

// Matches the options offered on the profile's "Native language" field
// (see src/pages/Auth/AuthPages.tsx). "English" is kept only as a safe
// fallback for an empty/unrecognized value — it isn't a selectable option,
// since English is the language being learned, not a native language here.
export type SupportedLanguage = "English" | "Spanish" | "Portuguese" | "French" | "Italian" | "German";

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["Spanish", "Portuguese", "French", "Italian", "German"];

export function resolveLanguage(nativeLanguage?: string): SupportedLanguage {
  if (nativeLanguage && (SUPPORTED_LANGUAGES as string[]).includes(nativeLanguage)) {
    return nativeLanguage as SupportedLanguage;
  }
  return "English";
}

// BCP-47 tags for the `lang` attribute — the app's <html lang="en"> never
// changes, so any element that actually renders one of these translations
// needs its own `lang` override (WCAG 3.1.2 Language of Parts).
export const LANGUAGE_TAGS: Record<SupportedLanguage, string> = {
  English: "en",
  Spanish: "es",
  Portuguese: "pt",
  French: "fr",
  Italian: "it",
  German: "de",
};

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
  challengeSkip: string;
  challengeSubmit: string;
  challengeContinue: string;
  winnerHeading: (name: string) => string;
  winnerSubtitle: string;
  winnerPlayAgain: string;
  winnerBackToGames: string;
  announce: AnnouncementFormatter;
}

const english: BoardGameStrings = {
  launcherTitle: "Board Race",
  launcherDescription:
    "A pass-and-play board game for 2–5 players. Roll the dice, answer a challenge on every square, and be the first to land exactly on the finish.",
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
  challengeSkip: "Skip (no bonus)",
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
      case "moved":
        return `${a.name} rolled a ${a.value} and moved to square ${a.square} — a challenge!`;
      case "bounced":
        return `${a.name} rolled a ${a.value}, overshot the finish, and bounced back to square ${a.square} — a challenge!`;
      case "wonExact":
        return `${a.name} rolled a ${a.value} and landed exactly on the finish — ${a.name} wins!`;
      case "challengeCorrectMoved":
        return `${a.name} answered correctly and moved ${a.bonus} extra squares to square ${a.square} — another challenge!`;
      case "challengeCorrectWin":
        return `${a.name} answered correctly, moved ${a.bonus} extra squares, and landed exactly on the finish — ${a.name} wins!`;
      case "challengeIncorrect":
        return `${a.name} didn't get it this time — no bonus, but keep going!`;
    }
  },
};

const spanish: BoardGameStrings = {
  launcherTitle: "Carrera de Tablero",
  launcherDescription:
    "Un juego de mesa para pasar el dispositivo entre 2 y 5 jugadores. Tira el dado, responde un reto en cada casilla y sé el primero en caer justo en la meta.",
  launcherPlayButton: "Jugar al juego de mesa",
  launcherComingSoon: "Pronto habrá más juegos.",
  setupSubtitle: "Pasen el dispositivo por turnos — el primero en caer justo en la meta gana.",
  setupPlayerCountLabel: "Número de jugadores",
  setupPlayerNameLabel: (n) => `Nombre del jugador ${n}`,
  setupPlayerNamePlaceholder: (n) => `Jugador ${n}`,
  setupStartButton: "Empezar partida",
  rollDiceButton: "Tirar el dado",
  rollDiceAriaLabel: (name) => `Tirar el dado por ${name}`,
  quitButton: "Salir a Juegos",
  squareLabel: (n) => `Casilla ${n}`,
  squareStart: "Salida",
  squareChallenge: "Reto",
  squareFinish: "Meta",
  squareOccupancy: (names) => `En esta casilla: ${names}`,
  currentTurnTag: "(turno actual)",
  playersListLabel: "Jugadores",
  boardLabel: "Tablero del juego",
  challengeHeading: (name) => `Reto de ${name}`,
  challengeSkip: "Saltar (sin bono)",
  challengeSubmit: "Enviar respuesta",
  challengeContinue: "Continuar",
  winnerHeading: (name) => `¡${name} gana!`,
  winnerSubtitle: "Buena partida — practicar vale la pena.",
  winnerPlayAgain: "Jugar de nuevo",
  winnerBackToGames: "Volver a Juegos",
  announce: (a) => {
    switch (a.key) {
      case "turnStart":
        return `Turno de ${a.name}. ¡Tira el dado!`;
      case "moved":
        return `${a.name} sacó un ${a.value} y avanzó a la casilla ${a.square} — ¡un reto!`;
      case "bounced":
        return `${a.name} sacó un ${a.value}, se pasó de la meta y rebotó a la casilla ${a.square} — ¡un reto!`;
      case "wonExact":
        return `${a.name} sacó un ${a.value} y cayó justo en la meta — ¡${a.name} gana!`;
      case "challengeCorrectMoved":
        return `${a.name} respondió bien y avanzó ${a.bonus} casillas extra hasta la casilla ${a.square} — ¡otro reto!`;
      case "challengeCorrectWin":
        return `${a.name} respondió bien, avanzó ${a.bonus} casillas extra y cayó justo en la meta — ¡${a.name} gana!`;
      case "challengeIncorrect":
        return `${a.name} no acertó esta vez — sin bono, pero sigue adelante.`;
    }
  },
};

const portuguese: BoardGameStrings = {
  launcherTitle: "Corrida no Tabuleiro",
  launcherDescription:
    "Um jogo de tabuleiro para passar o dispositivo entre 2 e 5 jogadores. Jogue o dado, responda a um desafio em cada casa e seja o primeiro a cair exatamente na chegada.",
  launcherPlayButton: "Jogar o jogo de tabuleiro",
  launcherComingSoon: "Mais jogos em breve.",
  setupSubtitle: "Passem o dispositivo entre vocês — quem cair exatamente na chegada primeiro vence.",
  setupPlayerCountLabel: "Número de jogadores",
  setupPlayerNameLabel: (n) => `Nome do jogador ${n}`,
  setupPlayerNamePlaceholder: (n) => `Jogador ${n}`,
  setupStartButton: "Começar partida",
  rollDiceButton: "Jogar o dado",
  rollDiceAriaLabel: (name) => `Jogar o dado por ${name}`,
  quitButton: "Sair para Jogos",
  squareLabel: (n) => `Casa ${n}`,
  squareStart: "Início",
  squareChallenge: "Desafio",
  squareFinish: "Chegada",
  squareOccupancy: (names) => `Nesta casa: ${names}`,
  currentTurnTag: "(turno atual)",
  playersListLabel: "Jogadores",
  boardLabel: "Tabuleiro do jogo",
  challengeHeading: (name) => `Desafio de ${name}`,
  challengeSkip: "Pular (sem bônus)",
  challengeSubmit: "Enviar resposta",
  challengeContinue: "Continuar",
  winnerHeading: (name) => `${name} venceu!`,
  winnerSubtitle: "Boa partida — praticar vale a pena.",
  winnerPlayAgain: "Jogar novamente",
  winnerBackToGames: "Voltar para Jogos",
  announce: (a) => {
    switch (a.key) {
      case "turnStart":
        return `Vez de ${a.name}. Jogue o dado!`;
      case "moved":
        return `${a.name} tirou ${a.value} e avançou para a casa ${a.square} — um desafio!`;
      case "bounced":
        return `${a.name} tirou ${a.value}, passou da chegada e voltou para a casa ${a.square} — um desafio!`;
      case "wonExact":
        return `${a.name} tirou ${a.value} e caiu exatamente na chegada — ${a.name} venceu!`;
      case "challengeCorrectMoved":
        return `${a.name} acertou e avançou ${a.bonus} casas extras até a casa ${a.square} — outro desafio!`;
      case "challengeCorrectWin":
        return `${a.name} acertou, avançou ${a.bonus} casas extras e caiu exatamente na chegada — ${a.name} venceu!`;
      case "challengeIncorrect":
        return `${a.name} não acertou dessa vez — sem bônus, mas continue tentando.`;
    }
  },
};

const french: BoardGameStrings = {
  launcherTitle: "Course sur Plateau",
  launcherDescription:
    "Un jeu de plateau à faire passer entre 2 à 5 joueurs. Lancez le dé, répondez à un défi sur chaque case et soyez le premier à tomber exactement sur l'arrivée.",
  launcherPlayButton: "Jouer au jeu de plateau",
  launcherComingSoon: "D'autres jeux arrivent bientôt.",
  setupSubtitle: "Faites passer l'appareil à tour de rôle — le premier à tomber exactement sur l'arrivée gagne.",
  setupPlayerCountLabel: "Nombre de joueurs",
  setupPlayerNameLabel: (n) => `Nom du joueur ${n}`,
  setupPlayerNamePlaceholder: (n) => `Joueur ${n}`,
  setupStartButton: "Commencer la partie",
  rollDiceButton: "Lancer le dé",
  rollDiceAriaLabel: (name) => `Lancer le dé pour ${name}`,
  quitButton: "Quitter vers Jeux",
  squareLabel: (n) => `Case ${n}`,
  squareStart: "Départ",
  squareChallenge: "Défi",
  squareFinish: "Arrivée",
  squareOccupancy: (names) => `Sur cette case : ${names}`,
  currentTurnTag: "(tour actuel)",
  playersListLabel: "Joueurs",
  boardLabel: "Plateau du jeu",
  challengeHeading: (name) => `Défi de ${name}`,
  challengeSkip: "Passer (sans bonus)",
  challengeSubmit: "Valider la réponse",
  challengeContinue: "Continuer",
  winnerHeading: (name) => `${name} gagne !`,
  winnerSubtitle: "Belle partie — s'entraîner, ça paie.",
  winnerPlayAgain: "Rejouer",
  winnerBackToGames: "Retour aux Jeux",
  announce: (a) => {
    switch (a.key) {
      case "turnStart":
        return `Tour de ${a.name}. Lancez le dé !`;
      case "moved":
        return `${a.name} a fait ${a.value} et avance à la case ${a.square} — un défi !`;
      case "bounced":
        return `${a.name} a fait ${a.value}, a dépassé l'arrivée et recule à la case ${a.square} — un défi !`;
      case "wonExact":
        return `${a.name} a fait ${a.value} et tombe exactement sur l'arrivée — ${a.name} gagne !`;
      case "challengeCorrectMoved":
        return `${a.name} a répondu correctement et avance de ${a.bonus} cases en plus jusqu'à la case ${a.square} — un autre défi !`;
      case "challengeCorrectWin":
        return `${a.name} a répondu correctement, avance de ${a.bonus} cases en plus et tombe exactement sur l'arrivée — ${a.name} gagne !`;
      case "challengeIncorrect":
        return `${a.name} n'a pas trouvé cette fois — pas de bonus, mais continue !`;
    }
  },
};

const italian: BoardGameStrings = {
  launcherTitle: "Corsa sul Tabellone",
  launcherDescription:
    "Un gioco da tavolo da passare tra 2 e 5 giocatori. Tira il dado, rispondi a una sfida su ogni casella e sii il primo a cadere esattamente sul traguardo.",
  launcherPlayButton: "Gioca al gioco da tavolo",
  launcherComingSoon: "Presto altri giochi.",
  setupSubtitle: "Passatevi il dispositivo a turno — il primo che cade esattamente sul traguardo vince.",
  setupPlayerCountLabel: "Numero di giocatori",
  setupPlayerNameLabel: (n) => `Nome del giocatore ${n}`,
  setupPlayerNamePlaceholder: (n) => `Giocatore ${n}`,
  setupStartButton: "Inizia partita",
  rollDiceButton: "Tira il dado",
  rollDiceAriaLabel: (name) => `Tira il dado per ${name}`,
  quitButton: "Esci verso Giochi",
  squareLabel: (n) => `Casella ${n}`,
  squareStart: "Partenza",
  squareChallenge: "Sfida",
  squareFinish: "Traguardo",
  squareOccupancy: (names) => `Su questa casella: ${names}`,
  currentTurnTag: "(turno attuale)",
  playersListLabel: "Giocatori",
  boardLabel: "Tabellone di gioco",
  challengeHeading: (name) => `Sfida di ${name}`,
  challengeSkip: "Salta (senza bonus)",
  challengeSubmit: "Invia risposta",
  challengeContinue: "Continua",
  winnerHeading: (name) => `${name} vince!`,
  winnerSubtitle: "Bella partita — esercitarsi ripaga.",
  winnerPlayAgain: "Gioca ancora",
  winnerBackToGames: "Torna a Giochi",
  announce: (a) => {
    switch (a.key) {
      case "turnStart":
        return `Turno di ${a.name}. Tira il dado!`;
      case "moved":
        return `${a.name} ha tirato ${a.value} ed è avanzato alla casella ${a.square} — una sfida!`;
      case "bounced":
        return `${a.name} ha tirato ${a.value}, ha superato il traguardo ed è tornato alla casella ${a.square} — una sfida!`;
      case "wonExact":
        return `${a.name} ha tirato ${a.value} ed è caduto esattamente sul traguardo — ${a.name} vince!`;
      case "challengeCorrectMoved":
        return `${a.name} ha risposto correttamente e avanza di ${a.bonus} caselle extra fino alla casella ${a.square} — un'altra sfida!`;
      case "challengeCorrectWin":
        return `${a.name} ha risposto correttamente, avanza di ${a.bonus} caselle extra ed è caduto esattamente sul traguardo — ${a.name} vince!`;
      case "challengeIncorrect":
        return `${a.name} non ha indovinato stavolta — niente bonus, ma continua così.`;
    }
  },
};

const german: BoardGameStrings = {
  launcherTitle: "Brettspiel-Rennen",
  launcherDescription:
    "Ein Brettspiel zum Weiterreichen für 2 bis 5 Spieler. Würfle, beantworte auf jedem Feld eine Aufgabe und komm als Erster genau im Ziel an.",
  launcherPlayButton: "Brettspiel spielen",
  launcherComingSoon: "Weitere Spiele folgen bald.",
  setupSubtitle: "Reicht das Gerät reihum weiter — wer zuerst genau im Ziel landet, gewinnt.",
  setupPlayerCountLabel: "Anzahl der Spieler",
  setupPlayerNameLabel: (n) => `Name von Spieler ${n}`,
  setupPlayerNamePlaceholder: (n) => `Spieler ${n}`,
  setupStartButton: "Spiel starten",
  rollDiceButton: "Würfeln",
  rollDiceAriaLabel: (name) => `Würfeln für ${name}`,
  quitButton: "Zurück zu Spiele",
  squareLabel: (n) => `Feld ${n}`,
  squareStart: "Start",
  squareChallenge: "Aufgabe",
  squareFinish: "Ziel",
  squareOccupancy: (names) => `Auf diesem Feld: ${names}`,
  currentTurnTag: "(am Zug)",
  playersListLabel: "Spieler",
  boardLabel: "Spielbrett",
  challengeHeading: (name) => `Aufgabe für ${name}`,
  challengeSkip: "Überspringen (kein Bonus)",
  challengeSubmit: "Antwort abschicken",
  challengeContinue: "Weiter",
  winnerHeading: (name) => `${name} gewinnt!`,
  winnerSubtitle: "Gutes Spiel — Üben zahlt sich aus.",
  winnerPlayAgain: "Nochmal spielen",
  winnerBackToGames: "Zurück zu Spiele",
  announce: (a) => {
    switch (a.key) {
      case "turnStart":
        return `${a.name} ist am Zug. Würfle!`;
      case "moved":
        return `${a.name} hat eine ${a.value} gewürfelt und ist auf Feld ${a.square} gezogen — eine Aufgabe!`;
      case "bounced":
        return `${a.name} hat eine ${a.value} gewürfelt, ist über das Ziel hinausgeschossen und auf Feld ${a.square} zurückgeprallt — eine Aufgabe!`;
      case "wonExact":
        return `${a.name} hat eine ${a.value} gewürfelt und ist genau im Ziel gelandet — ${a.name} gewinnt!`;
      case "challengeCorrectMoved":
        return `${a.name} hat richtig geantwortet und zieht ${a.bonus} Extrafelder bis Feld ${a.square} — noch eine Aufgabe!`;
      case "challengeCorrectWin":
        return `${a.name} hat richtig geantwortet, zieht ${a.bonus} Extrafelder und landet genau im Ziel — ${a.name} gewinnt!`;
      case "challengeIncorrect":
        return `${a.name} hatte diesmal keinen Erfolg — kein Bonus, aber weiter geht's.`;
    }
  },
};

export const BOARD_GAME_STRINGS: Record<SupportedLanguage, BoardGameStrings> = {
  English: english,
  Spanish: spanish,
  Portuguese: portuguese,
  French: french,
  Italian: italian,
  German: german,
};
