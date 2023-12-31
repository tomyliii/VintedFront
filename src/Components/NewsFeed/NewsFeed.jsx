import "./newsFeed.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const NewsFeed = (props) => {
  const [data, setData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);
  const [pages, setPages] = useState([]);
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(
          `${props.serverURI}/offers/offers/?page=${selectedPage}`
        );
        setData(response.data.data);
        const numberOfPage = Math.floor(response.data.count / 20);
        const ArrayOfPages = [];

        for (let i = 0; i <= numberOfPage; i++) {
          ArrayOfPages.push(i + 1);
        }
        setPages(ArrayOfPages);
      })();
      setIsReady(true);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleOnClick = async (value) => {
    try {
      const response = await axios.get(
        `${props.serverURI}/offers/offers/?page=${value}`
      );
      setData(response.data.data);
      setSelectedPage(value);
    } catch (error) {
      console.log(error.message);
    }
  };
  const itemsToDisplay = () => {
    const arrayOfItemsToDisplay = [];
    data.forEach((item) => {
      if (item.product_state === true) {
        arrayOfItemsToDisplay.push(item);
      }
    });
    return arrayOfItemsToDisplay;
  };
  return isReady === false ? (
    <div className="loading">
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <section className="news-feed-section wrapper">
      <h3>Fil d'actu</h3>
      <div>
        {itemsToDisplay().map((item) => {
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
        {pages.lenth !== 1 && (
          <div className="page-selector">
            {pages.map((page) => {
              return (
                <div
                  key={page}
                  className={selectedPage === page ? "selected" : ""}
                  onClick={() => {
                    handleOnClick(page);
                  }}
                >
                  {page}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsFeed;
