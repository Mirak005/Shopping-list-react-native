import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { v4 as uuidv4 } from 'uuid';
import AddItem from './components/AddItem';
import Header from './components/Header';
import ListItem from './components/ListItem';
import useAsyncStorage from './components/useAsyncStorage/useAsyncStorage';
import CodePush from 'react-native-code-push';

const App = () => {
  const [items, setItems, getData, storeData] = useAsyncStorage([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData('items', setItems, () => setLoading(false));
  }, []);

  const handleRemove = (id) =>
    setItems((prevS) => {
      const newS = prevS.filter((item) => item.id !== id);
      storeData(newS);
      return newS;
    });
  const addItem = (text) => {
    if (!text.trim()) {
      return Alert.alert('Error', 'Please enter an Item', [{ text: 'Ok' }]);
    }
    setItems((prevItem) => {
      const newState = [...prevItem, { text, id: uuidv4() }];
      storeData(newState);
      return newState;
    });
  };

  const editItem = (text, id) => {
    if (!text.trim()) {
      return Alert.alert('Error', 'Please enter an Item', [{ text: 'Ok' }]);
    }
    setItems((prevState) => {
      const newState = prevState.map((item) =>
        item.id === id ? { ...item, text } : item,
      );
      storeData(newState);
      return newState;
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Shopping List v2" />
      <AddItem addItem={addItem} />
      {loading ? (
        <ActivityIndicator size="large" color="darkslateblue" />
      ) : Array.isArray(items) && items.length !== 0 ? (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <ListItem
              handleRemove={handleRemove}
              editItem={editItem}
              item={item}
            />
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

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME };

export default CodePush(codePushOptions)(App);
