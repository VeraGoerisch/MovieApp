<template>
  <div class="container">
    <div>
      <h1>Movie Info App</h1>
      <p>
        Use search box below to learn more about your favorite movies!
      </p>
      <SearchForm
        @submit="searchMovies"
        @reset="resetSearchQuery"
        placeholder="Enter movie name"
      />
      <p v-if="$fetchState.pending">Searching...</p>
      <p v-else-if="$fetchState.error">
        Something went wrong. Please try searching for a different movie.
      </p>
      <ul v-else>
        <li v-for="movie in movies" :key="movie.id">
          <NuxtLink :to="{ name: 'single-movie', params: { id: movie.id } }">
            <MovieCard
              :title="movie.title"
              :image-src="
                movie.poster
                  ? movie.poster
                  : 'https://via.placeholder.com/278x185.png?text=No+Image+Found'
              "
            />
          </NuxtLink>
        </li>
      </ul>
      <p v-if="noResults">No movies found.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      movies: [],
      errorMsg: '',
      noResults: false,
    };
  },
  methods: {
    searchMovies(query) {
      this.searchQuery = query;
      this.$fetch();
    },
    resetSearchQuery() {
      this.searchQuery = '';
      this.movies = [];
      this.noResults = false;
    },
  },
  async fetch() {
    this.movies = [];
    this.noResults = false;
    if (!this.searchQuery) {
      return;
    }
    await this.$axios({
      url: '/api',
      method: 'post',
      data: {
        query: `
          query searchMovies {
            movies {
              search(term: "${this.searchQuery}") {
                edges {
                  node {
                    title
                    id
                    poster (size:W185)
                    rating
                  }
                }
              }
            }
          }
      `,
      },
    }).then(response => {
      if (response.data.errors) {
        throw Error('API error');
      }
      let edges = response.data.data.movies.search.edges;
      if (!edges.length) {
        this.noResults = true;
        return;
      }
      this.movies = edges.map(edge => edge.node);
    });
  },
};
</script>

<style lang="postcss">
.container {
  margin: 30px 10px;
  text-align: center;
  color: #303030;
  font-family: Corbel, 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans',
    'DejaVu Sans', 'Bitstream Vera Sans', 'Liberation Sans', Verdana,
    'Verdana Ref', sans-serif;
}
h1 {
  margin: 20px 0;
}
ul {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
li {
  display: inline-block;
}
a {
  text-decoration: none;
  color: #303030;
}
</style>
