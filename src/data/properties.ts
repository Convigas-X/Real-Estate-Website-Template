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

// Array of high-quality Unsplash property images for reliability
const propertyImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
  'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fee74a52?w=800&q=80',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
  'https://images.unsplash.com/photo-1472224311454-fa056b7ad33e?w=800&q=80',
  'https://images.unsplash.com/photo-1513584684032-2979244001b6?w=800&q=80',
  'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&q=80',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80',
  'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
  'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80',
  'https://images.unsplash.com/photo-1512918766671-ad62eb27bd0f?w=800&q=80',
  'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
  'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=800&q=80',
  'https://images.unsplash.com/photo-1430285561322-7808604715df?w=800&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
  'https://images.unsplash.com/photo-1505691722218-269ff0602029?w=800&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da977535?w=800&q=80',
  'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?w=800&q=80',
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
  'https://images.unsplash.com/photo-1501862700950-18382cd41497?w=800&q=80',
  'https://images.unsplash.com/photo-1510254430417-513bc874814d?w=800&q=80',
  'https://images.unsplash.com/photo-1432303496139-c7b5bab9970d?w=800&q=80',
  'https://images.unsplash.com/photo-1472224311454-fa056b7ad33e?w=800&q=80',
  'https://images.unsplash.com/photo-1512915922686-57c11f9ad6b3?w=800&q=80',
  'https://images.unsplash.com/photo-1513584684032-2979244001b6?w=800&q=80',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
  'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fee74a52?w=800&q=80',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
  'https://images.unsplash.com/photo-1472224311454-fa056b7ad33e?w=800&q=80',
  'https://images.unsplash.com/photo-1513584684032-2979244001b6?w=800&q=80',
  'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&q=80',
];

// Florida cities and streets for realistic addresses
const floridaCities = [
  { name: 'Orlando', zip: '32801' },
  { name: 'Orlando', zip: '32803' },
  { name: 'Orlando', zip: '32804' },
  { name: 'Orlando', zip: '32806' },
  { name: 'Orlando', zip: '32814' },
  { name: 'Orlando', zip: '32819' },
  { name: 'Orlando', zip: '32827' },
  { name: 'Orlando', zip: '32836' },
  { name: 'Orlando', zip: '32839' },
  { name: 'Winter Park', zip: '32789' },
  { name: 'Winter Park', zip: '32792' },
  { name: 'Windermere', zip: '34786' },
  { name: 'Winter Garden', zip: '34787' },
  { name: 'Oviedo', zip: '32765' },
  { name: 'Maitland', zip: '32751' },
  { name: 'Altamonte Springs', zip: '32701' },
  { name: 'Kissimmee', zip: '34747' },
  { name: 'Lake Mary', zip: '32746' },
  { name: 'Sanford', zip: '32771' },
  { name: 'Clermont', zip: '34711' },
];

const streetNames = [
  'Lakeshore Dr', 'City Center Ave', 'Park Ave', 'Innovation Way', 'Edgewater Dr',
  'Fairway Ln', 'Orange Ave', 'Oak Tree Ln', 'Marina Way', 'Palm Beach Dr',
  'Lakeview Rd', 'Golden Oak Blvd', 'Thornton Park', 'Audubon Park', 'Butler Chain Dr',
  'Delaney Ave', 'New Broad St', 'Sand Lake Rd', 'Virginia Dr', 'Eola Pkwy',
  'Celebration Blvd', 'Hamlin Groves', 'Maitland Ave', 'Lake Lily Dr', 'Magnolia Ave',
  'Colonial Dr', 'Conroy Rd', 'International Dr', 'Apopka Vineland', 'Turkey Lake Rd',
  'Hiawassee Rd', 'Kirkman Rd', 'John Young Pkwy', 'South St', 'Church St',
  'Central Ave', 'Main St', 'Broadway', 'First St', 'Second Ave',
  'Lake Eola Dr', 'Summerlin Ave', 'Ferncreek Ave', 'Bumby Ave', 'Mills Ave',
  'Corrine Dr', 'Winter Park Rd', 'Fairbanks Ave', 'Holt Ave', 'New England Ave',
];

const propertyTypes = [
  'Luxury Estate', 'Modern Villa', 'Cozy Cottage', 'Downtown Condo', 'Waterfront Home',
  'Golf Course Villa', 'Historic Bungalow', 'Pool Home', 'Garden Home', 'Townhome',
  'Penthouse', 'Lakefront Property', 'Family Home', 'Starter Home', 'Executive Home',
  'Mediterranean Villa', 'Contemporary Home', 'Spanish Revival', 'Craftsman', 'Colonial',
];

// Generate 100 properties with Florida addresses
const generateProperties = (): Property[] => {
  const properties: Property[] = [];
  
  for (let i = 0; i < 100; i++) {
    const city = floridaCities[i % floridaCities.length];
    const street = streetNames[i % streetNames.length];
    const type = propertyTypes[i % propertyTypes.length];
    const streetNumber = 1000 + (i * 111);
    
    // Random property specs
    const beds = Math.floor(Math.random() * 4) + 2; // 2-5 beds
    const baths = Math.floor(Math.random() * 3) + 2; // 2-4 baths
    const sqft = 1200 + (Math.floor(Math.random() * 20) * 100); // 1200-3200 sqft
    const price = 250000 + (Math.floor(Math.random() * 40) * 10000); // $250k-$650k
    
    properties.push({
      id: (i + 1).toString(),
      name: `${type} ${i + 1}`,
      address: `${streetNumber} ${street}, ${city.name}, FL ${city.zip}`,
      price: `$${price.toLocaleString()}`,
      beds,
      baths,
      sqft,
      image: propertyImages[i % propertyImages.length],
      status: 'For Sale' as const,
    });
  }
  
  return properties;
};

export const properties: Property[] = generateProperties();
