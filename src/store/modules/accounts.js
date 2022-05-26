import drf from "@/api/drf"
import router from "@/router"
import axios from "axios"



export default {

  state: {
    token: localStorage.getItem('token') || '',
    currentUser: {},
    userProfile: {},
    profile: {},
    authError: null,
  },
  getters: {
    isLoggedIn: state => !!state.token,
    currentUser: state => state.currentUser,
    profile: state => state.profile,
    authError: state => state.authError,
    authHeader: state => ({ Authorization: `Token ${state.token}` })
  },
  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_PROFILE: (state, profile) => state.profile = profile,
    SET_AUTH_ERROR: (state, error) => state.authError = error,
    DELETE_CURRENT_USER: (state, user) => state.currentUser = user,
    DELETE_PROFILE: (state, profile) => state.profile = profile,
  },
  actions: {
    saveToken({ commit }, token) {
      commit('SET_TOKEN', token)
      localStorage.setItem('token', token)
    },
    removeToken({ commit }) {
      commit('SET_TOKEN', '')
      localStorage.setItem('token', '')
    },
    login({ commit, dispatch }, credentials) {
      axios({
        url: drf.accounts.login(),
        method: 'post',
        data: credentials,
      })
        .then(res => {
          console.log(res)
          const token = res.data.key
          dispatch('saveToken', token)
          dispatch('fetchCurrentUser')
          router.push({ name: 'mainMovies' })
        })
        .catch(err => {
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },
    logout({ getters, dispatch }) {
      axios({
        url: drf.accounts.logout(),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(() => {
          dispatch('removeToken')
          dispatch('deleteCurrentUser')
          dispatch('deleteProfile')
          dispatch('deleteRecommendation')
          alert('로그아웃 되었습니다.')
          router.push({ name: 'mainMovies' })
        })
        .catch(err => {
          console.error(err.response)
        })
    },
    signup({ commit, dispatch }, credentials) {
      axios({
        url: drf.accounts.signup(),
        method: 'post',
        data: credentials,
      })
        .then(res => {
          const token = res.data.key
          dispatch('saveToken', token)
          dispatch('fetchCurrentUser')
          router.push({ name: 'mainMovies' })
        })
        .catch(err => {
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },
    fetchCurrentUser({ getters, dispatch }) {
      if (getters.isLoggedIn) {
        axios({
          url: drf.accounts.currentUserInfo(),
          method: 'get',
          headers: getters.authHeader,
        })
          .then(res => {
            dispatch('fetchUserProfile', res.data)
          })
          .catch(err => {
            if (err.response.status === 401) {
              dispatch('removeToken')
              router.push({ name: 'login' })
            }
          })
      }
    },
    deleteCurrentUser({ commit }) {
      commit('DELETE_CURRENT_USER', {})
    },
    fetchUserProfile({ commit, getters, dispatch }, { username }) {
      axios({
        url: drf.accounts.profile(username),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          const reviewedMovie = getters.reviews.filter(review => { return review.user.username === res.data.username }).map(review => review.movie.id)
          const currentUser = { ...res.data, reviewedMovie }
          commit('SET_CURRENT_USER', currentUser)
          if (reviewedMovie.length) {
            dispatch('getRecommendation', reviewedMovie[reviewedMovie.length-1])
          }
        })
        .catch(err => console.error(err.response))
    },
    fetchProfile({ commit, getters }, { username }) {
      axios({
        url: drf.accounts.profile(username),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_PROFILE', res.data))
        .catch(err => {
          console.error(err.response)
          router.push({ name: 'NotFound404' })
        })
    },
    deleteProfile({ commit }) {
      commit('DELETE_PROFILE', {})
    },
    followUser({ commit, getters }, username) {
      axios({
        url: drf.accounts.follow(username),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_PROFILE', res.data)
        })
        .catch(err => console.error(err.response))
    },
    myWishList({ getters }, moviePk) {
      axios({
        url: drf.accounts.wishList(moviePk),
        method: 'post',
        headers: getters.authHeader,
      })
      .catch(err => console.error(err.response))
    },
  },
}