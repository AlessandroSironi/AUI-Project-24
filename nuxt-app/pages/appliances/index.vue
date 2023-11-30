<script setup lang="ts">
const filters: string[] = ['All appliances', 'Living room', 'Kitchen', 'Bedroom'];

const config = useRuntimeConfig();
const userID = useSupabaseUser().value?.id;

interface Appliance {
    id: number;
    profile_id: string;
    appliance_name: string;
    appliance_type: number; //TODO: fix type with string after backend
    room: string;
}

interface APIBody {
    appliances: Appliance[];
    rooms: string[];
}

// GET: retrieve chat on page enter
const { data, error, pending } = await useFetch<APIBody>(config.public.baseURL + '/api/appliance/getApplianceOfUser', {
    query: {
        profile_id: userID,
    },
});
</script>

<template>
    <Header title="Appliances" :is-action-button-enabled="false" />
    <div class="main">
        <h2 class="page-title">Add and edit your appliances</h2>
        <div class="filter-group">
            <div class="filter" v-for="filter in filters">{{ filter }}</div>
        </div>
        <div class="appliances-card-group">
            <div class="appliance-card" v-for="appliance in data?.appliances">
                <ApplianceCard :display-name="appliance.appliance_name" appliance-type="AirConditioner" />
            </div>

            <!-- <ApplianceCard display-name="Smart Light HUE 1" appliance-type="Light" />
            <ApplianceCard display-name="Air Conditioner" appliance-type="AirConditioner" />
            <ApplianceCard display-name="Smart TV 1" appliance-type="TV" />
            <ApplianceCard display-name="Refrigerator" appliance-type="Refrigerator" />
            <ApplianceCard display-name="Microwave" appliance-type="Microwave" /> -->
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
