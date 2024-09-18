import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { createClient } from 'contentful';
import isEmpty from 'lodash/isEmpty';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import ImageCarousel from '../src/components/ImageCarousel';
import InstaFeed from '../src/components/InstaFeed';
import Spinner from '../src/components/Spinner';
import VimeoVideo from '../src/components/VimeoVideo';
import { useHeaderDims } from '../src/hooks/use-header-dims';
import { EntriesContext } from '../src/providers/entriesContext';
import {
  EmbeddedAssetBlockNode,
  EmbeddedEntryBlockNode,
  Entry,
  ParagraphNode,
  ProviderContextType,
} from '../src/types';
import { pageTitlePrefix } from '../src/constants';
import NotFound from '../src/components/NotFound';

const ProjectById = () => {
  const router = useRouter();
  const slug = typeof router.query?.slug === 'string' ? router.query?.slug : '';
  const {
    dispatch,
    appState: { projectsData, projectsMetadata, projectLookup },
  } = useContext<ProviderContextType>(EntriesContext);
  const [projectNotFound, setProjectNotFound] = useState(false);
  const { headerHeight, topMargin } = useHeaderDims(true);

  useEffect(() => {
    // Only proceed if projectLookup contains values and if app
    // context does not already contain this project's data
    // TODO: Maybe data fetching should be made into an external method
    const hasProjects = !isEmpty(projectLookup);
    const entryIdExists = !!projectLookup?.[slug]?.id;
    const notYetFetched =
      entryIdExists && !projectsData?.[projectLookup[slug].id];

    if (!!slug && hasProjects && notYetFetched) {
      const client = createClient({
        space: process.env.NEXT_PUBLIC_SPACE ?? '',
        accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? '',
      });
      const { id } = projectLookup[slug];
      client
        .getEntry<Entry>(id, {
          content_type: 'work',
          select: 'fields.projectContent',
        })
        .then((ent) => {
          dispatch({
            type: 'SET_PROJECTS_DATA',
            payload: {
              id,
              content: ent?.fields?.projectContent,
            },
          });
        })
        .catch(console.error);
    }
    if (hasProjects && !entryIdExists) {
      setProjectNotFound(true);
    }
  }, [dispatch, projectLookup, projectsData, slug]);

  if (projectNotFound) {
    return <NotFound />;
  }

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: EmbeddedAssetBlockNode) => {
        // render the EMBEDDED_ASSET as you need
        const { file, description } = node.data.target.fields;
        return (
          <Box as="figure">
            <Image src={`https:${file.url}`} width="100%" alt={description} />
            {description && (
              <Text as="figcaption" fontSize="sm" mt={1}>
                {description}
              </Text>
            )}
          </Box>
        );
      },
      [BLOCKS.PARAGRAPH]: (_node: ParagraphNode, children: ReactNode) => {
        if (children?.toString().trim() === '') return null;

        return <Text>{children}</Text>;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: EmbeddedEntryBlockNode) => {
        const { target } = node.data;
        // Collection of images gets rendered as a carousel
        if (target.sys.contentType.sys.id === 'imageCollection') {
          const carouselData = {
            images: target.fields.images,
            captionType: target.fields.captionType,
            multipleCaptions: target.fields.multipleCaptions.text,
            singleCaption: target.fields.singleCaption,
          };

          return <ImageCarousel data={carouselData} />;
        }

        // If the entry fields contain videoId and videoHash, render a Vimeo video
        if (target.fields?.videoId && target.fields?.videoHash) {
          return (
            <VimeoVideo
              videoId={target.fields.videoId}
              videoHash={target.fields.videoHash}
            />
          );
        }

        // If the entry fields contain 'code', render the item specified
        if (
          target.fields?.code &&
          target.fields.code?.item === 'instagram_feed'
        ) {
          return (
            <Box>
              <InstaFeed />
            </Box>
          );
        }
      },
    },
  };

  const { title } = projectLookup?.[slug] || '';
  const pageTitle = title ? `${pageTitlePrefix} :: ${title}` : pageTitlePrefix;

  const pageHead = (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );

  if (!isEmpty(projectsData) && !isEmpty(projectsMetadata)) {
    const { id, summary } = projectLookup[slug];
    return (
      <>
        {pageHead}
        <Flex
          as="main"
          mt={topMargin}
          pb={[8, 12]}
          direction={['column', 'row']}
          sx={{
            h4: {
              fontSize: 'xl',
            },
            hr: {
              borderTop: '1px solid #dbdbdb',
              width: '100%',
            },
          }}
        >
          <VStack
            w={['auto', '18.5rem']}
            minW={[null, '18.5rem']}
            ml={[6, 12]}
            mr={[6, 6]}
            mb={4}
            align="flex-start"
          >
            <Heading fontWeight={200} letterSpacing="0.0625rem">
              {title}
            </Heading>
            <Text mt={2} fontSize={['lg', 'md']}>
              {summary}
            </Text>
          </VStack>
          <VStack
            my={0}
            ml={6}
            mr={[6, 12]}
            spacing={4}
            maxW="1000px"
            align="flex-start"
            sx={{ h3: { fontSize: '2xl', fontWeight: 300 } }}
          >
            {documentToReactComponents(projectsData[id], renderOptions)}
          </VStack>
        </Flex>
      </>
    );
  }

  return (
    <>
      {pageHead}
      <Center as="main" mt={headerHeight} h={`calc(100vh - ${headerHeight})`}>
        <Spinner />
      </Center>
    </>
  );
};

export default ProjectById;
