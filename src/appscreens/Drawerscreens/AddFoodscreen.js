import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {addMeal} from '../../lib/api';
import {CheckBox} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import Button from '../../components/Button';
import Colors from '../../constants/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector, useDispatch} from 'react-redux';
const AddFoodscreen = ({navigation, route}) => {
  // const hideTimePicker = () => {
  //   setTimePickerVisibility(false);
  // };
  // const handleConfirm = date => {
  //   const currentDate = date;
  //   const mom = moment(currentDate).format('YYYY-MM-DD hh:mm:ss');
  //   setFormatDate(mom);
  //   setDatex(date);
  //   hideDatePicker();
  // };
  // const handleConfirm1 = time => {
  //   const currentDate = time;
  //   const mom = moment(currentDate).format('hh:mm:ss');
  //   setFormatTime(mom);
  //   setTimex(time);
  //   hideTimePicker();
  // };
  // const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [texteng, settexteng] = useState('');
  const [show, setShow] = useState(false);
  const [selectedData1, setselectedData1] = useState();
  const [timex, setTimex] = useState(' ');
  const [formatDate, setFormatDate] = useState(' ');
  const [formatTime, setFormatTime] = useState(' ');
  const [selectedData2, setselectedData2] = useState();
  const [selectedDataArr, setSelectedDataArr] = useState([]);
  const [selectedData3, setselectedData3] = useState();
  const [eatDrink, setEatDrink] = useState('');
  const [time, setTime] = useState('');
  const [img, setImg] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {id} = route.params;
  const [eatErr, setEatErr] = useState('');
  const [imgErr, setImgErr] = useState('');
  const [timeErr, setTimeErr] = useState('');
  const {userData: user} = useSelector(({USER}) => USER);
  const [radiobtn1, setRadiobtn1] = useState('');
  const [radiobtn2, setRadiobtn2] = useState('');
  const [radiobtn3, setRadiobtn3] = useState('');
  const [radiobtn4, setRadiobtn4] = useState('');
  const [formatedDate, setFormatedDate] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [extrastate, setExtraState] = useState('');
  const [date, setDate] = useState(Date.now());
  const [hungerLevel, setHungerLevel] = useState('');
  const [fullNote, setFullNote] = useState('');
  const [hungerFeel, setHungerFeel] = useState('');
  const [Full, setFull] = useState('');
  const [feelNote, setFeelNote] = useState('');
  const [mainNote, setMainNote] = useState('');
  const [afterEat, setAfterEat] = useState('');
  const [check, setCheck] = useState('');
  const [loc, setLoc] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  // console.log('data', selectedData2);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    const currentDate = date;
    setTimeErr('');
    extrastate && setExtraState('');
    // var time = new Date();
    // console.log('oh', date.getHours());
    setCheck(date.getHours());
    // console.log(time.toLocaleString('en-US', {hour: 'numeric', hour12: false}));
    // const mom1 = moment(currentDate).format('hh:mm');
    const mom = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    // console.log('timeeeeeee', mom);
    // console.log('fjfj', moment().format('YYYY-MM-DD hh:mm:ss'));
    setFormatedDate(mom);
    setDate(moment(date).format('MM-DD-yyyy HH:mm:ss a'));
    // setDate(moment(date).format('YYYY-MM-DD hh:mm:ss'));

    hideDatePicker();
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };
  // const handleConfirm = date => {
  //   const currentDate = date;
  //   const mom = moment(currentDate).format('DD-MM-YYYY');
  //   setFormatedDate(mom);
  //   setDate(date);
  //   hideDatePicker();
  // };

  useEffect(() => {
    navigation.setOptions({
      title: 'Add New Meal',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: Colors.mainBtnscolor,
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
  console.log('arr', selectedDataArr);
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
  const [Hunger, setHunger] = useState([
    {
      id: 1,
      no: 'Stomach',
      color: false,
    },
    {
      id: 2,
      no: 'Head/Mood',
      color: false,
    },
    {
      id: 3,
      no: 'Energy',
      color: false,
    },
    {
      id: 4,
      no: 'Other',
      check: false,
    },
  ]);
  const [checkData, setcheckData] = useState([
    {
      id: 1,
      text1: 'Energized',
      check: false,
    },
    {
      id: 2,
      text1: 'Satisfied',
      check: false,
    },
    {
      id: 3,
      text1: 'Focused',
      check: false,
    },
    {
      id: 4,
      text1: 'Content',
      check: false,
    },
    {
      id: 5,
      text1: 'Bloated',
      check: false,
    },
    {
      id: 5,
      text1: 'Gassy',
      check: false,
    },
    {
      id: 7,
      text1: 'Sluggish',
      check: false,
    },
    {
      id: 8,
      text1: 'Hungry',
      check: false,
    },
    {
      id: 9,
      text1: 'Diarrhea',
      check: false,
    },
    {
      id: 10,
      text1: 'Other',
      check: false,
    },
  ]);
  const [DidFeeling, setDidFeeling] = useState([
    {
      id: 1,
      text1: 'Energized',
      check: false,
    },
    {
      id: 2,
      text1: 'Satisfied',
      check: false,
    },
    {
      id: 3,
      text1: 'Focused',
      check: false,
    },
    {
      id: 4,
      text1: 'Content',
      check: false,
    },
    {
      id: 5,
      text1: 'Bloated',
      check: false,
    },
    {
      id: 5,
      text1: 'Gassy',
      check: false,
    },
    {
      id: 7,
      text1: 'Sluggish',
      check: false,
    },
    {
      id: 8,
      text1: 'Hungry',
      check: false,
    },
    {
      id: 9,
      text1: 'Diarrhea',
      check: false,
    },
    {
      id: 10,
      text1: 'Other',
      check: false,
    },
  ]);
  const [RadbtnData, setRadbtnData] = useState([
    {
      id: 1,
      text1: 'Home',
      check: false,
    },
    {
      id: 2,
      text1: 'Resturant',
      check: false,
    },
    {
      id: 3,
      text1: 'Friends House',
      check: false,
    },
    {
      id: 4,
      text1: 'Work',
      check: false,
    },
    {
      id: 5,
      text1: 'School',
      check: false,
    },
    {
      id: 6,
      text1: 'Other',
      check: false,
    },
  ]);
  const [FoodWithyou, setFoodWithyou] = useState([
    {
      id: 1,
      text1: 'Alone',
      check: false,
    },
    {
      id: 2,
      text1: 'Co-worker',
      check: false,
    },
    {
      id: 3,
      text1: 'Partner',
      check: false,
    },
    {
      id: 4,
      text1: 'Family',
      check: false,
    },
    {
      id: 5,
      text1: 'Parent (s)',
      check: false,
    },
    {
      id: 6,
      text1: 'Sibling (s)',
      check: false,
    },
    {
      id: 7,
      text1: 'Kids',
      check: false,
    },
    {
      id: 8,
      text1: 'Friends',
      check: false,
    },
    {
      id: 9,
      text1: 'Boss',
      check: false,
    },
    {
      id: 10,
      text1: 'Other',
      check: false,
    },
  ]);
  const [Eatingfood, setEatingfood] = useState([
    {
      id: 1,
      text1: 'Computer',
      check: false,
    },
    {
      id: 2,
      text1: 'Phone',
      check: false,
    },
    {
      id: 3,
      text1: 'Television',
      check: false,
    },
    {
      id: 4,
      text1: 'Books',
      check: false,
    },
    {
      id: 5,
      text1: 'Other',
      check: false,
    },
    {
      id: 6,
      text1: 'No',
      check: false,
    },
    // {
    //   id: 5,
    //   text1: 'Standing other',
    //   check: false,
    // },
  ]);
  const [Mindfullnes, setMindfullnes] = useState([
    {
      id: 1,
      text1: 'Distracted',
      check: false,
    },
    {
      id: 2,
      text1: 'Somewhat Focused',
      check: false,
    },
    {
      id: 3,
      text1: 'Zenned Out',
      check: false,
    },
  ]);
  const checkEveryItem = id => {
    for (let i = 0; i < selectedDataArr.length; i++) {
      if (selectedDataArr[i] == id) {
        return true;
      }
    }
  };
  const pickImage = type => {
    type == 'camera'
      ? ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          setImgErr('');
          setExtraState('');
          setShowModal(false);
          setImg(image.path);
        })
      : ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          setImgErr('');
          setShowModal(false);
          setExtraState('');
          setImg(image.path);
        });
  };
  // console.log('arr', selectedDataArr);
  const myModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setShowModal(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: '#00000088',
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            alignItems: 'center',
            paddingVertical: 15,
          }}>
          {/* <Text>abc</Text> */}
          <View
            style={{
              // height: 50,
              marginBottom: 20,
              borderRadius: 10,
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              // backgroundColor: Colors.mainBtnscolor,
            }}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="circle-with-cross" size={25} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => pickImage('camera')}
            style={{
              height: 50,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              width: '90%',
              backgroundColor: Colors.mainBtnscolor,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                // ...titlstyle,
                fontFamily: 'Poppins-Medium',
              }}>
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => pickImage('library')}
            style={{
              height: 50,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              width: '90%',
              backgroundColor: Colors.mainBtnscolor,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                // ...titlstyle,
                fontFamily: 'Poppins-Medium',
              }}>
              Library
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
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
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 16}}>
          <Text
            style={{
              fontSize: 14,
              paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            What did you eat and drink ?
          </Text>
          <View style={styles.inputparentView}>
            <View style={{width: '85%', height: 50}}>
              <TextInput
                returnKeyType="done"
                value={eatDrink}
                onChangeText={text => {
                  setEatDrink(text);
                  eatErr && setEatErr('');
                  extrastate && setExtraState('');
                }}
                placeholderTextColor={'grey'}
                style={{
                  height: 50,
                  color: 'black',
                  backgroundColor: '#fff',
                  paddingLeft: 10,
                  borderWidth: 1,
                  borderColor: eatErr ? 'red' : 'white',
                  fontFamily: 'Poppins-Regular',
                  borderRadius: 6,
                }}
              />
            </View>
            <View
              style={{
                width: '15%',

                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={[
                  styles.camerView,
                  {
                    borderWidth: 1,
                    borderColor: imgErr ? 'red' : Colors.mainBtnscolor,
                  },
                ]}>
                <Image
                  source={require('../../assets/camera-plus_icon.png')}
                  style={{height: 20, width: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* {img ? (
           
          ) : null} */}
          {img ? (
            <>
              <TouchableOpacity
                onPress={() => setImg('')}
                style={{
                  // height: 50,
                  // width: '100%',
                  // position: 'absolute',
                  // bottom: 0,
                  // flexDirection: 'row',
                  // justifyContent: 'flex-end',
                  top: 50,
                  left: 10,
                  zIndex: 2,
                  width: 50,
                  // height: 50,
                  // backgroundColor: 'red',
                }}>
                <Icon name="circle-with-cross" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => pickImage()}
                style={{
                  marginTop: 20,
                  alignItems: 'center',
                  // backgroundColor: 'red',
                  width: '100%',
                }}>
                <Image
                  source={{uri: img}}
                  style={{height: 250, borderRadius: 10, width: '100%'}}
                />
              </TouchableOpacity>
            </>
          ) : null}
          <Text
            style={{
              fontSize: 14,
              marginTop: 10,
              paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            What time did you eat at ?
          </Text>

          <TouchableOpacity
            onPress={() => showDatePicker()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: timeErr ? 'red' : 'white',
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

          {/* <TouchableOpacity
            // onPress={() => showDatePicker()}
            onPress={() => handleConfirm1()}

            style={{
              height: 50,
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: 6,
            }}>

       
            <RNDateTimePicker 
            style={{marginTop:25,marginLeft:10}}
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm1}
          onCancel={hideTimePicker}
          value={new Date()}
        />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
                paddingVertical: 6,
                paddingHorizontal: 12,
              }}>
              {formatedDate ? formatedDate : ''}
            </Text>
          </TouchableOpacity> */}
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
                marginTop: 10,
                fontFamily: 'Poppins-Medium',
              }}>
              Hunger level before eating
            </Text>
            <Text
              onPress={() => navigation.navigate('Hungers')}
              style={{
                color: Colors.mainBtnscolor,
                marginTop: 10,
                fontFamily: 'Poppins-Regular',
              }}>
              Read more
            </Text>
          </View>
          <View
            style={{
              height: 50,
              backgroundColor: '#fff',
              borderRadius: 10,
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
                      setHungerLevel(item.id);
                      const temphandleDatacheck = [...Data];
                      temphandleDatacheck[index].color =
                        !temphandleDatacheck[index].color;
                      setselectedData1(item.id);
                      // setData(temphandleDatacheck)
                    }}
                    key={'index' + index}
                    style={{
                      margin: 4,
                      borderWidth: 1,
                      height: 30,
                      width: 30,
                      left: 8,
                      marginRight: 20,
                      elevation: 4,
                      borderColor: Colors.mainBtnscolor,
                      borderRadius: 20,
                      backgroundColor:
                        selectedData1 === item.id
                          ? Colors.mainBtnscolor
                          : '#fff',
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
          <Text
            style={{
              paddingVertical: 12,
              fontFamily: 'Poppins-Medium',
              top: 10,
            }}>
            Where did you experience hunger ?
          </Text>

          <FlatList
            data={Hunger}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{alignItems: 'center'}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (selectedDataArr.includes(item.id)) {
                      console.log('yes i found it');
                      // let ind = selectedDataArr.findIndex(
                      //   element => element == item.id,
                      // );
                      // console.log('this is index ', ind);
                      // let arr = [];
                      // arr = selectedDataArr.splice(ind, 1);
                      var filterd = selectedDataArr.filter(function (value) {
                        return value != item.id;
                      });
                      console.log('temp', filterd);
                      setSelectedDataArr(filterd);
                    } else {
                      setSelectedDataArr([...selectedDataArr, item.id]);
                    }
                    // for (let i = 0; i < selectedDataArr.length; i++) {
                    //   console.log('What about me');
                    //   if (selectedDataArr[i] != item.id) {
                    //     setSelectedDataArr([...selectedDataArr, item.id]);
                    //   } else {
                    //     console.log('i called');
                    //     let ind = selectedDataArr.findIndex(
                    //       element => element == item.id,
                    //     );
                    //     console.log(`i found at ${selectedDataArr[ind]}`);
                    //     selectedDataArr.splice(ind, 1);
                    //   }
                    // }
                    // setHungerFeel(item.id);
                    // const temphandleDatacheck = [...Hunger];
                    // temphandleDatacheck[index].color =
                    //   !temphandleDatacheck[index].color;
                    //# this is latest
                    // selectedData2 == item.id
                    //   ? setselectedData2()
                    //   : setselectedData2(item.id);
                    //#upper area
                    // setHunger(temphandleDatacheck);
                  }}
                  key={'index' + index}
                  style={{
                    margin: 4,
                    borderWidth: 1,
                    // marginRight: 20,
                    elevation: 4,
                    // marginRight: 20,
                    // elevation: 4,
                    // borderColor: Colors.mainBtnscolor,
                    borderColor: '#008B75',
                    height: 30,
                    width: wp(30),
                    marginBottom: 5,
                    borderRadius: 3,
                    backgroundColor:
                      // selectedData2 === item.id ? Colors.mainBtnscolor : '#fff',
                      checkEveryItem(item.id)
                        ? Colors.mainBtnscolor
                        : Colors.screenBgColor,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingHorizontal: 4,
                      fontFamily: 'Poppins-Regular',
                      color: checkEveryItem(item.id) ? '#fff' : 'black',
                    }}>
                    {item.no}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <View style={{height: 14}} />
          <TextInput
            returnKeyType="done"
            placeholder={'Enter here'}
            placeholderTextColor={'grey'}
            value={fullNote}
            onChangeText={text => setFullNote(text)}
            style={{
              fontFamily: 'Poppins-Regular',
              color: 'black',
              backgroundColor: '#fff',
              borderRadius: 6,
              paddingHorizontal: 12,
              height: 40,
            }}
          />
        </View>
        <View style={{height: 15}} />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            elevation: 2,
            backgroundColor: '#fff',
          }}>
          <Text style={styles.titleText}>Fullness level after eating</Text>
          <FlatList
            data={Data}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{alignItems: 'center', paddingVertical: 6}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setFull(item.id);
                    const temphandleDatacheck = [...Data];
                    temphandleDatacheck[index].color =
                      !temphandleDatacheck[index].color;
                    setselectedData3(item.id);
                    // setData(temphandleDatacheck)
                  }}
                  key={'index' + index}
                  style={{
                    margin: 4,
                    borderWidth: 1,
                    // marginRight: 20,
                    elevation: 4,
                    height: 30,
                    marginRight: 20,
                    left: 8,
                    // elevation: 4,
                    borderColor: Colors.mainBtnscolor,
                    width: 30,
                    borderRadius: 20,
                    backgroundColor:
                      selectedData3 === item.id ? Colors.mainBtnscolor : '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: Platform.OS === 'ios' ? 6 : 0,
                  }}>
                  <Text
                    style={{
                      color: selectedData3 === item.id ? '#fff' : '#008B75',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {item.no}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{height: 15}} />
        <View
          style={{
            paddingHorizontal: 16,
            backgroundColor: 'white',
            elevation: 2,
            marginBottom: 10,
            paddingVertical: 12,
          }}>
          <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14}}>
            How did you feel after eating ?
          </Text>
          <FlatList
            data={checkData}
            numColumns={2}
            // contentContainerStyle={{
            //     alignItems: 'center'
            // }}
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
                  <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
                    {item.text1}
                  </Text>
                </View>
              );
            }}
          />
          <TextInput
            returnKeyType="done"
            placeholder={'Enter here'}
            placeholderTextColor={'grey'}
            value={afterEat}
            onChangeText={text => setAfterEat(text)}
            style={{
              height: 50,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              color: 'black',
              backgroundColor: Colors.bgColor,
              borderRadius: 6,
              paddingHorizontal: 12,
            }}
          />
        </View>
        <View style={{height: 5}} />
        <View
          style={{
            paddingHorizontal: 16,
            backgroundColor: '#fff',
            elevation: 2,
            paddingVertical: 12,
          }}>
          <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14}}>
            Were you engaged in another activity while eating ?
          </Text>
          <FlatList
            data={Eatingfood}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <View>
                  <View
                    style={{
                      // width: 120,
                      // flexDirection: 'row',
                      // alignItems: 'center',
                      right: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                      // right: 18,
                      width: 150,
                      // backgroundColor:'red'
                    }}>
                    {/* <RadioButton
                    value={item.id}
                    color={radiobtn1 == item.id ? Colors.mainBtnscolor : '#fff'}
                    uncheckedColor={Colors.mainBtnscolor}
                    status={radiobtn1 == item.id ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setRadiobtn1(item.id);
                      const temphandleDatacheck = [...RadbtnData];
                      temphandleDatacheck[index].check = !temphandleDatacheck[
                        index
                      ].check;
                      setRadbtnData(temphandleDatacheck);
                    }}
                  /> */}

                    <CheckBox
                      checked={item.check}
                      checkedColor={Colors.mainBtnscolor}
                      uncheckedColor={Colors.mainBtnscolor}
                      onPress={() => {
                        const temphandleDatacheck = [...Eatingfood];
                        temphandleDatacheck[index].check =
                          !temphandleDatacheck[index].check;
                        setEatingfood(temphandleDatacheck);
                      }}
                    />

                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
                      {item.text1}
                    </Text>
                  </View>
                  {/* <Text>Ather</Text> */}
                </View>
              );
            }}
          />
          <TextInput
            returnKeyType="done"
            placeholder={'Enter here'}
            placeholderTextColor={'grey'}
            value={loc}
            onChangeText={text => setLoc(text)}
            style={{
              height: 50,
              color: 'black',
              backgroundColor: Colors.bgColor,
              borderRadius: 6,
              fontFamily: 'Poppins-Regular',
              paddingHorizontal: 12,
              fontSize: 14,
            }}
          />
        </View>

        <View style={{height: 15}} />
        <View
          style={{
            paddingHorizontal: 16,
            backgroundColor: '#fff',
            paddingVertical: 12,
            elevation: 2,
          }}>
          <Text
            style={{
              fontSize: 14,
              // paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            Who were you with?
          </Text>
          <FlatList
            data={FoodWithyou}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    right: 6,
                    width: 140,
                  }}>
                  {/* <RadioButton
                    value={item.id}
                    color={radiobtn2 == item.id ? Colors.mainBtnscolor : '#fff'}
                    uncheckedColor={Colors.mainBtnscolor}
                    status={radiobtn2 == item.id ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setRadiobtn2(item.id);
                      const temphandleDatacheck = [...FoodWithyou];
                      temphandleDatacheck[index].check = !temphandleDatacheck[
                        index
                      ].check;
                      setFoodWithyou(temphandleDatacheck);
                    }}
                  /> */}

                  <CheckBox
                    checked={item.check}
                    checkedColor={Colors.mainBtnscolor}
                    uncheckedColor={Colors.mainBtnscolor}
                    onPress={() => {
                      const temphandleDatacheck = [...FoodWithyou];
                      temphandleDatacheck[index].check =
                        !temphandleDatacheck[index].check;
                      setFoodWithyou(temphandleDatacheck);
                    }}
                  />
                  <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
                    {item.text1}
                  </Text>
                </View>
              );
            }}
          />
          {/* <TextInput
                        placeholder={'Enter here'}
                        style={{
                            height: 50,
                            backgroundColor: Colors.bgColor,
                            borderRadius: 6,
                            paddingHorizontal: 12
                        }}
                    /> */}
        </View>

        <View style={{height: 15}} />
        {/* <View
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
            Were you engaged in another activity while eating ????
          </Text>
          <FlatList
            data={Eatingfood}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    right: 6,
                  }}>
                  {/* <RadioButton
                    value={item.id}
                    color={radiobtn3 == item.id ? Colors.mainBtnscolor : '#fff'}
                    uncheckedColor={Colors.mainBtnscolor}
                    status={radiobtn3 == item.id ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setRadiobtn3(item.id);
                      const temphandleDatacheck = [...Eatinffood];
                      temphandleDatacheck[index].check = !temphandleDatacheck[
                        index
                      ].check;
                      setEatingfood(temphandleDatacheck);
                    }}
                  /> */}
        {/* 
                  <CheckBox
                    checked={item.check}
                    checkedColor={Colors.mainBtnscolor}
                    uncheckedColor={Colors.mainBtnscolor}
                    onPress={() => {
                      const temphandleDatacheck = [...Eatingfood];
                      temphandleDatacheck[index].check = !temphandleDatacheck[
                        index
                      ].check;
                      setEatingfood(temphandleDatacheck);
                    }}
                  />
                  <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
                    {item.text1}
                  </Text>
                </View>
              );
            }}
          />
               <TextInput
            placeholder={'Enter here'}
            placeholderTextColor={'grey'}
            value={texteng}
            onChangeText={text => settexteng(text)}
            style={{
              height: 50,
              color: 'black',
              backgroundColor: Colors.bgColor,
              borderRadius: 6,
              fontFamily: 'Poppins-Regular',
              paddingHorizontal: 12,
              fontSize: 14,
            }}
          />
        </View>  */}

        <View style={{height: 15}} />
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
            Mindfulness level
          </Text>
          <FlatList
            data={Mindfullnes}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    right: 6,
                  }}>
                  <CheckBox
                    checked={item.check}
                    checkedColor={Colors.mainBtnscolor}
                    uncheckedColor={Colors.mainBtnscolor}
                    onPress={() => {
                      const temphandleDatacheck = [...Mindfullnes];
                      temphandleDatacheck[index].check =
                        !temphandleDatacheck[index].check;
                      setMindfullnes(temphandleDatacheck);
                    }}
                  />
                  <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
                    {item.text1}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        {/* How did you feel between 2-3 hours */}

        <View style={{height: 15}} />
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
            How did you feel 2-3 hours after eating ?
          </Text>
          <FlatList
            data={DidFeeling}
            numColumns={2}
            // contentContainerStyle={{
            //     alignItems: 'center'
            // }}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: 150,
                    flexDirection: 'row',
                    // backgroundColor: 'blue',
                    alignItems: 'center',
                    right: 18,
                  }}>
                  <CheckBox
                    checked={item.check}
                    checkedColor={Colors.mainBtnscolor}
                    uncheckedColor={Colors.mainBtnscolor}
                    onPress={() => {
                      const temphandleDatacheck = [...DidFeeling];
                      temphandleDatacheck[index].check =
                        !temphandleDatacheck[index].check;
                      setDidFeeling(temphandleDatacheck);
                    }}
                  />
                  <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
                    {item.text1}
                  </Text>
                </View>
              );
            }}
          />
          <TextInput
            returnKeyType="done"
            placeholder={'Enter here'}
            placeholderTextColor={'#ccc'}
            value={feelNote}
            onChangeText={text => setFeelNote(text)}
            multiline={true}
            style={{
              height: 50,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              backgroundColor: Colors.bgColor,
              color: 'black',
              borderRadius: 6,
              paddingHorizontal: 12,
              justifyContent: 'center',
            }}
          />
        </View>
        <View style={{height: 15}} />
        <View
          style={{
            backgroundColor: '#fff',
            marginBottom: 20,
            elevation: 2,
            paddingHorizontal: 16,
            paddingBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 14,
              paddingVertical: 6,
              elevation: 2,
              fontFamily: 'Poppins-Medium',
            }}>
            Note
          </Text>
          <TextInput
            returnKeyType="done"
            placeholder={'Write notes'}
            placeholderTextColor={'#ccc'}
            value={mainNote}
            onChangeText={text => setMainNote(text)}
            multiline={true}
            style={{
              height: 40,
              color: 'black',
              fontFamily: 'Poppins-Regular',
              backgroundColor: Colors.bgColor,
              borderRadius: 6,
              fontSize: 14,
              paddingHorizontal: 12,
              justifyContent: 'center',
              alignContent: 'center',
            }}
          />
        </View>
        {myModal()}
        {loaderModal()}
      </ScrollView>
      <View style={{justifyContent: 'center', marginLeft: 20, marginRight: 20}}>
        <Text style={{color: 'red', marginVertical: 5}}>{extrastate}</Text>
        <Button
          onPress={() => {
            const data1 = new FormData();
            data1.append('title', eatDrink);
            data1.append('meal_category_id', id);
            {
              img
                ? data1.append('image', {
                    uri: img,
                    type: 'image/jpeg',
                    name: 'image' + new Date() + '.jpg',
                  })
                : null;
            }

            data1.append('time', formatedDate);
            data1.append('activity_on_eat_note', loc);

            data1.append('hunger_level', hungerLevel);
            // data1.append('hunger_experience', hungerFeel);
            selectedDataArr.forEach(item => {
              data1.append('hunger_experience[]', item);
            });
            data1.append('feel_after_eat_note', afterEat);
            data1.append('hunger_experience_note', fullNote);
            data1.append('fullness_level', Full);
            checkData.forEach(item => {
              item.check == true &&
                data1.append('feel_after_eat[]', item.text1);
            });
            Mindfullnes.forEach(item => {
              item.check == true &&
                data1.append('mindfullness_attributes[]', item.text1);
            });
            data1.append(
              'mindfulness_level',
              Mindfullnes[2].check == true
                ? 9
                : Mindfullnes[1].check == true
                ? 6
                : Mindfullnes[0].check == true
                ? 3
                : null,
            );
            FoodWithyou.forEach(item => {
              item.check == true && data1.append('with_you_eat[]', item.text1);
            });
            Eatingfood.forEach(item => {
              item.check == true &&
                data1.append('activity_on_eat[]', item.text1);
            });

            // data1.append('feel_after_eat_note', afterEat);
            data1.append('eat_location', radiobtn1);
            data1.append('eat_location_note', loc);
            // data1.append('with_you_eat', radiobtn2);
            // data1.append('activity_on_eat', radiobtn3);
            // data1.append('mindfulness_level', radiobtn4);
            DidFeeling.forEach(item => {
              item.check == true &&
                data1.append('feel_after_two_eat[]', item.text1);
            });
            data1.append('feel_after_two_eat_note', feelNote);
            data1.append('meal_note', mainNote);
            if (eatDrink && formatedDate) {
              setLoaderVisible(true);
              addMeal({Auth: user.userdata.api_token}, data1).then(res => {
                console.log('sp', res);
                if (res) {
                  setLoaderVisible(false);
                  navigation.goBack();
                } else {
                  Alert.alert('Something went wrong');
                  setLoaderVisible(false);
                }
              });
            } else {
              if (!eatDrink && !formatedDate) {
                setEatErr('asd');
                // setImgErr('asd');
                setExtraState('Something is missing');
                setTimeErr('asd');
              } else if (!eatDrink) {
                setExtraState('Something is missing');

                setEatErr('asd');
              } else if (!formatedDate) {
                setExtraState('Something is missing');

                setTimeErr('asd');
              }
            }
            //
          }}
          title={'Submit'}
          // style={{borderRadius: 0, height: 80}}
        />
        {keyboardStatus && <View style={{height: 200}} />}
      </View>
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default AddFoodscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    backgroundColor: Colors.screenBgColor,
    paddingBottom: 20,
  },
  inputparentView: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  camerView: {
    height: 40,
    width: 40,
    backgroundColor: Colors.mainBtnscolor,
    alignItems: 'center',
    justifyContent: 'center',
    left: 5,
    borderRadius: 10,
  },
});
