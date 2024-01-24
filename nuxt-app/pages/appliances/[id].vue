<script setup lang="ts">
import type { Appliance } from '~/types/appliance';

/**
 * This page contains the edit page for an existing
 * or a new appliance
 */
const { id } = useRoute().params;
const config = useRuntimeConfig();
const userID = useSupabaseUser().value?.id;

const { data, error, pending } = await useFetch<Appliance>(config.public.baseURL + '/api/appliance/getAppliance', {
    query: {
        profile_id: userID,
        id: id,
    },
});

const appliance = data.value;
console.log(appliance);
</script>

<template>
    <Header title="Edit Appliance" :is-action-button-enabled="false" />
    <div>
        <div v-if="pending">...</div>
        <EditAppliance v-else v-if="appliance" class="edit-appliance" :appliance="appliance" />
    </div>
</template>

<style scoped>
.edit-appliance {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    align-content: center;
}
</style>
