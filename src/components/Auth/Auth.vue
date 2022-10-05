<script setup>
import { ref } from 'vue'
import { useChatClient } from '@/client/useChatClient'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const { defaultUsername, defaultPassword, defaultEndpoint } = authStore

const { authenticating } = useChatClient()

const username = ref(defaultUsername)
const password = ref(defaultPassword)
const endpoint = ref(defaultEndpoint)

const error = ref(null)

async function login() {
    error.value = null
    try {
        await authStore.login(username.value, password.value)
    } catch (e) {
        const messages = {
            NOT_AUTHENTICATED: 'Mot de passe incorrect',
            NOT_VALID_USERNAME: 'Username non valide',
            NOT_VALID_PASSWORD: 'Mot de passe non valide',
        }
        error.value = messages?.[e] || e
    }
}
</script>

<template>
    <div class="auth">
        <div class="ui middle aligned center aligned grid">
            <div class="column">
                <h2 class="ui primary image header">
                    <div class="content">Teach Vue Chat Client</div>
                </h2>
                <form class="ui large form">
                    <div v-if="authenticating" class="ui attached segment">
                        <div>Authentification...</div>
                        <i>
                            {{ endpoint }}
                        </i>
                    </div>
                    <div v-else>
                        <div class="ui attached segment">
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="user icon"></i>
                                    <input
                                        type="text"
                                        name="pseudo"
                                        v-model="username"
                                        placeholder="Nom d'utilisateur"
                                        @keyup.enter="login"
                                    />
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="lock icon"></i>
                                    <input
                                        v-model="password"
                                        type="password"
                                        name="password"
                                        placeholder="Mot de passe"
                                        @keyup.enter="login"
                                    />
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="server icon"></i>
                                    <input
                                        v-model="endpoint"
                                        type="text"
                                        name="endpoint"
                                        placeholder="URL du serveur"
                                        @keyup.enter="login"
                                    />
                                </div>
                            </div>
                            <div
                                class="ui fluid large primary submit button"
                                @click="login"
                            >
                                Connexion
                            </div>
                        </div>
                        <div class="ui attached segment">
                            La première connexion créer un compte.
                        </div>

                        <div
                            :class="{ visible: error }"
                            class="ui error message"
                        >
                            {{ error }}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped src="./Auth.css" />
