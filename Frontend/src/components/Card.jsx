// Card.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ item }) {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate(`/course/${item.id}`);
  };

  return (
    <div className="relative group">
      <div className="bg-base-100 w-70 shadow-xl overflow-hidden rounded-xl">
        <figure className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <div className="mt-4">
                <button onClick={handleLearnMoreClick} className="btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
}

export default Card;
