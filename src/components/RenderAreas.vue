<template>
  <area
    v-if="!area.disabled"
    :key="area[areaKeyName] || index.toString()"
    :coords="extendedArea(area).scaledCoords.join(',')"
    :shape="area.shape"
    :href="area.href"
    @mouseenter="hoverOn(extendedArea(area), index, $event)"
    @mouseleave="hoverOff(extendedArea(area), index, $event)"
    @mousemove="mouseMove(extendedArea(area), index, $event, $attrs, this)"
    @mousedown="mouseDown(extendedArea(area), index, $event, $attrs, this)"
    @mouseup="mouseUp(extendedArea(area), index, $event, $attrs, this)"
    @tocuhstart="touchStart(extendedArea(area), index, $event, $attrs, this)"
    @touchend="touchEnd(extendedArea(area), index, $event, $attrs, this)"
    @click="click(extendedArea(area), index, $event)"
    alt="map"
  />
</template>

<script>
import { mouseMove, mouseDown, mouseUp, touchStart, touchEnd } from './Events';

export default {
  props: {
    area: {
      type: Object,
      required: true,
    },
    areaKeyName: {
      type: String,
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
