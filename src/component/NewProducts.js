import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom"; 
import { addCart } from "../redux/action";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const NewProducts = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  const dispatch = useDispatch();
  const addProduct = (product) =>{
    toast.success('Thêm vào giỏ hàng thành công', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  dispatch(addCart(product));}
  const [activeLink, setActiveLink] = useState("tatca");

  useEffect(() => {
    const getsProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:3000/apisanpham");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };
    getsProducts();
  }, []);

  const Loading = () => {
    return (
    <>
        <div className="product-item">
            <Skeleton />
        </div>
        <div className="product-item">
            <Skeleton />
        </div>
        <div className="product-item">
            <Skeleton />
        </div>
        <div className="product-item">
            <Skeleton />
        </div>
        <div className="product-item">
            <Skeleton />
        </div>
    </>
    );
  };

  const filterProduct = (cat) =>{
      const updateList = data.filter((x) => x.category === cat)
      setFilter(updateList);
  }
  const ShowProducts = () => {
    return (
      <>
        <div className="row align-items-center">
          <div className="col text-center">
            <div className="new_arrivals_sorting">
              <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                <NavLink className={` grid_sorting_button d-flex flex-column justify-content-center align-items-center ${ activeLink === "tatca" ? "activelist" : ""}`}
                onClick={() =>{
                  setFilter(data)
                  setActiveLink("tatca")
                }}>
                 TẤT CẢ
                </NavLink>
                <NavLink className={`grid_sorting_button  d-flex flex-column justify-content-center align-items-center ${activeLink === "Áo nữ" ? "activelist" : ""}`}
                 onClick={() =>{
                   filterProduct("Áo nữ")
                   setActiveLink("Áo nữ");
                 }
                 }>
                  ÁO NỮ
                </NavLink>
                <NavLink className={`grid_sorting_button  d-flex flex-column justify-content-center align-items-center ${activeLink === "Áo nam" ? "activelist" : ""}`}
                 onClick={() =>{
                  filterProduct("Áo nam")
                  setActiveLink("Áo nam")
                 }}>
                  ÁO NAM
                </NavLink>
                <NavLink className={`grid_sorting_button  d-flex flex-column justify-content-center align-items-center ${activeLink === "Áo trẻ em" ? "activelist" : ""}`}
                  onClick={() =>{
                    filterProduct("Áo trẻ em")
                    setActiveLink("Áo trẻ em")
                  }}>
                  ÁO TRẺ EM
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="product-grid">
              {filter.map((product) => {
                if(product.status === "Hàng mới")
                return (
                  <>
                    <div className="product-item" key={product.id}>
                      <div className="product">
                        <div className="product_image">
                          <NavLink to={`product/${product.id}`}><img
                            src={product.image}
                            className="product-img"
                            alt={product.title}
                            height="240"
                          /></NavLink>
                        </div>
                        <div className="favorite" />
                        <div className=" product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center">
                          <span>new</span>
                        </div>
                        <div className="product_info">
                          <h6 className="product_name">
                            <a>
                              <br />
                              {product.name.substring(0,55)}
                            </a>
                          </h6>
                          <div className="product_price mb-5">{(product.price) }</div>
                        </div>
                      </div>
                      <div className="red_button add_to_cart_button" onClick={() => 
                        addProduct(product)
                        }>
                        <a>Thêm vào giỏ hàng</a>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="new_arrivals">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="section_title new_arrivals_title">
                <h2>Các sản phẩm mới</h2>
              </div>
            </div>
          </div>
           <ShowProducts />
        </div>
      </div>
    </>
  );
};

export default NewProducts;
