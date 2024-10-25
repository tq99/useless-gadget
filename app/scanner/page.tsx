"use client";

import { useEffect, useRef, useState } from "react";

const CameraAccess: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const getCameraAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Camera access denied or not available");
        console.error(err);
      }
    };

    getCameraAccess();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPhoto(canvas.toDataURL("image/png"));
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Camera Access</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", maxWidth: "400px" }}
          />
          <button onClick={capturePhoto} style={{ marginTop: "10px" }}>
            Capture Photo
          </button>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          {photo && (
            <div>
              <h2>Captured Photo:</h2>
              <img
                src={photo}
                alt="Captured"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CameraAccess;
