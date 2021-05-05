<template>
  <div>
    <ImageMapper
      v-if="areas.length"
      :src="src"
      :map="map"
      ref="myRef"
      @click="handleClick"
      @load="handleLoad"
      stay-highlighted
      stay-multi-highlighted
      toggle-highlighted
    />
    <button type="button" @click="handleClear">Clear</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import ImageMapper from './ImageMapper/ImageMapper.vue';
import { Map, CustomArea, ImageEvent, AreaEvent, AreaTouchEvent } from './ImageMapper/Types';

const URL = 'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.jpg';
const MYJSON =
  'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.json';

@Component({
  components: { ImageMapper },
})
export default class App extends Vue {
  @Ref('myRef') readonly myRef: ImageMapper;

  areas: Map['areas'] = [];

  async created(): Promise<void> {
    this.areas = await (await fetch(MYJSON)).json();
    console.log(JSON.parse(JSON.stringify(this.areas)));
  }

  get src(): string {
    return URL;
  }

  get map(): Map {
    return {
      areas: this.areas,
      name: 'image-map',
    };
  }

  handleClear(): void {
    this.myRef.clearHighlightedArea();
  }

  handleLoad(
    imageRef: HTMLImageElement,
    parentDimensions: { width: number; height: number }
  ): void {
    console.log(imageRef, parentDimensions);
  }

  handleImageMouseMove(event: ImageEvent): void {
    console.log(event);
  }

  handleImageClick(event: ImageEvent): void {
    console.log(event);
  }

  handleClick(area: CustomArea, index: number, event: AreaEvent): void {
    // console.log(area, index, event);
  }

  handleMouseMove(area: CustomArea, index: number, event: AreaEvent): void {
    console.log(area, index, event);
  }

  handleMouseUp(area: CustomArea, index: number, event: AreaEvent): void {
    console.log(area, index, event);
  }

  handleMouseDown(area: CustomArea, index: number, event: AreaEvent): void {
    console.log(area, index, event);
  }

  handleMouseEnter(area: CustomArea, index: number, event: AreaEvent): void {
    console.log(area, index, event);
  }

  handleMouseLeave(area: CustomArea, index: number, event: AreaEvent): void {
    console.log(area, index, event);
  }

  handleTouchStart(area: CustomArea, index: number, event: AreaTouchEvent): void {
    console.log(area, index, event);
  }

  handleTouchEnd(area: CustomArea, index: number, event: AreaTouchEvent): void {
    console.log(area, index, event);
  }
}
</script>
