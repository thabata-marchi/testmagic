import React, {useReducer} from 'react';

const initialState = {
  deckname: 'Crie o nome do seu DECK!',
  cards: 'Escolha suas cartas!',
};

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
      return state;
  }
};

const MagicContext = React.createContext();

const Provider = ({children}) => {
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

  return (
    <MagicContext.Provider value={valueData}>{children}</MagicContext.Provider>
  );
};

export default Provider;
