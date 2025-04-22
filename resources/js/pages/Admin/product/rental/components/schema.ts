import { z } from 'zod'

export const rentalSchema = z.object({
  id: z.number(),
  car_id: z.coerce.number(),
  location_id: z.coerce.number(),
  price: z.coerce.number(),
  driver_fee: z.coerce.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const rentalPostSchema = z.object({
  car_id: z.coerce.number(),
  location_id: z.coerce.number(),
  price: z.coerce.number(),
  driver_fee: z.coerce.number(),
});

export const carSchema = z.object({
  id: z.number(),
  model: z.string(),
  brand_id: z.coerce.number(),
  car_image: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type RentalGetData = z.infer<typeof rentalSchema>;

export const rentalListSchema = z.array(rentalSchema);
export const carListSchema = z.array(carSchema);