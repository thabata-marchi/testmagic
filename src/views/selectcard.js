import React, {useState, useContext} from 'react';
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
import {store} from '../store';

const SelectCard = ({navigation, route}) => {
  const {deckname} = route.params;

  const globalState = useContext(store);
  const {addDeck} = globalState;

  const data = useDataApi();
  const [textInput, setTextInput] = useState('');
  const [cardSelect, setCardSelect] = useState([]);
  const [clicked, setClicked] = useState(false);

  // O Cards serve para mostrar em lista todas as cartas
  const [cardsAdd, setCardsAdd] = useState([]);

  const saveSelect = (item) => {
    cardSelect.indexOf(item) >= 0
      ? console.warn('Este item já foi adicionado!')
      : setCardSelect([item, ...cardSelect]);
  };

  // Remove as cartas selecionadas
  const removeSelect = (item) => {
    cardSelect.indexOf(item) >= 0
      ? cardSelect.splice(cardSelect.indexOf(item), 1)
      : console.warn('Item não existe no Array osu já foi removido!');
  };

  const goToDeck = () => {
    addDeck(deckname, cardSelect);
    navigation.navigate('Deck', {cardsdeck: cardSelect, deckname: deckname});
  };

  const searchCards = () => {
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
      <View style={styles.boxAddRemove}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => saveSelect(item)}>
          <Text style={styles.textAdd}>adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => removeSelect(item)}>
          <Text style={styles.textAdd}>remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const goSearch = () => {
    setClicked(true);
    searchCards(textInput);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchCards}
          placeholder={'Escolha as cartas'}
          placeholderTextColor="#fff"
          onChangeText={(text) => setTextInput(text)}
        />
        <TouchableOpacity style={styles.btnArrow} onPress={goSearch}>
          <Icon name="search" style={styles.arrow} />
        </TouchableOpacity>
      </View>

      {clicked !== false ? (
        <View style={styles.cardsBox}>
          <FlatList
            data={cardsAdd}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={renderItem}
          />
        </View>
      ) : null}

      {cardSelect.length > 0 ? (
        <View style={styles.cardSelected}>
          <TouchableOpacity style={styles.btnStartGo} onPress={goToDeck}>
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
  search: {
    flexDirection: 'row',
  },
  cardsBox: {
    height: 530,
    padding: 5,
    borderRadius: 8,
    marginBottom: 20,
  },
  searchCards: {
    borderWidth: 2,
    borderColor: '#5e4f67',
    padding: 20,
    marginTop: 40,
    marginBottom: 20,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
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
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 68,
    height: 68,
    marginTop: 40,
    marginBottom: 10,
  },
  arrow: {
    color: '#fff',
    paddingLeft: 15,
    paddingTop: 16,
    fontSize: 38,
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

  textStartGo: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 33,
  },

  cards: {
    margin: 10,
  },
  imgCard: {
    width: 160,
    height: 220,
  },
  cardSelected: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textCardsH1: {
    fontSize: 19,
    marginBottom: 10,
    color: '#FFF',
    fontWeight: '500',
  },
  listCardsSelected: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  textCards: {
    color: '#FFF',
    fontSize: 15,
  },
});

export default SelectCard;
