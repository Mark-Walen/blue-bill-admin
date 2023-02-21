const routes = [
    {
        path: '/',
        component: () => import('../layouts/GuestLayout.vue'),
        props: (route) => route.query,
        redirect: '/workspace',
        children: [
            {
                path: 'login',
                component: () => import('../views/SignIn.vue')
            }
        ]
    },
    {
        path: '/workspace',
        component: () => import('../layouts/DashboardLayout.vue'),
        redirect: '/workspace/dashboard',
        children: [
            {
                path: '/workspace/dashboard',
                component: () => import('../views/dashboard/Statistic.vue'),
                meta: {
                    title: '数据监控',
                    icon: 'statistic'
                }
            },
            {
                path: '/workspace/bill-management',
                redirect: '/workspace/bill-management/bill-details',
                meta: {
                    title: '账单管理',
                    icon: 'bank',
                },
                children: [
                    {
                        path: '/workspace/bill-management/bill-details',
                        component: () => import('../views/bill/BillDetails.vue'),
                        meta: {
                            title: '账单明细',
                            icon: '',
                        },
                    },
                    {
                        path: '/workspace/bill-management/bill-category',
                        component: () => import('../views/bill/BillCategory.vue'),
                        meta: {
                            title: '账单类别',
                            icon: '',
                        },
                    },
                    {
                        path: '/workspace/bill-management/merchant',
                        component: () => import('../views/bill/Merchant.vue'),
                        meta: {
                            title: '常用店铺',
                            icon: '',
                        },
                    }
                ]
            },
            {
                path: '/workspace/my-wallet',
                redirect: '/workspace/my-wallet/credit-card',
                meta: {
                    title: '我的钱包',
                    icon: 'wallet',
                },
                children: [
                    {
                        path: '/workspace/my-wallet/credit-card',
                        component: () => import('../views/wallet/CreditCard.vue'),
                        meta: {
                            title: '银行卡',
                            icon: ''
                        }
                    },
                    {
                        path: '/workspace/my-wallet/fare-card',
                        component: () => import('../views/wallet/FareCard.vue'),
                        meta: {
                            title: '交通卡',
                            icon: ''
                        }
                    },
                    {
                        path: '/workspace/my-wallet/auto-renew',
                        component: () => import('../views/wallet/AutoRenew.vue'),
                        meta: {
                            title: '自动续费',
                            icon: ''
                        }
                    },
                    {
                        path: '/workspace/my-wallet/business-card',
                        component: () => import('../views/wallet/BusinessCard.vue'),
                        meta: {
                            title: '名片',
                            icon: ''
                        }
                    }
                ]
            },
            {
                path: '/workspace/account-center/',
                redirect: '/workspace/account-center/account-info',
                meta: {
                    title: '我的钱包',
                    icon: 'user',
                },
                children: [
                    {
                        path: '/workspace/account-center/account-info',
                        component: () => import('../views/account/AccountInformation.vue'),
                        meta: {
                            title: '账户资料',
                            icon: ''
                        }
                    },
                    {
                        path: '/workspace/account-center/account-security/',
                        redirect: '/workspace/account-center/account-security/security-center',
                        meta: {
                            title: '安全隐私',
                            icon: ''
                        },
                        children: [
                            {
                                path: '/workspace/account-center/account-security/security-center',
                                component: () => import('../views/account/AccountSecurity.vue'),
                                meta: {
                                    title: '账号安全中心',
                                    icon: ''
                                },
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '/mobile-dialog',
        name: 'mobile-dialog',
        props: true,
        component: () => import('../layouts/DynamicDialogLayout.vue')
    },
]

export default routes
