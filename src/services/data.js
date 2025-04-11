//Server url
/**
 * Incase the server url changes we just have one place to change it
 */
// export const SERVER_URL = import.meta.env.VITE_BASE_URL;
// console.log(SERVER_URL);
export const SERVER_URL = 'https://exact-connect-latest.onrender.com';
// Mock orders data for development
export const mockOrders = [
    {
      id: 'ORD-001',
      date: '2025-04-01',
      product: 'Premium Proxy Package',
      category: 'Proxies',
      quantity: 10,
      amount: '59.99',
      status: 'completed'
    },
    {
      id: 'ORD-002',
      date: '2025-03-25',
      product: 'High-Speed VPS',
      category: 'VPS Server',
      quantity: 1,
      amount: '29.95',
      status: 'processing'
    },
    {
      id: 'ORD-003',
      date: '2025-03-15',
      product: 'Design Template Bundle',
      category: 'PSD Templates',
      quantity: 5,
      amount: '45.50',
      status: 'completed'
    },
    {
      id: 'ORD-004',
      date: '2025-02-28',
      product: 'Virtual Phone Numbers',
      category: 'Non-VOIP NUMBERS',
      quantity: 3,
      amount: '12.75',
      status: 'pending'
    }
  ];