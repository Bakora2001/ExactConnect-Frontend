import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Calendar, Download, Filter, Printer, Search } from 'lucide-react';
import { userDetails, customerId } from '../../../lib/userDetails';
import { SERVER_URL } from '../../../services/data';

// Add jspdf and jspdf-autotable as dependencies
{/* <lov-add-dependency>jspdf@latest</lov-add-dependency>
<lov-add-dependency>jspdf-autotable@latest</lov-add-dependency> */}

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  
  // Theme color
  const themeColor = "#804fc2";
  const themeColorLight = "#804fc220"; // 20% opacity for lighter background

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      if (!customerId) {
        setError("No customer ID found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${SERVER_URL}/orders/search?customerId=${customerId}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => 
        order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  // Apply date filters
  const applyDateFilters = () => {
    const startDate = startDateRef.current?.value;
    const endDate = endDateRef.current?.value;
    
    if (!startDate && !endDate) {
      setFilteredOrders(orders);
      return;
    }
    
    const filtered = orders.filter(order => {
      const orderDate = order.date;
      return (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);
    });
    
    setFilteredOrders(filtered);
    setShowFilters(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    if (startDateRef.current) startDateRef.current.value = '';
    if (endDateRef.current) endDateRef.current.value = '';
    setFilteredOrders(orders);
    setSearchTerm('');
  };
  
  // Generate PDF report
  const generatePdfReport = () => {
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
        doc.text('Orders Report', 15, 30);
        
        // Add customer details
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Customer: ${userDetails.firstName || ''} ${userDetails.lastName || ''} (${customerId})`, 15, 50);
        
        // Add filter date range if specified
        if (startDate && endDate) {
          doc.text(`Date Range: ${startDate} to ${endDate}`, 15, 58);
        } else {
          doc.text('All Orders', 15, 58);
        }
        
        // Generate current date for the report
        const reportDate = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.text(`Report Generated: ${reportDate}`, 15, 66);
        
        // Add orders table
        autoTable(doc, {
          startY: 75,
          head: [['Order ID', 'Date', 'Product', 'Category', 'Quantity', 'Amount', 'Status']],
          body: filteredOrders.map(order => [
            order.id,
            order.date,
            order.product,
            order.category,
            order.quantity,
            `$${parseFloat(order.amount).toFixed(2)}`,
            order.status.charAt(0).toUpperCase() + order.status.slice(1)
          ]),
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
        
        // Calculate total
        const totalAmount = filteredOrders.reduce((sum, order) => sum + parseFloat(order.amount), 0);
        
        // Add total
        const finalY = doc.lastAutoTable.finalY || 75;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 150, finalY + 15, { align: 'right' });
        
        // Add footer with ExactConnect branding
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text('ExactConnect - Your Trusted Service Provider', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
          doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 15, doc.internal.pageSize.height - 10, { align: 'right' });
        }
        
        // Save the PDF
        doc.save(`exactconnect_orders_${customerId}.pdf`);
      });
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold" style={{ color: themeColor }}>Your Orders</h1>
          
          <div className="flex flex-wrap gap-3 items-center">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filter Dates
            </button>
            
            <button 
              onClick={generatePdfReport}
              className="px-4 py-2 rounded-md text-white hover:opacity-90 flex items-center gap-2"
              style={{ backgroundColor: themeColor }}
              disabled={loading || filteredOrders.length === 0}
            >
              <Download className="h-4 w-4" />
              Download Report
            </button>
            
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2"
              disabled={loading || filteredOrders.length === 0}
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>
        
        {/* Filter panel */}
        {showFilters && (
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Filter Orders by Date</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Start Date
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
                  End Date
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
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ outlineColor: themeColor }}
          />
        </div>
        
        {/* Customer info box */}
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Customer ID:</p>
              <p className="text-md font-medium">{customerId || 'Not available'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Name:</p>
              <p className="text-md font-medium">
                {userDetails.firstName || ''} {userDetails.lastName || ''}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email:</p>
              <p className="text-md font-medium">{userDetails.email || 'Not available'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders:</p>
              <p className="text-md font-medium">{filteredOrders.length}</p>
            </div>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="text-white" style={{ backgroundColor: themeColor }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                // Loading state
                [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    {[...Array(7)].map((_, colIndex) => (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                        <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : error ? (
                // Error state
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-red-500">
                    Error loading orders: {error}
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                // Empty state
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No orders found. {searchTerm ? 'Try adjusting your search.' : 'You have not made any purchases yet.'}
                  </td>
                </tr>
              ) : (
                // Data state
                filteredOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.category === 'Proxies' 
                          ? 'bg-blue-100 text-blue-800' 
                          : order.category === 'VPS Server'
                            ? 'bg-green-100 text-green-800'
                            : order.category === 'PSD Templates'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.category === 'Non-VOIP NUMBERS'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-purple-100 text-purple-800'
                      }`}>
                        {order.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${parseFloat(order.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Total amount display */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 text-right">
            <p className="text-lg font-bold" style={{ color: themeColor }}>
              Total Amount: ${filteredOrders.reduce((sum, order) => sum + parseFloat(order.amount), 0).toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;