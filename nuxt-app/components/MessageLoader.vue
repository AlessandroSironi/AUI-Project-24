<script setup lang="ts"></script>

<template>
    <div class="loader-container">
        <span class="loader-circle"></span>
        <span class="loader-circle"></span>
        <span class="loader-circle"></span>
    </div>
</template>

<style scoped>
.loader-container {
    display: flex;
    gap: 0.3rem;
    margin: 1rem 1rem;
}
.loader-circle {
    padding: 0.4rem;
    border-radius: 100%;
    background-color: var(--grey-2);
}

.loader-circle:nth-child(1) {
    animation: bounce 1s ease infinite;
}
.loader-circle:nth-child(2) {
    animation: bounce 1s 0.15s ease infinite;
}
.loader-circle:nth-child(3) {
    animation: bounce 1s 0.3s ease infinite;
}

@keyframes bounce {
    0%,
    20%,
    80%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-1rem);
    }
}
</style>
