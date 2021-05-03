export const imageMouseMove = (event, props) => {
  if (props.$attrs.onImageMouseMove) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('imageMouseMove', event);
  }
};

export const imageClick = (event, props) => {
  if (props.$attrs.onImageClick) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('imageClick', event);
  }
};

export const mouseMove = (area, index, event, props) => {
  if (props.$attrs.onMousemove) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('mousemove', area, index, event);
  }
};

export const mouseDown = (area, index, event, props) => {
  if (props.$attrs.onMousedown) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('mousedown', area, index, event);
  }
};

export const mouseUp = (area, index, event, props) => {
  if (props.$attrs.onMouseup) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('mouseup', area, index, event);
  }
};

export const touchStart = (area, index, event, props) => {
  if (props.$attrs.onTouchstart) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('touchstart', area, index, event);
  }
};

export const touchEnd = (area, index, event, props) => {
  if (props.$attrs.onTouchend) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('touchend', area, index, event);
  }
};
