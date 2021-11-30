
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('layouts/user/ProfileLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/Profile.vue') }
    ]
  },
  {
    path: '/staff/register',
    name: 'RegisterStaff',
    component: () => import('layouts/staff/StaffLayout.vue'),
    children: [
      { path: '', component: () => import('pages/staff/Register.vue') }
    ]
  },
  {
    path: '/staff/manage',
    name: 'ManageStaff',
    component: () => import('layouts/staff/ManageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/staff/Manage.vue') }
    ]
  },
  {
    path: '/staff/dashboard',
    name: 'DashboardStore',
    component: () => import('layouts/staff/DashboardStoreLayout.vue'),
    children: [
      { path: '', component: () => import('pages/staff/DashboardStore.vue') }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
