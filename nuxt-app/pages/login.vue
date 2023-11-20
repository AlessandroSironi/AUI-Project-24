<script setup lang="ts">
/**
 * This is a default name for the login page
 * in the nuxt supabase project, unlogged users
 * are redirected here
 */

// use different layout without the sidebar
definePageMeta({
    layout: 'auth-layout',
});

const supabase = useSupabaseClient();
const email = ref('');
const password = ref('');

const signInWithPassword = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });
    if (error) {
        alert('invalid credentials');
        console.log(error);
    } else {
        navigateTo('/AIChatHelper');
    }
};
</script>
<template>
    <div>
        <h1>Login</h1>
        <input v-model="email" type="email" placeholder="Your email" /><br />
        <input v-model="password" type="password" placeholder="Your password" /><br />
        <button @click="signInWithPassword"> Sign In with E-Mail </button><br />
        <p>or you can <NuxtLink to="/signup">Register here</NuxtLink></p>
    </div>
</template>

<style scoped></style>
