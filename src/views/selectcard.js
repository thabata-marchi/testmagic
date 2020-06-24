import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import SearchCards from '../components/SearchCards';
import ModalCreateDeck from '../components/ModalCreateDeck';

import Icon from 'react-native-vector-icons/MaterialIcons';

const SelectCard = ({navigation, route}) => {
  const {deckname} = route.params;
  const [cardSelect, setCardSelect] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const entrar = () => {
    setModalVisible(true);
  };

  const sair = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <SearchCards
          cardSelect={cardSelect}
          setCardSelect={setCardSelect}
          navigation={navigation}
          sair={sair}
        />
      </View>

      {cardSelect.length > 0 ? (
        <>
          <View style={styles.cardSelected}>
            <TouchableOpacity style={styles.btnStartGo} onPress={entrar}>
              <Text style={styles.btnTextStartGo}>Continue</Text>
              <Icon name="chevron-right" style={styles.startGo} />
            </TouchableOpacity>
          </View>

          <ModalCreateDeck
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            deckname={deckname}
            cardSelect={cardSelect}
            navigation={navigation}
          />
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
  searchBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
  },
  h1: {
    fontSize: 30,
    margin: 30,
    color: '#FFF',
  },
  search: {
    flexDirection: 'row',
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
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
  },
  startGo: {
    color: '#fff',
    fontSize: 32,
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
