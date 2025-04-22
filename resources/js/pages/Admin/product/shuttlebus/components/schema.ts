import { z } from 'zod'

export const shuttleBusSchema = z.object({
  id: z.number(),
  car_id: z.coerce.number(),
  from: z.coerce.number(),
  to: z.coerce.number(),
  price: z.coerce.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const shuttleBusPostSchema = z.object({
  car_id: z.coerce.number(),
  from: z.coerce.number(),
  to: z.coerce.number(),
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

export type ShuttleBusGetData = z.infer<typeof shuttleBusSchema>;

export const shuttleBusListSchema = z.array(shuttleBusSchema);
export const carListSchema = z.array(carSchema);