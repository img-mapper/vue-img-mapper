import { Vue } from 'vue-class-component';

export type Obj = Record<string, unknown>;

export interface MapAreas {
  id?: string;
  shape: string;
  coords: [];
  active: boolean;
  disabled: boolean;
  href: string;
  fillColor: string;
  strokeColor: string;
  lineWidth: number;
  preFillColor: string;
}

export interface Map {
  name: string;
  areas: Array<MapAreas>;
}

export interface CustomArea extends MapAreas {
  scaledCoords: number[];
  center?: [number, number];
}

export type CTX = CanvasRenderingContext2D;
export type AreaTouchEvent = HTMLAreaElement & TouchEvent;
export type AreaEvent = HTMLAreaElement & MouseEvent;
export type ImageEvent = HTMLImageElement & MouseEvent;

export interface ImageMapperProps extends Vue {
  src: string;
  map?: Map;
  areaKeyName?: 'id';
  active?: boolean;
  disabled?: boolean;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  imgWidth?: number;
  width?: number | ((e: ImageEvent) => void);
  height?: number | ((e: ImageEvent) => void);
  natural?: boolean;
  stayHighlighted?: boolean;
  stayMultiHighlighted?: boolean;
  toggleHighlighted?: boolean;
  responsive?: boolean;
  parentWidth?: number;
}

export const ImageMapperDefaultProps = {
  src: {
    type: String,
    required: true,
  },
  map: {
    type: Object,
    required: true,
  },
  areaKeyName: {
    type: String,
    default: 'id',
  },
  active: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fillColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.5)',
  },
  strokeColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.5)',
  },
  lineWidth: {
    type: Number,
    default: 1,
  },
  imgWidth: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  natural: {
    type: Boolean,
    default: false,
  },
  stayHighlighted: {
    type: Boolean,
    default: false,
  },
  stayMultiHighlighted: {
    type: Boolean,
    default: false,
  },
  toggleHighlighted: {
    type: Boolean,
    default: false,
  },
  responsive: {
    type: Boolean,
    default: false,
  },
  parentWidth: {
    type: Number,
    default: 0,
  },
};
