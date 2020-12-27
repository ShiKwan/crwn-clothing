import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I37LeGVmuHCpjm25nHL2Ao5yZeOu5bYcHExhA4SZITEWddKo3lKiHUOH37rsNng8gDvtJxVroOLxL5dry3ZWdrk00RLFGS1bS';
    const onToken = token => {
        console.log(token);
        alert('Payment Successful!');
    }
    return(
        <StripeCheckout
            currency="USD"
            label='Pay Now'
            name='CRWN Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton