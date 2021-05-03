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
