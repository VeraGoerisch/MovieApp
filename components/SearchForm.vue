<template>
  <form @submit.prevent="$emit('submit', query)">
    <input
      id="search"
      name="search"
      type="text"
      v-model="query"
      :placeholder="placeholder"
    />
    <button type="submit" @click="$emit('submit', query)" :disabled="!query">
      Search
    </button>
    <button type="reset" @click="clearForm">Clear</button>
  </form>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Search',
    },
  },
  data() {
    return {
      query: '',
    };
  },
  methods: {
    clearForm() {
      this.query = '';
      this.$emit('reset');
    },
  },
};
</script>

<style lang="postcss">
input {
  width: 250px;
  height: 30px;
  padding: 0 10px;
  margin: 20px 5px;
  @media (max-width: 500px) {
    display: block;
    margin: 20px auto;
  }
}
button {
  width: 75px;
  height: 34px;
  margin: 10px 2px;
}
</style>
