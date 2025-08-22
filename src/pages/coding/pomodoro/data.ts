export enum PomodoroStates {
  POMODORO,
  LONG_BREAK,
  SHORT_BREAK,
}

const DEFAULT_POMODORO_SECONDS = 25 * 60; // 25 minutes
const DEFAULT_LONG_BREAK_SECONDS = 15 * 60; // 15 minutes
const DEFAULT_SHORT_BREAK_SECONDS = 5 * 60; // 5 minutes

export const STATES: Array<PomodoroStates> = [
  PomodoroStates.POMODORO,
  PomodoroStates.SHORT_BREAK,
  PomodoroStates.POMODORO,
  PomodoroStates.SHORT_BREAK,
  PomodoroStates.POMODORO,
  PomodoroStates.SHORT_BREAK,
  PomodoroStates.POMODORO,
  PomodoroStates.LONG_BREAK,
];

export const SECONDS_PER_STATE = {
  [PomodoroStates.POMODORO]: DEFAULT_POMODORO_SECONDS,
  [PomodoroStates.LONG_BREAK]: DEFAULT_LONG_BREAK_SECONDS,
  [PomodoroStates.SHORT_BREAK]: DEFAULT_SHORT_BREAK_SECONDS,
};
