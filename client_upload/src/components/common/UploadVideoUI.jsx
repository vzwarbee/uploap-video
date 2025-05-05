import React, { useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadVideoUI = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const videoElement = videoRef.current;
    const fileURL = URL.createObjectURL(file);
    videoElement.src = fileURL;

    videoElement.onloadeddata = () => {
      videoElement.currentTime = 1;
    };

    videoElement.onseeked = () => {
      const canvas = canvasRef.current;
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      setThumbnail(dataURL);

      URL.revokeObjectURL(fileURL);
    };
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {!thumbnail || !fileName ? (
        <div className="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudUploadIcon className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-md text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Bấm vào để tải lên</span> hoặc kéo và thả
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">MP4 or MOV (MAX. 500MB)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="video/mp4"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div>
          <p className="text-sm font-medium">{fileName}</p>
          <img src={thumbnail} alt="Thumbnail" className="mt-2 rounded shadow-md" />
        </div>
      )}
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default UploadVideoUI;
