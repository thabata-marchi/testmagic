import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListDecks = ({navigation, route}) => {
  const {myDeck} = route.params;

  const navigateSaveInfo = () => {
    navigation.navigate('RegisterDeck', {
      myDeck: myDeck,
    });
  };

  console.warn('myDeck', myDeck);
  const [listDeck, setListDeck] = useState([]);

  useEffect(() => {
    setListDeck(JSON.parse(myDeck));
  }, [myDeck]);

  console.warn('listDeck', listDeck);
  const renderDecks = ({item, index}) => (
    <View style={styles.cards} key={index}>
      <Text style={styles.textDeck}>
        Deck {item.decks.id}: {item.decks.deckname}
      </Text>
      <FlatList
        data={item.decks.cards}
        keyExtractor={(i) => i}
        numColumns={1}
        renderItem={() => (
          <Text style={styles.textDeck}>{item.decks.cards}</Text>
        )}
      />
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.h1}>Meus Decks</Text>
        <FlatList
          data={listDeck}
          keyExtractor={(item) => item}
          numColumns={1}
          renderItem={renderDecks}
        />
        <Text style={styles.textDeck}>{listDeck.deckname}</Text>
        <TouchableOpacity
          style={styles.btnPlay}
          onPress={() => {
            navigateSaveInfo();
          }}>
          <Icon name="add" style={styles.play} />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default ListDecks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d1c25',
  },
  h1: {
    fontSize: 30,
    margin: 20,
    color: '#FFF',
    fontFamily: 'Helvetica Neue',
  },
  textDeck: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 30,
    textAlign: 'center',
  },
  btnPlay: {
    backgroundColor: '#5e4f67',
    borderRadius: 50,
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  play: {
    color: '#fff',
    paddingLeft: 14,
    paddingTop: 14,
    fontSize: 32,
  },
});
