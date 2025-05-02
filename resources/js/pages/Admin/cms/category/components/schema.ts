import { z } from 'zod'

const itemStatusSchema = z.union([
  z.literal('Aktif'),
  z.literal('Nonaktif'),
  z.literal('Dipesan'),
  z.literal('Bertugas')
]);

const getSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const categoryPostSchema = z.object({
  name: z.string().min(1, 'Nama kategori wajib diisi'),
});

export const categoryPutSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Nama kateogori wajib diisi'),
})

export type CategoryGetData = z.infer<typeof getSchema>;
export type CategoryStatus = z.infer<typeof itemStatusSchema>;

export const categoryGetSchema = z.array(getSchema);