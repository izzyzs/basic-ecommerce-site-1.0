import React, { useState, useEffect } from 'react'
import MultiProductPage from './MultiProductPage'
import { Data } from '../interfaces/interface'

const MenPage = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(function () {
      fetch("/products?by=gender&value=M")
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
         {data ? (
                <MultiProductPage productsData={data.products}/>
            ) : (
                // <div>{JSON.stringify(Data)}</div>
                <p>Loading products...</p>
            )}
    </>
    
  )
}

export default MenPage