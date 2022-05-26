<template>
  <form @submit.prevent="onSubmit">
    <label for="comment" class="mx-3">comment: </label>
    <input type="text" id="comment" required v-model="content" maxlength="200" style="width:300px;margin-right:20px;">
    <button class="btn btn-primary">작성</button>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  
  export default {
    name: 'CommentListForm',
    data() {
      return {
        content: '',
      }
    },
    computed: {
      ...mapGetters([
        'review',
      ]),
    },
    methods: {
      ...mapActions([
        'createComment',
      ]),
      onSubmit() {
        this.createComment({ reviewPk: this.review.pk, content: this.content, })
        this.content = ''
      }
    },
  }
</script>

<style>
</style>