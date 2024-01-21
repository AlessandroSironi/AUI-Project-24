<script setup lang="ts">
interface Props {
    suggestions: string[];
}

const { suggestions } = defineProps<Props>();

const emit = defineEmits<{
    (e: 'func', value: string): void;
}>();

const emitEvent = (suggestion: string) => {
    emit('func', suggestion);
};
</script>

<template>
    <div class="suggestion-container">
        <div class="suggestion-box" @click="emitEvent(suggestions[0])">
            <span class="suggestion-title">Help me improving my habits</span>
            <p>{{ suggestions[0] }}</p>
        </div>
        <div class="suggestion-box" @click="emitEvent(suggestions[1])">
            <span class="suggestion-title">Generate Smart Routines</span>
            <p>{{ suggestions[1] }}</p>
        </div>
    </div>
</template>

<style scoped>
.suggestion-container {
    display: flex;
    margin: 1rem 0;
    gap: 0.6rem;
}

.suggestion-title {
    font-weight: 500;
    font-size: 1rem;
}

.suggestion-box {
    border: 1.5px solid var(--grey-1);
    border-radius: 0.4rem;
    padding: 0.8rem;
    cursor: pointer;
    width: 50%;
}

p {
    margin: 0.2rem 0;
    font-size: 0.9rem;
    color: var(--grey-3);
}

.suggestion-box:hover {
    border: 1.5px solid var(--green-3);
    background-color: var(--green-1);
    color: var(--green-3);
}
</style>
