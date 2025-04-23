import { z } from 'zod'

export const deliverySchema = z.object({
  id: z.number(),
  location_id: z.coerce.number(),
  size: z.string(),
  price: z.coerce.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const deliveryPostSchema = z.object({
  size: z.string(),
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

export type DeliveryGetData = z.infer<typeof deliverySchema>;

export const deliveryListSchema = z.array(deliverySchema);
export const carListSchema = z.array(carSchema);