<script setup lang="ts">
import { toRefs } from 'vue'
import { RouterView } from 'vue-router'
import Auth from '@/components/Auth/Auth.vue'
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
        <div class="main">
            <router-view></router-view>
        </div>
    </template>
</template>

<style scoped>

.main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 300px;
    right: 0;
    background: white;
    overflow-y: auto;
}

@media screen and (max-width: 800px) {
    .main {
        left: 60px;
    }
}

.main > * {
    margin: 0 auto;
}
</style>
