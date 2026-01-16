import { useMessageStore } from "~/stores/message";

interface MovieItem {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  genres: string[];
  inTheater: boolean;
}

export const useMoviesStore = defineStore("movies", () => {
  const movies = ref([]);
  const messageStore = useMessageStore();

  async function getMovies() {
    try {
      const response = await $fetch(
        `https://6968e5b269178471522bdcb9.mockapi.io/api/v1/movies`
      );
      movies.value = response;
    } catch (error) {
      messageStore.showMessage = true;
      messageStore.message = error.message;
    }
  }

  async function createAMovie(movie: MovieItem) {
    try {
      const response = await $fetch(
        `https://6968e5b269178471522bdcb9.mockapi.io/api/v1/movies`,

        {
          method: "POST",
          body: JSON.stringify({
            ...movie,
            rating: 2.5,
          }),
        }
      );
      await getMovies();
    } catch (error) {
      messageStore.showMessage = true;
      messageStore.message = error.message;
    }
  }

  async function updateAMovie(moveId: number, movie: MovieItem) {
    try {
      const response = await $fetch(
        `https://6968e5b269178471522bdcb9.mockapi.io/api/v1/movies/${moveId}`,

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...movie }),
        }
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      messageStore.showMessage = true;
      messageStore.message = `Sorry, the mockapi.io UPDATE API does not work But the CREATE & Delete & GET ALL are working : ${error.message}`;
      console.error("Error:", error);
    }
  }

  async function deleteAMovie(moveId) {
    try {
      const response = await $fetch(
        `https://6968e5b269178471522bdcb9.mockapi.io/api/v1/movies/${moveId}`,

        {
          method: "DELETE",
        }
      );
      await getMovies();
    } catch (error) {
      messageStore.showMessage = true;
      messageStore.message = error.message;
    }
  }

  return { movies, getMovies, createAMovie, deleteAMovie, updateAMovie };
});
