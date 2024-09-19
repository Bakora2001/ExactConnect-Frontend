import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from 'react-modal';
import { FaPlus, FaImage, FaSave, FaTimes } from 'react-icons/fa';

// Zod schema for form validation
const schema = z.object({
  name: z.string().min(1, 'Product name is required'),
  collection: z.string().min(1, 'Collection is required'),
  description: z.string().min(1, 'Description is required'),
  detailedDescription: z.string().optional(),
});

const App = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categories, setCategories] = useState(['Electronics', 'Furniture']);
  const [newCategory, setNewCategory] = useState('');

  const onSubmit = (data) => {
    console.log('Form data', data);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setShowAddCategoryModal(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 text-gray-400 rounded-lg border border-gray-200 gap-0">
      
      
      <h1 className="text-3xl font-bold mb-4 text-purple-600">Add Product</h1>
      
      <nav className="text-sm mb-4">
       <a href="/admin/home" className="text-blue-600 hover:underline">Dashboard</a> &gt; 
        <a href="/admin/products" className="text-blue-600 hover:underline">Products</a> &gt;  
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 bg-gray-200 p-6 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Product Details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-purple-600" htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="bg-gray-300 text-gray-500 border border-gray-600 rounded-lg p-2 w-full"
              />
              {errors.name && <p className="text-purple-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-purple-600" htmlFor="collection">Collection *</label>
              <div className="flex">
                <select id="collection" {...register('collection')} className="flex-grow bg-gray-300 text-gray-500 border border-gray-600 rounded-lg p-2">
                  <option value="">Select Collection</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(true)}
                  className="ml-2 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg"
                >
                  <FaPlus /> Add New
                </button>
              </div>
              {errors.collection && <p className="text-purple-400 text-xs mt-1">{errors.collection.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-purple-600" htmlFor="description">Description *</label>
              <textarea
                id="description"
                {...register('description')}
                rows="3"
                className="bg-gray-300 text-gray-500 border border-gray-600 rounded-lg p-2 w-full"
              />
              {errors.description && <p className="text-purple-400 text-xs mt-1">{errors.description.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-purple-600" htmlFor="detailed-description">Detailed Description</label>
              <textarea
                id="detailed-description"
                {...register('detailedDescription')}
                rows="5"
                className="bg-gray-300 text-gray-500 border border-gray-600 rounded-lg p-2 w-full"
              />
            </div>

            <div className="flex items-center mb-4">
              <label className="text-sm font-bold mr-2 text-purple-600" htmlFor="visibility">Enable Visibility</label>
              <input id="visibility" type="checkbox" {...register('visibility')} className="mr-2" />
              <span>Make product visible to customers or keep it as draft</span>
            </div>

            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-green-500 text-black px-4 py-2 rounded-lg">
                <FaSave /> Save Product
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Cover Image</h2>
          <div className="bg-gray-300 border border-dashed border-gray-600 rounded-lg p-4 text-center mb-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Cover"
              className="w-24 h-24 object-cover rounded-lg mb-2 mx-auto"
            />
            <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg">
              <FaImage /> Add Image
            </button>
          </div>
          <p className="text-gray-400 text-xs">
            Note: White or no image backgrounds are recommended. Remove image background for free at <a href="#" className="text-purple-600">remove bg</a>
          </p>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">More Images</h2>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-gray-200 border border-dashed border-gray-600 rounded-lg p-4 text-center">
                <img
                  src="https://via.placeholder.com/100"
                  alt="More"
                  className="w-24 h-24 object-cover rounded-lg mb-2 mx-auto"
                />
              </div>
            ))}
          </div>
          <button className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg">
            <FaPlus /> Add Images
          </button>
          <p className="text-gray-400 text-xs mt-2">
            Add a total of 7 images and a max size of 7.0 MB each
          </p>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddCategoryModal}
        onRequestClose={() => setShowAddCategoryModal(false)}
        contentLabel="Add New Category"
        className="max-w-sm mx-auto bg-gray-200 p-4 rounded-lg border border-gray-700"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <h2 className="text-xl font-bold text-purple-600 mb-4">Add New Category</h2>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category Name"
          className="bg-gray-700 text-white border border-gray-100 rounded-lg p-2 w-full mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleAddCategory}
            className="bg-green-600 text-gray-500 px-4 py-2 rounded-lg mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setShowAddCategoryModal(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
