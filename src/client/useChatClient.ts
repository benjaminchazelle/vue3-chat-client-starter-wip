import { ref } from 'vue'
import Client from './client'
import type { Auth } from './client'

const defaultUsername = ref(localStorage.getItem('username'))
const defaultPassword = ref(localStorage.getItem('password'))
const defaultEndpoint = ref(
    localStorage.getItem('endpoint') || 'wss://teach-vue-chat-server.glitch.me'
)

const authenticating = ref(false)

export const client = new Client(defaultEndpoint.value)

client.on('messagePosted', (x) => {
    console.log('upsertUser', x)
})

export function useChatClient() {
    function setEndpoint(endpoint: string) {
        localStorage.setItem('endpoint', endpoint)
        return client.setEndpoint(endpoint)
    }

    async function authenticate(username: string, password: string): Promise<Auth> {
        authenticating.value = true
        try {
            const ack = await client.authenticate(username, password)
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            authenticating.value = false
            return ack
        } catch (e) {
            authenticating.value = false
            throw e
        }
    }

    return {
        ...client,
        setEndpoint,
        authenticate,
        defaultUsername,
        defaultPassword,
        defaultEndpoint,
        authenticating,
    }
}
