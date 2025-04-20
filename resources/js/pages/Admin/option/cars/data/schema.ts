import { z } from 'zod'

const itemStatusSchema = z.union([
  z.literal('Aktif'),
  z.literal('Nonaktif'),
  z.literal('Dipesan'),
  z.literal('Bertugas')
]);

const itemSchema = z.object({
  id: z.number(),
  model: z.string(),
  brand_id: z.number(),
  car_image: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

const brandSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand_logo: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  // cars: z.array(z.any()),
})

export type OptionData = z.infer<typeof itemSchema>;
export type OptionStatus = z.infer<typeof itemStatusSchema>;

export const itemListSchema = z.array(itemSchema);
export const brandListSchema = z.array(brandSchema);