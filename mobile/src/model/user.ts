import { z } from "zod";

const User = z.object({
  id: z.string(),

  name: z.string(),

  topLoggerId: z.nullable(z.number()),

  updatedAt: z.nullable(z.date()),
});

export type User = z.infer<typeof User>;
