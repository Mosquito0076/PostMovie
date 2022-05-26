<template>
  <div>
    <div>
      <p style="margin-top:20px;margin-bottom:150px;font-size:50px;">Movie</p>
      <div>
      <img src="../../assets/video-camera.png" alt="" id="camera">
      </div>
    </div>
    <div class="d-flex justify-content-between my-5 px-5">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style="background-color:unset;">
          최신 개봉 순
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="#" @click="chooseOrder">최신 개봉 순</a></li>
          <li><a class="dropdown-item" href="#" @click="chooseOrder">오래된 순</a></li>
          <li><a class="dropdown-item" href="#" @click="chooseOrder">최신 인기 순</a></li>
          <li><a class="dropdown-item" href="#" @click="chooseOrder">평론가 평점 순</a></li>
          <li><a class="dropdown-item" href="#" @click="chooseOrder">유저 평점 순</a></li>
        </ul>
      </div>
      <form action="" class="input-group mb-3" @submit.prevent="setQuestion" style="width:40%;">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="searchButton" style="color:white;">
          전체
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" @click="selectQuestion">전체</a></li>
          <li><a class="dropdown-item" href="#" @click="selectQuestion">영화 제목</a></li>
          <li><a class="dropdown-item" href="#" @click="selectQuestion">영화 줄거리</a></li>
          <li><a class="dropdown-item" href="#" @click="selectQuestion">장르</a></li>
        </ul>
        <input type="text" class="form-control" aria-label="Text input with dropdown button" style="background-color:unset; color:white;">
        <button class="btn btn-primary target-button">검색</button>
      </form>
    </div>
    <br>
    
    <div v-if="movieList.movies.length" style="margin-top:20px;font-size:20px;">
      <p>총 {{ total }}개의 영화가 있습니다.</p>
    </div>
    <div v-else style="margin-top:20px;font-size:20px;">
      <p>찾으시는 영화가 없습니다.</p>
    </div>
    <hr>
    <div v-for="movie in movieList.movies" :key="movie.id" style="width:1000px;margin:auto;" >
      <div class="d-flex row-3">
        <img :src="movie.poster_path" :alt="movie.title" style="width:150px;border-radius:15px;margin-right:50px;margin-left:50px;cursor:pointer;" @click="$router.push({ name: 'movie', params: {moviePk: movie.id} })">
        <div style="width:500px;" class="my-auto">
          <router-link :to="{ name: 'movie', params: { moviePk: movie.id } }" style="color:white;text-decoration:none;font-size:30px;">
            {{ movie.title }}
          </router-link>
          <p class="my-3">개봉일: {{ movie.release_date }}</p>
          <p style="font-size:20px;"> 평론가 평점: {{ movie.vote_average }}</p>
          <p style="font-size:20px;margin-bottom:0;"> 유저 평점: {{ parseInt(movie.rate_average*10)/10 }}</p>
          <br>
        </div>
        <div style="width:200px" class="d-flex row">
          <p>장르: {{ movie.genres.map(genre => { return genre.name }).join(', ') }}</p>
          <span>{{ movie.overview.slice(0, 50) }}...</span>
          <div v-if="isLoggedIn" >
            찜하기: <i class="fa-solid fa-heart" style="cursor:pointer;" @click="toggleHeart" :class="{ isRed: currentUser.wishlist.includes(movie.id) }" :id="movie.id"></i>
          </div>
        </div>
      </div>
      <hr>
    </div>
    <button class="btn btn-secondary" @click="handleLoadMore" style="background-color:unset; color:white">더보기</button>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  
  export default {
    name: 'MovieView',
    data() {
      return {
        movieOrder: '최신 개봉 순',
        searchOrder: '전체',
        question: '',
        page: 1,
      }
    },
    computed: {
      ...mapGetters([
        'movies',
        'currentUser',
        'isLoggedIn',
      ]),
      movieList() {
        let movieList = this.movies.slice(0)
        if (this.movieOrder === '최신 개봉 순') {
          movieList.sort((a, b) => this.sortList(b.release_date, a.release_date))
        } else if (this.movieOrder === '오래된 순') {
          movieList.sort((a, b) => this.sortList(a.release_date, b.release_date))
        } else if (this.movieOrder === '최신 인기 순') {
          movieList.sort((a, b) => this.sortList(b.popularity, a.popularity))
        } else if (this.movieOrder === '평론가 평점 순') {
          movieList.sort((a, b) => this.sortList(b.vote_average, a.vote_average))
        } else if (this.movieOrder === '유저 평점 순') {
          movieList.sort((a, b) => this.sortList(b.rate_average, a.rate_average))
        }

        if (this.question !== '') {
          if (this.searchOrder === '전체') {
            movieList = movieList.filter(movie => {
              return JSON.stringify(movie).includes(this.question)
            })
          } else if (this.searchOrder === '영화 제목') {
            movieList = movieList.filter(movie => {
              return JSON.stringify(movie.title).includes(this.question)
            })
          } else if (this.searchOrder === '영화 줄거리') {
            movieList = movieList.filter(movie => {
              return JSON.stringify(movie.overview).includes(this.question)
            })
          } else if (this.searchOrder === '장르') {
            movieList = movieList.filter(movie => {
              return JSON.stringify(movie.genres).includes(this.question)
            })
          }
        }
        const total = movieList.length
        return { movies: movieList.slice(0, this.page*10), total,}
      },
      total() {
        return this.movieList?.total
      },
    },
    methods: {
      ...mapActions([
        'myWishList',
      ]),
      sortList(a, b) {
        if (a > b) return 1
        else if (a < b) return -1
        else return 0
      },
      chooseOrder(event) {
        event.preventDefault()
        const button = document.querySelector('#dropdownMenuButton1')
        button.innerText = event.target.text
        this.movieOrder = event.target.text
      },
      selectQuestion(event) {
        event.preventDefault()
        const button = document.querySelector('#searchButton')
        button.innerText = event.target.text
      },
      setQuestion(event) {
        this.page = 1
        this.question = event.target[1].value
        const button = document.querySelector('#searchButton')
        this.searchOrder = button.innerText.trim()
      },
      toggleHeart(event) {
        event.target.classList.toggle('isRed')
        this.myWishList(event.target.id)
      },
      handleLoadMore() {
        if (this.total > this.page*10) this.page++
        else alert('마지막 페이지입니다.')
      },
    }
  }
</script>

<style>
.input-group {
  width: 30%;
}

.isRed {
  color: red;
}

#camera {
  position: relative;
  top: -220px;
  left: 130px;
  width: 60px;
}
</style>