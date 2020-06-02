import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  ScrollView,
} from 'react-native';

const Deck = ({navigation, route}) => {
  const {cardsdeck, deckname} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.textDeck}>
          Deck {deckname} criado com sucesso! Veja as cartas de {deckname}{' '}
          abaixo:
        </Text>
        {cardsdeck.length > 0 ? (
          <View style={styles.cardSelected}>
            <FlatList
              data={cardsdeck}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({item, index}) => (
                <View style={styles.cards}>
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('InfoCard', {cardmagic: item});
                    }}>
                    <Image
                      style={styles.imgCard}
                      source={{uri: item.image_uris.normal}}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.btnPlay}
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <Text style={styles.textDeck}>Voltar para os meus myDecks!</Text>
        </TouchableOpacity>
      </ScrollView>
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
    fontSize: 20,
    marginTop: 30,
    textAlign: 'center',
  },
  cardSelected: {
    justifyContent: 'flex-end',
    alignItems: 'center',
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

export default Deck;
