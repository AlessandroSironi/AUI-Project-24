<script setup lang="ts">
interface Props {
    name: string;
    url: string;
    icon: string;
}

const { name, url, icon } = defineProps<Props>();
</script>
<template>
    <NuxtLink class="link" :to="url">
        <Icon class="link-icon" :name="icon" size="1.8rem" />
        <span class="link-name">{{ name }}</span>
    </NuxtLink>
</template>

<style scoped>
.link {
    display: flex;
    gap: 1rem;
    align-items: center;
    text-decoration: none;
    color: var(--white-1);
    padding: 1rem 2rem 1rem 1rem;
}

.link-name {
    font-weight: 500;
}

.link:hover,
.router-link-active {
    background-color: var(--grey-3);
    border-radius: 1rem;

    .link-icon {
        color: var(--green-1);
    }
}
</style>
