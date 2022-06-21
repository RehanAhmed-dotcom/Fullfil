import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  Modal,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {addWater} from '../../lib/api';
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
const EditFoodscreen = ({navigation, route}) => {
  const {item} = route.params;
  console.log('item', item);
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

  const [quantity, setQuantity] = useState(item.amount);
  const [radio, setRadio] = useState(item.amount_type);
  const [selectedData1, setselectedData1] = useState(item.hunger_level);
  const [timex, setTimex] = useState(' ');
  const [showModal, setShowModal] = useState(false);
  const [formatDate, setFormatDate] = useState(' ');
  const [formatTime, setFormatTime] = useState(' ');
  const [selectedData2, setselectedData2] = useState();
  const [selectedDataArr, setSelectedDataArr] = useState(
    item.hunger_experience,
  );
  const [selectedData3, setselectedData3] = useState(item.fullness_level);
  const [eatDrink, setEatDrink] = useState(item.drink_name);
  const [time, setTime] = useState('');
  const [img, setImg] = useState(item.image);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {userData: user} = useSelector(({USER}) => USER);
  const [radiobtn1, setRadiobtn1] = useState('');
  const [radiobtn2, setRadiobtn2] = useState('');
  const [radiobtn3, setRadiobtn3] = useState('');
  const [radiobtn4, setRadiobtn4] = useState('');
  const [formatedDate, setFormatedDate] = useState(item.time);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [date, setDate] = useState(Date.now());
  const [hungerLevel, setHungerLevel] = useState('');
  const [fullNote, setFullNote] = useState(item.hunger_experience_note);
  const [hungerFeel, setHungerFeel] = useState('');
  const [Full, setFull] = useState('');
  const [feelNote, setFeelNote] = useState(item.feel_after_two_eat_note);
  const [mainNote, setMainNote] = useState(item.meal_note);
  const [afterEat, setAfterEat] = useState(item.feel_after_eat_note);
  const [check, setCheck] = useState('');
  const [loc, setLoc] = useState(item.activity_on_eat_note);
  console.log('data', selectedData2);
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
    const mom1 = moment(currentDate).format('hh:mm');
    const mom = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    console.log('timeeeeeee', mom);
    console.log('fjfj', moment().format('YYYY-MM-DD hh:mm:ss'));
    setFormatedDate(mom);
    setDate(moment(date).format('HH:mm:ss a'));
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
      title: 'Edit Meal',
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
  // console.log(id);
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
      text1: 'Strong',
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
      text1: 'Strong',
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
      text1: 'Parents',
      check: false,
    },
    {
      id: 6,
      text1: 'Siblings',
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
  useEffect(() => {
    for (let i = 0; i < item.feel_after_eat?.length; i++) {
      const ind = checkData.findIndex(
        element => element.text1 == item.feel_after_eat[i],
      );
      const findItem = checkData[ind];
      const newItem = {
        ...findItem,
        check: true,
      };
      checkData[ind] = newItem;
      setcheckData([...checkData]);
      console.log('check', [...checkData]);
    }
    for (let i = 0; i < item.mindfullness_attributes?.length; i++) {
      const indi = Mindfullnes.findIndex(
        element => element.text1 == item.mindfullness_attributes[i],
      );
      const findItem = Mindfullnes[indi];
      const newItem = {
        ...findItem,
        check: true,
      };
      Mindfullnes[indi] = newItem;
      setMindfullnes([...Mindfullnes]);
      // setMindfullnes([...Mindfullnes, (Mindfullnes[indi].check = true)]);
    }
    for (let i = 0; i < item.activity_on_eat?.length; i++) {
      const indix = Eatingfood.findIndex(
        element => element.text1 == item.activity_on_eat[i],
      );
      const findItem = Eatingfood[indix];
      const newItem = {
        ...findItem,
        check: true,
      };
      Eatingfood[indix] = newItem;
      setEatingfood([...Eatingfood]);
      // setEatingfood([...Eatingfood, (Eatingfood[indix].check = true)]);
    }
    for (let i = 0; i < item.with_you_eat?.length; i++) {
      const indixi = FoodWithyou.findIndex(
        element => element.text1 == item.with_you_eat[i],
      );
      const findItem = FoodWithyou[indixi];
      const newItem = {
        ...findItem,
        check: true,
      };
      FoodWithyou[indixi] = newItem;
      setFoodWithyou([...FoodWithyou]);
      // setFoodWithyou([...FoodWithyou, (FoodWithyou[indixi].check = true)]);
    }
    for (let i = 0; i < item.feel_after_two_eat?.length; i++) {
      const indixn = DidFeeling.findIndex(
        element => element.text1 == item.feel_after_two_eat[i],
      );
      const findItem = DidFeeling[indixn];
      const newItem = {
        ...findItem,
        check: true,
      };
      DidFeeling[indixn] = newItem;
      setDidFeeling([...DidFeeling]);
      // setDidFeeling([...DidFeeling, (DidFeeling[indixn].check = true)]);
    }
  }, []);
  const checkEveryItem = id => {
    for (let i = 0; i < selectedDataArr?.length; i++) {
      if (selectedDataArr[i] == id) {
        return true;
      }
    }
  };
  // const pickImage = () => {
  // //   ImagePicker.openPicker({
  // //     width: 300,
  // //     height: 400,
  // //     cropping: true,
  // //   }).then(image => {
  // //     setImg(image.path);
  // //   });
  // // };
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
  console.log('arrsjdlkfjsdlk;fjslkjfsdj', selectedData1);
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
                onChangeText={text => setEatDrink(text)}
                placeholderTextColor={'grey'}
                style={{
                  height: 50,
                  color: 'black',
                  paddingLeft: 10,
                  backgroundColor: '#fff',
                  fontFamily: 'Poppins-Regular',
                  borderRadius: 6,
                }}
              />
            </View>
            <View style={{width: '15%', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={styles.camerView}>
                <Image
                  source={require('../../assets/camera-plus_icon.png')}
                  style={{height: 20, width: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>
          {img ? (
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
        </View>

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

        {myModal()}
      </ScrollView>
      <View style={{justifyContent: 'center', marginLeft: 20, marginRight: 20}}>
        <Button
          onPress={() => {
            const data1 = new FormData();
            data1.append('drink_name', eatDrink);
            data1.append('water_id', item.id);
            data1.append('image', {
              uri: img,
              type: 'image/jpeg',
              name: 'image' + new Date() + '.jpg',
            });
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
              Alert.alert('Must add what u eat or drink');
            }
            //
          }}
          title={'Submit'}
          // style={{borderRadius: 0, height: 80}}
        />
      </View>
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default EditFoodscreen;

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
