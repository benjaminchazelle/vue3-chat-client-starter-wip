<script setup lang="ts">
import { toRefs } from 'vue'
import { useHighLevelClientEmits } from '@/composables/emits'
import { useMessengerStore } from '@/stores/messenger'

const messengerStore = useMessengerStore()

const clientEmits = useHighLevelClientEmits()

const { users } = toRefs(messengerStore)

async function openConversation() {
    await clientEmits.createOneToOneConversation('Alice')

    console.log('Conversation ouverte !')
}

</script>

<template>
    <div class="community">
        <div class="filter">
            <div class="ui fluid search">
                <div class="ui icon input">
                    <input
                        class="prompt"
                        type="text"
                        placeholder="Rechercher un utilisateur"
                    />
                    <i class="search icon"></i>
                </div>
                <div class="results"></div>
            </div>
        </div>
        <div class="users">
            <div class="selected user">
                <img src="https://source.unsplash.com/7omHUGhhmZ0/100x100" />
                <span class="">Bob</span>
            </div>
            <div class="user">
                <img src="https://source.unsplash.com/rITj7p2KeZE/100x100" />
                <span class="">Cha</span>
            </div>
            <div class="user">
                <img src="https://source.unsplash.com/FUcupae92P4/100x100" />
                <span class="available">Derek</span>
            </div>
            <div class="user">
                <img src="https://source.unsplash.com/4U1x6459Q-s/100x100" />
                <span class="">Emilio</span>
            </div>
            <div class="selected user">
                <img src="https://source.unsplash.com/3402kvtHhOo/100x100" />
                <span class="available">Fabrice</span>
            </div>
            <div class="user">
                <img src="https://source.unsplash.com/J7Cf1Gch49E/100x100" />
                <span class="">Gael</span>
            </div>
        </div>

        <div class="actions">
            <button class="ui primary big button" @click="openConversation">
                <i class="conversation icon"></i>
                <span>Ouvrir la conversation (2)</span>
            </button>
        </div>
    </div>
</template>

<style scoped src="./Community.css" />
