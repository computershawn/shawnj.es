import React, { useEffect, useState, useRef } from 'react';
import NextLink from 'next/link';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Flex,
  Link,
  Spinner,
} from '@chakra-ui/react';

const CURATOR_SCRIPT_URL =
  'https://cdn.curator.io/published/a462d66a-575a-415e-9a4b-1c2a06a41cab.js';
const SCRIPT_LOAD_TIMEOUT = 8000;

export default function InstaFeed({ fallbackUrl }: { fallbackUrl: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Create the script element
    const script = document.createElement('script');
    script.src = CURATOR_SCRIPT_URL;
    script.async = true;

    // 2. Set a timeout as fallback in case the script loads but doesn't initialize
    timeoutIdRef.current = window.setTimeout(() => {
      setHasError(true);
      setIsLoading(false);
    }, SCRIPT_LOAD_TIMEOUT); // Timeout after N seconds

    // 3. Handle script load success
    script.onload = () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      setIsLoading(false);
    };

    // 4. Handle script load error
    script.onerror = () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      setHasError(true);
      setIsLoading(false);
    };

    // 5. Append it to the document body
    document.body.appendChild(script);

    // 6. Cleanup function: removes the script if the user leaves the page
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      document.body.removeChild(script);
    };
  }, []);

  // Show error state with fallback content
  if (hasError) {
    return (
      <Alert status="warning" variant="subtle">
        <AlertIcon />
        <AlertDescription>
          Can&apos;t get the Instagram feed.{' '}
          <Link
            as={NextLink}
            href={fallbackUrl}
            target="_blank"
            textDecoration={'underline'}
          >
            Try viewing it here.
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <Flex className="feed-container" justifyContent="center" w="full" my={8}>
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <Box className="feed-container" style={{ width: '100%', margin: 0 }}>
      {/* This ID must match exactly what was in your snippet */}
      <Box
        id="curator-feed-default-feed-layout"
        sx={{
          '.crt-logo.crt-tag': {
            visibility: 'hidden',
          },
        }}
      >
        <a
          href="https://curator.io"
          target="_blank"
          rel="noopener noreferrer"
          className="crt-logo crt-tag"
        >
          Powered by Curator.io
        </a>
      </Box>
    </Box>
  );
}
