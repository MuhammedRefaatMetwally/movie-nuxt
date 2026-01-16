<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          :class="{ 'd-block': isHovering }"
          class="d-none bg-white"
          color="blue"
          icon="mdi-pen"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-movie" title="Add Movie">
        <form>
          <v-text-field
            v-model="state.name"
            :counter="30"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            label="Name"
            required
            @blur="v$.name.$touch"
            @input="v$.name.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.description"
            :counter="100"
            :error-messages="v$.description.$errors.map((e) => e.$message)"
            label="Description"
            required
            @blur="v$.description.$touch"
            @input="v$.description.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.image"
            :error-messages="v$.image.$errors.map((e) => e.$message)"
            label="Image"
            required
            @blur="v$.image.$touch"
            @input="v$.image.$touch"
          ></v-text-field>

          <v-select
            v-model="state.select"
            :error-messages="v$.select.$errors.map((e) => e.$message)"
            :items="items"
            label="Genres"
            required
            chips
            multiple
            @blur="v$.select.$touch"
            @change="v$.select.$touch"
          ></v-select>

          <v-checkbox
            v-model="state.checkbox"
            :error-messages="v$.checkbox.$errors.map((e) => e.$message)"
            label="Is Theater"
            required
            @blur="v$.checkbox.$touch"
            @change="v$.checkbox.$touch"
          ></v-checkbox>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

            <v-spacer></v-spacer>

            <v-btn
              color="primary"
              text="Update"
              variant="tonal"
              @click="submit"
            ></v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

const props = defineProps({
  movieId: {
    type: Number,
  },
  movieName: {
    type: String,
  },
  movieDescription: {
    type: String,
  },
  movieImage: {
    type: String,
  },
  movieGenres: {
    type: Array<String>,
  },
  movieInTheaters: {
    type: Boolean,
  },
  isHovering: {
    type: Boolean,
  },
});

const dialog = shallowRef(false);
const items = shallowRef(["Drama", "Crime", "Action", "Comedy"]);
const select = shallowRef([]);
const initialState = {
  name: "",
  description: "",
  image: "",
  select: select,
  checkbox: null,
};

const state = reactive({
  ...initialState,
  name: props.movieName,
  description: props.movieDescription,
  image: props.movieImage,
  select: props.movieGenres,
  checkbox: props.movieInTheaters,
});

const rules = {
  name: { required },
  description: { required },
  image: { required },
  select: { required },
  items: { required },
  checkbox: { required },
};

const v$ = useVuelidate(rules, state);
const moviesStore = useMoviesStore();

function submit() {
  v$.$validate;
  if (v$.value.$anyDirty) {
    moviesStore.updateAMovie(props.movieId, {
      name: state.name,
      description: state.description,
      image: state.image,
      genres: [...select.value],
      inTheaters: state.checkbox,
    });
  }
  console.log(`${state.name} ${state.select}`);
}

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
</script>
