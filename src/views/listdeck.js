import React, {useContext} from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {store} from '../store';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Deck = ({navigation}) => {
  const globalState = useContext(store);
  const {deckname, cards} = globalState;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textDeck}>Deck {deckname}</Text>
      <Text style={styles.textDeck}>{cards}</Text>

      <TouchableOpacity
        style={styles.btnPlay}
        onPress={() => navigation.navigate('Main')}>
        <Icon name="forward" style={styles.play} />
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
  btnPlay: {
    backgroundColor: '#5e4f67',
    borderRadius: 50,
    width: 60,
    height: 60,
    marginTop: 20,
  },
  play: {
    color: '#fff',
    paddingLeft: 14,
    paddingTop: 14,
    fontSize: 32,
  },
});

export default Deck;
