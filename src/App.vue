<script setup lang="ts">
import { RouterView } from 'vue-router'

const authenticated = false
</script>

<template>
    <Auth v-if="!authenticated" />
    <template v-else>
        <Sidebar />
        <Main />
    </template>
    <RouterView />
</template>

<style scoped></style>
