import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import ModalDeck from '../components/ModalDeck';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../store';

const Main = ({navigation}) => {
  const globalState = useContext(store);
  const {decks} = globalState;

  const [isDeck, setIsDeck] = useState(false);
  const [itensDecks, setItensDecks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [decknameEdit, setDecknameEdit] = useState('');

  useEffect(() => {
    decks.length > 0 ? setIsDeck(true) : setIsDeck(false);
  }, [decks]);

  const goToRegisterDeck = () => {
    navigation.navigate('RegisterDeck');
  };

  const showModal = (item) => {
    setItensDecks(item);
    setModalVisible(true);
    setDecknameEdit(item.deckname);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.addDecks}>
          <TouchableOpacity style={styles.btnPlay} onPress={goToRegisterDeck}>
            <Icon name="add" style={styles.play} />
          </TouchableOpacity>
        </View>
        <View style={styles.boxDecks}>
          <Text style={styles.h1}>Meus Decks</Text>
          {decks.length > 0 && isDeck ? (
            <>
              <Text style={styles.textDecks}>
                Clique para ver as cartas de cada DECK:
              </Text>
              <FlatList
                data={decks}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({item}) => (
                  <View key={item.index} style={styles.deckLink}>
                    <TouchableOpacity
                      style={styles.buttonAdd}
                      onPress={() => showModal(item)}>
                      <Text style={styles.textDeckLink}>{item.deckname}</Text>
                      <Icon name="edit" style={styles.editDeck} />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </>
          ) : null}
        </View>

        <ModalDeck
          navigation={navigation}
          itensDecks={itensDecks}
          visible={modalVisible}
          setVisible={setModalVisible}
          decknameEdit={decknameEdit}
        />
      </SafeAreaView>
    </>
  );
};

export default Main;

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
});
