<template>
  <area
    v-if="!area.disabled"
    :coords="extendedArea(area).scaledCoords.join(',')"
    :shape="area.shape"
    :href="area.href"
    @mouseenter="hoverOn(extendedArea(area), index, $event)"
    @mouseleave="hoverOff(extendedArea(area), index, $event)"
    @mousemove="mouseMove(extendedArea(area), index, $event)"
    @mousedown="mouseDown(extendedArea(area), index, $event)"
    @mouseup="mouseUp(extendedArea(area), index, $event)"
    @tocuhstart="touchStart(extendedArea(area), index, $event)"
    @touchend="touchEnd(extendedArea(area), index, $event)"
    @click="click(extendedArea(area), index, $event)"
    alt="map"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AreaEvent, AreaTouchEvent, CustomArea, ImageMapperListeners, MapAreas } from './Types';

@Component({
  inheritAttrs: false,
})
export default class RenderAreas extends Vue {
  @Prop(Object) readonly area: MapAreas;
  @Prop(Number) readonly index: number;
  @Prop(Function) readonly extendedArea: (area: MapAreas) => CustomArea;
  @Prop(Function) readonly hoverOff: (area: CustomArea, index: number, event: AreaEvent) => void;
  @Prop(Function) readonly hoverOn: (area: CustomArea, index?: number, event?: AreaEvent) => void;
  @Prop(Function) readonly click: (area: CustomArea, index: number, event: AreaEvent) => void;

  get listeners(): ImageMapperListeners {
    return this.$parent.$listeners;
  }

  mouseMove(area: CustomArea, index: number, event: AreaEvent): void {
    if (this.listeners.mousemove) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.$parent.$emit('mousemove', area, index, event);
    }
  }

  mouseDown(area: CustomArea, index: number, event: AreaEvent): void {
    if (this.listeners.mousedown) {
      console.log('yeh');
      event.preventDefault();
      event.stopImmediatePropagation();
      this.$parent.$emit('mousedown', area, index, event);
    }
  }

  mouseUp(area: CustomArea, index: number, event: AreaEvent): void {
    if (this.listeners.mouseup) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.$parent.$emit('mouseup', area, index, event);
    }
  }

  touchStart(area: CustomArea, index: number, event: AreaTouchEvent): void {
    if (this.listeners.touchstart) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.$parent.$emit('touchstart', area, index, event);
    }
  }

  touchEnd(area: CustomArea, index: number, event: AreaTouchEvent): void {
    if (this.listeners.touchend) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.$parent.$emit('touchend', area, index, event);
    }
  }
}
</script>
