<script setup lang="ts">
import { computed, effect, onBeforeUnmount, ref } from 'vue';

const DEFAULT_POMODORO_SECONDS = 25 * 60; // 25 minutes

let intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const remainingSeconds = ref(DEFAULT_POMODORO_SECONDS);

const pause = () => {
    if (intervalId.value) {
        clearInterval(intervalId.value);
    }
    intervalId.value = null;
}

const startPause = () => {
    if (intervalId.value) {
        pause();
    } else {
        intervalId.value = setInterval(() => {
            remainingSeconds.value -= 1;
        }, 1000);
    }
};

const reset = () => {
    remainingSeconds.value = DEFAULT_POMODORO_SECONDS;
}

const elapsedTime = computed(() => {
    var minutes = Math.floor(remainingSeconds.value / 60) % 60
    var seconds = remainingSeconds.value % 60

    return [minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i >= 0)
        .join(":")
});

const isActive = computed(() => !!intervalId.value);

effect(() => {
    if (remainingSeconds.value === 0) {
        pause();
    }
});

onBeforeUnmount(() => {
    if (intervalId.value) clearInterval(intervalId.value);
});
</script>

<template>
    <div v-if="isActive" class="backdrop" @click="startPause" role="presentation" aria-hidden="true"></div>
    <div class="pomodoro">
        <div class="actions">
            <button @click="startPause()">{{ isActive ? "Pause" : "Start" }}</button>
            <button @click="reset()">Reset</button>
        </div>
        <time :datetime=elapsedTime>{{ elapsedTime }}</time>
    </div>
</template>

<style lang="css">
.backdrop {
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
}

.pomodoro {
    position: relative;
}

.actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

time {
    display: block;
    text-align: center;
    padding: 1rem;
    font-size: 3rem;
}
</style>