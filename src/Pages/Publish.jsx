import axios from "axios";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DragAndDrop from "../Components/DragAndDrop/DragAndDrop";

export default function Publish({ userToken, serverURI }) {
  const location = useLocation();

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [change, setChange] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const maxFilesauthorized = 10;

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (
      files.length !== 0 &&
      title &&
      description &&
      brand &&
      size &&
      color &&
      condition &&
      place &&
      price
    ) {
      let picturesOk = true;

      //   for (let i = 0; i < files.length; i++) {
      //     if (!files[i].type.includes("image")) {
      //       picturesOk = false;
      //       break;
      //     }
      //   }

      if (picturesOk) {
        const formData = new FormData();
        formData.append("name", title);
        formData.append("descr", description);
        formData.append("color", color);
        formData.append("place", place);
        formData.append("price", price);
        formData.append("condition", condition);
        formData.append("size", size);
        formData.append("brand", brand);
        for (let i = 0; i < files.length; i++) {
          formData.append("productImg", files[i]);
        }

        try {
          const { data } = await axios.post(
            `${serverURI}/offer/publish`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          navigate(`/product/${data.data._id}`);
          // alert(JSON.stringify(data));
        } catch (error) {
          if (error.status === 500) {
            setErrorMessage("Une erreur est survenue?");
          } else {
            setErrorMessage(error.response.data.message);
          }
        }
      } else {
        setErrorMessage("Format d'image non pris en charge.");
      }
    } else {
      setErrorMessage("Veuillez remplire tous les Champs.");
    }
  };

  return userToken ? (
    <main className="publish">
      <form
        className="wrapper"
        onSubmit={(event) => {
          handleOnSubmit(event);
        }}
      >
        <h3>Vends ton article</h3>

        <DragAndDrop
          setFiles={setFiles}
          files={files}
          maxFilesauthorized={maxFilesauthorized}
        />
        {/* <div>
          <input
            type="file"
            name="file"
            id="file"
            multiple
            onChange={(event) => {
              setFiles(event.target.files);
            }}
          />
          <label htmlFor="file"></label>
        </div> */}
        <div className="publish-principals-infos">
          <div>
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              placeholder="ex:Chemise Sezane verte"
            />
          </div>
          <div>
            <label htmlFor="description">Décris ton article</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              placeholder="ex:Portée quelque fois, taille correctement."
            ></textarea>
          </div>
        </div>
        <div className="publish-details">
          <div>
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
              placeholder="ex:Zara"
            />
          </div>
          <div>
            <label htmlFor="size">Taille</label>
            <input
              type="text"
              name="size"
              id="size"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
              placeholder="ex:L/40/12"
            />
          </div>
          <div>
            <label htmlFor="color">Color</label>
            <input
              type="text"
              name="color"
              id="color"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
              placeholder="ex:Fushia"
            />
          </div>
          <div>
            <label htmlFor="condition">Etat</label>
            <input
              type="text"
              name="condition"
              id="condition"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
              placeholder="ex:Neuf avec étiquette"
            />
          </div>
          <div>
            <label htmlFor="place">Lieu</label>
            <input
              type="text"
              name="place"
              id="place"
              value={place}
              onChange={(event) => {
                setPlace(event.target.value);
              }}
              placeholder="ex:Paris"
            />
          </div>
        </div>
        <div>
          <div className="price-publish-Section">
            <div>
              <label htmlFor="price">Prix</label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
                placeholder="0,00 €"
              />
            </div>
            <div>
              <div className="error-Message">
                {errorMessage && errorMessage}
              </div>
              <div>
                <input
                  type="checkbox"
                  id="change"
                  checked={change}
                  onChange={() => {
                    setChange(!change);
                  }}
                />
                <label htmlFor="change">
                  Je suis intéréssé(e) par les échanges.
                </label>
              </div>
            </div>
          </div>
        </div>
        <input type="submit" value="Ajouter" />
      </form>
    </main>
  ) : (
    <Navigate to="/" state={{ from: "/Publish" }} />
  );
}
