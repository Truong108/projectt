 import {Link, useNavigate} from "react-router-dom"
 import { useState } from "react";
import { toast } from "react-toastify";
 const Login = () =>{
    const [showPassword, setShowPassword] = useState(false);
    const togglepassword = () =>{
        setShowPassword(!showPassword);
    }
     const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    if (username === "admin" && password === "123456") {
        toast.success('Chào mừng đến với quản lí hệ thống', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      navigate("/admin");
    } else {
        toast.error('Sai mật khẩu hoặc tên đăng nhập, yêu cầu nhập lại', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
  };

    return(
        <>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 m-auto">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="text-center"><i class="bi bi-person-video3 display-1 fs-1"></i></div>
                                <form onSubmit={handleLogin} className="">
                                    <input required type="text" className="form-control my-3 py-3" placeholder="Tên đăng nhập" name="username"/>
                                    <div className="position-relative">
                                         <input required type={showPassword ? "text" : "password"} className="form-control my-3 py-3 " placeholder="Mật khẩu" name="password"/>
                                    <i onClick={togglepassword} class={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i>

                                    </div>
                                   
                                    <div className="text-center">
                                        <button style={{backgroundColor: "#fe4c50"}} className="btn mt-3 text-white">Đăng nhập</button>
                                        <Link to="/"><button className="btn btn-secondary mt-3 ms-3">Quay lại</button></Link>  
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
 }

 export default Login