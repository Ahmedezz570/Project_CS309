import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './CSS/reviews.css'; 

const Reviews = ({ productId, email }) => {
  const [reviews, setReviews] = useState([]); // التأكد من أن القيمة الافتراضية هي []
  const [formData, setFormData] = useState({
    FullName: '',
    email: email || '',
    comment: '',
    rating: 0,  
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate('/login');
    } else {
      fetchReviews();
    }
  }, [email, navigate]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:4000/products/${productId}/reviews`);
      const data = await response.json();
      setReviews(data.reviews||[] );  
      console.log(data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchReviews(); 
        setFormData({ FullName: '', email: formData.email, comment: '', rating: 0 }); 
      } else {
        console.error('Failed to add review');
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <span
            key={starIndex}
            className={`star ${starIndex < rating ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const handleStarClick = (starValue) => {
    setFormData({ ...formData, rating: starValue });
  };

  const handleDeleteReview = async (reviewEmail) => {
    try {
      const response = await fetch(`http://localhost:4000/products/${productId}/reviews`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: reviewEmail }), 
      });

      if (response.ok) {
        fetchReviews(); 
      } else {
        console.error('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Customers Reviews</h2>

      <div className="reviewsList">
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="reviewItem">
              <h4>Customer: {review.FullName}</h4>
              <p><strong>Email:</strong> {review.email}</p>
              <p><strong>Comment:</strong> {review.comment}</p>
              <p><strong>Rating:</strong>{renderStars(review.rating)}</p>
              {review.email === formData.email && (
                <button 
                  onClick={() => handleDeleteReview(review.email)} 
                  className="button deleteButton"
                >
                  Delete 
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="form1">
        <h3>Add Your Review</h3>
        <input
          type="text"
          name="FullName"
          placeholder="Your Full Name"
          value={formData.FullName}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input"
          disabled
        />
        <textarea
          name="comment"
          placeholder="Your Comment"
          value={formData.comment}
          onChange={handleChange}
          required
          className="textarea"
        ></textarea>

        <div className="stars-rating">
          <p>Rate the product:</p>
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <span
              key={starIndex}
              className={`star ${starIndex < formData.rating ? 'filled' : ''}`}
              onClick={() => handleStarClick(starIndex + 1)}  
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit" className="button">Submit Review</button>
      </form>
    </div>
  );
};

export default Reviews;
