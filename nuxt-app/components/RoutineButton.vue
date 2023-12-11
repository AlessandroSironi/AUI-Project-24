<script setup lang="ts">
// expect an emitter function
const emit = defineEmits<{
    (e: 'func'): void;
}>();
</script>

<template>
    <button class="routine-button" @click="$emit('func')">
        <p>Save Routine</p>
        <Icon name="fluent:send-16-filled" class="save-icon" size="1.2rem" />
    </button>
</template>

<style scoped>
.routine-button {
    font-weight: bold;
    padding: 0.3rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
}
</style>
