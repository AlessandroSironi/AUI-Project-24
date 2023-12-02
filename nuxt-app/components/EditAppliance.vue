<script setup>
const { id } = useRoute().params;
</script>

<template>
    <div class="center-container">
        <div class="top-box">
            
            <p class="display-name">Display Name</p>
            <p class="appliance-name">{{ id }}</p>
        </div>
        <div class="columns">
            <div class="left-column">
                <div><p class="description">Product Brand</p></div>
                <div><input class="input-text" type="text" v-model="productBrand" /></div>
                
                <div><p class="description">Power Consumption</p></div>
                <div class="power-input-container">
                    <div><input class="power-input-text" type="text" v-model="powerConsumption" /><p>kWh</p></div>
                </div>

                <div><p class="description">Room</p></div>
                <div><input class="input-text" type="text" v-model="room" /></div>
                
            </div>
            <div class="right-column">
                <div><p class="description">Product Name</p></div>
                <div><input class="input-text" type="text" v-model="productName" /></div>

                <div><p class="description">Appliance Type</p></div>
                <div><input class="input-text" type="text" v-model="applianceType" /></div>
            </div>
        </div>
        <div class="buttons">
            <button class="remove-button" @click="removeDevice">Remove device</button>
            <button class="update-button" @click="updateDevice">Update device</button>
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
    background-color: black;
    padding: 10px;
    width: 60%;
    border-radius: 1rem;
}
.display-name {
    color: var(--green-1);
    font-size: 12px;
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
    color: var(--grey-2)
}

.input-text {
    border: none;
    border-bottom: 1px solid #888888;
    background: none;
    padding: none;
    width: 100%;
}
.power-input-text
{
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
    background-color: #E05A5A;
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

</style>