<script setup lang="ts">
import { DateType } from '../composables/useDateFormatter';
const content1 = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, deserunt?';
const content2 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusantium, temporibus placeat incidunt in repellat quas optio earum.';

// Combine day and time into the desired format
const date1 = useDateFormatter(new Date(), DateType['message date (weekday hh:mm)']);
const date2 = useDateFormatter(new Date(), DateType['message date (weekday hh:mm)']);
</script>

<template>
    <Header title="EcoMate" />
    <div class="main">
        <div class="chat-container">
            <ChatBubble :messageContent="content1" :is-from-user="false" :date="date1" />
            <ChatBubble :messageContent="content2" :is-from-user="true" :date="date2" />
        </div>
        <div class="user-input-container"><ChatUserInput /></div>
    </div>
</template>

<style scoped>
.main {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.chat-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: scroll;
    gap: 1.2rem;
}
</style>
