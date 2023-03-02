
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Contact = () =>{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear(); // Lấy năm hiện tại
    const currentMonth = currentDate.getMonth(); // Lấy tháng hiện tại (từ 0 đến 11)
    const currentDay = currentDate.getDate(); // Lấy ngày hiện tại
    const currentHour = currentDate.getHours(); // Lấy giờ hiện tại
    const currentMinute = currentDate.getMinutes(); // Lấy phút hiện tại
    const currentDateTime = `${currentHour}:${currentMinute}   ${currentDay}/${currentMonth+1}/${currentYear}`;
    event.preventDefault();
    if(!name || !email || !message){
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
    setName("");
    setEmail("");
    setMessage("");
    axios.post("http://localhost:3000/contacts", {
      name: name,
      email: email,
      message: message,
      time:currentDateTime
    })
      .then((response) => {
        console.log(response);
        toast.success('Gửi yêu cầu thành công', {
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
      .catch((error) => {
        console.log(error);
        alert("An error occurred while sending your message.");
      });
  };
  return(
      <>
         <div className="container contact_container mt-5">
    <div className="mapouter">
  <div className="">
    <iframe width="1300" height={500}src="https://maps.google.com/maps?q=cong%20vien%20phan%20mem%20quang%20trung&t=&z=13&ie=UTF8&iwloc=&output=embed"/><a href="https://123movies-to.org" /><br /><style dangerouslySetInnerHTML={{__html: "\n\t\t\t\t.mapouter {\n\t\t\t\t  position: relative;\n\t\t\t\t  text-align: right;\n\t\t\t\t  height: 500px;\n\t\t\t\t  width: 1110px;\n\t\t\t\t}" }} /><a href="https://www.embedgooglemap.net"></a><style dangerouslySetInnerHTML={{__html: "\n\t\t\t\t.gmap_canvas {\n\t\t\t\t  overflow: hidden;\n\t\t\t\t  background: none !important;\n\t\t\t\t  height: 500px;\n\t\t\t\t  width: 1110px;\n\t\t\t\t}\n\t\t\t  " }} />
  </div>
</div>
{/* Contact Us */}
<div className="row">
  <div className="col-lg-6 contact_col mt-2">
    <div className="contact_contents">
      <h1>Liên Hệ Chúng Tôi</h1>
      <p>Có nhiều cách để liên hệ với chúng tôi. Bạn có thể gửi cho chúng tôi một dòng, gọi cho chúng tôi hoặc gửi email, chọn những gì phù hợp nhất với bạn.</p>
      <div>
        <p>0387653312</p>
        <p>tranvantri270802@gmail.com</p>
      </div>
      <div>
        <p>Giờ mở cửa: 8:00-18:00 Trong Tuần</p>
        <p>Cuối Tuần: Đóng cửa</p>
      </div>
    </div>
    {/* Follow Us */}
    <div className="follow_us_contents">
      <h1>Theo Dõi Tại.</h1>
      <ul className="social d-flex flex-row">
      <i class="bi bi-facebook text-primary fs-2"></i>
      <i class="bi bi-instagram fs-2 text-danger ms-2"></i>
      <i class="bi bi-tiktok fs-2 ms-2"></i>
      </ul>
    </div>
  </div>
  <div className="col-lg-6 get_in_touch_col mt-2">
    <div className="get_in_touch_contents">
      <h1>Hãy Liên Lạc Với Chúng Tôi!</h1>
      <p>Điền vào biểu mẫu dưới đây để được phản hồi của chúng tôi.</p>
      <form onSubmit={handleSubmit}>
      <div className="row">
        <input
          placeholder="Tên"
          className=" ms-2 p-3 col-9 mb-3"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="ms-2 p-3 col-9 mb-3"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          rows="3"
          className="ms-2 col-9 p-3"
          placeholder="Lời nhắn"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-danger mt-2 px-5 float-start border-0">
        Gửi
      </button>
    </form>
    </div>
  </div>
</div>
</div>

      </>
  )
}

export default Contact
