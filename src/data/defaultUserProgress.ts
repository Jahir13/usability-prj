import type { UserProgress } from "../types";

export function createDefaultUserProgress(): UserProgress {
  return {
    totalXP: 0,
    currentStreak: 0,
    skills: {
      grammar: {
        percent: 0,
        completedPercent: 0,
        skill: "grammar",
        levels: [
          { id: "basic-greetings", title: "Level 1 — Basic greetings", xpReward: 100, status: "current", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100 },
          { id: "simple-present", title: "Level 2 — Simple Present", xpReward: 150, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150 },
          { id: "pronouns", title: "Level 3 — Pronouns", xpReward: 200, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200 },
          { id: "verb-to-be", title: "Level 4 — Verb To Be", xpReward: 350, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 350 },
          { id: "basic-questions", title: "Level 5 — Basic Questions", xpReward: 400, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 400 },
          { id: "present-continuous", title: "Level 6 — Present Continuous", xpReward: 450, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 450 },
          { id: "simple-past", title: "Level 7 — Simple Past", xpReward: 500, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 500 }
        ],
        units: [
          {
            id: "grammar-u1",
            title: "Basics of Sentence Construction",
            levels: [
              { id: "basic-greetings", title: "Level 1 — Basic greetings", xpReward: 100, status: "current", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100 },
              { id: "simple-present", title: "Level 2 — Simple Present", xpReward: 150, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150 },
              { id: "pronouns", title: "Level 3 — Pronouns", xpReward: 200, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200 },
              { id: "verb-to-be", title: "Level 4 — Verb To Be", xpReward: 350, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 350 }
            ]
          },
          {
            id: "grammar-u2",
            title: "Complex Sentence Structures",
            levels: [
              { id: "basic-questions", title: "Level 5 — Basic Questions", xpReward: 400, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 400 },
              { id: "present-continuous", title: "Level 6 — Present Continuous", xpReward: 450, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 450 },
              { id: "simple-past", title: "Level 7 — Simple Past", xpReward: 500, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 500 }
            ]
          }
        ]
      },
      speaking: {
        percent: 0,
        completedPercent: 0,
        skill: "speaking",
        levels: [
          { id: "speaking-l1", title: "Level 1 — Introduce Your Name", xpReward: 100, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100 },
          { id: "speaking-l2", title: "Level 2 — Talk About Hobbies", xpReward: 150, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150 },
          { id: "speaking-l3", title: "Level 3 — Small Talk", xpReward: 200, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200 },
          { id: "speaking-l4", title: "Level 4 — Ordering Food", xpReward: 250, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 250 }
        ],
        units: [
          {
            id: "speaking-u1",
            title: "Introduce Yourself",
            levels: [
              { id: "speaking-l1", title: "Level 1 — Introduce Your Name", xpReward: 100, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100 },
              { id: "speaking-l2", title: "Level 2 — Talk About Hobbies", xpReward: 150, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150 }
            ]
          },
          {
            id: "speaking-u2",
            title: "Social Situations",
            levels: [
              { id: "speaking-l3", title: "Level 3 — Small Talk", xpReward: 200, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200 },
              { id: "speaking-l4", title: "Level 4 — Ordering Food", xpReward: 250, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 250 }
            ]
          }
        ]
      },
      listening: {
        percent: 0,
        completedPercent: 0,
        skill: "listening",
        levels: [
          { id: "listening-l1", title: "Level 1 — Numbers & Dates", xpReward: 100, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100 },
          { id: "listening-l2", title: "Level 2 — Asking Directions", xpReward: 150, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150 },
          { id: "listening-l3", title: "Level 3 — Movie Dialogues", xpReward: 200, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200 },
          { id: "listening-l4", title: "Level 4 — News Broadcasts", xpReward: 250, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 250 }
        ],
        units: [
          {
            id: "listening-u1",
            title: "Everyday Comprehension",
            levels: [
              { id: "listening-l1", title: "Level 1 — Numbers & Dates", xpReward: 100, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100 },
              { id: "listening-l2", title: "Level 2 — Asking Directions", xpReward: 150, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150 }
            ]
          },
          {
            id: "listening-u2",
            title: "Media & Culture",
            levels: [
              { id: "listening-l3", title: "Level 3 — Movie Dialogues", xpReward: 200, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200 },
              { id: "listening-l4", title: "Level 4 — News Broadcasts", xpReward: 250, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 250 }
            ]
          }
        ]
      },
      writing: {
        percent: 0,
        completedPercent: 0,
        skill: "writing",
        levels: [
          { id: "writing-l1", title: "Level 1 — Punctuation Basics", xpReward: 100, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100 },
          { id: "writing-l2", title: "Level 2 — Writing Email Drafts", xpReward: 150, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150 },
          { id: "writing-l3", title: "Level 3 — Argumentative Paragraphs", xpReward: 200, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200 },
          { id: "writing-l4", title: "Level 4 — Storytelling", xpReward: 250, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 250 }
        ],
        units: [
          {
            id: "writing-u1",
            title: "Construct Basic Sentences",
            levels: [
              { id: "writing-l1", title: "Level 1 — Punctuation Basics", xpReward: 100, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 100 },
              { id: "writing-l2", title: "Level 2 — Writing Email Drafts", xpReward: 150, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 150 }
            ]
          },
          {
            id: "writing-u2",
            title: "Paragraph Construction",
            levels: [
              { id: "writing-l3", title: "Level 3 — Argumentative Paragraphs", xpReward: 200, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 200 },
              { id: "writing-l4", title: "Level 4 — Storytelling", xpReward: 250, status: "locked", exercisesCount: 5, minutesLabel: "~4 mins", xpValue: 250 }
            ]
          }
        ]
      }
    }
  };
}
