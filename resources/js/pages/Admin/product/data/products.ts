import { faker } from '@faker-js/faker'

export const product = Array.from({ length: 20 }, () => {
  return {
    imgUrl: faker.image.url(),
    brand: faker.vehicle.manufacturer(),
    price: Number(faker.commerce.price({ min: 800000, max: 10000000, dec: 2 })),
    driverFee: Number(faker.commerce.price({ min: 200000, max: 800000, dec: 2 })),
    location: faker.location.city(),
    passengerCapacity: faker.number.int({ min: 1, max: 20 }),
    luggageCapacity: faker.number.int({ min: 1, max: 20 }),
    destination: faker.location.city(),
    status: faker.helpers.arrayElement(['Aktif', 'Nonaktif', 'Dipesan', 'Bertugas']),
    role: faker.helpers.arrayElement(['superadmin', 'admin', 'cashier', 'manager']),
    createdAt: new Date(faker.date.past()),
    updatedAt: new Date(faker.date.recent()),
  }
});
