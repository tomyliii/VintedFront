import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import format from "date-fns/format";
const Purchases = (props) => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${props.serverURI}/userpurchases`, {
          headers: {
            Authorization: `Bearer ${props.userToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setPurchases(response.data);
        setIsReady(true);
      })();
    } catch (error) {
      setErrorMessage(error.message);

      if (error.status) {
        console.log({ status: error.status, message: error.message });
      } else {
        console.log(error.message);
      }
    }
  }, []);

  if (!props.userToken) {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }
  return props.userToken ? (
    !isReady ? (
      <div className="loading">
        <p>Loading, please wait...Searching</p>
      </div>
    ) : (
      <main className="purchases-page">
        <div className="wrapper">
          <h2>Mes achats</h2>
          <section>
            {purchases.length !== 0 ? (
              purchases.map((purchase) => {
                const imagesKey = Object.keys(purchase.offer.product_image);

                return (
                  <div className="purchase-card" key={purchase._id}>
                    <h4>{purchase.offer.product_name}</h4>
                    <div>
                      <Link to={`/product/${purchase.offer._id}`}>
                        <img
                          src={
                            purchase.offer.product_image[imagesKey[0]]
                              .secure_url
                          }
                          alt={"image de " + purchase.offer.product_name}
                        />
                      </Link>
                      <div className="purchase-details">
                        <p>
                          <span>Prix</span>
                          <span>
                            {purchase.price
                              .toFixed(2)
                              .toString()
                              .replace(".", ",")}
                            €
                          </span>
                        </p>
                        <p>
                          <span>Date d'achat</span>
                          <span>
                            {format(
                              new Date(purchase.date_of_purchase),
                              " dd/MM/yyyy"
                            )}
                          </span>
                        </p>
                        <p>
                          <span>Vendeur</span>
                          <span>{purchase.owner.username}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-purchase">
                <p>
                  Vous n'avez effectué aucun achat. Dirigez vous vite vers la
                  page d'accueil pour trouver votre bonheur et éffectuer votre
                  premier achat.
                </p>
                <Link to={"/"}>Accueil</Link>
              </div>
            )}
          </section>
        </div>
      </main>
    )
  ) : (
    <div className="not-connected">
      <p>
        OOUUUuuuuupppssss! Vous n'est pas connecté(e) vous allez etre
        redirigé(e) automatiquement vers la page d'accueil...
      </p>
    </div>
  );
};

export default Purchases;
