import { z } from 'zod'

const productStatusSchema = z.union([
  z.literal('Aktif'),
  z.literal('Nonaktif'),
  z.literal('Dipesan'),
  z.literal('Bertugas')
]);

const productRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
]);

const productSchema = z.object({
  imgUrl: z.string().url(),
  brand: z.string(),
  price: z.coerce.number().positive(),
  driverFee: z.coerce.number().positive(),
  location: z.string(),
  passengerCapacity: z.coerce.number().positive(),
  luggageCapacity: z.coerce.number().positive(),
  status: productStatusSchema,
  destination: z.string(),
  role: productRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductStatus = z.infer<typeof productStatusSchema>;

export const productListSchema = z.array(productSchema);


