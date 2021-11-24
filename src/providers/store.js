import React, { createContext, useReducer } from 'react';

const initialState = {
  // appData: {
  //   rows: [1],
  //   rowsData: [],
  //   columns: [],
  //   dataName: '',
  // },
  projectsMetadata: [],
  projectsData: {},
  // graphData: {},
  // conversation: [],
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((prevState, action) => {
    let updatedState;

    switch (action.type) {
      case 'SET_APP_DATA':
        updatedState = {
          ...prevState,
          appData: {
            rows: action.payload.rows,
            rowsData: action.payload.rowsData,
            columns: action.payload.columns,
            dataName: action.payload.dataName,
          },
        };

        return updatedState;

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

      case 'SET_GRAPH_DATA':
        updatedState = {
          ...prevState,
          graphData: {
            ...prevState.graphData,
            [action.payload.id]: action.payload.data,
          },
        };

        return updatedState;

      case 'SET_CONVERSATION':
        updatedState = {
          ...prevState,
          conversation: action.payload.updatedConversation,
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
