import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../store';

const Main = ({navigation}) => {
  const globalState = useContext(store);
  console.warn(globalState);
  const {deckname, cards} = globalState;

  return (
    <>
      <SafeAreaView style={styles.container}>
        {deckname && cards === '' ? (
          // Este Deckname será um LINK que vai para o componente específico dele, ou seja, deve ser um FlatList
          <Text style={styles.h1}>{deckname}</Text>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ListDeck');
          }}>
          <Text style={styles.h1}>Meus Decks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnPlay}
          onPress={() => navigation.navigate('RegisterDeck')}>
          <Icon name="add" style={styles.play} />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d1c25',
  },
  h1: {
    fontSize: 30,
    margin: 20,
    color: '#FFF',
    fontFamily: 'Helvetica Neue',
  },
  btnPlay: {
    backgroundColor: '#5e4f67',
    borderRadius: 50,
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  play: {
    color: '#fff',
    paddingLeft: 14,
    paddingTop: 14,
    fontSize: 32,
  },
});
