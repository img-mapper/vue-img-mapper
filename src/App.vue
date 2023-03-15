<template>
  <ImageMapper :src="src" :map="map" />
</template>

<script lang="ts">
import ImageMapper from './ImageMapper/ImageMapper.vue';
import { Map, MapAreas } from './ImageMapper/Types';

const URL = 'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.jpg';
const MYJSON =
  'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.json';

export default {
  name: 'App',
  components: {
    ImageMapper,
  },
  data(): { areas: Array<MapAreas> } {
    return {
      areas: [],
    };
  },
  computed: {
    src: (): string => URL,
    map(): Map {
      return {
        name: 'image-map',
        areas: this.areas,
      };
    },
  },
  async created(): Promise<void> {
    this.areas = await (await fetch(MYJSON)).json<Array<MapAreas>>();
    this.areas.map(cur => cur);
  },
  async http<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request);
    return await response.json();
  },
};
</script>
