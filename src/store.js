import React, {useReducer} from 'react';

const initialState = {decks: {}};

const store = React.createContext(initialState);
const {Provider} = store;

const actions = {
  ADD_DECK: 'ADD_DECK',
  SET_CARDS: 'SET_CARDS',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_DECK:
      console.warn('ADD_DECK:', action);

      return {...state, decks: {...state.decks, [action.name]: []}};
    case action.SET_CARDS:
      const name = action.name;
      return {...state, decks: {[name]: action.cards}};
    default:
      return state;
  }
};

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const valueData = {
    deckname: state.deckname,
    cards: state.cards,
    decks: state.decks,
    addDeck: (name) => {
      console.warn('ADDDECK - name', name);
      dispatch({type: actions.ADD_DECK, name});
    },
    setCards: (name, cards) => {
      dispatch({type: actions.SET_CARDS, name, cards});
    },
  };

  return <Provider value={valueData}>{children}</Provider>;
};

export {store, StateProvider};
