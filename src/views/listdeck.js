import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import {store} from '../store';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListDeck = ({navigation, route}) => {
  const globalState = useContext(store);
  const {decks} = globalState;
  const {mydeck} = route.params;
  console.log('LISTDECK, decks:', decks);
  console.log('mydeck', mydeck);

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textDeck}>Deck de {mydeck.deckname}</Text>

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
      <View style={styles.boxGoTo}>
        <Text style={styles.textGoTo}>Voltar para Home</Text>
        <TouchableOpacity
          style={styles.btnPlay}
          onPress={() => navigation.navigate('Main')}>
          <Icon name="forward" style={styles.play} />
        </TouchableOpacity>
      </View>
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

  textDeck: {
    color: '#FFF',
    fontSize: 25,
    marginBottom: 20,
    marginTop: 35,
    textAlign: 'center',
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
});

export default ListDeck;
