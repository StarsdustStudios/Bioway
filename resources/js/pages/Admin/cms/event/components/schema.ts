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
  poster_img: z.string(),
  start_at: z.coerce.date(),
  end_at: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  cars: z.array(z.any()),
});

export const eventPostSchema = z.object({
  name: z.string().min(1, 'Nama Event wajib diisi'),
  poster_img: z
  .union([
    z
      .instanceof(File)
      .refine((file) => file.size <= 2 * 1024 * 1024, 'Maksimal 2MB')
      .refine(
        (file) =>
          ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'].includes(file.type),
        'Format tidak valid (jpeg, png, jpg, gif, svg, webp saja)'
      ),
    z.null(),
    z.undefined(),
  ]),
  start_at: z.coerce.date(),
  end_at: z.coerce.date(),
});

export const eventPutSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Nama Event wajib diisi'),
  poster_img: z
  .union([
    z
      .instanceof(File)
      .refine((file) => file.size <= 2 * 1024 * 1024, 'Maksimal 2MB')
      .refine(
        (file) =>
          ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'].includes(file.type),
        'Format tidak valid (jpeg, png, jpg, gif, svg, webp saja)'
      ),
    z.null(),
    z.undefined(),
  ]),
  start_at: z.coerce.date(),
  end_at: z.coerce.date(),
})

export type EventGetData = z.infer<typeof getSchema>;
export type EventStatus = z.infer<typeof itemStatusSchema>;

export const eventGetSchema = z.array(getSchema);