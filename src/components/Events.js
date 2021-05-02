export const imageMouseMove = (event, props) => {
  if (props.onImageMouseMove) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('imageMouseMove', event);
  }
};

export const imageClick = (event, props) => {
  if (props.onImageClick) {
    event.preventDefault();
    event.stopImmediatePropagation();
    props.$emit('imageClick', event, 'hello');
  }
};

export const mouseMove = (area, index, event, props, self) => {
  if (props.onMousemove) {
    event.preventDefault();
    event.stopImmediatePropagation();
    self.$emit('mousemove', area, index, event);
  }
};

export const mouseDown = (area, index, event, props, self) => {
  if (props.onMousedown) {
    event.preventDefault();
    event.stopImmediatePropagation();
    self.$emit('mousedown', area, index, event);
  }
};

export const mouseUp = (area, index, event, props, self) => {
  if (props.onMouseup) {
    event.preventDefault();
    event.stopImmediatePropagation();
    self.$emit('mouseup', area, index, event);
  }
};

export const touchStart = (area, index, event, props, self) => {
  if (props.onTouchstart) {
    event.preventDefault();
    event.stopImmediatePropagation();
    self.$emit('touchstart', area, index, event);
  }
};

export const touchEnd = (area, index, event, props, self) => {
  if (props.onTouchend) {
    event.preventDefault();
    event.stopImmediatePropagation();
    self.$emit('touchend', area, index, event);
  }
};
