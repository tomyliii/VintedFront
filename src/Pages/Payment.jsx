import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm/CheckoutForm";
import { Navigate } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51NZAKhBqSF0s0rWOfYYmdoQ6EqnRDYqqPliPQ94OBigJAZv7i5Dmq57pygMnRJFGY5IEUlhfAJOlyaBw2W72PvHV006t94ctfk"
);

const Payment = (props) => {
  const location = useLocation();
  const { title, price, id } = location.state;
  console.log(title, price, id);
  return props.userToken ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        id={props.id}
        userToken={props.userToken}
        offerId={id}
        price={price}
        title={title}
        serverURI={props.serverURI}
      />
    </Elements>
  ) : (
    <Navigate to="/" />
  );
};

export default Payment;
