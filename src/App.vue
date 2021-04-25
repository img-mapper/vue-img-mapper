<template>
  <ImageMapper :src="src" :map="map" />
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
};
</script>

<style></style>
