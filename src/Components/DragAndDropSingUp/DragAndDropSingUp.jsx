import { useCallback, useState, useEffect } from "react";
import "./dragAndDropSingUp.css";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function DragAndDropSingUp(props) {
  const [arrayOfImages, setArrayOfImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setArrayOfImages(
      acceptedFiles.map((file) => {
        return Object.assign(file, { preview: URL.createObjectURL(file) });
      })
    );

    props.setFile([...arrayOfImages]);
  }, []);

  useEffect(() => {
    props.setFile([...arrayOfImages]);
  }, [arrayOfImages]);
  console.log("OKKKK");
  const handleOnClickDeletPicutre = (event, value) => {
    event.stopPropagation();

    console.log(arrayOfImages, value);
    for (let i = 0; i < arrayOfImages.length; i++) {
      if (arrayOfImages[i].name === value) {
        const arrayOfImagesCopy = [...arrayOfImages];
        arrayOfImagesCopy.splice(i, 1);
        setArrayOfImages([...arrayOfImagesCopy]);
      }
    }
  };

  const thumbs = arrayOfImages.map((picture) => {
    return (
      <div key={picture.name} className="thumb">
        <div>
          <p>{picture.name}</p>
          <div>
            <button
              type="button"
              onClick={(event) =>
                handleOnClickDeletPicutre(event, picture.name)
              }
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <img
              src={picture.preview}
              onLoad={() => {
                URL.revokeObjectURL(picture.preview);
              }}
            />
          </div>
        </div>
      </div>
    );
  });

  const maxFilesAuthorized = props.maxFilesAuthorized;

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ multiple: false, onDrop, accept: { "image/*": [] } });

  const rejectedItems = fileRejections.map((picture) => {
    return (
      <li key={picture.file.path}>
        {picture.file.path}
        <ul>
          {picture.errors.map((error) => {
            if (error.code === "file-invalid-type") {
              return (
                <li key={error.code}>Votre fichier n'est pas au bon format.</li>
              );
            }
            if (error.code === "too-many-files") {
              return (
                <li key={error.code}>
                  Vous avez dépassé le nombre maximal autorisé (Maximum
                  {maxFilesAuthorized} photos).
                </li>
              );
            } else {
              return <li key={error.code}>{error.message}</li>;
            }
          })}
        </ul>
      </li>
    );
  });

  return (
    <div className="dropzone-section">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragReject ? (
          <p className="drag-Reject">Votre fichier n'est pas valide.</p>
        ) : isDragActive ? (
          <p className="drag-Accept">Déposez votre photo.</p>
        ) : (
          <p>Glissez et déposez une photo ou cliquez pour la séléctionner.</p>
        )}
        <button type="button">
          {" "}
          <FontAwesomeIcon icon={faPlus} />
          &nbsp;Cliquez
        </button>
      </div>
      <div className="pictures-status">
        {" "}
        {acceptedFiles.length === 0 && rejectedItems.length === 0 ? (
          <p>
            Déposez une image pour personaliser votre avatar. <br />
            Veillez a choisir un format adapté (image).
          </p>
        ) : (
          ""
        )}
        {acceptedFiles.length !== 0 && arrayOfImages.length !== 0 && (
          <div className="pictures-accepted">
            <h4>Votre image est acceptée:</h4>
            <div>{thumbs}</div>
          </div>
        )}
        {rejectedItems.length !== 0 && (
          <div className="pictures-rejected">
            <h4>Fichier(s) refusé(s):</h4>
            <ul>{rejectedItems}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
