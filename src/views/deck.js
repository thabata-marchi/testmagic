import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';

const Deck = ({navigation, route}) => {
  const {deckname, cards} = route.params;

  const [arrDeck, setArrDeck] = useState([]);

  useEffect(() => {
    setArrDeck([{deckname: deckname, cards: cards}]);
  }, []);

  console.warn('deckname', deckname);
  console.warn('cards', cards);
  console.warn('arrDeck', arrDeck);

  return (
    <SafeAreaView>
      <Text>Teste</Text>
    </SafeAreaView>
  );
};

export default Deck;
