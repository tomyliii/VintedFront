// import { link } from "react-router-dom";
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

const OfferPage = () => {
  const [isReady, setIsReady] = useState(false);
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [images, setImage] = useState([]);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
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
        // const response = await axios.get(`  http://127.0.0.1:3000/offer/${id}`);
        // const ownerItems = await axios.get(
        //   `  http://127.0.0.1:3000/offersofowner/${id}`
        // );
        const response = await axios.get(
          `https://site--vintedback--tzmxcvqjqbzq.code.run/offer/${id}`
        );
        const ownerItems = await axios.get(
          `https://site--vintedback--tzmxcvqjqbzq.code.run/offersofowner/${id}`
        );
        setCount(ownerItems.data.data.count);
        setItems(ownerItems.data.data.offers);
        setItem(response.data.data);
        const arrayOfImages = getImages(response.data.data);
        setImage(arrayOfImages);
        setIsReady(true);
      })();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isReady === false ? (
    <div className="loading">
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <main className="offer-page">
      <div className="wrapper">
        <div>
          <section className="item-pictures">
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
            {items.map((item) => {
              const images = getImages(item);
              const firstimage = images[0];
              return (
                <Link
                  to={`/product2/${item._id}`}
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
                    <p>{item.product_name}</p>
                    <p className="info">{item.product_price} €</p>
                    <p className="info">{item.product_details[0].size}</p>
                    {/* <p className="info">{item.owner.username}</p> */}
                  </div>
                </Link>
              );
            })}
          </section>
        </div>
        <aside>
          <section>
            <div className="item-infos">
              <div className="item-price">
                <p>{item.product_price.toFixed(2)} €</p>
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
                  <span>0</span>
                </p>
                <p>
                  <span>AJOUTE</span>
                  <span>IL Y A 1 JOUR</span>
                </p>
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
              <div> </div>
              <div className="item-buttons">
                <button>Acheter</button>
                <button>Faire une offre</button>
                <button>Message</button>
                <button>
                  <FontAwesomeIcon icon={faHeart} />
                  &nbsp;Favoris
                </button>
              </div>
            </div>
            <div className="item-protect-customer">
              <div>
                <FontAwesomeIcon icon={faShieldHeart} />
              </div>
              <div>
                <h3>Frais de Protection acheteurs</h3>
                <p>
                  Pour tout achat effectué par le biais du bouton "Acheter",
                  nous appliquons des frais couvrant notre{" "}
                  <a href="#">protection acheteurs</a> . Cette protection
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
    </main>
  );
};

export default OfferPage;
