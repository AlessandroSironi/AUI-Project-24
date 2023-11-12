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
        <Navbar :class="isNavbarVisible ? 'navbar-visible' : 'navbar-invisible'" />
        <div class="main-content" :class="isNavbarVisible ? 'main-content-invisible' : ''">
            <span>
                <slot />
            </span>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    background-color: var(--grey-1);
    display: flex;
    min-height: 100vh;
}
.main-content {
    background-color: var(--white-2);
    flex-grow: 1;
    width: min(100%, 900px);
}

@media only screen and (width < 700px) {
    .app-container {
        justify-content: center;
        padding: 0;
    }

    .main-content * {
        min-width: 350px;
        flex-grow: 1;
    }

    .main-content-invisible {
        width: 0;
        display: flex;
        overflow: hidden;
    }
}
</style>
