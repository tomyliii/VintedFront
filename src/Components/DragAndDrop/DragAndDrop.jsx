import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./dragAndDrop.css";
export default function DragAndDrop(props) {
  const [arrayOfImages, setArrayOfImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    console.log("start", acceptedFiles);
    setArrayOfImages(
      acceptedFiles.map((file) => {
        return Object.assign(file, { preview: URL.createObjectURL(file) });
      })
    );
  }, []);

  const thumbs = arrayOfImages.map((picture) => {
    return (
      <div key={picture.name} className="thumb">
        <div>
          <p>{picture.name}</p>
          <img
            src={picture.preview}
            onLoad={() => {
              URL.revokeObjectURL(picture.preview);
            }}
          />
        </div>
      </div>
    );
  });

  // const maxFilesAutorized = props.maxFilesAutorized;
  const maxFilesAutorized = 10;

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
    maxFiles: 10,
    accept: { "image/*": [] },
  });

  const acceptedItems = acceptedFiles.map((picture) => {
    return <li key={picture.path}>{picture.path}</li>;
  });

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
                  {maxFilesAutorized} photos).
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
        <button>Cliquez</button>
      </div>

      {
        <div className="pictures-status">
          {/* {!acceptedFiles && !rejectedItems && (
          <p>
            Vous pouvez déposer jusqu'à 10 photos de votre article. Veillez a
            choisir un format adapter(image).
          </p>
        )} */}

          <div className="pictures-accepted">
            <h4>Photo(s) acceptée(s)</h4>
            {/* <ul>{acceptedItems}</ul> */}
            <div>{thumbs}</div>
          </div>

          <div className="pictures-rejected">
            <h4>Photo(s) refusée(s)</h4>
            <ul>{rejectedItems}</ul>
          </div>
        </div>
      }
    </div>
  );
}
