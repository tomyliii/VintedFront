import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import format from "date-fns/format";
const Sales = (props) => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${props.serverURI}/usersales`, {
          headers: {
            Authorization: `Bearer ${props.userToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setSales(response.data);
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
      <main className="sales-page">
        <div className="wrapper">
          <h2>Mes ventes</h2>
          <section>
            {sales.length !== 0 ? (
              sales.map((sale) => {
                const imagesKey = Object.keys(sale.offer.product_image);

                return (
                  <div className="sale-card" key={sale._id}>
                    <h4>{sale.offer.product_name}</h4>
                    <div>
                      <Link to={`/product/${sale.offer._id}`}>
                        <img
                          src={
                            sale.offer.product_image[imagesKey[0]].secure_url
                          }
                          alt={"image de " + sale.offer.product_name}
                        />
                      </Link>
                      <div className="sale-details">
                        <p>
                          <span>Prix</span>
                          <span>
                            {sale.price.toFixed(2).toString().replace(".", ",")}
                            €
                          </span>
                        </p>
                        <p>
                          <span>Date d'achat</span>
                          <span>
                            {format(
                              new Date(sale.date_of_purchase),
                              " dd/MM/yyyy"
                            )}
                          </span>
                        </p>
                        <p>
                          <span>Acheteur</span>
                          <span>{sale.buyer.username}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-sale">
                <p>Vous n'avez éffectué aucune vente.</p>
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

export default Sales;
