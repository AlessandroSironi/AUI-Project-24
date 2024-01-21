<script setup lang="ts">
import { type Routine } from '../types/routine';

const config = useRuntimeConfig();
const userID = useSupabaseUser().value?.id;

// GET: retrieve chat on page enter
const {
    data: routines,
    error,
    pending,
} = await useFetch<Routine[]>(config.public.baseURL + '/api/routine/getRoutines', {
    query: {
        profile_id: userID,
    },
});

const deleteRoutine = async (routineID: number) => {
    const { data, error } = await useFetch<Routine>(config.public.baseURL + `/api/routine/deleteRoutine/`, {
        method: 'DELETE',
        query: {
            id: routineID,
            profile_id: userID,
        },
    });
    if (!error.value) {
        console.log(data);
    }

    const index = routines.value?.findIndex((routine) => routine.id === routineID);

    if (index !== -1 && index !== undefined) {
        routines.value?.splice(index, 1);
    }
};

console.log(routines.value);
</script>

<template>
    <Header title="Routines" :is-action-button-enabled="false" />
    <div class="main">
        <div v-for="routine in routines">
            <RoutineElement :routine="routine" @func="deleteRoutine(routine.id)" />
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
</style>
