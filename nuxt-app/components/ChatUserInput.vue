<script setup lang="ts">
/**
 * TODO: implement the function for the backend and
 * a "fashion function" to auto-resize the input
 */
</script>

<template>
    <div class="user-textarea-container">
        <textarea class="user-textarea" cols="100" rows="1"> </textarea>
        <button class="send-button">
            <Icon name="material-symbols-light:send" color="white" size="2rem" />
        </button>
    </div>
    <div>
        <p class="disclaimer-text"> ChatGPT can make mistakes. Consider checking important information. </p>
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
    border-radius: 1rem;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    resize: none;
    font-size: 1rem;
    height: auto;
    height: 3rem;
}

.send-button {
    width: 50px;
    background-color: var(--green-1);
    border-radius: 1rem;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    flex-grow: 1;
    cursor: pointer;
}

.disclaimer-text {
    margin-top: 0.8rem;
    color: var(--grey-2);
    text-align: center;
}
</style>
