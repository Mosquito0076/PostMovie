<template>
<div class="vh-100 gradient-custom">
  <div class="container py-5 h-150 YESGothic-Bold">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="signup-body p-5 text-center" style="border-radius: 1rem;">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Sign Up</h2>
              <account-error-list v-if="authError"></account-error-list>
              <p class="text-white-50 mb-5">Please enter your informations!</p>

              <form @submit.prevent="signup(credentials)">
                <div class="form-outline form-white mb-4">
                  <input v-model="credentials.username" type="text" id="username" placeholder="Id" style="color:black;">
                </div>
                <div class="form-outline form-white mb-4">
                  <input v-model="credentials.password1" type="password" id="password1" placeholder="Password">
                </div>
                <div class="form-outline form-white mb-4">
                  <input v-model="credentials.password2" type="password" id="password2" placeholder="Password Confirmation">
                </div><br>
                <button class="btn btn-outline-light btn-lg px-5" type="submit">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import AccountErrorList from '@/components/accounts/AccountErrorList'
  import { mapActions, mapGetters } from 'vuex'


  export default {
    name: 'SignupView',
    components: {
      AccountErrorList,
    },
    data() {
      return {
        credentials: {
          username: '',
          password1: '',
          password2: '',
        },
      }
    },
    computed: {
      ...mapGetters([
        'authError',
      ]),
    },
    methods: {
      ...mapActions([
        'signup',
      ]),
    },
  }
</script>

<style>

@font-face {
    font-family: 'YESGothic-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/YESGothic-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.YESGothic-Bold * {
  font-family: 'YESGothic-Bold';
}

.signup-body{
  background-color: black;
}
</style>