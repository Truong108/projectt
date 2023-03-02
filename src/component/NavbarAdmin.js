import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Carousel } from "bootstrap";
import { useState, useEffect } from "react";
const NavbarAdmin = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate()
  const handleLogout = () =>{
      navigate("/login")
  }
  
  return (
    <>
      <div className="navbarr">
        <h2>
          Admin <i className="bi bi-person-workspace"></i>
        </h2>
          <span className="fw-bold"> 

          <span><i class="bi bi-calendar-week me-2">{currentTime.toLocaleDateString()}</i><i class="bi bi-clock text-center me-1 ms-5"></i>{currentTime.toLocaleTimeString()}</span></span>
        <div className="navbarr-right">
        <NavLink
        to="/admin"
      >
        <span>Sản phẩm</span> 
      </NavLink>
      <NavLink
        to="/adminBlog"
      >
        <span>Blog</span>
      </NavLink>
      <NavLink
        to="/adminContact"
  
      >
        <span>Liên hệ</span>
      </NavLink>
      <NavLink
       to="/InformationUser"
      >
        <span> Khách hàng</span>
      </NavLink>
      <NavLink
       to="/adminOder"
      >
        <span> Đơn hàng</span>
      </NavLink>
      <NavLink
       to="/login"
      >
        <span>Đăng xuất</span>
      </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavbarAdmin;
