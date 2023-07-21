import "./header.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/Images/logoVinted.svg";
import ModalSignUp from "../ModalSignUp/ModalSignUp";
import ModalLogin from "../ModalLogin/ModalLogin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { getCookie } from "../../assets/cookiesFunctions/cookiesFunction";

const Header = (props) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [displaMessagelogin, setDisplayMessageLogin] = useState(false);
  // console.log(getCookie("username"));
  // if (getCookie("username") !== "") {
  //   setIsCOnnected(!isConnected);
  // }
  useEffect(() => {
    displayModal === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [displayModal]);
  // if (Cookies.get("token")) {
  //   setIsCOnnected(!isConnected);
  // }

  // useEffect(() => {
  //   setDisplayMessageLogin(!displaMessagelogin);
  //   setTimeout(() => {
  //     setDisplayMessageLogin(displaMessagelogin);
  //   }, 3000);
  // }, [isConnected]);
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
