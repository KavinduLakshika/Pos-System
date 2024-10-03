import { useEffect, useState } from 'react'
import Table from '../Table/Table'
import config from '../../config';

const ProductCategory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = ["ID", 'Category', 'Category Type', 'Status'];

  const btnName = 'Add Category'

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch Category list');
      }
      const cat = await response.json();
      const formattedData = cat.map(cat => [
        cat.categoryId,
        cat.categoryName,
        cat.categoryType,
        cat.categoryStatus,
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
      <div className="scrolling-container">
        <h4>ProductCategory</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table
            data={data}
            columns={columns}
            btnName={btnName}
          />
        )}
      </div>
    </div>
  )
}

export default ProductCategory