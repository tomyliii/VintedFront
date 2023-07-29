import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./dragAndDrop.css";
export default function DragAndDrop(props) {
  const [arrayOfImages, setArrayOfImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setArrayOfImages(
      acceptedFiles.map((file) => {
        return Object.assign(file, { preview: URL.createObjectURL(file) });
      })
    );

    props.setFiles([...arrayOfImages]);
  }, []);

  useEffect(() => {
    props.setFiles([...arrayOfImages]);
  }, [arrayOfImages]);

  const handleOnClick = (event, value) => {
    event.stopPropagation();
    for (let i = 0; i < arrayOfImages.length; i++) {
      if (arrayOfImages[i].name === value) {
        const arrayOfImagesCopy = [...arrayOfImages];
        arrayOfImagesCopy.splice(i, 1);
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
              //   type="button"
              onClick={(event) => handleOnClick(event, picture.name)}
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
  } = useDropzone({
    onDrop,
    maxFiles: props.maxFilesAuthorized,
    accept: { "image/*": [] },
  });

  //   const acceptedItems = acceptedFiles.map((picture) => {
  //     return <li key={picture.path}>{picture.path}</li>;
  //   });

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
          <p className="drag-Reject">Vos fichiers ne sont pas valides.</p>
        ) : isDragActive ? (
          <p className="drag-Accept">Déposez vos photos.</p>
        ) : (
          <p>Glissez et déposez vos photos ou Cliquez pour les séléctionner.</p>
        )}
        <button type="button">
          <FontAwesomeIcon icon={faPlus} />
          &nbsp;Cliquez
        </button>
      </div>

      <div className="pictures-status">
        {acceptedFiles.length === 0 && rejectedItems.length === 0 ? (
          <p>
            Vous pouvez déposer jusqu'à {maxFilesAuthorized} photos de votre
            article. Veillez a choisir un format adapté (image).
          </p>
        ) : (
          ""
        )}
        {acceptedFiles.length !== 0 && (
          <div className="pictures-accepted">
            <h4>Photo(s) acceptée(s):</h4>
            {/* <ul>{acceptedItems}</ul> */}
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
