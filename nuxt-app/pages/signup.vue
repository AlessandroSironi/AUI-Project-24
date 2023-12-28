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
    <div class="body-container">
        <div class="form-container">
            <h1 class="title">Register here</h1>
            <input v-model="email" type="email" placeholder="Your email" /><br />
            <input v-model="password" type="password" placeholder="Your password" /><br />
            <button class="button" @click="signUp"> Sign Up</button>
            <p class="subtext">or you can <NuxtLink class="button-2" to="/login">Login here</NuxtLink></p>
        </div>
    </div>
</template>

<style scoped>

/* Style the body to center the form container */
.body-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0; /* Light grey background */
    font-family: Arial, sans-serif; /* Optional: Set a default font */
}

/* Style the container for the form */
.form-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
    width: 300px; /* Fixed width, adjust as needed */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    margin: 0;
    margin-bottom: 10px;
}

/* Style the form elements */
form {
    display: flex;
    flex-direction: column;
}

.subtext {
    margin: 0;
    margin-top: 30px;
    font-size: 0.9rem;
}

input[type="email"],
input[type="password"] {
    padding: 10px;
    margin-bottom: 5px;
    border: 1px solid #ddd; /* Light grey border */
    border-radius: 5px; /* Slightly rounded corners for input fields */
    font-size: 0.9rem; /* Increase font size */
    width: 100%; /* Full width */
}

.button {
    padding: 10px;
    background-color: var(--green-2);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    width: 100%; /* Full width */
    font-size: 0.9rem;
}

.button-2 {
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    background-color: var(--white-2);
    color: var(--black-1);
}

</style>
