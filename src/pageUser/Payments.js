
import { Selector, useSelector } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Payments = () =>{
    const current = new Date()
    const date = current.toLocaleDateString() 
    const times = current.toLocaleTimeString()
    const currentTime = date + " - " + times
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    var nameproduct = ""
    var price
    const handleSubmit = (event) => {
        if(!fullname || !phone || !address){
            toast.error('Vui lòng nhập đầy đủ thông tin nhận hàng', {
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
        if(state.length===0){
            toast.warning('Bạn chưa có sản phẩm trong giỏ hàng', {
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
        event.preventDefault();
        axios.post("http://localhost:3000/oder", {
          nameproduct: nameproduct,
          price:price,
          fullname:fullname,
          phone:phone,
          address:address,
          time:currentTime
        })
          .then((response) => {
            console.log(response);
            toast.promise(
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve();
                  }, 3000);
                }),
                {
                  pending: 'Đang tiếp nhận đơn hàng',
                  success: 'Tiếp nhận đơn hàng thành công! Đơn hàng của bạn sẽ được giao trong vài ngày tới',
                  position: "top-center",
                  closeOnClick: true,
                  hideProgressBar: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                  autoClose: 2000,
                }
              ).then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 5000);
              });           
          })
          .catch((error) => {
            console.log(error);
            alert("An error occurred while sending your message.");
          });
      };
    var total = 0
    const state = useSelector((state) => state.handleCart)
    const itemList =(item) =>{
    total = total + parseFloat(item.price)
    price = total
    nameproduct = nameproduct +"- " + item.name + "\n"
        return(
            <>
                   <tr>
                        <td>{item.name}</td>
                        <td><img src={item.image} width="50" height="50"/></td>
                        <td>{item.price}</td>
                   </tr>
            </>
        )
    }
    return(
        <>  
            <div className="container margin-t-payment">
            <div className="row margin-t-nav">
                <div className="col-5">
                <h4 className="mb-3">Thông tin, địa chỉ nhận hàng</h4>
                <input required className="ms-2 p-3 form-control mb-3 border-5 border-dark " placeholder="Họ và tên" onChange={(e) => setFullname(e.target.value)}/>
                <input type="number" required className="ms-2 p-3 form-control mb-3 border-5 border-dark " placeholder="Số điện thoại" onChange={(e) => setPhone(e.target.value)}/>
                <select disabled="disabled" className="ms-2 p-3 form-select mb-3 border-5 border-dark">
                    <option>Thanh toán sau khi nhận hàng</option>
                </select>
                <textarea placeholder="Địa chỉ nhận hàng" className="ms-2 p-3 form-control mb-5 border-5 border-dark" rows="4" required onChange={(e) =>setAddress(e.target.value) } ></textarea>
                </div>
                <div className="col-7">
                <h4 className="mb-3">Sản phẩm đã đặt </h4>
                <form>
                        <table className="table shadow">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Ảnh</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.map(itemList)}
                            <tr>
                                <td className="float-end fw-bold">Tổng tiền:</td>
                                <td></td>
                               <td className="fw-bold">{total}.000</td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                    <button onClick={handleSubmit} style={{backgroundColor: "#fe4c50"}} className="btn mt-3 text-white">Thanh toán</button>
                   <Link to="/product"> <button  className="btn mt-3 text-dark btn-outline-secondary">Tiếp tục mua sắm</button></Link>
                </div>
            </div>
            </div>
        </>
    )
}
export default Payments