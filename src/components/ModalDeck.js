import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../store';

const ModalDeck = ({navigation, route}) => {
  const globalState = useContext(store);
  const {decks} = globalState;
  const {mydeck} = route.params;

  const [deckRemove, setDeckRemove] = useState(false);

  const selectRemoveDeck = () => {};

  const renderItem = ({item, index}) => (
    <View style={styles.cards} key={index}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('InfoCard', {cardmagic: item});
        }}>
        <Image style={styles.imgCard} source={{uri: item.image_uris.normal}} />
      </TouchableOpacity>
    </View>
  );

  const addCards = () => {};
  const removeCards = () => {};

  // A tela tem que se apagar e mostrar uma mensagem: DECK REMOVIDO
  // NA tela MAIN, tem que escutar o DECK
  const removeDeck = () => {
    if (decks.indexOf(mydeck) >= 0) {
      decks.splice(decks.indexOf(mydeck), 1, decks.pop());
      setDeckRemove(true);
    }
  };

  console.log(decks.indexOf(mydeck));
  console.log('ModalDeck, decks:', decks);
  console.log('mydeck', mydeck);
  //addDeck(decks);
  // COMO ATUALIZAR !!!

  return (
    <Modal transparent={true} animationType="slide">
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {!deckRemove ? (
            <>
              <TouchableOpacity
                style={styles.btnPlay}
                onPress={selectRemoveDeck}>
                <Icon name="remove" style={styles.play} />
              </TouchableOpacity>

              <Text style={styles.textDeck}>Deck de {mydeck.deckname}</Text>
              <View style={styles.boxAddRemove}>
                <TouchableOpacity
                  style={styles.buttonAdd}
                  onPress={() => addCards()}>
                  <Text style={styles.textAdd}>Adicionar Cartas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonAdd}
                  onPress={() => removeCards()}>
                  <Text style={styles.textAdd}>Remover Cartas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonAdd}
                  onPress={() => removeDeck()}>
                  <Text style={styles.textAdd}>Remover Deck</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardSelected}>
                {mydeck.cards.length > 0 ? (
                  <FlatList
                    data={mydeck.cards}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={renderItem}
                  />
                ) : (
                  <Text>Este Deck não possui cartas</Text>
                )}
              </View>
            </>
          ) : (
            <Text style={styles.textDeck}>Deck removido com sucesso!</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
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
    fontSize: 25,
    marginBottom: 20,
    marginTop: 35,
    textAlign: 'center',
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

  cards: {
    margin: 10,
  },

  imgCard: {
    width: 160,
    height: 220,
  },

  boxGoTo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textGoTo: {
    color: '#FFF',
    fontSize: 22,
    marginTop: 20,
    marginRight: 5,
  },

  boxAddRemove: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonAdd: {
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#5e4f67',
    margin: 2,
    borderRadius: 5,
  },

  textAdd: {
    fontSize: 16,
    padding: 5,
    color: '#FFFFFF',
  },

  cardSelected: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ModalDeck;
