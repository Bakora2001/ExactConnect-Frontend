import { useState } from 'react';
import { Globe, RefreshCcw, Check, Search, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProxiesPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [zipCode, setZipCode] = useState('');
  const [zipResults, setZipResults] = useState(null);

  const countries = [
    { id: 'us', name: 'United States', flag: '🇺🇸' },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { id: 'ca', name: 'Canada', flag: '🇨🇦' },
    { id: 'au', name: 'Australia', flag: '🇦🇺' },
    { id: 'de', name: 'Germany', flag: '🇩🇪' },
    { id: 'fr', name: 'France', flag: '🇫🇷' },
    { id: 'jp', name: 'Japan', flag: '🇯🇵' },
    { id: 'br', name: 'Brazil', flag: '🇧🇷' },
  ];

  const handleFetchZipCode = () => {
    // Simulate fetching ZIP code data
    if (zipCode) {
      setZipResults({
        zipCode: zipCode,
        city: "Sample City",
        state: "Sample State",
        country: countries.find(c => c.id === selectedCountry)?.name || "Unknown Country",
        latitude: "40.7128° N",
        longitude: "74.0060° W"
      });
    }
  };

  const proxies = [
    { id: 1, ip: "192.168.1.1", port: 8080, country: "United States", status: "Active", expiresIn: "29 days" },
    { id: 2, ip: "192.168.1.2", port: 8081, country: "United Kingdom", status: "Active", expiresIn: "14 days" },
    { id: 3, ip: "192.168.1.3", port: 8082, country: "Germany", status: "Inactive", expiresIn: "Expired" },
    { id: 4, ip: "192.168.1.4", port: 8080, country: "Canada", status: "Active", expiresIn: "21 days" },
    { id: 5, ip: "192.168.1.5", port: 8443, country: "Australia", status: "Active", expiresIn: "7 days" },
  ];

  return (
    <div className="animate-fade-in space-y-4">
      {/* Sticky Header with Cards - Smaller and with solid background */}
      <div className="sticky top-0 z-10 bg-white pt-2 pb-3 shadow-md">
        {/* Small Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <Card className="shadow-sm">
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Proxies</p>
                <p className="text-lg font-bold">{proxies.length}</p>
              </div>
              <Globe className="h-5 w-5 text-purple-500" />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Spent</p>
                <p className="text-lg font-bold">$149.95</p>
              </div>
              <RefreshCcw className="h-5 w-5 text-amber-500" />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Request Our Services Today!</p>
                <p className="text-xs text-purple-600">Contact support for custom solutions</p>
              </div>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Select Country - Smaller and with solid background */}
        <div className="bg-card border rounded-md p-3">
          <div className="text-sm font-medium mb-2">Select Country</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {countries.map((country) => (
              <div
                key={country.id}
                className={`flex items-center justify-center p-2 rounded-md border cursor-pointer transition-colors ${
                  selectedCountry === country.id 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'hover:bg-secondary'
                }`}
                onClick={() => setSelectedCountry(country.id)}
              >
                <div className="text-center">
                  <div className="text-xl">{country.flag}</div>
                  <div className="text-xs mt-1 font-medium">{country.name}</div>
                  {selectedCountry === country.id && (
                    <div className="mt-1 flex justify-center">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* ZIP Code Lookup */}
      <Card className="shadow-md">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            ZIP Code Location Lookup
          </CardTitle>
          <CardDescription className="text-xs">
            Find geographic information for any ZIP code in the selected country
          </CardDescription>
        </CardHeader>
        <CardContent className="py-3 px-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Enter ZIP code" 
                value={zipCode} 
                onChange={(e) => setZipCode(e.target.value)} 
                className="flex-1"
              />
              <Button onClick={handleFetchZipCode}>
                <Search className="h-4 w-4 mr-2" />
                Lookup
              </Button>
            </div>
            
            {zipResults && (
              <div className="mt-4 border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">Results for {zipResults.zipCode}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">City:</span>
                      <span className="font-medium">{zipResults.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">State:</span>
                      <span className="font-medium">{zipResults.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Country:</span>
                      <span className="font-medium">{zipResults.country}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Latitude:</span>
                      <span className="font-medium">{zipResults.latitude}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Longitude:</span>
                      <span className="font-medium">{zipResults.longitude}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Proxy List */}
      <Card>
        <CardHeader className="py-3 px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">Your Proxies</CardTitle>
              <CardDescription className="text-xs">
                Manage your active proxy connections
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-1 h-8 text-xs">
              <RefreshCcw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="py-3 px-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-2 text-left">IP Address</th>
                  <th className="py-2 px-2 text-left">Port</th>
                  <th className="py-2 px-2 text-left">Country</th>
                  <th className="py-2 px-2 text-left">Status</th>
                  <th className="py-2 px-2 text-left">Expires In</th>
                  <th className="py-2 px-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {proxies.map((proxy) => (
                  <tr key={proxy.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 font-mono">{proxy.ip}</td>
                    <td className="py-2 px-2 font-mono">{proxy.port}</td>
                    <td className="py-2 px-2">{proxy.country}</td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        proxy.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {proxy.status}
                      </span>
                    </td>
                    <td className="py-2 px-2">{proxy.expiresIn}</td>
                    <td className="py-2 px-2">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        <Globe className="h-3 w-3" />
                        <span className="ml-1">Test</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProxiesPage;