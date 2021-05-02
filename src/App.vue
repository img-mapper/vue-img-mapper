<template>
  <ImageMapper :src="src" :map="map" @click="handleOnClick" />
</template>

<script>
import ImageMapper from './components/ImageMapper';

export default {
  name: 'App',
  components: {
    ImageMapper,
  },
  computed: {
    src: () => require('./assets/example.jpg'),
    map: () => ({
      areas: require('./assets/example.json'),
      name: 'image-map',
    }),
  },
  methods: {
    handleLoad(imageRef, parentDimensions) {
      console.log(imageRef, parentDimensions);
    },
    handleOnMouseMove(area, index, event) {
      console.log(area, index, event);
    },
    handleOnImageClick(event) {
      console.log(event);
    },
    handleOnClick(area, index, event) {
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
