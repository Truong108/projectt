import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { delItem } from '../redux/action'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Cart = () => {
    const state = useSelector((state)=> state.handleCart)
    const dispatch = useDispatch()
    var total = 0
    const handleClose = (item) => {
        dispatch(delItem(item))
    }
    const [cartQuantities, setCartQuantities] = useState({});

// Set default quantity for a cart item
const defaultQuantity = 1;

const handleIncrement = (cartItem) => {
  const newQuantities = { ...cartQuantities };
  newQuantities[cartItem.id] = (newQuantities[cartItem.id] || defaultQuantity) + 1;
  setCartQuantities(newQuantities);
};

const handleDecrement = (cartItem) => {
  const newQuantities = { ...cartQuantities };
  newQuantities[cartItem.id] = Math.max((newQuantities[cartItem.id] || defaultQuantity) - 1, 0);
  setCartQuantities(newQuantities);
};
    
    const cartItems = (cartItem) => {
        const quantity = cartQuantities[cartItem.id] || 1;
        const itemTotal = quantity * cartItem.price;
        total += itemTotal;
        return (
          <>
          
        
          <div className="px-4 bg-light rounded-3" key={cartItem.id}>
            <div className="container py-4">
              <button onClick={()=>handleClose(cartItem)} className="btn-close float-end" aria-label="Close"></button>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <img src={cartItem.image} alt={cartItem.name} height="200px" width="180px" />
                </div>
                <div className="col-md-4">
                  <h4 className='mb-3'>{cartItem.name}</h4>
                  <button className='px-2 btn-danger' onClick={() => handleDecrement(cartItem)}>-</button>
                  <span className='ms-3 me-3'>Số lượng {quantity}</span>
                  <button className='px-2 btn-danger' onClick={() => handleIncrement(cartItem)}>+</button>
                  <h2 className="lead fw-bold fs-3 mt-4 text-danger">{itemTotal}.000 VND</h2>
                 
                </div>
              </div>
            </div>
          </div>
            
                </>
        );
      };

    const emptyCart = () => {
        return (
            <>
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-5" >
                    <div className="row">
                        <h3 className='text-center'>Giỏ hàng của bạn đang trống <i class="bi bi-bag-x"></i>
                       <Link to="/product"> <button className=' ms-2 p-1 btn btn-danger'>Mua tại đây</button></Link></h3>
                    </div>
                </div>
            </div>
                <div style={{marginBottom:"550px"}}></div>
          
         
            </>
        );
    }

    const tongtien = () =>{
        return (
            <div className='container ' style={{marginBottom:"100px"}}>
                <div className='row'>
                    <div className='col-md-8 float-end'>
                    </div>
                    <div className='col-md-4'>
                <h3 className=''>Tổng tiền {total}.000 VND</h3>
                <Link to="/payments"> <button style={{backgroundColor: "#fe4c50"}} className="btn mt-3 text-white">Đi đến trang thanh toán</button></Link> 
                <Link to="/product"> <button className="btn mt-3 text-white btn-secondary">Tiếp tục mua sắm</button></Link> 
                    </div>
                </div>
            </div>
            
        )
    }


    return (
        <>
            <div className='row mt-5 detail-mt'></div>
            <div className='row mt-5 detail-mt'></div>
            <div className='row mt-3 detail-mt'></div>
            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(cartItems)}
            {state.length !== 0 && tongtien()}
        </>
    )
}

export default Cart
