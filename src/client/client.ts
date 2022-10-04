import io, { Socket } from 'socket.io-client'

export type Auth = {
    username: string
    token: string
    picture_url: string
}

export default class Client {
    private title: string
    private socket: Socket
    private callbacks: Record<string, (payload?: unknown) => void>
    private waitingForAuth: ((payload: Auth) => void)[]
    private auth: null | Auth
    private endpoint: string

    constructor(
        endpoint: string = 'wss://teach-vue-chat-server.glitch.me',
        title: string = 'user'
    ) {
        this.title = title

        this.auth = null
        this.waitingForAuth = []

        this.callbacks = {}

        this.endpoint = endpoint

        this.socket = io(endpoint)

        this.applyCallbacks()
    }

    applyCallbacks() {
        if (!this.socket) return

        this.socket.on('connect', async () => {
            console.log('socket@connect', this.socket.id)
        })

        for (const eventName of Object.keys(this.callbacks)) {
            this.socket.on(
                '@' + eventName,
                async (data: unknown, ack: () => void) => {
                    console.log(this.title, 'on', '@' + eventName, data)
                    this.callbacks[eventName](data)
                    if (ack) {
                        ack()
                    }
                }
            )
        }
    }

    setEndpoint(endpoint: string) {
        if (this.endpoint === endpoint) {
            return
        }

        this.endpoint = endpoint

        this.socket = io(endpoint)

        this.applyCallbacks()
    }

    on(eventName: string, callback: (payload?: unknown) => void) {
        this.callbacks[eventName] = callback
        this.applyCallbacks()
    }

    requireAuth(): Promise<Auth> {
        if (this.auth) {
            return Promise.resolve(this.auth)
        } else {
            return new Promise((resolve) => {
                this.waitingForAuth.push(resolve)
            })
        }
    }

    ack<O>(eventName: string, payload: unknown): Promise<O> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(this.title, 'emit', eventName, payload)
                this.socket.emit(
                    eventName,
                    payload,
                    (response: { code: string; data: O }) => {
                        console.log(this.title, 'ack', eventName)

                        if (response.code === 'SUCCESS') {
                            resolve(response.data)
                        } else {
                            reject(response.code)
                        }
                    }
                )
            }, 0)
        })
    }

    authenticate(username: string, password: string): Promise<Auth> {
        return new Promise((resolve, reject) => {
            this.ack<Auth>('@authenticate', {
                username,
                password,
            })
                .then((auth) => {
                    this.auth = auth
                    resolve(this.auth)
                    for (const resolve of this.waitingForAuth) {
                        resolve(this.auth)
                    }
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    async getUsers() {
        const { token } = await this.requireAuth()
        return this.ack('@getUsers', {
            token,
        })
    }

    async getOrCreateOneToOneConversation(username: string) {
        const { token } = await this.requireAuth()

        return this.ack('@getOrCreateOneToOneConversation', {
            token,
            username,
        })
    }

    async createManyToManyConversation(usernames: string[]) {
        const { token } = await this.requireAuth()

        return this.ack('@createManyToManyConversation', {
            token,
            usernames,
        })
    }

    async postMessage(conversation_id: string, content: string) {
        const { token } = await this.requireAuth()

        return this.ack('@postMessage', {
            token,
            conversation_id,
            content,
        })
    }

    async seeConversation(conversation_id: string, message_id: string) {
        const { token } = await this.requireAuth()

        return this.ack('@seeConversation', {
            token,
            conversation_id,
            message_id,
        })
    }

    async reactMessage(
        conversation_id: string,
        message_id: string,
        reaction: string
    ) {
        const { token } = await this.requireAuth()

        return this.ack('@reactMessage', {
            token,
            conversation_id,
            message_id,
            reaction,
        })
    }

    async replyMessage(
        conversation_id: string,
        message_id: string,
        content: string
    ) {
        const { token } = await this.requireAuth()

        return this.ack('@replyMessage', {
            token,
            conversation_id,
            message_id,
            content,
        })
    }

    async getConversations() {
        const { token } = await this.requireAuth()

        return this.ack('@getConversations', {
            token,
        })
    }

    async searchMessage(search: string) {
        const { token } = await this.requireAuth()

        return this.ack('@searchMessage', {
            token,
            search,
        })
    }

    async editMessage(
        conversation_id: string,
        message_id: string,
        content: string
    ) {
        const { token } = await this.requireAuth()

        return this.ack('@editMessage', {
            token,
            conversation_id,
            message_id,
            content,
        })
    }

    async deleteMessage(conversation_id: string, message_id: string) {
        const { token } = await this.requireAuth()

        return this.ack('@deleteMessage', {
            token,
            conversation_id,
            message_id,
        })
    }

    async addParticipant(conversation_id: string, username: string) {
        const { token } = await this.requireAuth()

        return this.ack('@addParticipant', {
            token,
            conversation_id,
            username,
        })
    }

    async removeParticipant(conversation_id: string, username: string) {
        const { token } = await this.requireAuth()

        return this.ack('@removeParticipant', {
            token,
            conversation_id,
            username,
        })
    }

    async typeConversation(conversation_id: string) {
        const { token } = await this.requireAuth()

        return this.ack('@typeConversation', {
            token,
            conversation_id,
        })
    }

    async setConversationTheme(conversation_id: string, theme: string) {
        const { token } = await this.requireAuth()

        return this.ack('@setConversationTheme', {
            token,
            conversation_id,
            theme,
        })
    }

    async setConversationTitle(conversation_id: string, title: string) {
        const { token } = await this.requireAuth()

        return this.ack('@setConversationTitle', {
            token,
            conversation_id,
            title,
        })
    }

    async setParticipantNickname(
        conversation_id: string,
        participant: string,
        nickname: string
    ) {
        const { token } = await this.requireAuth()

        return this.ack('@setParticipantNickname', {
            token,
            conversation_id,
            participant,
            nickname,
        })
    }
}
