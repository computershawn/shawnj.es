import React, { createContext, useReducer } from 'react';

type FunAction =
  | { type: 'SET_PROJECTS_METADATA'; payload: any }
  | { type: 'SET_PROJECTS_DATA'; payload: any }
  | { type: 'SET_SLUG_INFO'; payload: any }
  | { type: 'SET_INSTAGRAM_DATA'; payload: any }
  | { type: 'SET_INSTAGRAM_ERROR'; payload: any }
  | { type: 'CLEAR_DATA'; payload: any };

type AppContextType = {
  projectsMetadata: [];
  projectsData: {};
  projectLookup: {};
  instaData: {
    after: null;
    error: null;
    feed: { data: [] };
  };
};

// const initialState = {
//   projectsMetadata: [],
//   projectsData: {},
//   projectLookup: {},
//   instaData: {
//     after: null,
//     error: null,
//     feed: { data: [] },
//   },
// };

export interface ProviderContextType {
  appState: AppContextType;
  dispatch?: any;
};

const defaultState: AppContextType = {
  projectsMetadata: [],
  projectsData: {},
  projectLookup: {},
  instaData: {
    after: null,
    error: null,
    feed: { data: [] },
  },
};

export const EntriesContext = React.createContext<ProviderContextType | null>(null);

const entriesReducer = (prevState: AppContextType, action: FunAction): AppContextType => {
  let updatedState;

  switch (action.type) {
    case 'SET_PROJECTS_METADATA':
      updatedState = {
        ...prevState,
        projectsMetadata: action.payload,
      };
      return updatedState;

    case 'SET_PROJECTS_DATA':
      const updatedProjectsData = {
        ...prevState.projectsData,
        [String(action.payload.id)]: action.payload.content,
      };

      updatedState = {
        ...prevState,
        projectsData: updatedProjectsData,
      };
      return updatedState;

    case 'SET_SLUG_INFO':
      updatedState = {
        ...prevState,
        projectLookup: action.payload,
      };
      return updatedState;

    case 'SET_INSTAGRAM_DATA':
      const prevFeed = prevState.instaData.feed;
      const { after, feed } = action.payload;
      const temp = {
        ...feed,
        ...(prevFeed &&
          prevFeed.data.length && {
            data: [...prevFeed.data, ...feed.data],
          }),
      };

      updatedState = {
        ...prevState,
        instaData: {
          after,
          error: null,
          feed: temp,
        },
      };
      return updatedState;

    case 'SET_INSTAGRAM_ERROR':
      updatedState = {
        ...prevState,
        instaData: {
          ...prevState.instaData,
          error: action.payload.error,
        },
      };
      return updatedState;

    case 'CLEAR_DATA':
    default:
      return defaultState;
  }
}

const EntriesProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(entriesReducer, defaultState);

  return (
    <EntriesContext.Provider value={{ appState, dispatch }}>
      {children}
    </EntriesContext.Provider>
  );
};

export default EntriesProvider;
