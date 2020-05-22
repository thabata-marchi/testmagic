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
import useReposData from '../components/useReposData';

const SelectCard = ({navigation, route}) => {
  const {id, deckname, cards} = route.params;
  useReposData({id: id, deckname: deckname, cards: cards});

  const data = useDataApi();
  const [textInput, setTextInput] = useState('');

  // O Cards serve para mostrar em lista todas as cartas
  const [cardsAdd, setCardsAdd] = useState([]);
  const [cardSelect, setCardSelect] = useState([]);

  // Salva a carta selecionada em um state
  // item quando clicar e adicionar a todo este state.

  const saveSelect = (item) => {
    const card = item.name;
    setCardSelect([card, ...cardSelect]);
  };

  const searchCards = (value) => {
    if (value === '') {
      //alert('Busque suas cartas!');
      return;
    }
    const cardsFilter = data.filter(({name}) => name.includes(textInput));
    textInput.length > 0 ? setCardsAdd(cardsFilter) : null;
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
        onChangeText={(text) => setTextInput(text)}
      />
      <TouchableOpacity
        style={styles.btnArrow}
        onPress={() => searchCards(textInput)}>
        <Icon name="search" style={styles.arrow} />
      </TouchableOpacity>
      {textInput.length > 0 ? (
        <FlatList
          data={cardsAdd}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderItem}
        />
      ) : null}
      {cardSelect.length > 0 ? (
        <View style={styles.cardSelected}>
          <Text style={styles.textCardsH1}>
            Você selecionou as seguintes cartas:
          </Text>
          <Text style={styles.textCards}>{cardSelect}</Text>
          <TouchableOpacity
            style={styles.btnStartGo}
            onPress={() =>
              navigation.navigate('Deck', {
                id: id,
                deckname: deckname,
                cards: cardSelect,
              })
            }>
            <Text style={styles.textStartGo}>Continue</Text>
            <Icon name="chevron-right" style={styles.startGo} />
          </TouchableOpacity>
        </View>
      ) : null}
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
  btnStartGo: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  startGo: {
    color: '#fff',
    fontSize: 32,
  },
  buttonAdd: {
    alignItems: 'center',
    marginTop: 5,
  },
  textStartGo: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 33,
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
  cardSelected: {
    margin: 30,
  },
  textCardsH1: {
    fontSize: 19,
    marginBottom: 10,
    color: '#FFF',
    fontWeight: '500',
  },
  textCards: {
    color: '#FFF',
    fontSize: 15,
  },
});

export default SelectCard;
