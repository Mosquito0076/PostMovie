<template>
  <div>
    <div>
      <p style="margin-top:20px;margin-bottom:150px;font-size:50px;">Review</p>
      <div>
        <img src="../../assets/astronaut_flag.png" alt="" id="flag">
      </div>
    </div>
    <div class="d-flex justify-content-between my-5 px-5">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style="background-color:unset;">
          최신 순
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="#" @click="chooseOrder">최신 순</a></li>
          <li><a class="dropdown-item" href="#" @click="chooseOrder">오래된 순</a></li>
          <li><a class="dropdown-item" href="#" @click="chooseOrder">댓글 많은 순</a></li>
          <li><a class="dropdown-item" href="#" @click="chooseOrder">좋아요 많은 순</a></li>
        </ul>
      </div>
      <form action="" class="input-group mb-3" @submit.prevent="setQuestion" style="width:40%;">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="searchButton" style="color:white;">
          전체
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" @click="selectQuestion">전체</a></li>
          <li><a class="dropdown-item" href="#" @click="selectQuestion">제목</a></li>
          <li><a class="dropdown-item" href="#" @click="selectQuestion">내용</a></li>
          <li><a class="dropdown-item" href="#" @click="selectQuestion">작성자</a></li>
          <li><a class="dropdown-item" href="#" @click="selectQuestion">영화 제목</a></li>
        </ul>
        <input type="text" class="form-control" aria-label="Text input with dropdown button" style="background-color:unset; color:white">
        <button class="btn btn-primary target-button">검색</button>
      </form>
    </div>
    <br>
    <div v-if="reviewList.reviews.length" style="margin-top:20px;font-size:20px;">
      <p>총 {{ total }}개의 리뷰가 있습니다.</p>
    </div>
    <div v-else style="margin-top:20px;font-size:20px;">
      <p>찾으시는 리뷰가 없습니다.</p>
    </div>
    <hr>
    <ul>
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
              <router-link :to="{ name: 'profile', params: { username: review.user.username } }" style="color:plum;text-decoration:none;">
                {{ review.user.username }}
              </router-link> | 
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
    </ul>
    <button class="btn btn-secondary" @click="handleLoadMore" style="background-color:unset; color:white">더보기</button>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ReviewListView',
    data() {
      return {
        reviewOrder: '최신 순',
        searchOrder: '전체',
        question: '',
        page: 1,
      }
    },
    computed: {
      ...mapGetters([
        'reviews',
      ]),
      reviewList() {
        let reviewList = this.reviews.slice(0)
        if (this.reviewOrder === '최신 순') {
          reviewList.sort((a, b) => this.sortList(b.created_at, a.created_at))
        } else if (this.reviewOrder === '오래된 순') {
          reviewList.sort((a, b) => this.sortList(a.created_at, b.created_at))
        } else if (this.reviewOrder === '댓글 많은 순') {
          reviewList.sort((a, b) => this.sortList(b.comment_count, a.comment_count))
        } else if (this.reviewOrder === '좋아요 많은 순') {
          reviewList.sort((a, b) => this.sortList(b.like_count, a.like_count))
        }

        if (this.question !== '') {
          if (this.searchOrder === '전체') {
            reviewList = reviewList.filter(review => {
              return JSON.stringify(review).includes(this.question)
            })
          } else if (this.searchOrder === '제목') {
            reviewList = reviewList.filter(review => {
              return JSON.stringify(review.title).includes(this.question)
            })
          } else if (this.searchOrder === '내용') {
            reviewList = reviewList.filter(review => {
              return JSON.stringify(review.content).includes(this.question)
            })
          } else if (this.searchOrder === '작성자') {
            reviewList = reviewList.filter(review => {
              return JSON.stringify(review.user.username).includes(this.question)
            })
          } else if (this.searchOrder === '영화 제목') {
            reviewList = reviewList.filter(review => {
              return JSON.stringify(review.movie.title).includes(this.question)
            })
          }
        }
        const total = reviewList.length
        return { reviews: reviewList.slice(0, this.page*10), total,}
      },
      total() {
        return this.reviewList?.total
      },
    },
    methods: {
      sortList(a, b) {
        if (a > b) return 1
        else if (a < b) return -1
        else return 0
      },
      chooseOrder(event) {
        event.preventDefault()
        const button = document.querySelector('#dropdownMenuButton1')
        button.innerText = event.target.text
        this.reviewOrder = event.target.text
      },
      selectQuestion(event) {
        event.preventDefault()
        const button = document.querySelector('#searchButton')
        button.innerText = event.target.text
      },
      setQuestion(event) {
        this.question = event.target[1].value
        const button = document.querySelector('#searchButton')
        this.searchOrder = button.innerText.trim()
      },
      handleLoadMore() {
        if (this.total > this.page*10) this.page++
        else alert('마지막 페이지입니다.')
      },
    },
  }
</script>

<style>
#flag {
  position: relative;
  top: -235px;
  left: 145px;
  width: 60px;
}
</style>