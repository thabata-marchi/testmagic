import {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useReposData = ({id, deckname, cards}) => {
  useEffect(() => {
    setData();
    saveData();
  }, []);

  const setData = async (value) => {
    try {
      const myDeck = JSON.stringify([
        {decks: {id: id, deckname: deckname, cards: cards}},
      ]);
      await AsyncStorage.setItem('myDeck', myDeck);
    } catch (e) {
      console.warn(e);
    }
  };

  const saveData = async () => {
    try {
      const value = await AsyncStorage.getItem('myDeck');
      if (value !== null) {
        console.warn('value', value);
      }
    } catch (e) {
      console.warn(e);
    }
  };
};

export default useReposData;
