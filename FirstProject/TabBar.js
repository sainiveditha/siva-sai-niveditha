import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
const {height, width} = Dimensions.get('window');
import Toast from './Toast.js';
export default function TabBar(props) {
  const data = [
    {name: 'tab1', id: 1},
    {name: 'tab2', id: 2},
    {name: 'tab3', id: 3},
    {name: 'tab4', id: 4},
    {name: 'tab5', id: 5},
    {name: 'tab6', id: 6},
  ];
  const [tabs, setTabs] = useState(data);
  const [activeTab, setActiveTab] = useState(
    tabs.length > 0 ? tabs[0].id : null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTab, setNewTab] = useState('');
  const [tabName, setTabName] = useState(tabs.length > 0 ? tabs[0].name : null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  function handleClick({id, item, index}) {
    setTabName(item);
    setActiveTab(id);
    setActiveTabIndex(index);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  function openModal() {
    setIsModalVisible(true);
  }

  function addItem() {
    setTabs(prevItems => [
      ...prevItems,
      {
        name: newTab,
        id: tabs.length + 1,
      },
    ]);
    Toast.show('New Tab added successfully');
    closeModal();
    setNewTab();
  }

  function deleteTab({item, id, index}) {
    const items = tabs.filter(
      deletedTab => deletedTab.id !== id && deletedTab.name !== item,
    );
    setTabs(items);
    setTabName(items.length > 0 ? items[0].name : null);
    setActiveTab(items.length > 0 ? items[0].id : null);
    setActiveTabIndex(index);
    Toast.show(`${item} Tab deleted successfully`);
  }

  function renderModal() {
    return (
      <Modal
        backdropOpacity={0}
        animationIn="zoomInDown"
        animationOut="zoomOutDown"
        transparent={true}
        onBackdropPress={() => closeModal()}
        onSwipeComplete={() => closeModal()}
        isVisible={isModalVisible}
        style={styles.modal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            style={styles.input}
            onChangeText={newTab =>
              setNewTab(newTab.length > 0 ? newTab : null)
            }
            placeholder="Enter Tab Name ..."
          />
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              width: 100,
            }}>
            <Button
              title="add"
              onPress={() =>
                newTab ? addItem() : Toast.show('Please Enter Tab Name')
              }
            />
          </View>
        </ScrollView>
      </Modal>
    );
  }

  function renderTab({item, id, index}) {
    return (
      <View style={{flexDirection: 'row'}} key={index}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              borderBottomColor:
                activeTab === id && tabName === item ? 'red' : 'gray',
              borderBottomWidth: 1,
            },
          ]}
          onPress={() => handleClick({id, item, index})}>
          <Text
            style={{
              color: activeTab === id && tabName === item ? 'red' : 'gray',
            }}>
            {item}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTab({item, id, index})}>
          {activeTab === id && tabName === item ? (
            <Image
              source={require('/home/niveditha/github/FirstProject/android/app/assets/cross.png')}
              style={{
                width: 10,
                height: 10,
                marginTop: 20,
              }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
  function renderAddButton() {
    return (
      <TouchableOpacity
        onPress={() =>
          tabs.length === 16
            ? Toast.show("You can't add more than 10 Tabs")
            : openModal()
        }>
        <Image
          source={require('/home/niveditha/github/FirstProject/android/app/assets/plus.png')}
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      {renderModal()}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {activeTabIndex !== 0 && tabs.length > 3 ? (
          <Image
            source={require('/home/niveditha/github/FirstProject/android/app/assets/Chevron.png')}
            style={{width: 15, height: 15, transform: [{rotate: '180deg'}]}}
          />
        ) : null}
        <View style={{flex: 1}}>
          {tabs.length > 0 ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {tabs.map((tab, key) => {
                return renderTab({item: tab.name, id: tab.id, index: key});
              })}
            </ScrollView>
          ) : (
            <Text style={styles.textStyle}>No tabs</Text>
          )}
        </View>
        {activeTabIndex !== tabs.length - 1 && tabs.length > 3 ? (
          <Image
            source={require('/home/niveditha/github/FirstProject/android/app/assets/Chevron.png')}
            style={{width: 15, height: 15}}
          />
        ) : null}
        <View
          style={{
            alignItems: 'center',
            margin: 20,
          }}>
          {renderAddButton()}
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {tabs.length > 0 ? (
          <Text style={styles.textStyle}>Welcome {tabName}</Text>
        ) : (
          <Text style={styles.textStyle}>All tabs are deleted</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    margin: 10,
  },
  tabsWrapper: {},
  buttonStyle: {
    flexGrow: 1,
    width: 90,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  separator: {
    backgroundColor: 'gray',
    width: 2,
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    margin: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  modal: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    width: width - 70,
    marginTop: 250,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: 'center',
    maxHeight: 230,
  },
  textStyle: {
    margin: 20,
    justifyContent: 'center',
    textAlign: 'center',
    color: 'gray',
    fontSize: 20,
  },
});
