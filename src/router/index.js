import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'

import AppLayout from '@/layouts/AppLayout.vue'

import Dashboard from '@/pages/dashboard/Dashboard.vue'
import ProjectShow from '@/pages/project/ProjectShow.vue'
import Invitations from '@/pages/invitation/Invitations.vue'
import Settings from '@/pages/settings/Settings.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [

        {
            path: '/',
            name: 'login',
            component: Login,
            meta: { guest: true }
        },

        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: { guest: true }
        },

        {
            path: '/',
            component: AppLayout,
            meta: { requiresAuth: true },

            children: [

                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: Dashboard,
                },

                {
                    path: 'projects/:id',
                    name: 'project.show',
                    component: ProjectShow,
                },

                {
                    path: 'invitations',
                    name: 'invitations',
                    component: Invitations,
                },

                {
                    path: 'settings',
                    name: 'settings',
                    component: Settings,
                },

            ]
        }

    ]
})

router.beforeEach((to) => {

    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return { name: 'login' }
    }

    if (to.meta.guest && auth.isAuthenticated) {
        return { name: 'dashboard' }
    }

})

export default router