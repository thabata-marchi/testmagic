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
import SearchCards from './SearchCards';
import modal from '../assets/modal';
import cards from '../assets/cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../store';

const ModalDeck = ({
  navigation,
  itensDecks,
  visible,
  setVisible,
  decknameEdit,
  setDecknameEdit,
}) => {
  const globalState = useContext(store);
  const {decks} = globalState;

  const [deckRemove, setDeckRemove] = useState(false);
  const [cardsRemove, setCardsRemove] = useState(false);
  const [addCards, setAddCards] = useState(false);
  const [cardSelect, setCardSelect] = useState([]);
  const [deckname, setDeckname] = useState('');
  const [saveEditDeck, setSaveEditDeck] = useState(false);

  const sair = () => {
    setCardsRemove(false);
    setDeckRemove(false);
    setCardSelect([]);
    setAddCards(false);
    setVisible(false);
    setSaveEditDeck(false);
  };

  const removeDeck = () => {
    decks.splice(decks.indexOf(itensDecks), 1);
    setDeckRemove(true);
  };

  const renameDeck = () => {
    decks.indexOf(itensDecks) >= 0 && saveEditDeck
      ? (setDecknameEdit(deckname),
        decks.splice(decks.indexOf(itensDecks), 1, {
          deckname: deckname,
          cards: itensDecks.cards,
        }))
      : console.warn('Item não existe no Array ou já foi removido!');
  };

  const saveEdit = () => {
    setCardsRemove(false);
    setSaveEditDeck(true);
  };

  const removeCard = (item) => {
    itensDecks.cards.indexOf(item) >= 0 && saveEditDeck
      ? itensDecks.cards.splice(itensDecks.cards.indexOf(item), 1)
      : console.warn('Item não existe no Array ou já foi removido!');
  };

  const editDeck = () => {
    setCardsRemove(true);
  };

  const addMoreCards = () => {
    setCardSelect([]);
    setAddCards(true);
  };

  const save = () => {
    Array.prototype.push.apply(itensDecks.cards, cardSelect);
    setAddCards(false);
  };

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={modal.modalCentered}>
        <View style={modal.modal}>
          <TouchableOpacity style={modal.close} title="Sair" onPress={sair}>
            <Icon name="close" style={modal.iconClose} />
          </TouchableOpacity>

          {!deckRemove ? (
            <>
              {!cardsRemove ? (
                <Text style={styles.textModal}>Deck de {decknameEdit}</Text>
              ) : (
                <View style={styles.boxEdit}>
                  <TextInput
                    style={styles.textModal}
                    placeholder={`Deck de ${itensDecks.deckname}`}
                    placeholderTextColor="#fff"
                    maxLength={20}
                    onChangeText={(e) => setDeckname(e)}
                    onBlur={renameDeck}
                  />
                  <Icon name="edit" style={styles.editName} />
                </View>
              )}

              <View style={styles.boxEdit}>
                {cardsRemove && !addCards ? (
                  <>
                    <TouchableOpacity
                      style={styles.btnRemove}
                      onPress={() => addMoreCards()}>
                      <Text style={styles.textRemove}>+ Cards</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.save}
                      title="Sair"
                      onPress={saveEdit}>
                      <Text style={styles.textSave}>Save edit</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.btnRemove}
                    onPress={() => editDeck()}>
                    <Text style={styles.textRemove}>Edit Deck</Text>
                  </TouchableOpacity>
                )}

                {addCards ? (
                  <TouchableOpacity
                    style={styles.save}
                    title="Sair"
                    onPress={save}>
                    <Text style={styles.textSave}>Save cards</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnRemove}
                    onPress={() => removeDeck()}>
                    <Text style={styles.textRemove}>Remove Deck</Text>
                  </TouchableOpacity>
                )}
              </View>

              {!addCards ? (
                <View style={styles.cardSelected}>
                  {decks.length > 0 &&
                  visible &&
                  itensDecks.cards.length > 0 ? (
                    <FlatList
                      data={itensDecks.cards}
                      keyExtractor={(item) => item.id}
                      numColumns={2}
                      renderItem={({item}) => (
                        <View style={cards.cards}>
                          <TouchableOpacity>
                            <Image
                              style={cards.imgCard}
                              source={{uri: item.image_uris.normal}}
                            />
                          </TouchableOpacity>

                          {cardsRemove && !addCards ? (
                            <TouchableOpacity
                              style={styles.buttonEditCard}
                              onPress={() => removeCard(item)}>
                              <Text style={styles.textButtonEditCard}>
                                remove card
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
              ) : (
                <View style={styles.boxSearch}>
                  <SearchCards
                    cardSelect={cardSelect}
                    setCardSelect={setCardSelect}
                    navigation={navigation}
                    sair={sair}
                  />
                </View>
              )}
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
  editDeck: {
    color: '#fff',
    paddingLeft: 6,
    fontSize: 25,
  },

  textModal: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 28,
    marginTop: 10,
    marginBottom: 20,
  },

  cardSelected: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 160,
  },

  btnRemove: {
    alignItems: 'center',
    backgroundColor: '#000',
    margin: 2,
    borderRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  textRemove: {
    fontSize: 16,
    padding: 9,
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
    textAlign: 'center',
  },

  buttonEditCard: {
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#5e4f67',
    margin: 2,
    borderRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    fontSize: 22,
    marginLeft: 5,
    paddingTop: 13,
  },

  save: {
    alignItems: 'center',
    backgroundColor: '#5e4f67',
    margin: 2,
    borderRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  textSave: {
    fontSize: 16,
    padding: 9,
    color: '#FFFFFF',
  },
});

export default ModalDeck;
