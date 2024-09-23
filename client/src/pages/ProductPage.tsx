import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/every_page_components/HeaderComponent';
import { CustomerReviews, ImageGallery, ProductDescription, ProductInfo, RelatedProducts } from '../components/product_page_components';
import { CartContext } from '../contexts/CartContext';
import { Data, Product } from '../interfaces/interface';

interface ProductPageProps {
  relatedProducts?: { title: string; price: string; image: string }[];
  reviews?: { rating: number; content: string }[];
}

const ProductPage = ({ relatedProducts, reviews }: ProductPageProps) => {
  let { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // setLoading(true);
    // setError(null);
    fetch(`/products?by=id&value=${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Data) => {
        console.log("Received data:", data);
        if (data.products && data.products.length > 0) {
          setProduct(data.products[0]);
        } else {
          // setError("No product found in the response");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setError(error.message);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, [productId]);

  const cartContext = useContext(CartContext);
  if (!cartContext) return <p>Cart context not available</p>;
  const { addToCart } = cartContext;

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product data available</p>;

  console.log("Rendering product:", product);

  return (
    <div className="container mx-auto p-4">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8"> */}
      <div className="grid gap-6 my-8">
        <ProductInfo
          product={product}
          title={product.Name}
          price={`${product.Price.toFixed(2)}`}
          brand={product.Brand}
          type={product.ProductType}
          quantity={product.Quantity}
        />
        {/* <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">{product.Name}</h1>
          <p className="text-xl text-green-600">${product.Price.toFixed(2)}</p>
          <p className="text-lg">Brand: {product.Brand}</p>
          <p className="text-lg">Gender: {product.Gender}</p>
          
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
            // onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div> */}
      </div>
      <ProductDescription description={product.Description} />
      <RelatedProducts products={relatedProducts} />
      <CustomerReviews reviews={reviews} />
    </div>
  );
};

export default ProductPage;