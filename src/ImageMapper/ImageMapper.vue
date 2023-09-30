<template>
  <div id="img-mapper" ref="container" :style="containerStyle">
    <img
      ref="img"
      role="presentation"
      class="img-mapper-img"
      :style="imgStyle"
      :src="src"
      :useMap="`#${mapState.name}`"
      alt="map"
      @load="initCanvas(true)"
      @click="imageClick($event, this)"
      @mousemove="imageMouseMove($event, this)"
    />
    <canvas ref="canvas" class="img-mapper-canvas" :style="canvasStyle" />
    <map
      v-if="isRendered && !disabled"
      class="img-mapper-map"
      :name="mapState.name"
      :style="mapStyle"
    >
      <RenderAreas
        v-for="(area, index) in mapState.areas"
        :key="area[areaKeyName] || index.toString()"
        :area="area"
        :index="index"
        :extended-area="extendedArea"
        :hover-on="hoverOn"
        :hover-off="hoverOff"
        :click="click"
        v-bind="$attrs"
      />
    </map>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import RenderAreas from './RenderAreas.vue';
import { container, canvas, img, map } from './Styles';
import { ImageMapperDefaultProps } from './Types';
import { callingFn } from './Draw';
import { imageMouseMove, imageClick } from './Events';

export default defineComponent({
  name: 'ImageMapper',
  components: { RenderAreas },
  props: ImageMapperDefaultProps,
  data() {
    return {
      mapState: this.map,
      storedMap: this.mapState,
      isRendered: false,
      imgRef: null,
      ctx: null,
      onClick: null,
    };
  },
  computed: {
    containerStyle: () => container,
    canvasStyle: () => canvas,
    mapStyle() {
      return map(this.onClick);
    },
    imgStyle() {
      return img(this.responsive);
    },
  },
  watch: {
    parentWidth() {
      if (this.responsive) this.initCanvas();
    },
    map(newMap) {
      this.setContextAndCache(newMap);
      this.updateCanvasOnMapChange();
    },
  },
  mounted() {
    this.setContextAndCache(this.map);
    this.updateCanvasOnMapChange();
  },
  methods: {
    imageMouseMove,
    imageClick,
    setContextAndCache(map) {
      if (!this.isRendered && map.areas.length) {
        this.ctx = this.$refs.canvas.getContext('2d');
        this.updateCacheMap();
        this.isRendered = true;
      }
    },
    updateCanvasOnMapChange() {
      if (JSON.stringify(this.mapState) === JSON.stringify(this.map)) {
        this.updateCacheMap();
        this.initCanvas();
        this.updateCanvas();
      }
    },
    clearHighlightedArea() {
      this.mapState = this.storedMap;
      this.initCanvas();
    },
    extendedArea(area) {
      const scaledCoords = this.scaleCoords(area.coords);
      const center = this.computeCenter(area);

      return { ...area, scaledCoords, center };
    },
    updateCacheMap() {
      this.mapState = this.map;
      this.storedMap = this.map;
    },
    getDimensions(type) {
      if (typeof this[type] === 'function') {
        return this[type](this.$refs.img);
      }
      return this[type];
    },
    getValues(type, measure, name = 'area') {
      const { naturalWidth, naturalHeight, clientWidth, clientHeight } = this.$refs.img;

      if (type === 'width') {
        if (this.responsive) return this.parentWidth;
        if (this.natural) return naturalWidth;
        if (this.width || name === 'image') return measure;
        return clientWidth;
      }
      if (type === 'height') {
        if (this.responsive) return clientHeight;
        if (this.natural) return naturalHeight;
        if (this.height || name === 'image') return measure;
        return clientHeight;
      }
      return 0;
    },
    initCanvas(firstLoad = false) {
      const imgWidth = this.getDimensions('width');
      const imgHeight = this.getDimensions('height');
      const imageWidth = this.getValues('width', imgWidth);
      const imageHeight = this.getValues('height', imgHeight);

      if (this.width || this.responsive) {
        this.$refs.img.width = this.getValues('width', imgWidth, 'image');
      }

      if (this.height || this.responsive) {
        this.$refs.img.height = this.getValues('height', imgHeight, 'image');
      }

      this.$refs.canvas.width = imageWidth;
      this.$refs.canvas.height = imageHeight;
      this.$refs.container.style.width = `${imageWidth}px`;
      this.$refs.container.style.height = `${imageHeight}px`;

      this.ctx = this.$refs.canvas.getContext('2d');
      this.ctx.fillStyle = this.fillColor;
      //ctx.strokeStyle = this.strokeColor;

      if (this.$attrs.onLoad && firstLoad) {
        this.$emit('load', this.$refs.img, {
          width: imageWidth,
          height: imageHeight,
        });
      }

      this.imgRef = this.$refs.img;
      this.renderPrefilledAreas();
    },
    hoverOn(area, index, event) {
      const { shape, scaledCoords, fillColor, lineWidth, strokeColor, active: isAreaActive } = area;

      if (this.active) {
        callingFn(
          shape,
          scaledCoords,
          fillColor || this.fillColor,
          lineWidth || this.lineWidth,
          strokeColor || this.strokeColor,
          isAreaActive ?? true,
          this.ctx
        );
      }

      if (this.$attrs.onMouseenter) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.$emit('mouseenter', area, index, event);
      }
    },
    hoverOff(area, index, event) {
      if (this.active) {
        this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        this.renderPrefilledAreas();
      }

      if (this.$attrs.onMouseleave) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.$emit('mouseleave', area, index, event);
      }
    },
    click(area, index, event) {
      const isAreaActive = area.active ?? true;

      if (
        isAreaActive &&
        (this.stayHighlighted || this.stayMultiHighlighted || this.toggleHighlighted)
      ) {
        const newArea = { ...area };
        const chosenArea = this.stayMultiHighlighted ? this.mapState : this.storedMap;
        if (this.toggleHighlighted && newArea.preFillColor) {
          delete newArea.preFillColor;
        } else if (this.stayHighlighted || this.stayMultiHighlighted) {
          newArea.preFillColor = area.fillColor || this.fillColor;
        }
        const updatedAreas = chosenArea.areas.map(cur =>
          cur[this.areaKeyName] === area[this.areaKeyName] ? newArea : cur
        );
        this.mapState = { ...this.mapState, areas: updatedAreas };
      }
      if (this.$attrs.onClick) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.$emit('click', area, index, event);
      }
    },
    scaleCoords(coords) {
      const scale =
        this.width && this.imgWidth && this.imgWidth > 0 ? this.width / this.imgWidth : 1;

      if (this.responsive && this.parentWidth) {
        return coords.map(coord => coord / (this.imgRef.naturalWidth / this.parentWidth));
      }
      return coords.map(coord => coord * scale);
    },
    renderPrefilledAreas(mapObj = this.mapState) {
      mapObj.areas.map(area => {
        if (!area.preFillColor) return false;
        callingFn(
          area.shape,
          this.scaleCoords(area.coords),
          area.preFillColor,
          area.lineWidth || this.lineWidth,
          area.strokeColor || this.strokeColor,
          true,
          this.ctx
        );
        return true;
      });
    },
    computeCenter(area) {
      if (!area) return [0, 0];

      const scaledCoords = this.scaleCoords(area.coords);

      switch (area.shape) {
        case 'circle':
          return [scaledCoords[0], scaledCoords[1]];
        case 'poly':
        case 'rect':
        default: {
          const n = scaledCoords.length / 2;
          const { y: scaleY, x: scaleX } = scaledCoords.reduce(
            ({ y, x }, val, idx) => (!(idx % 2) ? { y, x: x + val / n } : { y: y + val / n, x }),
            { y: 0, x: 0 }
          );
          return [scaleX, scaleY];
        }
      }
    },
    updateCanvas() {
      this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      this.renderPrefilledAreas(this.map);
    },
  },
});
</script>
