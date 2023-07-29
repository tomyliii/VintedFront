import "./modalLogin.css";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import history from "../../History/History";

const ModalLogin = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    try {
      event.preventDefault();
      if (mail && password) {
        const response = await axios.post(`${props.serverURI}/user/login`, {
          mail: mail,
          password: password,
        });
        Cookies.set("token", response.data.token, 1, { secure: true });
        Cookies.set("username", response.data.account.username, 1, {
          secure: true,
        });

        props.setDisplayModal(!props.displayModal);
        props.setIsConnected(!props.isConnected);
        props.setSmallScreenModal(false);
        props.setDisplayMessageLogin(!props.displayMessagelogin);
        setTimeout(() => {
          props.setDisplayMessageLogin(props.displayMessagelogin);
        }, 3000);

        if (history.at(-1) === "/Publish") {
          navigate("/Publish");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <section
      className="modal"
      onClick={(event) => {
        props.setDisplayModal(!props.displayModal);
      }}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          onClick={() => {
            props.setDisplayModal(!props.displayModal);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <p>Se connecter</p>

        <form
          onSubmit={(event) => {
            handleOnSubmit(event);
          }}
        >
          <input
            type="text"
            placeholder="E-mail"
            onChange={(e) => {
              setMail(e.target.value);
            }}
            value={mail}
          />
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
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
          </div>
          <input type="submit" value="Valider" />
        </form>
        <p>
          Ou inscris-toi avec &nbsp;
          <span
            onClick={() => {
              props.setSignup(!props.signup);
            }}
          >
            E-mail.
          </span>
        </p>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </div>
    </section>
  );
};

export default ModalLogin;
