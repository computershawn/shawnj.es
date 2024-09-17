import Head from 'next/head';
import NextLink from 'next/link';

import { Button, Center, Text, VStack } from '@chakra-ui/react';

import { headerHt, headerHtBig, pageTitlePrefix } from '../src/constants';

export default function Custom404() {
  const [isLargerThan30em] = useMediaQuery('(min-width: 30em)');
  const mt = isLargerThan30em ? headerHtBig : headerHt;

  return (
    <>
      <Head>
        <title>{pageTitlePrefix}</title>
      </Head>
      <Center as='main' mt={mt} h={`calc(100vh - ${headerHtBig})`}>
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
}
