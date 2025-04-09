import { z } from 'zod'

const cmsStatusSchema = z.union([
  z.literal('Aktif'),
  z.literal('Nonaktif'),
  z.literal('Dipesan'),
  z.literal('Bertugas')
])
export type CmsStatus = z.infer<typeof cmsStatusSchema>

const cmsRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
])

const cmsSchema = z.object({
  id: z.string(),
  imgUrl: z.string().url(),
  brand: z.string(),
  price: z.coerce.number().positive(),
  driverFee: z.coerce.number().positive(),
  location: z.string(),
  status: cmsStatusSchema,
  role: cmsRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Cms = z.infer<typeof cmsSchema>

export const cmsListSchema = z.array(cmsSchema)
