import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const key = "pk_test_4FtVeJWnGgAApo57G61TjYrh00bBIHPKgh";

  const onToken = token => {
    console.log(token);
    alert("Payment successfull!");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="ecommerce-clone"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={key}
    />
  );
};

export default StripeButton;
