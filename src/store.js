import React, {useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  decks: [],
  deckname: '',
  cards: [],
};

const store = React.createContext(initialState);
const {Provider} = store;

// Set_(...) - nome do comando
// Nome do comando a ser executado pelo reducer
const actions = {
  SET_DECKS: 'SET_DECKS',
  SET_DECKNAME: 'SET_DECKNAME',
  SET_CARDS: 'SET_CARDS',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_DECKS:
      return {...state, decks: action.value};
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
    decks: state.decks,
    deckname: state.deckname,
    cards: state.cards,
    setDecks: (value) => {
      dispatch({type: actions.SET_DECKS, value});
    },
    setDeckname: (value) => {
      dispatch({type: actions.SET_DECKNAME, value});
    },
    setCards: (value) => {
      dispatch({type: actions.SET_PRICE, value});
    },
  };

  const setData = async () => {
    try {
      await AsyncStorage.setItem('decks', JSON.stringify(valueData));
    } catch (e) {
      console.warn(e);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.getItem('decks');
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    setData();
    saveData();
  }, []);
  console.warn('valueAsync', valueData);

  return <Provider value={valueData}>{children}</Provider>;
};

export {store, StateProvider};
