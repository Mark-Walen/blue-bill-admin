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
    }
]

export default routes
