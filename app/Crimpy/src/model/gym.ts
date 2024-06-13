import { z } from "zod";

const Gym = z.object({
  id: z.string(),

  shortName: z.string(),

  name: z.string(),

  location: z.string(),

  toploggerId: z.string(),

  topoId: z.nullable(z.string()),

  updatedAt: z.date(),
});

export type Gym = z.infer<typeof Gym>;
