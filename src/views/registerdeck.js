import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import buttons from '../assets/buttons';

const RegisterDeck = ({navigation}) => {
  const [nameDeck, setNameDeck] = useState('');

  const handleAddDeck = (e) => {
    setNameDeck(e);
  };

  const goSelectCard = () => {
    navigation.navigate('SelectCard', {deckname: nameDeck});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={buttons.input}
          placeholder={'Qual o nome do seu deck?'}
          placeholderTextColor="#fff"
          maxLength={20}
          onChangeText={handleAddDeck}
        />
        <TouchableOpacity style={buttons.btnIcon} onPress={goSelectCard}>
          <Icon name="chevron-right" style={buttons.icon} />
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
  search: {
    flexDirection: 'row',
    alignContent: 'center',
    width: '90%',
  },
});

export default RegisterDeck;
