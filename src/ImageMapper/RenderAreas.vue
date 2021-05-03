<template>
  <area
    v-if="!area.disabled"
    :coords="extendedArea(area).scaledCoords.join(',')"
    :shape="area.shape"
    :href="area.href"
    @mouseenter="hoverOn(extendedArea(area), index, $event)"
    @mouseleave="hoverOff(extendedArea(area), index, $event)"
    @mousemove="mouseMove(extendedArea(area), index, $event, this)"
    @mousedown="mouseDown(extendedArea(area), index, $event, this)"
    @mouseup="mouseUp(extendedArea(area), index, $event, this)"
    @tocuhstart="touchStart(extendedArea(area), index, $event, this)"
    @touchend="touchEnd(extendedArea(area), index, $event, this)"
    @click="click(extendedArea(area), index, $event)"
    alt="map"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { Options, mixins } from 'vue-class-component';
import { mouseMove, mouseDown, mouseUp, touchStart, touchEnd } from './Events';

const extendedProps = Vue.extend({
  props: {
    area: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    extendedArea: {
      type: Function,
      required: true,
    },
    hoverOff: {
      type: Function,
      required: true,
    },
    hoverOn: {
      type: Function,
      required: true,
    },
    click: {
      type: Function,
      required: true,
    },
  },
});

@Component
@Options({
  inheritAttrs: false,
})
export default class RenderAreas extends mixins(Vue, extendedProps) {
  mouseMove = mouseMove;
  mouseDown = mouseDown;
  mouseUp = mouseUp;
  touchStart = touchStart;
  touchEnd = touchEnd;
}
</script>
