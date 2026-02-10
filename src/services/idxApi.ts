// IDX Broker API Service
// Uses the proxy configured in vite.config.ts to avoid CORS issues

const API_BASE = '/api/idx';

export interface Listing {
  listingID: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  acres: number;
  photoCount: number;
  photoUrl: string;
  remarks: string;
  propertyType: string;
  status: string;
  listingAgentID: string;
  listingOfficeID: string;
  listingDate: string;
  modifiedDate: string;
}

export interface SearchParams {
  city?: string;
  state?: string;
  zipcode?: string;
  minPrice?: string;
  maxPrice?: string;
  minBedrooms?: string;
  maxBedrooms?: string;
  minBathrooms?: string;
  maxBathrooms?: string;
  propertyType?: string;
  status?: string;
  page?: number;
  perPage?: number;
}

/**
 * Fetch listings from IDX Broker API
 * Uses the local proxy to avoid CORS issues
 */
export const fetchListings = async (params: SearchParams = {}): Promise<Listing[]> => {
  const queryParams = new URLSearchParams();
  
  // Map our params to IDX API params
  if (params.city) queryParams.set('city', params.city);
  if (params.state) queryParams.set('state', params.state);
  if (params.zipcode) queryParams.set('zipcode', params.zipcode);
  if (params.minPrice) queryParams.set('minprice', params.minPrice);
  if (params.maxPrice) queryParams.set('maxprice', params.maxPrice);
  if (params.minBedrooms) queryParams.set('minbedrooms', params.minBedrooms);
  if (params.maxBedrooms) queryParams.set('maxbedrooms', params.maxBedrooms);
  if (params.minBathrooms) queryParams.set('minbathrooms', params.minBathrooms);
  if (params.maxBathrooms) queryParams.set('maxbathrooms', params.maxBathrooms);
  if (params.propertyType) queryParams.set('propertyType', params.propertyType);
  if (params.status) queryParams.set('status', params.status);
  
  // Pagination
  queryParams.set('page', (params.page || 1).toString());
  queryParams.set('per', (params.perPage || 12).toString());
  
  const url = `${API_BASE}/clients/listings?${queryParams.toString()}`;
  console.log('Fetching listings from:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    // IDX API returns data in different formats depending on the endpoint
    // Handle both array and object responses
    if (Array.isArray(data)) {
      return data.map(normalizeListing);
    } else if (data.data && Array.isArray(data.data)) {
      return data.data.map(normalizeListing);
    } else if (data.results && Array.isArray(data.results)) {
      return data.results.map(normalizeListing);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

/**
 * Fetch a single listing by ID
 */
export const fetchListingById = async (listingId: string): Promise<Listing | null> => {
  const url = `${API_BASE}/clients/listing/${listingId}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return normalizeListing(data);
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
};

/**
 * Normalize listing data from various IDX API formats
 */
const normalizeListing = (data: any): Listing => {
  return {
    listingID: data.listingID || data.ListingId || data.id || '',
    address: data.address || data.Address || data.UnparsedAddress || '',
    city: data.city || data.City || '',
    state: data.state || data.StateOrProvince || 'FL',
    zipcode: data.zipcode || data.PostalCode || '',
    price: parseFloat(data.price || data.ListPrice || data.CurrentPrice || 0),
    bedrooms: parseInt(data.bedrooms || data.BedroomsTotal || data.Beds || 0),
    bathrooms: parseFloat(data.bathrooms || data.BathroomsTotalInteger || data.Baths || 0),
    sqft: parseInt(data.sqft || data.LivingArea || data.SqFt || 0),
    acres: parseFloat(data.acres || data.LotSizeAcres || 0),
    photoCount: parseInt(data.photoCount || data.PhotoCount || 0),
    photoUrl: data.photoUrl || data.PhotoUrl || data.image || '',
    remarks: data.remarks || data.PublicRemarks || data.description || '',
    propertyType: data.propertyType || data.PropertyType || data.Type || 'Residential',
    status: data.status || data.StandardStatus || data.MlsStatus || 'Active',
    listingAgentID: data.listingAgentID || data.ListAgentMlsId || '',
    listingOfficeID: data.listingOfficeID || data.ListOfficeMlsId || '',
    listingDate: data.listingDate || data.OnMarketDate || data.ListingDate || '',
    modifiedDate: data.modifiedDate || data.ModificationTimestamp || '',
  };
};

/**
 * Get the photo URL for a listing
 * IDX Broker uses a specific format for photos
 */
export const getListingPhotoUrl = (listingId: string, photoIndex: number = 0): string => {
  return `https://realestate360.idxbroker.com/idx/media/photos/${listingId}/${photoIndex}`;
};

/**
 * Format price for display
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format square footage
 */
export const formatSqft = (sqft: number): string => {
  return new Intl.NumberFormat('en-US').format(sqft);
};
