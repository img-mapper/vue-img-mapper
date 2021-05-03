const drawRect = (coords, fillColor, lineWidth, strokeColor, ctx) => {
  const [left, top, right, bot] = coords;
  ctx.fillStyle = fillColor;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeColor;
  ctx.strokeRect(left, top, right - left, bot - top);
  ctx.fillRect(left, top, right - left, bot - top);
};

const drawCircle = (coords, fillColor, lineWidth, strokeColor, ctx) => {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeColor;
  ctx.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

const drawPoly = (coords, fillColor, lineWidth, strokeColor, ctx) => {
  const newCoords = coords.reduce((a, v, i, s) => (i % 2 ? a : [...a, s.slice(i, i + 2)]), []);
  // const first = newCoords.unshift();
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeColor;

  // ctx.moveTo(first[0], first[1]);
  newCoords.forEach(c => ctx.lineTo(c[0], c[1]));
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

export const callingFn = (shape, coords, fillColor, lineWidth, strokeColor, isAreaActive, ctx) => {
  console.log();
  if (shape === 'rect' && isAreaActive) {
    return drawRect(coords, fillColor, lineWidth, strokeColor, ctx);
  }
  if (shape === 'circle' && isAreaActive) {
    return drawCircle(coords, fillColor, lineWidth, strokeColor, ctx);
  }
  if (shape === 'poly' && isAreaActive) {
    return drawPoly(coords, fillColor, lineWidth, strokeColor, ctx);
  }
  return false;
};
