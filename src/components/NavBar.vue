<template>
  <nav class="d-flex justify-content-between position-fixed px-4">
    <div class="d-flex align-items-center">
      <router-link :to="{ name: 'mainMovies' }"><img src="@/assets/PostMovie.png" alt="PostMovie" id="logo"></router-link>
    </div>
    <div class="d-flex align-items-center">
      <router-link :to="{ name: 'mainMovies' }" class="px-3 py-2">Home</router-link>
      <router-link :to="{ name: 'movies' }" class="px-3 py-2">Movie</router-link>
      <router-link :to="{ name: 'reviews' }" class="px-3 py-2">Review</router-link>
      <router-link v-if="!isLoggedIn" :to="{ name: 'login' }" class="px-3 py-2">Login</router-link>
      <router-link v-if="!isLoggedIn" :to="{ name: 'signup' }" class="px-3 py-2">Signup</router-link>
      <router-link v-if="isLoggedIn" :to="{ name: 'feed' }" class="px-3 py-2">Feed</router-link>
      <router-link v-if="isLoggedIn" :to="{ name: 'profile', params: { username } }" class="px-3 py-2">My Profile</router-link>
      <router-link v-if="isLoggedIn" :to="{ name: 'logout' }" class="px-3 py-2">Logout</router-link>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'NavBar',
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'currentUser',
      ]),
      username() {
        return this.currentUser.username ? this.currentUser.username : 'guest'
      }
    },
  }
</script>

<style>
nav {
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 3;
  background-color: rgb(0, 0, 37);
}

nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: plum;
}

#logo {
  height: 60px;
  width: 250px;
}
</style>