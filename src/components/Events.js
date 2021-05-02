export const imageMouseMove = (event, props) => {
  if (props.onImageMouseMove) props.$emit('image-mouse-move', event);
};

export const imageClick = (event, props) => {
  if (props.onImageClick) {
    event.preventDefault();
    props.$emit('image-click', event, 'hello');
  }
};

export const mouseMove = (area, index, event, props, self) => {
  if (props.onMousemove) self.$emit('mousemove', area, index, event);
};

export const mouseDown = (area, index, event, props, self) => {
  if (props.onMousedown) self.$emit('mousedown', area, index, event);
};

export const mouseUp = (area, index, event, props, self) => {
  if (props.onMouseup) self.$emit('mouseup', area, index, event);
};

export const touchStart = (area, index, event, props, self) => {
  if (props.onTouchstart) self.$emit('touchstart', area, index, event);
};

export const touchEnd = (area, index, event, props, self) => {
  if (props.onTouchend) self.$emit('touchend', area, index, event);
};
