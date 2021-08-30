<template>
  <!--<ImageMapper-->
  <!--  :src="src"-->
  <!--  :map="map"-->
  <!--  active-->
  <!--  disabled-->
  <!--  fill-color="#ddd"-->
  <!--  stroke-color="#ccc"-->
  <!--  area-key-name="id"-->
  <!--  width="500"-->
  <!--  height="200"-->
  <!--  img-width="240"-->
  <!--  line-width="5"-->
  <!--  natural-->
  <!--  parent-width="200"-->
  <!--  responsive-->
  <!--  stay-highlighted-->
  <!--  stay-multi-highlighted-->
  <!--  toggle-highlighted-->
  <!--  ref="myRef"-->
  <!--  @imageMouseMove="handleImageMouseMove"-->
  <!--  @imageClick="handleImageClick"-->
  <!--  @load="handleLoad"-->
  <!--  @mouseup="handleMouseUp"-->
  <!--  @mousedown="handleMouseDown"-->
  <!--  @click="handleClick"-->
  <!--  @mouseenter="handleMouseEnter"-->
  <!--  @mouseleave="handleMouseLeave"-->
  <!--  @mousemove="handleMouseMove"-->
  <!--  @touchstart="handleTouchStart"-->
  <!--  @touchend="handleTouchEnd"-->
  <!--/>-->
  <ImageMapper
    :src="src"
    :map="map"
  />
  <button type="button" @click="handleClear">Clear</button>
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
    console.log(JSON.parse(JSON.stringify(this.areas)));
  },
  methods: {
    handleClear() {
      this.$refs.myRef.clearHighlightedArea();
    },
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
      // console.log(area instanceof MouseEvent);
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
