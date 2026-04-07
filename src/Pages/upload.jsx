import { useRef, useState } from "react";
import fileUpload from "../assets/fileUpload.png";
import "bootstrap/dist/css/bootstrap.min.css";
//https://react-bootstrap.netlify.app/docs/getting-started/introduction
function FileUpload() {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  const acceptedFileExtensions = ["jpg", "png", "jpeg"];
  const acceptedFileTypesString = acceptedFileExtensions
    .map((ext) => {
      `.${ext}`;
    })
    .join(",");

  const handleSubmit = () => {
    if (selectedFiles.length === 0) {
      setError("File is required.");
    } else if (!error) {
      setSelectedFiles([]);
      setError("");
    }
  };
  const handleFileChange = (e) => {
    const newFilesArray = Array.from(e.target.files);
    provessFiles(newFilesArray);
  };
  const handleDreop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };
  const processFiles = (filesArray) => {
    const newSelectedFiles = [...selectedFiles];
    let hasError = false;
    const fileTypeRegex = new RegExp(acceptedFileExtensions.join("|"), "i");
    console.log("FileRegex", fileTypeRegex);
    filesArray.forEach((file) => {
      if (newSelectedFiles.some((f) => f.name === file.name)) {
        setError("File names must be unique");
        hasError = true;
      } else if (!fileTypeRegex.test(file.name.split(".").pop())) {
        setError(`Only ${acceptedFileExtensions.join(", ")} files are allowed`);
        hasError = true;
      } else if (file.size > 10e5) {
        setError(`The file is too big!`);
        hasError = true;
      } else {
        newSelectedFiles.push(file);
      }
    });
    if (!hasError) {
      setError("");
      setSelectedFiles(newSelectedFiles);
    }
  };
  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileDelete = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="container p-4 p-md-5 bg-white rounded shadow-lg">
        <h2 className="text-center mb-4 fw-semibold">Upload Files</h2>

        <div className="row g-4">
          <div
            className="col-12 col-md-6"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
          >
            <div
              className="border border-primary border-3 rounded p-4 bg-primary bg-opacity-10 d-flex flex-column justify-content-center align-items-center text-center"
              style={{ minHeight: "23rem", borderStyle: "dashed" }}
            >
              <img
                src={fileUpload}
                alt="Upload Icon"
                className="mb-3"
                style={{ width: "90px", height: "90px" }}
              />

              <p className="fs-5 fw-semibold mb-1">Drag and Drop the files</p>
              <p className="fs-5 fw-bold mb-3">or</p>

              <button
                type="button"
                onClick={handleCustomButtonClick}
                className="btn btn-primary px-4"
              >
                Upload Files
              </button>

              <input
                type="file"
                id="files"
                name="files"
                multiple
                accept={acceptedFileTypesString}
                ref={fileInputRef}
                className="d-none"
                onChange={handleFileChange}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div
              className="border rounded p-3 overflow-auto"
              style={{ maxHeight: "23rem" }}
            >
              {selectedFiles.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {selectedFiles.map((file, index) => (
                    <li
                      key={file.name}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src="/assets/svg/image.svg"
                          alt="File Icon"
                          className="me-2"
                          style={{ width: "32px", height: "32px" }}
                        />
                        <span className="fs-6">{file.name}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleFileDelete(index)}
                        className="btn btn-link text-danger p-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="w-5 h-5"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M6 4l8 8M14 4l-8 8"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <p className="text-muted fs-5 fw-semibold text-center">
                    No Files Uploaded Yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && <p className="text-danger mt-3 text-center">{error}</p>}

        <div className="d-flex justify-content-center mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary px-5 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
//https://medium.com/@waliahmadfiles/building-a-file-upload-component-with-drag-and-drop-in-react-712efcc5383b
export default FileUpload;
