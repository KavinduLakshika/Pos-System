import React, { useEffect, useState } from 'react';
import Table from '../Table/Table';
import CategoryForm from '../../Models/CategoryForm/CategoryForm';
import config from '../../config';

const ProductCategory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const columns = ["ID", "Category", "Category Type"];
  const btnName = "Add Category";

  useEffect(() => {
    fetchCategory(); // Load categories on mount
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch category list');
      }
      const categories = await response.json();
      const formattedData = categories.map((cat) => [
        cat.categoryId,
        cat.categoryName,
        cat.categoryType,
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async (rowIndex) => {
    try {
      const categoryId = data[rowIndex][0]; // Get categoryId from row
      const response = await fetch(`${config.BASE_URL}/category/${categoryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      // Update the table after deleting the row
      setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (rowIndex) => {
    const selectedCatData = data[rowIndex];
    setSelectedCategory({
      categoryId: selectedCatData[0],
      categoryName: selectedCatData[1],
      categoryType: selectedCatData[2],  // Include categoryType for editing
    });
    setShowModal(true);
  };

  const openModal = () => {
    setSelectedCategory(null);  // Clear previous selection if adding a new category
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    fetchCategory();  // Refresh categories after saving
    closeModal();     // Close modal after save
  };

  return (
    <div>
      <div className="scrolling-container">
        <h4>Product Category</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table
            data={data}
            columns={columns}
            btnName={btnName}
            onAdd={openModal}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}

        <CategoryForm
          showModal={showModal}
          closeModal={closeModal}
          selectedCategory={selectedCategory}  // Pass selectedCategory for edit
          onSave={handleSave}                  // Refresh the list on save
        />
      </div>
    </div>
  );
};

export default ProductCategory;
