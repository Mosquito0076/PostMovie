<template>
  <div>
    <div class="comment-list-item d-flex justify-content-between">
      <div class="d-flex justify-content-start row">
        <div v-if="!isEditing">
          <div style="font-size:13px;">
            <router-link :to="{ name: 'profile', params: { username: comment.user.username} }" style="text-decoration:none;color:plum;">
              {{ comment.user.username }}
            </router-link>
            <span style="color:lightslategray;">{{ comment.created_at.slice(5,7) }}/{{ comment.created_at.slice(8,10) }} {{ comment.created_at.slice(11, 16) }}</span>
          </div>
          <span style="font-size:17px;" class="d-flex justify-content-start">
          {{ payload.content }}
            <span :class="{ hidden : isUpdated }" class="updated my-auto" style="font-size:14px;">
              (수정됨)
            </span>
          </span>
        </div>
        <div v-else class="d-flex justify-content-between">
          <div>
            <input type="text" v-model="payload.content" maxlength="200" style="width:300px;">
          </div>
          <div></div>
          <div class="d-flex justify-content-end align-items-center" style="margin-left:550px;">
            <button @click="onUpdate" class="btn btn-primary mx-1">작성</button> | 
            <button @click="switchIsEditing" class="btn btn-danger mx-1">취소</button>
          </div>
        </div>
      </div>
  
      <div>
        <span v-if="currentUser.username === comment.user.username && !isEditing">
          <button @click="switchIsEditing" class="btn btn-primary">수정</button> | 
          <button @click="deleteComment(payload)" class="btn btn-danger">삭제</button>
        </span>
      </div>
      
    </div>
    <hr>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  
  export default {
    name: 'CommentListItem',
    props: {
      comment: Object,
    },
    data() {
      return {
        isEditing: false,
        payload: {
          reviewPk: this.comment?.review,
          commentPk: this.comment?.pk,
          content: this.comment?.content,
        },
      }
    },
    computed: {
      ...mapGetters([
        'currentUser',
      ]),
      isUpdated() {
        return (this.comment.created_at === this.comment.updated_at)
      },
    },
    methods: {
      ...mapActions([
        'updateComment',
        'deleteComment',
      ]),
      switchIsEditing() {
        this.isEditing = !this.isEditing
      },
      onUpdate() {
        this.updateComment(this.payload)
        this.isEditing = false
      },
    },
  }
</script>

<style>

</style>