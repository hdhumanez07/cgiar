export interface IPlot {
  id?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  size: number;
  currentCropType: string;
  activities: string;
}
