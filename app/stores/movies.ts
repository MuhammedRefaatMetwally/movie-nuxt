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
            rating:2.5
          }),
        }
      );
    } catch (error) {
      messageStore.showMessage = true;
      messageStore.message = error.message;
    }
  }

  async function updateAMovie(moveId: number) {
    const response = await $fetch(
      `https://6968e5b269178471522bdcb9.mockapi.io/api/v1/movies/${moveId}`,

      {
        method: "POST",
        body: JSON.stringify({}),
      }
    );
  }

  async function deleteAMovie(moveId) {
    
    try {
      const response = await $fetch(
      `https://6968e5b269178471522bdcb9.mockapi.io/api/v1/movies/${moveId}`,

      {
        method: "DELETE",
      }
    );
    console.log('====================================');
    console.log("WROKing");
    console.log('====================================');
    } catch (error) {
      messageStore.showMessage = true;
      messageStore.message = error.message;
    }
  
  }

  return { movies, getMovies ,createAMovie,deleteAMovie};
});
