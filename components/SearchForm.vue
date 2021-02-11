<template>
  <form @submit.prevent="$emit('submit', query)">
    <input type="text" v-model="query" :placeholder="placeholder" />
    <button type="submit" @click="$emit('submit', query)">Search</button>
    <button type="reset" @click="$emit('reset')">Clear</button>
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
};
</script>

<style lang="postcss">
input {
  width: 250px;
  height: 30px;
  padding: 0 10px;
  margin: 20px 5px;
}
button {
  width: 75px;
  height: 34px;
  margin: 10px 2px;
}
</style>
