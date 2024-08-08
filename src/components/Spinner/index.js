import { Box, keyframes } from '@chakra-ui/react';

const ringAround = keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
})

const segmentStyle = {
  boxSizing: 'border-box',
  display: 'block',
  position: 'absolute',
  width: '64px',
  height: '64px',
  margin: '8px',
  border: '8px solid #0366EE',
  borderRadius: '50%',
  animation: `${ringAround} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
  borderColor: '#0366EE transparent transparent transparent',
}

const Spinner = () => {
  return (
    <Box
      display="inline-block"
      position="relative"
      width="5rem"
      height="5rem"
    >
      <Box {...segmentStyle} sx={{ animationDelay: '-0.45s' }} />
      <Box {...segmentStyle} sx={{ animationDelay: '-0.3s' }} />
      <Box {...segmentStyle} sx={{ animationDelay: '-0.15s' }} />
      <Box {...segmentStyle} />
    </Box>
  );
};

export default Spinner;
