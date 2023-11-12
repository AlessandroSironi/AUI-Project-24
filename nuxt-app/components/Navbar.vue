<script setup lang="ts">
// access the store to know if the navigation bar is opened or closed
const navbarStore = useNavbarStore();
const { toggleNavbar } = navbarStore;
const { isNavbarVisible } = storeToRefs(navbarStore);
</script>

<template>
    <div class="navbar-container" :class="isNavbarVisible ? 'navbar-visible' : 'navbar-invisible'">
        <div class="navbar-content">
            <div class="navbar-title-tab">
                <!---<img src="" alt="logo" class="logo-icon" />-->
                <Icon name="ic:twotone-logo-dev" size="2.8rem" color="#7AE88D" />
                <span class="title-text">EcoMate App</span>
                <Icon name="lucide:sidebar" size="2rem" class="navbar-toggle-button" @click="toggleNavbar(false)" />
            </div>
            <div class="navbar-links-tab">
                <NavLink name="AI Chat Helper" url="/AiChatHelper" icon="mingcute:chat-4-line" @click="toggleNavbar(true)" />
                <NavLink name="Appliances List" url="/Appliances" icon="material-symbols:add-home-outline" @click="toggleNavbar(true)" />
                <NavLink name="Routines List" url="/Routines" icon="carbon:task-settings" @click="toggleNavbar(true)" />
                <NavLink name="Settings" url="/Settings" icon="iconamoon:options" @click="toggleNavbar(true)" />
                <NavLink name="Updates and FAQs" url="/Updates" icon="ri:question-line" @click="toggleNavbar(true)" />
            </div>
            <div class="navbar-logout-tab">
                <hr class="line" /> <div class="logout-link"> <Icon name="material-symbols:logout" size="1.8rem" /> Logout </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.navbar-container {
    height: 100vh;
    font-weight: 500;
    max-width: 350px;
    display: flex;
}

.navbar-visible {
    transition: all 0.3s ease-in;
    width: 100%;
}

.navbar-invisible {
    width: 0;
    overflow: hidden;
    transition: all 0.2s ease-out;
}

.navbar-content {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    color: var(--white-1);
    flex-grow: 1;
    min-width: 350px;
}

.navbar-title-tab {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.title-text {
    flex-grow: 1;
    font-size: 1.5rem;
}

.navbar-toggle-button {
    cursor: pointer;
}

.navbar-links-tab {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    flex-grow: 1;
    margin-top: 2rem;
}

.navbar-logout-tab {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.line {
    width: 100%;
}

.logout-link {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0 1rem;
}

@media only screen and (width < 700px) {
    .navbar-container {
        max-width: 100%;
    }
    .navbar-content {
        width: 100%;
        padding: 0;
    }

    .navbar-title-tab {
        box-shadow: 0rem 0.2rem 0.8rem black;
        padding: 1rem 1rem;
    }

    .navbar-links-tab {
        padding: 0rem 2rem;
        flex-grow: 1;
        gap: 1.2rem;
    }

    .navbar-logout-tab {
        padding: 3rem 2rem;
    }
}
</style>
