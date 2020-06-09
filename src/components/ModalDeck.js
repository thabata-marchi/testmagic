import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../store';

const ModalDeck = ({itensDecks, visible, setVisible, decknameEdit}) => {
  const globalState = useContext(store);
  const {decks} = globalState;

  const [deckRemove, setDeckRemove] = useState(false);
  const [cardsRemove, setCardsRemove] = useState(false);

  const sair = () => {
    setVisible(false);
    setCardsRemove(false);
    setDeckRemove(false);
  };

  const removeDeck = () => {
    decks.splice(decks.indexOf(itensDecks), 1);
    setDeckRemove(true);
  };

  const renameDeck = (e) => {
    decks.indexOf(itensDecks) >= 0
      ? decks.splice(decks.indexOf(itensDecks), 1, {
          deckname: e.nativeEvent.text,
          cards: itensDecks.cards,
        })
      : console.warn('Item não existe no Array ou já foi removido!');
  };

  const removeCard = (i) => {
    itensDecks.cards.indexOf(i) >= 0
      ? itensDecks.cards.splice(itensDecks.cards.indexOf(i), 1)
      : console.warn('Item não existe no Array ou já foi removido!');
  };

  const editDeck = () => {
    setCardsRemove(true);
  };

  const addMoreCards = () => {
    console.log('Estou aqui');
  };

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalCentered}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.close} title="Sair" onPress={sair}>
            <Icon name="close" style={styles.play} />
          </TouchableOpacity>

          {!deckRemove ? (
            <>
              {!cardsRemove ? (
                <Text style={styles.textModal}>Deck de {decknameEdit}</Text>
              ) : (
                <View style={styles.boxEdit}>
                  <TextInput
                    autoFocus={true}
                    style={styles.textModal}
                    placeholder={`Deck de ${itensDecks.deckname}`}
                    placeholderTextColor="#fff"
                    maxLength={20}
                    onBlur={(e) => renameDeck(e)}
                  />
                  <Icon name="edit" style={styles.editName} />
                </View>
              )}

              <View style={styles.boxEdit}>
                {cardsRemove ? (
                  <TouchableOpacity
                    style={styles.btnRemove}
                    onPress={() => addMoreCards()}>
                    <Text style={styles.textRemove}>+ Cards</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnRemove}
                    onPress={() => editDeck()}>
                    <Text style={styles.textRemove}>Edit Deck</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.btnRemove}
                  onPress={() => removeDeck()}>
                  <Text style={styles.textRemove}>Remove Deck</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.cardSelected}>
                {decks.length > 0 && visible && itensDecks.cards.length > 0 ? (
                  <FlatList
                    data={itensDecks.cards}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({item}) => (
                      <View style={styles.cards}>
                        <TouchableOpacity>
                          <Image
                            style={styles.imgCard}
                            source={{uri: item.image_uris.normal}}
                          />
                        </TouchableOpacity>

                        {cardsRemove ? (
                          <TouchableOpacity
                            style={styles.buttonEditCard}
                            onPress={() => removeCard(item)}>
                            <Text style={styles.textButtonEditCard}>
                              remover
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    )}
                  />
                ) : (
                  <Text>Este Deck não possui cartas</Text>
                )}
              </View>
            </>
          ) : (
            <View style={styles.messageRemove}>
              <Text style={styles.textDeck}>Deck removido com sucesso!</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: 160,
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
    margin: 2,
    borderRadius: 5,
    padding: 5,
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
  boxEdit: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  editName: {
    color: '#fff',
    fontSize: 32,
    marginLeft: 5,
    lineHeight: 32,
  },
});

export default ModalDeck;
