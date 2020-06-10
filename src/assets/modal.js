import {StyleSheet} from 'react-native';

const modal = StyleSheet.create({
  modalCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#392a42',
    padding: 20,
    paddingTop: 30,
  },

  modal: {
    flex: 1,
    width: '100%',
    paddingBottom: 40,
  },

  close: {
    fontSize: 20,
    alignItems: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },

  iconClose: {
    color: '#fff',
    paddingLeft: 14,
    paddingTop: 14,
    fontSize: 32,
  },
});

export default modal;
