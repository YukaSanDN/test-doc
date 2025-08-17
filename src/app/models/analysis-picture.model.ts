export interface PictureAnalysisValue {
  creationClickX: number;
  creationClickY: number;
  currentPositionX: number;
  currentPositionY: number;
  resizeCurrentPositionX: number;
  resizeCurrentPositionY: number;
  creationSize: PictureSizeValue;
  naturalWidth: number;
  naturalHeight: number;
}

export interface PictureSizeValue {
  currentWidth: number;
  currentHeight: number;
}

export interface PicturesResizeValue {
  currentWidth: number;
  currentHeight: number;
  resizeElement: {
    currentWidth: number;
    currentHeight: number;
  };
}
