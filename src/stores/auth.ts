import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Auth } from '@/client/client'
import { useChatClient } from '@/client/useChatClient'

const {
    defaultUsername,
    defaultPassword,
    defaultEndpoint,
    setEndpoint,
    authenticate,
} = useChatClient()

export const useAuthStore = defineStore('auth', () => {
    const user = ref<Auth | null>(null)

    return { user, login }

    async function login(
        username = defaultUsername.value || '',
        password = defaultPassword.value || '',
        endpoint = defaultEndpoint.value || ''
    ) {
        setEndpoint(endpoint)
        user.value = await authenticate(username, password)
    }
})
