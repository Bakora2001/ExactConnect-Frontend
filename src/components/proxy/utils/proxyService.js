import { SERVER_URL } from '../../../services/data';

export const fetchProxyData = async (page, countryCode) => {
  try {
    const url = `${SERVER_URL}/products/proxies?page=${page}${
      countryCode ? `&countryCode=${countryCode}` : ''
    }`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch proxies');
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An error occurred');
  }
};
