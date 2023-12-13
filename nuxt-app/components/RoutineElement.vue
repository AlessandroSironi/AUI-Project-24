<script setup lang="ts">
import type { Routine } from '~/types/routine';

interface Props {
    routine: Routine;
}

const showJSON = ref(false);

// to expand the routine and let the user see the json
const toggleAccordion = () => {
    showJSON.value = !showJSON.value;
};

const { routine } = defineProps<Props>();
</script>

<template>
    <div class="routine-wrapper">
        <div class="routine-container" :class="showJSON ? 'container-border' : ''">
            <span class="routine-name">Routine: {{ routine.routineName }}</span>
            <button class="show-button" @click="toggleAccordion">Inspect code <Icon class="icon" name="mingcute:code-fill" size="1.2rem" /></button>
        </div>
        <div :class="!showJSON ? 'accordion' : 'show'">
            <pre>{{ routine.routineJSON }}</pre>
        </div>
    </div>
</template>

<style scoped>
.routine-container {
    width: 100%;
    gap: 2rem;
    border: 1px solid black;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--white-1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.container-border {
    border-radius: 1rem 1rem 0 0;
}

.routine-name {
    font-weight: 500;
    font-size: 1rem;
}

.show-button {
    padding: 0.4rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
}

.accordion {
    display: none;
    /* Add styling for the accordion effect */
    border: 0px solid black;
    transition: all 0.3s ease-in;
    overflow: hidden;
    padding: 1rem;
}

.show {
    /* Add styling for the accordion effect */
    display: block;
    border: 1px solid black;
    padding: 1rem;
    border-top: none;
    background-color: var(--grey-1);
    color: var(--white-1);
    border-radius: 0 0 1rem 1rem;
}
</style>
