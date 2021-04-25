export const imageMouseMove = (event, props) => {
  if (props.onImageMouseMove) props.onImageMouseMove(event);
};

export const imageClick = (event, props) => {
  if (props.onImageClick) {
    event.preventDefault();
    props.onImageClick(event);
  }
};

export const mouseMove = (area, index, event, props) => {
  if (props.onMouseMove) props.onMouseMove(area, index, event);
};

export const mouseDown = (area, index, event, props) => {
  if (props.onMouseDown) props.onMouseDown(area, index, event);
};

export const mouseUp = (area, index, event, props) => {
  if (props.onMouseUp) props.onMouseUp(area, index, event);
};

export const touchStart = (area, index, event, props) => {
  if (props.onTouchStart) props.onTouchStart(area, index, event);
};

export const touchEnd = (area, index, event, props) => {
  if (props.onTouchEnd) props.onTouchEnd(area, index, event);
};
