import React, { useEffect } from 'react';
import { useState } from 'react';
import Table from '../Table/Table';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = ['id', 'Product', 'Product Code', 'Weight(g/Kg)', 'Buying Price', 'Selling Price', 'Warranty (months)', 'Quantity', 'Profit', 'Description', 'Status'];

  const btnName = ['Add Product'];


  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch product list');
      }
      const prod = await response.json();
      const formattedData = prod.map(prod => [
        prod.productId,
        prod.productName,
        prod.productCode,
        prod.productWeight,
        prod.productBuyingPrice,
        prod.productSellingPrice,
        prod.productWarranty,
        prod.productQty,
        prod.productProfit,
        prod.productDescription,
        prod.productStatus,
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
      const productId = data[rowIndex][0];
      const response = await fetch(`${config.BASE_URL}/product/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete Product');
      }

      setData(prevData => prevData.filter((_, index) => index !== rowIndex));
      fetchProductList();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (rowIndex) => {
    const selectedProdData = data[rowIndex];
    const selectedProd = {
      productId: selectedProdData[0],
      productName: selectedProdData[1],
      productCode: selectedProdData[2],
      productWeight: selectedProdData[3],
      productBuyingPrice: selectedProdData[4],
      productSellingPrice: selectedProdData[5],
      productWarranty: selectedProdData[6],
      productQty: selectedProdData[7],
      productProfit: selectedProdData[8],
      productDescription: selectedProdData[9],
      productStatus: selectedProdData[10],
    };

    navigate('/product/create', { state: { selectedProd } });
  };

  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/product/create');
  };

  return (
    <div>
      <div className="scrolling-container">
        <h4>ProductList</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table
            data={data}
            columns={columns}
            btnName={btnName}
            onAdd={handleAddProduct}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
