<template>
<div class="vh-100 gradient-custom">
  <div class="container py-5 h-150 YESGothic-Bold">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="login-body p-5 text-center" style="border-radius: 1rem;">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <account-error-list v-if="authError"></account-error-list>
              <p class="text-white-50 mb-5">Please enter your ID and password!</p>

              <form @submit.prevent="login(credentials)">
                <div class="form-outline form-white mb-4">
                  <input v-model="credentials.username" type="text" placeholder="ID">
                </div>
                <div class="form-outline form-white mb-4">
                  <input v-model="credentials.password" type="password" placeholder="password">
                </div><br>
                <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
              </form>
            </div>

            <div>
              <p class="mb-0">Don't have an account?</p>
              <p><router-link :to="{ name: 'signup'}" id="signupLink"> SignUp</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AccountErrorList from '@/components/accounts/AccountErrorList'

  export default {
    name: 'LoginView',
    components: {
      AccountErrorList,
    },
    data() {
      return {
        credentials: {
          username: '',
          password: '',
        }
      }
    },
    computed: {
      ...mapGetters([
        'authError',
      ]),
    },
    methods: {
      ...mapActions([
        'login',
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

#signupLink {
  text-decoration: none;
  color: gray;
  font-weight: bold;
}

.login-body{
  background-color: black;
}
</style>