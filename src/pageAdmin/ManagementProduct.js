import React, { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { toast } from "react-toastify";
const ManagementProduct = () =>{
    const [imageUrl, setImageUrl] = useState('');
    const [data,setData] = useState([])
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => {  setShowAdd(false);}
    const handleShowAdd = () => {   setShowAdd(true)}
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
        name: '',
        price: '',
        status: '',
        category: '',
        image:'',
    })
    
    const loadapi = (id) =>{
        axios.get("http://localhost:3000/apisanpham/" + id )
        .then(res => setInputData(res.data))
        .catch(err => console.log(err))
    }
    useEffect(() =>{
        axios.get("http://localhost:3000/apisanpham")
        .then(res => setData(res.data))
        .catch(err => console.log(err))
        setIndexx(indexx)
        
    },[indexx]
    )
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:3000/apisanpham",inputData)
        .then(res => {
            toast.success('Thêm sản phẩm thành công', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            setData(prevData => prevData.concat(res.data));
            handleCloseAdd()
        })
    }   
    const SubmitEdit = async (e) =>{
        e.preventDefault()
        await axios.put("http://localhost:3000/apisanpham/"+ indexx, inputData)
        setData(res => {
            const newData = res.map(item => {
                if(item.id === indexx) {
                    return inputData
                } else {
                    return item
                }
            })
            toast.success('Sửa sản phẩm thành công', {
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
        if(window.confirm("Bạn có muốn xóa sản phẩm không ?")){
            axios.delete('http://localhost:3000/apisanpham/' + id)
            .then(res => {
                toast.success('Xóa sản phẩm thành công', {
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
    return(
        <>  
        <div className="margin-t-nav"></div>
        
            <button onClick={handleShowAdd} className="btn btn-success float-end me-5">Thêm</button>
            <table className="table table-hover table-bordered">
                <thead className="table-danger">
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Tình trạng</th>
                        <th>Loại</th>
                        <th>Hình ảnh</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                        {data.map((item,index)=>(
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.status}</td>
                                <td>{item.category}</td>
                                <td><img src={item.image} width="50px" height="50px" alt=""/></td>
                                <td><button onClick={e => handDelete(item.id)} className="btn btn-danger"><i className="bi bi-trash"></i></button> 
                                <button onClick={() => handleEditClick(item.id)} className="btn btn-warning ms-3"><i className="bi bi-pencil-square"></i></button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
                <div className="row">
                        <div className="col-md-6">
                            <label className="">ID</label> <br/>
                            <input onChange={e => setInputData({...inputData, id:e.target.value})} disabled="disabled" type="number" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label> Tên</label> <br/>
                            <input required onChange={e => setInputData({...inputData, name:e.target.value})}  className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="">Giá</label> <br/>
                            <input required onChange={e => setInputData({...inputData, price:e.target.value})} type="number" className="form-control" />
                        </div>
                        <div className="col-md-6">
                        <label> Tình trạng</label> <br/>
                        <select onChange={e => setInputData({...inputData, status:e.target.value})} className="form-control">
                            <option value="">Chọn tình trạng</option>
                            <option value="Hàng mới">Hàng mới</option>
                            <option value="Hàng tồn kho">Hàng tồn kho</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-5">
                        <label className="">Loại</label> <br/>
                        <select onChange={e => setInputData({...inputData, category:e.target.value})} className="form-control">
                            <option value="">Chọn loại</option>
                            <option value="Áo nam">Áo nam</option>
                            <option value="Áo nữ">Áo nữ</option>
                            <option value="Áo trẻ em">Áo trẻ em</option>
                        </select>
                    </div>
                        <div className="col-md-6 mb-5">
                            <label className="">Hình ảnh</label> <br/>
                            <input
                            type="file"
                            className="form-control"
                            onChange={(event) => {
                                const file = event.target.files[0];
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setInputData({
                                    ...inputData,
                                    image: reader.result
                                    });
                                };
                                reader.readAsDataURL(file);
                            }}
                        />
                        </div>
                        <button type="submit" className="btn btn-success">Lưu</button>
                </div>
          </form>
        </Modal.Body>      
      </Modal>

      
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
                            <input value={inputData.name} onChange={e => setInputData({...inputData, name:e.target.value})}  className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="">Giá</label> <br/>
                            <input value={inputData.price} onChange={e => setInputData({...inputData, price:e.target.value})} type="" className="form-control" />
                        </div>
                        <div className="col-md-6">
                        <label>Tình trạng</label> <br/>
                        <select value={inputData.status} onChange={e => setInputData({...inputData, status:e.target.value})} className="form-control">
                            <option value="">--Chọn tình trạng--</option>
                            <option value="Hàng mới">Hàng mới</option>
                            <option value="Hàng tồn kho">Hàng tồn kho</option>
                        </select>
                        </div>

                        <div className="col-md-6 mb-5">
                        <label className="">Loại</label> <br/>
                        <select value={inputData.category} onChange={e => setInputData({...inputData, category:e.target.value})} className="form-control">
                            <option value="">--Chọn loại--</option>
                            <option value="Áo nam">Áo nam</option>
                            <option value="Áo nữ">Áo nữ</option>
                            <option value="Áo trẻ em">Áo trẻ em</option>
                        </select>
                        </div>
                        <div className="col-md-6 mb-5">
                            <label className="">Hình ảnh</label> <br/>
                            {/* <input
                            type="file"
                            className="form-control"
                            onChange={(event) => {
                                const file = event.target.files[0];
                                const url = URL.createObjectURL(file);
                                setImageUrl(url);
                                setInputData({...inputData, image: url})
                            }}
                        /> */}
                         <input
                            type="file"
                            className="form-control"
                            onChange={(event) => {
                                const file = event.target.files[0];
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setInputData({
                                    ...inputData,
                                    image: reader.result
                                    });
                                };
                                reader.readAsDataURL(file);
                            }}
                        />
                        </div>
                        <button onClick={SubmitEdit} className="btn btn-success">Lưu</button>
                </div>
          </form>
        </Modal.Body>      
      </Modal>
        </>
    )
} 

export default ManagementProduct

