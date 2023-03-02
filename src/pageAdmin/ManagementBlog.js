import React, { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { toast } from "react-toastify";

const ManagementBlog = () =>{
    const [data,setData] = useState([])
    const [showEdit, setShowEdit] = useState(false);
    const [indexx, setIndexx] = useState()
    const handleCloseEdit = () => {  setShowEdit(false);}
    const handleShowEdit = () => {setShowEdit(true)}
    const [inputData,setInputData] = useState({
        id: '',
        tile: '',
        image: '',
        description: '',
    })
    const handleEditClick = (id) => {
        loadapi(id)
        setIndexx(id)
        handleShowEdit()
      }
      const loadapi = (id) =>{
        axios.get("http://localhost:3000/blog/" + id )
        .then(res => setInputData(res.data))
        .catch(err => console.log(err))
    }
    useEffect(() =>{
        axios.get("http://localhost:3000/blog")
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    },[]
    )
    const SubmitEdit = async (e) =>{
        e.preventDefault()
        await axios.put("http://localhost:3000/blog/"+ indexx, inputData)
        setData(res => {
            const newData = res.map(item => {
                if(item.id === indexx) {
                    return inputData
                } else {
                    return item
                }
            })
            toast.success('Sửa Blog thành công', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return newData
        })
        handleCloseEdit()
    }
    return(
        <>
            <div className='margin-t-nav'></div>
            <div className="container ">
                <table className="table table-hover table-bordered">
                    <thead className="table-warning">
                        <tr>
                            <th>ID</th>
                            <th>Ảnh</th>
                            <th>Tiêu đề</th>
                            <th>Mô tả</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                            {data.map((item)=>{
                                return(
                                    <>
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td> <img src={item.image} alt="" width="150" height="100"/></td>
                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>  <button onClick={() => handleEditClick(item.id)} className="btn btn-warning ms-3"><i className="bi bi-pencil-square"></i></button></td>
                                        </tr>
                                    </>
                                )
                            })}
                    </tbody>
                </table>
            </div>
            <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
                <div className="row">
                        <div className="col-md-12 mb-3">
                            <label className="">ID</label> <br/>
                            <input value={inputData.id} disabled="disabled" type="number" className="form-control" />
                        </div>
                        
                        <div className="col-md-12 mb-3">
                            <label className="">Hình ảnh</label> <br/>
                            {/* <input
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setInputData({ ...inputData, image: URL.createObjectURL(file) });
                            }}
                            type="file"
                            className="form-control"
                            placeholder="Hãy đưa URL vào đây"
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
                        <div className="col-md-12 mb-3">
                            <label> Title</label> <br/>
                            <input value={inputData.title} onChange={e => setInputData({...inputData, title:e.target.value})}  className="form-control" />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="">Mô tả</label> <br/>
                            <textarea rows="5" value={inputData.description} onChange={e => setInputData({...inputData, description:e.target.value})} type="" className="form-control" />
                        </div>
                        <button onClick={SubmitEdit} className="btn btn-success">Lưu</button>
                </div>
          </form>
        </Modal.Body>      
      </Modal>
        </>
    )
}

export default ManagementBlog