"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import useStore from "@/app/store/store";

const Loader = () => (
  <motion.div
    className="loader"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    style={{
      border: "8px solid rgba(255, 255, 255, 0.3)",
      borderTop: "8px solid #3498db",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
    }}
  />
);

const CameraAccess: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isPlant, isFood, isLiving, setIsPlant, setIsFood, setIsLiving } =
    useStore();

  let prompt = "";

  if (isPlant) {
    prompt =
      "Tell if this image is plant or not. Only answer plant or not plant";
  } else if (isFood) {
    prompt = "Tell if this image is food or not. Only answer food or not food.";
  } else if (isLiving) {
    prompt =
      "Tell if this image is living or not. Only answer living or not living.";
  }

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
  }, [isPlant, isFood, isLiving, setIsFood, setIsLiving, setIsPlant]);

  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error("Invalid base64 string: Unable to extract MIME type.");
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
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
      const photoFile = base64ToFile(photoData, "captured_photo.jpg");
      setPhoto(photoData);
      uploadPhoto(photoFile);
    }
  };

  const uploadPhoto = async (photoFile: File) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", photoFile);
      formData.append("prompt", prompt);
      const response = await fetch("/api/gemini-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResponseMessage(data.output);
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Error uploading photo:", error);
      setResponseMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      if (container.scrollHeight > window.innerHeight) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [photo, responseMessage, loading, error]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center  overflow-y-auto overflow-auto p-5 bg-gray-50"
    >
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-500" />
            <span className="text-2xl font-bold">Useless Gadget</span>
          </div>
          <ModeToggle />
        </div>
      </header>
      <h1 className="text-xl font-serif font-semibold mt-4">Camera Access</h1>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <Card className="transition-all hover:shadow-lg flex flex-col items-center mt-5 p-4 rounded-lg shadow-lg bg-white">
            <video
              ref={videoRef}
              autoPlay
              style={{ width: "100%", height: "auto", maxHeight: "180px" }}
              className="rounded-lg shadow-lg border border-gray-300"
            />
            <Button onClick={capturePhoto} className="mt-4 w-full">
              Capture Photo
            </Button>
          </Card>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          {loading && (
            <div className="mt-3">
              <Loader />
            </div>
          )}
          {responseMessage && !loading && (
            <div className="mt-3 border rounded-lg border-gray-300 p-4">
              <p className="font-sans font-bold capitalize">
                {responseMessage}
              </p>
            </div>
          )}

          {photo && (
            <Card className="transition-all hover:shadow-lg p-4 mt-3 bg-white rounded-lg shadow-lg">
              <h2 className="font-mono font-semibold">Captured Photo:</h2>
              <img
                src={photo}
                alt="Captured"
                className="mt-2 rounded-lg shadow-lg"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "300px",
                }}
              />
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default CameraAccess;
