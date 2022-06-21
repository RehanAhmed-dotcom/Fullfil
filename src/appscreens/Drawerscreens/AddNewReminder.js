import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert, TextInput, Image} from 'react-native';
import Button from '../../components/Button';
import Colors from '../../constants/colors';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {
  alarmmorning,
  alarmnight,
  alarmevening,
  alarmafternoon,
} from '../../redux/actions';
import {createAlarm} from 'react-native-simple-alarm';
import IconDown from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {Card, Left, Right} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ReactNativeAN from 'react-native-alarm-notification';
import {TouchableOpacity} from 'react-native-gesture-handler';
const AddNewReminder = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      title: 'Add New',
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
    ReactNativeAN.requestPermissions({
      // notificationCenter: true,
    }).then(
      data => {
        console.log('RnAlarmNotification.requestPermissions', data);
      },
      data => {
        console.log('RnAlarmNotification.requestPermissions failed', data);
      },
    );
  }, []);

  const [formatedDate, setFormatedDate] = useState('');
  const [dates, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [check, setCheck] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Every 30 min', value: 'option1'},
    {label: 'Every hour', value: 'option2'},
    {label: 'Every day', value: 'option3'},
    {label: 'Every week', value: 'option4'},
    // {label: 'Option5', value: 'option5'},
    // {label: 'Option6', value: 'option6'},
  ]);
  console.log('da', dates);
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
    setDate(moment(date).format('DD-MM-YYYY HH:mm:ss'));
    hideDatePicker();
  };
  // const
  // const fireDate = '25-05-2021 15:46:00';
  const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 60000));
  // console.log('ree', fireDate);
  // console.log('ressee', dates);
  const alarmNotifData = {
    title: 'Reminder',
    message: title,
    vibrate: true,
    play_sound: true,
    schedule_type: 'once',
    channel: 'wakeup',
    data: {content: 'my notification id is 22'},
    loop_sound: true,
    has_button: true,
  };
  const alarmes = async () => {
    // console.log('time', moment().format());
    // const alrm = await createAlarm({
    //   active: true,
    //   date: moment().add(1, 'minute').format(),
    //   message: '',
    //   snooze: 1,
    // });
    // console.log('sd', alrm);
    // ReactNativeAN.checkPermissions(permissions => {
    //   console.log('check Permision', permissions);
    // });
    const details = {...alarmNotifData, fire_date: dates};
    try {
      const alarm = await ReactNativeAN.scheduleAlarm(details)
        // console.log('adf', alarm);
        .then(res => {
          console.log(res);
          const alarmdata = {
            time: dates,
            text: title,
            id: res.id,
          };
          Alert.alert('Alarm set');
          if (check >= 0 && check <= 6) {
            alarmmorning([alarmdata])(dispatch);
          } else if (check > 6 && check <= 12) {
            alarmafternoon([alarmdata])(dispatch);
          } else if (check > 12 && check <= 18) {
            alarmevening([alarmdata])(dispatch);
          } else {
            alarmnight([alarmdata])(dispatch);
          }
          navigation.goBack();
        });
    } catch (e) {
      Alert.alert('Time must be ahead of current time');
    }
    // ReactNativeAN.sendNotification(alarmNotifData);

    //Get All Scheduled Alarms
    // const alarms = await ReactNativeAN.getScheduledAlarms();
  };
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
          returnKeyType="done"
          placeholder={'Enter reminder title'}
          placeholderTextColor="#929291"
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
        <DropDownPicker
          // onChangeValue={value => {
          //   userErr && setUserErr('');
          // }}
          placeholder="Repeat option"
          ArrowDownIconComponent={({style}) => (
            <IconDown
              name={'arrow-down-drop-circle-outline'}
              color="#008B75"
              size={18}
              style={style}
            />
          )}
          ArrowUpIconComponent={({style}) => (
            <IconDown
              name={'arrow-up-drop-circle-outline'}
              color="#008B75"
              size={18}
              style={style}
            />
          )}
          dropDownContainerStyle={{
            borderColor: Colors.mainBtnscolor,
            marginTop: 20,
          }}
          open={open}
          style={{
            borderWidth: 1,
            borderColor: Colors.mainBtnscolor,
            marginTop: 20,
          }}
          containerStyle={{
            // borderWidth: open ? 0 : 1,
            borderRadius: 10,

            // borderColor: open ? 'black' : Colors.mainBtnscolor,
          }}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title={'Done'}
          onPress={() => {
            // alarmnight([alarmdata])(dispatch);
            // const alarm = ReactNativeAN.scheduleAlarm({
            //   ...alarmNotifData,
            //   fire_date: fireDate,
            // });
            // console.log('alram', alarm);
            // console.log(
            //   'date',
            //   ReactNativeAN.parseDate(new Date(Date.now() + 60000)),
            // );
            console.log(moment().startOf('minute').format('hh:mm A'));
            alarmes();
            // navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default AddNewReminder;

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
