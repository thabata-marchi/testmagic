import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import buttons from '../assets/buttons';

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
        <View style={styles.boxDecks}>
          <View style={styles.addDecks}>
            <Text style={styles.h1}>Meus Decks</Text>
            <TouchableOpacity
              style={buttons.btnIcon}
              onPress={goToRegisterDeck}>
              <Icon name="add" style={buttons.icon} />
            </TouchableOpacity>
          </View>

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
          setDecknameEdit={setDecknameEdit}
        />
      </SafeAreaView>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1d1c25',
    padding: 10,
  },
  addDecks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  h1: {
    fontSize: 30,
    margin: 10,
    color: '#FFF',
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
  },
  editDeck: {
    color: '#fff',
    paddingLeft: 6,
    fontSize: 25,
  },
  boxDecks: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textDecks: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
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
