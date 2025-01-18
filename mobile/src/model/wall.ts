import { z } from "zod";

const Wall = z.object({
  id: z.string(),

  name: z.string(),

  description: z.nullable(z.string()),

  toploggerId: z.nullable(z.string()),

  updatedAt: z.nullable(z.date()),
});

export type Wall = z.infer<typeof Wall>;
