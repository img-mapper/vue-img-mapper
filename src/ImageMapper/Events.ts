import { ImageMapperProps, CustomArea, AreaEvent, AreaTouchEvent, ImageEvent } from './Types';

export const imageMouseMove = (event: ImageEvent, props: ImageMapperProps): void => {
  if (props.$attrs.onImageMouseMove) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('imageMouseMove', event);
  }
};

export const imageClick = (event: ImageEvent, props: ImageMapperProps): void => {
  if (props.$attrs.onImageClick) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('imageClick', event);
  }
};

export const mouseMove = (
  area: CustomArea,
  index: number,
  event: AreaEvent,
  props: ImageMapperProps
): void => {
  if (props.$attrs.onMousemove) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('mousemove', area, index, event);
  }
};

export const mouseDown = (
  area: CustomArea,
  index: number,
  event: AreaEvent,
  props: ImageMapperProps
): void => {
  if (props.$attrs.onMousedown) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('mousedown', area, index, event);
  }
};

export const mouseUp = (
  area: CustomArea,
  index: number,
  event: AreaEvent,
  props: ImageMapperProps
): void => {
  if (props.$attrs.onMouseup) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('mouseup', area, index, event);
  }
};

export const touchStart = (
  area: CustomArea,
  index: number,
  event: AreaTouchEvent,
  props: ImageMapperProps
): void => {
  if (props.$attrs.onTouchstart) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('touchstart', area, index, event);
  }
};

export const touchEnd = (
  area: CustomArea,
  index: number,
  event: AreaTouchEvent,
  props: ImageMapperProps
): void => {
  if (props.$attrs.onTouchend) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('touchend', area, index, event);
  }
};
