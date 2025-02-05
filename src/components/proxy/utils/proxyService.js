import { SERVER_URL } from '../../../services/data';

export const fetchProxyData = async (page, countryCode) => {
  try {
    const url = `${SERVER_URL}/products/proxy/details/global-config?pageNum=${page}&cc=${countryCode ? `&countryCode=${countryCode}` : ''
      }`;
    const response = await fetch(url);
    // console.log(countryCode);
    if (!response.ok) throw new Error('Failed to fetch proxies');
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An error occurred');
  }
};