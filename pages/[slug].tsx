import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import isEmpty from 'lodash/isEmpty';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

import ImageCarousel from '../src/components/ImageCarousel';
import InstaFeed from '../src/components/InstaFeed';
import VimeoVideo from '../src/components/VimeoVideo';
import { useHeaderDims } from '../src/hooks/use-header-dims';
import { EntriesContext } from '../src/providers/entriesContext';
import {
  EmbeddedAssetBlockNode,
  EmbeddedEntryBlockNode,
  ParagraphNode,
  ProviderContextType,
} from '../src/types';
import { pageTitlePrefix } from '../src/constants';
import NotFound from '../src/components/NotFound';
import { getProjectData } from '../src/utils';

const ProjectById = () => {
  const router = useRouter();
  const slug = typeof router.query?.slug === 'string' ? router.query?.slug : '';
  const {
    dispatch,
    appState: { projectsData },
  } = useContext<ProviderContextType>(EntriesContext);
  const [projectNotFound, setProjectNotFound] = useState(false);
  const { headerHeight, topMargin } = useHeaderDims(true);
  const initProjectData = () => {
    // Only proceed if projectsData contains values and if
    // app context does not already contain this project's data
    const hasProjects = !isEmpty(projectsData);
    const space: string | undefined = process?.env?.NEXT_PUBLIC_SPACE;
    const accessToken: string | undefined =
      process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    const hasAccess = !!space && !!accessToken;
    const shouldFetch = !projectsData.find((item) => item.slug === slug)
      ?.fetched;
    const id = projectsData.find((item) => item.slug === slug)?.id || '';
    if (shouldFetch && hasAccess) {
      getProjectData(space, accessToken, id)
        .then((entry) => {
          dispatch({
            type: 'SET_PROJECTS_DATA',
            payload: {
              id,
              projectContent: entry?.fields?.projectContent,
            },
          });
        })
        .catch(console.error);
    }
    if (hasProjects && !id) {
      setProjectNotFound(true);
    }
  };

  useEffect(initProjectData, [dispatch, projectsData, slug]);

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
            <InstaFeed fallbackUrl="https://instagram.com/computershawn" />
          );
        }
      },
    },
  };

  const proj = projectsData.find((item) => item.slug === slug);
  const title = proj?.title;
  const pageTitle = title ? `${pageTitlePrefix} :: ${title}` : pageTitlePrefix;

  const pageHead = (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );

  if (proj?.content && proj?.data) {
    const { summary } = proj;
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
            {documentToReactComponents(
              {
                data: proj.data,
                nodeType: proj.nodeType,
                content: proj.content,
              },
              renderOptions,
            )}
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
