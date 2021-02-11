<template>
  <div v-if="movie" class="container">
    <SearchAgainBtn />
    <h2>{{ movie.title }}</h2>
    <div class="data-container">
      <img class="column" :src="movie.poster" alt="Movie Poster" />
      <div class="column">
        <p><span class="highlight">Rating:</span> {{ movie.rating }}</p>
        <p>
          <span class="highlight"> Genre:</span>
          <span v-for="(genre, index) in movie.details.genres" :key="index"
            >{{ genre.name
            }}<span v-if="index + 1 < movie.details.genres.length"
              >,
            </span></span
          >
        </p>
        <p>
          <span class="highlight">Release Date:</span>
          {{ movie.releaseDate | dateFormatter }}
        </p>
        <p><span class="highlight">Overview:</span> {{ movie.overview }}</p>
        <p class="highlight">Credits:</p>
        <ul
          class="credit-list"
          v-for="(castMember, index) in movie.credits.cast"
          :key="index"
        >
          <li>{{ castMember.character }} - {{ castMember.value.name }}</li>
        </ul>
      </div>
    </div>
    <SearchAgainBtn />
  </div>
</template>

<script>
export default {
  filters: {
    dateFormatter(dateString) {
      let date = new Date(dateString);
      return date.toLocaleString('en-us', {
        year: 'numeric',
        day: 'numeric',
        month: 'long',
      });
    },
  },
  async asyncData({ params, $axios }) {
    const movie = await $axios({
      url: '/api',
      method: 'post',
      data: {
        query: `
          query fetchMovieInfo {
            movies {
              movie(id: ${params.id}) {
                title
                poster(size:W500)
                rating
                releaseDate
                overview
                credits {
                  cast {
                    character
                    value {
                      name
                    }
                  }
                }
                details {
                  genres {
                    name
                  }
                }
              }
            }
          }
      `,
      },
    })
      .then(response => {
        return response.data.data.movies.movie;
      })
      .catch(err => console.log(err));

    return { movie };
  },
};
</script>

<style lang="postcss">
.data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
img.column {
  max-width: 100%;
}
.column {
  text-align: left;
  margin: 10px 15px;
  & p:first-child {
    margin-top: 0;
  }
}
.credit-list {
  padding-left: 0;
}
.highlight {
  font-weight: bold;
}
@media screen and (min-width: 769px) {
  .data-container {
    flex-direction: row;
    align-items: flex-start;
  }
  .column {
    flex: 50%;
  }
}
</style>
