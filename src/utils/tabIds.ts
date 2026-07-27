import type { ActiveSkill } from "../types";

/**
 * Ids of the tab buttons, shared between the tab lists and the panels they
 * control so that `aria-labelledby` always points at the selected tab.
 */
export function skillTabId(skill: ActiveSkill) {
  return `skill-tab-${skill}`;
}

export function lessonTabId(topicId: string) {
  return `lesson-tab-${topicId}`;
}
