import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  View,
} from 'react-native';

const InfoCard = ({navigation, route}) => {
  const {cardmagic} = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: cardmagic.name,
    });
  }, [cardmagic.name, navigation]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.info}>
            <Image
              style={styles.imgCard}
              source={{uri: cardmagic.image_uris.large}}
            />
            <Text style={styles.h1}>{cardmagic.name}</Text>
            <Text style={styles.h2}>{cardmagic.type_line}</Text>
            <Text style={styles.description}>{cardmagic.oracle_text}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ececec',
  },
  imgCard: {
    width: 250,
    height: 360,
  },
  info: {
    margin: 20,
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  h1: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  h2: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
});

export default InfoCard;
