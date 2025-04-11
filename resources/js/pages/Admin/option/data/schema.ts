import { z } from 'zod'

const itemStatusSchema = z.union([
  z.literal('Aktif'),
  z.literal('Nonaktif'),
  z.literal('Dipesan'),
  z.literal('Bertugas')
]);

const itemSchema = z.object({
  name: z.string(),
  model : z.string(),
  logoImg: z.string().url(),
  carImg: z.string().url(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type OptionData = z.infer<typeof itemSchema>;
export type OptionStatus = z.infer<typeof itemStatusSchema>;

export const itemListSchema = z.array(itemSchema);


