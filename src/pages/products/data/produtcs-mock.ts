import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Camisa',
    description: 'Camisa de algodão',
    price: 49.99,
    image: 'https://placehold.co/600x400/orange/white',
    variants: [
      {
        name: 'Tamanho',
        options: [
          { label: 'P', value: 'p' },
          { label: 'M', value: 'm' },
          { label: 'G', value: 'g' },
        ],
      },
      {
        name: 'Cor',
        options: [
          { label: 'Vermelho', value: 'red' },
          { label: 'Azul', value: 'blue' },
          { label: 'Verde', value: 'green' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Calça',
    description: 'Calça jeans',
    price: 89.99,
    image: 'https://placehold.co/600x400/black/white',
    variants: [
      {
        name: 'Tamanho',
        options: [
          { label: 'P', value: 'p' },
          { label: 'M', value: 'm' },
          { label: 'G', value: 'g' },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Tênis',
    description: 'Tênis esportivo',
    price: 129.99,
    image: 'https://placehold.co/600x400/blue/white',
    variants: [
      {
        name: 'Tamanho',
        options: [
          { label: '40', value: 'p' },
          { label: '41', value: 'm' },
          { label: '42', value: 'g' },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Jaqueta',
    description: 'Jaqueta de couro',
    price: 199.99,
    image: 'https://placehold.co/600x400/yellow/white',
  },
  {
    id: 5,
    name: 'Boné',
    description: 'Boné de aba reta',
    price: 29.99,
    image: 'https://placehold.co/600x400/red/white',
    variants: [
      {
        name: 'Cor',
        options: [
          { label: 'Preto', value: 'black' },
          { label: 'Branco', value: 'white' },
          { label: 'Rosa', value: 'pink' },
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'Relógio',
    description: 'Relógio de pulso',
    price: 399.99,
    image: 'https://placehold.co/600x400/brown/black',
  },
];
