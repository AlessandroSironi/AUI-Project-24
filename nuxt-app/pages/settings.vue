<script setup lang="ts">
const config = useRuntimeConfig();
const userID = useSupabaseUser().value?.id;

const { data: username } = await useLazyFetch<string>(config.public.baseURL + '/api/user/getUsername', {
    query: {
        profile_id: userID,
    },
});

const { data: homeAssistantKey } = await useLazyFetch<string>(config.public.baseURL + '/api/user/getHomeAssistantKey', {
    query: {
        profile_id: userID,
    },
});

const { data: homeAssistantUrl } = await useLazyFetch<string>(config.public.baseURL + '/api/user/getHomeAssistantUrl', {
    query: {
        profile_id: userID,
    },
});

const updateSettings = async () => {
    const { data, error } = await useLazyFetch<string>(config.public.baseURL + `/api/user/updateProfile/${userID}`, {
        method: 'PUT',
        params: {
            profile_id: userID,
        },
        body: {
            username: username,
            key: homeAssistantKey,
            url: homeAssistantUrl,
        },
    });
    if (!error.value) console.log(data);
};
</script>

<template>
    <Header title="Settings" :is-action-button-enabled="true" />
    <div class="main">
        <div class="form">
            <div class="input-container">
                <span class="input-label">Username:</span>
                <input type="text" v-model="username" />
            </div>
            <div class="input-container">
                <span class="input-label">HomeAssistant Key</span>
                <input type="text" v-model="homeAssistantKey" />
            </div>
            <div class="input-container">
                <span class="input-label">HomeAssistant URL:</span>
                <input type="text" v-model="homeAssistantUrl" />
            </div>

            <div class="button-container">
                <button class="button" @click="updateSettings">Update Settings</button>
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
    gap: 1.6rem;
}

.input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.input-label {
    font-weight: 600;
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

input {
    outline: none;
    border: 2px solid var(--grey-2);
    padding: 0.6rem 0.4rem;
    border-radius: 0.4rem;
}

input:focus {
    border: 2px solid var(--green-2);
}
</style>
