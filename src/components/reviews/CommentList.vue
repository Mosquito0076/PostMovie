<template>
  <div class="comment-list d-flex row justify-content-center mx-auto" style="width:1000px;">
    <div>
      <comment-list-item
        v-for="comment in comments"
        :key="comment.pk"
        :comment="comment"
        style="width:1000px;"
      ></comment-list-item>
    </div>
    <comment-list-form class="mx-auto"></comment-list-form>
  </div>
</template>

<script>
  import CommentListItem from '@/components/reviews/CommentListItem'
  import CommentListForm from '@/components/reviews/CommentListForm'


  export default {
    name: 'CommentList',
    components: {
      CommentListItem,
      CommentListForm,
    },
    props: {
      comments: Array,
    },
  }
</script>

<style>
</style>