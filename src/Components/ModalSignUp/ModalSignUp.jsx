import { useState } from "react";
import "./modalSignUp.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import DragAndDropSingUp from "../DragAndDropSingUp/DragAndDropSingUp";

const Modal = (props) => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorUsername, setErrorUsername] = useState();
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [conditions, setConditions] = useState(false);
  const [newsLetter, setNewsLetter] = useState(false);
  const [errorConditions, setErrorConditions] = useState("");
  const [file, setFile] = useState([]);
  const navigate = useNavigate();

  const handleOnChange = (set, value) => {
    set(!value);
  };

  const checkUsername = async (value) => {
    const regexGlobal = new RegExp("[a-zA-Z0-9]{3,}");
    if (value === "") {
      return setErrorUsername("Votre nom d'utilisateur ne peut etre vide.");
    }
    if (!regexGlobal.test(value)) {
      return setErrorUsername("Votre doit contenir au moins trois caractères.");
    }
    try {
      const response = await axios.get(`${props.serverURI}/user/${value}`);

      if (response.data.response === true) {
        setErrorUsername(response.data.message);
      } else {
        setErrorUsername(response.data.message);
        setUsername(value);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const checkMail = (value) => {
    const regexMail = new RegExp("[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]{2,3}");
    if (value === "") {
      return setErrorMail("Votre adresse mail ne peut etre vide");
    }
    if (regexMail.test(value)) {
      setMail(value);
      setErrorMail("");
    } else {
      setErrorMail("Votre adresse mail n'est pas valide.");
    }
  };
  const checkPassword = (value) => {
    const regexLetters = new RegExp("[a-zA-Z]{1,}");
    const regexNumber = new RegExp("[0-9]{1,}");
    const regexGlobal = new RegExp("[a-zA-Z0-9]{7,}");
    if (value === "") {
      return setErrorPassword("Votre mot de passe ne peut etre vide.");
    }
    if (!regexLetters.test(value)) {
      return setErrorPassword(
        "Votre mot de passe doit contenir au moins une lettre."
      );
    }
    if (!regexNumber.test(value)) {
      return setErrorPassword(
        "Votre mot de passe doit contenir au moins un chiffre."
      );
    }
    if (!regexGlobal.test(value)) {
      return setErrorPassword(
        "Votre mot de passe doit contenir minimum sept caratères."
      );
    } else {
      setErrorPassword("");
      setPassword(value);
    }
  };
  const checkConfirmPassword = (value) => {
    if (password !== confirmPassword) {
      setErrorConfirmPassword("Les mots de passe doivent être identiques.");
    } else {
      setErrorConfirmPassword("");
      setConfirmPassword(value);
    }
  };

  const checkConditions = (value) => {
    if (conditions !== true) {
      setConditions("Les conditions doivent être acceptées.");
    } else {
      setErrorConditions("");
      setConditions(value);
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (
      file.length !== 0 &&
      username &&
      mail &&
      password &&
      confirmPassword &&
      conditions === true &&
      errorUsername === "" &&
      errorMail === "" &&
      errorPassword === "" &&
      errorConfirmPassword === ""
    ) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("mail", mail);
      formData.append("password", password);
      formData.append("newsLetter", newsLetter);

      for (let i = 0; i < file.length; i++) {
        formData.append("productImg", file[i]);
      }
      try {
        const response = await axios.post(
          `${props.serverURI}/user/signup`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Cookies.set("token", response.data.token, 1, { secure: true });
        Cookies.set("username", response.data.account.username, 1, {
          secure: true,
        });

        Cookies.set("id", response.data._id, 1, { secure: true });
        props.setId(response.data._id);
        props.setDisplayModal(!props.displayModal);
        props.setSmallScreenModal(false);
        props.setUserToken(Cookies.get("token"));
        props.setUsername(response.data.account.username);
        props.setSignup(!props.signup);
        props.setDisplayMessageLogin(!props.displayMessagelogin);
        setTimeout(() => {
          props.setDisplayMessageLogin(props.displayMessagelogin);
        }, 3000);
        if (props.path === "/") {
          navigate("/");
        } else {
          navigate(props.path);
        }
      } catch (error) {
        setErrorConditions(error.response.data.message);
      }
    } else {
      checkConditions(conditions);
      checkUsername(username);
      checkMail(mail);
      checkPassword(password);
      checkConfirmPassword(confirmPassword);
    }
  };

  return (
    <section
      className="modal"
      onClick={() => {
        props.setDisplayModal(!props.displayModal);
        props.setSignup(!props.signup);
      }}
    >
      <div
        className="signup"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          onClick={() => {
            props.setDisplayModal(!props.displayModal);
            props.setSignup(!props.signup);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <p>Inscris-toi avec ton email</p>
        <form
          onSubmit={(event) => {
            handleOnSubmit(event);
          }}
        >
          <DragAndDropSingUp setFile={setFile} />
          <div>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onBlur={(e) => {
                checkUsername(e.target.value);
              }}
              required
            />
            <p className={`info ${errorUsername && "error"}`}>
              {errorUsername
                ? errorUsername
                : " Créer ton nom d'utilisateur en n'utilisant que des lettres et des chiffres. Choisis-en un qui te plaît, tu ne pourras plus lechanger."}
            </p>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
              }}
              onBlur={(e) => {
                checkMail(e.target.value);
              }}
            />
            <p className={`info ${errorMail && "error"}`}>
              {errorMail && errorMail}
            </p>
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              onBlur={(e) => {
                checkPassword(e.target.value);
              }}
            />
            {showPassword ? (
              <FontAwesomeIcon
                className="eye"
                icon={faEyeSlash}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <FontAwesomeIcon
                className="eye"
                icon={faEye}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}
            <p className={`info ${errorPassword && "error"}`}>
              {errorPassword
                ? errorPassword
                : "Il doit contenir 7 lettres minimum, dont au moins un chiffre"}
            </p>
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              onBlur={(e) => {
                checkConfirmPassword(e.target.value);
              }}
              required
            />
            {showPassword ? (
              <FontAwesomeIcon
                className="eye"
                icon={faEyeSlash}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <FontAwesomeIcon
                className="eye"
                icon={faEye}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}
            <p className={`info ${errorConfirmPassword && "error"}`}>
              {errorConfirmPassword && errorConfirmPassword}
            </p>
          </div>
          <div className="checkbox-section">
            <input
              type="checkbox"
              name=""
              id="newsletter"
              onChange={() => {
                handleOnChange(setNewsLetter, newsLetter);
              }}
              checked={newsLetter}
            />
            <p>
              Je souhaite recevoir par e-mail des offres personalisées et les
              dernières mises à jour de vinted
            </p>
          </div>
          <div className="checkbox-section">
            <input
              type="checkbox"
              className="checkbox"
              name=""
              id="conditions"
              onChange={() => {
                handleOnChange(setConditions, conditions);
              }}
              checked={conditions}
              required
            />
            <p>
              En t'inscrivant, tu confirmes que tu acceptes les Termes &
              Conditions de Vinted, les conditions de vente liées aux vendeurs
              professionnels, avoir lu la Politique de confidentialité et avoir
              au moin 18 ans.
            </p>
          </div>
          {errorConditions && <p className="info error">{errorConditions}</p>}
          <input type="submit" value="Valider" />
        </form>
        <p>
          Déja inscrit ? &nbsp;
          <span
            onClick={() => {
              props.setSignup(!props.signup);
            }}
          >
            Click ici.
          </span>
        </p>
      </div>
    </section>
  );
};

export default Modal;
