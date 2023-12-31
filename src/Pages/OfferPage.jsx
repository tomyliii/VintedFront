import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";

const OfferPage = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isReady, setIsReady] = useState(false);
  const [item, setItem] = useState({});
  const [images, setImage] = useState([]);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [pages, setPage] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);

  const getImages = (item) => {
    const arrayOfImages = [];

    const imagesKeys = Object.keys(item.product_image);
    imagesKeys.forEach((key) => {
      arrayOfImages.push(item.product_image[key].secure_url);
    });
    if (arrayOfImages.length !== 0) {
      return arrayOfImages;
    } else {
      arrayOfImages.push(
        "https://media.istockphoto.com/id/915938072/fr/vectoriel/dessin-anim%C3%A9-t-shirt-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=8J-kNlljXrjdH5tK3kZOfm46yVa8ZCRs3_bu9w3YqqA="
      );
      return arrayOfImages;
    }
  };

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${props.serverURI}/offer/${id}`);
        const ownerItems = await axios.get(
          `${props.serverURI}/offersofowner/${id}`
        );

        setCount(ownerItems.data.data.count);
        setItems(ownerItems.data.data.offers);
        setItem(response.data.data);
        const arrayOfImages = getImages(response.data.data);
        setImage(arrayOfImages);

        const arrayOfPages = [];
        let numberOfPages = Math.floor(ownerItems.data.data.count / 8);
        if (ownerItems.data.data.count % 8 !== 0) {
          numberOfPages++;
        }
        for (let i = 0; i < numberOfPages; i++) {
          arrayOfPages.push(i + 1);
        }
        setPage(arrayOfPages);

        setIsReady(true);
      })();
    } catch (error) {
      console.log(error.message);
    }
  }, [id, selectedPage]);

  const itemsToDisplay = (value) => {
    const arrayOfItemsToDisplay = [];
    value.forEach((item) => {
      if (item.product_state === true) {
        arrayOfItemsToDisplay.push(item);
      }
    });
    return arrayOfItemsToDisplay;
  };

  const redirection = (value) => {
    if (
      item.product_state === false &&
      !(props.id === value.owner._id || props.id === value.buyer._id)
    ) {
      setTimeout(() => {
        navigate("/");
      }, 5000);
      return true;
    }
  };

  const getShowId = () => {
    const indexOfFirstArticleToShow = (selectedPage - 1) * 8;

    const ArrayOfitemsToShow = itemsToDisplay(items).splice(
      indexOfFirstArticleToShow,
      8
    );

    return ArrayOfitemsToShow;
  };

  return isReady === false ? (
    <div className="loading">
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <main className={`offer-page ${item.product_state === false && " lock"}`}>
      <div className="wrapper">
        <section className="item-pictures small-screen-offer">
          {images.map((image) => {
            return (
              <div key={"item-picture" + image}>
                <img src={image} alt="image de l'article" />
              </div>
            );
          })}
        </section>
        <div>
          <section className="item-pictures large-screen-offer">
            {images.map((image) => {
              return (
                <div key={"item-picture" + image}>
                  <img src={image} alt="image de l'article" />
                </div>
              );
            })}
          </section>
          <div>
            <p>({count}) articles disponibles</p>
          </div>
          <section className="owner-offers">
            {getShowId().map((item) => {
              const images = getImages(item);
              const firstimage = images[0];

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
                    <img src={firstimage} alt="image du produit" />
                  </div>
                  <div>
                    <p className="producte-name">{item.product_name}</p>
                    <p className="info">{item.product_price} €</p>
                    <p className="info">{item.product_details[0].size}</p>
                  </div>
                </Link>
              );
            })}
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
        <aside>
          <section>
            <div className="item-infos">
              <div className="item-price">
                <p>
                  {item.product_price.toFixed(2).toString().replace(".", ",")} €
                </p>
              </div>
              <div className="item-details">
                {item.product_details[0].brand && (
                  <p>
                    <span>MARQUE </span>
                    <span>{item.product_details[0].brand}</span>
                  </p>
                )}
                {item.product_details[0].condition && (
                  <p>
                    <span>ETAT </span>
                    <span>{item.product_details[0].condition}</span>
                  </p>
                )}
                {item.product_details[0].color && (
                  <p>
                    <span>COULEUR </span>
                    <span>{item.product_details[0].color}</span>
                  </p>
                )}
                {item.product_details[0].place && (
                  <p>
                    <span>LOCALISATION </span>
                    <span>{item.product_details[0].place}</span>
                  </p>
                )}
                <p>
                  <span>OPTION DE PAIMENT</span>
                  <span>CARTE BANCAIRE</span>
                </p>
                <p>
                  <span>NOMBRE DE VUE</span>
                  <span>{item.history.view}</span>
                </p>
                <p>
                  <span>AJOUTE</span>
                  <span>
                    {format(
                      new Date(item.history.date_of_creation),
                      " dd/MM/yyyy"
                    )}
                  </span>
                </p>
                {item.product_state === false && (
                  <>
                    <p className="sold">
                      <span>STATUT</span>
                      <span>VENDU</span>
                    </p>
                    <p>
                      <span>ACHETEUR</span>
                      <span>{item.buyer.username}</span>
                    </p>
                    <p>
                      <span>DATE D'ACHAT</span>
                      <span>
                        {format(
                          new Date(item.history.date_of_purchase),
                          " dd/MM/yyyy"
                        )}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="item-description">
              <p>{item.product_description}</p>
            </div>
            <div className="item-send-info">
              <p>
                <span> envoie</span> <span>a partir de 3,99 €</span>
              </p>
            </div>
            <div className="section-buttons">
              {item.product_state ? (
                <div className="item-buttons">
                  <Link
                    to="/Payment"
                    state={{
                      title: item.product_name,
                      price: item.product_price,
                      id: item._id,
                    }}
                  >
                    Acheter
                  </Link>
                  <button>Faire une offre</button>
                  <button>Message</button>
                  <button>
                    <FontAwesomeIcon icon={faHeart} />
                    &nbsp;Favoris
                  </button>
                </div>
              ) : (
                <div className="item-buttons">
                  <Link
                    to="/Payment"
                    state={{
                      title: item.product_name,
                      price: item.product_price,
                      id: item._id,
                    }}
                    className="disabled"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Acheter
                  </Link>
                  <button
                    className="disabled"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Faire une offre
                  </button>
                  <button
                    className="disabled"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Message
                  </button>
                  <button
                    className="disabled"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    &nbsp;Favoris
                  </button>
                </div>
              )}
            </div>
            <div className="item-protect-customer">
              <div>
                <FontAwesomeIcon icon={faShieldHeart} />
              </div>
              <div>
                <h3>Frais de Protection acheteurs</h3>
                <p>
                  Pour tout achat effectué par le biais du bouton "Acheter",
                  nous appliquons des frais couvrant notre
                  <a href="#"> protection acheteurs</a> . Cette protection
                  acheteurs comprend notre
                  <a href="#">Politique de remboursement</a>.
                </p>
              </div>
            </div>
          </section>
          <section>
            <div>
              {item.owner.avatar?.secure_url ? (
                <div>
                  <img
                    src={item.owner.avatar.secure_url}
                    alt="avatar du vendeur"
                  />
                </div>
              ) : (
                <div className="icon-standar">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}

              <p>{item.owner.username}</p>
            </div>
          </section>
        </aside>
      </div>
      {redirection(item) && (
        <section
          className="modal"
          onClick={(event) => {
            navigate("/");
          }}
        >
          <div
            className="modal-offer-redirection"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <p>OoouuupS...Cet article a été victime de son succes!</p>
            <Link to="/">Home</Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default OfferPage;
