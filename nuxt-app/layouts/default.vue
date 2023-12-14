<script setup lang="ts">
/**
 * This is the default layout that wraps the entire application.
 * The webapp is divided into a navigation bar on the left and the
 * main content on the right. They are responsive for every common screen type
 */
const navbarStore = useNavbarStore();
const { isNavbarVisible } = storeToRefs(navbarStore);
</script>

<template>
    <div class="app-container">
        <Navbar />
        <div class="main-content" :class="isNavbarVisible ? 'main-content-invisible' : 'main-content-visible'">
            <span class="main-content-wrapper">
                <slot />
            </span>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    background-color: var(--grey-1);
    display: flex;
    height: 100svh;
}
.main-content {
    background-color: var(--white-2);
    flex-grow: 1;
    display: flex;
    min-width: 0;
}

.main-content-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
}

@media only screen and (width < 767px) {
    .app-container {
        justify-content: center;
        padding: 0;
    }

    .main-content * {
        min-width: 350px;
        flex-grow: 1;
    }

    .main-content-visible {
        width: min(100%, 900px);
        display: flex;
        transition: all 0.3s ease-in;
    }

    .main-content-invisible {
        width: 0;
        display: flex;
        overflow: hidden;
        transition: all 0.3s ease-out;
    }
}
</style>
