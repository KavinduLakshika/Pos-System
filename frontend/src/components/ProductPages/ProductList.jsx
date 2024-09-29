import React, { useEffect } from 'react'
import { useState } from 'react'
import Table from '../Table/Table'
import config from '../../config'

const ProductList = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = ['id', 'Product', 'Product Code', 'Weight(g)', "Buying Price", 'Selling Price', 'Warranty (moths)', 'Quantity', 'Profit', 'Description', 'Status'];

  const btnName=['Add Product']

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

  return (
    <div>
      <h4>ProductList</h4>
      <Table
        data={data}
        columns={columns}
        btnName={btnName}
      />
    </div>
  )
}

export default ProductList