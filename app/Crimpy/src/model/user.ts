import { z } from "zod";

const User = z.object({
  id: z.string(),

  name: z.string(),

  topLoggerId: z.number(),

  updatedAt: z.date(),
});

export type User = z.infer<typeof User>;
