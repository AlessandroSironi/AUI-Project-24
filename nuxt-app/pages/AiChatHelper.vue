<script setup lang="ts"></script>

<template>
    <Header title="EcoMate" />
    <div class="main">
        <div class="chat-container"><ChatBubble /><ChatBubble /></div>
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
