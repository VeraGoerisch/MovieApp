<template>
  <div class="card">
    <img :src="imageSrc" :alt="`${title}-image`" />
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="postcss">
.card {
  width: 200px;
  margin: 20px 10px;
  padding: 10px;
  &:hover {
    border-radius: 5px;
    box-shadow: -2px 2px 15px 2px rgba(0, 0, 0, 0.67);
  }
  & img {
    width: 185px;
    height: 278px;
  }
  & .title {
    font-weight: bold;
    margin: 5px 0 10px;
  }
}
</style>
