import "./searchByBrand.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const SearchByBrand = () => {
  const [data, setData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const brands = [];

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://site--vintedback--tzmxcvqjqbzq.code.run//offers/all"
      );
      setData(response.data.data);
    })();
    setIsReady(true);
  }, []);

  if (data.length !== 0) {
    data.forEach((item) => {
      if (!brands.includes(item.product_details[0].brand)) {
        brands.push(item.product_details[0].brand);
      }
    });
  }

  return isReady === false ? (
    <div>
      <p>Downloading, please wait...</p>
    </div>
  ) : (
    <section className="brands-section wrapper">
      <h3>Rechercher par marque</h3>
      <div>
        {brands.map((item) => {
          return (
            <Link key={"Brand" + item} to={`/SearchPage/${item}`}>
              {item}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SearchByBrand;
