import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CardGiftcard } from '@mui/icons-material';

// const paymentUrl = window.REACT_APP_PAYMENT_URL;
const paymentUrl = 'https://pages.razorpay.com/pl_Nu85dk5Y6mPTKJ';


// import OrderPlaced from '../Shop/OrderPlaced';
const ShoppingCart = () => {
  const navigate = useNavigate();
  const { isAuthenticated, state } = useContext(AuthContext)
  const { cartState, dispatch } = useContext(CartContext);
  const [mexQuantity, setMaxQuantity] = useState(null)
  const { user } = state;
  const { cartItems } = cartState;
  const [car_No, setCarNo] = useState(null);
  const [errorMessge, setErrorMessage] = useState(false)
  const [formData, setFormData] = useState({
    stAddress: "",
    stateAddress: "",
    pinCode: "",
    car_No: ""
  })
  let baseUrl;
  if (process.env.NODE_ENV === 'development') {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }



  useEffect(() => {

    if (cartItems.length > 1 || cartItems.some(item => item.quantity > 1)) {
      setErrorMessage('Please Note only one product per transaction!');
    } else {
      setErrorMessage('');
    }
  }, [cartItems]);

  if (!user || user.length === 0) {
    return <p>Loading</p>
  }
  const email = user[0].customerEmail;
  const phone = user[0].customerPhone;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));


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
      <p className='text-black font-bold font-sans  text-2xl rounded-sm'>Your Cart is empty</p>
      <img className='w-30 rounded-2xl' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXgY2__KniuYieXzn6koGTAV9WsIxplMSHTfkMwIf1sde7bnxYId7NPpfcecK5iknrj1E&usqp=CAU' />
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
  const taxAmount = 0;
  // parseInt(totalAmountBeforeTax * 18 / 100)
  const subTotal = (totalAmountBeforeTax + taxAmount).toFixed(2)

  const generateOrderId = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(5, 10).replace(/-/g, '');
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random number
    const orderId = formattedDate + String(randomDigits).padStart(4, '0'); // Ensures 4 digits
    return orderId;
  };


  function generateUID() {
    const min = 1000;
    const max = 9999;
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    const x = "VT" + result
    return x;
  }

  const orderId = generateOrderId()
  // const car_No = carNo
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
        totalDiscount: totalDiscount,
        quantity: 1,
        product_id: item._id,
        uid: uid,
        car_No: formData.car_No,
        stAdress: formData.stAddress || null,
        stateAddress: formData.stateAddress || null,
        pinCode: formData.pinCode || null
      });
    });
  });


  if (!isAuthenticated || !user || user.length === 0) {
    return navigate("/login");
  }

  const handleCheckOut = async () => {
    try {
      if (!formData.car_No) {
        setErrorMessage('Please Enter the Last 4 Digit of your car no..!')
        return
      }
      const response = await axios.post(`${baseUrl}/orders/place-order`, cartData);
      if (response.status === 201) {
        console.log("successfully checkout")
        window.location.href = `${paymentUrl}/view?email=${email}&phone=${phone}`;
      }

    } catch (error) {
      console.error(error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCheckOut();
  }

  return (
    <div className="lg:w-full border-l bg-white border-opacity-20 border-black rounded-2xl p-2">
      <div className="lg:w-full   rounded-xl">
        {/* <span className='pl-2 m-0 text-2xl text-black font-bold   tracking-wider font-sans'>Your Cart</span> */}

        {cartItems.map((item) => (
          <div key={item._id} className="flex-col   my-2 text-sm">
            <div className="lg:flex  items-start   justify-start  gap-8  rounded-xl w-full  px-3">
              <div className='flex justify-center items-center py-3'>
                <img className='rounded mb-1 productSizeMOb' src={item.packageImg} alt={item.packageImg} />
              </div>
              <div className='flex  justify-start gap-10 tracking-wide px-2'>
                <div className='flex-col gap-10'>
                  <h5 className="font-semibold text-xl p-0">{item.packageName}</h5>
                  <p className="text-gray-500 p-0 font-bold text-xl">Price: ₹{item.packagePrice}</p>
                  {/* <p className="text-gray-500 p-0">Quantity: {item.quantity}</p> */}
                </div>
                {/* <div className='mt-2 lg:flex '>
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
                </div> */}

                {/* <div className='flex  justify-end items-start'>
                  <Button
                    style={{ color: "FF0000", fontSize: "25px" }}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleClearButton(item._id)}
                    className=" text-black text-2xl   font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                  >
                  </Button>

                </div> */}
              </div>
            </div>
            <hr className='border-black border-opacity-10' />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} >
        <div className='flex flex-col font-sans text-xl p-2  m-1 '>
          {errorMessge && <p className='text-red text-xs font-bold font-sans  tracking-wide'>{errorMessge}</p>}
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col justify-start'>
              <input name='car_No' maxLength={20} required onChange={handleChange} className='w-full border  border-t-0 border-r-0 border-l-0 
          border-b-1 font-sans border-black text-black  text-xl border-opacity-30 p-1 outline-none' type="text" placeholder='Enter Your Vehicle Number' />

              <div className='address flex flex-col gap-4 my-3'>
                <input name='stAddress' required maxLength={200} onChange={handleChange} className='w-full mt-1 border border-t-0 border-r-0 border-l-0 
          border-b-1 font-sans border-black text-black  text-xl border-opacity-30 p-1 outline-none' type="text" placeholder='Street Address' />
                <select className='mt-1' required name='stateAddress' onChange={handleChange}>
                  <option value="" selected disabled hidden>Choose State</option>
                  <option value="AP">Andhra Pradesh</option>
                  <option value="AR">Arunachal Pradesh</option>
                  <option value="AS">Assam</option>
                  <option value="BR">Bihar</option>
                  <option value="CT">Chhattisgarh</option>
                  <option value="GA">Gujarat</option>
                  <option value="HR">Haryana</option>
                  <option value="HP">Himachal Pradesh</option>
                  <option value="JK">Jammu and Kashmir</option>
                  <option value="GA">Goa</option>
                  <option value="JH">Jharkhand</option>
                  <option value="KA">Karnataka</option>
                  <option value="KL">Kerala</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="MN">Manipur</option>
                  <option value="ML">Meghalaya</option>
                  <option value="MZ">Mizoram</option>
                  <option value="NL">Nagaland</option>
                  <option value="OR">Odisha</option>
                  <option value="PB">Punjab</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="SK">Sikkim</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="TG">Telangana</option>
                  <option value="TR">Tripura</option>
                  <option value="UT">Uttarakhand</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="WB">West Bengal</option>
                  <option value="AN">Andaman and Nicobar Islands</option>
                  <option value="CH">Chandigarh</option>
                  <option value="DN">Dadra and Nagar Haveli</option>
                  <option value="DD">Daman and Diu</option>
                  <option value="DL">Delhi</option>
                  <option value="LD">Lakshadweep</option>
                  <option value="PY">Puducherry</option>
                </select>
                <input required name='pinCode' onChange={handleChange} maxLength={200} className='mt-1 w-full border border-t-0 border-r-0 border-l-0 
          border-b-1 font-sans border-black text-black  text-xl border-opacity-30 p-1 outline-none' type="text" placeholder='Pin Code' />

              </div>
            </div>
            {/* <div className='flex justify-between'>
              <input className='w-70 border border-t-0 border-r-0 border-l-0 
          border-b-1 font-sans border-black text-black  border-opacity-30 p-1 outline-none' type="text" placeholder='Entner Coupan Code' />
              <Button style={{
                backgroundColor: "#ffa500", marginRight: "10px",
                width: "100px"
              }}
                variant="contained" className=''>Apply</Button>
            </div> */}
          </div>
          <div className='flex flex-col p-2 '>
            <span style={{ fontSize: "1.1rem" }} className='flex justify-between tracking-wide   text-sm font-bold font-sans  grid-'><span className='pr-14'> Total:</span> <span><b>₹ </b>{totalCartPrice} /-</span></span>
            {/* <span className='flex justify-between   tracking-wide text-sm font-sans font-normal'><span className='pr-9'>Discount :  </span><span><b>-</b>{parseInt(totalDiscount)}</span></span> */}
            <span style={{ fontSize: "0/85rem" }} className=' flex justify-between   tracking-wide font-sans font-bold '><span className='pr-17'>GST Included(18%) </span>
              {/* <span><b>₹ </b>{taxAmount} /-</span> */}
            </span>
            <span className='flex py-0 justify-between  tracking-wide font-bold text-xl '> <span className='pr-5'>SubTotal :  </span><span><b>₹ </b>{subTotal} /-</span></span>
            {/* <span className='flex py-0 justify-between  tracking-wide font-bold text-xl '> <sub className='pr-5'>Payable Amount</sub> <span><b style={{fontWeight:"500"}}></b> Year</span></span> */}

            <sub className='text-xs p-0 font-bold'>(Payable Amount)</sub>
          </div>
          <div className='flex w-full justify-start items-start mt-2 text-white'>
            {/* <Link to={`/shop/checkout`} className=""> */}
            <button

              type='submit'

              // onClick={() => handleCheckOut()}
              style={{ backgroundColor: "#ffa500", color: "#ffffff", padding: "10px auto", margin: "10px 10px", width: "" }}

              className="font-bold uppercase text-white  w-full p-3  lg:w-96 tracking-wider"
            >
              CHECKOUT
            </button>
            {/* </Link> */}
          </div>
        </div>

      </form>
    </div >
  );
};

export default ShoppingCart;
