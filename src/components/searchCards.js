import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useDataApi from '../hooks/useDataApi';

const SearchCards = ({navigation, cardSelect, setCardSelect}) => {
  const data = useDataApi();
  const [textInput, setTextInput] = useState('');

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

  const searchCards = () => {
    const cardsFilter = data.filter(({name}) => name.includes(textInput));
    textInput.length > 0 ? setCardsAdd(cardsFilter) : null;
  };

  const goSearch = () => {
    setClicked(true);
    searchCards(textInput);
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

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
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
  startGo: {
    color: '#fff',
    fontSize: 32,
    marginRight: 5,
    lineHeight: 38,
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
    fontSize: 25,
    lineHeight: 33,
    textAlign: 'center',
    margin: 10,
  },
  cards: {
    margin: 10,
  },
  imgCard: {
    width: 160,
    height: 220,
  },
});

export default SearchCards;
