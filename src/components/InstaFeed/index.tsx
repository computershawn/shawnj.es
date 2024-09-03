import React, { useCallback, useContext, useEffect } from 'react';
import Link from 'next/link';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react';
import { store } from '../../providers/store';
import { PlayIcon } from '../CustomIcons';

// type InstagramPost = {
//   id: string;
//   caption: string;
//   media_url: string;
//   media_type: string;
//   timestamp: string;
//   permalink: string;
// }

// type InstagramPaging = {
//   cursors: {
//     before: string;
//     after: string;
//   }
// }

// type InstagramFeed = {
//   data: InstagramPost[];
//   paging?: InstagramPaging;
// }

// Instagram feed with the help of https://github.com/jrparente/nextjs-instagram
export default function InstaFeed() {
  const globalState = useContext(store);
  const {
    dispatch,
    appState: { instaData },
  } = globalState;

  // const fetchFeed = async (aft) => {
  //   const limit = 12; // Number of Instagram posts to retrieve per fetch
  //   try {
  //     let url = `https://graph.instagram.com/me/media?limit=${limit}&fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`;
  //     if (aft) {
  //       url += `&after=${aft}`;
  //     }
  //     const data = await fetch(url);

  //     if (!data.ok) {
  //       throw new Error('Failed to fetch Instagram feed');
  //     }

  //     const feed = await data.json();
  //     dispatch({
  //       type: 'SET_INSTAGRAM_DATA',
  //       payload: {
  //         feed: feed,
  //         after: feed.paging?.cursors.after,
  //       },
  //     });
  //   } catch (err) {
  //     console.warn('Error fetching Instagram feed:', err.message);
  //     dispatch({
  //       type: 'SET_INSTAGRAM_ERROR',
  //       payload: {
  //         error: err.message,
  //       },
  //     });
  //   }
  // };
  const fetchFeed = useCallback(async (aft) => {
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
    } catch (err) {
      console.warn('Error fetching Instagram feed:', err.message);
      dispatch({
        type: 'SET_INSTAGRAM_ERROR',
        payload: {
          error: err.message,
        },
      });
    }
  }, [dispatch]);

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
        <Alert status='warning'>
          <AlertIcon />
          <AlertTitle>Oopsies</AlertTitle>
          <AlertDescription>Can&apos;t get Instagram feed</AlertDescription>
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
                aspectRatio='1'
                overflow='hidden'
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                <Link
                  href={post.permalink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='relative'
                >
                  {post.media_type === 'VIDEO' ? (
                    <Box position='relative' w='100%' h='100%'>
                      <Center position='absolute' w='100%' h='100%'>
                        <PlayIcon color='whiteAlpha.900' boxSize={8} />
                      </Center>
                      <video
                        src={post.media_url}
                        controls={false}
                        width='100%'
                        height='100%'
                      />
                    </Box>
                  ) : (
                    <Image
                      src={post.media_url}
                      alt={post.caption ?? ''}
                      w='100%'
                      h='100%'
                    />
                  )}
                </Link>
              </GridItem>
            ))}
          </Grid>

          {instaData.after && (
            <Button w='100%' variant='outline' onClick={loadMore}>
              Load More
            </Button>
          )}
        </Box>
      )}
    </>
  );
}
