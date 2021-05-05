<template>
  <div id="img-mapper" :style="containerStyle" ref="container">
    <img
      role="presentation"
      class="img-mapper-img"
      :style="imgStyle"
      :src="src"
      :useMap="`#${mapState.name}`"
      alt="map"
      ref="img"
      @load="initCanvas(true)"
      @click="imageClick($event)"
      @mousemove="imageMouseMove($event)"
    />
    <canvas class="img-mapper-canvas" ref="canvas" :style="canvasStyle" />
    <map
      class="img-mapper-map"
      :name="mapState.name"
      :style="mapStyle"
      v-if="isRendered && !disabled"
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
      />
    </map>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Ref, Prop } from 'vue-property-decorator';
import { container, canvas, img, map } from './Styles';
import {
  MapAreas,
  Map,
  CustomArea,
  AreaEvent,
  Obj,
  ImageEvent,
  ImageMapperListeners,
} from './Types';
import RenderAreas from './RenderAreas.vue';
import { callingFn } from './Draw';

@Component({
  components: { RenderAreas },
})
export default class ImageMapper extends Vue {
  @Prop(String) readonly src: string;
  @Prop(Object) readonly map?: Map;
  @Prop({ type: String, default: 'id' }) readonly areaKeyName?: string;
  @Prop({ type: Boolean, default: true }) readonly active?: boolean;
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;
  @Prop({ type: String, default: 'rgba(255, 255, 255, 0.5)' }) readonly fillColor?: string;
  @Prop({ type: String, default: 'rgba(0, 0, 0, 0.5)' }) readonly strokeColor?: string;
  @Prop({ type: Number, default: 1 }) readonly lineWidth?: number;
  @Prop({ type: Number, default: 0 }) readonly imgWidth?: number;
  @Prop({ type: Number, default: 0 }) readonly width?: number | ((e: ImageEvent) => void);
  @Prop({ type: Number, default: 0 }) readonly height?: number | ((e: ImageEvent) => void);
  @Prop({ type: Boolean, default: false }) readonly natural?: boolean;
  @Prop({ type: Boolean, default: false }) readonly stayHighlighted?: boolean;
  @Prop({ type: Boolean, default: false }) readonly stayMultiHighlighted?: boolean;
  @Prop({ type: Boolean, default: false }) readonly toggleHighlighted?: boolean;
  @Prop({ type: Boolean, default: false }) readonly responsive?: boolean;
  @Prop({ type: Number, default: 0 }) readonly parentWidth?: number;

  @Ref('canvas') readonly canvasRef: HTMLCanvasElement;
  @Ref('img') readonly imgRef: HTMLImageElement;
  @Ref('container') readonly containerRef: HTMLImageElement;

  mapState: Map = { name: '', areas: [] };
  storedMap: Map = this.mapState;
  isRendered = false;
  imgRefState: HTMLImageElement = null;
  ctx: CanvasRenderingContext2D = null;

  mounted(): void {
    this.ctx = this.canvasRef.getContext('2d');
    this.updateCacheMap();
    this.isRendered = true;
  }

  updated(): void {
    if (JSON.stringify(this.mapState) === JSON.stringify(this.map)) {
      this.updateCacheMap();
      this.initCanvas();
      this.updateCanvas();
    }
  }

  @Watch('parentWidth')
  watchParentWidth(): void {
    if (this.responsive) this.initCanvas();
  }

  get listeners(): ImageMapperListeners {
    return this.$listeners;
  }

  get containerStyle(): Obj {
    return container;
  }

  get canvasStyle(): Obj {
    return canvas;
  }

  get mapStyle(): Obj {
    return map(!!this.listeners.click);
  }

  get imgStyle(): Obj {
    return img(this.responsive);
  }

  clearHighlightedArea(): void {
    this.mapState = this.storedMap;
    this.initCanvas();
  }

  extendedArea(area: MapAreas): CustomArea {
    const scaledCoords = this.scaleCoords(area.coords);
    const center = this.computeCenter(area);

    return { ...area, scaledCoords, center };
  }

  updateCacheMap(): void {
    this.mapState = this.map;
    this.storedMap = this.map;
  }

  getDimensions(type: 'width' | 'height'): number {
    if (typeof this[type] === 'function') {
      // @ts-ignore
      return this[type](this.imgRef);
    }
    return this[type] as number;
  }

  getValues(type: string, measure: number, name = 'area'): number {
    const { naturalWidth, naturalHeight, clientWidth, clientHeight } = this.imgRef;

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
  }

  initCanvas(firstLoad = false): void {
    const imgWidth = this.getDimensions('width');
    const imgHeight = this.getDimensions('height');
    const imageWidth = this.getValues('width', imgWidth);
    const imageHeight = this.getValues('height', imgHeight);

    if (this.width || this.responsive) {
      this.imgRef.width = this.getValues('width', imgWidth, 'image');
    }

    if (this.height || this.responsive) {
      this.imgRef.height = this.getValues('height', imgHeight, 'image');
    }

    this.canvasRef.width = imageWidth;
    this.canvasRef.height = imageHeight;
    this.containerRef.style.width = `${imageWidth}px`;
    this.containerRef.style.height = `${imageHeight}px`;

    this.ctx = this.canvasRef.getContext('2d');
    this.ctx.fillStyle = this.fillColor;
    //ctx.strokeStyle = this.strokeColor;

    if (this.listeners.load && firstLoad) {
      this.$emit('load', this.imgRef, {
        width: imageWidth,
        height: imageHeight,
      });
    }

    this.imgRefState = this.imgRef;
    this.renderPrefilledAreas();
  }

  imageMouseMove(event: ImageEvent): void {
    if (this.listeners.imageMouseMove) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.$emit('imageMouseMove', event);
    }
  }

  imageClick(event: ImageEvent): void {
    if (this.listeners.imageClick) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.$emit('imageClick', event);
    }
  }

  hoverOn(area: CustomArea, index?: number, event?: AreaEvent): void {
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

    if (this.listeners.mouseenter) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.$emit('mouseenter', area, index, event);
    }
  }

  hoverOff(area: CustomArea, index: number, event: AreaEvent): void {
    if (this.active) {
      this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
      this.renderPrefilledAreas();
    }

    if (this.listeners.mouseleave) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.$emit('mouseleave', area, index, event);
    }
  }

  click(area: CustomArea, index: number, event: AreaEvent): void {
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
        cur[this.areaKeyName as 'id'] === area[this.areaKeyName as 'id'] ? newArea : cur
      );
      this.mapState = { ...this.mapState, areas: updatedAreas };
    }
    if (this.listeners.click) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.$emit('click', area, index, event);
    }
  }

  scaleCoords(coords: []): number[] {
    const scale =
      this.width && this.imgWidth && this.imgWidth > 0 ? (this.width as number) / this.imgWidth : 1;

    if (this.responsive && this.parentWidth) {
      return coords.map(coord => coord / (this.imgRefState?.naturalWidth / this.parentWidth));
    }
    return coords.map(coord => coord * scale);
  }

  renderPrefilledAreas(mapObj: Map = this.mapState): void {
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
  }

  computeCenter(area: MapAreas): [number, number] {
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
  }

  updateCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    this.renderPrefilledAreas(this.map);
  }
}
</script>
