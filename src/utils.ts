import { createClient } from 'contentful';

import { Entry } from './types';

export const getAllProjectsMeta = async (
  space: string,
  accessToken: string,
) => {
  const client = createClient({ space, accessToken });
  const fieldsToGet = ['slug', 'summary', 'thumbnail', 'title', 'index'];
  const data = await client.getEntries<Entry>({
    content_type: 'work',
    select: fieldsToGet.map((f) => `fields.${f}`).join(','),
  });

  const temp = data.items
    .map((item) => ({
      slug: item.fields.slug,
      summary: item.fields.summary,
      thumbnail: item.fields.thumbnail.fields.file.url,
      description: item.fields.thumbnail.fields.description,
      title: item.fields.title,
      id: item.sys.id,
      index: item.fields?.index || 0,
    }))
    .sort((a, b) => a.index - b.index);

  return temp;
};

export const getProjectData = async (
  space: string,
  accessToken: string,
  id: string,
) => {
  const client = createClient({ space, accessToken });
  const temp = await client.getEntry<Entry>(id, {
    content_type: 'work',
    select: 'fields.projectContent',
  });

  return temp;
};
