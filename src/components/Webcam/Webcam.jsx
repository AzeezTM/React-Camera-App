import React, { useCallback, useEffect, useState } from 'react';

import { useRef } from 'react';
import Webcam from 'react-webcam';


function MyWebcam() {
  const [devices, setDevices] = useState([])
  const [hasPhoto, setHasPhoto] = useState(false);

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );



  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  }, [handleDevices])




  return (
    <div>
      {devices.map((device, key) => (
        <div key={key}>
          <Webcam
            audio={false}
            videoConstraints={{ deviceId: device.deviceId }}

          />
          {device.label || `Device ${key + 1}`}

        </div>

      ))}
    </div>
  )
}

export default MyWebcam;
