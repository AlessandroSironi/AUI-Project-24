<script setup lang="ts"></script>

<template>
    <div class="app-container">
        <Navbar />
        <div class="main-content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.app-container {
    background-color: var(--grey-1);
    display: flex;
}
.main-content {
    background-color: var(--white-2);
    flex-grow: 1;
    margin: 1rem 2rem;
    max-width: 90%;
    border-radius: 1.5625rem;
    padding: 1rem;
}
</style>
