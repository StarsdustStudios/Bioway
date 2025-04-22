import { z } from 'zod'

const itemStatusSchema = z.union([
  z.literal('Aktif'),
  z.literal('Nonaktif'),
  z.literal('Dipesan'),
  z.literal('Bertugas')
]);

const getSchema = z.object({
  id: z.number(),
  city_name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const locationPostSchema = z.object({
  city_name: z.string().min(1, 'Nama brand wajib diisi'),
});

export const locationPutSchema = z.object({
  id: z.number().optional(),
  city_name: z.string().min(1, 'Nama brand wajib diisi'),
})

export type LocationGetData = z.infer<typeof getSchema>;
export type LocationStatus = z.infer<typeof itemStatusSchema>;

export const locationGetSchema = z.array(getSchema);