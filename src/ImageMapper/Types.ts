export type Obj = Record<string, unknown>;

export interface MapAreas {
  id?: string;
  shape: string;
  coords: number[];
  active?: boolean;
  disabled?: boolean;
  href?: string;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  preFillColor?: string;
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

export interface ImageMapperProps {
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

export interface ImageMapperListeners {
  imageClick?: ((e: ImageEvent) => void) | null;
  imageMouseMove?: ((e: ImageEvent) => void) | null;
  click?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  mousedown?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  mouseup?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  touchstart?: ((area: CustomArea, index: number, e: AreaTouchEvent) => void) | null;
  touchend?: ((area: CustomArea, index: number, e: AreaTouchEvent) => void) | null;
  mousemove?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  mouseenter?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  mouseleave?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  load?: ((e: HTMLImageElement, dimensions: { width: number; height: number }) => void) | null;
}
