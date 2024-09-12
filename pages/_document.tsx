import Document, { Html, Head, Main, NextScript } from 'next/document';

import { pageTitlePrefix } from '../src/constants';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter&display=swap'
            rel='stylesheet'
          />
          <meta name='title' content={pageTitlePrefix} />
          <meta
            name='description'
            content="Inquisitive web developer with a background in mechanical engineering and UX design. I've worked on websites and ethnographic research at the Kaiser Permanente Innovation Consultancy, designed data visualization software and prototyped interactive installations with JPL. Currently working as a software engineer at Vimeo."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
