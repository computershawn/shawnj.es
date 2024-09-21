import React, { createContext, useReducer } from 'react';
import { AppContextType, FunAction, Project, ProviderContextType } from '../types';

const defaultState: AppContextType = {
  projectsData: [],
  instaData: {
    after: null,
    error: null,
    feed: { data: [] },
  },
};

export const EntriesContext = createContext<ProviderContextType>({
  appState: defaultState,
});

const entriesReducer = (
  prevState: AppContextType,
  action: FunAction,
): AppContextType => {
  let updatedState;

  switch (action.type) {
    case 'SET_PROJECTS_METADATA':
      updatedState = {
        ...prevState,
        projectsData: action.payload.map((w: Project) => ({...w, fetched: false}))
      };
      return updatedState;

    case 'SET_PROJECTS_DATA':
      updatedState = {
        ...prevState,
        projectsData: prevState.projectsData.map((item) =>
          item.id !== action.payload.id
            ? item
            : {
                ...item,
                fetched: true,
                content: action.payload.projectContent.content,
                data: action.payload.projectContent.data,
                nodeType: action.payload.projectContent.nodeType,
              },
        ),
      };
      return updatedState;

    case 'SET_INSTAGRAM_DATA':
      updatedState = {
        ...prevState,
        instaData: {
          after: action.payload.after,
          error: null,
          feed: {
            ...action.payload.feed,
            ...(prevState.instaData.feed &&
              prevState.instaData.feed.data.length && {
                data: [
                  ...prevState.instaData.feed.data,
                  ...action.payload.feed.data,
                ],
              }),
          },
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
};

const EntriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appState, dispatch] = useReducer(entriesReducer, defaultState);

  return (
    <EntriesContext.Provider value={{ appState, dispatch }}>
      {children}
    </EntriesContext.Provider>
  );
};

export default EntriesProvider;
