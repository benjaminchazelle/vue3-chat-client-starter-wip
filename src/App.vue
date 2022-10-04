<script setup lang="ts">
import { toRefs } from 'vue'
import Auth from '@/components/Auth/Auth.vue'
import Main from '@/components/Main/Main.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

authStore.login()

const { user } = toRefs(authStore)
</script>

<template>
    <Auth v-if="!user" />
    <template v-else>
        <Sidebar />
        <Main />
    </template>
</template>

<style scoped></style>
