<script setup lang="ts">
import { DateType } from '../composables/useDateFormatter';
import { type Routine } from '../types/routine';
//TODO: need to modify, i have to update the client with the responses and not through the db (db only onMount)
/**
 * TODO: implement the function for the backend and
 * a "fashion function" to auto-resize the input
 *
 * TODO: look for a way to modularize the chatUserInput if possible (for now it seems difficult)
 */

interface Message {
    id: number;
    profile_id: string;
    message: string;
    is_chatgpt: boolean;
    is_routine: boolean;
    timestamp: string;
    routine?: Routine;
}

interface ResponseBody {
    message: string;
    is_routine: boolean;
    routine?: Routine;
}

interface HomeAssistantReply {
    error: boolean;
    message: string;
}

const config = useRuntimeConfig();
const newMessage = ref('');
const userID = useSupabaseUser().value?.id;
const isMessagesLoading = ref(false);

const homeAssistantError: Ref<HomeAssistantReply> = ref({ error: false, message: '' });
const suggestions: string[] = ['Hi, can you help me with green automation?', 'Can you generate routines based on my appliances?'];

// helper function to scroll at the end of the chat
const scrollToEnd = () => {
    // Access the DOM element of the target component
    const targetElement = document.getElementById('chatBlock');
    if (targetElement) {
        const anchor = targetElement.children[targetElement.children.length - 1];
        if (anchor !== undefined) anchor.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
};

const cleanWarning = () => {
    homeAssistantError.value.error = false;
    homeAssistantError.value.message = '';
};

onMounted(() => {
    scrollToEnd();
});

// GET: retrieve chat on page enter
const {
    data: messages,
    error,
    pending,
} = await useLazyFetch<Message[]>(config.public.baseURL + '/api/chat/retrieveChat', {
    query: {
        profile_id: userID,
    },
});

// POST: send a new message and retreve the response
const sendMessage = async () => {
    //reset chat visuals
    isMessagesLoading.value = true;
    cleanWarning();

    if (newMessage.value !== '' && userID) {
        const contentToSend = newMessage.value;
        if (messages.value !== null) {
            const userMessage = { id: 1, profile_id: userID, message: contentToSend, is_chatgpt: false, is_routine: false, timestamp: new Date().toString() };
            messages.value.push(userMessage);
        }

        setTimeout(() => {
            scrollToEnd();
        }, 100);

        newMessage.value = '';
        const { data: responseContent, error } = await useFetch<ResponseBody>(config.public.baseURL + '/api/openai/openaiHandler', {
            method: 'POST',
            query: {
                profile_id: userID,
            },
            body: {
                //TODO: remeber that for auth is called uid, need to choose the same name also for other backend stuff
                message: contentToSend,
            },
        });

        if (error.value !== null) {
            console.log(error.value);
        }

        if (messages.value !== null && responseContent.value !== null) {
            const responseMessage: Message = {
                id: 2,
                profile_id: userID,
                message: responseContent.value.message,
                is_chatgpt: true,
                is_routine: responseContent.value.is_routine,
                timestamp: new Date().toString(),
            };

            // if the response is a routine set the routine fields
            if (responseContent.value.is_routine) {
                console.log('is a routine');
                console.log('message: ', responseMessage);
                responseMessage.routine = responseContent.value.routine;
                console.log(responseContent.value);
                console.log(responseMessage.routine);
            }

            messages.value.push(responseMessage);
        }

        setTimeout(() => {
            scrollToEnd();
        }, 100);
        isMessagesLoading.value = false;
    }
};

// POST: save routine in the db and upload it on home-assistant
const saveRoutine = async (routineName: string, routineJSON: string) => {
    console.log('save the routine: ', routineName);
    // POST: save in the db

    if (routineName == '') return;

    const { data: idRoutine, error } = await useFetch<number>(config.public.baseURL + '/api/routine/insertRoutine', {
        method: 'POST',
        query: {
            profile_id: userID,
        },
        body: {
            routine_name: routineName,
            json: routineJSON,
        },
    });

    if (error.value) console.log(error.value);

    // now we are sure that the routine is saved
    //console.log(idRoutine.value);

    const {
        data: homeAssistantResponse,
        error: fetchError,
        pending,
    } = await useFetch<HomeAssistantReply>(config.public.baseURL + '/api/homeassistant/createAutomation', {
        method: 'POST',
        query: {
            profile_id: userID,
        },
        body: {
            routine_id: idRoutine.value,
        },
    });

    console.log(homeAssistantResponse.value);

    if (homeAssistantResponse.value?.message) {
        homeAssistantError.value = homeAssistantResponse?.value;
        setTimeout(() => {
            scrollToEnd();
        }, 100);
    }
};

const sendDefaultMessage = async (defaultMessage: string) => {
    //reset chat visuals
    isMessagesLoading.value = true;
    cleanWarning();
    console.log('defualt is: ', defaultMessage);

    if (userID) {
        const contentToSend = defaultMessage;
        if (messages.value !== null) {
            const userMessage = { id: 1, profile_id: userID, message: defaultMessage, is_chatgpt: false, is_routine: false, timestamp: new Date().toString() };
            messages.value.push(userMessage);
        }

        setTimeout(() => {
            scrollToEnd();
        }, 100);

        newMessage.value = '';
        const { data: responseContent, error } = await useFetch<ResponseBody>(config.public.baseURL + '/api/openai/openaiHandler', {
            method: 'POST',
            query: {
                profile_id: userID,
            },
            body: {
                //TODO: remeber that for auth is called uid, need to choose the same name also for other backend stuff
                message: contentToSend,
            },
        });

        if (error.value !== null) {
            console.log(error.value);
        }

        if (messages.value !== null && responseContent.value !== null) {
            const responseMessage: Message = {
                id: 2,
                profile_id: userID,
                message: responseContent.value.message,
                is_chatgpt: true,
                is_routine: responseContent.value.is_routine,
                timestamp: new Date().toString(),
            };

            // if the response is a routine set the routine fields
            if (responseContent.value.is_routine) {
                console.log('is a routine');
                console.log('message: ', responseMessage);
                responseMessage.routine = responseContent.value.routine;
                console.log(responseContent.value);
                console.log(responseMessage.routine);
            }

            messages.value.push(responseMessage);
        }

        setTimeout(() => {
            scrollToEnd();
        }, 100);
        isMessagesLoading.value = false;
    }
};
</script>

<template>
    <Header title="EcoMate" :is-action-button-enabled="true" />
    <div class="main">
        <div class="chat-container" id="chatBlock">
            <div class="message-wrapper" v-for="message in messages">
                <div class="message">
                    <ChatBubble :messageContent="message.message" :is-from-user="!message.is_chatgpt" :date="useDateFormatter(new Date(message.timestamp), DateType['message date (weekday hh:mm)'])" />
                </div>
                <div class="message-buttons">
                    <RoutineButton class="routine-button-wrapper" v-if="message.is_routine && message.routine !== undefined" @func="saveRoutine(message.routine?.routineName, message.routine?.routineJSON)" />
                </div>
            </div>
            <div class="homeassistant-response" :class="homeAssistantError.error ? 'response-error' : 'response-ok'" v-if="homeAssistantError.message !== ''">
                <span>{{ homeAssistantError.message }}</span>
                <Icon name="charm:cross" size="2rem" class="cross-icon" @click="cleanWarning" />
            </div>
            <MessageLoader v-if="pending || isMessagesLoading" />
        </div>

        <SuggestionContainer :suggestions="suggestions" @func="sendDefaultMessage" />

        <div class="user-textarea-container">
            <textarea class="user-textarea" cols="10" rows="1" v-model="newMessage" @keydown.enter.prevent="sendMessage"> </textarea>
            <button class="send-button" @click.prevent="sendMessage">
                <Icon name="material-symbols-light:send" color="white" size="2rem" />
            </button>
        </div>
        <p class="disclaimer-text"> OpenAI model can make mistakes. Consider checking important information. </p>
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

.chat-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-x: hidden;
    gap: 1.2rem;
    margin-bottom: 1rem;
}

.message-buttons {
    display: flex;
    gap: 2rem;
}

.routine-button-wrapper {
    margin: 0.8rem 0rem;
}

.homeassistant-response {
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.response-error {
    background-color: rgb(245, 118, 118);
    color: rgb(194, 42, 42);
    border: 1px solid rgb(194, 42, 42);
}

.response-ok {
    background-color: rgb(169, 244, 147);
    color: rgb(67, 153, 40);
    border: 1px solid rgb(67, 153, 40);
}

.cross-icon {
    cursor: pointer;
}

.user-textarea-container {
    display: flex;
    gap: 1rem;
    position: sticky;
}

.user-textarea {
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    resize: none;
    font-size: 1rem;
    height: auto;
    height: 3rem;
}

.send-button {
    width: 50px;
    background-color: var(--green-1);
    border-radius: 1rem;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    flex-grow: 1;
    cursor: pointer;
}

.disclaimer-text {
    margin-top: 0.8rem;
    color: var(--grey-2);
    text-align: center;
}
</style>
