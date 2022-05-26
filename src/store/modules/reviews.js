import drf from '@/api/drf'
import router from '@/router'
import axios from 'axios'
import _ from 'lodash'


export default {

  state: {
    reviews: [],
    review: {},
  },
  getters: {
    reviews: state => state.reviews,
    review: state => state.review,
    isAuthor: (state, getters) => {
      return state.review.user?.username === getters.currentUser.username
    },
    isReview: state => !_.isEmpty(state.review),
  },
  mutations: {
    SET_REVIEWS: (state, reviews) => state.reviews = reviews,
    SET_REVIEW: (state, review) => state.review = review,
    SET_REVIEW_COMMENTS: (state, comments) => (state.review.comments = comments),
  },
  actions: {
    fetchReviews({ commit }) {
      axios({
        url: drf.reviews.reviews(),
        method: 'get',
      })
        .then(res => commit('SET_REVIEWS', res.data))
        .catch(err => console.error(err.response))
    },
    fetchReview({ commit, getters }, reviewPk) {
      axios({
        url: drf.reviews.review(reviewPk),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_REVIEW', res.data))
        .catch(err => {
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },
    createReview({ commit, getters, dispatch }, review) {
      axios({
        url: drf.reviews.reviewNew(getters.movie.id),
        method: 'post',
        data: review,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEW', res.data)
          dispatch('fetchReviews')
          router.push({ name: 'review', params: { reviewPk: getters.review.pk } })
        })
        .catch(err => console.error(err.response))
    },
    updateReview({ commit, getters, dispatch }, { pk, title, content, movie_id, movie_title, rank }) {
      axios({
        url: drf.reviews.review(pk),
        method: 'put',
        data: { title, content, movie_id, movie_title, rank },
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEW', res.data)
          dispatch('fetchReviews')
          router.push({ name: 'review', params: { reviewPk: getters.review.pk } })
        })
        .catch(err => console.error(err.response))
    },
    deleteReview({ commit, getters, dispatch }, reviewPk) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.reviews.review(reviewPk),
          method: 'delete',
          headers: getters.authHeader,
        })
          .then(() => {
            commit('SET_REVIEW', {})
            dispatch('fetchReviews')
            router.push({ name: 'reviews' })
          })
          .catch(err => console.error(err.response))
      }
    },
    likeReview({ commit, getters, dispatch }, reviewPk) {
      axios({
        url: drf.reviews.likeReview(reviewPk),
        method: 'post',
        headers: getters.authHeader
      })
        .then(res => {
          commit('SET_REVIEW', res.data)
          dispatch('fetchReviews')
        })
        .catch(err => console.error(err.response))
    },
    createComment({ commit, getters, dispatch }, { reviewPk, content }) {
      axios({
        url: drf.reviews.comments(reviewPk),
        method: 'post',
        data: { content },
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEW_COMMENTS', res.data)
          dispatch('fetchReviews')
        })
        .catch(err => console.error(err.response))
    },
    updateComment({ commit, getters, dispatch }, { reviewPk, commentPk, content }) {
      console.log(commentPk)
      axios({
        url: drf.reviews.comment( reviewPk, commentPk ),
        method: 'put',
        data: { content },
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEW_COMMENTS', res.data)
          dispatch('fetchReviews')
        })
        .catch(err => console.error(err.response))
    },
    deleteComment({ commit, getters, dispatch } , { reviewPk, commentPk }) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.reviews.comment( reviewPk, commentPk ),
          method: 'delete',
          headers: getters.authHeader,
        })
          .then(res => {
            commit('SET_REVIEW_COMMENTS', res.data)
            dispatch('fetchReviews')
          })
          .catch(err => console.error(err.response))
      }
    }
  },
}