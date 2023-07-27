import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Toggle from "../Components/Toggle/Toggle";
const SearchPage = (props) => {
  const [searchResulte, setSearchResulte] = useState({});
  const { search, sort } = useParams();

  const [filter, setFilter] = useState({});
  const [isReady, setIseready] = useState(false);
  const [sizeFilter, setSizeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilterMin, setPriceFilterMin] = useState("");
  const [priceFilterMax, setPriceFilterMax] = useState("");
  const [priceFilter, setPriceFilter] = useState([
    priceFilterMin,
    priceFilterMax,
  ]);
  const [conditionFilter, setConditionFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [limitFilter, setLimitFilter] = useState("");
  const [sizeClicked, setSizeClicked] = useState(false);
  const [colorClicked, setColorClicked] = useState(false);
  const [brandClicked, setBrandClicked] = useState(false);
  const [priceClicked, setPriceClicked] = useState(false);
  const [conditionClicked, setConditionClicked] = useState(false);
  const [sortClicked, setSortClicked] = useState(false);
  const [limitClicked, setLimitClicked] = useState(false);

  useEffect(() => {
    console.log("useeffect1", filter);

    try {
      (async () => {
        const response = await axios.get(
          `${props.serverURI}/offers?title=${search}&priceMin=&priceMax=&sort=${sort}&limit=`
        );
        setSearchResulte([...response.data.offers]);
        setIseready(true);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (filter !== {}) {
      const searchURL = `${props.serverURI}/offers?title=${search}&priceMin=${
        filter.priceMin || ""
      }&priceMax=${filter.priceMax || ""}&sort=&page=&color=${
        filter.color || ""
      }&description=&place=&size=${filter.size || ""}&condition=${
        filter.condition || ""
      }&brand=${filter.brand || ""}&limit=${filter.limit || ""}`;
      console.log(searchURL);
      try {
        (async () => {
          const response = await axios.get(searchURL);
          console.log("response test", response);
          setSearchResulte([...response.data.offers]);
          setIseready(true);
        })();
      } catch (error) {}
    }
  }, [filter, search]);
  const handleOnClick = (value, set) => {
    set(!value);
  };
  const filtersArray = [
    {
      value: sizeClicked,
      set: setSizeClicked,
      key: "size",
      setFilter,
      valueFilter: sizeFilter,
    },
    {
      value: colorClicked,
      set: setColorClicked,
      key: "color",
      setFilter,
      valueFilter: colorFilter,
    },
    {
      value: brandClicked,
      set: setBrandClicked,
      key: "brand",
      setFilter,
      valueFilter: brandFilter,
    },
    // {
    //   value: priceClicked,
    //   set: setPriceClicked,
    //   key: "price",
    //   setFilter: setPriceFilter,
    //   valueFilter: priceFilter,
    // },
    {
      value: conditionClicked,
      set: setConditionClicked,
      key: "condition",
      setFilter,
      valueFilter: conditionFilter,
    },
    // {
    //   value: sortClicked,
    //   set: setSortClicked,
    //   key: "sort",
    //   setFilter: setColorFilter,
    //   valueFilter: sortFilter,
    // },
    {
      value: limitClicked,
      set: setLimitClicked,
      key: "limit",
      setFilter,
      valueFilter: limitFilter,
    },
  ];

  const handleOnSubmit = (event) => {
    event.preventDefault();

    filtersArray.forEach((filterLeaved) => {
      if (filterLeaved.value) {
        const filterCopy = { ...filter };
        filterCopy[filterLeaved.key] = filterLeaved.valueFilter;
        filterLeaved.setFilter(filterCopy);

        filterLeaved.set(false);
      }
    });
  };

  const SearchFilterOut = () => {
    filtersArray.forEach((filterLeaved) => {
      if (filterLeaved.value) {
        const filterCopy = { ...filter };
        filterCopy[filterLeaved.key] = filterLeaved.valueFilter;
        filterLeaved.setFilter(filterCopy);

        filterLeaved.set(false);
      }
    });
  };

  return isReady === false ? (
    <div className="loading">
      <p>Loading, please wait...Searching</p>
    </div>
  ) : (
    <section
      className="news-feed-section wrapper"
      onClick={() => SearchFilterOut()}
    >
      <h3>Fil d'actu</h3>
      <section className="filters">
        <div>
          <div
            className={`filter ${sizeFilter && "marked"}`}
            onClick={() => {
              handleOnClick(sizeClicked, setSizeClicked);
            }}
          >
            Size &nbsp;
            {sizeClicked ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          {sizeClicked && (
            <div
              className="input-filter"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <form
                onSubmit={(event) => {
                  handleOnSubmit(event);
                }}
              >
                <input
                  type="text"
                  name="size"
                  id="size"
                  value={sizeFilter}
                  onChange={(event) => {
                    setSizeFilter(event.target.value);
                  }}
                  placeholder="Taille"
                />
              </form>
            </div>
          )}
        </div>
        <div>
          <div
            className={`filter ${colorFilter && "marked"}`}
            onClick={() => {
              handleOnClick(colorClicked, setColorClicked);
            }}
          >
            Couleur &nbsp;
            {colorClicked ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          {colorClicked && (
            <div
              className="input-filter"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <form
                onSubmit={(event) => {
                  handleOnSubmit(event);
                }}
              >
                <input
                  type="text"
                  name="color"
                  id="color"
                  value={colorFilter}
                  onChange={(event) => {
                    setColorFilter(event.target.value);
                  }}
                  placeholder="Couleur"
                />
              </form>
            </div>
          )}
        </div>
        <div>
          <div
            className={`filter ${brandFilter && "marked"}`}
            onClick={() => {
              handleOnClick(brandClicked, setBrandClicked);
            }}
          >
            Marque &nbsp;
            {brandClicked ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          {brandClicked && (
            <div
              className="input-filter"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <form
                onSubmit={(event) => {
                  handleOnSubmit(event);
                }}
              >
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brandFilter}
                  onChange={(event) => {
                    setBrandFilter(event.target.value);
                  }}
                  placeholder="Marque"
                />
              </form>
            </div>
          )}
        </div>

        <div>
          <div
            className={`filter ${sortFilter && "marked"}`}
            onClick={() => {
              handleOnClick(sortClicked, setSortClicked);
            }}
          >
            Trier pa r&nbsp;
            {sortClicked ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          {sortClicked && (
            <div
              className="input-filter sort"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <form
                onSubmit={(event) => {
                  handleOnSubmit(event);
                }}
              >
                <div>
                  <input type="radio" name="sort" id="asc" value="asc" />{" "}
                  <label htmlFor="asc">Croissant</label>
                </div>
                <div>
                  <input type="radio" name="sort" id="desc" value="desc" />{" "}
                  <label htmlFor="asc">Décroissant</label>
                </div>
              </form>
            </div>
          )}
        </div>
        <div>
          <div
            className={`filter ${conditionFilter && "marked"}`}
            onClick={() => {
              handleOnClick(conditionClicked, setConditionClicked);
            }}
          >
            Etat &nbsp;
            {conditionClicked ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          {conditionClicked && (
            <div
              className="input-filter"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <form
                onSubmit={(event) => {
                  handleOnSubmit(event);
                }}
              >
                <input
                  type="text"
                  name="condition"
                  id="condition"
                  value={conditionFilter}
                  onChange={(event) => {
                    setConditionFilter(event.target.value);
                  }}
                  placeholder="Etat"
                />
              </form>
            </div>
          )}
        </div>
        <div>
          <div
            className={`filter ${priceFilter && "marked"}`}
            onClick={() => {
              handleOnClick(priceClicked, setPriceClicked);
            }}
          >
            Prix &nbsp;
            {priceClicked ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          {priceClicked && (
            <div
              className="input-filter price"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <form
                onSubmit={(event) => {
                  handleOnSubmit(event);
                }}
              >
                <input
                  type="number"
                  name="price-Min"
                  id="price-Min "
                  value={priceFilterMin}
                  onChange={(event) => {
                    setPriceFilterMin(event.target.value);
                  }}
                  placeholder="Min"
                />
                <input
                  type="number"
                  name="price-Max"
                  id="price-Max"
                  value={priceFilterMax}
                  onChange={(event) => {
                    setPriceFilterMax(event.target.value);
                  }}
                  placeholder="Max"
                />
              </form>
            </div>
          )}
        </div>

        <div>
          <div
            className={`filter ${limitFilter && "marked"}`}
            onClick={() => {
              handleOnClick(limitClicked, setLimitClicked);
            }}
          >
            Nombre d'articles &nbsp;
            {limitClicked ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          {limitClicked && (
            <div
              className="input-filter"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <form
                onSubmit={(event) => {
                  handleOnSubmit(event);
                }}
              >
                <input
                  type="number"
                  name="limit"
                  id="limit"
                  value={limitFilter}
                  onChange={(event) => [setLimitFilter(event.target.value)]}
                  placeholder="Nombre d'articles"
                />
              </form>
            </div>
          )}
        </div>
      </section>
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
