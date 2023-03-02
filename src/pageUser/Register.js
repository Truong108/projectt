import {Link} from "react-router-dom"
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Register = () =>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear(); // Lấy năm hiện tại
    const currentMonth = currentDate.getMonth(); // Lấy tháng hiện tại (từ 0 đến 11)
    const currentDay = currentDate.getDate(); // Lấy ngày hiện tại
    const currentDateTime = `${currentDay}/${currentMonth+1}/${currentYear}`;
    event.preventDefault();
    if(!name || !email || !phone || !birthdate || !password || !confirmPassword){
        toast.error('Vui lòng nhập đầy đủ thông tin', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          return;
      }
    if (password !== confirmPassword) {
        toast.warning('Mật khẩu không khớp', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/user', {
        name,
        email,
        phone,
        birthdate,
        password,
        time: currentDateTime
      });
      console.log(response.data);
      toast.success('Đăng ký thành viên thành công', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setName('');
      setEmail('');
      setPhone('');
      setBirthdate('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau!');
    }
  };

    return(
        <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-5 m-auto">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="text-center"><i class="bi bi-person-circle fs-1" ></i></div>
                                <h3 className="text-center" >Đăng ký tài khoản</h3>
                                <form  className="text-center">
                                <div className="row align-items-center mt-5">
                                    <div className="col-md-2">
                                    <i className="bi bi-person-add fs-3" style={{ color: '#fe4c50' }}></i>
                                    </div>
                                    <div className="col-md-10">
                                    <input
                                        required
                                        className="form-control"
                                        placeholder="Nhập tên"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    </div>
                                </div>

                                {/* Email field */}
                                <div className="row align-items-center mt-3">
                                    <div className="col-md-2">
                                    <i className="bi bi-envelope-plus fs-3" style={{ color: '#fe4c50' }}></i>
                                    </div>
                                    <div className="col-md-10">
                                    <input
                                        required
                                        className="form-control"
                                        placeholder="Nhập email"
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                    </div>
                                </div>

                                {/* Phone field */}
                                <div className="row align-items-center mt-3">
                                    <div className="col-md-2">
                                    <i className="bi bi-telephone-plus fs-3" style={{ color: '#fe4c50' }}></i>
                                    </div>
                                    <div className="col-md-10">
                                    <input
                                        required
                                        className="form-control"
                                        placeholder="Nhập số điện thoại"
                                        type="number"
                                        pattern="[0-9]{10}"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                    />
                                    </div>
                                </div>
                                    <div className="row align-items-center mt-3">
                                        <div className="col-md-2">
                                        <i class="bi bi-calendar-plus fs-3" style={{color:"#fe4c50"}}></i>
                                        </div>
                                        <div className="col-md-10">
                                            <input 
                                             required
                                            type="date" 
                                            className="form-control"
                                            
                                            onChange={(event) => setBirthdate(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-items-center mt-3">
                                        <div className="col-md-2">
                                        <i class="bi bi-key fs-3" style={{color:"#fe4c50"}}></i>
                                        </div>
                                        <div className="col-md-10">
                                            <input type="password" value={password} required className="form-control" placeholder="Nhập mật khẩu" onChange={(event) => setPassword(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row align-items-center mt-3">
                                        <div className="col-md-2">
                                        <i class=""></i>
                                        </div>
                                        <div className="col-md-10">
                                            <input type="password" value={confirmPassword} required className="form-control" placeholder="Nhập lại mật khẩu" onChange={(event) => setConfirmPassword(event.target.value)} />
                                        </div>
                                    </div>
                                    <button onClick={handleSubmit} className="btn me-3 mt-4"style={{backgroundColor: "#fe4c50",color:"white"}}>Đăng ký</button>
                                    <Link to="/"><button className="btn btn-secondary mt-4">Quay lại</button></Link>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Register