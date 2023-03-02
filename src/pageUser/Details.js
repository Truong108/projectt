import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/detail.css";
import { toast } from "react-toastify";
import "../component/SanphamlienquanNam";
import SanphamNam from "../component/SanphamlienquanNam";
import SanphamlienquanNam from "../component/SanphamlienquanNam";
import SanphamlienquanNu from "../component/SanphamlienquaNu";
import SanphamlienquanTreem from "../component/SanphamlienquanTreem";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Thêm vào giỏ hàng thành công", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`http://localhost:3000/apisanpham/${id}`);
      setProduct(await response.json());
    };
    getProduct();
  }, []);

  const ShowProduct = () => {
    return (
      <>
        <div className="col-lg-6">
          <div className="single_product_pics">
            <div className="row">
              <div className="col-lg image_col order-lg-2 order-1 ms-5">
                <div className="single_product_image">
                  <img src={product.image} alt={product.title} height="350px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="product_details">
            <div className="product_details_title">
              <h2>{product.name}</h2>
            </div>
            <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
              <span className="ti-truck" />
              <span>giao hàng miễn phí</span>
            </div>
            <div className="original_price"></div>
            <div className="product_price fs-2">{product.price} VND</div>
            <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
              <div
                className="btn btn-danger "
                onClick={() => addProduct(product)}
              >
                <a className="text-white text-decoration-none">
                  Thêm vào giỏ hàng
                </a>
              </div>
              <div className="product_favorite d-flex flex-column align-items-center justify-content-center" />
            </div>
          </div>
        </div>
      </>
    );
  };

  const Lienquan = () => {
    if (product.category === "Áo nam") {
      return (
        <>
          <div className="row text-center">
              <h3>Sản phẩm liên quan</h3>
          </div>
          <SanphamlienquanNam />
        </>
      );
    }
    if (product.category === "Áo nữ") {
      return (
        <>
          <div className="row text-center">
              <h3>Sản phẩm liên quan</h3>
          </div>
          <SanphamlienquanNu />
        </>
      );
    }
    if (product.category === "Áo trẻ em") {
      return (
        <>
          <div className="row text-center">
              <h3>Sản phẩm liên quan</h3>
          </div>
          <SanphamlienquanTreem />
        </>
      );
    }
  };
  
  return (
    <>
      <div className="container single_product_container">
        <div className="row">
          <ShowProduct />
          <Lienquan />
        </div>
      </div>
    </>
  );
};

export default Details;
