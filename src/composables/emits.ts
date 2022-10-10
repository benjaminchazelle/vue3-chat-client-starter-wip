import { useRouter } from 'vue-router'
import type {
    GetOrCreateOneToOneConversationEmit,
    GetUsersEmit,
} from '@/client/types/emits'
import { useLowLevelClient } from '@/client/useLowLevelClient'
import { useMessengerStore } from '@/stores/messenger'

export function useHighLevelClientEmits() {
    const chatClient = useLowLevelClient()

    const messengerStore = useMessengerStore()

    const router = useRouter()

    return {
        async getUsers() {
            const { users } = await chatClient.emit<GetUsersEmit>(
                '@getUsers',
                {}
            )
            messengerStore.setUsers(users)
        },

        async createOneToOneConversation(username: string) {
            const response =
                await chatClient.emit<GetOrCreateOneToOneConversationEmit>(
                    '@getOrCreateOneToOneConversation',
                    { username }
                )

            const { conversation } = response

            // messengerStore.upsertConversation(conversation)

            router.push({
                name: 'Conversation',
                params: { id: conversation.id },
            })

            return response
        },
    }
}
