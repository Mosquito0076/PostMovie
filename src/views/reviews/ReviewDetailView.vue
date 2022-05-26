<template>
  <div>
    <div class="d-flex row-2 my-5 mx-5">
      <div class="justify-content-center" style="width: 18rem;" id="reviewCard">
        <img :src="movie.posterPath" :alt="movie.title" width="120" id="moviePoster">
        <h5>
          <router-link :to="{ name: 'movie', params: { moviePk: movie.id ? movie.id : 0 } }" id="movietitle">
            {{ movie.title }}
          </router-link>
        </h5>
        <img :src="require(`@/assets/stars/${review.rank}.png`)" alt="rank" id="stars">
      </div>
      <br><br>
      <div id="reviewinfo">
        <h2>{{ review.title }}</h2>
        <hr>
        <p>
          작성자: 
          <router-link :to="{ name: 'profile', params: { username: reviewUser }}" id="username">
            {{ reviewUser }}
          </router-link>
        </p>
        <p>리뷰 점수: {{ review.rank }} 점</p>
        <p style="color:lightslategray">작성일: {{ date.day }} / {{ date.time }}</p>
        <br>
        <h5>
          <br>
          {{ review.content }}
          <br>
          <span :class="{ hidden : isUpdated }" class="updated" id="updated">
            (수정됨)
          </span>
        </h5>
        <br>
        <div v-if="isAuthor">
          <router-link :to="{ name: 'reviewEdit', params: { reviewPk } }">
            <button class="btn btn-primary">수정</button>
          </router-link>
          |
          <button class="btn btn-danger" @click="deleteReview(reviewPk)">삭제</button>
        </div>
      </div>
    </div>

    <div>
      <span>댓글: {{ review.comments ? review.comments.length : 0 }}  |  </span>
      좋아요:
      <i class="fa-solid fa-thumbs-up" @click="likeReview(reviewPk)" style="cursor:pointer;" :class="{ liked: likeCount ? review.like_users.filter(user => { return user.username === currentUser.username }).length : 0 }"></i>
      {{ likeCount }}
    </div>
    <hr>
    <comment-list :comments="review.comments"></comment-list>
    
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import CommentList from '@/components/reviews/CommentList'


  export default {
    name: 'ReviewDetailView',
    components: {
      CommentList,
    },
    data() {
      return {
        reviewPk: this.$route.params.reviewPk,
      }
    },
    computed: {
      ...mapGetters([
        'isAuthor',
        'review',
        'currentUser',
      ]),
      likeCount() {
        return this.review.like_users?.length
      },
      isUpdated() {
        return (this.review.updated_at === this.review.created_at)
      },
      movie() {
        return {
          posterPath: this.review.movie?.poster_path,
          title: this.review.movie?.title,
          id: this.review.movie?.id,
        }
      },
      date() {
        if (this.review.created_at) {
          return { day: this.review.created_at.slice(0,10), time: this.review.created_at.slice(11,19) }
        }
        return []
      },
      reviewUser() {
        if (this.review.user) {
          return this.review.user.username
        }
        return ' '
      }
    },
    methods: {
      ...mapActions([
        'fetchReview',
        'likeReview',
        'deleteReview',
      ]),
    },
    created() {
      this.fetchReview(this.reviewPk)
    },
  }
</script>

<style>
.updated {
  color:lightslategray;
}

.hidden {
  display: none;
}

.liked {
  color: blue;
}

#reviewinfo {
  text-align: left;
  margin-left: 270px;
  width: 400px;
}

#reviewCard {
  margin-left: 200px;
  
}

#moviePoster {
  width: 300px;
  border-radius: 1.5rem;
  margin-bottom: 20px;
}

#stars {
  width: 150px;
}

#movietitle {
  text-decoration: none;
  color:plum;
}

#username {
  text-decoration: none;
  color:plum;
}

#updated {
  font-size: small;
}
</style>