import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useDataApi from '../../src/services/useDataApi';

const SelectCard = ({navigation, route}) => {
  const {deckname} = route.params;
  const data = useDataApi();

  // O Cards serve para mostrar em lista todas as cartas
  const [cards, setCards] = useState([]);

  const searchCards = (value) => {
    const cardsFilter = data.filter(({name}) => name.includes(value));
    setCards(cardsFilter);
  };

  const [cardSelect, setCardSelect] = useState([]);

  // Salva a carta selecionada em um state
  // item quando clicar e adicionar a todo este state.

  const saveSelect = (item) => {
    const card = item.name;
    setCardSelect([card, ...cardSelect]);
  };

  const renderItem = ({item, index}) => (
    <View style={styles.cards} key={index}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('InfoCard', {cardmagic: item});
        }}>
        <Image style={styles.imgCard} source={{uri: item.image_uris.normal}} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => saveSelect(item)}>
        <Text style={styles.textAdd}>adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchCards}
        placeholder={'Escolha as cartas'}
        placeholderTextColor="#fff"
        onChangeText={(value) => searchCards(value)}
      />
      <TouchableOpacity
        style={styles.btnArrow}
        onPress={() => {
          navigation.navigate('Deck', {deckname: deckname, cards: cardSelect});
        }}>
        <Icon name="chevron-right" style={styles.arrow} />
      </TouchableOpacity>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
      />
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
  h1: {
    fontSize: 30,
    margin: 30,
    color: '#FFF',
  },
  searchCards: {
    borderWidth: 2,
    borderColor: '#5e4f67',
    padding: 20,
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#242031',
    color: '#D7D7D7',
    fontSize: 20,
    textTransform: 'uppercase',
    width: 300,
    textAlign: 'center',
    opacity: 0.5,
  },
  btnArrow: {
    backgroundColor: '#5e4f67',
    borderRadius: 50,
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  arrow: {
    color: '#fff',
    paddingLeft: 15,
    paddingTop: 16,
    fontSize: 32,
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
  cards: {
    margin: 10,
  },
  imgCard: {
    width: 160,
    height: 220,
  },
});

export default SelectCard;
