<template>
  <ImageMapper :src="src" :map="map" @click="handleClick" />
</template>

<script>
import ImageMapper from './components/ImageMapper';

const URL = 'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.jpg';

const JSON =
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
    const areas = await (await fetch(JSON)).json();
    this.areas = areas;
    console.log(areas);
  },
  methods: {
    handleLoad(imageRef, parentDimensions) {
      console.log(imageRef, parentDimensions);
    },
    handleImageMouseMove(event) {
      console.log(event);
    },
    handleImageClick(event) {
      console.log(event);
    },
    handleClick(area, index, event) {
      console.log(area, index, event);
    },
    handleMouseMove(area, index, event) {
      console.log(area, index, event);
    },
    handleMouseUp(area, index, event) {
      console.log(area, index, event);
    },
    handleMouseDown(area, index, event) {
      console.log(area, index, event);
    },
    handleMouseEnter(area, index, event) {
      console.log(area, index, event);
    },
    handleMouseLeave(area, index, event) {
      console.log(area, index, event);
    },
    handleTouchStart(area, index, event) {
      console.log(area, index, event);
    },
    handleTouchEnd(area, index, event) {
      console.log(area, index, event);
    },
  },
};
</script>

<style></style>
