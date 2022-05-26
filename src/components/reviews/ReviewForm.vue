<template>
  <div>
    <div class="star-input"> 
      <p class="score">
        <b>{{ newReview.rank }}</b>점
      </p>
      <span class="input">
        <input type="radio" name="star-input" value="1" id="p1" @click="changeRank">
        <label for="p1">1</label>
        <input type="radio" name="star-input" value="0.5" id="p1_2" @click="changeRank">
        <label for="p1_2">0.5</label>
        <input type="radio" name="star-input" value="2" id="p2" @click="changeRank">
        <label for="p2">2</label>
        <input type="radio" name="star-input" value="1.5" id="p2_2" @click="changeRank">
        <label for="p2_2">1.5</label>
        <input type="radio" name="star-input" value="3" id="p3" @click="changeRank">
        <label for="p3">3</label>
        <input type="radio" name="star-input" value="2.5" id="p3_2" @click="changeRank">
        <label for="p3_2">2.5</label>
        <input type="radio" name="star-input" value="4" id="p4" @click="changeRank">
        <label for="p4">4</label>
        <input type="radio" name="star-input" value="3.5" id="p4_2" @click="changeRank">
        <label for="p4_2">3.5</label>
        <input type="radio" name="star-input" value="5" id="p5" @click="changeRank">
        <label for="p5">5</label>
        <input type="radio" name="star-input" value="4.5" id="p5_2" @click="changeRank">
        <label for="p5_2">4.5</label>
      </span>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="my-4">
        <label for="title" style="margin-right:10px;">제목: </label>
        <input v-model="newReview.title" type="text" id="title" style="width:500px;">
      </div>
      <div class="d-flex align-items-start justify-content-center my-4">
        <label for="content" style="margin-right:10px;">내용: </label>
        <textarea v-model="newReview.content" type="text" id="content" cols="51" rows="10"></textarea>
      </div>
      <div>
        <button class="btn btn-primary">{{ action==='create'? '작성':'수정' }}</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  
  export default {
    name: 'ReviewForm',
    props: {
      review: Object,
      action: String,
    },
    data() {
      return {
        newReview: {
          title: this.review.title,
          content: this.review.content,
          rank: this.review.rank,
        },
      }
    },
    methods: {
      ...mapActions([
        'createReview',
        'updateReview',
      ]),
      onSubmit() {
        if (this.newReview.rank) {
          if (this.action === 'create') {
            this.createReview(this.newReview)
          } else if (this.action === 'update') {
            const payload = {
              pk: this.review.pk,
              ...this.newReview,
            }
            this.updateReview(payload)
          }
        }
      },
      changeRank(event) {
        this.newReview.rank = parseFloat(event.target.value)
      },
      setRank() {
        if (this.newReview.rank) {
          const first = parseInt(this.newReview.rank+0.5)
          const second = (this.newReview.rank === first) ? '':'_2'
          const target = document.querySelector(`#p${first}${second}`)
          target.checked = true;
        }
      }
    },
    created() {
      setTimeout(this.setRank, 0)
    }
  }
</script>

<style>

</style>