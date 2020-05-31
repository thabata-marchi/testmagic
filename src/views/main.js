import React, {useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../store';

const Main = ({navigation}) => {
  const globalState = useContext(store);
  const {decks} = globalState;

  console.warn('decks', decks);

  const goToRegisterDeck = () => {
    navigation.navigate('RegisterDeck');
  };

  //Object.keys(decks).map(deck => <Text>{deck}</Text>)

  // const renderItem = ({item}) => {
  //   console.warn('RenderItem', item);
  //   return (
  //     <View>
  //       <TouchableOpacity>
  //         <Text style={styles.h1}>{item}</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* <FlatList
          data={decks}
          keyExtractor={(item) => item}
          renderItem={renderItem}
        /> */}

        {Object.keys(decks).map((deck) => (
          <Text style={styles.h1}>{deck}</Text>
        ))}

        <Text style={styles.h1}>Meus Decks</Text>
        <TouchableOpacity style={styles.btnPlay} onPress={goToRegisterDeck}>
          <Icon name="add" style={styles.play} />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Main;

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
