import React from 'react';

import { Box, keyframes } from '@chakra-ui/react';

const ringAround = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const Segment = ({ delay }: { delay: string }) => (
  <Box
    boxSizing='border-box'
    display='block'
    position='absolute'
    w={16}
    h={16}
    margin={2}
    borderRadius='50%'
    borderWidth={8}
    borderStyle='solid'
    borderColor='transparent'
    borderTopColor='cyan.500'
    animation={`${ringAround} 1.2s cubic-bezier(0.5, 0, 0.5, 1) ${delay} infinite`}
  />
);

const Spinner = () => {
  return (
    <Box display='inline-block' position='relative' w={20} h={20}>
      <Segment delay='-0.45s' />
      <Segment delay='-0.3s' />
      <Segment delay='-0.15s' />
      <Segment delay='0s' />
    </Box>
  );
};

export default Spinner;
