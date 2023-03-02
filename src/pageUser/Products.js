import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { addCart } from "../redux/action";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  let componentMounted = true;
  const dispatch = useDispatch();
  const addProduct = (product) => {
    toast.success('Thêm vào giỏ hàng thành công', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    dispatch(addCart(product));
  };
  const [activeLink, setActiveLink] = useState("tatcasanpham");

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

  const filterProduct = (cat) => {
    const updateList = data.filter((x) => x.category === cat);
    setFilter(updateList);
  };
  const ShowProducts = () => {
    return (
      <>
        <div className="container pro">
          <div className="row">
            <div className="col-md-2">
              <h5 className="fs-3 mt-5">Danh mục sản phẩm</h5>
              <NavLink
                className={`mt-5 txt d-block ${
                  activeLink === "tatcasanpham" ? "act" : ""
                }`}
                onClick={() => {
                  setActiveLink("tatcasanpham");
                  setFilter(data);
                }}
              >
                Tất cả sản phẩm
              </NavLink>
              <NavLink
                className={`txt d-block mt-2 ${
                  activeLink === "Áo nam" ? "act" : ""
                }`}
                onClick={() => {
                  setActiveLink("Áo nam");
                  filterProduct("Áo nam");
                }}
              >
                Áo nam
              </NavLink>
              <NavLink
                className={`txt d-block mt-2 ${
                  activeLink === "Áo nữ" ? "act" : ""
                }`}
                onClick={() => {
                  setActiveLink("Áo nữ");
                  filterProduct("Áo nữ");
                }}
              >
                Áo nữ
              </NavLink>
              <NavLink
                className={`txt d-block mt-2 ${
                  activeLink === "aoTreem" ? "act" : ""
                }`}
                onClick={() => {
                  setActiveLink("aoTreem");
                  filterProduct("Áo trẻ em");
                }}
              >
                Áo trẻ em
              </NavLink>
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col">
                  <div className="product-grid-pro">
                    {filter.map((product) => {
                      return (
                        <>
                          <div className="product-item" key={product.id}>
                            <div className="product">
                              <div className="product_image">
                                <NavLink to={`${product.id}`}>
                                  <img
                                    src={product.image}
                                    className="product-img"
                                    alt={product.title}
                                    height="240"
                                  />
                                </NavLink>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <ShowProducts />
    </>
  );
};

export default Products;
