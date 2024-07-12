import { z } from "zod";

export const Efford = z.object({
  id: z.string(),

  routeId: z.string(),

  userId: z.string(),

  toploggerId: z.nullable(z.string()),

  status: z.string(),

  tries: z.nullable(z.number()),

  updatedAt: z.nullable(z.date()),
});

export type Efford = z.infer<typeof Efford>;
