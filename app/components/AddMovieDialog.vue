<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular bg-blue"
          prepend-icon="mdi-movie"
          text="Add a Movie"
          variant="tonal"
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

          <v-btn class="me-4" @click="submit"> submit </v-btn>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

            <v-btn
              color="primary"
              text="Create"
              variant="tonal"
              @click="dialog = false"
            ></v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { shallowRef } from "vue";

const dialog = shallowRef(false);
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

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
    moviesStore.createAMovie({
      name: state.name,
      description: state.description,
      image: state.image,
      genres: [...select.value],
      inTheaters: state.checkbox,
    });

  }
}

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
</script>
