import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      key={product._id}
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ backgroundColor: "#e8ba89" }}
      className="text-white cursor-pointer flex flex-col items-center rounded-lg shadow-lg overflow-hidden w-[15rem] h-[25rem] mx-4"
    >
      <div className="h-[13rem] w-[10rem] flex items-center justify-center">
        <img
          className="object-cover w-full h-full mt-5"
          alt={product.title}
          src={product.imageUrl}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium " style={{ color: "#473f6b" }}>
          {product.title}
        </h3>
        <p className="mt-2 text-sm " style={{ color: "#473f6b" }}>
          {product.title}
        </p>
      </div>
    </div>
  );
};

export default HomeProductCard;
