import React, { useState } from "react";

const Proxy = () => {
  const [dropdowns, setDropdowns] = useState({
    region: ["United States", "United Kingdom", "Canada", "Italy", "China"],
    city: ["Ashburn", "London", "Toronto", "Rome", "Beijing"],
    isp: ["Lumen", "AT&T", "Bell", "Vodafone", "China Telecom"],
  });

  const [selectedRow, setSelectedRow] = useState(null);
  const [rowData, setRowData] = useState({});

  const handleRowClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    setRowData({
      IP: "139.171._._",
      Region: "VA",
      City: "Ashburn",
      ZIP: "20146",
      ISP: "Lumen",
      Clean: "Yes",
      Shared: "3 of 4",
      Conn: "Wifi",
      New: "No",
      Price: "$0.66",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
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

      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex space-x-2 mb-4">
          <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">United States (4.0k)</button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">United Kingdom (514)</button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">United Arab Emirates (17.4k)</button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">Canada (427)</button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">Italy (250)</button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">China (25)</button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">More</button>
        </div>
      </div>

      <div className="flex">
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
                  <th className="py-2 px-4 border-b">Clean</th>
                  <th className="py-2 px-4 border-b">Shared</th>
                  <th className="py-2 px-4 border-b">Conn</th>
                  <th className="py-2 px-4 border-b">New</th>
                  <th className="py-2 px-4 border-b">Price</th>
                </tr>
                <tr>
                  <th className="py-2 px-4 border-b">
                    <input type="text" className="w-full border rounded" placeholder="Any" />
                  </th>
                  <th className="py-2 px-4 border-b">
                    <select className="w-full border rounded">
                      <option value="">Any</option>
                      {dropdowns.region.map((region, index) => (
                        <option key={index} value={region}>{region}</option>
                      ))}
                    </select>
                  </th>
                  <th className="py-2 px-4 border-b">
                    <select className="w-full border rounded">
                      <option value="">Any</option>
                      {dropdowns.city.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                      ))}
                    </select>
                  </th>
                  <th className="py-2 px-4 border-b">
                    <input type="text" className="w-full border rounded" placeholder="Any" />
                  </th>
                  <th className="py-2 px-4 border-b">
                    <select className="w-full border rounded">
                      <option value="">Any</option>
                      {dropdowns.isp.map((isp, index) => (
                        <option key={index} value={isp}>{isp}</option>
                      ))}
                    </select>
                  </th>
                  {Array(5).fill(null).map((_, index) => (
                    <th key={index} className="py-2 px-4 border-b">
                      <input type="text" className="w-full border rounded" placeholder="Any" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array(5).fill(null).map((_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`cursor-pointer ${rowIndex === selectedRow ? "bg-purple-200" : ""} hover:bg-purple-100`}
                    onClick={() => handleRowClick(rowIndex)}
                  >
                    <td className="py-2 px-4 border-b">139.171._._</td>
                    <td className="py-2 px-4 border-b">VA</td>
                    <td className="py-2 px-4 border-b">Ashburn</td>
                    <td className="py-2 px-4 border-b">20146</td>
                    <td className="py-2 px-4 border-b">Lumen</td>
                    <td className="py-2 px-4 border-b">
                      <div className="bg-green-500 h-2 w-8 rounded"></div>
                    </td>
                    <td className="py-2 px-4 border-b">3 of 4</td>
                    <td className="py-2 px-4 border-b">Wifi</td>
                    <td className="py-2 px-4 border-b">No</td>
                    <td className="py-2 px-4 border-b text-green-500">$0.66</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-1/4 bg-white p-4 rounded shadow ml-4">
          <div className="text-lg font-bold mb-2">
            {selectedRow !== null ? `Row ${selectedRow + 1}` : "Select a Row"}
          </div>
          {selectedRow !== null ? (
            <div>
              <p><strong>IP:</strong> {rowData.IP}</p>
              <p><strong>Region:</strong> {rowData.Region}</p>
              <p><strong>City:</strong> {rowData.City}</p>
              <p><strong>ZIP:</strong> {rowData.ZIP}</p>
              <p><strong>ISP:</strong> {rowData.ISP}</p>
              <p><strong>Clean:</strong> {rowData.Clean}</p>
              <p><strong>Shared:</strong> {rowData.Shared}</p>
              <p><strong>Conn:</strong> {rowData.Conn}</p>
              <p><strong>New:</strong> {rowData.New}</p>
              <p><strong>Price:</strong> {rowData.Price}</p>
            </div>
          ) : (
            <div className="text-gray-700">Details will display here</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proxy;
