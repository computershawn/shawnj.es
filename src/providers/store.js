import React, { createContext, useReducer } from 'react';

const initialState = {
  projectsMetadata: [],
  projectsData: {},
  projectLookup: {},
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
  
      case 'CLEAR_DATA':
        return initialState;

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
