import "./checkoutForm.css";
import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    try {
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "Nom du l utilisateur",
      });
      console.log("ici lid du lacheteur", props.id);
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(`${props.serverURI}/pay`, {
        stripeToken,
        userId: props.id,
        offerId: props.offerId,
        price: props.price,
        title: props.title,
      });
      console.log(response);
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error);
      if (error.status) {
        console.log({ status: error.status, message: error.message });
      } else {
        console.log(error.message);
      }
    }
  };
  return (
    <main className="payment-section">
      {!completed ? (
        <form onSubmit={handleOnSubmit}>
          <CardElement />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </main>
  );
};

export default CheckoutForm;
