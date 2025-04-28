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
    })
  ),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})



export const tourPostSchema = z.object({
  start: z.coerce.number().min(1, "Start value is required"),
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  tour_image: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file.size <= 2 * 1024 * 1024, "Maksimal 2MB")
        .refine(
          (file) =>
            [
              "image/jpeg",
              "image/png",
              "image/jpg",
              "image/gif",
              "image/svg+xml",
              "image/webp",
            ].includes(file.type),
          "Format tidak valid (jpeg, png, jpg, gif, svg, webp saja)"
        ),
      z.null(),
      z.undefined(),
    ])
    .optional(),
  passenger: z.coerce.number().min(1, "Passenger count is required"),
  luggage: z.coerce.number().min(0, "Luggage count must be a non-negative number"),
  location_id: z
    .array(z.coerce.number().min(1, "Invalid location selected"))
    .nonempty("At least one location must be selected"),
});

export type TourPostData = z.infer<typeof tourPostSchema>;



export type TourGetData = z.infer<typeof tourSchema>;

export const tourListSchema = z.array(tourSchema);
