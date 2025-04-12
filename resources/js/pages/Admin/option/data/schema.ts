import { z } from 'zod'

const itemStatusSchema = z.union([
  z.literal('Aktif'),
  z.literal('Nonaktif'),
  z.literal('Dipesan'),
  z.literal('Bertugas')
]);

const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand_logo: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  cars: z.array(z.string()),
});

export type OptionData = z.infer<typeof itemSchema>;
export type OptionStatus = z.infer<typeof itemStatusSchema>;

export const itemListSchema = z.array(itemSchema);