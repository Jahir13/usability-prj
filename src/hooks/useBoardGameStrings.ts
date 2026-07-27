import { useUser } from "../context/LingoContext";
import { BOARD_GAME_STRINGS, LANGUAGE_TAGS, resolveLanguage } from "../config/boardGameI18n";

export function useBoardGameStrings() {
  const { user } = useUser();
  const language = resolveLanguage(user.nativeLanguage);
  return { ...BOARD_GAME_STRINGS[language], languageTag: LANGUAGE_TAGS[language] };
}
