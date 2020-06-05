import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../store';

const Main = ({navigation}) => {
  const globalState = useContext(store);
  const {decks} = globalState;

  const [isDeck, setIsDeck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deckVisible, setDeckVisible] = useState([]);

  useEffect(() => {
    decks.length > 0 ? setIsDeck(true) : setIsDeck(false);
  }, [decks]);

  // se clicar em - ou excluir deck habilita um x nos botões e clica neles

  const goToRegisterDeck = () => {
    navigation.navigate('RegisterDeck');
  };

  const entrar = (item) => {
    console.warn(item.deckname);
    setModalVisible(true);
    setDeckVisible(item);
  };

  const sair = () => {
    setModalVisible(false);
  };

  const renderItem = ({item}) => {
    console.log(item.deckname);
    return (
      <View key={item.index} style={styles.deckLink}>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => entrar(item)}>
          <Text style={styles.textDeckLink}>{item.deckname}</Text>
          <Icon name="edit" style={styles.editDeck} />
        </TouchableOpacity>
      </View>
    );
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
                renderItem={renderItem}
              />
            </>
          ) : null}
        </View>
        <Modal transparent={true} animationType="slide" visible={modalVisible}>
          <View style={styles.modalCentered}>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.close}
                title="Sair"
                onPress={sair}>
                <Icon name="close" style={styles.play} />
              </TouchableOpacity>

              <Text style={styles.textModal}>
                Deck de {deckVisible.deckname}
              </Text>
              <View style={styles.cardSelected}>
                {decks.length > 0 &&
                modalVisible &&
                deckVisible.cards.length > 0 ? (
                  <FlatList
                    data={deckVisible.cards}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({item, index}) => (
                      <View style={styles.cards} key={index}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('InfoCard', {cardmagic: item});
                          }}>
                          <Image
                            style={styles.imgCard}
                            source={{uri: item.image_uris.normal}}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                ) : (
                  <Text>Este Deck não possui cartas</Text>
                )}
              </View>
            </View>
          </View>
        </Modal>
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

  modalCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110,
    paddingBottom: 30,
  },

  modal: {
    flex: 1,
    backgroundColor: '#5e4f67',
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
    marginBottom: 30,
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
});
