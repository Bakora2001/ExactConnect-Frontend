import React, { useState } from 'react';

const Configure = () => {
  const [billingCycle, setBillingCycle] = useState('Quarterly');
  const [os, setOs] = useState('Ubuntu 22');
  const [ipAddress, setIpAddress] = useState('No Additional IPs');
  const [location, setLocation] = useState('First available');
  const [backup, setBackup] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="m-auto bg-white shadow-lg rounded-lg p-6 w-11/12 lg:w-3/4">
        <div className="flex flex-wrap md:flex-nowrap">
          {/* Left Column */}
          <div className="w-full md:w-2/3 p-4">
            <h2 className="text-xl font-semibold">Configure</h2>
            <p className="text-sm text-gray-600 my-2">
              Configure your desired options and continue to checkout.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-gray-800 font-semibold">SSD-bKVM 512</h3>
              <ul className="text-gray-600 text-sm">
                <li>CPU: 1x2.66GHz</li>
                <li>RAM: 512MB</li>
                <li>SSD hdd: 6GB</li>
                <li>Port: 1 Gbps</li>
                <li>Bandwidth : Unlimited</li>
                <li>IPv4: 1</li>
                <li>IPv6: 4</li>
              </ul>
              <div className="mt-4">
                <label className="text-gray-700 font-medium">Choose Billing Cycle</label>
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded shadow-sm"
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value)}
                >
                  <option value="Quarterly">$14.00 USD Quarterly</option>
                </select>
              </div>
              <h3 className="mt-6 text-gray-700 font-medium">Configurable Options</h3>
              <div className="mt-4">
                <div>
                  <label className="text-gray-700">Operating System</label>
                  <select
                    className="w-full mt-1 p-2 border border-gray-300 rounded shadow-sm"
                    value={os}
                    onChange={(e) => setOs(e.target.value)}
                  >
                    <option>Ubuntu 22</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="text-gray-700">Extra IP Address</label>
                  <select
                    className="w-full mt-1 p-2 border border-gray-300 rounded shadow-sm"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                  >
                    <option>No Additional IPs</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="text-gray-700">Location</label>
                  <select
                    className="w-full mt-1 p-2 border border-gray-300 rounded shadow-sm"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option>First available</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="text-gray-700">Backup</label>
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={backup}
                      onChange={() => setBackup(!backup)}
                      className="mr-2"
                    />
                    <span className="text-sm">Auto backup (we are trying our best to keep your data safe)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-700">Order Summary</h3>
            <ul className="mt-4 text-sm">
              <li className="flex justify-between">
                <span>SSD-bKVM 512</span>
                <span>$14.00 USD</span>
              </li>
              <li className="flex justify-between">
                <span>Operating System: {os}</span>
                <span>$0.00 USD</span>
              </li>
              <li className="flex justify-between">
                <span>Extra IP Address: {ipAddress}</span>
                <span>$0.00 USD</span>
              </li>
              <li className="flex justify-between">
                <span>Location: {location}</span>
                <span>$0.00 USD</span>
              </li>
              <li className="flex justify-between">
                <span>Backup: Auto backup</span>
                <span>$0.00 USD</span>
              </li>
              <li className="flex justify-between">
                <span>Setup Fees:</span>
                <span>$0.00 USD</span>
              </li>
              <li className="flex justify-between text-gray-900 font-semibold">
                <span>Quarterly:</span>
                <span>$14.00 USD</span>
              </li>
            </ul>

            <button className="w-full bg-[#7C25BA] text-white py-2 rounded-lg shadow hover:bg-[#6a1fa0]transition mt-4">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configure;
