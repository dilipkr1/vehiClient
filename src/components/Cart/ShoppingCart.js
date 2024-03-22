import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cartContext';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// import OrderPlaced from '../Shop/OrderPlaced';
const ShoppingCart = () => {
  const navigate = useNavigate();
  const { isAuthenticated, state } = useContext(AuthContext)
  const { cartState, dispatch } = useContext(CartContext);
  const { user } = state;
  const { cartItems } = cartState;

  let baseUrl;
  if (process.env.NODE_ENV === 'development') {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  if (!user || user.length === 0) {
    return navigate("/login");
  }



  const userId = user[0].userId;
  const handleRemoveFromCart = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };
  const handleAllClear = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };
  const handleIncreaseQuantity = (itemId) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: itemId });
  };
  const handleClearButton = (itemId) => {
    dispatch({ type: 'CLEAR_SingleCART', payload: itemId });
  };

  if (!cartItems || cartItems.length === 0) {
    return <div className=' flex-col m-5 p-3 flex justify-center items-center'>
      <p className='text-logoClr font-extrabold font-sans text-xl rounded-sm'>Your Cart is empty</p>
      <img className='w-30 ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXgY2__KniuYieXzn6koGTAV9WsIxplMSHTfkMwIf1sde7bnxYId7NPpfcecK5iknrj1E&usqp=CAU' />
    </div>
  }

  const totalCartPrice = cartItems.reduce(
    (prev, currentProduct) => prev + (currentProduct.packagePrice * currentProduct.quantity),
    0,
  );

  const totalDiscount = cartItems.reduce((prev, currentProduct) =>
    prev + parseInt(currentProduct.packageDiscount * currentProduct.packagePrice / 100), 0,
  )
  const totalAmountBeforeTax = parseInt(totalCartPrice - totalDiscount)
  const taxAmount = parseInt(totalAmountBeforeTax * 18 / 100)
  const subTotal = (totalAmountBeforeTax + taxAmount).toFixed(2)

  function generateOrderId() {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    return randomId.toString();
  }

  function generateUID() {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const orderId = generateOrderId()

  const cartData = {
    cartItems: [],
    orderId: orderId,
    subTotal: subTotal,
    userId: userId,
  };

  cartItems.forEach(item => {
    const uids = Array.from({ length: item.quantity }, () => generateUID());

    uids.forEach(uid => {
      cartData.cartItems.push({
        orderId: orderId,
        product_id: item._id,
        uid: uid,
        quantity: 1,
        totalDiscount: totalDiscount,
      });
    });
  });

  console.log(cartData)

  const handleCheckOut = async () => {
    if (!isAuthenticated || !user || user.length === 0) {
      return navigate("/login");
    }
    const response = await axios.post(`${baseUrl}/orders/place-order`, cartData);
    console.log(response)
    if (response.status === 201) {
      return navigate("/shop/order-placed")
    }
  };


  return (
    <div className="lg:w-full border-l bg-white border-opacity-20 border-black border-spacing-6">
      <div className="lg:w-full   rounded-xl">
        <span className='pl-2 m-0 text-xl text-logoClr font-semibold  tracking-wider font-sans'>Your Cart</span>

        {cartItems.map((item) => (
          <div key={item._id} className="flex-col   my-2 text-sm">
            <div className="flex  items-start  justify-around  rounded-xl w-full ">
              <div>
                <img className='rounded' style={{ width: "100px", height: "100px" }} src={item.packageImg} alt={item.packageImg} />
              </div>
              <div className='lg:flex  justify-start gap-10'>
                <div className='flex-col gap-10'>
                  <h5 className="font-semibold text-xs p-0">{item.packageName}</h5>
                  <p className="text-gray-500 p-0">Price: ₹{item.packagePrice}</p>
                  <p className="text-gray-500 p-0">Quantity: {item.quantity}</p>
                </div>
                <div className='mt-2 lg:flex '>
                  <button
                    className="text-2xl  px-2  bg-red-500 text-black    rounded hover:bg-red-600 transition duration-300 ease-in-out"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    <span style={{ width: "20px" }} className='tracking-widest text-2xl w-3 p-1'>-</span>
                  </button>
                  <button
                    className=" text-2xl px-2   bg-red-500 text-black   rounded hover:bg-red-600 transition duration-300 ease-in-out"
                    onClick={() => handleIncreaseQuantity(item._id)}
                  >               <span className='tracking-widest w-4 text-2xl p-1'>+</span>

                  </button>
                </div>

                <div className='flex  justify-end items-start'>
                  <Button
                    style={{ color: "FF0000", fontSize: "25px" }}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleClearButton(item._id)}
                    className=" text-black text-2xl   font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                  >
                  </Button>

                </div>
              </div>
            </div>
            <hr className='border-black border-opacity-10' />
          </div>
        ))}
      </div>
      <div className='flex flex-col font-sans text-xl p-2  m-1 '>
        <div className='flex justify-between'>
          <input className='w-70 border border-t-0 border-r-0 border-l-0 
          border-b-1 font-sans border-black text-black  border-opacity-30 p-1 outline-none' type="text" placeholder='Entner Coupan Code' />
          <Button style={{
            backgroundColor: "#ffa500", marginRight: "10px",
            width: "100px"
          }}
            variant="contained" className=''>Apply</Button>
        </div>
        <div className='flex lg:flex-col gap-1 p-2 '>
          <span className='flex justify-between tracking-wide   text-sm font-normal font-sans  grid-'><span className='pr-14'> Total:<b> <b>₹</b></b></span> {totalCartPrice} </span>
          <span className='flex justify-between   tracking-wide text-sm font-sans font-normal'><span className='pr-9'>Discount :  </span><span><b>-</b>{parseInt(totalDiscount)}</span></span>
          <span className=' flex justify-between   tracking-wide text-sm font-sans font-normal'><span className='pr-17'>Tax : </span><span><b>+</b>{taxAmount}</span></span>
          <span className='flex py-0 justify-between  tracking-wide font-bold text-xl '> <span className='pr-5'>SubTotal : ₹ </span><span>{subTotal}</span></span>
          <sub className='text-xs p-0'>Payable Amount</sub>
        </div>
        <div className='flex w-full justify-cetner items-center mt-2 text-white'>
          {/* <Link to={`/shop/checkout`} className=""> */}
          <Button
            onClick={() => handleCheckOut()}
            style={{ font: "bold", backgroundColor: "#ffa500", color: "#ffffff", padding: "10px auto", margin: "10px 0 0 90px", width: "300px" }}
            variant="contained"
          >
            CHECKOUT
          </Button>
          {/* </Link> */}

        </div>

      </div>
    </div>
  );
};

export default ShoppingCart;
