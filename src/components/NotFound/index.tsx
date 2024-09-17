import React from 'react';

import Head from 'next/head';
import NextLink from 'next/link';

import { Button, Center, Text, VStack } from '@chakra-ui/react';

import { pageTitlePrefix } from '../../constants';
import { useHeaderDims } from '../../hooks/use-header-dims';

const NotFound = () => {
  const { headerHeight, topMargin } = useHeaderDims();

  return (
    <>
      <Head>
        <title>{pageTitlePrefix}</title>
      </Head>
      <Center as='main' mt={topMargin} h={`calc(100vh - ${headerHeight})`}>
        <VStack spacing={2}>
          <Text as='h1' fontSize='2xl'>
            oh no!
          </Text>
          <Text mb='6px'>There&apos;s nothing on this page…</Text>
          <Button as={NextLink} href='/'>
            Go back home
          </Button>
        </VStack>
      </Center>
    </>
  );
};

export default NotFound;
