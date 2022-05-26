<template>
  <div>
    <div class="d-flex justify-content-center my-2 mx-2 border-dark" @mouseenter="toggleBody" @mouseleave="toggleBody">
      <div class="card border-0" style="width:200px;height:300px;">
        <img :src="movie.poster_path" class="card-img-top" :alt="movie.title">
        <div class="main-card hidden-item">
          <div class="position-absolute" style="top:0;width:100%;height:70%;cursor: pointer;" @click="movieDetail"></div>
          <div class="card-body position-absolute">
            <p class="my-0">
              <router-link :to="{ name: 'movie', params: { moviePk: movie.id } }" class="card-title my-0">
                {{ movie.title }}
              </router-link>
            </p>
            <p class="year">{{ movie.release_date.slice(0, 4) }}</p>
          </div>
            <div v-if="isLoggedIn" class="heart">
              <i class="fa-solid fa-heart" style="cursor:pointer;" @click="toggleHeart" :class="{ isRed: currentUser.wishlist ? currentUser.wishlist.includes(movie.id) : 0 }"></i>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'MovieCard',
    props: {
      movie: Object,
    },
    computed: {
      ...mapGetters([
        'currentUser',
        'isLoggedIn',
      ]),
    },
    methods: {
      ...mapActions([
        'myWishList',
      ]),
      toggleHeart(event) {
        event.target.classList.toggle('isRed')
        this.myWishList(this.movie.id)
      },
      toggleBody(event) {
        event.target.childNodes[0].childNodes[1].classList.toggle('hidden-item')
      },
      movieDetail() {
        this.$router.push({ name: 'movie', params: {moviePk: this.movie.id} })
      },
    },
  }
</script>

<style>
img {
  width: 200px;
  top: 0;
  bottom: 0;
}

.card-body {
  background-color: black;
  opacity: 80%;
  color: white;
  width: 100%;
  height: 30%;
  font-size: 100%;
  bottom: 0;
  white-space: normal;
}

.card-title {
  text-decoration: none;
  color: white;
  font-size: 100%;
}

.heart {
  position: absolute;
  bottom: 3%;
  right: 5%;
}

.hidden-item {
  display: none;
}

.isRed {
  color: red;
}

.main-card {
  height: 100%;
}

.year {
  font-size: small;
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, +50%);
}


</style>