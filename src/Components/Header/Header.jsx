import "./header.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/Images/logoVinted.svg";
const Header = () => {
  return (
    <header>
      <section>
        <div className="wrapper">
          <div>
            {/* <Link to={"/"}> */}
            <img src={Logo} alt="Logo vinted" />
            {/* </Link> */}
          </div>
          <div>
            <form>
              <input
                type="search"
                name=""
                id=""
                placeholder="Rechercher des articles"
              />
            </form>
            <div className="header-btn">
              <button>S'inscrire | Se connecter</button>
              <button>Vends tes articles</button>
              <button>?</button>
            </div>
          </div>
        </div>
      </section>
      <nav className="wrapper">
        <ul>
          <li>Femmes</li>
          <li>Hommes</li>
          <li>Enfants</li>
          <li>Maison</li>
          <li>Divertissement</li>
          <li>Animaux</li>
          <li>A propos</li>
          <li>Notre plateforme</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
