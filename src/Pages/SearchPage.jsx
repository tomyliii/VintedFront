import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Toggle from "../Components/Toggle/Toggle";
const SearchPage = (props) => {
  const [searchResulte, setSearchResulte] = useState({});
  const { search, sort } = useParams();
  const [isReady, setIseready] = useState(false);

  console.log(search, props);

  useEffect(() => {
    try {
      console.log("OKKKK");
      (async () => {
        const response = await axios.get(
          `${props.serverURI}/offers?title=${search}&priceMin=&priceMax=&sort=${sort}&limit=`
        );
        console.log(response.data.offers);
        setSearchResulte([...response.data.offers]);
        setIseready(true);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [search, sort]);

  return isReady === false ? (
    <div className="loading">
      <p>Loading, please wait...Searching</p>
    </div>
  ) : (
    <section className="news-feed-section wrapper">
      <h3>Fil d'actu</h3>
      <div>
        {searchResulte.map((item) => {
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

          const images = getImages(item);
          const firstimage = images[0];
          return (
            <Link
              to={`/product/${item._id}`}
              key={"offers" + item._id}
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
                {/* <p className="info">{item.owner.username}</p> */}
              </div>
            </Link>
          );
        })}
        <div></div>
      </div>
    </section>
  );
};

export default SearchPage;
