import { useState } from 'react';
import { useDashboard } from './DashboardContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  ShoppingCart,
  CreditCard
} from 'lucide-react';

const ProfilePage = () => {
  const { user, stats } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, Country',
    joinDate: '2023-01-15'
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSave = () => {
    // Here you would typically make an API call to update the user profile
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };
  
  const cancelEdit = () => {
    // Reset form data to original values
    setFormData({
      name: user?.name || 'John Doe',
      email: user?.email || 'john@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, Country',
      joinDate: '2023-01-15'
    });
    setIsEditing(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-exactconnect-800 to-exactconnect-600 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center text-exactconnect border-4 border-white">
              <span className="text-4xl sm:text-5xl font-bold">{formData.name.charAt(0)}</span>
            </div>
            
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {formData.name}
              </h1>
              <p className="text-exactconnect-100 flex justify-center sm:justify-start items-center">
                <Mail className="h-4 w-4 mr-2" />
                {formData.email}
              </p>
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm rounded-full">
                  Customer
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm rounded-full">
                  Since {new Date(formData.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>
            
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="ml-auto px-4 py-2 bg-white text-exactconnect rounded-md flex items-center gap-2 hover:bg-opacity-90 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
                  
                  {isEditing && (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={cancelEdit}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={handleSave}
                        className="p-2 text-green-600 hover:text-green-700"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="p-6 space-y-6">
                  {isEditing ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-exactconnect focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-exactconnect focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-exactconnect focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-exactconnect focus:border-transparent"
                        />
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <User className="w-5 h-5 mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Full Name</p>
                          <p className="text-base text-gray-900">{formData.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email Address</p>
                          <p className="text-base text-gray-900">{formData.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone Number</p>
                          <p className="text-base text-gray-900">{formData.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Address</p>
                          <p className="text-base text-gray-900">{formData.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Join Date</p>
                          <p className="text-base text-gray-900">{new Date(formData.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Account Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-exactconnect-100 rounded-full flex items-center justify-center text-exactconnect">
                        <ShoppingCart className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Total Products</p>
                        <p className="text-lg font-semibold text-gray-900">{stats.totalProducts || 0}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-500">Total Spent</p>
                          <p className="text-lg font-semibold text-gray-900">${stats.totalSpent || '0.00'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Products by Category */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Products by Category</h2>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between">
                      <span className="text-gray-700">Proxies</span>
                      <span className="font-semibold text-gray-900">{stats.productsByCategory.proxies || 0}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-gray-700">VPS Servers</span>
                      <span className="font-semibold text-gray-900">{stats.productsByCategory.vps || 0}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-gray-700">PSD Templates</span>
                      <span className="font-semibold text-gray-900">{stats.productsByCategory.templates || 0}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-gray-700">Non-VOIP Numbers</span>
                      <span className="font-semibold text-gray-900">{stats.productsByCategory.nonVoip || 0}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-gray-700">VCC Cards</span>
                      <span className="font-semibold text-gray-900">{stats.productsByCategory.vcc || 0}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;