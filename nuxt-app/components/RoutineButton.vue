<script setup lang="ts">
interface Props {
    label: string;
    icon?: string;
}

const { label, icon } = defineProps<Props>();

// expect an emitter function
const emit = defineEmits<{
    (e: 'func'): void;
}>();
</script>

<template>
    <button class="routine-button" @click="$emit('func')">
        <p>{{ label }}</p>
        <Icon :name="icon" class="save-icon" size="1.2rem" v-if="icon" />
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
