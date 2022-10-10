<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import type { Conversation } from '@/client/types/business'
import { useAuthStore } from '@/stores/auth'
import { useMessengerStore } from '@/stores/messenger'

const router = useRouter()

const authStore = useAuthStore()

const messengerStore = useMessengerStore()

const { user } = toRefs(authStore)
const { logout } = authStore

const { conversations } = toRefs(messengerStore)

function openCommunity() {
    router.push({ name: 'Community' })
}

function openMessageSearch() {
    router.push({ name: 'Search' })
}

function openConversation(id: Conversation['id']) {
    router.push({ name: 'Conversation', params: { id } })
}
</script>

<template>
    <div class="sidebar">
        <div class="user" v-if="user">
            <div class="user-picture">
                <img :src="user.picture_url" class="ui circular image" />
            </div>

            <div class="user-info">
                <div class="user-info-pseudo">{{ user.username }}</div>

                <div class="user-info-status ui simple dropdown">
                    <div class="available text">En ligne</div>
                    <i class="dropdown icon"></i>
                    <div class="menu">
                        <div class="item" @click="logout">
                            <i class="logout icon"></i>
                            Déconnexion
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="menu">
            <div class="blue button" @click="openCommunity">
                <i class="users icon"></i>
                <br />
                <span>Communauté</span>
            </div>
            <div v-if="true" class="blue button" @click="openMessageSearch">
                <i class="search icon"></i>
                <br />
                <span>Messages</span>
            </div>
        </div>
        <div class="conversations">
            <div class="conversation-search">
                <div class="ui fluid search">
                    <div class="ui icon input">
                        <input
                            class="prompt"
                            placeholder="Rechercher une conversation"
                            type="text"
                        />
                        <i class="search icon"></i>
                    </div>
                </div>
            </div>
            <div
                class="conversation new"
                title="Bob"
                @click="
                    openConversation('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
                "
            >
                <a class="avatar">
                    <img
                        src="https://source.unsplash.com/7omHUGhhmZ0/100x100"
                    />
                </a>
                <div class="content">
                    <div class="metadata">
                        <div class="title">
                            <i class="ui small icon circle"></i>
                            Bob
                        </div>
                        <span class="time">01:30:58</span>
                    </div>
                    <div class="text">C'est vraiment super Alice !</div>
                </div>
            </div>
            <div
                class="conversation"
                title="Groupe: Gael, Bob"
                @click="
                    openConversation('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
                "
            >
                <a class="avatar">
                    <span>
                        <i class="users icon"></i>
                    </span>
                </a>
                <div class="content">
                    <div class="metadata">
                        <div class="title">Groupe: Gael, Bob</div>
                        <span class="time">01:36:38</span>
                    </div>
                    <div class="text">Incroyable !</div>
                </div>
            </div>
            <div
                class="conversation available"
                title="Cha"
                @click="
                    openConversation('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
                "
            >
                <a class="avatar">
                    <img
                        src="https://source.unsplash.com/rITj7p2KeZE/100x100"
                    />
                </a>
                <div class="content">
                    <div class="metadata">
                        <div class="title">
                            <i class="ui small icon circle"></i>
                            Cha
                        </div>
                        <span class="time">2 jours</span>
                    </div>
                    <div class="text">Nouvelle conversation</div>
                </div>
            </div>
            <div
                class="conversation selected"
                title="Derek"
                @click="
                    openConversation('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
                "
            >
                <a class="avatar">
                    <img
                        src="https://source.unsplash.com/FUcupae92P4/100x100"
                    />
                </a>
                <div class="content">
                    <div class="metadata">
                        <div class="title">Derek</div>
                        <span class="time">3 semaines</span>
                    </div>
                    <div class="text">Nouvelle conversation</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="./Sidebar.css" />
