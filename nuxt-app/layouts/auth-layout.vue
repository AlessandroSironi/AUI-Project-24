<script setup lang="ts"></script>

<template>
    <div class="bg">
        <slot />
    </div>
</template>

<style scoped>
.bg {
    height: 100svh;
    background-color: var(--white-2);
}
</style>
