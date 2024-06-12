import React, { useEffect, useState } from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [products, setProduct] = useState([]);

  const [page, setPage] = useState(1);
  const { customersProduct } = useSelector((store) => store);
  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
  });

  // query
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  // const page = searchParams.get("page");

  useEffect(() => {
    fetchProducts();
  }, [page]); 

  const categoryNames = [];

  products.forEach((product) => {
    if (product.category) {
      categoryNames.push(product.category.name);
    }
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5454/api/products");
      setProduct(response.data.content); 
      setPage(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const groupedProducts = products.reduce((groups, product) => {
    const category = product.category ? product.category.name : "Uncategorized";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    console.log("category",category);
    return groups;
    
  }, {});

  return (
    <div className="" style={{color:"#dbc5d2"}}>
      <HomeCarousel images={homeCarouselData} />

      <div className="space-y-10 py-20">
        <div className="space-y-10 py-20">
        {Object.entries(groupedProducts).map(([category, products]) => (
          <HomeProductSection key={category} data={products} section={category} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Homepage;
