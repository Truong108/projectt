import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";


const Blog =() =>{
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  let componentMounted = true;
  const dispatch = useDispatch();
  useEffect(() => {
    const getsProducts = async () => {
      const response = await fetch("http://localhost:3000/blog");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
      }
      return () => {
        componentMounted = false;
      };
    };
    getsProducts();
  }, []);
    return (
        <>
        <div className="container mt-5">
            <div className="row">
              <h2 className="text-center mb-4">Cập nhật tin tức</h2>
                  {filter.map((item) =>{
                    return(
                      <div className="col-lg-4 col-md-12 mb-4">
                  <div className="card">
                    <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                      <img src={item.image} alt="" className="img-fluid" height="500"/>
                      <a href="#!">
                        <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}} />
                      </a>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                       {item.description}
                      </p>
                     <button className="btn px-4"  style={{backgroundColor: "#fe4c50", color:"white"}} >Xem</button>
                    </div>
                  </div>
                </div>
                    )
                  })}
              </div>
        </div>
        </>
    )
}

export default Blog