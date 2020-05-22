import React, {useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Deck = ({navigation, route}) => {
  const {deckname, cards} = route.params;

  useEffect(() => {
    async () => {
      try {
        const myDeck = JSON.stringify([
          {decks: {deckname: deckname, cards: cards}},
        ]);
        await AsyncStorage.setItem('myDeck', myDeck);
      } catch (e) {
        console.warn(e);
      }
    };
  }, [myDeck]);

  const saveData = async () => {
    try {
      const value = await AsyncStorage.getItem('myDeck');
      if (value !== null) {
        navigation.navigate('ListDeck', {myDeck: value});
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textDeck}>Deck {deckname} criado com sucesso!</Text>
      <TouchableOpacity
        style={styles.btnPlay}
        onPress={() => {
          saveData();
        }}>
        <Text style={styles.textDeck} onPress={saveData}>
          Voltar para os meus decks!
        </Text>
      </TouchableOpacity>
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
    textAlign: 'center',
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
