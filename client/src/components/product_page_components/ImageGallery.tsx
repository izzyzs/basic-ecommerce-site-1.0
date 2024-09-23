import React from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images } : ImageGalleryProps) => {
  return (
    <div className="space-y-4">
      <img src={images[0]} alt="Main product" className="w-full object-cover h-64 rounded-md" />
      <div className="flex space-x-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className="w-16 h-16 object-cover rounded-md cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
