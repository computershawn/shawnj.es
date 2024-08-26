import React, { createContext, useReducer } from 'react';

const initialState = {
  projectsMetadata: [],
  projectsData: {},
  projectLookup: {},
  instaData: {},
  /*
    const [feed, setFeed] = useState(null);
    const [after, setAfter] = useState(null);
    const [error, setError] = useState(null);
  */
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((prevState, action) => {
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
        // let temp = feed;
        // if (
        //   prevFeed &&
        //   prevFeed.data.length > 0
        // ) {
        //   temp = {
        //     ...feed,
        //     // data: [...prevFeed.data, ...feed.data],
        //     ...(prevFeed && prevFeed.data.length && {data: [...prevFeed.data, ...feed.data]}),
        //   };
        // }
        const temp = {
          ...feed,
          ...(prevFeed &&
            prevFeed.data.length && { data: [...prevFeed.data, ...feed.data] }),
        };

        updatedState = {
          ...prevState,
          instaData: {
            after,
            error: null,
            feed: temp,
          },
        };

        console.log(
          'updatedState.instaData.feed.data',
          updatedState.instaData.feed.data
        );

        return updatedState;

        case 'SET_INSTAGRAM_ERROR':  
          updatedState = {
            ...prevState,
            instaData: {
              ...prevState.instaData,
              error: action.payload.error,
            },
          };
  
          console.log(
            'updatedState.instaData',
            updatedState.instaData
          );
  
          return updatedState;
      case 'CLEAR_DATA':
        return initialState;

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
