<template>
    <div class="movie-detail">
    <h1>Detalles de la Película <small>(ID: {{ movieId }})</small></h1>
    <div v-if="store.selectedMovie">
      <div class="movie-poster d-middle">
        <img :src="store.selectedMovie.Poster" alt="Movie Poster" />
      </div>
      <div class="movie-info">
        <h1>{{ store.selectedMovie.Title }}</h1>
        <p><strong>Año:</strong> {{ store.selectedMovie.Year }}</p>
        <p><strong>Clasificación:</strong> {{ store.selectedMovie.Rated }}</p>
        <p><strong>Fecha de Estreno:</strong> {{ store.selectedMovie.Released }}</p>
        <p><strong>Duración:</strong> {{ store.selectedMovie.Runtime }}</p>
        <p><strong>Género:</strong> {{ store.selectedMovie.Genre }}</p>
        <p><strong>Director:</strong> {{ store.selectedMovie.Director }}</p>
        <p><strong>Escritores:</strong> {{ store.selectedMovie.Writer }}</p>
        <p><strong>Actores:</strong> {{ store.selectedMovie.Actors }}</p>
        <p><strong>Idioma:</strong> {{ store.selectedMovie.Language }}</p>
        <p><strong>País:</strong> {{ store.selectedMovie.Country }}</p>
        <p><strong>Premios:</strong> {{ store.selectedMovie.Awards }}</p>
        <p><strong>Sinopsis:</strong> {{ store.selectedMovie.Plot }}</p>
        <p><strong>Calificación IMDB:</strong> {{ store.selectedMovie.imdbRating }} ({{ store.selectedMovie.imdbVotes }} votos)</p>
        <p><strong>Metascore:</strong> {{ store.selectedMovie.Metascore }}</p>
        <p><strong>Box Office:</strong> {{ store.selectedMovie.BoxOffice }}</p>
        <p v-if="store.selectedMovie.Website"><strong>Sitio Web:</strong> <a :href="store.selectedMovie.Website" target="_blank">{{ store.selectedMovie.Website }}</a></p>
      </div>
      <button @click="goBack" class="back-button">Volver a la lista de películas</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useMoviesStore } from "@/store/movies.store"

const route = useRoute()
const movieId = route.params.id as string
const router = useRouter();
const store = useMoviesStore()
onMounted(() => {
    console.log('Details mounted')
    fetchMovieId(movieId)
})

async function fetchMovieId(movieId) {
    await store.fetchMovieById(movieId)
}

const goBack = () => {
      router.push('/'); 
    };

</script>

<style lang="scss" scoped>
.movie-detail {
    color: $white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.movie-poster {
    margin-bottom: 20px;
}

.movie-poster img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

.movie-info {
    max-width: 800px;
    width: 100%;
}

.movie-info h1 {
    font-size: 2em;
    margin-bottom: 10px;
}

.movie-info p {
    margin: 5px 0;
}

.movie-info strong {
    font-weight: bold;
}

.movie-info a {
    color: $primary;
    text-decoration: none;
}

.movie-info a:hover {
    text-decoration: underline;
}
.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: $white;
  background-color: $primary;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: $success;
}
</style>