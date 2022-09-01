const routes = [
    {
        path: '/',
        component: () => import('@/layouts/GuestLayout.vue'),
        props: (route) => route.query,
        children: [
            {
                path: 'login',
                component: () => import('@/views/SignIn.vue')
            }
        ]
    },
    {
        path: '/test',
        component: () => import('@/components/PrivacyStatement.vue'),
        props: (route) => route.query
    }
]
export default routes
