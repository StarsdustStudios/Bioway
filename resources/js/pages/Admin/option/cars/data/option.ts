import { faker } from '@faker-js/faker'

export const optionData = Array.from({ length: 20 }, () => {
  return {
    name: faker.vehicle.manufacturer(),
    model: faker.vehicle.manufacturer(),
    brand: faker.vehicle.manufacturer(),
    logoImg: faker.image.url(),
    carImg: faker.image.url(),
    createdAt: new Date(faker.date.past()),
    updatedAt: new Date(faker.date.recent()),
  }
});
