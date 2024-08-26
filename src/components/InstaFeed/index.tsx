import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { store } from '../../providers/store';

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
// !! TODO: Store instagrm data in application state
export default function InstaFeed() {
  const [instagramFeed999, setInstagramFeed999] = useState(null);
  const [after, setAfter] = useState(null);
  const [error, setError] = useState(null);

  const globalState = useContext(store);
  const {
    dispatch,
    state: { instaData },
  } = globalState;

  const fetchFeed = async (after) => {
    const limit = 3;
    try {
      let url = `https://graph.instagram.com/me/media?limit=${limit}&fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`;
      if (after) {
        url += `&after=${after}`;
      }
      const data = await fetch(url);

      if (!data.ok) {
        throw new Error('Failed to fetch Instagram feed');
      }

      const feed = await data.json();

      setInstagramFeed999((prevFeed) => {
        if (prevFeed && prevFeed.data.length > 0) {
          return {
            ...feed,
            data: [...prevFeed.data, ...feed.data],
          };
        }
        return feed;
      });
      setAfter(feed.paging?.cursors.after);
      setError(null);
      // const updatedFeed = {
      //   ...instaData.feed,
      //   ...(instaData.feed &&
      //     instaData.feed.data.length > 0 && {
      //       data: [...instaData.feed.data, ...feed.data],
      //     }),
      // };
      // const updatedFeed = {
      //   ...instaData.feed,
      // ...(instaData.feed &&
      //   instaData.feed.data.length > 0 && {
      //     data: [...instaData.feed.data, ...feed.data],
      //   }),
      // };
      // const updatedData =
      //   instaData.feed && instaData.feed.data.length > 0
      //     ? [instaData.feed.data, ...feed.data]
      //     : feed.data;
      // const feefee = {
      //   ...instaData.feed,
      //   data: updatedData,
      // };
      // console.log('instagramFeed', instagramFeed999);
      // console.log('feed', feefee);
      // console.log('updatedFeed', updatedFeed);

      dispatch({
        type: 'SET_INSTAGRAM_DATA',
        payload: {
          feed: feed,
          after: feed.paging?.cursors.after,
        },
      });
    } catch (err) {
      console.error('Error fetching Instagram feed:', err.message);
      setError(err.message);
      dispatch({
        type: 'SET_INSTAGRAM_ERROR',
        payload: {
          error: err.message,
        },
      });
    }
  };

  const loadMore = () => {
    fetchFeed(after);
  };

  // Fetch the initial feed
  useEffect(() => {
    fetchFeed(null);
  }, []);

  return (
    <>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Oopsies</AlertTitle>
          <AlertDescription>Can't get Instagram feed</AlertDescription>
        </Alert>
      )}

      {instagramFeed999 && (
        <Box mb={4}>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={2}
            pb={4}
          >
            {instagramFeed999.data.map((post) => (
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
                    <video
                      src={post.media_url}
                      controls={false}
                      width='100%'
                      height='100%'
                    />
                  ) : (
                    <img
                      src={post.media_url}
                      alt={post.caption ?? ''}
                      width='100%'
                      height='100%'
                    />
                  )}
                  {/* <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50 flex items-center justify-center p-4 w-full h-[300px]'>
                    <p className='text-white text-center text-xs truncate'>
                      {post.caption}
                    </p>
                  </div> */}
                </Link>
              </GridItem>
            ))}
          </Grid>
          {after && <button onClick={loadMore}>Load More</button>}
        </Box>
      )}
    </>
  );
}
