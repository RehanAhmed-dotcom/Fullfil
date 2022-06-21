import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert, TextInput, Image} from 'react-native';
import Button from '../../components/Button';
import Colors from '../../constants/colors';
import moment from 'moment';

import {
  alarmmorning,
  alarmnight,
  alarmevening,
  alarmafternoon,
  updatemorning,
} from '../../redux/actions';
import {useSelector, useDispatch} from 'react-redux';

import {Card, Item, Left, Right} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ReactNativeAN from 'react-native-alarm-notification';
import {TouchableOpacity} from 'react-native-gesture-handler';
const UpdateReminder = ({navigation, route}) => {
  const {Morning, Afternoon, Night} = useSelector(({ALARM}) => ALARM);
  console.log('afterrererererrerererernoeeeeee', JSON.stringify(Afternoon));
  console.log('afterrererererrerererernoeeeeee', Morning);
  console.log('afterrererererrerererernoeeeeee', Night);

  // const {id} = route.params;

  const dispatch = useDispatch();
  const {text, time, id} = route.params.item;
  console.log('iddddddd', id);
  useEffect(() => {
    navigation.setOptions({
      // title: `Update ${text}`,
      title: `Update`,

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
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              marginRight: 16,
              fontSize: 14,
              color: Colors.mainBtnscolor,
              fontFamily: 'Poppins-Regular',
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      ),
    });
    // setFormatedDate(moment(time).format('hh:mm:ss'));
    setFormatedDate(time);
    setTitle(text);
  }, []);
  const [formatedDate, setFormatedDate] = useState('');
  const [dates, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [check, setCheck] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    const currentDate = date;

    var time = new Date();
    console.log('oh', date.getHours());
    setCheck(date.getHours());
    // console.log(time.toLocaleString('en-US', {hour: 'numeric', hour12: false}));
    const mom = moment(currentDate).format('hh:mm');
    setFormatedDate(mom);
    setDate(moment(date).format('DD-MM-yyyy HH:mm:ss'));
    hideDatePicker();
  };
  // const
  // const fireDate = '25-05-2021 15:46:00';
  const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 60000));
  // console.log('ree', fireDate);
  // console.log('ressee', dates);
  const alarmNotifData = {
    title: 'My Notification Title',
    message: 'My Notification Message',
    channel: 'my_channel_id',
    small_icon: 'ic_launcher',

    // You can add any additional data that is important for the notification
    // It will be added to the PendingIntent along with the rest of the bundle.
    // e.g.
    data: {foo: 'bar'},
  };
  ///redux me kis jaga save kr raha hon wo code dikhao
  const alarmes = async () => {
    try {
      ReactNativeAN.deleteAlarm(id)
        .then(
          await ReactNativeAN.scheduleAlarm({
            ...alarmNotifData,
            fire_date: dates,
            play_sound: true,
            vibrate: true,
            has_button: true,
            snooze_interval: 1,
          }).then(res => {
            console.log('hallo', res);
            const alarmdata = {
              time: dates,
              text: title,
              id: res.id,
            };
            console.log('morning', alarmdata);
            Alert.alert('Alarm set');
            if (check >= 0 && check <= 6) {
              console.log('morning', alarmdata);
              //   const updateArray = alarmdata.filter(item => {
              //     return item.id !== res.id;
              //   });
              // var  newarry = [...updateArray, alarmdata];
              //   console.log('new ararararara', newarry);

              alarmmorning([alarmdata])(dispatch);
            } else if (check > 6 && check <= 12) {
              console.log('afternoon');
              alarmafternoon([alarmdata])(dispatch);
            } else if (check > 12 && check <= 18) {
              console.log('evening');
              const updateArray = Night.filter(item => {
                return item.id !== id;
              });
              var newarry = [...updateArray, Night];
              console.log('new ararararara', newarry);
              alarmevening([alarmdata])(dispatch);
            } else {
              console.log('night');
              alarmnight([alarmdata])(dispatch);
            }
            navigation.goBack();
            // navigation.navigate('Reminder',{deleteid:id})
          }),
        )
        .catch(e => {
          console.log('didnt come here');
        });
    } catch (e) {
      Alert.alert('Time must be ahead of current time');
    }
    // ReactNativeAN.sendNotification(alarmNotifData);

    //Get All Scheduled Alarms
    // const alarms = await ReactNativeAN.getScheduledAlarms();
  };

  // const update = id => {
  //   // alert('Ather')
  //   const updatedata = {
  //     time: dates,
  //     text: title,
  //     id: id,
  //   };
  //   return Morning.map(item => {
  //     if (item.id === updatedata.id) {  // Match the item by id and update its name
  //       return {
  //         ...item,
  //         id: item.id,
  //         title:item.title,
  //         date:item.date
  //       };
  //     }
  //     // return item;
  //     console.log('new ararararara', newarry);
  //     alarmmorning([item])(dispatch);
  //   });

  //    navigation.goBack();
  // };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 10,
            paddingVertical: 12,
            fontFamily: 'Poppins-Medium',
          }}>
          Add Title
        </Text>
        <TextInput
          placeholder={'Have a snack'}
          placeholderTextColor="#929291"
          returnKeyType="done"
          value={title}
          onChangeText={text => setTitle(text)}
          style={{
            height: 50,
            // borderWidth: 0.3,
            backgroundColor: '#F8F8F6',
            borderRadius: 6,
            fontSize: 14,
            fontFamily: 'Poppins-Regular',
            paddingHorizontal: 12,
          }}
        />

        <Text
          style={{
            fontSize: 14,
            paddingVertical: 12,
            marginTop: 10,
            fontFamily: 'Poppins-Medium',
          }}>
          Notification Time
        </Text>
        <TouchableOpacity
          onPress={() => showDatePicker()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 6,
            paddingHorizontal: 12,
            height: 50,
            backgroundColor: '#F8F8F6',
          }}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            // minimumDate={new Date(currentY, currentM, currentD)}
          />
          <Image
            source={require('../../assets/bell-filled_icon.png')}
            style={{height: 20, width: 20, resizeMode: 'contain'}}
          />
          <Text
            style={{
              marginLeft: 12,
              color: '#008B75',
              fontFamily: 'Poppins-Regular',
            }}>
            {formatedDate ? formatedDate : 'Select time'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title={'Done'}
          onPress={() => {
            alarmes();
            // update(id);
          }}
        />
      </View>
    </View>
  );
};

export default UpdateReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 4,
    // backgroundColor: 'yellow'
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'blue'
  },
});
