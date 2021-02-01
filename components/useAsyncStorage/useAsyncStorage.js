import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (value) => {
  const [items, setItems] = useState(value);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('items', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key, setter, callback) => {
    try {
      const v = await AsyncStorage.getItem(key);
      setter(JSON.parse(v) || []);
      setTimeout(() => callback(), 1000);
    } catch (e) {
      // error reading value
    }
  };

  return [items, setItems, getData, storeData];
};
