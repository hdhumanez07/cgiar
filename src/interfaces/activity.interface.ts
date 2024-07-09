export interface IActivity {
  id?: string;
  date: Date;
  activityType:
    | "Planting"
    | "Irrigation"
    | "Fertilization"
    | "Harvest"
    | "Other";
  inputsUsed: string;
  duration: number;
  plot: string;
}
