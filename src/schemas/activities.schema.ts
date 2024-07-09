import { z } from "zod";

const activitySchema = z.object({
  date: z.string().refine((value) => {
    return !isNaN(Date.parse(value));
  }),
  activityType: z.enum([
    "Planting",
    "Irrigation",
    "Fertilization",
    "Harvest",
    "Other",
  ]),
  inputsUsed: z.string(),
  duration: z.number().min(1),
  plot: z.string(),
});

export type TActivitySchema = z.infer<typeof activitySchema>;
export { activitySchema };
