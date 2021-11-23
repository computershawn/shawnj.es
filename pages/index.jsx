/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { createClient } from 'contentful';

export default () => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE,
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  });

  const [ entries, setEntries ] = useState([]);

  useEffect(() => {
    // const fieldsToGet = 'fields.slug,fields.summary,fields.thumbnail,fields.title';
    const fieldsToGet = ['slug','summary','thumbnail','title'];
    client.getEntries({
      content_type: 'work',
      select: fieldsToGet.map(f => `fields.${f}`).join(',')
    })
      .then((data) => {
        const works = data.items.map(item => ({
          slug: item.fields.slug,
          summary: item.fields.summary,
          thumbnail: item.fields.thumbnail.fields.file.url,
          title: item.fields.title,
          id: item.sys.id,
        }));

        console.log('works', works);
        setEntries(works);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
  <div>
    <div>
      {/* <h1 sx={{fontSize: 8, my: 0}}>This is a really dope note taking app.</h1> */}
      {entries.map(entry => {
        return (
          <div key={entry.id}>
          <Link key={entry.slug} href="/[id]" as={`/${entry.slug}`}>
            <a>
              <div>
                <strong>{entry.title}</strong>
                <p>{entry.summary}</p>
              </div>
            </a>
          </Link>
        </div>
        );
      })}
    </div>
  </div> 
)}
