import React from 'react';

interface ProductDescriptionProps {
  description: string;
  specs?: string[];
}

const ProductDescription = ({ description, specs } : ProductDescriptionProps) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold">Product Description</h2>
      <p className="text-gray-700 mt-2">{description}</p>

      <h3 className="text-xl font-semibold mt-4">Specifications</h3>
      {specs && (<ul className="list-disc ml-4 mt-2 text-gray-600">
        {specs.map((spec, index) => (
          <li key={index}>{spec}</li>
        ))}
      </ul>)}
    </div>
  );
};

export default ProductDescription;
