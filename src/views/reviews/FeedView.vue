<template>
  <div>
    <div>
      <p style="margin-top:20px;margin-bottom:150px;font-size:50px;">Feed</p>
      <div>
        <img src="../../assets/twitter.png" alt="" id="twit">
      </div>
    </div>
    <hr>
    <div v-for="review in reviewList.reviews" :key="review.pk" style="width:1000px;margin:auto;">
      <li class="d-flex justify-content-between">
        <div>
          <div class="d-flex justify-content-start align-items-end">
            <router-link
              :to="{ name: 'review', params: { reviewPk: review.pk } }"
              style="font-size:30px;text-decoration:none;color:white;margin-right:20px;"
            >
              {{ review.title.slice(0,10) }}<span v-if="review.title.length > 10">...</span>
            </router-link>
            <router-link :to="{ name: 'movie', params: { moviePk: review.movie.id } }" style="color:white;text-decoration:none;margin-bottom:5px;">
              {{ review.movie.title.slice(0, 10) }}<span v-if="review.title.length > 10">...</span>
            </router-link> 
          </div>
          <div class="d-flex justify-content-start">
            <router-link :to="{ name: 'profile', params: { username: review.user.username } }" style="color:white;text-decoration:none;">
              {{ review.user.username }} | 
            </router-link>
            <span>작성일: {{ review.created_at.slice(0,10) }} / {{ review.created_at.slice(11, 19) }}</span>
          </div>
        </div>
        <div class="d-flex row justify-content-end" style="width:150px">
          <img :src="require(`@/assets/stars/${review.rank}.png`)" alt="rank" style="height:25px;width:150px;margin-bottom:10px;">
          <div>
            <span style="margin-bottom:8px;">
              댓글: {{ review.comment_count }} | <i class="fa-solid fa-thumbs-up mx-1"></i> {{ review.like_count }}
            </span>
          </div>
        </div>
      </li>
      <hr>
    </div>
    <button class="btn btn-secondary" @click="handleLoadMore" style="background-color:unset; color:white">더보기</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'FeedView',
    data() {
      return {
        page: 1,
      }
    },
    computed: {
      ...mapGetters([
        'reviews',
        'currentUser',
      ]),
      reviewList() {
        if (this.currentUser?.followings) {
          const reviews = this.reviews.filter(review => { return this.currentUser.followings.includes(review.user.pk) })
          const total = reviews.length
          return { reviews: reviews.slice(0, this.page*10), total, }
        }
        return { reviews: this.reviews, total: 0, }
      },
      total() {
        return this.reviewList?.total
      },
    },
    methods: {
      handleLoadMore() {
        if (this.total > this.page*10) this.page++
        else alert('마지막 페이지입니다.')
      },
    }
  }
</script>

<style>
#twit {
  position: relative;
  top: -230px;
  left: 120px;
  width: 55px;
}
</style>