<script setup lang="ts">
// simple request to the backend just for testing
const config = useRuntimeConfig();

const res = useFetch(config.public.baseURL + '/api/testRoute');
</script>

<template>
    <div class="main">
        <h1>AUI-project-2024</h1>
        <p>Message: {{ res.data.value }}</p>
    </div>
</template>

<style scoped></style>
