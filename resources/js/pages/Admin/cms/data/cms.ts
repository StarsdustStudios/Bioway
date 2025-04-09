import { faker } from '@faker-js/faker'

export const cms = Array.from({ length: 20 }, () => {
  const id = faker.string.alphanumeric(3).toUpperCase() + 
                        "-" + 
                        faker.string.numeric(4);
  const imgUrl = faker.image.url()
  const brand = faker.vehicle.manufacturer()
  const price = faker.commerce.price({ min: 800000, max: 10000000, dec: 2 });
  const driverFee = faker.commerce.price({ min: 200000, max: 800000, dec: 2 });
  const location = faker.location.city();
  return {
    id,
    imgUrl,
    brand,
    price,
    driverFee,
    location,
    status: faker.helpers.arrayElement([
      'Aktif',
      'Nonaktif',
      'Dipesan',
      'Bertugas',
    ]),
    role: faker.helpers.arrayElement([
      'superadmin',
      'admin',
      'cashier',
      'manager',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
