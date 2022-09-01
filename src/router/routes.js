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
        path: '/agree',
        component: () => import('@/components/UserAgreement.vue'),
        props: (route) => route.query
    }
]
export default routes
