import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const AddItem = ({addItem}) => {
  const [input, setInput] = useState('');

  return (
    <View>
      <TextInput
        onChangeText={(text) => setInput(text)}
        value={input}
        placeholder="Add an item ..."
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addItem(input);
          setInput('');
        }}>
        <Text style={styles.text}>
          <Icon size={20} name="plus" /> Add Item
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  btn: {
    padding: 9,
    margin: 5,
    backgroundColor: '#c2bad8',
    alignItems: 'center',
  },
  text: {
    color: 'darkslateblue',
    textAlign: 'center',
    fontSize: 20,
  },
});
