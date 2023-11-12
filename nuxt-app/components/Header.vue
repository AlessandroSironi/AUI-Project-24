<script setup lang="ts">
/**
 * The Header components allows the user to understand
 * in which page currently is, it can also have additional
 * functionalities thanks to the header-action-button
 */
interface Props {
    title: string;
}

const { title } = defineProps<Props>();

//toggle navbar logic
const navbarStore = useNavbarStore();
const { toggleNavbar } = navbarStore;
const { isNavbarVisible } = storeToRefs(navbarStore);
</script>

<template>
    <div class="header-container">
        <div :class="isNavbarVisible ? 'header-menu-invisible' : 'header-menu-visible'" @click="toggleNavbar(false)">
            <Icon name="lucide:sidebar" class="header-toggle-icon" size="2rem" />
        </div>
        <div class="header-title">
            <h1 class="header-title-text">{{ title }}</h1>
        </div>
        <div class="header-action-button"><Icon name="icon-park-outline:add" size="1.8rem" /></div>
    </div>
</template>

<style scoped>
.header-container {
    background-color: var(--white-1);
    padding: 1.4rem 1rem 1rem 1rem;
    box-shadow: 0rem 0.1rem 0.1rem var(--grey-2);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-menu {
    display: none;
    cursor: pointer;
}

.header-toggle-icon {
    transform: rotate(180deg);
}

.header-action-button {
    cursor: pointer;
}

.header-menu-visible {
    visibility: visible;
    cursor: pointer;
    opacity: 1;
    transition: 0.4s ease-in all;
}

.header-menu-invisible {
    visibility: hidden;
    opacity: 0;
    transition: 0.1s ease-out all;
}
</style>
