import { number } from 'prop-types';

export const MissionHelper = {
  generatePictureHeightWidthAndMargins: (
    basedOn: number,
    aspectRatio: { height: number; width: number } = { height: 3, width: 4 }):
    { height: number, width: number, margin: number } => {
    const ratio = aspectRatio.height / aspectRatio.width;
    if (basedOn > 825) {
      return { height: 825 * ratio, width: 825, margin: 50 };
    }
    if (basedOn > 500) {
      return { height: 500 * ratio, width: 500, margin: 60 };
    }
    return { height: basedOn * ratio, width: basedOn, margin: 0 };
  }


};
