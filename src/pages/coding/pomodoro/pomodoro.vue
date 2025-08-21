<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

let intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const elapsedSeconds = ref(0);

const startPause = () => {
    if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null;
    } else {
        intervalId.value = setInterval(() => {
            elapsedSeconds.value += 1;
        }, 1000);
    }
};

const reset = () => {
    elapsedSeconds.value = 0;
}

const elapsedTime = computed(() => {
    var hours = Math.floor(elapsedSeconds.value / 3600)
    var minutes = Math.floor(elapsedSeconds.value / 60) % 60
    var seconds = elapsedSeconds.value % 60

    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":")
});

const isActive = computed(() => !!intervalId.value);

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