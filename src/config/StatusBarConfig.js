import {StatusBar, Platform} from 'react-native';

Platform.OS === 'android'
  ? StatusBar.setBackgroundColor('#FFF')
  : StatusBar.setBarStyle('light-content');
