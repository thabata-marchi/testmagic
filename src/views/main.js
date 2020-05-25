/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {store} from '../store';

// Como salvar mais de um valor dentro do Store ???
// Como fazer um LOOP para adicionar várias cartas ???

const Main = ({navigation}) => {
  const globalState = useContext(store);
  const {deckname, cards} = globalState;

  const setData = async () => {
    try {
      const jsonValue = JSON.stringify(globalState);
      await AsyncStorage.setItem('decks', jsonValue);
    } catch (e) {
      console.warn(e);
    }
  };

  const saveData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('decks');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    setData();
    saveData();
  }, []);

  console.warn('globalState', globalState);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {deckname && cards !== null ? (
          <TouchableOpacity onPress={() => navigation.navigate('ListDeck')}>
            <Text style={styles.h1}>{deckname}</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.h1}>Meus Decks</Text>
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
