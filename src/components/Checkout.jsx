import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const openRemoveModal = () => setIsRemoveModalOpen(true);
  const closeRemoveModal = () => setIsRemoveModalOpen(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const openCheckoutModal = () => setIsCheckoutModalOpen(true);
  const closeCheckoutModal = () => setIsCheckoutModalOpen(false);

  const [billingCycle] = useState('Quarterly');
  const [os] = useState('Ubuntu 22');
  const [ipAddress] = useState('No Additional IPs');
  const [location] = useState('First available');
  const [backup] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      <div className="w-full lg:w-3/4 mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Review & Checkout
        </h2>
        <div className="flex flex-wrap md:flex-nowrap">
          {/* Left Column */}
          <div className="w-full md:w-2/3 p-4">
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Product/Options
                </h3>
                <h3 className="text-lg font-semibold text-gray-800">
                  Price/Cycle
                </h3>
              </div>
              <div className="py-4 flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h4 className="text-gray-800 font-medium">SSD-bKVM 512</h4>
                    <a href="/">
                      <FaEdit className="ml-2 text-blue-500 cursor-pointer" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600">BlueVPS Linux</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>Operating System: {os}</li>
                    <li>Extra IP Address: {ipAddress}</li>
                    <li>Location: {location}</li>
                    <li>
                      Backup:{' '}
                      {backup
                        ? 'Auto backup (we are trying our best to keep your data safe)'
                        : 'No backup'}
                    </li>
                  </ul>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <p className="text-lg font-semibold text-gray-800">
                      $14.00 USD
                    </p>
                    <FaTrashAlt
                      className="ml-2 text-red-500 cursor-pointer"
                      onClick={openRemoveModal}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{billingCycle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg shadow-lg mt-6 md:mt-0">
            <h3 className="text-lg font-medium text-gray-700">Order Summary</h3>
            <ul className="mt-4 text-sm">
              <li className="flex justify-between">
                <span>Subtotal</span>
                <span>$14.00 USD</span>
              </li>
              <li className="flex justify-between text-gray-900 font-semibold mt-2">
                <span>Totals</span>
                <span>$14.00 USD Quarterly</span>
              </li>
              <li className="flex justify-between text-gray-900 font-bold text-lg mt-4">
                <span>Total Due Today</span>
                <span>$14.00 USD</span>
              </li>
            </ul>

            <button
              onClick={openCheckoutModal}
              className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 transition mt-6"
            >
              Checkout <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Remove Confirmation Modal */}
      {isRemoveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <MdClose
              className="absolute top-2 right-2 text-gray-500 cursor-pointer"
              onClick={closeRemoveModal}
            />
            <h3 className="text-lg font-semibold mb-4">Confirm Removal</h3>
            <p>Are you sure you want to remove this item?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                onClick={closeRemoveModal}
              >
                Cancel
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Confirmation Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <MdClose
              className="absolute top-2 right-2 text-gray-500 cursor-pointer"
              onClick={closeEditModal}
            />
            <h3 className="text-lg font-semibold mb-4">Confirm Edit</h3>
            <p>Do you want to edit the product configuration?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Confirmation Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <MdClose
              className="absolute top-2 right-2 text-gray-500 cursor-pointer"
              onClick={closeCheckoutModal}
            />
            <h3 className="text-lg font-semibold mb-4">Confirm Checkout</h3>
            <p>Are you sure you want to checkout for a total of $14.00 USD?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                onClick={closeCheckoutModal}
              >
                Cancel
              </button>
              <Link to='/mpesa-checkout'>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Confirm Checkout
              </button>
              </Link>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
