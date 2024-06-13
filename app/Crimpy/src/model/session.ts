import { z } from "zod";

const ActiveTime = z.object({
  start: z.date(),
  end: z.date(),
});

const Session = z.object({
  id: z.string(),

  active: z.boolean(),

  startDate: z.date(),

  endDate: z.date(),

  effordIds: z.array(z.string()),

  activeTimes: z.array(ActiveTime),
});

export type Session = z.infer<typeof Session>;

export type ActiveTime = z.infer<typeof ActiveTime>;
