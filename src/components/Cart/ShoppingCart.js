
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartContext';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// import { CardGiftcard } from '@mui/icons-material';
import loadingGif from "../../images/loading.gif";
import { VendorContext } from '../../context/vedorContext';
import { FlashlightOffRounded } from '@mui/icons-material';


const ShoppingCart = () => {
  const navigate = useNavigate();
  const { isAuthenticated, state } = useContext(AuthContext)
  let { user } = state;
  const { cartState, dispatch } = useContext(CartContext);
  const [mexQuantity, setMaxQuantity] = useState(null)
  const { cartItems } = cartState;
  const [vehicleNo, setCarNo] = useState(null);
  const [errorMessge, setErrorMessage] = useState(false)
  const [referCode, setReferCode] = useState(false);
  const [code, setCode] = useState(null);
  const [referralText, setReferralText] = useState('Apply')
  const [text, setText] = useState('')
  const [isValid, setIsValid] = useState(false);
  const { vendorData, setVendorData } = useContext(VendorContext);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: " ",
    city: "",
    vehicleNo: "",
    vehiType: "",
    stAddress: "",
    house: "",
    stateAddress: "",
    pinCode: "",
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


  useEffect(() => {
    if (code) {
      const isMatch = vendorData?.some(vendor => vendor.referralCode.toLowerCase() === code.toLowerCase());

      if (isMatch) {
        setIsValid(true);
        setReferralText('Applied');
        setText('Applied Successfully');
      } else {
        setIsValid(false);
        setReferralText('Apply');
        setText('Invalid Code');
        // setReferCode('') 
      }

      const timer = setTimeout(() => {
        setText('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [code, vendorData]);


  const defaultUser = {
    email: 'default@example.com',
    customerPhone: '000-000-0000',
    customerName: 'Guest User'
  }

  if (!user || user.length === 0) {
    user = defaultUser
  }

  if (!vendorData) {
    return
  }



  const email = user.email;
  const phone = user.mobileNumber;
  const name = user.username

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData)
  }



  // const handleRefereBtn = async (e) => {
  //   e.preventDefault();
  //   console.log("refer input code", code)

  // }

  const userId = user._id;

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
    return <div className='mt-20 flex-col m-5 p-3 flex justify-center items-center'>
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

  function generateTxid() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(10000 + Math.random() * 90000).toString();
    const prefix = 'IN';
    const txid = `${prefix}${timestamp}${randomNum}`;
    return txid;
  }

  let crno = formData.vehiType === 'bk' ? `B-${formData.vehicleNo}` : `C-${formData.vehicleNo}`;

  const productId = cartItems[0]._id;
  const orderId = generateOrderId()
  const getTxid = generateTxid();

  const orderData = {
    orderId: orderId,
    userId: userId,
    txid: getTxid,
    product_id: productId,
    vehicleNo: crno,
    fullName: formData.fullName || null,
    phone: formData.phone || null,
    referCode: code || null,
    stAdress: formData.stAddress || null,
    house: formData.house || null,
    stateAddress: formData.stateAddress || null,
    pinCode: formData.pinCode || null,
    city: formData.city || null,
    totalDiscount: totalDiscount,
    quantity: 1,
  };

  console.log("uuusssid", userId)


  if (!isAuthenticated || !user || user.length === 0) {
    return <div className='mt-20 flex-col m-5 p-3 flex justify-center items-center'>
      <p className='text-black font-bold font-sans  text-2xl rounded-sm'>Your Cart is empty</p>
      <img className='w-30 rounded-2xl' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXgY2__KniuYieXzn6koGTAV9WsIxplMSHTfkMwIf1sde7bnxYId7NPpfcecK5iknrj1E&usqp=CAU' />
    </div>
  }


  const paymentData = {
    txnid: getTxid,
    amount: 499.0,
    name: formData.fullName,
    email: email,
    phone: formData.phone,
    productinfo: 'Vehiconnect Scanner',
    surl: `${baseUrl}/pay/response`,
    furl: `${baseUrl}/pay/response`,
    udf1: '',
    udf2: '',
    udf3: '',
    udf4: '',
    udf5: '',
    udf6: '',
    udf7: '',
    udf8: '',
    udf9: '',
    udf10: ''
  }

  const handleEsseBuzzPg = async () => {
    try {

      const response = await axios.post(`${baseUrl}/pay/initiate_payment`, paymentData);
      // console.log("data:-->>", response.data);
      if (response.status === 200) {
        window.location.href = response.data.url;
      } else {
        setErrorMessage("Payment Failed");
        console.error('Payment initiation failed:', response);
      }
    } catch (error) {
      setErrorMessage("something went wrong");
      console.error('Error initiating payment:', error);
    }
  }


  const handleCheckOut = async () => {
    try {
      if (!formData.vehicleNo) {
        setErrorMessage('Please Enter the Last 4 Digit of your car no..!')
        return
      }
      const response = await axios.post(`${baseUrl}/place-order`, orderData);
      if (response.status === 201) {
        // window.location.href = `${paymentUrl}/view?email=${email}&phone=${phone}`;
        //call the EsseBuzz payment gateways 
        console.log('essbuzz pg initiated')

        await handleEsseBuzzPg();
        console.log('essbuzz pg called')
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
    <div className="lg:w-full  border-l bg-white border-opacity-20 border-black rounded-2xl p-2">
      <div className="lg:w-full   rounded-xl">
        {/* <span className='pl-2 m-0 text-2xl text-black font-bold   tracking-wider font-sans'>Your Cart</span> */}

        {cartItems.map((item) => (
          <div key={item._id} className="flex-col   my-2 text-sm">
            <div className="lg:flex  items-start   justify-start  gap-8  rounded-xl w-full  px-3">
              <div className='flex justify-center items-center py-1'>
                <img className='rounded  deskImg' src={item.packageImg} alt={item.packageImg} />
              </div>
              <div className='flex  justify-start gap-10 tracking-wide px-2 my-auto'>
                <div className='flex-col gap-10'>
                  <h5 className="font-semibold text-sm  p-0">{item.packageName}</h5>
                  <p className="text-gray-500 p-0 font-bold text-sm ">Price: ₹{item.packagePrice}</p>
                </div>

              </div>
            </div>
            <hr className='border-black border-opacity-10' />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} >
        <div className='flex flex-col font-sans text-xl p-2 m-1'>
          {errorMessge && <p className='text-red-500 text-xs font-bold'>{errorMessge}</p>}

          <div className='flex flex-col gap-4'>
            <input
              name='fullName'
              maxLength={100}
              required
              onChange={handleChange}
              className='w-full border rounded-sm border-[#d1d1d1] p-2 outline-none'
              type="text"
              placeholder='Enter Full Name'
            />
            <input
              name='phone'
              type="tel"
              required
              maxLength={10}
              onChange={handleChange}
              className='w-full lowercase border rounded-sm border-[#d1d1d1] p-2 outline-none'
              placeholder='Email'
            />

            <input
              name='house'
              required
              maxLength={200}
              onChange={handleChange}
              className='w-full border rounded-sm border-[#d1d1d1] p-2 outline-none'
              type="text"
              placeholder='flat,House no,Building,Apartment'
            />

            <input
              name='stAddress'
              required
              maxLength={200}
              onChange={handleChange}
              className='w-full border rounded-sm border-[#d1d1d1] p-2 outline-none'
              type="text"
              placeholder='Area, Street,sector, Village'
            />
            <input
              name='pinCode'
              required
              onChange={handleChange}
              maxLength={6}
              className='w-full border rounded-sm border-[#d1d1d1] p-2 outline-none'
              type="text"
              placeholder='Enter Pin Code'
            />
            <input
              name='city'
              maxLength={50}
              required
              onChange={handleChange}
              className='w-full border rounded-sm border-[#d1d1d1] p-2 outline-none'
              type="text"
              placeholder='Enter City'
            />


            <div className='flex flex-col gap-4'>
              <select
                className='w-full py-2 border rounded-sm border-[#d1d1d1] outline-none'
                required
                name='stateAddress'
                onChange={handleChange}
              >
                <option disabled hidden>Choose State</option>
                <option hidden>Choose State</option>
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

              <select
                className='w-full py-2 border rounded-sm border-[#d1d1d1] outline-none'
                required
                name='vehiType'
                onChange={handleChange}
              >
                <option value="cr" disabled hidden>Choose Vehicle Type</option>
                <option value="cr">Car</option>
                <option value="bk">Bike</option>
              </select>
            </div>

            <input
              name='vehicleNo'
              maxLength={20}
              required
              onChange={handleChange}
              className='w-full uppercase border rounded-sm border-[#d1d1d1]  outline-none p-2'
              type="text"
              placeholder='Enter Your Vehicle Number'
            />
          </div>



          <div className='flex flex-col my-2'>
            <span className='flex justify-between text-sm font-bold mb-1 tracking-normal'>
              <button onClick={() => setReferCode(!referCode)} className='pr-14 text-logoClr'>Have a refferal code ?</button>
            </span>
            {referCode &&
              <>
                <div className='flex justify-between'>
                  <input
                    name='code'
                    required
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={7}
                    className='w-96  border rounded-sm my-1 border-[#d1d1d1] p-2 outline-none'
                    type="text"
                    placeholder='Enter a referral code'
                  />
                  <button style={{ backgroundColor: "#ffa500", color: "#ffffff" }}
                    className='px-3 rounded-sm py-0 my-1'
                  >{referralText}
                  </button>
                </div>
                <p className={`text-xs tracking-wide ${isValid ? 'text-green ' : 'text-red'}`}>
                  {text}
                </p>              </>}

            <span className='flex justify-between text-sm font-bold'>
              <span className='pr-14'>Total:</span>
              <span><b>₹ </b>{totalCartPrice} /-</span>
            </span>
            <span className='flex justify-between text-sm font-bold'>
              <span className='pr-17'>GST Included (18%)</span>
              {/* <span><b>₹ </b>{taxAmount} /-</span> */}
            </span>
            <span className='flex py-0 justify-between text-xl font-bold'>
              <span className='pr-5'>SubTotal:</span>
              <span><b>₹ </b>{subTotal} /-</span>
            </span>
            <sub className='text-xs font-bold'>(Payable Amount)</sub>
          </div>

          <div className='flex w-full justify-start items-start mt-2'>
            <button
              type='submit'
              style={{ backgroundColor: "#ffa500", color: "#ffffff" }}
              className="font-bold rounded uppercase text-white w-full p-3 tracking-wider"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </form>
    </div >
  );
};

export default ShoppingCart;
