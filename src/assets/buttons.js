import {StyleSheet} from 'react-native';

const buttons = StyleSheet.create({
  input: {
    flex: 1,
    marginLeft: 20,
    borderBottomWidth: 2,
    color: '#D7D7D7',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'left',
    opacity: 0.5,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  btnIcon: {
    backgroundColor: '#5e4f67',
    borderRadius: 50,
    width: 52,
    height: 52,
    marginBottom: 10,
  },
  icon: {
    color: '#fff',
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 32,
  },
});

export default buttons;
