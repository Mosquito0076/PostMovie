<template>
  <div>
    <div class="d-flex row-2 my-5 mx-5">
      <div class="justify-content-center" style="width: 18rem;" id="movieCard">
        <img :src="movie.poster_path" class="card-img-top mb-3" :alt="movie.title" id="posterImg">
        <p id="zzim" v-if="isLoggedIn">
          찜하기: <i class="fa-solid fa-heart" style="cursor:pointer;" @click="toggleHeart" :class="{ isRed: isWished }"></i>
        </p>
        <div v-if="myReview.length">
          <router-link :to="{ name: 'review', params: { reviewPk: this.myReview[0].id } }">
            <button class="btn btn-primary" id="myreview">내 리뷰</button>
          </router-link>
        </div>
        <div v-else-if="isLoggedIn">
          <router-link :to="{ name: 'reviewNew' }">
            <button class="btn btn-primary" id="createReview">리뷰 작성</button>
          </router-link>
        </div>
      </div>
      <div id="info">
        <h4>{{movie.title}}</h4><hr>
        <p>장르 : 
          <span v-for="genre in movie.genres" :key="`${movie.id}-${genre.pk}`">
            {{ genre.name }},
          </span>
        </p>
        <p>개봉일 : {{movie.release_date}}</p>
        <p>평점 : {{movie.vote_average}}</p>
        <br>
        <p>줄거리</p>
        <p>{{ movie.overview }}</p>
      </div>
    </div>
    <hr>
    <div class="container justify-content-center" id="reviewlist">
      <ul class="list-group">
        <li class="list-group-item" v-for="review in movieReviews" :key="`${movie.title}-${review.id}`">
          <div style="width:33%;">
            <img :src="require(`@/assets/stars/${review.rank}.png`)" alt="rank" style="width:100px;">
          </div>
          <span style="color:white;width:33%;">제목: 
            <router-link :to="{ name: 'review', params: { reviewPk: review.id } }" id="reviewTitle">{{ review.title }}</router-link> | 
          </span>
          <span style="color:white;width:33%;">작성자: 
            <router-link :to="{ name: 'profile', params: { username: review.user.username } }" id="reviewUser">{{ review.user.username }}</router-link>
          </span>
        </li>
      </ul>
    </div>
    <div>
      <img src="../../assets/stargazing2.png" alt="scope" id="scope">
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'MovieDetailView',
    data() {
      return {
        moviePk: this.$route.params.moviePk
      }
    },
    computed: {
      ...mapGetters([
        'movie',
        'currentUser',
        'isLoggedIn',
      ]),
      movieReviews() {
        return this.movie.reviews
      },
      myReview() {
        if (this.movieReviews) {
          return this.movieReviews?.filter(review => { return review.user.username === this.currentUser.username })
        }
        return []
      },
      isWished() {
        if (this.currentUser.username) {
          return this.currentUser.wishlist.includes(this.movie.id)
        }
        return false
      }
    },
    methods: {
      ...mapActions([
        'fetchMovie',
        'myWishList',
      ]),
        toggleHeart(event) {
        event.target.classList.toggle('isRed')
        this.myWishList(this.movie.id)
      },
    },
    created() {
      this.fetchMovie(this.moviePk)
    },
  }
</script>

<style>
.isRed {
  color: red;
}

#movieCard {
  background-color: unset;
  border-radius: 1.5rem;
}

#posterImg {
  width: 300px;
  margin-left: 200px;
  border-radius: 1.5rem;
}

#zzim {
  margin-left: 200px;
}

#info {
  text-align: left;
  margin-left: 400px;
}

#myreview {
  margin-left: 200px;
}

#createReview {
  margin-left: 200px;
  width: 160px;
}

#reviewlist {
  width: 800px;
}

#reviewTitle {
  text-decoration: none;
  color:plum;
}

#reviewUser {
  text-decoration: none;
  color:plum;
}

.list-group-item{
  background-color: unset;
}

#scope {
  position:absolute;
  top: 280px;
  right: 370px;
  width: 130px;
}
</style>