import { computed, effect, ref } from "vue";

export const useTimer = (seconds: number) => {
  let intervalId = ref<ReturnType<typeof setInterval> | null>(null);
  const remainingSeconds = ref(seconds);

  const pause = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
    }
    intervalId.value = null;
  };

  const isActive = computed(() => !!intervalId.value);

  const start = () => {
    intervalId.value = setInterval(() => {
      remainingSeconds.value -= 1;
    }, 1000);
  };

  const reset = () => {
    remainingSeconds.value = seconds;
  };

  effect(() => {
    if (remainingSeconds.value === 0) {
      pause();
    }
  });

  const clear = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
    }
  };

  return { pause, isActive, start, reset, clear, remainingSeconds };
};
