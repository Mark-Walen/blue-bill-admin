const routes = [
    {
        path: '/',
        component: () => import('@/layouts/GuestLayout.vue'),
        props: (route) => route.query,
        redirect: '/login',
        children: [
            {
                path: 'login',
                component: () => import('@/views/SignIn.vue')
            }
        ]
    },
    {
        path: '/test',
        component: () => import('../components/dialog/DynamicDialogWrapper.vue')
    },
    {
        path: '/mobile-dialog',
        name: 'mobile-dialog',
        props: true,
        component: () => import('../layouts/DynamicDialogLayout.vue')
    },
]

export default routes
