"use client";

import { useEffect, useRef, useState } from "react";

const CameraAccess: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

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

  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(","); // Split the base64 string

    // Extract MIME type safely
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error("Invalid base64 string: Unable to extract MIME type.");
    }
    const mime = mimeMatch[1];

    const bstr = atob(arr[1]); // Decode the Base64 string
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoData = canvas.toDataURL("image/jpeg");

      // Convert Base64 string to File object
      const photoFile = base64ToFile(photoData, "captured_photo.jpg");
      setPhoto(photoData); // Optional: keep the Base64 for preview
      uploadPhoto(photoFile); // Pass the File object
    }
  };

  const uploadPhoto = async (photoFile: File) => {
    try {
      const formData = new FormData();
      formData.append("image", photoFile); // Append the image file to FormData

      const response = await fetch("/api/gemini-upload", {
        method: "POST",
        body: formData, // Sending the form data containing the file
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResponseMessage(data.output);
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Error uploading photo:", error);
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
          {responseMessage && (
            <div>
              <h2>Response:</h2>
              <p>{responseMessage}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CameraAccess;
