<script setup lang="ts"></script>

<template>
    <Header title="FAQs" :is-action-button-enabled="false" />
    <div class="main">
        <h2>> EcoMate and Routine Generation</h2>
        <h3>Can I get recommendations on green energy practices for my home?</h3>
        <p>Absolutely! Just ask the chatbot questions like <span class="bold">"What are some green energy practices for my home?"</span> or <span class="bold">"Give me tips on reducing energy consumption"</span> and it will provide you with helpful suggestions.</p>

        <h3>How can I check the overall average energy usage of my smart appliances?</h3>
        <p>Type <span class="bold">"Calcultate the total average energy consumption based on my appliances"</span> to receive a summary of the combined energy consumption of all your smart appliances. Note that the application do not track the time of usage of your appliances, so for a better result, you need to provide it manually, try <span class="bold">"Total energy consumption of my appliances for 1 hour of usage".</span></p>

        <h3>Can I ask for a personalized Home Assistant Routine based on my everyday habits?</h3>
        <p>Ask the chatbot for personalized routines by providing all the details for the routine and the application will take into consideration all the information received.</p>

        <h3>Where can I manage all the routines that I have created?</h3>
        <p>Go to Routine List, from there you can view all the routines you have created, inspect the json code and delete them.</p>

        <h3>The application can't manage to create a particular routine for my HomeAssistant, how can I solve the issue?</h3>
        <p>Remember that EcoMate is based on GPT 3.5 and sometimes the application fail to generate a working routine. If that happens the system will show you the error received from the HomeAssistant environment. Try typing the error to EcoMate and ask it to generate the routine again in order to solve the issue (remember to type the error along with your message). <br /><br />For example type <span class="bold">"I tried to submit the routine to HomeAssistant but i got this error [error], can you generate the routine again in order to solve this issue?" </span></p>

        <hr />

        <h2>> Appliances</h2>

        <h3>How can I add a new smart appliance?</h3>
        <p>From the sidebar click on <span class="bold">Appliance List</span> and then <span class="bold">Add new appliance</span>, insert the information required (note that fields marked with * are mandatory) and in the end <span class="bold">Add New Appliance</span>.</p>

        <h3>Is it possible to see a list of all the smart appliances in a specific room?</h3>
        <p>Yes, you can go to Appliance List and select the specific room for which you want to see your appliances or ask EcoMate <span class="bold">"What appliances do I have in my [room name]"</span>.</p>

        <h3>Can I update the information of an existing smart appliance?</h3>
        <p>Yes, you can update the information of an existing appliance from the <span class="bold">Appliance List</span> page by clicking on the appliance you want to update, change the respective fields and then "Update device".</p>

        <h3>How can I delete a smart appliance?</h3>
        <p>To delete a smart appliance, go to the <span class="bold">Appliance List</span> page, click on the appliance you want to delete and click "Remove Device".</p>

        <h3>What brands of smart appliances does the application support?</h3>
        <p>The chatbot supports a wide range of smart appliance brands. You can add appliances from popular brands, and the chatbot will recognize and manage them accordingly.</p>

        <h3>How do I inquire about the energy consumption of a specific appliance?</h3>
        <p>You can inspect all information related to a specific appliance by clicking on that specific device card in <span class="bold">Appliance List</span> page, or you can ask the chatbot about the energy consumption of a particular appliance by typing <span class="bold">"Can you tell me the energy consumption of [appliance name]."</span> The chatbot will provide you with the relevant information.</p>
    </div>
</template>

<style scoped>
.main {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: scroll;
}

h2 {
    margin-block: 1rem;
}

h3 {
    font-size: 1.2rem;
}

p {
    margin-block: 0.6rem 2rem;
    color: var(--grey-3);
}

hr {
    width: calc(100%);
    border: 1px solid var(--grey-2);
}

.bold {
    font-weight: 500;
    color: var(--black-1);
}
</style>
