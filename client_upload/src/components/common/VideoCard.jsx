import Hls from 'hls.js';
import dashjs from 'dashjs';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

function VideoCard({ video, type }) {
  const videoRef = useRef(null);
  const [dashPlayer, setDashPlayer] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);

  const videoUrl = video ? video?.playback?.hls : '';
  useEffect(() => {
    const video = videoRef.current;

    if (type === 'hls' && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
    } else if (type === 'dash') {
      const player = dashjs.MediaPlayer().create();
      player.initialize(video, videoUrl, true);
      setDashPlayer(player);
    } else {
      video.src = videoUrl;
    }
  }, [videoUrl, type, playVideo]);

  const handleQualityChange = (qualityIndex) => {
    if (dashPlayer) {
      dashPlayer.setQualityFor('video', qualityIndex);
    }
  };

  return (
    <div>
      <div
        className={`${!playVideo ? 'block' : 'hidden'} absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 `}
      >
        <Button className={`text-white`} onClick={() => setPlayVideo(!playVideo)}>
          <PlayCircleOutlineIcon fontSize="large" />
        </Button>
      </div>
      {!playVideo ? (
        <img src={video?.thumbnail} className="h-48 w-full object-cover" alt={video?.name} />
      ) : (
        <video ref={videoRef} controls className="w-full h-48 object-cover" />
      )}
      {type === 'dash' && (
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

export default VideoCard;
