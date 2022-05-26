<template>
  <div>
    <div class="d-flex row-2 justify-content-around">
      <div id="profileImg"><img src="../../assets/astronaut.png" alt="profileImg"></div>
      <div class="mt-5">
        <h1>{{ profile.username }}</h1>
      </div>
      <br>
      <br>
      <div class="d-flex row-2 justify-content-center mt-5">
        <div class="me-3">
          <p>팔로우 </p>
          <p>{{ followingCount }}</p>
        </div>
        <div class="mx-3">
          <p>팔로워 </p>
          <p>{{ followerCount }}</p>
        </div>
      </div>
    </div>
    <br>
    <br>
    <br>
    <div class="d-flex row-4 justify-content-around mt-5 ms-5">
      <button v-if="currentUser.username !== profile.username" @click="followUser(profile.username)" class="btn btn-light" id="follow-btn">
        <span v-if="isFollowing">
          언팔로우
        </span>
        <span v-else>
          팔로우
        </span>
      </button>
      <div v-else></div>
      <!-- <button class="btn btn-light" id="wishlist" v-else style="visibility:none;">
        <router-link :to="{ name: 'myWishList' }" style="text-decoration:none;color:black;">위시리스트</router-link>
      </button> -->
      <br>
      <br>

      <div>
        <h2>작성한 글</h2><br>
        <ul class="list-group" id="writtenlist">
          <li class="list-group-item" v-for="review in profile.reviews" :key="review.pk" style="background-color:unset;">
            <router-link :to="{ name: 'review', params: { reviewPk: review.pk } }" id="written">
              {{ review.title }}
            </router-link>
          </li>
        </ul>
      </div>
      <div>

      <h2>좋아요 한 글</h2><br>
        <ul class="list-group" id="likeslist">
          <li class="list-group-item" v-for="review in profile.like_reviews" :key="review.pk" style="background-color:unset;">
            <router-link :to="{ name: 'review', params: { reviewPk: review.pk } }" id="likes">
              {{ review.title }}
            </router-link>
          </li>
        </ul>
      </div>

      <div>
        <h2>작성 댓글</h2><br>
        <ul class="list-group" id="commentlist">
          <li class="list-group-item" v-for="comment in profile.comments" :key="comment.pk" style="background-color:unset;">
            <router-link :to="{ name: 'review', params: { reviewPk: comment.review.pk } }" id="comments">
              {{ comment.content }}
            </router-link>
          </li>
        </ul>
      </div>
      <br>
    </div>
    <div v-if="currentUser.username === profile.username" style="margin-top:100px;">
      <h1>위시리스트</h1>
      <movie-list :movies="myWishList"></movie-list>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import MovieList from '@/components/movies/MovieList'

  export default {
    name: 'ProfileView',
    components: {
      MovieList,
    },
    computed: {
      ...mapGetters([
        'profile',
        'currentUser',
        'reviews',
        'movies',
      ]),
      isFollowing() {
        if (this.profile.followers) {
          return this.profile.followers.map(follower => {return follower.username}).includes(this.currentUser.username)
        }
        return false
      },
      username() {
        return this.$route.params.username
      },
      followingCount() {
        if (this.profile.followings) {
          return this.profile?.followings.length
        }
        return 0
      },
      followerCount() {
        if (this.profile.followers) {
          return this.profile?.followers.length
        }
        return 0
      },
      reviewList() {
        if (this.currentUser.followings) {
          return this.reviews.filter(review => { return this.currentUser.followings.includes(review.user.pk) })
        }
        return []
      },
      myWishList() {
        if (this.currentUser.wishlist) {
          return this.movies.filter(movie => { return this.currentUser.wishlist.includes(parseInt(movie.id)) })
        }
        return []
      },
    },
    methods: {
      ...mapActions([
        'fetchProfile',
        'followUser',
      ]),
    },
    created() {
      const payload = { username: this.$route.params.username }
      this.fetchProfile(payload)
    },
    watch: {
      username: function() {
      const payload = { username: this.$route.params.username }
      this.fetchProfile(payload)
      }
    },
  }
</script>

<style>
#profileImg {
  width: 30%;
  position: relative;
  left: 40px;
  top: 20px;
}

#wishlist, #follow-btn {
  height: 50px;
  position: relative;
  left: 150px;
  top: 40px;
}

#written {
  text-decoration: none;
  color: white;
}

#likes {
  text-decoration: none;
  color: white;
}

#comments {
  text-decoration: none;
  color: white;
}

.list-group-item {
  border-color:white;
}
</style>