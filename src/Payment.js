import React, {useEffect, useState} from 'react';
import {useStateValue} from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import  './Payment.css';
import {Link , useHistory} from "react-router-dom";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "./reducer";
import axios from "axios";

function Payment() {

    const stripe = useStripe();
    const elements = useElements();

    const [{basket , user} , dispatch] = useStateValue();
    const [succeeded , setSucceeded] = useState(false);
    const [processing , setProcessing] = useState(false);

    const [error , setError] = useState(null);
    const [disabled , setDisabled] = useState(true);
    const [clientSecret , setClientSecret] = useState('');
    const history = useHistory();

    useEffect(() => {
        //generate the special stripe secret  which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method:'post',
                // stripe expects the total in currencies sub units
                url:`/payments/create?total=${getBasketTotal(basket) * 100}`
            });

            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();

    },[basket]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret , {
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation like that
            setSucceeded(true)
            setError(null)
            setProcessing(false);

            history.replace('/orders')
        });
    };

    const handleChange = event => {
        //Listen for the card element changes
        setError(event.error ? event.error.message : "");
        setDisabled(event.empty);
    };


    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>
                    Checkout (<Link to={'/checkout'}>{basket?.length} Items</Link>)

                </h1>
                {/*payment section - delivery address*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                        <div className="payment__address">
                            <p>{user?.email}</p>
                            <p>No 123 , React Lane</p>
                            <p>SriLanka</p>
                        </div>
                </div>
                {/*payment section - review item*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket?.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                         {/*stripe majic*/}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> :"Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;