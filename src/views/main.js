import React, {useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../store';

const Main = ({navigation}) => {
  const globalState = useContext(store);
  const {decks} = globalState;

  const goToRegisterDeck = () => {
    navigation.navigate('RegisterDeck');
  };

  const renderItem = ({item}) => {
    return (
      <View key={item.index} style={styles.deckLink}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ListDeck', {mydeck: item});
          }}>
          <Text style={styles.textDeckLink}>{item.deckname}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.addDecks}>
          <TouchableOpacity style={styles.btnPlay} onPress={goToRegisterDeck}>
            <Icon name="add" style={styles.play} />
          </TouchableOpacity>
        </View>
        <View style={styles.boxDecks}>
          <Text style={styles.h1}>Meus Decks</Text>
          {decks.length > 0 ? (
            <>
              <Text style={styles.textDecks}>
                Clique para ver as cartas de cada DECK:
              </Text>
              <FlatList
                data={decks}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={renderItem}
              />
            </>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1c25',
  },
  addDecks: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  h1: {
    fontSize: 30,
    margin: 20,
    color: '#FFF',
    fontFamily: 'Helvetica Neue',
  },
  btnPlay: {
    backgroundColor: '#5e4f67',
    borderRadius: 50,
    width: 60,
    height: 60,
    marginRight: 40,
    marginTop: 30,
  },
  play: {
    color: '#fff',
    paddingLeft: 14,
    paddingTop: 14,
    fontSize: 32,
  },
  boxDecks: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textDecks: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 20,
  },
  deckLink: {
    backgroundColor: '#5e4f67',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  textDeckLink: {
    color: '#fff',
    fontSize: 16,
  },
});
