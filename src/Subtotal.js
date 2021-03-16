import React from 'react';
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import {useStateValue} from "./StateProvider";

function Subtotal() {

    const [{basket} , dispatch ] = useStateValue();
    const subtotal = basket.reduce((accumulator , item) => {
        return accumulator + item.price;
    }, 0);

    console.log("Subtotal will b :" , subtotal);
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket?.length} Items) : <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox"/> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={subtotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;