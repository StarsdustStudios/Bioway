import { faker } from '@faker-js/faker'

export const cms = Array.from({ length: 20 }, () => {
  return {
    title: faker.lorem.sentence(3),
    thumbnailImg: faker.image.url(),
    category: faker.helpers.arrayElement(['Artikel', 'Berita']),
    isShown: faker.helpers.arrayElement(['Ya', 'Tidak']),
    views: Number(faker.commerce.price({ min: 100000, max: 800000, dec: 2 })),
    createdAt: new Date(faker.date.past()),
    updatedAt: new Date(faker.date.recent()),
  }
});
