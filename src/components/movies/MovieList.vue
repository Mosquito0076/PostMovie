<template>
  <div class="d-flex cardList">
    <movie-card
      v-for="movie in movies"
      :key="movie.pk"
      :movie="movie"
    ></movie-card>
  </div>
</template>

<script>
  import MovieCard from './MovieCard'
  
  export default {
    name: 'MovieList',
    components: { 
      MovieCard,
    },
    props: {
      movies: Array,
    },
  }
</script>

<style>
.cardList  {
  width: auto;
  overflow-x: scroll;
  white-space: nowrap;
  margin-left: 100px;
  margin-right: 100px;
}

.cardList::-webkit-scrollbar {
  height: 15px;
}
.cardList::-webkit-scrollbar-thumb {
  background-color: rgb(147, 76, 156);
  border-radius: 20px;
  background-clip: padding-box;
  border: 4px solid transparent;
}

.cardList::-webkit-scrollbar-track {
  background-color: rgba(112, 112, 112, 0.4);
  border-radius: 20px;
  /* box-shadow: inset 0px 0px 5px white; */
}
</style>