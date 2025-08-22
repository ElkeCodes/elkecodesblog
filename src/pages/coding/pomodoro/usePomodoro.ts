import { computed, onBeforeUnmount, ref } from "vue";
import { STATES, SECONDS_PER_STATE, PomodoroStates } from "./data";
import { useTimer } from "./useTimer";

export const usePomodoro = () => {
  let currentState = ref(0);

  const stateLabel = computed(() => {
    switch (STATES[currentState.value]) {
      case PomodoroStates.POMODORO:
        return "Pomodoro";
      case PomodoroStates.LONG_BREAK:
        return "Long break";
      case PomodoroStates.SHORT_BREAK:
        return "Short break";
    }
  });

  let currentSeconds = computed(
    () => SECONDS_PER_STATE[STATES[currentState.value]]
  );
  const { pause, isActive, start, reset, clear, remainingSeconds } = useTimer(
    currentSeconds.value
  );

  const toggle = () => {
    if (isActive.value) {
      pause();
    } else {
      start();
    }
  };

  const previousState = () => {
    currentState.value =
      currentState.value === 0 ? STATES.length - 1 : currentState.value - 1;
    reset();
  };
  const nextState = () => {
    currentState.value = (currentState.value + 1) % STATES.length;
    reset();
  };

  const elapsedTime = computed(() => {
    var minutes = Math.floor(remainingSeconds.value / 60) % 60;
    var seconds = remainingSeconds.value % 60;

    return [minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i >= 0)
      .join(":");
  });

  onBeforeUnmount(() => {
    clear();
  });

  return {
    clear,
    isActive,
    toggle,
    previousState,
    reset,
    nextState,
    stateLabel,
    elapsedTime,
  };
};
