import SearchByBrand from "../Components/SearchByBrand/SearchByBrand";
import SearchSuggestions from "../Components/SearchSuggestions/SearchSuggestions";
import NewsFeed from "../Components/NewsFeed/NewsFeed";
import PopularItems from "../Components/PopularItems/PopularItems";
import Dechirer from "../assets/Images/dechirer.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const HomePage = (props) => {
  const location = useLocation();
  console.log("location", location);

  return (
    <main>
      <section className="hero">
        <div className="hero-bloc">
          <img
            className="dechirer"
            src={Dechirer}
            alt="effet de photo dechirée"
          />

          <img
            className="image-hero"
            src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-tablets-up-f55440d50886e8cc9b10cbc86322e5b3b48fbfaa6b18ea09215515312e8b1715.jpg"
            alt="image d'un couple dans un dressing"
          ></img>
        </div>
        <div className=" wrapper">
          <div className="bloc-top">
            <h2>Prêts à faire du tri dans vos placards ?</h2>
            <Link to={"./Publish"}>Vends maintenant</Link>
            <a href="#" alt="Découvrir comment ça marche">
              Découvrir comment ça marche
            </a>
          </div>
        </div>
      </section>
      <PopularItems serverURI={props.serverURI} />
      <SearchByBrand serverURI={props.serverURI} />
      {/* <SearchSuggestions /> */}
      <NewsFeed serverURI={props.serverURI} />
    </main>
  );
};

export default HomePage;
