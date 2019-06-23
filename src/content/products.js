import mapleLeaf from '../images/maple-leaf.jpg';

const products = [
  {
    name: 'Maple Syrup',
    mainImage: mapleLeaf,
    description: 'This is some maple syrup',
    sizes: [
      {
        quantity: 'Gallon',
        price: 42,
        image: '',
        featured: true,
      },
      {
        quantity: '1/2 Gallon',
        price: 23,
        image: '',
      },
      {
        quantity: 'Quart',
        price: 14,
        image: '',
      },
      {
        quantity: 'Pint',
        price: 8,
        image: '',
      },
      {
        quantity: '1/2 Pint',
        price: 5,
        image: '',
      },
      {
        quantity: '3.4 Oz',
        price: 3.50,
        image: '',
      },
    ],
  },
  {
    name: 'Maple Cream',
    mainImage: mapleLeaf,
    description: 'This is some maple cream',
    sizes: [
      {
        quantity: 'Pound',
        price: 12,
        image: '',
      },
      {
        quantity: '1/2 Pound',
        price: 7,
        image: '',
        featured: true
      },
    ],
  },
  {
    name: 'Maple Sugar',
    mainImage: mapleLeaf,
    description: 'This is some maple sugar',
    sizes: [
      {
        quantity: 'Pound',
        price: 12,
        image: '',
      },
      {
        quantity: '1/2 Pound',
        price: 8,
        image: '',
        featured: true
      },
    ],
  },
  {
    name: 'Maple Honey',
    mainImage: mapleLeaf,
    description: 'This is some honey',
    sizes: [
      {
        quantity: '5 lb',
        price: 35,
        image: '',
      },
      {
        quantity: '2.5 lb',
        price: 20,
        image: '',
      },
      {
        quantity: '2 lb',
        price: 14,
        image: '',
      },
      {
        quantity: '16 oz',
        price: 8,
        image: '',
      },
      {
        quantity: '8 oz',
        price: 5,
        image: '',
        featured: true
      },
    ],
  },
];

export default products;
