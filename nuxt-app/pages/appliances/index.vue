<script setup lang="ts">
import { type Appliance } from '../../types/appliance';

const config = useRuntimeConfig();
const userID = useSupabaseUser().value?.id;

interface APIBody {
    appliances: Appliance[];
    rooms: string[];
}

const selectedRoom = ref('');

const changeRoom = (room: string) => {
    selectedRoom.value = room;
};

// GET: retrieve chat on page enter
const { data, error, pending } = await useLazyFetch<APIBody>(config.public.baseURL + '/api/appliance/getApplianceOfUser', {
    query: {
        profile_id: userID,
    },
});

const filteredAppliances = computed(() => {
    if (selectedRoom.value === '' || selectedRoom.value === 'All rooms') {
        return data.value?.appliances;
    }

    let arr: Appliance[] = [];

    const allAppliances = data.value?.appliances;
    console.log(allAppliances);

    if (allAppliances) {
        for (let i = 0; i < allAppliances?.length; i++) {
            if (selectedRoom.value === allAppliances[i].room) {
                arr.push(allAppliances[i]);
            }
        }
    }

    return arr;
});

const rooms = computed(() => {
    if (!data.value?.rooms.includes('All rooms')) {
        data.value?.rooms.push('All rooms');
    }
    return data.value?.rooms;
});
</script>

<template>
    <Header title="Appliances" :is-action-button-enabled="false" />
    <div class="main">
        <h2 class="page-title">Add and edit your appliances</h2>
        <div class="filter-group">
            <div class="filter" v-for="filter in rooms">
                <span @click="changeRoom(filter)">
                    {{ filter }}
                </span>
            </div>
        </div>
        <div class="appliances-card-group">
            <div class="appliance-card" v-for="appliance in filteredAppliances">
                <ApplianceCard :appliance="appliance" />
            </div>
            <NewApplianecCard />
        </div>
    </div>
</template>

<style scoped>
.main {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 1rem;
    overflow-y: scroll;
}

.filter-group {
    display: flex;
    gap: 2rem;
}

.filter {
    color: var(--grey-2);
    cursor: pointer;
}

.filter:hover {
    color: var(--black-1);
    text-decoration: underline;
}

.appliances-card-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

@media screen and (width < 767px) {
    .appliances-card-group {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(25ch, 1fr));
    }
}
</style>
