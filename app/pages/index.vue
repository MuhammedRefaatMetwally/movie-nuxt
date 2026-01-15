<template>
  <v-container>
    <p class="text-h4 mt-16 mb-6">Feature Today</p>
  </v-container>
</template>

<script setup lang="ts">
async function searchMovies() {
  try {
    const movies = $fetch(
      `https://api.themoviedb.org/3/search/movie?page=${page.value}&query=${searchString.value}&api_keys=${runtimeConfig.public.apiKey}`
    );
  } catch (error) {
    console.log(error);
  }
}
</script>
