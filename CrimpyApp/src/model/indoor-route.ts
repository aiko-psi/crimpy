import { z } from "zod";

const IndoorRoute = z.object({
  id: z.string(),

  gymId: z.string(),

  active: z.boolean(),

  color: z.nullable(z.string()),

  name: z.nullable(z.string()),

  toploggerId: z.nullable(z.string()),

  initialGrade: z.number(),

  tags: z.array(z.string()),

  qualityRatings: z.array(z.number()),

  topoId: z.nullable(z.string()),

  settingDate: z.date(),

  unsettingDate: z.nullable(z.date()),

  updatedAt: z.nullable(z.date()),
});

export type IndoorRoute = z.infer<typeof IndoorRoute>;
