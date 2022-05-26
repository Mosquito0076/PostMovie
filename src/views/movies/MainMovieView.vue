<template>
  <div>
    <div style="height:250px;">
    
    </div>
    <p class="animationTarget">어서오세요!</p>
    <p class="animationTarget">PostMovie 입니다.</p>
    <div v-if="recommendCount">
      <b>'{{ lastReview.title }}'을 보신 분들은 이런 영화도 봤어요!</b>
      <movie-list :movies="recommendedMovie" class="my-5"></movie-list>
    </div>
    <b>최신 상영작</b>
    <movie-list :movies="recentMovie" class="my-5"></movie-list>
    <b>최근 인기 있는 작품들</b>
    <movie-list :movies="recentBestMovie" class="my-5"></movie-list>
    <b>{{ recommendationTitle }}</b>
    <movie-list :movies="weatherMovie" class="my-5"></movie-list>
  </div>
</template>

<script>
  import _ from 'lodash'
  import anime from 'animejs/lib/anime.es.js'
  import MovieList from '@/components/movies/MovieList'
  import { mapGetters } from 'vuex'


  export default {
    name: 'MainMovieView',
    components: {
      MovieList,
    },
    computed: {
      ...mapGetters([
        'movies',
        'weather',
        'currentUser',
        'recommendedMovie',
      ]),
      recommendations() {
        if (this.currentUser.username) {
          const { reviewedMovie, wishlist } = this.currentUser
          const myMovies = [ ...reviewedMovie, ...wishlist]
          return this.movies.filter(movie => { return !myMovies.includes(movie.id) })
        }
        else return this.movies
      },
      recentMovie() {
        const movies = this.recommendations.slice(0).sort((a, b) => {
          if (a.release_date < b.release_date) return 1
          if (a.release_date > b.release_date) return -1
          return 0
        }).slice(0, 10)
        return movies
      },
      recentBestMovie() {
        const movies = this.recommendations.slice(0).sort((a, b) => {
          if (a.popularity < b.popularity) return 1
          if (a.popularity > b.popularity) return -1
          return 0
        }).slice(0, 10)
        return movies
      },
      weatherMovie() {
        const idx = () => {
          if (this.weather === 'Clear') return 0
          else if (this.weather === 'Rain') return 1
          else if (this.weather === 'Snow') return 2
          else if (this.weather === 'Clouds') return 3
          else return 3
        }
        const genreList = [
          [12, 14],
          [27],
          [10749],
          [10402, 10751],
          [35],
        ]
        const movies = this.recommendations.slice(0)
        return _.sampleSize(movies.filter(movie => {return movie.genres.filter(genre => {return genreList[idx()].includes(genre.pk)}).length > 0}), 10)
      },
      recommendationTitle() {
        if (this.weather === 'Clear') return '화창한 날이네요! 저희와 함께 여행을 떠나요!'
        else if (this.weather === 'Rain') return '비가 떨어진다고 해서, 심장도 떨어뜨리시면 안 돼요!'
        else if (this.weather === 'Snow') return '오늘 같이 눈이 오는 날에, 로맨스는 어떠세요?'
        else if (this.weather === 'Clouds') return '오늘 같이 흐린 날에 추천드리는 감성적인 영화들!'
        else return '저희와 함께 신나게 웃어봐요!'
      },
      lastReview() {
        if (this.currentUser.reviewedMovie && this.movies) {
          return this.movies.filter(movie => { return movie.id === this.currentUser.reviewedMovie[this.currentUser.reviewedMovie.length-1]})[0]
        }
        return 0
      },
      recommendCount() {
        if (this.recommendedMovie) {
          return this.recommendedMovie.length
        }
        return 0
      },
    },
    methods: {
      moving() {
        anime({
          targets: '.animationTarget',
          opacity: ['0', '1'],
          translateY: '-150px',
          duration: 5000
        })
      },
    },
    created() {
      setTimeout(this.moving, 0)
    }
  }
</script>

<style>
b {
  font-size: 30px;
}

.animationTarget {
  font-size: 80px;
}

</style>