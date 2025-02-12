import { SERVER_URL } from '../../../services/data';

export const fetchProxyData = async (page, countryCode) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/products/proxy/details/global-config?pageNum=${page}&countryCode=${countryCode}`,
      {
        method: 'GET',
      }
    );
    if(!response.ok)
      throw new Error('Failed to fetch proxies')
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};
