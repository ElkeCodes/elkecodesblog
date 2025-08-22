<script setup lang="ts">
import { usePomodoro } from './usePomodoro';

const { isActive, toggle, previousState, reset, nextState, stateLabel, elapsedTime } = usePomodoro();
</script>

<template>
    <div v-if="isActive" class="backdrop" @click="toggle" role="presentation" aria-hidden="true"></div>
    <div class="pomodoro">
        <div class="actions">
            <button @click="previousState()">Previous</button>
            <button @click="toggle()">{{ isActive ? "Pause" : "Start" }}</button>
            <button @click="reset()">Reset</button>
            <button @click="nextState()">Next</button>
        </div>
        <output aria-label="Current state" aria-live="polite">{{ stateLabel }}</output>
        <time role="timer" :datetime=elapsedTime aria-label="Remaining time" aria-live="polite">{{ elapsedTime
        }}</time>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem;
    gap: 1rem;
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
    border: 1px solid var(--color-secondary);
    border-radius: 0.5rem;
}
</style>