import drf from "@/api/drf"
import axios from "axios"
import router from "@/router"
import _ from 'lodash'

export default {

  state: {
    movies: [],
    movie: {},
    weather: '',
    recommendedPk: [],
    recommendedMovie: [],
  },
  getters: {
    movies: state => state.movies,
    movie: state => state.movie,
    weather: state => state.weather,
    recommendedPk: state => state.recommendedPk,
    recommendedMovie: state => _.sampleSize(state.movies.filter(movie => { return state.recommendedPk.includes(movie.id) }), 10)
  },
  mutations: { 
    LOAD_MOVIES: (state, movies) => state.movies = movies,
    LOAD_WEATHER: (state, weather) => state.weather = weather,
    SET_MOVIE: (state, movie) => state.movie = movie,
    GET_RECOMMENDATION: (state, recommendation) => state.recommendedPk = recommendation,
    DELETE_RECOMMENDATION: state => state.recommendedPk = [],
  },
  actions: {
    loadMovies({ commit }) {
      axios({
        url: drf.movies.movies(),
        method: 'get',
      })
        .then(res => commit('LOAD_MOVIES', res.data))
        .catch(err => console.error(err.response))
    },
    loadWeather({ commit }) {
      const API_KEY = "ee3dab24cb5cb56a9a5f76f1764845ad"
      navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
      
      function onGeoOk(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        axios({
          url,
          method: 'get',
        })
          .then(res => commit('LOAD_WEATHER', res.data.weather[0].main))
          .catch(err => console.error(err.response))
      }
      function onGeoError() {
        commit('LOAD_WEATHER', 'Fail')
      }
    },
    fetchMovie({ commit }, moviePk) {
      axios({
        url: drf.movies.movie(moviePk),
        method: 'get'
      })
        .then(res => commit('SET_MOVIE', res.data))
        .catch(err => {
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },
    getRecommendation({ commit, getters }, moviePk) {
      axios({
        url: drf.movies.recommend(moviePk),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          const myMovies = [ ...getters.currentUser.reviewedMovie,...getters.currentUser.wishlist ]
          commit('GET_RECOMMENDATION', res.data.recommended.filter(movie => { return !myMovies.includes(movie) }))
        })
        .catch(err => console.error(err))
    },
    deleteRecommendation({ commit }) {
      commit('DELETE_RECOMMENDATION')
    }
  },
}
