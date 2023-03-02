import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManagementContact = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      if(window.confirm("Bạn có muốn xóa tin nhắn này không?")){
      const response = await axios.delete(`http://localhost:3000/contacts/${id}`);
      console.log(response.data);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
      toast.success('Xóa tin nhắn thành công', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const EmptyContact = () =>{
      return(
        <>
            <div className='container'>
                <div className='row text-center mt-5'>
                  <h2 className='mt-5 text-danger text-cnter'> Chưa có tin nhắn liên hệ nào... <i class="bi bi-headset"></i></h2>
                </div>
            </div>
        </>
      )
  }

  const notify = () =>{
    return (
      <>
           <div className='margin-t-nav'></div>
        <div className='container'>
            <table className='table table-hover table-bordered'>
                <thead className='table-warning'>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Tin nhắn</th>
                        <th>Thời gian gửi</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                {contacts.map(contact =>(                
          <tr key={contact.id}>
            <td width="3%">{contact.id}</td>
            <td width="15%">{contact.name}</td>
            <td width="20%">{contact.email}</td>
            <td>{contact.message}</td>
            <td width="10%">{contact.time}</td>
            <td width="8%"> <button className='bi bi-trash btn btn-danger text-center' onClick={() => handleDelete(contact.id)}></button></td>
          </tr>
             ))}
             
                </tbody>
            </table>
        </div>
      </>
    )
  }
  return (
    <>
         {contacts.length === 0 && EmptyContact()}
         {contacts.length !== 0 && notify()}
    </>
  );
};

export default ManagementContact;