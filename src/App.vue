<template>
  <ImageMapper :src="src" :map="map" />
</template>

<script>
import ImageMapper from './ImageMapper/ImageMapper.vue';

const URL = 'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.jpg';
const MYJSON =
  'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.json';

export default {
  name: 'App',
  components: {
    ImageMapper,
  },
  data() {
    return {
      areas: [],
    };
  },
  computed: {
    src: () => URL,
    map() {
      return {
        areas: this.areas,
        name: 'image-map',
      };
    },
  },
  async created() {
    this.areas = await (await fetch(MYJSON)).json();
  },
};
</script>
