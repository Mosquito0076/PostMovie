<template>
  <div>
    <p style="margin-top:20px;margin-bottom:50px;font-size:50px;">New Review</p>
    <review-form :review="review" action="create"></review-form>
  </div>
</template>

<script>
  import ReviewForm from '@/components/reviews/ReviewForm'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ReviewNewView',
    components: { 
      ReviewForm,
    },
    computed: {
      ...mapGetters([
        'movie',
      ]),
      review() {
        const review = {
          pk: null,
          title: '',
          content: '',
          rank: 0,
        }
        return review
      },
    },
  }
</script>

<style>

</style>