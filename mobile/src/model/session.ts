import { z } from "zod";
import { Efford } from "./efford";

const ActiveTime = z.object({
  start: z.date(),
  end: z.date(),
  updatedAt: z.nullable(z.date()),
});

const Session = z.object({
  id: z.string(),

  userId: z.string(),

  active: z.boolean(),

  startDate: z.date(),

  endDate: z.date(),

  effords: z.array(Efford),

  activeTimes: z.array(ActiveTime),

  updatedAt: z.nullable(z.date()),
});

export type Session = z.infer<typeof Session>;

export type ActiveTime = z.infer<typeof ActiveTime>;
