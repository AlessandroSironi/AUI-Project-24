<script setup lang="ts">
interface Props {
    displayName: string;
    applianceType: string;
}

const { displayName, applianceType } = defineProps<Props>();
</script>

<template>
    
    <div class="appliance-card-container">
        <Icon :name="useApplianceTypeIcon(applianceType)" size="2rem" class="appliance-card-icon" />
        <div class="appliance-card-name">{{ displayName }}</div>
        <div class="appliance-edit-button">
            <NuxtLink :to="'/appliances/' + displayName">
                <Icon name="material-symbols:edit" size="1.5rem" class="appliance-edit-button-icon" />
            </NuxtLink>
        </div>
    </div>
    
</template>

<style scoped>
.appliance-card-container {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    background-color: var(--white-1);
    padding: 2rem;
    width: 25ch;
    gap: 1.5rem;
    border-radius: 1.2rem;
    filter: drop-shadow(0px 0.4rem 0.4rem rgba(0, 0, 0, 0.25));

    .appliance-card-name {
        font-weight: 500;
        font-size: 1.1rem;
        word-wrap: break-word;
        
    }
    .appliance-card-icon {
        color: var(--black-1);
    }

    .appliance-edit-button {
        border-radius: 100%;
        position: absolute;
        top: 0.4rem;
        right: 0.4rem;
        padding: 0.4rem;
        background-color: var(--black-1);
        display: flex;
        justify-content: center;
        align-items: center;

        .appliance-edit-button-icon {
            color: var(--white-1);
        }
    }
}

.appliance-card-container:hover {
    background-color: var(--black-1);
    color: var(--white-1);

    .appliance-card-icon {
        color: var(--white-1);
    }

    .appliance-edit-button {
        background-color: var(--green-1);

        .appliance-edit-button-icon {
            color: var(--white-1);
        }
    }
}

@media screen and (width < 767px) {
    .appliance-card-container {
        width: auto;
    }
}
</style>
