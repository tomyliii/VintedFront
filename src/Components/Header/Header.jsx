import "./header.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/Images/logoVinted.svg";
import ModalSignUp from "../ModalSignUp/ModalSignUp";
import ModalLogin from "../ModalLogin/ModalLogin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Toggle from "../Toggle/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
const Header = (props) => {
  const navigate = useNavigate();
  const [displayModal, setDisplayModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [displaMessagelogin, setDisplayMessageLogin] = useState(false);
  const [searchArticle, setSearchArticle] = useState("");
  const [isChecked, setIsCheked] = useState(false);
  const [smallScreenModal, setSmallScreenModal] = useState(false);
  useEffect(() => {
    if (Cookies.get("token")) {
      setIsConnected(true);
    }
    if (displayModal || smallScreenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [displayModal, smallScreenModal]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (searchArticle && !isChecked) {
      navigate(`/SearchPage/${searchArticle}/price-asc`);
    }
    if (searchArticle && isChecked) {
      navigate(`/SearchPage/${searchArticle}/price-desc`);
    }
  };

  console.log(Cookies.get("token"));
  return (
    <>
      <header>
        <section>
          <div className="wrapper">
            <div className="logo-block">
              <Link to={"/"}>
                <img src={Logo} alt="Logo vinted" />
              </Link>
              <button
                className="small-sceen-menu"
                onClick={() => {
                  setSmallScreenModal(!smallScreenModal);
                  console.log(smallScreenModal);
                }}
              >
                {smallScreenModal ? (
                  <FontAwesomeIcon icon={faXmark} />
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )}
              </button>
            </div>
            <div>
              <form
                onSubmit={(event) => {
                  handleOnSubmit(event);
                }}
              >
                <input
                  type="search"
                  name="search"
                  id="search"
                  value={searchArticle}
                  placeholder="Rechercher des articles"
                  onChange={(event) => setSearchArticle(event.target.value)}
                />
                <div>
                  <div className="toggle-section">
                    <p>Trier par prix: </p>
                    <Toggle isChecked={isChecked} setIsCheked={setIsCheked} />
                  </div>
                  <div className="range-section"></div>
                </div>
              </form>
              <div className="header-btn">
                {isConnected ? (
                  <button
                    className="disconnect-btn"
                    onClick={() => {
                      setSignup(false);
                      Cookies.remove("token", { secure: true });
                      Cookies.remove("username", { secure: true });
                      setIsConnected(!isConnected);
                      setDisplayMessageLogin(!displaMessagelogin);
                      setTimeout(() => {
                        setDisplayMessageLogin(displaMessagelogin);
                      }, 3000);
                    }}
                  >
                    Se déconnecter
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setDisplayModal(!displayModal);
                    }}
                  >
                    S'inscrire | Se connecter
                  </button>
                )}
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
      {smallScreenModal && (
        <div className="small-screen-modal">
          <div className="header-btn">
            {isConnected ? (
              <button
                className="disconnect-btn"
                onClick={() => {
                  setSignup(false);
                  Cookies.remove("token", { secure: true });
                  Cookies.remove("username", { secure: true });
                  setSmallScreenModal(false);
                  setIsConnected(!isConnected);
                  setDisplayMessageLogin(!displaMessagelogin);
                  setTimeout(() => {
                    setDisplayMessageLogin(displaMessagelogin);
                  }, 3000);
                }}
              >
                Se déconnecter
              </button>
            ) : (
              <button
                onClick={() => {
                  setDisplayModal(!displayModal);
                }}
              >
                S'inscrire | Se connecter
              </button>
            )}
            <button>Vends tes articles</button>
            <button>?</button>
          </div>
        </div>
      )}

      {displayModal ? (
        signup ? (
          <ModalSignUp
            setDisplayModal={setDisplayModal}
            displayModal={displayModal}
            serverURI={props.serverURI}
            signup={signup}
            setSignup={setSignup}
            displayMessagelogin={displaMessagelogin}
            setDisplayMessageLogin={setDisplayMessageLogin}
            setIsConnected={setIsConnected}
            isConnected={isConnected}
            setSmallScreenModal={setSmallScreenModal}
          />
        ) : (
          <ModalLogin
            isConnected={isConnected}
            setIsConnected={setIsConnected}
            setDisplayModal={setDisplayModal}
            displayModal={displayModal}
            serverURI={props.serverURI}
            signup={signup}
            setSignup={setSignup}
            displayMessagelogin={displaMessagelogin}
            setDisplayMessageLogin={setDisplayMessageLogin}
            setSmallScreenModal={setSmallScreenModal}
          />
        )
      ) : (
        ""
      )}
      {displaMessagelogin && (
        <div className="message-login">
          {isConnected ? (
            <p>Bienvenue {Cookies.get("username")}</p>
          ) : (
            <p>Vous avez été déconecté.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
