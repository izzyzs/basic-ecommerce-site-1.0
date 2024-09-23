import React from 'react';

interface CustomerReview {
  rating: number;
  content: string;
}

interface CustomerReviewsProps {
  reviews?: Array<CustomerReview>;
}

const CustomerReviews = ({ reviews } : CustomerReviewsProps) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      <div className="space-y-4 mt-4">
        {reviews && (reviews.map((review, index) => (
          <div key={index} className="p-4 border rounded-md">
            <p className="text-yellow-400">Rating: {review.rating} ★</p>
            <p className="text-gray-700 mt-2">{review.content}</p>
          </div>
        )))}
      </div>
    </div>
  );
};

export default CustomerReviews;
