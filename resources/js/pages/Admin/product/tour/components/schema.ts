import { z } from 'zod'

export const locationSchema = z.object({
  id: z.coerce.number(),
  city_name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});


export const tourSchema = z.object({
  id: z.number(),
  start: z.coerce.number(),
  title: z.string(),
  desc: z.string(),
  price: z.coerce.number(),
  tour_image: z.string(),
  passenger: z.coerce.number(),
  luggage: z.coerce.number(),
  locations: z.array(
    z.object({
      id: z.coerce.number(),
      city_name: z.string(),
      created_at: z.coerce.date(),
      updated_at: z.coerce.date(),
      pivot: z.object({
        tour_id: z.coerce.number(),
        location_id: z.coerce.number(),
        id: z.coerce.number(),
      }),
    })
  ),  
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export const tourPostSchema = z.object({
  start: z.coerce.number(),
  title: z.string(),
  desc: z.string(),
  price: z.coerce.number(),
  tour_image: z
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
  passenger: z.coerce.number(),
  luggage: z.coerce.number(),
  pivots: z.array(z.coerce.number()),
});

export type TourGetData = z.infer<typeof tourSchema>;

export const tourListSchema = z.array(tourSchema);
