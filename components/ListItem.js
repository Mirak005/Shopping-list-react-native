import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ListItem = ({ item, handleRemove, editItem }) => {
  const [isOpen, setOpen] = useState(false);
  const [newText, setNewText] = useState(item.text);

  useEffect(() => {
    setNewText(item.text);
  }, [isOpen]);

  return (
    <TouchableOpacity style={styles.listItem} onPress={() => setOpen(!isOpen)}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.text}</Text>
        <Icon
          onPress={() => handleRemove(item.id)}
          name="remove"
          size={30}
          color="firebrick"
        />
      </View>

      <Modal transparent={true} animationType="fade" visible={isOpen}>
        <View style={styles.modalContainer}>
          <Text
            style={{
              textAlignVertical: 'top',
              fontSize: 30,
            }}>
            EDIT ITEM
          </Text>
          <TextInput
            onChangeText={(text) => setNewText(text)}
            value={newText}
            placeholder="Edit item ..."
            style={styles.input}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{ ...styles.btn, ...styles.primary }}
              onPress={() => {
                editItem(newText, item.id);
                setNewText('');
                setOpen(false);
              }}>
              <Text style={styles.text}>
                <Icon size={20} name="pencil" /> Confirm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.btn, ...styles.danger }}
              onPress={() => {
                setOpen(false);
              }}>
              <Text style={styles.text}>
                <Icon
                  size={20}
                  name="window-close"
                  style={{ color: 'white' }}
                />{' '}
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
  },
  input: {
    height: 60,
    width: '80%',
    padding: 8,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: 'darkslateblue',
    margin: 5,
  },
  btn: {
    padding: 9,
    margin: 5,
    alignItems: 'center',
    width: '40%',
  },
  danger: {
    backgroundColor: '#ca0b00',
  },
  primary: {
    backgroundColor: '#c2bad8',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ListItem;
