<template>
  <v-container>
    <p class="text-h4 mt-8 mb-6">Feature Today</p>

    <v-row>
      <v-col v-for="(card, index) in moviesStore.movies" :key="index" cols="4">
        <v-card class="position-relative" color="#020617">
          <v-img :src="card.image" rounded height="400"> </v-img>

          <ScoreCircular :score="card.rating" />

          <v-hover v-slot="{ isHovering, props }">
            <v-card-text :class="{ 'on-hover': isHovering }" v-bind="props">
              <p class="text-h6 mt-1">{{ card.name }}</p>

              <v-row no-gutters>
                <v-col
                  v-for="(genre, genreIndex) in moviesStore.movies[index]
                    .genres"
                  :key="genreIndex"
                  cols="12"
                  sm="2"
                >
                  <v-chip class="ma-1 pa-1 bg-white"> {{ genre }} </v-chip>
                </v-col>
              </v-row>
              <p class="text-grey text-body-1">{{ card.description }}</p>

              <v-card-actions class="pa-4">
                Rating:

                <span class="text-grey-lighten-2 text-caption me-2">
                  ({{ card.rating }})
                </span>

                <v-rating
                  v-model="card.rating"
                  active-color="yellow-accent-4"
                  color="white"
                  size="18"
                  half-increments
                ></v-rating>

                <EditMovieDialog
                  :isHovering="isHovering"
                  :movieId="card.id"
                  :movieName="card.name"
                  :movieDescription="card.description"
                  :movieImage="card.image"
                  :movieGenres="card.genres"
                  :movieInTheaters="card.inTheaters"
                />
                <v-btn
                  :class="{ 'd-block': isHovering }"
                  class="d-none bg-white"
                  color="red"
                  icon="mdi-delete"
                  @click="moviesStore.deleteAMovie(card.id)"
                ></v-btn>
              </v-card-actions>
            </v-card-text>
          </v-hover>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useMoviesStore } from "~/stores/movies";

const moviesStore = useMoviesStore();
onBeforeMount(() => {
  moviesStore.getMovies();
});

onMounted(() => {
  moviesStore.getMovies();
});

onBeforeUpdate(() => {
  moviesStore.getMovies();
});

onUpdated(() => {
  moviesStore.getMovies();
});
</script>
