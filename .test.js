// productController.test.js

const fs = require('fs');
const {
  createProduct,
  getAllProducts,
  // ... other imports
} = require('./controllers/productController');

describe('Product Management', () => {
  let merchants;

  beforeEach(() => {
    merchants = [
      {
        id: 'merchant1',
        products: [
          {
            productId: 'product1',
            name: 'Product 1',
            description: 'Description 1',
            price: 10.99,
            addedDate: new Date().toISOString(),
          },
        ],
      },
    ];
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockReadFileSync = jest.spyOn(fs, 'readFileSync');
  const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync');

  test('creates a new product', () => {
    const req = {
      params: { merchantId: 'merchant1' },
      body: {
        productId: 'product2',
        name: 'Product 2',
        description: 'Description 2',
        price: 15.99,
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    createProduct(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: expect.any(String),
        name: 'Product 2',
        description: 'Description 2',
        price: 15.99,
      })
    );
    expect(mockWriteFileSync).toHaveBeenCalled();
  });

  test('returns all products for a merchant', () => {
    const req = { params: { merchantId: 'merchant1' } };
    const res = { json: jest.fn(), status: jest.fn() };

    getAllProducts(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        {
          addedDate: expect.any(String),
          description: expect.any(String),
          name: expect.any(String),
          price: expect.any(Number),
          productId: expect.any(String),
        },
      ])
    );
  });
});


