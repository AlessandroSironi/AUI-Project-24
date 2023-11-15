<script setup lang="ts">
// simple request to the backend just for testing
const config = useRuntimeConfig();

const res = useFetch(config.public.baseURL + '/');
console.log(res);
</script>

<template>
    <Header title="index" />
    <div class="main">
        <p>Message: {{ res.data.value }}</p>
    </div>
</template>

<style scoped>
.main {
    padding: 1rem;
}
</style>
