<script setup lang="ts"></script>

<template>
    <div class="user-textarea-container">
        <textarea class="user-textarea" cols="100" rows="2"> </textarea>
        <button>send</button>
    </div>
</template>

<style scoped>
.user-textarea-container {
    display: flex;
    gap: 1rem;
}

.user-textarea {
    width: 100%;
    padding: 1rem;
}
</style>
