<script setup lang="ts">
    import { ref } from 'vue';
    import { Icon } from '@iconify/vue';
</script>

<template>
    <div class="user-textarea-container">
        <textarea class="user-textarea" cols="100" rows="2"> </textarea>
        <button class="send-button">
            <Icon :icon="'mynaui:send'" :color="'white'" :name="'your-icon-name'" :width="30" :height="30" />
        </button>
    </div>
    <div>
        <p class="disclaimer-text">
            ChatGPT can make mistakes. Consider checking important information.
        </p>
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
    border-radius: 15px;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.send-button {
    width: 50px;
    background-color: var(--green-1);
    border-radius: 15px;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    vertical-align: center;
}

.disclaimer-text {
    margin-top: 10px;
    color: gray;
    text-align: center;
}

</style>
