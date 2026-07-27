import { BookOpen, Mic, Ear, PenLine, Gamepad2, type LucideIcon } from "lucide-react";
import type { ActiveSkill } from "../types";

// "games" is a navigation entry (board game mode), not a learning skill with
// its own progress/level content, so it is added only here instead of
// widening the shared ActiveSkill type used to index UserProgress.skills and
// the learning-path content lookups.
export type SkillMetaSkill = ActiveSkill | "games";

export interface SkillMeta {
  skill: SkillMetaSkill;
  icon: LucideIcon;
  label: string;
}

// Single source of truth for skill icons/labels so the sidebar tabs and the
// learning path header never drift out of sync. Icons are real SVGs (not
// emoji glyphs) so they render identically across platforms and can be
// marked aria-hidden, since the visible text label next to them already
// carries the meaning for screen readers.
export const skillMetaList: SkillMeta[] = [
  { skill: "grammar", icon: BookOpen, label: "Grammar" },
  { skill: "speaking", icon: Mic, label: "Speaking" },
  { skill: "listening", icon: Ear, label: "Listening" },
  { skill: "writing", icon: PenLine, label: "Writing" },
  { skill: "games", icon: Gamepad2, label: "Games" },
];

export const skillMetaBySkill = skillMetaList.reduce(
  (acc, meta) => {
    acc[meta.skill] = meta;
    return acc;
  },
  {} as Record<SkillMetaSkill, SkillMeta>
);

export const GamesIcon: LucideIcon = Gamepad2;