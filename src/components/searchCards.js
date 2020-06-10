import React, {useState} from 'react';
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
import buttons from '../assets/buttons';

const SearchCards = ({navigation, cardSelect, setCardSelect, sair}) => {
  const data = useDataApi();
  const [textInput, setTextInput] = useState('');
  const [clicked, setClicked] = useState(false);
  const [cardsAdd, setCardsAdd] = useState([]);

  const goToInfo = (item) => {
    sair;
    navigation.navigate('InfoCard', {cardmagic: item});
  };

  const saveSelect = (item) => {
    cardSelect.indexOf(item) >= 0
      ? console.warn('Este item já foi adicionado!')
      : setCardSelect([item, ...cardSelect]);
  };

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
      <TouchableOpacity onPress={() => goToInfo(item)}>
        <Image style={styles.imgCard} source={{uri: item.image_uris.normal}} />
      </TouchableOpacity>
      <View style={styles.boxAddRemove}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => saveSelect(item)}>
          <Text style={styles.textAdd}>add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => removeSelect(item)}>
          <Text style={styles.textAdd}>remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.search}>
        <TextInput
          style={buttons.input}
          placeholder={'Escolha as cartas'}
          placeholderTextColor="#fff"
          onChangeText={(text) => setTextInput(text)}
        />
        <TouchableOpacity style={buttons.btnIcon} onPress={goSearch}>
          <Icon name="search" style={buttons.icon} />
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
    alignContent: 'center',
  },
  cardsBox: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
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
    minWidth: 55,
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
    width: 130,
    height: 180,
  },
});

export default SearchCards;
