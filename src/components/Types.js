export const rerenderPropsList = [
  'src',
  'active',
  'disabled',
  'width',
  'height',
  'imgWidth',
  'fillColor',
  'strokeColor',
  'lineWidth',
  'natural',
  'areaKeyName',
  'stayHighlighted',
  'stayMultiHighlighted',
  'toggleHighlighted',
  'parentWidth',
  'responsive',
];

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
  containerRef: {
    type: Object,
    default: null,
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
  rerenderProps: {
    type: Array,
    default: [],
  },
  responsive: {
    type: Boolean,
    default: false,
  },
  parentWidth: {
    type: Number,
    default: 0,
  },

  onImageClick: {
    type: Function,
    default: () => null,
  },
  onImageMouseMove: {
    type: Function,
    default: () => null,
  },
  onClick: {
    type: Function,
    default: () => null,
  },
  onMousedown: {
    type: Function,
    default: () => null,
  },
  onMouseup: {
    type: Function,
    default: () => null,
  },
  onTouchstart: {
    type: Function,
    default: () => null,
  },
  onTouchend: {
    type: Function,
    default: () => null,
  },
  onMousemove: {
    type: Function,
    default: () => null,
  },
  onMouseenter: {
    type: Function,
    default: () => null,
  },
  onMouseleave: {
    type: Function,
    default: () => null,
  },
  onLoad: {
    type: Function,
    default: () => null,
  },
};
