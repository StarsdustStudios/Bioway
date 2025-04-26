import { z } from 'zod'

export const tourSchema = z.object({
  id: z.number(),
  start: z.coerce.number(),
  desc: z.string(),
  price: z.coerce.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const tourPostSchema = z.object({
  start: z.coerce.number(),
  desc: z.string(),
  price: z.coerce.number(),
});

export const locationSchema = z.object({
  id: z.coerce.number(),
  city_name: z.coerce.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type TourGetData = z.infer<typeof tourSchema>;

export const tourListSchema = z.array(tourSchema);
