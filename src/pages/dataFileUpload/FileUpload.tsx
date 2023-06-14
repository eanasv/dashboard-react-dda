import axios from "axios";
import React, { useState } from "react";
import { postHttp } from "../../service/APIRequest";
import "./FileUpload.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [responseText, setresponseText] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState("");

  const handleItemSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelectedFileType(event.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleResponseText = () => {
    setresponseText(null);
  };

  const handleSubmit = (e) => {
    console.log(selectedFileType);
    if (!selectedFileType) {
      console.error("Please select a file type");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    postHttp("upload/" + { selectedFileType }, formData)
      .then((response) => {
        console.log(response);
        setresponseText(response);
        // handle success
      })
      .catch((error) => {
        console.log(error);
        setresponseText(error);
        // handle error
      });
    e.target.value = null;
  };

  // axios
  //   .post("http://localhost:8080/upload", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   .then((response) => {
  //     console.log(response);
  //     setresponseText(response.data);
  //     // handle success
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     // handle error
  //   });
  //};

  // const handleFileUpload = () => {
  //   if (!selectedFileType) {
  //     console.error("Please select a file type");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   postHttp("upload/" + selectedFileType, formData)
  //     .then((response) => {
  //       console.log(response);
  //       setresponseText(response);
  //       // handle success
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setresponseText(error);
  //       // handle error
  //     });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // const fileInput = document.getElementById("fileInput");
  //   const file = e.target.files[0];
  //   handleFileUpload();
  //   // Clear the file input
  //   e.target.value = null;
  // };
  return (
    <div className="upload-backgroound">
      <div className="upload-container">
        <form
        // onSubmit={() => handleSubmit}
        >
          <select value={selectedFileType} onChange={handleItemSelect}>
            <option value="">Select File Type</option>
            <option value="employee">Employee</option>
            <option value="training">Training</option>
            <option value="entity">Entity</option>
            {/* Add more file types as needed */}
          </select>
          <input
            type="file"
            onChange={handleFileChange}
            onClick={handleResponseText}
          />
          <button type="submit" onClick={() => handleSubmit}>
            Upload
          </button>
        </form>
      </div>
      <div className="response-text">{responseText}</div>
    </div>
  );
};

export default FileUpload;
