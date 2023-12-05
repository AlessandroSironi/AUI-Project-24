<script setup lang="ts">
import { type Appliance } from '../types/appliance';

interface Props {
    appliance: Appliance;
}

const { appliance } = defineProps<Props>();
</script>

<template>
    <div class="center-container">
        <div class="top-box">
            <div class="icon">
                <Icon :name="useApplianceTypeIcon(appliance.appliance_type)" size="3rem" />
            </div>
            <div class="info-box">
                <p class="display-name">Display Name</p>
                <p class="appliance-name">{{ appliance.appliance_name }}</p>
            </div>
        </div>
        <div class="columns">
            <div class="left-column">
                <div><p class="description">Product Brand</p></div>
                <div><input class="input-text" type="text" v-model="appliance.brand" /></div>

                <div><p class="description">Power Consumption</p></div>
                <div class="power-input-container">
                    <div><input class="power-input-text" type="text" v-model="appliance.avg_consumption" /><p>kWh</p></div>
                </div>

                <div><p class="description">Room</p></div>
                <div><input class="input-text" type="text" v-model="appliance.room" /></div>
            </div>
            <div class="right-column">
                <div><p class="description">Product Name</p></div>
                <div><input class="input-text" type="text" v-model="appliance.appliance_name" /></div>

                <div><p class="description">Appliance Type</p></div>
                <div><input class="input-text" type="text" v-model="appliance.appliance_type" /></div>
            </div>
        </div>
        <div class="buttons">
            <button class="remove-button" @click="">Remove device</button>
            <button class="update-button" @click="">Update device</button>
        </div>
    </div>
</template>

<style scoped>
.center-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.top-box {
    display: flex;
    background-color: black;
    padding: 1rem;
    width: 60%;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    p {
        margin: 0.2rem;
    }
}
.display-name {
    color: var(--green-1);
    font-size: 12px;
}
.icon {
    color: var(--white-1);
}

.appliance-name {
    color: white;
    font-size: 18px;
}
.columns {
    display: flex;
    justify-content: space-between;
    width: 60%;
    margin-top: 20px;
}

.description {
    color: var(--grey-2);
}

.input-text {
    border: none;
    border-bottom: 1px solid #888888;
    background: none;
    padding: none;
    width: 100%;
}
.power-input-text {
    border: none;
    border-bottom: 1px solid #888888;
    background: none;
    padding: none;
    width: 90%;
    margin-right: 5px;
}

.power-input-container {
    align-items: flex-end;
    width: 100%;
}
.power-input-container p {
    color: var(--grey-2);
    display: inline;
}

.left-column,
.right-column {
    width: 48%;
}
.buttons {
    margin-top: 30px;
}

.remove-button {
    border-radius: 1rem;
    padding: 20px;
    margin-right: 20px;
    background-color: #e05a5a;
    color: white;
    border: none;
    font-weight: bold;
}

.update-button {
    border-radius: 1rem;
    padding: 20px;
    background-color: var(--green-1);
    color: black;
    border: none;
    font-weight: bold;
}

@media only screen and (width < 767px) {
    .top-box {
    display: flex;
    background-color: black;
    padding: 1rem;
    width: 80%;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;

        p {
            margin: 0.2rem;
        }
    }
    .columns {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin-top: 20px;
    }
    .power-input-text {
    border: none;
    border-bottom: 1px solid #888888;
    background: none;
    padding: none;
    width: 80%;
    margin-right: 5px;
    }

    .power-input-container {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    }
}
</style>
