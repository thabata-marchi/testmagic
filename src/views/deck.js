import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Deck = ({route}) => {
  const {deckname, cards} = route.params;

  const [arrDeck, setArrDeck] = useState([]);

  useEffect(() => {
    let deckSum = JSON.stringify([{decks: {deckname: deckname, cards: cards}}]);
    deckSum = JSON.parse(deckSum);
    setArrDeck(deckSum);
  }, [deckname, cards]);

  console.log('arrDeck', arrDeck);
  console.log('arrDeck', arrDeck.length);

  const saveItem = (item) => {
    console.warn(item);
  };

  const renderDecks = ({item, index}) => {
    <View style={styles.cards} key={index}>
      <Text style={styles.textDeck}>TESTE {item.decks.deckname}</Text>

      <TouchableOpacity style={styles.buttonAdd} onPress={() => saveItem(item)}>
        <Text style={styles.textAdd}>adicionar</Text>
      </TouchableOpacity>
    </View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textDeck}>TESTE</Text>
      <FlatList
        data={arrDeck}
        keyExtractor={(item) => item}
        numColumns={1}
        renderItem={renderDecks}
      />
      <Text style={styles.textDeck}>{arrDeck.deckname}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d1c25',
  },

  textDeck: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 30,
  },

  buttonAdd: {
    alignItems: 'center',
    marginTop: 5,
  },
  textAdd: {
    fontSize: 18,
    padding: 5,
    color: '#FFFFFF',
  },
});

export default Deck;
