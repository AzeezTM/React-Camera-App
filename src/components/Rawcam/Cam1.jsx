import React from 'react'
import { useState, useRef, useEffect } from 'react'
import "./Cam1.css"
function Cam1() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);

    const getvideo = () => {
        navigator.mediaDevices.getUserMedia({
            video:
                { width: 1920, height: 1000 }
        })
            .then(
                stream => {
                    let video = videoRef.current;
                    video.srcObject = stream;
                    video.play();
                }
            )
            .catch(err => {
                console.error(err);
            })
    }

    const takePhoto = () => {
        const width = 414;
        const height = width / (16 / 9)


        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext("2d");
        ctx.drawImage(video, 0, 0, width,
            height);
        setHasPhoto(true)


    }

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        ctx.clearRect(0, 0, photo.width, photo.height);


        setHasPhoto(false)
    }

    useEffect(() => {
        getvideo()
    }, [videoRef])



    return (
        <div className='Cam1'>
            <div className="camera">
                <video className='vid' ref={videoRef}></video>
                <button className='raw' onClick={takePhoto}>SNAP!</button>
            </div>
            <div className={"result " + (hasPhoto ? 'hasPhoto'
                : '')}>
                <canvas ref={photoRef}></canvas>
                <button  className='raw' onClick={closePhoto}>CLOSE! </button>
            </div>
        </div>
    )
}

export default Cam1