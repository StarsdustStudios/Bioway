import { z } from 'zod'

const itemStatusSchema = z.union([
  z.literal('Aktif'),
  z.literal('Nonaktif'),
  z.literal('Dipesan'),
  z.literal('Bertugas')
]);

export const carSchema = z.object({
  id: z.number(),
  model: z.string(),
  brand_id: z.coerce.number(),
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
  cars: z.array(z.any()),
})

export const carPostSchema = z.object({
  model: z.string().min(1, 'Model wajib diisi'),
  brand_id: z.coerce.number().min(1, "Brand is required"),
  car_image:z
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
});

export type CarGetData = z.infer<typeof carSchema>;
export type OptionStatus = z.infer<typeof itemStatusSchema>;

export const carListSchema = z.array(carSchema);
export const brandListSchema = z.array(brandSchema);