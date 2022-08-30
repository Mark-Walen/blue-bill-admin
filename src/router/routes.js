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
    }
]
export default routes
