import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState();
  function handleFileSelect(e) {
    const { files } = e.target;
    setFiles(files);
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexDirection: "column", height: "100vh" }}>
      <div>
        <input
          id="raised-button-file"
          type="file"
          webkitdirectory="true"
          mozdirectory="true"
          multiple
          // accept="image/*"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload Folder
          </Button>
        </label>
      </div>
      <Button variant="contained" onClick={() => navigate("/cmi-sample", { state: files })} sx={{ width: "max-content" }}>
        Next
      </Button>
    </div>
  );
}

export default Upload;
