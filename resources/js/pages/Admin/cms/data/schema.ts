import { z } from 'zod'

const cmsStatusSchema = z.union([
  z.literal('Aktif'),
  z.literal('Nonaktif'),
  z.literal('Dipesan'),
  z.literal('Bertugas')
]);

const cmsCategorySchema = z.union([
  z.literal('Artikel'),
  z.literal('Berita'),
]);

const cmsIsShownSchema = z.union([
  z.literal('Ya'),
  z.literal('Tidak'),
]);


const cmsSchema = z.object({
  title: z.string(),
  thumbnailImg: z.string(),
  category: cmsCategorySchema,
  views: z.coerce.number().positive(),
  isShown: cmsIsShownSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Cms = z.infer<typeof cmsSchema>;
export type CmsStatus = z.infer<typeof cmsStatusSchema>;

export const cmsListSchema = z.array(cmsSchema);


