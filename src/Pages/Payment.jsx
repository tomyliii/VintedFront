import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm/CheckoutForm";
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51NZAKhBqSF0s0rWOfYYmdoQ6EqnRDYqqPliPQ94OBigJAZv7i5Dmq57pygMnRJFGY5IEUlhfAJOlyaBw2W72PvHV006t94ctfk"
);

const Payment = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, price, id } = location.state;
  const insuranceCosts = 0.4;
  const shippingFees = 3.99;
  const totalPrice = price + insuranceCosts + shippingFees;
  if (!props.userToken) {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }
  return props.userToken ? (
    <main className="payment-page">
      <div className="wrapper">
        <section className="resum-section">
          <h4>Résumé de la commande</h4>
          <div>
            <p>
              <span>Commande</span>
              <span>{price.toFixed(2).toString().replace(".", ",")} €</span>
            </p>
            <p>
              <span>Frais de protection acheteurs</span>
              <span>
                {insuranceCosts.toFixed(2).toString().replace(".", ",")} €
              </span>
            </p>
            <p>
              <span>Frais de livraison</span>
              <span>
                {shippingFees.toFixed(2).toString().replace(".", ",")} €
              </span>
            </p>
          </div>
        </section>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            userId={props.id}
            offerId={id}
            title={title}
            serverURI={props.serverURI}
            totalPrice={totalPrice}
            username={props.username}
          />
        </Elements>
      </div>
    </main>
  ) : (
    <div className="not-connected">
      <p>
        OOUUUuuuuupppssss! Vous n'est pas connecté(e) vous allez etre
        redirigé(e) automatiquement vers la page d'accueil...
      </p>
    </div>
  );
};

export default Payment;
