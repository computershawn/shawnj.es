import React from 'react';

import Head from 'next/head';
import NextLink from 'next/link';

import { Button, Center, Text, VStack } from '@chakra-ui/react';

import { headerHt, pageTitlePrefix } from '../../constants';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>{pageTitlePrefix}</title>
      </Head>
      <Center as='main' mt={headerHt} h={`calc(100vh - ${headerHt})`}>
        <VStack spacing={2}>
          <Text as='h1' fontSize="2xl">oh no!</Text>
          <Text mb="6px">There&apos;s nothing on this page…</Text>
          <Button as={NextLink} href="/">Go back home</Button>
        </VStack>
      </Center>
    </>
  );
};

export default NotFound;