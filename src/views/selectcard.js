import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
  FlatList,
  Modal,
} from 'react-native';
import SearchCards from '../components/SearchCards';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {store} from '../store';

const SelectCard = ({navigation, route}) => {
  const {deckname} = route.params;

  const [cardSelect, setCardSelect] = useState([]);

  const globalState = useContext(store);
  const {addDeck} = globalState;
  const [modalVisible, setModalVisible] = useState(false);

  const entrar = () => {
    setModalVisible(true);
  };

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
    <SafeAreaView style={styles.container}>
      <SearchCards cardSelect={cardSelect} setCardSelect={setCardSelect} />

      {cardSelect.length > 0 ? (
        <>
          <View style={styles.cardSelected}>
            <TouchableOpacity style={styles.btnStartGo} onPress={entrar}>
              <Text style={styles.btnTextStartGo}>Continue</Text>
              <Icon name="chevron-right" style={styles.startGo} />
            </TouchableOpacity>
          </View>

          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.modalCentered}>
              <View style={styles.modal}>
                <TouchableOpacity
                  style={styles.close}
                  title="Sair"
                  onPress={sair}>
                  <Icon name="close" style={styles.play} />
                </TouchableOpacity>
                <Text style={styles.textStartGo}>
                  Confirma a criação do DECK de {deckname}?
                </Text>
                <View style={styles.cardMessage}>
                  <TouchableOpacity
                    style={styles.btnStartGo}
                    onPress={goToHome}>
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
        </>
      ) : null}
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
  h1: {
    fontSize: 30,
    margin: 30,
    color: '#FFF',
  },
  search: {
    flexDirection: 'row',
  },
  cardsBox: {
    height: 530,
    padding: 5,
    borderRadius: 8,
    marginBottom: 20,
  },
  searchCards: {
    borderWidth: 2,
    borderColor: '#5e4f67',
    padding: 20,
    marginTop: 40,
    marginBottom: 20,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#242031',
    color: '#D7D7D7',
    fontSize: 20,
    textTransform: 'uppercase',
    width: 300,
    textAlign: 'center',
    opacity: 0.5,
  },
  btnArrow: {
    backgroundColor: '#5e4f67',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 68,
    height: 68,
    marginTop: 40,
    marginBottom: 10,
  },
  arrow: {
    color: '#fff',
    paddingLeft: 15,
    paddingTop: 16,
    fontSize: 38,
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

  textCardsH1: {
    fontSize: 19,
    marginBottom: 10,
    color: '#FFF',
    fontWeight: '500',
  },
  listCardsSelected: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  textCards: {
    color: '#FFF',
    fontSize: 15,
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

  textModal: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 5,
  },
  play: {
    color: '#fff',
    paddingLeft: 14,
    paddingTop: 14,
    fontSize: 32,
  },
});

export default SelectCard;
