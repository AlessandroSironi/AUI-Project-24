<script setup lang="ts">
import useTextFormatter from '~/composables/useTextFormatter';

interface Props {
    isFromUser: boolean;
    messageContent: string;
    date: string;
}

const { isFromUser, messageContent, date } = defineProps<Props>();
</script>

<template>
    <div class="bubble-container" :class="isFromUser ? 'flex-start' : 'flex-end'">
        <div class="bubble" :class="isFromUser ? 'bubble-style-user' : 'bubble-style-system'">
            <p class="message-content" v-html="useTextFormatter(messageContent)"> </p>
            <span class="date-container" :class="isFromUser ? 'date-style-system' && 'flex-start' : 'date-style-user' && 'flex-end'">{{ date.toString() }}</span>
        </div>
    </div>
</template>

<style scoped>
.bubble-container {
    display: flex;
}

.flex-start {
    justify-content: flex-start;
}

.flex-start {
    justify-content: flex-end;
}
.bubble {
    padding: 1.2rem;
    width: 90%;
}

.message-content {
    line-height: 1.6rem;
    overflow-wrap: break-word;
}

.bubble-style-system {
    background-color: var(--grey-3);
    color: var(--white-2);
    border-radius: 1.2rem 1.2rem 1.2rem 0rem;
}

.bubble-style-user {
    background-color: var(--green-2);
    color: var(--black-1);
    border-radius: 1.2rem 1.2rem 0rem 1.2rem;
}

.date-container {
    opacity: 0.4;
    display: flex;
    width: 100%;
    font-size: 0.9rem;
}
</style>
