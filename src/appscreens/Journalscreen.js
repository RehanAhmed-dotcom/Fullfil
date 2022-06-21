import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import {viewJournal} from '../lib/api';
import {useSelector, useDispatch} from 'react-redux';
import {Card} from 'native-base';
import Colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Entypo';
import PlusIcon from 'react-native-vector-icons/AntDesign';
const Journalscreen = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  useEffect(() => {
    console.log('i called', search);
    navigation.setOptions({
      headerTitle: () => {
        return (
          show && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                width: Platform.OS === 'ios' ? 250 : 130,
                backgroundColor: '#ccc',
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Search Journal"
                placeholderTextColor="grey"
                returnKeyType="done"
                value={search}
                onChangeText={text => {
                  setSearch(text);
                  searchText(text);
                }}
                style={{
                  // paddingLeft: 10,
                  // backgroundColor: 'red',
                  flex: 1,
                  height: 40,
                }}
              />
              <Icon
                name="circle-with-cross"
                size={20}
                onPress={() => {
                  setSearch('');
                  viewJournal({Auth: user.userdata.api_token}).then(res => {
                    // console.log('rs', res.data.data);
                    setJournal(res.data.data);
                    setList(res.data.data);
                  });
                }}
              />
            </View>
          )
        );
      },
      headerStyle: {
        backgroundColor: Colors.screenBgColor,
        elevation: 0,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../assets/menu_icon.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginLeft: 16,
            }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          // style={{backgroundColor: 'red'}}
          onPress={() => setShow(!show)}>
          <Image
            source={require('../assets/search.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginRight: 16,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [show, search]);
  const {userData: user} = useSelector(({USER}) => USER);
  const [journal, setJournal] = useState([]);
  // console.log('token', user.userdata.api_token);
  // console.log('useeeeeeerrrrrrr', JSON.stringify(user));
  // console.log(user.userdata.username);
  useEffect(() => {
    console.log('i called also');
    const unsubscribe = navigation.addListener('focus', () => {
      viewJournal({Auth: user.userdata.api_token}).then(res => {
        // console.log('rs', res.data.data);
        setJournal(res.data.data.reverse());
        setList(res.data.data);
      });
    });
    return unsubscribe;
  }, [navigation]);
  const searchText = e => {
    let filteredName = [];
    // if (e) {
    filteredName = journal.filter(item => {
      // console.log(item);
      return item.note.toLowerCase().includes(`${e.toLowerCase()}`);
    });
    setList(filteredName);
    // filteredName = [];
    // }
  };
  console.log('journal', journal);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingBottom: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, fontFamily: 'Poppins-SemiBold'}}>
          {user.userdata.username}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Myprofile')}>
          <Image
            source={
              user.userdata.image
                ? {uri: user.userdata.image}
                : require('../assets/placeholder.png')
            }
            style={{
              height: 30,
              borderWidth: 1.5,
              borderColor: Colors.mainBtnscolor,
              width: 30,
              borderRadius: 40,
              marginTop: Platform.OS === 'ios' ? 10 : 0,
            }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={list}
        // contentContainerStyle={{alignItems: 'center'}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('JournalDataEdit', {
                  item,
                })
              }
              style={{margin: 6, marginLeft: 20}}>
              <Card
                style={{
                  width: 155,
                  height: 200,
                  borderRadius: 10,
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                }}>
                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
                  {item.note}
                </Text>
                <Text
                  style={{
                    paddingVertical: 6,
                    color: Colors.mainBtnscolor,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                    marginTop: 5,
                  }}>
                  {item.date}
                </Text>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
      {/* <TextInput
        placeholder="Search Journal"
        placeholderTextColor="grey"
        value={search}
        onChangeText={text => {
          setSearch(text);
          // searchText(text);
        }}
        style={{
          // paddingLeft: 10,
          backgroundColor: 'red',
          flex: 1,
          height: 40,
        }}
      /> */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          paddingHorizontal: 6,
          paddingBottom: 12,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddNewJournal')}
          style={{
            height: 40,
            width: 40,
            borderRadius: 50,
            backgroundColor: Colors.mainBtnscolor,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Platform.OS === 'ios' ? 30 : 0,
            marginRight: Platform.OS === 'ios' ? 10 : 0,
          }}>
          <PlusIcon name={'plus'} size={25} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Journalscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBgColor,
    // paddingHorizontal: 16
  },
});
