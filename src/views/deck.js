import React, {useContext} from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {store} from '../store';

const Deck = ({navigation}) => {
  const globalState = useContext(store);
  const {decks} = globalState;
  console.log('DECKS FINAL, decks:', decks);
  console.warn('globalState:', globalState);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textDeck}>Deck TESTE criado com sucesso!</Text>
      <Text style={styles.textDeck}>TESTE2</Text>
      <TouchableOpacity
        style={styles.btnPlay}
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <Text style={styles.textDeck}>Voltar para os meus myDecks!</Text>
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
