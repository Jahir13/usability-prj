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

const spanish: BoardGameStrings = {
  launcherTitle: "Carrera de Tablero",
  launcherDescription:
    "Un juego de mesa para pasar el dispositivo entre 2 y 5 jugadores. Tira el dado y responde la pregunta — si aciertas avanzas, si fallas te quedas donde estabas.",
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
      case "correctAdvance":
        if (a.won) return `${a.name} sacó un ${a.value}, respondió bien y cayó justo en la meta — ¡${a.name} gana!`;
        if (a.bounced) return `${a.name} sacó un ${a.value}, respondió bien, se pasó de la meta y rebotó a la casilla ${a.square}.`;
        return `${a.name} sacó un ${a.value}, respondió bien y avanzó a la casilla ${a.square}.`;
      case "incorrectStay":
        return `${a.name} sacó un ${a.value} pero no respondió bien — se queda en la casilla ${a.square}.`;
    }
  },
};

const portuguese: BoardGameStrings = {
  launcherTitle: "Corrida no Tabuleiro",
  launcherDescription:
    "Um jogo de tabuleiro para passar o dispositivo entre 2 e 5 jogadores. Jogue o dado e responda a pergunta — se acertar avança, se errar continua onde estava.",
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
      case "correctAdvance":
        if (a.won) return `${a.name} tirou ${a.value}, acertou e caiu exatamente na chegada — ${a.name} venceu!`;
        if (a.bounced) return `${a.name} tirou ${a.value}, acertou, passou da chegada e voltou para a casa ${a.square}.`;
        return `${a.name} tirou ${a.value}, acertou e avançou para a casa ${a.square}.`;
      case "incorrectStay":
        return `${a.name} tirou ${a.value} mas não acertou — continua na casa ${a.square}.`;
    }
  },
};

const french: BoardGameStrings = {
  launcherTitle: "Course sur Plateau",
  launcherDescription:
    "Un jeu de plateau à faire passer entre 2 à 5 joueurs. Lancez le dé et répondez à la question — juste, vous avancez ; faux, vous restez sur place.",
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
      case "correctAdvance":
        if (a.won) return `${a.name} a fait ${a.value}, a bien répondu et tombe exactement sur l'arrivée — ${a.name} gagne !`;
        if (a.bounced) return `${a.name} a fait ${a.value}, a bien répondu, a dépassé l'arrivée et recule à la case ${a.square}.`;
        return `${a.name} a fait ${a.value}, a bien répondu et avance à la case ${a.square}.`;
      case "incorrectStay":
        return `${a.name} a fait ${a.value} mais n'a pas trouvé la bonne réponse — reste sur la case ${a.square}.`;
    }
  },
};

const italian: BoardGameStrings = {
  launcherTitle: "Corsa sul Tabellone",
  launcherDescription:
    "Un gioco da tavolo da passare tra 2 e 5 giocatori. Tira il dado e rispondi alla domanda — giusta e avanzi, sbagliata e resti fermo.",
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
      case "correctAdvance":
        if (a.won) return `${a.name} ha tirato ${a.value}, ha risposto bene ed è caduto esattamente sul traguardo — ${a.name} vince!`;
        if (a.bounced) return `${a.name} ha tirato ${a.value}, ha risposto bene, ha superato il traguardo ed è tornato alla casella ${a.square}.`;
        return `${a.name} ha tirato ${a.value}, ha risposto bene ed è avanzato alla casella ${a.square}.`;
      case "incorrectStay":
        return `${a.name} ha tirato ${a.value} ma non ha risposto bene — resta sulla casella ${a.square}.`;
    }
  },
};

const german: BoardGameStrings = {
  launcherTitle: "Brettspiel-Rennen",
  launcherDescription:
    "Ein Brettspiel zum Weiterreichen für 2 bis 5 Spieler. Würfle und beantworte die Frage — richtig heißt vorrücken, falsch heißt stehen bleiben.",
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
      case "correctAdvance":
        if (a.won) return `${a.name} hat eine ${a.value} gewürfelt, richtig geantwortet und ist genau im Ziel gelandet — ${a.name} gewinnt!`;
        if (a.bounced) return `${a.name} hat eine ${a.value} gewürfelt, richtig geantwortet, ist über das Ziel hinausgeschossen und auf Feld ${a.square} zurückgeprallt.`;
        return `${a.name} hat eine ${a.value} gewürfelt, richtig geantwortet und ist auf Feld ${a.square} gezogen.`;
      case "incorrectStay":
        return `${a.name} hat eine ${a.value} gewürfelt, aber nicht richtig geantwortet — bleibt auf Feld ${a.square}.`;
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
