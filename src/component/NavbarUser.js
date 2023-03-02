import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const state = useSelector((state) => state.handleCart)
  return (
    <>
      <header className="header trans_300">
        <div className="main_nav_container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-right">
                <div className="logo_container">
                  <a href="/">
                    Refund<span>shop</span>
                  </a>
                </div>
                <nav className="navbar">
                  <ul className="navbar_menu">
                    <li>
                      <NavLink to="/">Trang Chủ</NavLink>
                    </li>
                    <li>
                      <NavLink to="/product">Sản Phẩm</NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact">Liên hệ</NavLink>
                    </li>
                  </ul>
                  <ul className="navbar_user">
                    <li>
                      <NavLink to="/login">
                        <i className="fa fa-user" title="Đăng nhập" aria-hidden="true" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register">
                      <i class="bi bi-pencil-square" title="Đăng ký tài khoản"></i>
                      </NavLink>
                    </li>
                    <li className="checkout">
                      <Link to="/cart">
                        <i
                          className="fa fa-shopping-cart"
                          id="cart-icon"
                          aria-hidden="true"
                        />
                        <span id="checkout_items" className="checkout_items">
                          {state.length}
                        </span>
                      </Link>
                    </li>
                  </ul>
                  <div className="hamburger_container">
                    <i className="fa fa-bars" aria-hidden="true" />
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
