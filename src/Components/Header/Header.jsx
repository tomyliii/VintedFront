import "./header.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/Images/logoVinted.svg";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
const Header = () => {
  const [displayModal, setDisplayModal] = useState(false);
  useEffect(() => {
    displayModal === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [displayModal]);
  return (
    <>
      <header>
        <section>
          <div className="wrapper">
            <div>
              <Link to={"/"}>
                <img src={Logo} alt="Logo vinted" />
              </Link>
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
                {}
                <button
                  onClick={() => {
                    setDisplayModal(!displayModal);
                  }}
                >
                  S'inscrire | Se connecter
                </button>
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
      {displayModal && (
        <Modal setDisplayModal={setDisplayModal} displayModal={displayModal} />
      )}
    </>
  );
};

export default Header;
