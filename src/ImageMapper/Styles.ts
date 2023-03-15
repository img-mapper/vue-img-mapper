import { Obj } from './Types';

const absPos = {
  position: 'absolute',
  top: 0,
  left: 0,
};

const imgNonResponsive = {
  ...absPos,
  zIndex: 1,
  userSelect: 'none',
};

const imgResponsive = {
  ...imgNonResponsive,
  width: '100%',
  height: 'auto',
};

export const container = {
  position: 'relative',
};

export const canvas = {
  ...absPos,
  pointerEvents: 'none',
  zIndex: 2,
};

export const img = (responsive: boolean): Obj => (responsive ? imgResponsive : imgNonResponsive);

export const map = (onClick: boolean): Obj | undefined =>
  (onClick && { cursor: 'pointer' }) || undefined;
