import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const ManagementCustomer = () =>{
    const handleDelete = async (id) => {
    try {
      if(window.confirm("Bạn có muốn xóa tài khoản này không?")){
      const response = await axios.delete(`http://localhost:3000/user/${id}`);
      console.log(response.data);
      setInformation((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
      toast.success('Xóa tài khoản thành công', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
    const [information, setInformation] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/user');
            setInformation(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

      const EmtyCustomer = () =>{
          return(
            <>
            <div className='container'>
                <div className='row text-center mt-5'>
                  <h2 className='mt-5 text-danger text-cnter'> Chưa có khách hàng nào đăng ký <i class="bi bi-person-fill-x"></i></h2>
                </div>
            </div>
            </>
          )
      }
      const Customer = () =>{
        return(
          <>
 <div className='margin-t-nav'></div>
        <div className='container'>
            <table className='table table-hover table-bordered'>
                <thead className='table-warning'>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Số Điện thoại</th>
                        <th>Ngày tháng năm sinh</th>
                        <th>Ngày đăng ký</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                {information.map(information =>(                
          <tr key={information.id}>
            <td>{information.id}</td>
            <td>{information.name}</td>
            <td>{information.email}</td>
            <td>{information.phone}</td>
            <td>{information.birthdate}</td>
            <td>{information.time}</td>
            <td> <button className='bi bi-trash btn btn-danger'  onClick={() => handleDelete(information.id)}></button></td>
          </tr>
             ))}
                </tbody>
            </table>
        </div> 
          </>
        )
      }
    return(
        <>
              {information.length === 0 && EmtyCustomer()}
              {information.length !== 0 && Customer()}
        </>
    )
}
export default ManagementCustomer