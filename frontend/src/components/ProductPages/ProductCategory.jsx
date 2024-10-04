import React, { useEffect, useState } from 'react';
import Table from '../Table/Table';
import Modal from 'react-modal';
import CategoryForm from '../../Models/CategoryModal/Category';
import config from '../../config';

const ProductCategory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const columns = ["ID", "Category"];
  const btnName = "Add Category";

  useEffect(() => {
    fetchCategory();
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
      const categoryId = data[rowIndex][0];
      const response = await fetch(`${config.BASE_URL}/category/${categoryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
      fetchCategory();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (rowIndex) => {
    const selectedCatData = data[rowIndex];
    setSelectedCategory({
      categoryId: selectedCatData[0],
      categoryName: selectedCatData[1],
    });
    setModalIsOpen(true);
  };

  const openModal = () => {
    setSelectedCategory(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchCategory();
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Category Form"
        >
          <CategoryForm
            closeModal={closeModal}
            onSave={fetchCategory}
            category={selectedCategory}
            style={{
              content: {
                width: '30%',
                height: '30%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              },
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ProductCategory;
