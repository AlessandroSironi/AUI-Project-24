<script setup lang="ts"></script>

<template>
    <NuxtLink class="link" to="/appliances/addAppliance">
        <div class="new-appliance-card-container">
            <div class="new-appliance-add-icon">
                <div class="icon-wrapper">
                    <div class="icon-bg">
                        <Icon name="mingcute:add-fill" size="2rem" />
                    </div>
                </div>
                <p>Add new appliance</p>
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped>
.new-appliance-card-container {
    background-color: transparent;
    border: 0.4rem var(--black-1) dashed;
    border-radius: 1rem;
    width: 25ch;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 149px;
    cursor: pointer;

    .icon-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;

        .icon-bg {
            padding: 0.8rem;
            background-color: var(--black-1);
            border-radius: 100%;
        }

        .icon {
            color: var(--white-1);
        }
    }
}

.link {
    text-decoration: none;
    font-weight: 500;
    color: var(--black-1);
}

@media screen and (width < 767px) {
    .new-appliance-card-container {
        width: auto;
        min-width: 25ch;
    }
}
</style>
