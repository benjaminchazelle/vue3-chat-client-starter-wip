import { createRouter, createWebHistory } from 'vue-router'
import Community from '@/components/Community/Community.vue'
import Conversation from '@/components/Conversation/Conversation.vue'
import Search from '@/components/Search/Search.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Community',
            component: Community,
        },
        {
            path: '/conversation/:id',
            name: 'Conversation',
            component: Conversation,
        },
        {
            path: '/search',
            name: 'Search',
            component: Search,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Community',
            component: Community,
        },
    ],
})

export default router
