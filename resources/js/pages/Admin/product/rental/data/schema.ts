import { z } from 'zod'

const productStatusSchema = z.union([
  z.literal('Aktif'),
  z.literal('Nonaktif'),
  z.literal('Dipesan'),
  z.literal('Bertugas')
])
export type ProductStatus = z.infer<typeof productStatusSchema>

const productRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
])

const productSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: productStatusSchema,
  role: productRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Product = z.infer<typeof productSchema>

export const productListSchema = z.array(productSchema)
