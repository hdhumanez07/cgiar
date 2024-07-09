import { z } from "zod";

const plotSchema = z.object({
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  size: z.number().min(1).max(1000),
  currentCropType: z.string().min(1).max(50),
  activities: z.array(z.string()),
});

export type TPlotSchema = z.infer<typeof plotSchema>;
export { plotSchema };
