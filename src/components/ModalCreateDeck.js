import React, {useContext} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  FlatList,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import modal from '../assets/modal';
import cards from '../assets/cards';

import {store} from '../store';

const ModalCreateDeck = ({
  navigation,
  modalVisible,
  setModalVisible,
  deckname,
  cardSelect,
}) => {
  const globalState = useContext(store);
  const {addDeck} = globalState;

  const sair = () => {
    setModalVisible(false);
  };

  const goToHome = () => {
    addDeck(deckname, cardSelect);
    navigation.navigate('Main', {cardsdeck: cardSelect, deckname: deckname});
  };

  const goToHomeNoSave = () => {
    navigation.navigate('Main');
  };

  return (
    <Modal transparent={true} animationType="slide" visible={modalVisible}>
      <View style={modal.modalCentered}>
        <View style={modal.modal}>
          <TouchableOpacity style={modal.close} title="Sair" onPress={sair}>
            <Icon name="close" style={modal.iconClose} />
          </TouchableOpacity>
          <Text style={styles.textStartGo}>
            Confirma a criação do DECK de {deckname}?
          </Text>
          <View style={styles.cardMessage}>
            <TouchableOpacity style={styles.btnStartGo} onPress={goToHome}>
              <Text style={styles.btnTextStartGo}>SIM</Text>
              <Icon name="done" style={styles.startGo} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnStartGo}
              onPress={goToHomeNoSave}>
              <Text style={styles.btnTextStartGo}>NÃO</Text>
              <Icon name="home" style={styles.startGo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnStartGo} onPress={sair}>
              <Text style={styles.btnTextStartGo}>ALTERAR</Text>
              <Icon name="edit" style={styles.startGo} />
            </TouchableOpacity>
          </View>
          <View style={styles.cardSelected}>
            <FlatList
              data={cardSelect}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({item}) => (
                <Image
                  style={cards.imgCard}
                  source={{uri: item.image_uris.normal}}
                />
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
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

  cardMessage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStartGo: {
    backgroundColor: '#5e4f67',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    margin: 5,
  },
  startGo: {
    color: '#fff',
    fontSize: 25,
    marginLeft: 5,
  },

  textStartGo: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },

  btnTextStartGo: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },

  cardSelected: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalCreateDeck;
