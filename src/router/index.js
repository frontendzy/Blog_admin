import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Home from '../views/pages/Home.vue'


import ClassIfication from '../views/pages/classification/ClassIfication.vue'
import ClassIficationCreate from '../views/pages/classification/Create.vue'
import ClassIficationList from '../views/pages/classification/List.vue'

import Article from '../views/pages/article/Article.vue'
import ArticleCreate from '../views/pages/article/Create.vue'
import ArticleList from '../views/pages/article/List.vue'

import User from '../views/pages/user/User.vue'
import UserCreate from '../views/pages/user/Create.vue'
import UserList from '../views/pages/user/List.vue'

import BlogIcon from '../views/pages/blogicon/BlogIcon.vue'
import BlogIconCreate from '../views/pages/blogicon/Create.vue'
import BlogIconList from '../views/pages/blogicon/List.vue'

import Personal from '../views/pages/personal/Personal.vue'
import PersonalCreate from '../views/pages/personal/Create.vue'
import PersonalList from '../views/pages/personal/List.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{isPublic: true}
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/', component: Home },
      { 
        path: '/admin/classification/create',
        component: ClassIfication,
        children: [
          { path: '/admin/classification/create', component: ClassIficationCreate },
          { path: '/admin/classification/edit/:id', component: ClassIficationCreate , props: true},
          { path: '/admin/classification/list', component: ClassIficationList },
        ] 
      },
      { 
        path: '/admin/article/create',
        component: Article,
        children: [
          { path: '/admin/article/create', component: ArticleCreate },
          { path: '/admin/article/edit/:id', component: ArticleCreate , props: true},
          { path: '/admin/article/list', component: ArticleList },
        ] 
      },
      { 
        path: '/admin/user/create',
        component: User,
        children: [
          { path: '/admin/user/create', component: UserCreate },
          { path: '/admin/user/edit/:id', component: UserCreate , props: true},
          { path: '/admin/user/list', component: UserList },
        ] 
      },
      { 
        path: '/admin/blog',
        component: BlogIcon,
        children: [
          { path: '/admin/blog/create', component: BlogIconCreate },
          { path: '/admin/blog/edit/:id', component: BlogIconCreate , props: true},
          { path: '/admin/blog/list', component: BlogIconList },
        ] 
      },
      { 
        path: '/admin/personal',
        component: Personal,
        children: [
          { path: '/admin/personal/create', component: PersonalCreate },
          { path: '/admin/personal/edit/:id', component: PersonalCreate , props: true},
          { path: '/admin/personal/list', component: PersonalList },
        ] 
      }
    ]
  }
]

// const router = new VueRouter({
//   routes,
// mode: 'history',
// })

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router
