import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const SearchPageAll = (props) => {
  const location = useLocation();

  const [searchResulte, setSearchResulte] = useState({});

  const [pages, setPage] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [isReady, setIseready] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${props.serverURI}/offers/all`);

        const arrayOfPages = [];
        let numberOfPages = Math.floor(response.data.count / 10);
        if (response.data.count % 10 !== 0) {
          numberOfPages++;
        }
        for (let i = 0; i < numberOfPages; i++) {
          arrayOfPages.push(i + 1);
        }
        setPage(arrayOfPages);

        setSearchResulte([...response.data.data]);
        setIseready(true);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    const indexOfFirstArticleToShow = (selectedPage - 1) * 10;

    const ArrayOfitemsToShow = itemsToDisplay(items).splice(
      indexOfFirstArticleToShow,
      10
    );
    return ArrayOfitemsToShow;
  };
  return isReady === false ? (
    <div className="loading">
      <p>Loading, please wait...Searching</p>
    </div>
  ) : (
    <section className="news-feed-section wrapper">
      <h3>Toutes nos offres</h3>

      <div>
        {getShowId(searchResulte).map((item) => {
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
              onClick={(event) => {
                if (
                  sizeClicked ||
                  colorClicked ||
                  brandClicked ||
                  priceClicked ||
                  conditionClicked ||
                  sortClicked ||
                  limitClicked
                ) {
                  event.preventDefault();
                }
              }}
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
      </div>
    </section>
  );
};

export default SearchPageAll;
