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
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {addWater, addMeal} from '../../lib/api';
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
import Icons from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector, useDispatch} from 'react-redux';
const AddWater = ({navigation, route}) => {
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
  const [radio, setRadio] = useState('');
  const [selectedDataArr, setSelectedDataArr] = useState([]);
  const [selectedData3, setselectedData3] = useState();
  const [eatDrink, setEatDrink] = useState('');
  const [quantity, setQuantity] = useState('');
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
  const [date, setDate] = useState('');
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
    var time = new Date();
    // console.log('oh', date.getHours());
    setCheck(date.getHours());
    // console.log(time.toLocaleString('en-US', {hour: 'numeric', hour12: false}));
    const mom1 = moment(currentDate).format('hh:mm');
    const mom = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    // console.log('timeeeeeee', mom);
    // console.log('fjfj', moment().format('YYYY-MM-DD hh:mm:ss'));
    setFormatedDate(mom);
    setDate(moment(date).format('HH:mm:ss'));
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
      title: 'Add New water',
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
  //   console.log('arr', selectedDataArr);
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
            What did you drink ?
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
            What time did you drink at ?
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
              {date ? date : 'Select time'}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              marginTop: 10,
              paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
            }}>
            How much water did you drink ?
          </Text>
          <View
            style={{
              backgroundColor: '#F8F8F6',
              borderRadius: 6,
              //   borderWidth: 1,
              paddingHorizontal: 12,
            }}>
            <View
              // onPress={() => showDatePicker()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                //   borderColor: timeErr ? 'red' : 'white',

                height: 50,
                justifyContent: 'space-between',
              }}>
              {['Cups', 'Oz', 'Liters'].map(item => (
                <TouchableOpacity
                  onPress={() => setRadio(item)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icons
                    name={radio == item ? 'check-circle' : 'circle-o'}
                    size={20}
                    color={Colors.mainBtnscolor}
                  />
                  <Text style={{marginLeft: 10}}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              placeholder={'Enter quantity'}
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              returnKeyType={'done'}
              style={{
                height: 50,
                backgroundColor: '#F8F8F6',
                color: 'black',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.5,
                shadowRadius: 2,
                paddingLeft: 10,
                borderRadius: 5,
              }}
              value={quantity}
              onChangeText={text => setQuantity(text)}
            />
          </View>
        </View>

        {myModal()}
      </ScrollView>
      <View style={{justifyContent: 'center', marginLeft: 20, marginRight: 20}}>
        <Text style={{color: 'red', marginVertical: 5}}>{extrastate}</Text>
        <Button
          onPress={() => {
            const data1 = new FormData();
            data1.append('drink_name', eatDrink);
            data1.append('meal_category_id', id);
            {
              img
                ? data1.append('image', {
                    uri: img,
                    type: 'image/jpeg',
                    name: 'image' + new Date() + '.jpg',
                  })
                : data1.append('image', {
                    uri: 'https://reactjs.org/logo-og.png',
                    type: 'image/jpeg',
                    name: 'image' + new Date() + '.jpg',
                  });
            }

            data1.append('time', formatedDate);

            data1.append('amount_type', radio);

            data1.append('amount', quantity);

            if (eatDrink) {
              addWater({Auth: user.userdata.api_token}, data1).then(res => {
                console.log('sp', res);
                if (res) {
                  navigation.goBack();
                }
              });
            } else {
              if (!eatDrink) {
                setEatErr('asd');
                // setImgErr('asd');
                // setExtraState('Something is missing');
                // setTimeErr('asd');
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

export default AddWater;

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
