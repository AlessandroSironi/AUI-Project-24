<script setup lang="ts"></script>
<template>
    <div class="navbar-container">
        <div class="navbar-content">
            <div class="navbar-title-tab">
                <!---<img src="" alt="logo" class="logo-icon" />-->
                <Icon name="ic:twotone-logo-dev" size="2.8rem" color="#7AE88D" />
                <span class="title-text">EcoMate App</span>
            </div>
            <div class="navbar-links-tab">
                <NavLink name="AI Chat Helper" url="#" icon="mingcute:chat-4-line" />
                <NavLink name="Appliances List" url="#" icon="material-symbols:add-home-outline" />
                <NavLink name="Routines List" url="#" icon="carbon:task-settings" />
                <NavLink name="Settings" url="#" icon="iconamoon:options" />
                <NavLink name="Updates and FAQs" url="#" icon="ri:question-line" />
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
    padding: 2rem 2rem;
    font-weight: 500;
}

.navbar-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: var(--white-1);
}

.navbar-title-tab {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.title-text {
    font-size: 1.5rem;
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
</style>
