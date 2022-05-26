<template>
  <div>
    <p style="margin-top:20px;margin-bottom:50px;font-size:50px;">Edit Review</p>
    <review-form v-if="isReview" :review="review" action="update"></review-form>
  </div>
</template>

<script>
  import ReviewForm from '@/components/reviews/ReviewForm'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ReviewEditView',
    components: { 
      ReviewForm,
    },
    computed: {
      ...mapGetters([
        'review',
        'isReview',
      ]),
    },
    methods: {
      ...mapActions([
        'fetchReview',
      ]),
    },
    created() {
      this.fetchReview(this.$route.params.reviewPk)
    },
  }
</script>

<style>

</style>