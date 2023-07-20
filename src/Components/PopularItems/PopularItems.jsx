import { useEffect, useState } from "react";
import axios from "axios";
import "./popularItems.css";
import { Link } from "react-router-dom";

const PopularItems = (props) => {
  const [data, setData] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        // const response = await axios.get(
        //   " http://127.0.0.1:3000/offerspopular"
        // );
        const response = await axios.get(`${props.serverURI}/offerspopular`);
        setData(response.data.data);
      })();
      setIsReady(true);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isReady === false ? (
    <div className="loading">
      <p>Loading, please wait...</p>
    </div>
  ) : (
    <section className="popular wrapper">
      <h3>Articles populaires</h3>
      <div>
        {data.map((item) => {
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
                `https://media.istockphoto.com/id/915938072/fr/vectoriel/dessin-anim%C3%A9-t-shirt-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=8J-kNlljXrjdH5tK3kZOfm46yVa8ZCRs3_bu9w3YqqA=`
              );
              return arrayOfImages;
            }
          };

          const images = getImages(item);
          const firstimage = images[0];
          return (
            <Link
              to={`/product/${item._id}`}
              key={"popular" + item._id}
              className="item-card"
            >
              <div>
                <img src={firstimage} alt="image du produit" />
              </div>
              <div>
                <p>{item.product_name}</p>
                <p className="info">{item.product_price} €</p>
                <p className="info">{item.product_details[0].size}</p>
                <p className="info">{item.owner.username}</p>
              </div>
            </Link>
          );
        })}
        <Link to={`/SearchPage/${"all"}`} className="last-card">
          <p>voir tout les articles</p>
        </Link>
      </div>
    </section>
  );
};

export default PopularItems;
