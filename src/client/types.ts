export type Auth = {
    username: string
    token: string
    picture_url: string
}

export interface Emit {
    event: string
    authenticated: boolean
    payload: {}
    response: {}
}

export interface AuthenticateEmit extends Emit {
    event: '@authenticate'
    authenticated: false
    payload: {
        username: string
        password: string
    }
    response: Auth
}

export interface GetUsersEmit extends Emit {
    event: '@getUsers'
    authenticated: true
    payload: {}
    response: {
        // TODO
    }
}

export interface GetOrCreateOneToOneConversationEmit extends Emit {
    event: '@getOrCreateOneToOneConversation'
    authenticated: true
    payload: {
        username: string
    }
    response: {
        // TODO
    }
}

export interface CreateManyToManyConversationEmit extends Emit {
    event: '@createManyToManyConversation'
    authenticated: true
    payload: {
        usernames: string[]
    }
    response: {
        // TODO
    }
}

export interface PostMessageEmit extends Emit {
    event: '@postMessage'
    authenticated: true
    payload: {
        conversation_id: string
        content: string
    }
    response: {
        // TODO
    }
}

export interface SeeConversationEmit extends Emit {
    event: '@seeConversation'
    authenticated: true
    payload: {
        conversation_id: string
        message: string
    }
    response: {
        // TODO
    }
}

export interface ReactMessageEmit extends Emit {
    event: '@reactMessage'
    authenticated: true
    payload: {
        conversation_id: string
        message_id: string
        reaction: string
    }
    response: {
        // TODO
    }
}

export interface ReplyMessageEmit extends Emit {
    event: '@replyMessage'
    authenticated: true
    payload: {
        conversation_id: string
        message_id: string
        content: string
    }
    response: {
        // TODO
    }
}

export interface GetConversationsEmit extends Emit {
    event: '@getConversations'
    authenticated: true
    payload: {}
    response: {
        // TODO
    }
}

export interface SearchMessageEmit extends Emit {
    event: '@searchMessage'
    authenticated: true
    payload: {
        search: string
    }
    response: {
        // TODO
    }
}

export interface EditMessageEmit extends Emit {
    event: '@editMessage'
    authenticated: true
    payload: {
        conversation_id: string
        message_id: string
        content: string
    }
    response: {
        // TODO
    }
}

export interface DeleteMessageEmit extends Emit {
    event: '@deleteMessage'
    authenticated: true
    payload: {
        conversation_id: string
        message_id: string
    }
    response: {
        // TODO
    }
}

export interface AddParticipantEmit extends Emit {
    event: '@addParticipant'
    authenticated: true
    payload: {
        conversation_id: string
        username: string
    }
    response: {
        // TODO
    }
}

export interface RemoveParticipantEmit extends Emit {
    event: '@removeParticipant'
    authenticated: true
    payload: {
        conversation_id: string
        username: string
    }
    response: {
        // TODO
    }
}

export interface TypeConversationEmit extends Emit {
    event: '@typeConversation'
    authenticated: true
    payload: {
        conversation_id: string
    }
    response: {
        // TODO
    }
}

export interface SetConversationThemeEmit extends Emit {
    event: '@setConversationTheme'
    authenticated: true
    payload: {
        conversation_id: string
        theme: string
    }
    response: {
        // TODO
    }
}

export interface SetConversationTitleEmit extends Emit {
    event: '@setConversationTitle'
    authenticated: true
    payload: {
        conversation_id: string
        title: string
    }
    response: {
        // TODO
    }
}

export interface SetParticipantNickname extends Emit {
    event: '@setParticipantNickname'
    authenticated: true
    payload: {
        conversation_id: string
        participant: string
        nickname: string
    }
    response: {
        // TODO
    }
}

export interface Event {
    event: string
    payload: unknown
}
