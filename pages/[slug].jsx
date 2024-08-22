import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import isEmpty from 'lodash/isEmpty';

import Spinner from '../src/components/Spinner';
// import FooterNav from '../src/components/FooterNav';
import { store } from '../src/providers/store';
import { Box, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import VimeoVideo from '../src/components/VimeoVideo';

const ProjectById = () => {
  const router = useRouter();
  const { slug } = router.query;
  const globalState = useContext(store);
  const {
    dispatch,
    state: { projectsData, projectsMetadata, projectLookup },
  } = globalState;

  useEffect(() => {
    // Only proceed if projectLookup contains values; If it has values,
    // we'll be able to look up this project's ID based on its slug
    if (!isEmpty(projectLookup) && !!slug && !!projectLookup[slug].id) {
      const { id } = projectLookup[slug];
      // We only need to make a call to Contentful API if app context does
      // not already contain this project's data
      if (!projectsData.hasOwnProperty(id)) {
        const client = createClient({
          space: process.env.NEXT_PUBLIC_SPACE,
          accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        });

        client
          .getEntry(id, {
            content_type: 'work',
            select: 'fields.projectContent',
          })
          .then((ent) => {
            dispatch({
              type: 'SET_PROJECTS_DATA',
              payload: {
                id,
                content: ent.fields.projectContent,
              },
            });
          })
          .catch(console.error);
      }
    }
  }, [projectLookup]);

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need
        const { file, description } = node.data.target.fields;
        return (
          // TODO: Replace <img /> with a NextJS or Chakra Image
          <Box as='figure'>
            <img
              src={`https:${file.url}`}
              width='100%'
              // height={node.data.target.fields.file.details.image.height}
              // width={node.data.target.fields.file.details.image.width}
              alt={description}
            />
            {description && (
              <Text as='figcaption' fontSize='sm' mt='0.25rem'>
                {description}
              </Text>
            )}
          </Box>
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        if (node.data.target.sys.contentType.sys.id === 'imageCollection') {
          // console.log('node', node);
          console.log('images', node.data.target.fields.images);
          // console.log('captions', node.data.target.fields.captions.text);
          // const {images} = node.data.target.fields;
          // const captions = node.data.target.fields.captions.text;

          const carouselData = {
            images: node.data.target.fields.images,
            captions: node.data.target.fields.captions.text,
          };

          // return <span>image collection here</span>
          return <Carousel data={carouselData} />;
        }

        const { videoId, videoHash } = node.data.target.fields;
        if (!videoId || !videoHash) return null;

        return <VimeoVideo videoId={videoId} videoHash={videoHash} />;
      },
    },
  };

  const headerHt = '7.5rem';

  if (!isEmpty(projectsData) && !isEmpty(projectsMetadata)) {
    const { id, summary, title } = projectLookup[slug];

    return (
      <Flex
        as='main'
        // maxW={[null, 960]}
        mt={headerHt}
        pb={[null, '3rem']}
        direction={['column', 'row']}
      >
        <VStack
          w={['auto', '18.5rem']}
          mx={['1.5rem', '3rem']}
          align='flex-start'
        >
          <Heading fontWeight={200}>{title}</Heading>
          <Text mt='0.5rem'>{summary}</Text>
        </VStack>
        <VStack
          m={['0 1.5rem', 0]}
          spacing='1.5rem'
          maxW='1000px'
          align='flex-start'
          sx={{ h3: { fontSize: '1.5rem', fontWeight: 300 } }}
        >
          {documentToReactComponents(projectsData[id], renderOptions)}
        </VStack>
        {/* <FooterNav /> */}
      </Flex>
    );
  }

  return (
    <Center as='main' mt={headerHt} h={`calc(100vh - ${headerHt})`}>
      <Spinner />
    </Center>
  );
};

export default ProjectById;

const Carousel = ({ data }) => {
  const { images, captions } = data;

  return images.map((im, j) => {
    const imageUrl = `https:${im.fields.file.url}`;
    const imageCaption = captions?.[j];

    return (
      <Box as='figure'>
        <img
          src={imageUrl}
          width='80px'
          // height={node.data.target.fields.file.details.image.height}
          // width={node.data.target.fields.file.details.image.width}
          alt={im.fields.description}
        />

        {imageCaption && (
          <Text as='figcaption' fontSize='sm' mt='0.25rem'>
            {imageCaption}
          </Text>
        )}
      </Box>
    );
  });
};
