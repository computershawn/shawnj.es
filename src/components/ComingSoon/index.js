import { Box, Text } from '@chakra-ui/react';

const ComingSoon = () => {
  return (
    <Box
      maxW={[null, 960]}
      marginTop='7.5rem'
      marginX={['1rem', 'auto']}
    >
      <Box margin={[null, '3rem 1rem']}>
        <Text as="h3" fontWeight={400} lineHeight="1.6rem">
          Please bear with me while I migrate projects from my original Squarespace site. Those projects are still viewable at <a href="https://designcpu.squarespace.com/" target="_blank">designcpu.squarespace.com</a>.
        </Text>
      </Box>
    </Box>
  );
};

export default ComingSoon;
