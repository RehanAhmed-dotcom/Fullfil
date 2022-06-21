import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Keyboard, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {graphtData, sleepDateSpecific} from '../../lib/api';
import IconDown from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TextInput} from 'react-native';
import {Alert} from 'react-native';
const AddSleep = ({navigation, route}) => {
  const {dates} = route.params;
  const {userData: user} = useSelector(({USER}) => USER);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [history, setHistory] = useState([]);
  const [date, setDate] = useState(history.length ? history[0].date : '');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [note, setNote] = useState('');
  const [id, setId] = useState('');
  const [formatedDate, setFormatedDate] = useState(
    history.length ? history[0].date : '',
  );
  const [selectedData1, setselectedData1] = useState();
  const [items, setItems] = useState([
    {label: '1 Hour', value: 1},
    {label: '1.5 Hour', value: 1.5},
    {label: '2 Hours', value: 2},
    {label: '2.5 Hours', value: 2.5},
    {label: '3 Hours', value: 3},
    {label: '3.5 Hours', value: 3.5},
    {label: '4 Hours', value: 4},
    {label: '4.5 Hours', value: 4.5},
    {label: '5 Hours', value: 5},
    {label: '5.5 Hours', value: 5.5},
    {label: '6 Hours', value: 6},
    {label: '6.5 Hours', value: 6.5},
    {label: '7 Hours', value: 7},
    {label: '7.5 Hours', value: 7.5},
    {label: '8 Hours', value: 8},
    {label: '8.5 Hours', value: 8.5},
    {label: '9 Hours', value: 9},
    {label: '9.5 Hours', value: 9.5},
    {label: '10 Hours', value: 10},
    {label: '10.5 Hours', value: 10.5},
    {label: '11 Hours', value: 11},
    {label: '11.5 Hours', value: 11.5},
    {label: '12 Hours', value: 12},
    {label: '12.5 Hours', value: 12.5},
    {label: '13 Hours', value: 13},
    {label: '13.5 Hours', value: 13.5},
    {label: '14 Hours', value: 14},
    {label: '14.5 Hours', value: 14.5},
    {label: '15 Hours', value: 15},
    {label: '15.5 Hours', value: 15.5},
    {label: '16 Hours', value: 16},
    {label: '16.5 Hours', value: 16.5},
    {label: '17 Hours', value: 17},
    {label: '17.5 Hours', value: 17.5},
    {label: '18 Hours', value: 18},
    {label: '18.5 Hours', value: 18.5},
    {label: '19 Hours', value: 19},
    {label: '19.5 Hours', value: 19.5},
    {label: '20 Hours', value: 20},
    {label: '20.5 Hours', value: 20.5},
    {label: '21 Hours', value: 21},
    {label: '21.5 Hours', value: 21.5},
    {label: '22 Hours', value: 22},
    {label: '22.5 Hours', value: 22.5},
    {label: '23 Hours', value: 23},
    {label: '23.5 Hours', value: 23.5},
    {label: '24 Hours', value: 24},
  ]);
  const [Data, setData] = useState([
    {
      id: 1,
      no: 1,
      color: false,
    },
    {
      id: 2,
      no: 2,
      color: false,
    },
    {
      id: 3,
      no: 3,
      color: false,
    },
    {
      id: 4,
      no: 4,
      color: false,
    },
    {
      id: 5,
      no: 5,
      color: false,
    },
    {
      id: 6,
      no: 6,
      color: false,
    },
    {
      id: 7,
      no: 7,
      color: false,
    },
    {
      id: 8,
      no: 8,
      color: false,
    },
    {
      id: 9,
      no: 9,
      color: false,
    },
    {
      id: 10,
      no: 10,
      color: false,
    },
  ]);
  console.log('da', date);
  const handleConfirm = date => {
    // const currentDate = date;

    var time = new Date();
    // console.log('oh', date.getHours());
    // setCheck(date.getHours());
    // console.log(time.toLocaleString('en-US', {hour: 'numeric', hour12: false}));
    // const mom1 = moment(currentDate).format('hh:mm');
    // const mom = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    // console.log('timeeeeeee', mom);
    // console.log('fjfj', moment().format('YYYY-MM-DD hh:mm:ss'));
    // setFormatedDate(mom);
    setDate(moment(date).format('DD/MM/yy'));
    setFormatedDate(moment(date).format('YYYY-MM-DD'));
    // setDate(moment(date).format('YYYY-MM-DD hh:mm:ss'));

    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  useEffect(() => {
    navigation.setOptions({
      title: 'Add Sleep Data',
      headerTitleStyle: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: Colors.mainBtnscolor,
      },
      headerStyle: {
        backgroundColor: Colors.screenBgColor,

        elevation: 0,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <Image
                source={require('../assets/menu_icon.png')}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 10,
                  marginLeft: 16,
                }}
              /> */}
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginLeft: 16,
              alignItems: 'center',
              backgroundColor: Colors.mainBtnscolor,
              justifyContent: 'center',
            }}>
            <Icon name="arrowleft" color="white" size={20} />
          </View>
        </TouchableOpacity>
      ),
      //   headerRight: () => (
      //     <TouchableOpacity onPress={() => navigation.navigate('Mediascreen')}>
      //       <Image
      //         source={require('../assets/music_icon.png')}
      //         style={{
      //           height: 30,
      //           width: 30,
      //           borderRadius: 10,
      //           marginRight: 16,
      //         }}
      //       />
      //     </TouchableOpacity>
      //   ),
    });
    sleepDateSpecific({Auth: user.userdata.api_token, date: dates}).then(
      res => {
        console.log('responce', res);
        setHistory(res.history);
        setDate(res.history[0].date);
        setFormatedDate(res.history[0].date);
        setValue(parseInt(res.history[0].sleep_hour));
        setselectedData1(parseInt(res.history[0].sleep_quality));
        setNote(res.history[0].note);
        setId(res.history[0].id);
      },
    );
    // SplashScreen.hide();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.screenBgColor,
        alignItems: 'center',
      }}>
      <View style={{width: '90%', marginTop: 10}}>
        <Text>Pick a Date</Text>
        <TouchableOpacity
          onPress={() => showDatePicker()}
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
          }}>
          <Text>{date ? date : 'Date'}</Text>
          <Icon1 name="calendar-month" size={20} color={Colors.mainBtnscolor} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            // minimumDate={new Date(currentY, currentM, currentD)}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '90%', marginTop: 10}}>
        <Text>Hours Slept</Text>
        {/* <TouchableOpacity
          onPress={() => showDatePicker()}
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
          }}>
          <Text>{date ? date : 'Date'}</Text>
          <Icon1 name="calendar-month" size={20} color={Colors.mainBtnscolor} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            // minimumDate={new Date(currentY, currentM, currentD)}
          />
        </TouchableOpacity> */}
        <DropDownPicker
          // onChangeValue={value => {
          //   userErr && setUserErr('');
          // }}
          placeholder=""
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
            // zIndex: 3,
          }}
          open={open}
          style={{
            marginTop: 10,
            // zIndex: 2,
            borderWidth: 1,
            borderColor: Colors.mainBtnscolor,
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
      <View
        style={{
          width: '90%',
          marginTop: 10,
          borderRadius: 10,
          zIndex: -1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 6,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 14,
              paddingVertical: 6,
              marginLeft: 10,
              //   marginTop: 10,
              fontFamily: 'Poppins-Medium',
            }}>
            Sleep Quality
          </Text>
          <Text
            // onPress={() => navigation.navigate('Hunger')}
            style={{
              color: Colors.mainBtnscolor,
              marginRight: 10,
              fontFamily: 'Poppins-Regular',
            }}>
            {selectedData1 == '1' || selectedData1 == '2'
              ? 'poor'
              : selectedData1 == '3' || selectedData1 == '4'
              ? 'fair'
              : selectedData1 == '5' || selectedData1 == '6'
              ? 'good'
              : selectedData1 == '7' || selectedData1 == '8'
              ? 'very good'
              : selectedData1 == '9' || selectedData1 == '10'
              ? 'excellent'
              : ''}
          </Text>
        </View>
        <View
          style={{
            height: 50,
            // backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 3,
          }}>
          <FlatList
            data={Data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center'}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setselectedData1(item.id);
                  }}
                  key={'index' + index}
                  style={{
                    // margin: 4,
                    borderWidth: 1,
                    height: 30,
                    width: 30,
                    left: 8,
                    marginRight: 5,
                    elevation: 4,
                    borderColor: Colors.mainBtnscolor,
                    borderRadius: 20,
                    backgroundColor:
                      selectedData1 === item.id ? Colors.mainBtnscolor : '#fff',
                    alignItems: 'center',

                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color:
                        selectedData1 === item.id
                          ? '#fff'
                          : Colors.mainBtnscolor,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {item.no}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <View style={{width: '90%', marginTop: 10, zIndex: -1}}>
        <Text> Write Note</Text>
        <TextInput
          multiline
          numberOfLines={5}
          onChangeText={text => setNote(text)}
          value={note}
          placeholder={'Type here'}
          placeholderTextColor="grey"
          keyboardType="default"
          returnKeyType="done"
          blurOnSubmit={true}
          // onSubmitEditing={() => {
          //   Keyboard.dismiss();
          // }}
          style={{
            padding: 10,
            marginTop: 10,
            color: 'black',
            height: 100,
            backgroundColor: 'white',
            borderRadius: 10,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          graphtData({
            Auth: user.userdata.api_token,
            date: formatedDate,
            sleep_hour: value,
            hunger_level: selectedData1,
            sleep_quality: selectedData1,
            note,
            graph_id: id,
          }).then(res => {
            console.log('respoince', res);
            if (res) {
              if (res.status == 'success') {
                navigation.navigate('Slept');
              }
            } else {
              Alert.alert('Please select previous dates');
            }
          });
        }}
        style={{
          width: '90%',
          position: 'absolute',
          height: 50,
          backgroundColor: Colors.mainBtnscolor,
          bottom: 30,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{fontSize: 16, fontFamily: 'Poppins-Medium', color: 'white'}}>
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddSleep;
