import { Box } from '@chakra-ui/react';
import Player from '@vimeo/player';
import React, { useEffect } from 'react';

export default function VimeoVideo({ videoId, videoHash }) {
  if (!videoId) return;

  const elemId = `video-${videoId}`;

  useEffect(() => {
    var playerOptions = {
      url: `https://player.vimeo.com/video/${videoId}?h=${videoHash}`
    };

    var videoPlayer = new Player(elemId, playerOptions);

    videoPlayer.setVolume(0);

    videoPlayer.on('play', function () {
      console.log('Played the first video');
    });
  }, []);

  return (
    <Box
      id={elemId}
      w='100%'
      p='56.25% 0 0 0'
      position='relative'
      sx={{
        iframe: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
      }}
    />
  );
}