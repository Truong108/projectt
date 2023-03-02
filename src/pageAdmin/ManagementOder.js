
import React, { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { toast } from "react-toastify";
const ManagementOder = () =>{
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Lấy tháng hiện tại (từ 0 đến 11)
    const currentDay = currentDate.getDate()
    const [data,setData] = useState([])
    const [showEdit, setShowEdit] = useState(false);
    const [indexx, setIndexx] = useState()
    const handleCloseEdit = () => {  setShowEdit(false);}
    const handleShowEdit = () => {setShowEdit(true)}
    const handleEditClick = (id) => {
        loadapi(id)
        setIndexx(id)
        handleShowEdit()
      }
      
    const [inputData,setInputData] = useState({
        id: '',
        fullname: '',
        phone: '',
        address: '',
        nameproduct: '',
        price:'',
        time: ''
    })
    
    const loadapi = (id) =>{
        axios.get("http://localhost:3000/oder/" + id )
        .then(res => setInputData(res.data))
        .catch(err => console.log(err))
    }
    useEffect(() =>{
        axios.get("http://localhost:3000/oder")
        .then(res => setData(res.data))
        .catch(err => console.log(err))
        setIndexx(indexx)
        
    },[indexx]
    )
    const SubmitEdit = async (e) =>{
        e.preventDefault()
        await axios.put("http://localhost:3000/oder/"+ indexx, inputData)
        setData(res => {
            const newData = res.map(item => {
                if(item.id === indexx) {
                    return inputData
                } else {
                    return item
                }
            })
            toast.success('Sửa sản đơn hàng thành công', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return newData
        })
        handleCloseEdit()
    }
    function handDelete(id){
        if(window.confirm("Bạn có muốn xóa đơn hàng không ?")){
            axios.delete('http://localhost:3000/oder/' + id)
            .then(res => {
                toast.success('Xóa đơn hàng thành công', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            })
            .catch(err => console.log(err));
            setData(prevData => prevData.filter(item => item.id !== id));
            }
        }
    return (
        <>
                <div className="margin-t-nav"></div>
                <table className="table table-hover table-bordered">
                <thead className="table-danger">
                    <tr>
                        <th>ID</th>
                        <th>Tên khách hàng</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ giao hàng</th>
                        <th>Sản phẩm đã đặt</th>
                        <th>Giá trị đơn hàng</th>
                        <th>Thời gian đặt hàng</th>
                        <th>Tình trạng đơn hàng</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                        {data.map((item,index)=>{
                              var tinhtrang = ""
                              const dateString = item.time;
                              const dateParts = dateString.split("/");
                              const day = parseInt(dateParts[0], 10); 
                              const month = parseInt(dateParts[1],10)
                              var ngayhientai = parseInt(currentDay)
                              var thanghientai = parseInt(currentMonth) +1 
                              if(thanghientai - month > 0){
                                tinhtrang = "Hàng cần giải quyết"
                              } else{
                                if(ngayhientai - day > 1){
                                tinhtrang = "Hàng cần giải quyết"
                                } else{
                                    tinhtrang = "Hàng mới đặt"
                                }
                              }
                            return(
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td width="10%">{item.fullname}</td>
                                <td width="7%">{item.phone}</td>
                                <td width="25%">{item.address}</td>
                                <td style={{ whiteSpace: 'pre-line' }}>{item.nameproduct}</td>
                                <td>{item.price}.000</td>
                                <td width="10%">{item.time}</td>
                                <td>{tinhtrang}</td>
                                <td width="8%"><button onClick={e => handDelete(item.id)} className="btn btn-danger"><i className="bi bi-trash"></i></button>
                                <button onClick={() => handleEditClick(item.id)} className="btn btn-warning ms-3"><i className="bi bi-pencil-square"></i></button></td>
                            </tr>
                        )})}
                </tbody>
            </table>
            <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
                <div className="row">
                        <div className="col-md-6">
                            <label className="">ID</label> <br/>
                            <input value={inputData.id} disabled="disabled" type="number" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label> Tên</label> <br/>
                            <input value={inputData.fullname} onChange={e => setInputData({...inputData, fullname:e.target.value})}  className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="">Số điện thoại</label> <br/>
                            <input value={inputData.phone} onChange={e => setInputData({...inputData, phone:e.target.value})} type="" className="form-control" />
                        </div>
                        <div className="col-md-6">
                        <label>Địa chỉ giáo hàng</label> <br/>
                        <input value={inputData.address} onChange={e => setInputData({...inputData, address:e.target.value})} type="" className="form-control" />
                        </div>
                        <div className="col-md-6 mb-5">
                        <label className="">Sản phẩm đã đặt</label> <br/>
                        <input disabled value={inputData.nameproduct} onChange={e => setInputData({...inputData, nameproduct:e.target.value})} type="" className="form-control" />
                        </div>
                        <div className="col-md-6">
                        <label>Giá</label> <br/>
                        <input value={inputData.price} onChange={e => setInputData({...inputData, price:e.target.value})} type="" className="form-control" />
                        </div>
                        <button onClick={SubmitEdit} className="btn btn-success">Lưu</button>
                </div>
          </form>
        </Modal.Body>      
      </Modal>
        </>
    )
}

export default ManagementOder