import React, {useReducer} from 'react';

const initialState = {decks: {}};

const store = React.createContext(initialState);
const {Provider} = store;

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      return {
        ...state,
        decks: {...state.decks, [action.name]: [action.cards]},
      };
    default:
      return state;
  }
};

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('STATE', state);

  const valueData = {
    decks: state.decks,
    name: state.name,
    cards: state.cards,

    addDeck: (name, cards) => {
      console.warn('REDUCER - name:', name);
      console.warn('REDUCER - cards:', cards);
      dispatch({type: 'ADD_DECK', name, cards});
    },
  };

  return <Provider value={valueData}>{children}</Provider>;
};

export {store, StateProvider};
