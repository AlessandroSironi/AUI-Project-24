<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref('');
const password = ref('');

// use different layout without the sidebar
definePageMeta({
    layout: 'auth-layout',
});

const signUp = async () => {
    const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    });
    if (error) {
        alert('invalid credentials while registering');
        console.log(error);
    }
};
</script>
<template>
    <div>
        <h1>Register here</h1>
        <input v-model="email" type="email" placeholder="Your email" /><br />
        <input v-model="password" type="password" placeholder="Your password" /><br />
        <button @click="signUp"> Sign Up</button>
        <p>or you can <NuxtLink to="/login">Login here</NuxtLink></p>
    </div>
</template>

<style scoped></style>
