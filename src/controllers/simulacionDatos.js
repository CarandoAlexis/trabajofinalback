import { faker } from '@faker-js/faker';

function generateMockProducts() {
  const mockProducts = [];
  const { commerce, string } = faker;

  for (let i = 1; i <= 100; i++) {
    const product = {
      _id: string.uuid(),
      name: commerce.productName(),
      price: commerce.price(),
      category: commerce.department(),
    };
    mockProducts.push(product);
  }
  return mockProducts;
}

export { generateMockProducts };