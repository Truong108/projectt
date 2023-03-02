import React, { useState, useEffect, useRef } from "react";
import { NavLink} from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { addCart } from "../redux/action";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const SanphamlienquanTreem = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    let componentMounted = true;
    const sliderRef = useRef(null);
    const handleNextClick = () => {
      sliderRef.current.slickNext();
    };
    
    const handlePrevClick = () => {
      sliderRef.current.slickPrev();
    };
  const dispatch = useDispatch();
 
  const addProduct = (product) => {
    toast.success('Thêm vào giỏ hàng thành công', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    dispatch(addCart(product));
  };
  useEffect(() => {
    const getsProducts = async () => {
    
      const response = await fetch("http://localhost:3000/apisanpham");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
      }
      return () => {
        componentMounted = false;
      };
    };
    getsProducts();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
 

  return (
    <>
    <div className="slider-container">
    <div className="row">
    <div className="col-md-1">
<button className="slider-nav-buttonbi bi-caret-left btn btn-danger" onClick={handlePrevClick}>
     </button>
    </div>
    <div className="col-md-10">

    </div>
    <div className="col-md-1">
<button className="slider-nav-button bi bi-caret-right btn btn-danger" onClick={handleNextClick}>
     </button>
</div>
   </div>
      <Slider ref={sliderRef} {...settings}>
      {filter.map((product) => {
        if(product.category==="Áo trẻ em")
                      return (
                        <>
                          <div className="product-item" key={product.id}>
                            <div className="product">
                              <div className="product_image">
                              
                                  <img
                                    src={product.image}
                                    className="product-img"
                                    alt={product.title}
                                    height="240"
                                  />
                        
                              </div>
                              <div className="favorite" />
                              <div className="product_info">
                                <h6 className="product_name">
                                  <a>
                                    <br />
                                    {product.name.substring(0,60)}
                                  </a>
                                </h6>
                                <div className="product_price mb-5">
                                  {product.price }
                                </div>
                              </div>
                            </div>
                            <div
                              className="red_button add_to_cart_button"
                              onClick={() => addProduct(product)}
                            >
                              <a>Thêm vào giỏ hàng</a>
                            </div>
                          </div>
                        </>
                      );
                    })}
      </Slider>
    </div>
  </>
  );
};

export default SanphamlienquanTreem;