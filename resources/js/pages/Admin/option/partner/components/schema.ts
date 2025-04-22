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
  logo: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const partnerPostSchema = z.object({
  name: z.string().min(1, 'Nama brand wajib diisi'),
  logo: z
  .union([
    z
      .instanceof(File)
      .refine((file) => file.size <= 2 * 1024 * 1024, 'Maksimal 2MB')
      .refine(
        (file) =>
          ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'].includes(file.type),
        'Format tidak valid (jpeg, png, jpg, gif, svg saja)'
      ),
    z.null(),
    z.undefined(),
  ]),
});

export const partnerPutSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Nama brand wajib diisi'),
  logo: z
  .union([
    z
      .instanceof(File)
      .refine((file) => file.size <= 2 * 1024 * 1024, 'Maksimal 2MB')
      .refine(
        (file) =>
          ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'].includes(file.type),
        'Format tidak valid (jpeg, png, jpg, gif, svg saja)'
      ),
    z.null(),
    z.undefined(),
  ]),
})

export type PartnerGetData = z.infer<typeof getSchema>;
export type PartnerStatus = z.infer<typeof itemStatusSchema>;

export const partnerGetSchema = z.array(getSchema);