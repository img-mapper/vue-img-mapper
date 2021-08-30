<template>
  <area
    v-if="!area.disabled"
    :coords="extendedArea(area).scaledCoords.join(',')"
    :shape="area.shape"
    :href="area.href"
    alt="map"
    @mouseenter="hoverOn(extendedArea(area), index, $event)"
    @mouseleave="hoverOff(extendedArea(area), index, $event)"
    @mousemove="mouseMove(extendedArea(area), index, $event, this)"
    @mousedown="mouseDown(extendedArea(area), index, $event, this)"
    @mouseup="mouseUp(extendedArea(area), index, $event, this)"
    @tocuhstart="touchStart(extendedArea(area), index, $event, this)"
    @touchend="touchEnd(extendedArea(area), index, $event, this)"
    @click="click(extendedArea(area), index, $event)"
  />
</template>

<script>
import { mouseMove, mouseDown, mouseUp, touchStart, touchEnd } from './Events';

export default {
  inheritAttrs: false,
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
  methods: {
    mouseMove,
    mouseDown,
    mouseUp,
    touchStart,
    touchEnd,
  },
};
</script>
