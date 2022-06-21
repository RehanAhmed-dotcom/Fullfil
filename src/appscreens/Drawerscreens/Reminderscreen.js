import {Left, Right, Card, Body, Item} from 'native-base';
import React, {useEffect, useState} from 'react';
import {createAlarm} from 'react-native-simple-alarm';
import ReactNativeAN from 'react-native-alarm-notification';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  deleteafternoon,
  deletemorning,
  deleteevening,
  deletenight,
} from '../../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import AddIcon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/colors';
const Reminderscreen = ({navigation, route}) => {
  const {Morning, Afternoon, Evening, Night} = useSelector(({ALARM}) => ALARM);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: 'Reminders',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: Colors.mainBtnscolor,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: '#ECF6F4',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icon_back.png')}
            style={{height: 30, width: 30, borderRadius: 10, marginLeft: 16}}
          />
        </TouchableOpacity>
      ),
    });
    //   const {userData: user} = useSelector(({USER}) => USER);
    //   const [reminder, setreminder] = useState([]);
    //   // console.log('token', user.userdata.api_token);
    // console.log('useeeeeeerrrrrrr',JSON.stringify(user))
    // // console.log(user.userdata.username)
    //   useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //       viewJournal({Auth: user.userdata.api_token}).then(res => {
    //         console.log('rs', res.data.data);
    //         setreminder(res.data.data);
    //       });
    //     });
    //     return unsubscribe;
  }, []);
  useEffect(async () => {
    const alarms = await ReactNativeAN.getScheduledAlarms();
    console.log('sdfd', alarms);
  });
  const [Date, setDate] = useState(moment().startOf('minute').format());
  const createAlarms = async () => {
    // console.log('here');
    let newDate = Date;
    createAlarm({
      active: true,
      date: newDate,
      message: 'message',
      snooze: 1,
    }).then(res => {
      console.log('alerm', res);
    });
  };
  // const alarmes = async () => {
  //   const alarm = await ReactNativeAN.scheduleAlarm({
  //     ...alarmNotifData,
  //     fire_date: firDate,
  //     play_sound: true,
  //     vibrate: true,
  //     has_button: true,
  //   }).then(res => {
  //     console.log('alarm set', res);
  //   });
  //   // ReactNativeAN.sendNotification(alarmNotifData);

  //   //Get All Scheduled Alarms
  //   // const alarms = await ReactNativeAN.getScheduledAlarms();
  // };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Left>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../assets/morning_icon.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: 14,
                  //   fontWeight: 'bold',
                  marginLeft: 12,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Morning
              </Text>
            </View>
          </Left>
          <Right>
            <TouchableOpacity
              onPress={
                // () => alarmes()
                () => navigation.navigate('AddNewReminder')
              }
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <AddIcon
                name={'add-circle'}
                size={24}
                color={Colors.mainBtnscolor}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.mainBtnscolor,
                  fontFamily: 'Poppins-Regular',
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </Right>
        </View>
        <SwipeListView
          data={Morning}
          keyExtractor={item => item.time}
          rightOpenValue={-75}
          renderHiddenItem={({item}) => (
            <View
              style={{
                // backgroundColor: 'red',
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 0,
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  ReactNativeAN.deleteAlarm(parseInt(item.id));
                  deletemorning(item.id)(dispatch);
                }}
                //   console.log(item.id);
                //   deleteFood({
                //     Auth: user.userdata.api_token,
                //     meal_id: item.id,
                //   }).then(res => {
                //     setOpp(!opp);
                //     console.log('res', res);
                //   });
                // }}
                style={{
                  backgroundColor: 'red',
                  height: 50,
                  width: 50,
                  alignItems: 'center',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Icon name="delete" color="white" size={25} />
              </TouchableOpacity>
            </View>
          )}
          renderItem={({item, index}) => {
            return (
              <Card
                key={'index' + index}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Left>
                    <Image
                      source={require('../../assets/bell_icon.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  </Left>
                  <Body style={{flex: 3}}>
                    <View style={{width: '100%', right: 10}}>
                      <Text
                        style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
                        {item.text == '' ? 'Alarm' : item.text}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Colors.GreyText,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {item.time}
                      </Text>
                    </View>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('UpdateReminder', {item})
                      }>
                      <Image
                        source={require('../../assets/edit_icon.png')}
                        style={{height: 20, width: 20, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                  </Right>
                </View>
              </Card>
            );
          }}
        />

        {/* Afternnon */}
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Left>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
              }}>
              <Image
                source={require('../../assets/aftermoon_icon.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: 14,
                  //   fontWeight: 'bold',
                  marginLeft: 12,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Afternoon
              </Text>
            </View>
          </Left>
          <Right>
            <TouchableOpacity
              onPress={
                // () => alarmes()
                () => navigation.navigate('AddNewReminder')
              }
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <AddIcon
                name={'add-circle'}
                size={24}
                color={Colors.mainBtnscolor}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.mainBtnscolor,
                  fontFamily: 'Poppins-Regular',
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </Right>
        </View>
        <SwipeListView
          data={Afternoon}
          rightOpenValue={-75}
          renderHiddenItem={({item}) => (
            <View
              style={{
                // backgroundColor: 'red',
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 0,
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  // console.log('i', parseInt(item.id));
                  ReactNativeAN.deleteAlarm(parseInt(item.id));
                  deleteafternoon(item.id)(dispatch);
                }}
                //   deleteFood({
                //     Auth: user.userdata.api_token,
                //     meal_id: item.id,
                //   }).then(res => {
                //     setOpp(!opp);
                //     console.log('res', res);
                //   });
                // }}
                style={{
                  backgroundColor: 'red',
                  height: 50,
                  width: 50,
                  alignItems: 'center',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Icon name="delete" color="white" size={25} />
              </TouchableOpacity>
            </View>
          )}
          renderItem={({item}) => {
            return (
              <Card
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Left>
                    <Image
                      source={require('../../assets/bell_icon.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  </Left>
                  <Body style={{flex: 3}}>
                    <View style={{width: '100%', right: 10}}>
                      <Text
                        style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
                        {item.text == '' ? 'Alarm' : item.text}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Colors.GreyText,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {item.time}
                      </Text>
                    </View>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('UpdateReminder', {item})
                      }>
                      <Image
                        source={require('../../assets/edit_icon.png')}
                        style={{height: 20, width: 20, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                  </Right>
                </View>
              </Card>
            );
          }}
        />

        {/* Evening */}
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Left>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
              }}>
              <Image
                source={require('../../assets/evening_icon.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: 14,
                  //   fontWeight: 'bold',
                  marginLeft: 12,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Evening
              </Text>
            </View>
          </Left>
          <Right>
            <TouchableOpacity
              onPress={
                // () => alarmes()
                () => navigation.navigate('AddNewReminder')
              }
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <AddIcon
                name={'add-circle'}
                size={24}
                color={Colors.mainBtnscolor}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.mainBtnscolor,
                  fontFamily: 'Poppins-Regular',
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </Right>
        </View>
        <SwipeListView
          data={Evening}
          rightOpenValue={-75}
          renderHiddenItem={({item}) => (
            <View
              style={{
                // backgroundColor: 'red',
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 0,
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  ReactNativeAN.deleteAlarm(parseInt(item.id));
                  deleteevening(item.id)(dispatch);
                }}
                //   console.log(item.id);
                //   deleteFood({
                //     Auth: user.userdata.api_token,
                //     meal_id: item.id,
                //   }).then(res => {
                //     setOpp(!opp);
                //     console.log('res', res);
                //   });
                // }}
                style={{
                  backgroundColor: 'red',
                  height: 50,
                  width: 50,
                  alignItems: 'center',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Icon name="delete" color="white" size={25} />
              </TouchableOpacity>
            </View>
          )}
          renderItem={({item}) => {
            return (
              <Card
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Left>
                    <Image
                      source={require('../../assets/bell_icon.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  </Left>
                  <Body style={{flex: 3}}>
                    <View style={{width: '100%', right: 10}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'Poppins-Medium',
                          color: 'black',
                        }}>
                        {item.text == '' ? 'Alarm' : item.text}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Colors.GreyText,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {item.time}
                      </Text>
                    </View>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={
                        () => navigation.navigate('UpdateReminder', {item})
                        // ReactNativeAN.deleteAlarm(item.id)
                      }>
                      <Image
                        source={require('../../assets/edit_icon.png')}
                        style={{height: 20, width: 20, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                  </Right>
                </View>
              </Card>
            );
          }}
        />

        {/* Night */}
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Left>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
              }}>
              <Image
                source={require('../../assets/night_icon.png')}
                style={{height: 25, width: 25, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: 14,
                  //   fontWeight: 'bold',
                  marginLeft: 14,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Night
              </Text>
            </View>
          </Left>
          <Right>
            <TouchableOpacity
              onPress={
                // () => alarmes()
                () => navigation.navigate('AddNewReminder')
              }
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <AddIcon
                name={'add-circle'}
                size={24}
                color={Colors.mainBtnscolor}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.mainBtnscolor,
                  fontFamily: 'Poppins-Regular',
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </Right>
        </View>
        <SwipeListView
          data={Night}
          rightOpenValue={-75}
          renderHiddenItem={({item}) => (
            <View
              style={{
                // backgroundColor: 'red',
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 0,
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  ReactNativeAN.deleteAlarm(parseInt(item.id));
                  deletenight(item.id)(dispatch);
                }}
                //   console.log(item.id);
                //   deleteFood({
                //     Auth: user.userdata.api_token,
                //     meal_id: item.id,
                //   }).then(res => {
                //     setOpp(!opp);
                //     console.log('res', res);
                //   });
                // }}
                style={{
                  backgroundColor: 'red',
                  height: 50,
                  width: 50,
                  alignItems: 'center',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Icon name="delete" color="white" size={25} />
              </TouchableOpacity>
            </View>
          )}
          renderItem={({item}) => {
            return (
              <Card
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Left>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontFamily: 'Poppins-Medium',
                        }}>
                        {item.text == '' ? 'Alarm' : item.text}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Colors.GreyText,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {item.time}
                      </Text>
                    </View>
                  </Left>
                  {/* <Body style={{ flex: 3 }}>
                                       
                                    </Body> */}
                  <Right>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('UpdateReminder', {item})
                      }>
                      <Image
                        source={require('../../assets/edit_icon.png')}
                        style={{height: 20, width: 20, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                  </Right>
                </View>
              </Card>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Reminderscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
});
