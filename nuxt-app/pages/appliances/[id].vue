<script setup lang="ts">
/**
 * This page contains the edit page for an existing
 * or a new appliance
 */
 const { id } = useRoute().params;
</script>

<template>
    <Header title="Edit Appliance" :is-action-button-enabled="true" />
    <div> 
        <p class="info-text">
            Edit the information for {{ id }}
        </p>
        <EditAppliance class="edit-appliance" v-bind="$props"></EditAppliance>
    </div>
</template>

<style scoped>
    .info-text  {
        padding: 1rem;
    }
    .edit-appliance {
        display: flex;
        align-items: center;
        align-content: center;
    }
</style>
