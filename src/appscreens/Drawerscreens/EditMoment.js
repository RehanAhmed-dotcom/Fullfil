import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Keyboard,
  View,
  TextInput,
  ActivityIndicator,
  Modal,
  Image,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {CheckBox, Slider} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {RadioButton} from 'react-native-paper';
import Button from '../../components/Button';
import Colors from '../../constants/colors';
import IconDown from 'react-native-vector-icons/MaterialCommunityIcons';
import {addMovement} from '../../lib/api';
import {useSelector, useDispatch} from 'react-redux';
const EditMoment = ({navigation, route}) => {
  const {item} = route.params;
  const [userErr, setUserErr] = useState('');
  const [MoveErr, setMoveErr] = useState('');
  const refContainer = useRef(null);
  const [open, setOpen] = useState(false);
  const [formatedTime, setFormatedTime] = useState(item.main_time);
  // const [formatedDate, setFormatedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  // const [value, setValue] = useState(item.title);
  // const [items, setItems] = useState([
  //   {label: 'Option1', value: 'option1'},
  //   {label: 'Option2', value: 'option2'},
  //   {label: 'Option3', value: 'option3'},
  //   {label: 'Option4', value: 'option4'},
  //   {label: 'Option5', value: 'option5'},
  //   {label: 'Option6', value: 'option6'},
  // ]);
  const [values, setValues] = useState(item.title);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formatedDate, setFormatedDate] = useState(item.date);
  const {userData: user} = useSelector(({USER}) => USER);
  const [slideVal, setslideVal] = useState(item.time);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [move, setMove] = useState(item.reason);
  const [engaged, setengated] = useState('');
  const [perior, setPerior] = useState(item.feel_prior_note);
  const items = [
    {
      id: 1,
      name: 'Aerial Yoga',
    },
    {
      id: 2,
      name: 'Aerobics',
    },
    {
      id: 3,
      name: 'Dance',
    },
    {
      id: 4,
      name: 'Basketball',
    },
    {
      id: 5,
      name: 'Biking',
    },
    {
      id: 6,
      name: 'Bowling',
    },
    {
      id: 7,
      name: 'Fencing',
    },
    {
      id: 8,
      name: 'Football',
    },
    {
      id: 9,
      name: 'Frisbee',
    },
    {
      id: 10,
      name: 'Gardening',
    },
    {
      id: 11,
      name: 'Golf',
    },
    {
      id: 12,
      name: 'Hiking',
    },
    {
      id: 13,
      name: 'Horseback riding',
    },
    {
      id: 14,
      name: 'Ice skating',
    },
    {
      id: 15,
      name: 'Jump rope',
    },
    {
      id: 16,
      name: 'Karate',
    },
    {
      id: 17,
      name: 'Kickball',
    },
    {
      id: 18,
      name: 'Kickboxing',
    },
    {
      id: 19,
      name: 'Lacrosse',
    },
    {
      id: 20,
      name: 'Martial Arts',
    },
    {
      id: 21,
      name: 'Pickleball',
    },
    {
      id: 22,
      name: 'Racquetball',
    },
    {
      id: 23,
      name: 'Running',
    },
    {
      id: 24,
      name: 'Rock Climbing',
    },
    {
      id: 25,
      name: 'Rollerblading',
    },
    {
      id: 26,
      name: 'Rowing',
    },
    {
      id: 27,
      name: 'Skateboarding',
    },
    {
      id: 28,
      name: 'Spinning',
    },
    {
      id: 29,
      name: 'Stretching',
    },
    {
      id: 30,
      name: 'Soccer',
    },
    {
      id: 31,
      name: 'Tai Chi',
    },
    {
      id: 32,
      name: 'Tennis',
    },
    {
      id: 33,
      name: 'Vacuuming',
    },
    {
      id: 34,
      name: 'Volleyball',
    },
    {
      id: 35,
      name: 'Walking',
    },
    {
      id: 36,
      name: 'Water aerobics',
    },
    {
      id: 37,
      name: 'Water polo',
    },
    {
      id: 38,
      name: 'Weight lifting',
    },
    {
      id: 39,
      name: 'Wrestling',
    },
    {
      id: 40,
      name: 'Yoga',
    },
  ];
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };
  const handleConfirm = date => {
    const mom = moment(date).format('YYYY-MM-DD');
    setFormatedDate(mom);
    setDate(moment(date).format('MM-DD-yyyy'));
    hideDatePicker();
  };
  const handleConfirm1 = date => {
    const mom = moment(date).format('hh:mm:ss');
    setFormatedTime(mom);
    // setDate(moment(date).format('MM-DD-yyyy'));
    hideDatePicker1();
  };
  const loaderModal = () => (
    <Modal animationType="slide" transparent={true} visible={loaderVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 100,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            borderRadius: 50,
          }}>
          <ActivityIndicator size="large" color={Colors.mainBtnscolor} />
        </View>
      </View>
    </Modal>
  );
  const [after, setAfter] = useState(item.feel_after_note);
  const [note, setNote] = useState(item.movement_note);
  useEffect(() => {
    navigation.setOptions({
      title: 'Edit Movement',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 14,
        color: Colors.mainBtnscolor,
        fontFamily: 'Poppins-SemiBold',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icon_back.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginLeft: 16,
            }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.screenBgColor,
      },
    });
  }, []);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  useEffect(() => {
    for (let i = 0; i < item.feel_prior_attributes?.length; i++) {
      const ind = checkData.findIndex(
        element => element.text1 == item.feel_prior_attributes[i],
      );
      const findItem = checkData[ind];
      const newItem = {
        ...findItem,
        check: true,
      };
      checkData[ind] = newItem;
      setcheckData([...checkData]);
      // setcheckData([...checkData, (checkData[ind].check = true)]);
    }
    for (let i = 0; i < item.feel_after_attributes?.length; i++) {
      const indi = checkData1.findIndex(
        element => element.text1 == item.feel_after_attributes[i],
      );
      const findItem = checkData1[indi];
      const newItem = {
        ...findItem,
        check: true,
      };
      checkData1[indi] = newItem;
      setcheckData1([...checkData1]);
      // setcheckData1([...checkData1, (checkData1[indi].check = true)]);
    }
    // setValues(item.title);
    // setSelectedItems({id: 1, name: 'Aerial Yoga'});
  }, []);
  // const {id} = route.params;
  const [checkData, setcheckData] = useState([
    {
      id: 1,
      text1: 'Energized',
      check: false,
    },
    {
      id: 2,
      text1: 'Happy',
      check: false,
    },
    {
      id: 3,
      text1: 'Calm',
      check: false,
    },
    {
      id: 4,
      text1: 'Stressed',
      check: false,
    },
    {
      id: 5,
      text1: 'Tired',
      check: false,
    },
    {
      id: 6,
      text1: 'Bored',
      check: false,
    },
    {
      id: 7,
      text1: 'Sad',
      check: false,
    },
    {
      id: 8,
      text1: 'Anxious',
      check: false,
    },
    {
      id: 9,
      text1: 'Guilty',
      check: false,
    },
    {
      id: 10,
      text1: 'Other',
      check: false,
    },
  ]);
  const [checkData1, setcheckData1] = useState([
    {
      id: 1,
      text1: 'Energized',
      check: false,
    },
    {
      id: 2,
      text1: 'Happy',
      check: false,
    },
    {
      id: 3,
      text1: 'Calm',
      check: false,
    },
    {
      id: 4,
      text1: 'Stressed',
      check: false,
    },
    {
      id: 5,
      text1: 'Tired',
      check: false,
    },
    {
      id: 6,
      text1: 'Bored',
      check: false,
    },
    {
      id: 7,
      text1: 'Strong',
      check: false,
    },
    {
      id: 8,
      text1: 'Anxious',
      check: false,
    },
    {
      id: 9,
      text1: 'Guilty',
      check: false,
    },
    {
      id: 10,
      text1: 'Other',
      check: false,
    },
  ]);
  const checkIndex = payload => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].name == payload) {
        return i;
      }
    }
  };
  console.log('item', checkData);
  console.log('other items', checkData);
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={{paddingHorizontal: 16}}>
          <Text
            style={{
              fontSize: 14,
              paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            Type of movement
          </Text>
          {/* <View
            style={{
              height: 50,
              backgroundColor: '#fff',
              paddingHorizontal: 12,
              borderRadius: 6,
              alignItems: 'center',
              // justifyContent: 'flex-end',
              flexDirection: 'row',
              borderColor: userErr?'red': Colors.mainBtnscolor,
              // backgroundColor:'green',
              borderWidth:0.5
            }}>
            <TextInput
          
              value={engaged}
              onChangeText={tex => {
                userErr && setUserErr('');
                setengated(tex);
              }}
              style={{flex: 1, color: 'black'}}
            />
            <IconDown
              name={'arrow-down-drop-circle-outline'}
              color="#008B75"
              size={18}
            />
          </View> */}
          <SearchableDropdown
            // resetValue={false}
            ref={refContainer}
            // multi={true}
            // selectedItems={{name: 'abc'}}
            // autoFocus={true}
            selectedItems={values ? {name: `${values}`} : selectedItems}
            onItemSelect={item => {
              setSelectedItems(item);
              console.log('abc', item);
              // const items = this.state.selectedItems;
              // items.push(item);
              userErr && setUserErr('');
              // this.setState({selectedItems: items});
              // console.log(item);
              setValues(item.name);
            }}
            containerStyle={{padding: 5, zIndex: 5}}
            // onRemoveItem={(item, index) => {
            //   const items = this.state.selectedItems.filter(
            //     sitem => sitem.id !== item.id,
            //   );
            //   this.setState({selectedItems: items});
            // }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              zIndex: 5,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{color: '#222'}}
            itemsContainerStyle={{maxHeight: 140}}
            items={items}
            // defaultIndex={2}
            // defaultValue={{name: 'abc'}}
            chip={true}
            resetValue={false}
            textInputProps={{
              placeholder: '',
              autofocus: true,
              value: `${values}`,
              returnKeyType: 'done',

              underlineColorAndroid: 'transparent',
              style: {
                padding: 12,
                zIndex: 5,
                borderWidth: 1,
                color: 'black',
                borderColor: userErr ? 'red' : '#008B75',
                borderRadius: 5,
              },
              onTextChange: text => {
                setValues(text), userErr && setUserErr('');
              },
            }}
            //             listProps={{
            //     nestedScrollEnabled: true
            // }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
          {/* <DropDownPicker
            onChangeValue={value => {
              userErr && setUserErr('');
            }}
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
            dropDownContainerStyle={{borderColor: Colors.mainBtnscolor}}
            open={open}
            style={{
              borderWidth: 1,
              borderColor: userErr ? 'red' : Colors.mainBtnscolor,
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
          /> */}
          {/* <Text
            style={{
              fontSize: 14,
              marginTop: 10,
              paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            What date did you move at ?
          </Text> */}
          {/* 
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
              mode="date"
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
              {formatedDate ? formatedDate : 'Select date'}
            </Text>
          </TouchableOpacity> */}
          <Text
            style={{
              fontSize: 14,
              marginTop: 10,
              paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            What time did you move at ?
          </Text>

          <TouchableOpacity
            onPress={() => showDatePicker1()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 6,
              paddingHorizontal: 12,
              height: 50,
              backgroundColor: '#F8F8F6',
            }}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible1}
              mode="time"
              onConfirm={handleConfirm1}
              onCancel={hideDatePicker1}
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
              {formatedTime ? formatedTime : 'Select time'}
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 14,
              marginTop: 15,
              paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            For roughly how much time?
          </Text>
          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#008B75',
                  fontSize: 14,
                }}>
                Time
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular', color: '#008B75'}}>
                {slideVal} min
              </Text>
            </View>
            <Slider
              value={slideVal}
              trackStyle={{height: 4}}
              maximumValue={120}
              minimumValue={0}
              minimumTrackTintColor="#008B75"
              maximumTrackTintColor="#ABD9D1"
              step={1}
              onValueChange={value => setslideVal(value)}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: Colors.mainBtnscolor,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              marginTop: 15,
              paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
              marginBottom: 5,
            }}>
            I wanted to move because :
          </Text>
          <TextInput
            returnKeyType="done"
            placeholder={'Write here'}
            value={move}
            onChangeText={text => {
              MoveErr && setMoveErr('');
              setMove(text);
            }}
            textAlignVertical="top"
            style={{
              backgroundColor: '#fff',
              height: 50,
              borderRadius: 6,
              fontFamily: 'Poppins-Regular',
              paddingHorizontal: 12,
              fontSize: 14,
              borderColor: MoveErr ? 'red' : Colors.mainBtnscolor,
              borderWidth: 1,
            }}
          />
        </View>
        <View style={{height: 20}} />
        <View
          style={{
            paddingHorizontal: 16,
            backgroundColor: '#fff',
            elevation: 2,
            paddingVertical: 12,
          }}>
          <Text
            style={{
              fontSize: 14,
              // paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            How did you feel prior to the movement?
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 5,
              // paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            (Choose most applicable emotion/sensation)
          </Text>
          <FlatList
            data={checkData}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    right: 18,
                    width: 150,
                  }}>
                  <CheckBox
                    checked={item.check}
                    checkedColor={Colors.mainBtnscolor}
                    uncheckedColor={Colors.mainBtnscolor}
                    onPress={() => {
                      const temphandleDatacheck = [...checkData];
                      temphandleDatacheck[index].check =
                        !temphandleDatacheck[index].check;
                      setcheckData(temphandleDatacheck);
                    }}
                  />
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    {item.text1}
                  </Text>
                </View>
              );
            }}
          />
          <TextInput
            returnKeyType="done"
            placeholder={'other'}
            placeholderTextColor="grey"
            value={perior}
            onChangeText={text => setPerior(text)}
            style={{
              height: 50,
              backgroundColor: '#EEF6F5',
              borderRadius: 6,
              paddingHorizontal: 12,
            }}
          />
        </View>
        {/* ......................... */}

        <View style={{height: 20}} />
        <View
          style={{
            paddingHorizontal: 16,
            backgroundColor: '#fff',
            elevation: 2,
            paddingVertical: 12,
          }}>
          <Text
            style={{
              fontSize: 14,
              // paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            How did you feel after?
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 5,
              // paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            (Choose most applicable emotion/sensation)
          </Text>
          <FlatList
            data={checkData1}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    right: 18,
                    width: 150,
                  }}>
                  <CheckBox
                    checked={item.check}
                    checkedColor={Colors.mainBtnscolor}
                    uncheckedColor={Colors.mainBtnscolor}
                    onPress={() => {
                      const temphandleDatacheck = [...checkData1];
                      temphandleDatacheck[index].check =
                        !temphandleDatacheck[index].check;
                      setcheckData1(temphandleDatacheck);
                    }}
                  />
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    {item.text1}
                  </Text>
                </View>
              );
            }}
          />
          <TextInput
            returnKeyType="done"
            placeholder={'Write here'}
            placeholderTextColor="#ccc"
            value={after}
            onChangeText={text => {
              setAfter(text);
            }}
            style={{
              height: 50,
              fontFamily: 'Poppins-Regular',
              backgroundColor: '#EEF6F5',
              borderRadius: 6,
              paddingHorizontal: 12,
            }}
          />
        </View>

        {/* How did you feel between 2-3 hours */}

        <View style={{height: 20}} />
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            elevation: 2,
            paddingVertical: 16,
            marginBottom: 18,
            paddingBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 14,
              paddingVertical: 6,
              elevation: 2,
              color: '#737373',
              fontFamily: 'Poppins-Medium',
            }}>
            Note
            <Text
              style={{
                fontSize: 14,
                color: Colors.mainBtnscolor,
                fontFamily: 'Poppins-Medium',
              }}></Text>
          </Text>
          <TextInput
            returnKeyType="done"
            placeholder={'Write notes'}
            placeholderTextColor="#ccc"
            value={note}
            onChangeText={text => setNote(text)}
            style={{
              height: 50,
              fontFamily: 'Poppins-Regular',
              backgroundColor: Colors.bgColor,
              borderRadius: 6,
              paddingHorizontal: 12,
            }}
          />
        </View>
        {keyboardStatus && <View style={{height: 200}} />}
        {loaderModal()}
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Button
          title={'Submit'}
          onPress={() => {
            //
            const data = new FormData();
            data.append(
              'title',
              selectedItems.name ? selectedItems.name : values,
            );
            // data.append('movement_category_id', id);
            data.append('time', slideVal);
            data.append('reason', move);
            checkData.forEach(item => {
              item.check == true &&
                data.append('feel_prior_attributes[]', item.text1);
            });
            checkData1.forEach(item => {
              item.check == true &&
                data.append('feel_after_attributes[]', item.text1);
            });
            data.append(
              'feel_prior',
              checkData[9].check == true
                ? 10
                : checkData[8].check == true
                ? 9
                : checkData[7].check == true
                ? 8
                : checkData[6].check == true
                ? 7
                : checkData[5].check == true
                ? 6
                : checkData[4].check == true
                ? 5
                : checkData[3].check == true
                ? 4
                : checkData[2].check == true
                ? 3
                : checkData[1].check == true
                ? 2
                : checkData[0].check == true
                ? 1
                : 0,
            );
            data.append(
              'feel_after',
              checkData1[9].check == true
                ? 10
                : checkData1[8].check == true
                ? 9
                : checkData1[7].check == true
                ? 8
                : checkData1[6].check == true
                ? 7
                : checkData1[5].check == true
                ? 6
                : checkData1[4].check == true
                ? 5
                : checkData1[3].check == true
                ? 4
                : checkData1[2].check == true
                ? 3
                : checkData1[1].check == true
                ? 2
                : checkData1[0].check == true
                ? 1
                : 0,
            );
            data.append('date', moment().format('YYYY-MM-DD'));
            data.append('main_time', formatedTime);
            data.append('feel_prior_note', perior);
            data.append('movement_id', item.id);
            data.append('feel_after_note', after);
            data.append('movement_note', note);
            if (selectedItems.name || values) {
              setLoaderVisible(true);
              addMovement({Auth: user.userdata.api_token}, data).then(res => {
                if (res) {
                  setLoaderVisible(false);
                  navigation.goBack();
                } else {
                  setLoaderVisible(false);
                  Alert.alert('Something went wrong');
                }
              });
            } else {
              if (!selectedItems.name) {
                setUserErr('sdf');
              }
              // else if (!move) {
              //   setMoveErr('asdf');
              // }
            }
          }}
          style={{borderRadius: 0, height: 80}}
        />
      </View>
    </View>
  );
};

export default EditMoment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    backgroundColor: Colors.screenBgColor,
    paddingBottom: 75,
  },
  inputparentView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  camerView: {
    height: 50,
    width: 50,
    backgroundColor: Colors.mainBtnscolor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
