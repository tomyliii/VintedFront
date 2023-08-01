import "./checkoutForm.css";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CheckoutForm = (props) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    try {
      const stripeResponse = await stripe.createToken(cardElement, {
        name: `${props.username}`,
      });
      console.log(props.userId);
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(`${props.serverURI}/pay`, {
        stripeToken,
        offerId: props.offerId,
        price: props.totalPrice,
        title: props.title,
        userId: props.userId,
      });

      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      setErrorMessage(error.message);

      if (error.status) {
        console.log({ status: error.status, message: error.message });
      } else {
        console.log(error.message);
      }
    }
  };
  if (completed) {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }
  return (
    <>
      {!completed ? (
        <section className="payment-section">
          <div className="total-price">
            <p>
              <span>Total</span>

              <span>
                {props.totalPrice.toFixed(2).toString().replace(".", ",")} €
              </span>
            </p>
          </div>
          <div>
            <p>
              Il ne vous reste plus q'une étape pour vous offrir
              <span> {props.title}</span>. Vous allez payer&nbsp;
              <span>
                {props.totalPrice.toFixed(2).toString().replace(".", ",")} €
              </span>
              &nbsp; (frais de protection acheteurs et frais de port inclus).
            </p>
          </div>
          <form onSubmit={handleOnSubmit}>
            <CardElement />
            <button type="submit">Valider</button>
          </form>
          {errorMessage && <p className="error-Message">{errorMessage}</p>}
        </section>
      ) : (
        <section className="payment-succeeded">
          <p>
            <span>Félicitation! Le paiment est éffectué.</span>
            Vous allez automatiquement être redirigé vers la page d'accueil ou
            cliquez sur le bouton pour naviguer vers cette page.
          </p>
          <Link to={"/"}>Accueil</Link>
        </section>
      )}
    </>
  );
};

export default CheckoutForm;
