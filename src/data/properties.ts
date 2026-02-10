export interface Property {
  id: string;
  name: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  status: 'For Sale' | 'Sold';
  mlsUrl?: string;
}

export const properties: Property[] = [
  {
    id: '1',
    name: 'Cozy Lakefront Cottage',
    address: '1234 Lakeshore Dr, Windermere, FL 34786',
    price: '$285,000',
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80',
    status: 'For Sale' as const,
  },
{
  id: '2',
  name: 'Modern Downtown Condo',
  address: '456 City Center Ave, Orlando, FL 32801',
  price: '$195,000',
  beds: 2,
  baths: 2,
  sqft: 1200,
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
  status: 'For Sale' as const,
},
{
  id: '3',
  name: 'Winter Park Starter Home',
  address: '789 Park Ave, Winter Park, FL 32789',
  price: '$275,000',
  beds: 3,
  baths: 2,
  sqft: 1600,
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
  status: 'For Sale' as const,
},
{
  id: '4',
  name: 'Lake Nona Townhome',
  address: '321 Innovation Way, Orlando, FL 32827',
  price: '$295,000',
  beds: 3,
  baths: 2,
  sqft: 1650,
  image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=80',
    status: 'For Sale' as const,
  },
{
  id: '5',
  name: 'Historic College Park Bungalow',
  address: '567 Edgewater Dr, Orlando, FL 32804',
  price: '$245,000',
  beds: 2,
  baths: 1,
  sqft: 1200,
  image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80',
    status: 'For Sale' as const,
  },
{
  id: '6',
  name: 'Golf Course Condo',
    address: '890 Fairway Ln, Isleworth, FL 34786',
    price: '$215,000',
    beds: 2,
    baths: 2,
    sqft: 1400,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=80',
    status: 'For Sale' as const,
  },
{
  id: "7",
  name: "Stylish Downtown Loft",
    address: "123 Orange Ave, Orlando, FL 32801",
    price: '$165,000',
    beds: 1,
    baths: 1,
    sqft: 850,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
    status: 'For Sale' as const,
  },
{
  id: "8",
  name: "Family-Friendly Suburban Home",
    address: "456 Oak Tree Ln, Oviedo, FL 32765",
    price: '$285,000',
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
    status: 'For Sale' as const,
  },
{
  id: "9",
  name: "Waterfront Condo",
    address: "789 Marina Way, Orlando, FL 32839",
    price: '$225,000',
    beds: 2,
    baths: 2,
    sqft: 1250,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=80",
    status: 'For Sale' as const,
  },
];
