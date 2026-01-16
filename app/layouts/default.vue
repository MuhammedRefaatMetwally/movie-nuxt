<template>
  <v-app id="inspire">
    <v-app-bar height="56" color="#111827" class="px-4" flat>
      <v-container class="d-flex">
        <v-icon class="mt-2" size="40">mdi-movie-open-play</v-icon>

        <p class="text-h5 m-3">Movie App</p>
        
        <v-row class="mt-2">
          <v-spacer></v-spacer>

          <div v-if="movieStore.loading">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-row v-else class="mt-1">
            <p class="mt-2 text-h6">
              Total Movies: {{ movieStore.movies.length }}
            </p>
            <v-spacer></v-spacer>
            <p class="mt-2 text-h6">
              Average Rating: {{ movieStore.averageRatingNumber }}
            </p>
          </v-row>
        </v-row>
        <v-spacer></v-spacer>
        <AddMovieDialog />
      </v-container>
    </v-app-bar>

    <v-main>
      <slot />
      <Message />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Message from "~/global/Message.vue";
const movieStore = useMoviesStore();
</script>
