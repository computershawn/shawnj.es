export type FunAction =
  | { type: 'SET_PROJECTS_METADATA'; payload: any }
  | { type: 'SET_PROJECTS_DATA'; payload: any }
  | { type: 'SET_SLUG_INFO'; payload: any }
  | { type: 'SET_INSTAGRAM_DATA'; payload: any }
  | { type: 'SET_INSTAGRAM_ERROR'; payload: any }
  | { type: 'CLEAR_DATA'; payload: any };

export type Project = {
  id: string;
};

export type AppContextType = {
  projectsMetadata: Project[];
  projectsData: {};
  projectLookup: {};
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
