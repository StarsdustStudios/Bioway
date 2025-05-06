import { z } from 'zod'

const itemStatusSchema = z.union([
  z.literal('Aktif'),
  z.literal('Nonaktif'),
  z.literal('Dipesan'),
  z.literal('Bertugas')
]);

export const getSchema = z.object({
  id: z.number(),
  category_id: z.coerce.number(),
  title: z.string(),
  hero_image: z.string(),
  slug: z.string(),
  content: z.string(),
  published_at: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

const getCategory = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
})

export const postPostSchema = z.object({
  category_id: z.coerce.number(),
  title: z.string(),
  hero_image: z
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
  slug: z
  .string()
  .min(1, 'Slug wajib diisi')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung, tanpa diawali/diakhiri tanda hubung'),
  content: z.string(),
});

export const postPutSchema = z.object({
  id: z.number().optional(),
  category_id: z.coerce.number(),
  title: z.string(),
  hero_image: z
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
  slug: z
  .string()
  .min(1, 'Slug wajib diisi')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung, tanpa diawali/diakhiri tanda hubung'),
  content: z.string(),
})

export type PostGetData = z.infer<typeof getSchema>;
export type PostStatus = z.infer<typeof itemStatusSchema>;

export const categoryListSchema = z.array(getCategory);
export const postGetSchema = z.array(getSchema);