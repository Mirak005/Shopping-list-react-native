import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {v4 as uuidv4} from 'uuid';
import AddItem from './components/AddItem';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('items', jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (key, setter) => {
  try {
    const v = await AsyncStorage.getItem(key);
    setter(JSON.parse(v) || []);
  } catch (e) {
    // error reading value
  }
};

const App = () => {
  const [items, setItems] = useState([
    // {id: uuidv4(), text: 'Milk'},
    // {id: uuidv4(), text: 'Water'},
    // {id: uuidv4(), text: 'Bread'},
    // {id: uuidv4(), text: 'Candys'},
  ]);

  useEffect(() => {
    getData('items', setItems);
  }, []);

  const handleRemove = (id) =>
    setItems((prevS) => {
      const newS = prevS.filter((item) => item.id !== id);
      storeData(newS);
      return newS;
    });
  const addItem = (text) => {
    if (!text.trim()) {
      return Alert.alert('Error', 'Please enter an Item', [{text: 'Ok'}]);
    }
    setItems((prevItem) => {
      const newState = [...prevItem, {text, id: uuidv4()}];
      storeData(newState);
      return newState;
    });
  };
  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddItem addItem={addItem} />
      {Array.isArray(items) && items.length !== 0 ? (
        <FlatList
          data={items}
          renderItem={({item}) => (
            <ListItem handleRemove={handleRemove} item={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.noItems}>
          <Text style={styles.text}>No Items</Text>
          <Icon name="times-circle-o" size={25} color="rgba(0,0,0,0.3)" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    margin: 10,
    color: 'rgba(0,0,0,0.5)',
  },
  notFoundIcon: {
    color: 'rgba(0,0,0,0.5)',
  },
  noItems: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
