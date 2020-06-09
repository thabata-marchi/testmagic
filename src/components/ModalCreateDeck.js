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
      <View style={styles.modalCentered}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.close} title="Sair" onPress={sair}>
            <Icon name="close" style={styles.play} />
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

          <FlatList
            data={cardSelect}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({item}) => (
              <View style={styles.cards}>
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    navigation.navigate('InfoCard', {
                      cardmagic: item,
                    });
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
    fontSize: 32,
    marginRight: 5,
    lineHeight: 38,
  },

  textStartGo: {
    color: '#FFFFFF',
    fontSize: 25,
    lineHeight: 33,
    textAlign: 'center',
    margin: 10,
  },

  btnTextStartGo: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 33,
    textAlign: 'center',
  },

  cards: {
    margin: 10,
  },
  imgCard: {
    width: 160,
    height: 220,
  },
  cardSelected: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  modalCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110,
    paddingBottom: 30,
  },

  modal: {
    flex: 1,
    backgroundColor: '#392a42',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  close: {
    fontSize: 20,
    alignItems: 'flex-end',
    marginRight: -20,
    marginTop: -10,
  },

  play: {
    color: '#fff',
    paddingLeft: 14,
    paddingTop: 14,
    fontSize: 32,
  },
});

export default ModalCreateDeck;
