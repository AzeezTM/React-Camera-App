import React, { useCallback } from "react";
import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { useState } from "react";
import "./Camera.css";
import { saveAs } from "file-saver";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

function Camera() {
  const [hasPhoto, setHasPhoto] = useState(false);

  const webCamRef = useRef(null);

  const [url, setUrl] = useState();

  const capturePhoto = useCallback(async () => {
    const imageSrc = webCamRef.current.getScreenshot();

    setUrl(imageSrc);
  }, [webCamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  const downloadImage = () => {
    saveAs(url, "image.png")
  }

  return (
    <div className="Cam2">
      <div className="camera">
        <Webcam
          audio={false}
          height={720}
          ref={webCamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
          onUserMedia={onUserMedia}
          mirrored={true}
          className="vid"
        />

        <div className="d-flex justify-content-center">
          <button className="btn" onClick={capturePhoto}>
            Snap
          </button>
        </div>
        
      </div>

      <div className={"result " + (url ? "hasPhoto" : "")}>
        <img src={url} alt="Screenshot" />

        <div className="d-flex justify-content-space-around">
          <div>
          <button className="btn1" onClick={() => setUrl(null)}>
            Delete
          </button>
          </div>

         <div>
         <button className="btn2" onClick={downloadImage}>
            save
          </button>
         </div>
        </div>
      </div>
    </div>
  );
}

export default Camera;
