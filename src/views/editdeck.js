import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../store';

const EditDeck = ({navigation}) => {
  const globalState = useContext(store);
  const {decks} = globalState;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Teste</Text>
      </SafeAreaView>
    </>
  );
};

export default EditDeck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1c25',
  },
  addDecks: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 30,
    margin: 20,
    color: '#FFF',
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
  },
  btnPlay: {
    backgroundColor: '#5e4f67',
    borderRadius: 50,
    width: 60,
    height: 60,
    margin: 5,
  },
  play: {
    color: '#fff',
    paddingLeft: 14,
    paddingTop: 14,
    fontSize: 32,
  },
  editDeck: {
    color: '#fff',
    paddingLeft: 6,
    fontSize: 25,
  },
  boxDecks: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textDecks: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 20,
  },
  deckLink: {
    backgroundColor: '#5e4f67',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    flexDirection: 'row',
  },
  textDeckLink: {
    color: '#fff',
    lineHeight: 27,
    fontSize: 18,
  },
  buttonAdd: {
    flexDirection: 'row',
  },

  modalCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110,
    paddingBottom: 30,
  },

  modal: {
    flex: 1,
    minWidth: '90%',
    backgroundColor: '#392a42',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  close: {
    fontSize: 20,
    alignItems: 'flex-end',
    marginRight: 10,
  },

  textModal: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 5,
  },

  cardSelected: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 120,
  },
  imgCard: {
    width: 160,
    height: 220,
    margin: 10,
  },

  btnRemove: {
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#000',
    margin: 12,
    borderRadius: 5,
  },

  textRemove: {
    fontSize: 20,
    padding: 5,
    color: '#FFFFFF',
  },

  messageRemove: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  textDeck: {
    fontSize: 25,
    color: '#FFFFFF',
  },

  buttonEditCard: {
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#5e4f67',
    margin: 2,
    borderRadius: 5,
  },
  textButtonEditCard: {
    fontSize: 16,
    padding: 5,
    color: '#FFFFFF',
  },
});
