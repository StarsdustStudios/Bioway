import { z } from 'zod'

export const carterSchema = z.object({
  id: z.number(),
  car_id: z.coerce.number(),
  location_id: z.coerce.number(),
  price: z.coerce.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const carterPostSchema = z.object({
  car_id: z.coerce.number(),
  location_id: z.coerce.number(),
  price: z.coerce.number(),
});

export const carSchema = z.object({
  id: z.number(),
  model: z.string(),
  brand_id: z.coerce.number(),
  car_image: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type CarterGetData = z.infer<typeof carterSchema>;

export const carterListSchema = z.array(carterSchema);
export const carListSchema = z.array(carSchema);