import { BLOCKS } from '@contentful/rich-text-types';

export type FunAction =
  | { type: 'SET_PROJECTS_METADATA'; payload: any }
  | { type: 'SET_PROJECTS_DATA'; payload: any }
  | { type: 'SET_SLUG_INFO'; payload: any }
  | { type: 'SET_INSTAGRAM_DATA'; payload: any }
  | { type: 'SET_INSTAGRAM_ERROR'; payload: any }
  | { type: 'CLEAR_DATA'; payload: any };

export type Project = {
  slug: string;
  summary: string;
  thumbnail: string;
  description: string;
  title: string;
  id: string;
  index: number;
};

export type ProjectLookupType = {
  [key: string]: {
    id: string;
    summary: string;
    title: string;
  };
};

export type AppContextType = {
  projectsMetadata: Project[];
  projectsData: {
    [key: string]: {
      content: [];
      nodeType: BLOCKS.DOCUMENT;
      data: any;
    };
  };
  projectLookup: ProjectLookupType;
  instaData: {
    after: null;
    error: null;
    feed: { data: InstagramPost[] };
  };
};

export interface ProviderContextType {
  appState: AppContextType;
  dispatch?: any;
}

export type InstagramPost = {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  timestamp: string;
  permalink: string;
};

export type Entry = {
  projectContent: any;
  slug: string;
  summary: string;
  thumbnail: {
    fields: {
      file: {
        url: string;
      };
      description: string;
    };
  };
  title: string;
  index: number;
};

export type ImageCarouselData = {
  images: {
    fields: {
      file: {
        url: string;
      };
      description: string;
    };
    sys: {
      id: string;
    };
  }[];
  captionType: string;
  multipleCaptions: string[];
  singleCaption: string;
};

// TODO: THESE TYPE DEFINITIONS ARE INCOMPLETE
export type EmbeddedAssetBlockNode = {
  data: any;
};
export type EmbeddedEntryBlockNode = {
  data: any;
};
export type ParagraphNode = {};
