<script setup lang="ts">
const filters: string[] = ['All appliances', 'Living room', 'Kitchen', 'Bedroom'];
</script>

<template>
    <Header title="Appliances" :is-action-button-enabled="false" />
    <div class="main">
        <h2 class="page-title">Add and edit your appliances</h2>
        <div class="filter-group">
            <div class="filter" v-for="filter in filters">{{ filter }}</div>
        </div>
        <div class="appliances-card-group">
            <ApplianceCard display-name="Smart Light HUE 1" appliance-type="Light" />
            <ApplianceCard display-name="Air Conditioner" appliance-type="AirConditioner" />
            <ApplianceCard display-name="Smart TV 1" appliance-type="TV" />
            <ApplianceCard display-name="Refrigerator" appliance-type="Refrigerator" />
            <ApplianceCard display-name="Microwave" appliance-type="Microwave" />
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
        grid-template-columns: 1fr 1fr;
    }
}
</style>
