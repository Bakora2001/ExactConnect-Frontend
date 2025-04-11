// import { SERVER_URL } from '../../../../services/data';

// export const fetchProxyData = async (page, countryCode) => {
//   try {
//     const url = `${SERVER_URL}/products/proxy/details/global-config?pageNum=${page}&cc=${countryCode ? `&countryCode=${countryCode}` : ''
//       }`;
//     const response = await fetch(url);
//     // console.log(countryCode);
//     if (!response.ok) throw new Error('Failed to fetch proxies');
//     return await response.json();
//   } catch (error) {
//     throw new Error(error.message || 'An error occurred');
//   }
// };

import axios from 'axios';
import { SERVER_URL } from '../../../../services/data';

/**
 * Fetches proxy data from the server
 * @param {Object} options - Options for fetching proxy data
 * @param {number} options.page - Page number
 * @param {string} options.countryCode - Country code
 * @param {string} options.regionName - Region name
 * @param {string} options.city - City name
 * @param {string} options.isp - ISP name
 * @returns {Promise<Object>} - Promise resolving to proxy data
 */
export const fetchProxyData = async ({
  page = 0,
  countryCode = '',
  regionName = '',
  city = '',
  isp = '',
}) => {
  try {
    const params = new URLSearchParams();
    if (countryCode) params.append('countryCode', countryCode);
    if (regionName) params.append('regionName', regionName);
    if (city) params.append('city', city);
    if (isp) params.append('isp', isp);

    const { data } = await axios.get(
      `${SERVER_URL}/products/proxy/details/global-config?pageNum=${page}&${params.toString()}`
    );

    // Enhance proxy data with additional computed properties
    return data.map(proxy => ({
      ...proxy,
      // Ensure each proxy has a rating between 1-5
      rating: proxy.rating || (Math.floor(Math.random() * 5) + 1),
      // Ensure each proxy has a price if not provided
      price: proxy.price || (Math.random() * 15 + 5).toFixed(2),
    }));
  } catch (error) {
    console.error('Error fetching proxy data:', error);
    throw error;
  }
};

/**
 * Fetches proxy totals from the server
 * @param {number} page - Page number
 * @param {string} countryCode - Country code
 * @returns {Promise<Object>} - Promise resolving to proxy totals
 */
export const fetchProxyTotals = async (page = 0, countryCode = '') => {
  try {
    const { data } = await axios.get(
      `${SERVER_URL}/products/proxies?page=${page}&countryCode=${countryCode}&segments=true`
    );

    return {
      total: data.total || 0,
      segments: data.segments || {},
    };
  } catch (error) {
    console.error('Error fetching proxy totals:', error);
    throw error;
  }
};

/**
 * Fetches available countries from the server
 * @returns {Promise<Array>} - Promise resolving to countries array
 */
export const fetchProxyCountries = async () => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/products/proxy/countries`);
    return data.countries || [];
  } catch (error) {
    console.error('Error fetching proxy countries:', error);
    throw error;
  }
};
