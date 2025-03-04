import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import { config } from '@/config'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: config.meta.Home
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: config.meta.Login
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: config.meta.Register
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutPage.vue'),
    meta: config.meta.About

  },
  {
    path: '/delivery-form',
    name: 'DeliveryForm',
    component: () => import('../views/DeliveryForm.vue'),
    meta: config.meta.DeliveryForm
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
    meta: config.meta.PrivacyPolicy
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('../views/TermsPage.vue'),
    meta: config.meta.Terms
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue'),
    meta: config.meta.ForgotPassword
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactPage.vue'),
    meta: config.meta.Contact
  },
  {
    path: '/release-notes/',
    name: 'ReleaseNotes',
    component: () => import('@/views/ReleaseNotesPage.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag))

  next()
})

export default router
