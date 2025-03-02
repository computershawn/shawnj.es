import React, { useCallback, useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react';
import { EntriesContext } from '../../providers/entriesContext';
import { PlayIcon } from '../CustomIcons';

// Instagram feed with the help of https://github.com/jrparente/nextjs-instagram
export default function InstaFeed({ fallbackUrl }: { fallbackUrl: string }) {
  const {
    dispatch,
    appState: { instaData },
  } = useContext(EntriesContext);

  const fetchFeed = useCallback(
    async (aft: string | null) => {
      const limit = 12; // Number of Instagram posts to retrieve per fetch
      try {
        let url = `https://graph.instagram.com/me/media?limit=${limit}&fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`;
        if (aft) {
          url += `&after=${aft}`;
        }
        const data = await fetch(url);

        if (!data.ok) {
          throw new Error('Failed to fetch Instagram feed');
        }

        const feed = await data.json();
        dispatch({
          type: 'SET_INSTAGRAM_DATA',
          payload: {
            feed: feed,
            after: feed.paging?.cursors.after,
          },
        });
      } catch (err: any) {
        console.warn('Error fetching Instagram feed:', err.message);
        dispatch({
          type: 'SET_INSTAGRAM_ERROR',
          payload: {
            error: err.message,
          },
        });
      }
    },
    [dispatch],
  );

  const loadMore = () => {
    fetchFeed(instaData.after);
  };

  // Fetch the initial feed
  useEffect(() => {
    if (instaData.feed.data.length === 0) {
      fetchFeed(null);
    }
  }, [fetchFeed, instaData.feed.data.length]);

  return (
    <>
      {instaData.error && (
        <Alert status="error" variant="subtle">
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
      )}

      {instaData.feed && (
        <Box>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={2}
            pb={4}
          >
            {instaData.feed.data.map((post) => (
              <GridItem
                key={post.id}
                aspectRatio="1"
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Link
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative"
                >
                  {post.media_type === 'VIDEO' ? (
                    <Box position="relative" w="100%" h="100%">
                      <Center position="absolute" w="100%" h="100%">
                        <PlayIcon color="whiteAlpha.900" boxSize={8} />
                      </Center>
                      <video
                        src={post.media_url}
                        controls={false}
                        width="100%"
                        height="100%"
                      />
                    </Box>
                  ) : (
                    <Image
                      src={post.media_url}
                      alt={post.caption ?? ''}
                      w="100%"
                      h="100%"
                    />
                  )}
                </Link>
              </GridItem>
            ))}
          </Grid>

          {instaData.after && (
            <Button w="100%" variant="outline" onClick={loadMore}>
              Load More
            </Button>
          )}
        </Box>
      )}
    </>
  );
}
