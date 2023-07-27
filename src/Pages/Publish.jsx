import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import DragAndDrop from "../Components/DragAndDrop/DragAndDrop";

export default function Publish({ userToken, serverURI }) {
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

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (
      files &&
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
          alert(JSON.stringify(data));
        } catch (error) {
          if (error.response.status === 500) {
            console.error("an error occured");
          } else {
            console.error(error.response.data);
          }
        }
      } else {
        setErrorMessage("Format d'image non pris en charge.");
        console.log(errorMessage);
      }
    } else {
      setErrorMessage("Veuillez remplire tous les Champs.");
      console.log(errorMessage);
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
        <p>Vends ton article</p>

        <DragAndDrop setFiles={setFiles} />
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
        <div>
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
            />
          </div>
          <div>
            <label htmlFor="description">Décris ton article</label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
        <div>
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
            />
          </div>
        </div>
        <div>
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
            />
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
        <input type="submit" value="Ajouter" />
      </form>
    </main>
  ) : (
    Navigate("/")
  );
}
