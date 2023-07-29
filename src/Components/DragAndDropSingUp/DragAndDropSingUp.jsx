import { useCallback } from "react";
import "./dragAndDropSingUp.css";
import { useDropzone } from "react-dropzone";

export default function DragAndDropSingUp(props) {
  const onDrop = useCallback((acceptedFiles) => {}, []);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    IsDragActive,
    IsDragAccept,
    IsDragReject,
  } = useDropzone({ multiple: false, onDrop, accept: { "image/*": [] } });
  return (
    <div>
      <label {...getRootProps()}>
        <input {...getInputProps()} />
      </label>
    </div>
  );
}
