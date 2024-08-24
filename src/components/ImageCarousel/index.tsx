import React, { useState } from 'react';
import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const ImageCarousel = ({ data }) => {
  const { images, captionType, multipleCaptions, singleCaption } =
    data;

  const [currentFrame, setCurrentFrame] = useState(0);

  const nextFrame = () => {
    const val = currentFrame + 1;
    setCurrentFrame(val >= images.length ? 0 : val);
  };

  const prevFrame = () => {
    const val = currentFrame - 1;
    setCurrentFrame(val < 0 ? images.length - 1 : val);
  };

  return (
    <Box>
      <Box>
        {images.map((im, j) => {
          const imageUrl = `https:${im.fields.file.url}`;
          const imageCaption = multipleCaptions?.[j];

          return (
            <Box
              key={im.sys.id}
              display={j === currentFrame ? 'block' : 'none'}
              position='relative'
            >
              <Flex
                position='absolute'
                top='calc(50% - 2rem)'
                w='100%'
                justify='space-between'
              >
                <IconButton
                  h='4rem'
                  aria-label='previous image'
                  icon={<ChevronLeftIcon />}
                  onClick={prevFrame}
                />
                <IconButton
                  h='4rem'
                  aria-label='next image'
                  icon={<ChevronRightIcon />}
                  onClick={nextFrame}
                />
              </Flex>
              <Box as='figure'>
                <img src={imageUrl} alt={im.fields.description} />

                {imageCaption && captionType === 'multiple' && (
                  <Text as='figcaption' fontSize='sm' mt='0.25rem'>
                    {imageCaption}
                  </Text>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
      {singleCaption && captionType === 'single' && (
        <Text as='figcaption' fontSize='sm' mt='0.25rem'>
          {singleCaption}
        </Text>
      )}
    </Box>
  );
};

export default ImageCarousel;
