import Hls from "hls.js";
import dashjs from "dashjs";
import { useEffect, useRef, useState } from "react";

export function VideoPlayer({ src, type }) {
  const videoRef = useRef(null);
  const [dashPlayer, setDashPlayer] = useState(null);

  useEffect(() => {
    const video = videoRef.current;

    if (type === "hls" && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (type === "dash") {
      const player = dashjs.MediaPlayer().create();
      player.initialize(video, src, true);
      setDashPlayer(player);
    } else {
      video.src = src;
    }
  }, [src, type]);

  const handleQualityChange = (qualityIndex) => {
    if (dashPlayer) {
      dashPlayer.setQualityFor("video", qualityIndex);
    }
  };

  return (
    <div>
      <video ref={videoRef} controls className="w-full h-48 object-cover" />
      {type === "dash" && (
        <div className="mt-2">
          <button onClick={() => handleQualityChange(0)}>240p</button>
          <button onClick={() => handleQualityChange(1)}>480p</button>
          <button onClick={() => handleQualityChange(2)}>720p</button>
          <button onClick={() => handleQualityChange(3)}>1080p</button>
        </div>
      )}
    </div>
  );
}
