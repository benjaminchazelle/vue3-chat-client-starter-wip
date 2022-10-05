import { ref } from 'vue'
import Client from './client'
import type { Auth } from './types'

const authenticating = ref(false)

export const client = new Client()

export function useChatClient() {
    async function connect(
        username: string,
        password: string,
        endpoint: string
    ): Promise<Auth> {
        authenticating.value = true

        client.setEndpoint(endpoint)

        try {
            const auth = await client.authenticate(username, password)
            authenticating.value = false
            return auth
        } catch (e) {
            authenticating.value = false
            throw e
        }
    }

    return {
        connect,
        emit: client.emit,
        on: client.on,
        authenticating,
    }
}
