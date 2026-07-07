export const CONFIG = {
  TIMER: {
    DEFAULT_DURATION_SECONDS: 120, // 2 minutes quiz countdown
    WARNING_THRESHOLD_SECONDS: 30, // Turn red when less than 30s left
  },
  XP: {
    BASE_EXERCISE_XP: 70, // XP awarded per correct answer
    LEVEL_4_THRESHOLD: 2800, // XP needed to transition from Level 3 to Level 4
  },
  AUDIO: {
    MOCK_RECORDING_DURATION_MS: 3000, // 3 seconds mock voice recording
  },
  ANIMATION: {
    TRANSITION_DEFAULT_MS: 200,
    PULSE_DURATION_MS: 1500,
  },
};
