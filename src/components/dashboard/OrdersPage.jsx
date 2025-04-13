import { useState, useRef, useEffect } from 'react';
import { Calendar, Download, Filter, Printer, Search, Info, Wifi, Globe, Clock, Check, AlertCircle, ArrowDownUp, History } from 'lucide-react';
import { useDashboard } from "./DashboardContext";
import { toast } from 'sonner';
import { getReliableCustomerId } from '@/lib/userDetails';
import { SERVER_URL } from '@/services/data';

// Theme color
const themeColor = "#804fc2";

const OrdersPage = () => {
  const { user, stats, setStats } = useDashboard();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const [activeView, setActiveView] = useState("active");
  const [noOrdersFound, setNoOrdersFound] = useState(false);

  // Calculate days remaining in lease
  const calculateDaysRemaining = (endTimestamp) => {
    if (!endTimestamp) return 0;
    const now = new Date().getTime();
    const end = new Date(parseInt(endTimestamp)).getTime();
    const daysRemaining = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
    return daysRemaining;
  };

  // Fetch orders directly in OrdersPage
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.customerId) {
        setError("No customer ID found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const customerId = user.customerId || getReliableCustomerId();
        
        if (!customerId) {
          setError("Customer ID not available. Please log in again.");
          setLoading(false);
          return;
        }

        console.log(`Fetching orders for customer: ${customerId}`);
        
        // Fetch orders directly
        const ordersResponse = await fetch(`${SERVER_URL}/orders/search?customerId=${customerId}`);
        
        if (!ordersResponse.ok) {
          throw new Error(`Could not fetch your orders. Server returned: ${ordersResponse.status} ${ordersResponse.statusText}`);
        }
        
        const ordersData = await ordersResponse.json();
        
        console.log("Orders data received:", ordersData);
        
        if (!ordersData || !ordersData.content || ordersData.content.length === 0) {
          // API successfully returned but no data found
          setOrders([]);
          setFilteredOrders([]);
          setNoOrdersFound(true);
          toast.info("No active proxies found for your account.");
        } else {
          // Ensure ordersData.content is an array before using it
          const ordersArray = Array.isArray(ordersData.content) ? ordersData.content : [];
          
          console.log("Processed orders array:", ordersArray);
          
          // Update local state
          setOrders(ordersArray);
          setFilteredOrders(ordersArray);
          setNoOrdersFound(false);
          
          // Only update stats if ordersArray has items
          if (ordersArray.length > 0) {
            // Update stats in context with order information
            const ordersByCategory = ordersArray.reduce((acc, order) => {
              const category = (order.product?.category || '').toLowerCase();
              acc[category] = (acc[category] || 0) + 1;
              return acc;
            }, {});
            
            const totalSpent = ordersArray.reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0).toFixed(2);
            
            setStats(prev => ({
              ...prev,
              productsByCategory: {
                proxies: ordersByCategory.proxies || ordersArray.length, // Default all to proxies if no category
                vps: ordersByCategory['vps server'] || 0,
                templates: ordersByCategory['psd templates'] || 0,
                nonVoip: ordersByCategory['non-voip numbers'] || 0,
                vcc: ordersByCategory.vcc || 0
              },
              totalSpent,
              totalProducts: ordersArray.length
            }));
          } else {
            setNoOrdersFound(true);
            toast.info("No active proxies found for your account.");
          }
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message || "Could not fetch your orders. Please try again later.");
        toast.error("Failed to load orders");
        setOrders([]);
        setFilteredOrders([]);
        setNoOrdersFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, setStats]);

  // Handle search
  useEffect(() => {
    // Ensure orders is an array before filtering
    if (!Array.isArray(orders)) {
      setFilteredOrders([]);
      return;
    }
    
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => {
        const orderData = order.orderData || {};
        return (
          orderData.PROXY_ID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          orderData.ISP?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          orderData.LOCATION_CITY?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          orderData.LOCATION_REGION?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          orderData.IP?.includes(searchTerm) ||
          order.externalOrderId?.includes(searchTerm)
        );
      });
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  // Format date from timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Apply date filters
  const applyDateFilters = () => {
    // Ensure orders is an array before filtering
    if (!Array.isArray(orders)) {
      return;
    }
    
    const startDate = startDateRef.current?.value ? new Date(startDateRef.current.value).getTime() : null;
    const endDate = endDateRef.current?.value ? new Date(endDateRef.current.value).getTime() : null;
    
    if (!startDate && !endDate) {
      setFilteredOrders(orders);
      return;
    }
    
    const filtered = orders.filter(order => {
      const orderData = order.orderData || {};
      const leaseStartDate = orderData.LEASE_START_DATE ? parseInt(orderData.LEASE_START_DATE) : null;
      const leaseEndDate = orderData.LEASE_VALID_UNTIL ? parseInt(orderData.LEASE_VALID_UNTIL) : null;
      
      return (!startDate || (leaseStartDate && leaseStartDate >= startDate)) && 
             (!endDate || (leaseEndDate && leaseEndDate <= endDate));
    });
    
    setFilteredOrders(filtered);
    setShowFilters(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    if (startDateRef.current) startDateRef.current.value = '';
    if (endDateRef.current) endDateRef.current.value = '';
    setFilteredOrders(Array.isArray(orders) ? orders : []);
    setSearchTerm('');
  };
  
  // Generate PDF report
  const generatePdfReport = (ordersList = filteredOrders) => {
    // Ensure ordersList is an array
    const safeOrdersList = Array.isArray(ordersList) ? ordersList : [];
    
    // Dynamic import of jsPDF and jspdf-autotable
    import('jspdf').then(({ default: jsPDF }) => {
      import('jspdf-autotable').then(({ default: autoTable }) => {
        const doc = new jsPDF();
        
        // Get filter dates
        const startDate = startDateRef.current?.value || '';
        const endDate = endDateRef.current?.value || '';
        
        // Convert theme color from hex to RGB
        const r = parseInt(themeColor.slice(1, 3), 16);
        const g = parseInt(themeColor.slice(3, 5), 16);
        const b = parseInt(themeColor.slice(5, 7), 16);
        
        // Add Report Header with theme branding
        doc.setFillColor(r, g, b); // Theme color
        doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('EXACTCONNECT', 15, 20);
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('Proxies Report', 15, 30);
        
        // Add customer details
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Customer: ${user?.name || ''} (${user?.customerId || 'N/A'})`, 15, 50);
        
        // Add filter date range if specified
        if (startDate && endDate) {
          doc.text(`Lease Period: ${startDate} to ${endDate}`, 15, 58);
        } else {
          doc.text(`${activeView === 'active' ? 'Active Proxies' : activeView === 'expired' ? 'Expired Proxies' : 'All Proxies'}`, 15, 58);
        }
        
        // Generate current date for the report
        const reportDate = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.text(`Report Generated: ${reportDate}`, 15, 66);
        
        // Add orders table
        autoTable(doc, {
          startY: 75,
          head: [['Proxy ID', 'IP Address', 'Location', 'ISP', 'Connection', 'Start Date', 'End Date', 'Status']],
          body: safeOrdersList.map(order => {
            const orderData = order.orderData || {};
            const daysRemaining = calculateDaysRemaining(orderData.LEASE_VALID_UNTIL);
            const isExpired = daysRemaining === 0;
            const status = isExpired ? 'Expired' : `${daysRemaining} days remaining`;
            
            return [
              orderData.PROXY_ID || order.externalOrderId || 'N/A',
              orderData.IP || 'N/A',
              `${orderData.LOCATION_CITY || ''}, ${orderData.LOCATION_REGION || ''} (${orderData.LOCATION_COUNTRY_CODE || 'N/A'})`,
              orderData.ISP || 'N/A',
              orderData.CONNECTIVITY || 'N/A',
              formatDate(orderData.LEASE_START_DATE),
              formatDate(orderData.LEASE_VALID_UNTIL),
              status
            ];
          }),
          styles: {
            cellPadding: 3,
            fontSize: 10,
            valign: 'middle',
            overflow: 'linebreak',
            lineWidth: 0.1,
            lineColor: [0, 0, 0]
          },
          headStyles: {
            fillColor: [r, g, b], // Theme color
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'left'
          },
          alternateRowStyles: {
            fillColor: [240, 240, 250]
          },
          margin: { top: 75 }
        });
        
        // Add footer with ExactConnect branding
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text('ExactConnect - Your Trusted Proxy Provider', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
          doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 15, doc.internal.pageSize.height - 10, { align: 'right' });
        }
        
        // Save the PDF
        doc.save(`exactconnect_proxies_${user?.customerId || 'unknown'}_${activeView}.pdf`);
      });
    });
  };
  
  // Helper function to render proxy content based on status
  const renderProxiesContent = (proxies, title, isLoading, errorMessage) => {
    // Ensure proxies is an array
    const safeProxies = Array.isArray(proxies) ? proxies : [];
    
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          ))}
        </div>
      );
    }
    
    if (errorMessage) {
      return (
        <div className="relative w-full rounded-lg border p-4 border-destructive/50 text-destructive">
          <AlertCircle className="h-4 w-4 absolute left-4 top-4 text-destructive" />
          <h5 className="mb-1 font-medium leading-none tracking-tight pl-7">Error</h5>
          <div className="text-sm pl-7">{errorMessage}</div>
        </div>
      );
    }
    
    if (noOrdersFound || safeProxies.length === 0) {
      return (
        <div className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg p-6 text-center">
          <Info className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <p className="text-lg font-medium">No active proxies found</p>
          <p className="text-sm mt-2">
            Please check your email (including your spam folder) for your proxy details.
          </p>
          <p className="text-sm mt-3">
            If you still can't find your order information, please contact our support team.
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-800">{title} ({safeProxies.length})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {safeProxies.map((proxy, index) => {
            const orderData = proxy.orderData || {};
            const daysRemaining = calculateDaysRemaining(orderData.LEASE_VALID_UNTIL);
            const isExpired = daysRemaining === 0;
            const isExpiringSoon = daysRemaining <= 3 && !isExpired;
            
            return (
              <div 
                key={index} 
                className={`border rounded-lg p-4 transition-shadow hover:shadow-md ${
                  isExpired ? 'bg-red-50 border-red-200' : 
                  isExpiringSoon ? 'bg-yellow-50 border-yellow-200' : 
                  'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold" style={{ color: themeColor }}>
                    {orderData.PROXY_ID || proxy.externalOrderId || 'Unknown Proxy'}
                  </h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    orderData.CONNECTIVITY?.toLowerCase() === 'cell' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {orderData.CONNECTIVITY || 'Unknown'} Connection
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">IP:</span>
                    <span className="ml-2 font-mono">{orderData.IP || 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Wifi className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">ISP:</span>
                    <span className="ml-2">{orderData.ISP || 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Info className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Location:</span>
                    <span className="ml-2">
                      {orderData.LOCATION_CITY ? 
                        `${orderData.LOCATION_CITY}, ${orderData.LOCATION_REGION} (${orderData.LOCATION_COUNTRY_CODE})` 
                        : 'Unknown'}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Lease Period:</span>
                    <span className="ml-2">
                      {formatDate(orderData.LEASE_START_DATE)} - {formatDate(orderData.LEASE_VALID_UNTIL)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <div>
                    {isExpired ? (
                      <span className="text-red-600 text-sm font-medium flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Expired
                      </span>
                    ) : isExpiringSoon ? (
                      <span className="text-yellow-600 text-sm font-medium flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
                      </span>
                    ) : (
                      <span className="text-green-600 text-sm font-medium flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
                      </span>
                    )}
                  </div>
                  
                  <div className="space-x-1">
                    {orderData.RENEWABLE === "true" && (
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                        Renewable
                      </span>
                    )}
                    {orderData.AUTO_RENEWABLE === "true" && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Auto-Renew
                      </span>
                    )}
                    {orderData.REFUNDABLE === "true" && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Refundable
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Filter orders based on active tab
  const getFilteredOrdersByStatus = () => {
    // Ensure filteredOrders is an array before filtering
    if (!Array.isArray(filteredOrders)) {
      console.warn("filteredOrders is not an array:", filteredOrders);
      return [];
    }
    
    if (activeView === 'active') {
      return filteredOrders.filter(order => {
        const orderData = order.orderData || {};
        return calculateDaysRemaining(orderData.LEASE_VALID_UNTIL) > 0;
      });
    } else if (activeView === 'expired') {
      return filteredOrders.filter(order => {
        const orderData = order.orderData || {};
        return calculateDaysRemaining(orderData.LEASE_VALID_UNTIL) === 0;
      });
    }
    return filteredOrders;
  };

  // Safely get display orders
  const displayOrders = getFilteredOrdersByStatus();

  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold" style={{ color: themeColor }}>Your Proxies</h1>
          
          <div className="flex flex-wrap gap-3 items-center">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filter by Date
            </button>
            
            <button 
              onClick={() => generatePdfReport(displayOrders)}
              className="px-4 py-2 rounded-md text-white hover:opacity-90 flex items-center gap-2"
              style={{ backgroundColor: themeColor }}
              disabled={loading || displayOrders.length === 0}
            >
              <Download className="h-4 w-4" />
              Download Report
            </button>
            
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2"
              disabled={loading || displayOrders.length === 0}
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>
        
        {/* Email notification alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-blue-800">
          <h3 className="text-md font-medium mb-2 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Important Information
          </h3>
          <p>If you cannot see your proxy details below, please check your email for detailed information about your purchase. Remember to also check your spam or junk folder, as proxy details emails might be filtered there.</p>
        </div>
        
        {/* Filter panel */}
        {showFilters && (
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Filter Proxies by Lease Date</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Lease Start Date
                </label>
                <input
                  type="date"
                  ref={startDateRef}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ outlineColor: themeColor }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Lease End Date
                </label>
                <input
                  type="date"
                  ref={endDateRef}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ outlineColor: themeColor }}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={resetFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Reset
              </button>
              <button 
                onClick={applyDateFilters}
                className="px-4 py-2 text-sm font-medium text-white rounded-md hover:opacity-90"
                style={{ backgroundColor: themeColor }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent" 
            placeholder="Search proxies by ID, IP, location or ISP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ outlineColor: themeColor }}
          />
        </div>
        
        {/* Customer info box */}
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Customer ID:</p>
              <p className="text-md font-medium">{user?.customerId || 'Not available'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Name:</p>
              <p className="text-md font-medium">{user?.name || 'Not available'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email:</p>
              <p className="text-md font-medium">{user?.email || 'Not available'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Proxies:</p>
              <p className="text-md font-medium">
                {Array.isArray(orders) ? orders.filter(order => calculateDaysRemaining(order.orderData?.LEASE_VALID_UNTIL) > 0).length : 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Expired Proxies:</p>
              <p className="text-md font-medium">
                {Array.isArray(orders) ? orders.filter(order => calculateDaysRemaining(order.orderData?.LEASE_VALID_UNTIL) === 0).length : 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Proxies:</p>
              <p className="text-md font-medium">{Array.isArray(orders) ? orders.length : 0}</p>
            </div>
          </div>
        </div>
        
        {/* Tabs for Active and Expired Proxies */}
        <div className="mb-6">
          <div className="grid grid-cols-3 w-full max-w-md mb-4 inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <button 
              onClick={() => setActiveView("active")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${activeView === "active" ? "bg-background text-foreground shadow-sm" : ""}`}
            >
              <Check className="h-4 w-4 mr-1" />
              Active Proxies
            </button>
            <button 
              onClick={() => setActiveView("expired")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${activeView === "expired" ? "bg-background text-foreground shadow-sm" : ""}`}
            >
              <History className="h-4 w-4 mr-1" />
              Expired Proxies
            </button>
            <button 
              onClick={() => setActiveView("all")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${activeView === "all" ? "bg-background text-foreground shadow-sm" : ""}`}
            >
              <ArrowDownUp className="h-4 w-4 mr-1" />
              All Proxies
            </button>
          </div>
          
          {/* Content based on active tab */}
          <div className="mt-0">
            {renderProxiesContent(
              activeView === "active" 
                ? (Array.isArray(orders) ? orders.filter(order => calculateDaysRemaining(order.orderData?.LEASE_VALID_UNTIL) > 0) : [])
                : activeView === "expired"
                ? (Array.isArray(orders) ? orders.filter(order => calculateDaysRemaining(order.orderData?.LEASE_VALID_UNTIL) === 0) : [])
                : orders,
              activeView === "active" ? "Active Proxies" : activeView === "expired" ? "Expired Proxies" : "All Proxies",
              loading,
              error
            )}
          </div>
        </div>
        
        {/* Proxy Connection Details */}
        {displayOrders.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Connection Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md bg-white p-4">
                <h4 className="text-md font-medium mb-2" style={{ color: themeColor }}>SOCKS5 Connection</h4>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="font-medium w-20">SOCK IP:</span>
                    <code className="px-2 py-1 bg-gray-100 rounded font-mono">
                      {displayOrders[0]?.orderData?.SOCK_IP || 'N/A'}
                    </code>
                  </div>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="font-medium w-20">SOCK PORT:</span>
                    <code className="px-2 py-1 bg-gray-100 rounded font-mono">
                      {displayOrders[0]?.orderData?.SOCK_PORT || 'N/A'}
                    </code>
                  </div>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="font-medium w-20">SOCK USER:</span>
                    <code className="px-2 py-1 bg-gray-100 rounded font-mono">
                      {displayOrders[0]?.orderData?.PROXY_ID || displayOrders[0]?.externalOrderId || 'N/A'}
                    </code>
                  </div>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="font-medium w-20">SOCK PASS:</span>
                    <code className="px-2 py-1 bg-gray-100 rounded font-mono">
                      {displayOrders[0]?.orderData?.PROXY_PASSWORD || 'proxy-password'}
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md bg-white p-4">
                <h4 className="text-md font-medium mb-2" style={{ color: themeColor }}>HTTP Connection</h4>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="font-medium w-20">Host:</span>
                    <code className="px-2 py-1 bg-gray-100 rounded font-mono">
                      {displayOrders[0]?.orderData?.HOST || displayOrders[0]?.orderData?.IP || 'N/A'}
                    </code>
                  </div>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="font-medium w-20">Port:</span>
                    <code className="px-2 py-1 bg-gray-100 rounded font-mono">8080</code>
                  </div>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="font-medium w-20">Username:</span>
                    <code className="px-2 py-1 bg-gray-100 rounded font-mono">
                      {displayOrders[0]?.orderData?.PROXY_ID || displayOrders[0]?.externalOrderId || 'N/A'}
                    </code>
                  </div>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="font-medium w-20">Password:</span>
                    <code className="px-2 py-1 bg-gray-100 rounded font-mono">
                      {displayOrders[0]?.orderData?.PROXY_PASSWORD || 'proxy-password'}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;