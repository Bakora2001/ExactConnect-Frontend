import React, { useState } from "react";

const Proxy = () => {
  const [dropdowns, setDropdowns] = useState({
    region: ["United States", "United Kingdom", "Canada", "Italy", "China"],
    city: ["Ashburn", "London", "Toronto", "Rome", "Beijing"],
    isp: ["Lumen", "AT&T", "Bell", "Vodafone", "China Telecom"],
  });

  const [selectedIp, setSelectedIp] = useState(null);

  const handleSelectIp = (ipDetails) => {
    setSelectedIp(ipDetails);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold text-purple-700">ExactConnect Network</div>
        <div className="flex space-x-4">
          <a href="#" className="text-purple-500">Shop</a>
          <a href="#" className="text-gray-500">My Proxies</a>
          <a href="#" className="text-gray-500">Payments</a>
          <a href="#" className="text-gray-500">Downloads</a>
          <a href="#" className="text-gray-500">API</a>
          <a href="#" className="text-gray-500">FAQ</a>
        </div>
        <div className="text-gray-500">$0.25</div>
        <div className="text-gray-500">
          <i className="fas fa-user-circle"></i>
        </div>
      </div>

      {/* Country Buttons Section */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex space-x-2 mb-4">
          {dropdowns.region.map((region, index) => (
            <button
              key={index}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full transition-all duration-200 hover:bg-purple-200 hover:text-purple-800"
            >
              {region}
            </button>
          ))}
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">More</button>
        </div>
      </div>

      <div className="flex">
        {/* Table Section */}
        <div className="w-3/4 bg-white p-4 rounded shadow">
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">IP</th>
                  <th className="py-2 px-4 border-b">Region</th>
                  <th className="py-2 px-4 border-b">City</th>
                  <th className="py-2 px-4 border-b">ZIP</th>
                  <th className="py-2 px-4 border-b">ISP</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Select</th>
                </tr>
              </thead>
              <tbody>
                {Array(5).fill(null).map((_, rowIndex) => {
                  const ipDetails = {
                    ip: `139.171.${rowIndex}.x`,
                    region: "Virginia",
                    city: "Ashburn",
                    zip: "20146",
                    isp: "Lumen",
                    price: "$0.66",
                  };

                  return (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-purple-50" : ""}>
                      <td className="py-2 px-4 border-b">{ipDetails.ip}</td>
                      <td className="py-2 px-4 border-b">{ipDetails.region}</td>
                      <td className="py-2 px-4 border-b">{ipDetails.city}</td>
                      <td className="py-2 px-4 border-b">{ipDetails.zip}</td>
                      <td className="py-2 px-4 border-b">{ipDetails.isp}</td>
                      <td className="py-2 px-4 border-b text-green-500">{ipDetails.price}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-700"
                          onClick={() => handleSelectIp(ipDetails)}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected IP Details Section */}
        <div className="w-1/4 bg-white p-4 rounded shadow ml-4">
          {selectedIp ? (
            <>
              <div className="text-lg font-bold mb-2">{selectedIp.ip}</div>
              <div className="text-gray-700 mb-2">{selectedIp.region} <i className="fas fa-flag-usa"></i></div>
              <div className="text-gray-700 mb-2">{selectedIp.city}</div>
              <div className="text-gray-700 mb-2">ZIP: {selectedIp.zip}</div>
              <div className="text-gray-700 mb-2">ISP: {selectedIp.isp}</div>
              <div className="text-gray-700 mb-2">Price: {selectedIp.price}</div>
              <div className="text-gray-700 mb-2">Activity: 100%</div>
              <div className="flex space-x-4 mt-4">
                <button className="text-purple-500 border-b-2 border-purple-500">Blacklists</button>
                <button className="text-gray-500">IP Score</button>
                <button className="text-gray-500">Details</button>
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-center">No IP Selected</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proxy;
