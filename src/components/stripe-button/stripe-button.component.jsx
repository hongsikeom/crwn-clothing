import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I4LoyKRDyer0lhGkuvmsxtEdMZdfyhhrVux4ubpuUZZuxjYNLCYZAQtKS9gMEOBLdG8zXojcG67C993I5HmjVgD00Ge8JFuyD';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    return (
        <StripeCheckout
            lable='Pay Now'
            name='HS Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};
export default StripeCheckoutButton;