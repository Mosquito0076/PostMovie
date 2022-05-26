import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import LoginView from '@/views/accounts/LoginView'
import LogoutView from '@/views/accounts/LogoutView'
import SignupView from '@/views/accounts/SignupView'
import ProfileView from '@/views/accounts/ProfileView'

import ReviewListView from '@/views/reviews/ReviewListView'
import ReviewDetailView from '@/views/reviews/ReviewDetailView'
import ReviewNewView from '@/views/reviews/ReviewNewView'
import ReviewEditView from '@/views/reviews/ReviewEditView'
import FeedView from '@/views/reviews/FeedView'

import MainMovieView from '@/views/movies/MainMovieView'
import MovieView from '@/views/movies/MovieView'
import MovieDetailView from '@/views/movies/MovieDetailView'


import NotFound404 from '@/views/NotFound404'


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'mainMovies',
    component: MainMovieView,
  },
  {
    path: '/movies/',
    name: 'movies',
    component: MovieView,
  },
  {
    path: '/movies/:moviePk',
    name: 'movie',
    component: MovieDetailView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: ReviewListView,
  },
  {
    path: '/reviews/new',
    name: 'reviewNew',
    component: ReviewNewView,
  },
  {
    path: '/reviews/feed',
    name: 'feed',
    component: FeedView,
  },
  {
    path: '/reviews/:reviewPk/edit',
    name: 'reviewEdit',
    component: ReviewEditView,
  },
  {
    path: '/reviews/:reviewPk',
    name: 'review',
    component: ReviewDetailView,
  },
  {
    path: '/404',
    name: 'NotFound404',
    component: NotFound404
  },
  {
    path: '*',
    redirect: '/404'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() { 
    return { x: 0, y: 0 } 
  },
})


router.beforeEach((to, from, next) => {
  store.commit('SET_AUTH_ERROR', null)

  const { isLoggedIn } = store.getters

  const noAuthPages = ['login', 'signup', ]

  const freePages = ['mainMovies', 'reviews', 'movie', 'movies', 'login', 'signup', '', '/',]

  const isAuthRequired = !noAuthPages.includes(to.name)

  const isAuthRequired2 = !freePages.includes(to.name)



  if (!isAuthRequired && isLoggedIn) {
    next({ name: 'mainMovies'})
  }

  if (isAuthRequired2 && !isLoggedIn) {
    alert('로그인이 필요한 서비스입니다.')
    next({ name: 'login'})
  } else {
    next()
  }
  
  if (to.name === 'logout') {
    next()
  } else if (isLoggedIn) {
    store.dispatch('fetchCurrentUser')
    next()
  }
})


export default router
