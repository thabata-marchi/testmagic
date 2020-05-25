import React, {useReducer} from 'react';

const initialState = {
  deckname: '',
  cards: [],
};

const store = React.createContext(initialState);
const {Provider} = store;

// Set_(...) - nome do comando
// Nome do comando a ser executado pelo reducer
const actions = {
  SET_DECKNAME: 'SET_DECKNAME',
  SET_CARDS: 'SET_CARDS',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_DECKNAME:
      return {...state, deckname: action.value};
    case action.SET_CARDS:
      return {...state, cards: action.value};
    default:
      state;
  }
};

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const valueData = {
    deckname: state.deckname,
    cards: state.cards,
    setDeckname: (value) => {
      dispatch({type: actions.SET_DECKNAME, value});
    },
    setCards: (value) => {
      dispatch({type: actions.SET_PRICE, value});
    },
  };

  return <Provider value={valueData}>{children}</Provider>;
};

export {store, StateProvider};
