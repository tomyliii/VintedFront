import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import format from "date-fns/format";
const Sales = (props) => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [pages, setPage] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${props.serverURI}/usersales`, {
          headers: {
            Authorization: `Bearer ${props.userToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ownerItems = await axios.get(
          `${props.serverURI}/offersowner/${props.id}`
        );

        const arrayOfPages = [];
        let numberOfPages = Math.floor(ownerItems.data.data.count / 8);
        if (ownerItems.data.data.count % 8 !== 0) {
          numberOfPages++;
        }
        for (let i = 0; i < numberOfPages; i++) {
          arrayOfPages.push(i + 1);
        }
        setPage(arrayOfPages);
        setItems(ownerItems.data.data.offers);
        setSales(response.data);
        setIsReady(true);
      })();
    } catch (error) {
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

  const itemsToDisplay = (value) => {
    const arrayOfItemsToDisplay = [];
    value.forEach((item) => {
      if (item.product_state === true) {
        arrayOfItemsToDisplay.push(item);
      }
    });
    return arrayOfItemsToDisplay;
  };

  const getShowId = (items) => {
    const indexOfFirstArticleToShow = (selectedPage - 1) * 8;

    const ArrayOfitemsToShow = itemsToDisplay(items).splice(
      indexOfFirstArticleToShow,
      8
    );

    return ArrayOfitemsToShow;
  };

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
          <section className="owner-offers">
            <h2>Mes articles disponibles à la vente</h2>
            <div>
              {getShowId(items).map((item) => {
                const imagesKey = Object.keys(item.product_image);

                return (
                  <Link
                    to={`/product/${item._id}`}
                    key={"owneroffers" + item._id}
                    className="item-card"
                  >
                    <div className="owner">
                      <div>
                        {item.owner.avatar?.secure_url ? (
                          <img
                            src={item.owner.avatar.secure_url}
                            alt="avatar du vendeur"
                          />
                        ) : (
                          <div className="icon-standar">
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                        )}
                      </div>
                      <p>{item.owner.username}</p>
                    </div>
                    <div className="item-image">
                      <img
                        src={item.product_image[imagesKey[0]].secure_url}
                        alt="image du produit"
                      />
                    </div>
                    <div>
                      <p className="producte-name">{item.product_name}</p>
                      <p className="info">{item.product_price} €</p>
                      <p className="info">{item.product_details[0].size}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            {pages.length !== 1 && (
              <div className="page-selector">
                {pages.map((page) => {
                  return (
                    <div
                      key={page}
                      className={selectedPage === page ? "selected" : ""}
                      onClick={() => {
                        setSelectedPage(page);
                      }}
                    >
                      {page}
                    </div>
                  );
                })}
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
