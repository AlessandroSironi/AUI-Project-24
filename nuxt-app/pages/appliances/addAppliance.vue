<script setup lang="ts">
import { type Appliance } from '~/types/appliance';

const appliance_type = ref('');
const appliance_name = ref('');
const room = ref('');
const brand = ref('');
const avg_consumption = ref(0);

const config = useRuntimeConfig();
const userID = useSupabaseUser().value?.id;

const addNewAppliance = async () => {
    const { data, error, pending } = await useFetch<Appliance>(config.public.baseURL + '/api/appliance/insertAppliance', {
        method: 'POST',
        query: {
            profile_id: userID,
        },
        body: {
            appliance_type: appliance_type,
            appliance_name: appliance_name,
            room: room,
            brand: brand,
            avg_consumption: avg_consumption,
        },
    });
    if (!error.value) {
        console.log(data);
        useRouter().push('/appliances');
    }
};
</script>

<template>
    <div>
        <Header title="Appliances" :is-action-button-enabled="false" />
        <div class="main">
            <div class="form">
                <div class="inputs">
                    <div class="input-container">
                        <span class="input-label">Product Brand (*)</span>
                        <input type="text" v-model="brand" />
                    </div>
                    <div class="input-container">
                        <span class="input-label">Product Name (*)</span>
                        <input type="text" v-model="appliance_name" />
                    </div>
                    <div class="input-container">
                        <span class="input-label">Power Consumption</span>
                        <input type="number" v-model="avg_consumption" />
                    </div>
                    <div class="input-container">
                        <span class="input-label">Appliance Type (*)</span>
                        <input type="text" v-model="appliance_type" />
                    </div>
                    <div class="input-container">
                        <span class="input-label">Room</span>
                        <input type="text" v-model="room" />
                    </div>
                </div>

                <div class="button-container">
                    <button class="button" @click="addNewAppliance">Add New Appliance</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    margin-top: 2rem;
}

.form .inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: 60%;
}

.input-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.input-label {
    font-weight: 600;
    color: var(--grey-2);
}

input {
    border: none;
    border-bottom: 1px solid #888888;
    background: none;
    padding: none;
    margin-right: 5px;
}

.button {
    padding: 0.8rem 1.6rem;
    border-radius: 0.4rem;
    color: var(--green-3);
    border: 1.2px solid var(--green-3);
    background-color: var(--green-1);
    font-weight: bold;
    cursor: pointer;
}

.button:hover {
    background-color: var(--green-2);
}

@media only screen and (width < 767px) {
    .form .inputs {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        width: 90%;
    }
}
</style>
