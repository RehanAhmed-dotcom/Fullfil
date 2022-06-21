import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
// import {BarChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';
import {Card} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Colors from '../constants/colors';
import moment from 'moment';
import ProgressCircle from 'react-native-progress-circle';
import {BarChart} from 'react-native-chart-kit';
import {
  addNote,
  viewNote,
  getSleep,
  getweeklyAverage,
  getweeklySleep,
} from '../lib/api';
import Icon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome';
import AddIcon from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const Sleepscreen = ({navigation}) => {
  const [vis, setVis] = useState(false);
  const [vis3, setVis3] = useState(false);
  const [date, setDate] = useState('');

  const [formatedDate, setFormatedDate] = useState(
    moment().format('MM-DD-YY HH:mm'),
  );
  const [sleepProgress, setSleepProgress] = useState('');
  const [sleepProgressWeekly, setSleepProgressWeekly] = useState([]);
  const {userData: user} = useSelector(({USER}) => USER);
  const [notes, setNotes] = useState([]);
  const [sleep, setsleep] = useState([]);
  const [average, setAverage] = useState('');
  const [aveArr, setAveArr] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [addsleep, setaddsleep] = useState('');
  const [last, setLast] = useState('');
  const [addnote, setAddnote] = useState('');
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: Colors.bgColor,
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('historySleep')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginRight: 16,
              backgroundColor: Colors.mainBtnscolor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icons name="history" color="white" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddSleep')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginRight: 16,
              backgroundColor: Colors.mainBtnscolor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon1 name="plus" color="white" size={20} />
          </TouchableOpacity>
          {/* <Image
            source={require('../assets/music_icon.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginRight: 16,
            }}
          /> */}
        </View>
      ),
    });
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewNote({Auth: user.userdata.api_token}).then(res => {
        setNotes(res.data);
      });
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getSleep({Auth: user.userdata.api_token}).then(res => {
        console.log('r', res);
        if (res) {
          setSleepProgress(res.percentage);
        } else {
          setSleepProgress(0);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getweeklySleep({Auth: user.userdata.api_token}).then(res => {
        console.log('rr', res);
        if (res) {
          setSleepProgressWeekly(res.weekly_sleep);
          setLast(res.last_night);
        } else {
          setLast(0);
          setSleepProgressWeekly([
            {day: 'muesday', hunger_level: '0', sleep_hour: 0},
          ]);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getweeklyAverage({Auth: user.userdata.api_token}).then(res => {
        console.log('rrr', res);
        if (res) {
          setAverage(res.weekly_sleep_average);
          setAveArr(res.weekly_sleep_average_graph);
        } else {
          setAveArr([{day: 'monday', hunger_level: '0', sleep_quality: 0}]);
          setAverage(0);
        }
        // setSleepProgressWeekly(res.weekly_sleep);
        // setLast(res.last_night);
      });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    viewNote({Auth: user.userdata.api_token}).then(res => {
      setNotes(res.data);
    });
  }, [vis]);
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [80, 90, 60, 10, 70, 80, 100],
      },
    ],
  };
  const checkDay = payload => {
    for (let i = 0; i < sleepProgressWeekly.length; i++) {
      // console.log('here', sleepProgressWeekly[i]);
      if (sleepProgressWeekly[i]?.day == payload) {
        // console.log('monday', sleepProgressWeekly[i]);
        return sleepProgressWeekly[i]?.sleep_hour;
      }
    }
  };
  const checkDays = payload => {
    for (let i = 0; i < sleepProgressWeekly.length; i++) {
      // console.log('here', sleepProgressWeekly[i]);
      if (sleepProgressWeekly[i]?.day == payload) {
        // console.log('monday', sleepProgressWeekly[i]);
        return true;
      }
    }
  };
  const checkWeekly = payload => {
    for (let i = 0; i < aveArr.length; i++) {
      // console.log('here', sleepProgressWeekly[i]);
      if (aveArr[i]?.day == payload) {
        // console.log('monday', sleepProgressWeekly[i]);
        return aveArr[i]?.sleep_quality;
      }
    }
  };
  const handleConfirm = date => {
    console.log('date', moment(date).format('MM-DD-YY HH:mm'));
    // setDate(moment(date).format('DD/MM/yy'));
    setFormatedDate(moment(date).format('MM-DD-YY HH:mm'));
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  console.log('week day check', checkDay('Tuesday'));
  const myModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {
          setVis(!vis);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000088',
          }}>
          <View
            style={{
              height: 400,
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
                // backgroundColor: 'red',
                right: 10,
                marginTop: 10,
              }}>
              <Icon
                name="circle-with-cross"
                size={20}
                onPress={() => setVis(!vis)}
              />
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Add Notes</Text>
              <View
                style={{
                  borderColor: 'black',
                  marginTop: 20,
                  backgroundColor: '#ccc',
                  width: '90%',
                  borderRadius: 10,
                  height: 50,
                  // backgroundColor:'red'
                }}>
                <TextInput
                  // numberOfLines={10}
                  returnKeyType="done"
                  textAlignVertical="top"
                  placeholderTextColor="grey"
                  placeholder={'Enter notes here'}
                  // multiline={true}
                  // value={addnote}
                  onChangeText={text => {
                    setAddnote(text);
                  }}
                  // multiline
                  style={{
                    borderColor: 'black',
                    paddingLeft: 10,
                    color: 'black',
                    // width: '80%',

                    paddingTop: 5,
                    height: 50,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => showDatePicker()}
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 50,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 2,
                  paddingHorizontal: 10,
                  width: '90%',
                  marginTop: 10,
                }}>
                <Text>{formatedDate ? formatedDate : 'Date'}</Text>
                {/* <Icon1
                  name="calendar-month"
                  size={20}
                  color={Colors.mainBtnscolor}
                /> */}
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  // minimumDate={new Date(currentY, currentM, currentD)}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: '20%',
                  // paddingBottom: 20,

                  paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    addnote &&
                      addNote({
                        Auth: user.userdata.api_token,
                        note: addnote,
                        time: formatedDate,
                      }).then(res => {
                        console.log('res', res);
                        if (res) {
                          setVis(!vis);
                        } else {
                          Alert.alert('Some thing went wrong');
                        }
                      });
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderRadius: 15,
                    width: '45%',
                    backgroundColor: '#008B75',
                  }}>
                  <Text style={{color: 'white'}}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVis(!vis);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderRadius: 15,
                    width: '45%',
                    backgroundColor: 'grey',
                  }}>
                  <Text style={{color: 'white'}}> Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  console.log('Mondayyyyyyyy', sleepProgress);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          onPress={() => console.log('msdlkfjs', checkDay('Monday'))}
          style={{fontSize: 16, fontFamily: 'Poppins-SemiBold'}}>
          Welcome {user.userdata.username}
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
              marginTop: Platform.OS === 'ios' ? 8 : 0,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginTop: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Card
            style={{
              height: 170,
              backgroundColor: '#EEF6F5',
              width: 150,
              //   paddingBottom: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 6,
                paddingHorizontal: 12,
              }}>
              <Image
                source={require('../assets/hour-split_icon.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 6,
                  color: '#008B75',
                  fontFamily: 'Poppins-Medium',
                }}>
                Hours Slept
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                // height: '40%',
                // backgroundColor: 'red',
                marginTop: 10,
                top: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: 'grey',
                  justifyContent: 'space-around',
                  width: '80%',
                  height: 60,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    // justifyContent: 'flex-end',
                    height: '100%',
                    // width: 4,
                    marginBottom: 5,
                    // backgroundColor: 'red',
                  }}>
                  <View style={{height: 50, justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 10, bottom: 8}}>24</Text>
                    <Text style={{fontSize: 10}}>0</Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                    // backgroundColor: 'red',
                  }}>
                  <View
                    style={{
                      height:
                        // console.log("Monday",checkDay("Monday")),
                        // 50,
                        checkDay('Monday') == '10' || checkDay('Monday') == '9'
                          ? 50
                          : checkDay('Monday') == '8' ||
                            checkDay('Monday') == '7'
                          ? 40
                          : checkDay('Monday') == '6' ||
                            checkDay('Monday') == '5'
                          ? 30
                          : checkDay('Monday') == '4' ||
                            checkDay('Monday') == '3'
                          ? 20
                          : checkDay('Monday') == '2' ||
                            checkDay('Monday') == '1'
                          ? 10
                          : 50,
                      borderRadius: 10,
                      marginBottom: 5,
                      backgroundColor: checkDays('Monday')
                        ? Colors.mainBtnscolor
                        : 'grey',
                      width: 6,
                    }}
                  />
                  <Text style={{fontSize: 10}}>M</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                  }}>
                  <View
                    style={{
                      height:
                        checkDay('Tuesday') == '10' ||
                        checkDay('Tuesday') == '9'
                          ? 50
                          : checkDay('Tuesday') == '8' ||
                            checkDay('Tuesday') == '7'
                          ? 40
                          : checkDay('Tuesday') == '6' ||
                            checkDay('Tuesday') == '5'
                          ? 30
                          : checkDay('Tuesday') == '4' ||
                            checkDay('Tuesday') == '3'
                          ? 20
                          : checkDay('Tuesday') == '2' ||
                            checkDay('Tuesday') == '1'
                          ? 10
                          : 50,
                      borderRadius: 10,
                      marginBottom: 5,
                      backgroundColor: checkDays('Tuesday')
                        ? Colors.mainBtnscolor
                        : 'grey',
                      width: 6,
                    }}
                  />
                  <Text style={{fontSize: 10}}>T</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                  }}>
                  <View
                    style={{
                      height:
                        checkDay('Wednesday') == '10' ||
                        checkDay('Wednesday') == '9'
                          ? 50
                          : checkDay('Wednesday') == '8' ||
                            checkDay('Wednesday') == '7'
                          ? 40
                          : checkDay('Wednesday') == '6' ||
                            checkDay('Wednesday') == '5'
                          ? 30
                          : checkDay('Wednesday') == '4' ||
                            checkDay('Wednesday') == '3'
                          ? 20
                          : checkDay('Wednesday') == '2' ||
                            checkDay('Wednesday') == '1'
                          ? 10
                          : 50,
                      borderRadius: 10,
                      marginBottom: 5,
                      backgroundColor: checkDays('Wednesday')
                        ? Colors.mainBtnscolor
                        : 'grey',
                      width: 6,
                    }}
                  />
                  <Text style={{fontSize: 10}}>W</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                  }}>
                  <View
                    style={{
                      height:
                        checkDay('Thursday') == '10' ||
                        checkDay('Thursday') == '9'
                          ? 50
                          : checkDay('Thursday') == '8' ||
                            checkDay('Thursday') == '7'
                          ? 40
                          : checkDay('Thursday') == '6' ||
                            checkDay('Thursday') == '5'
                          ? 30
                          : checkDay('Thursday') == '4' ||
                            checkDay('Thursday') == '3'
                          ? 20
                          : checkDay('Thursday') == '2' ||
                            checkDay('Thursday') == '1'
                          ? 10
                          : 50,
                      borderRadius: 10,
                      marginBottom: 5,
                      backgroundColor: checkDays('Thursday')
                        ? Colors.mainBtnscolor
                        : 'grey',
                      width: 6,
                    }}
                  />
                  <Text style={{fontSize: 10}}>T</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                  }}>
                  <View
                    style={{
                      height:
                        checkDay('Friday') == '10' || checkDay('Friday') == '9'
                          ? 50
                          : checkDay('Friday') == '8' ||
                            checkDay('Friday') == '7'
                          ? 40
                          : checkDay('Friday') == '6' ||
                            checkDay('Friday') == '5'
                          ? 30
                          : checkDay('Friday') == '4' ||
                            checkDay('Friday') == '3'
                          ? 20
                          : checkDay('Friday') == '2' ||
                            checkDay('Friday') == '1'
                          ? 10
                          : 50,
                      borderRadius: 10,
                      marginBottom: 5,
                      backgroundColor: checkDays('Friday')
                        ? Colors.mainBtnscolor
                        : 'grey',
                      width: 6,
                    }}
                  />
                  <Text style={{fontSize: 10}}>F</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                  }}>
                  <View
                    style={{
                      height:
                        checkDay('Saturday') == '10' ||
                        checkDay('Saturday') == '9'
                          ? 50
                          : checkDay('Saturday') == '8' ||
                            checkDay('Saturday') == '7'
                          ? 40
                          : checkDay('Saturday') == '6' ||
                            checkDay('Saturday') == '5'
                          ? 30
                          : checkDay('Saturday') == '4' ||
                            checkDay('Saturday') == '3'
                          ? 20
                          : checkDay('Saturday') == '2' ||
                            checkDay('Saturday') == '1'
                          ? 10
                          : 50,
                      borderRadius: 10,
                      marginBottom: 5,
                      backgroundColor: checkDays('Saturday')
                        ? Colors.mainBtnscolor
                        : 'grey',
                      width: 6,
                    }}
                  />
                  <Text style={{fontSize: 10}}>S</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                  }}>
                  <View
                    style={{
                      height:
                        checkDay('Sunday') == '10' || checkDay('Sunday') == '9'
                          ? 50
                          : checkDay('Sunday') == '8' ||
                            checkDay('Sunday') == '7'
                          ? 40
                          : checkDay('Sunday') == '6' ||
                            checkDay('Sunday') == '5'
                          ? 30
                          : checkDay('Sunday') == '4' ||
                            checkDay('Sunday') == '3'
                          ? 20
                          : checkDay('Sunday') == '2' ||
                            checkDay('Sunday') == '1'
                          ? 10
                          : 50,
                      marginBottom: 5,
                      borderRadius: 10,
                      backgroundColor: checkDays('Sunday')
                        ? Colors.mainBtnscolor
                        : 'grey',
                      width: 6,
                    }}
                  />
                  <Text style={{fontSize: 10}}>S</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                // paddingVertical: -,
                // bottom: 2,
                marginTop: 24,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.mainBtnscolor,
                  fontFamily: 'Poppins-Regular',
                }}>
                {last ? last : 0} Hours
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  bottom: 5,
                }}>
                Last night
              </Text>
              <View style={{height: 10}}></View>
            </View>
          </Card>
          <Card
            style={{
              height: 170,
              backgroundColor: '#EEF6F5',
              width: 150,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 4,
              }}>
              <Image
                source={require('../assets/sleep_icon_active.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#00875B',
                  fontSize: 14,
                }}>
                Sleep Quality
              </Text>
            </View>
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <ProgressCircle
                percent={sleepProgress}
                radius={40}
                borderWidth={8}
                di
                color={Colors.mainBtnscolor}
                shadowColor="#CAE3D3"
                bgColor="#EEF6F5">
                <Text
                  style={{
                    fontSize: 14,
                    color: '#008B75',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  {sleepProgress ? sleepProgress : 0}%
                </Text>
                <Text style={{fontFamily: 'Poppins-Medium', color: '#008B75'}}>
                  Score
                </Text>
              </ProgressCircle>
            </View>
            <View style={{paddingHorizontal: 16, bottom: 5}}>
              <Text
                style={{
                  color: Colors.mainBtnscolor,
                  fontFamily: 'Poppins-Regular',
                }}>
                {sleepProgress == '100' || sleepProgress == '90'
                  ? 'Excellent'
                  : sleepProgress == '80' || sleepProgress == '70'
                  ? 'Very Good'
                  : sleepProgress == '60' || sleepProgress == '50'
                  ? 'Good'
                  : sleepProgress == '40' || sleepProgress == '30'
                  ? 'Fair'
                  : sleepProgress == '20' || sleepProgress == '10'
                  ? 'Poor'
                  : ''}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  bottom: 5,
                }}>
                Last night
              </Text>
            </View>
          </Card>
        </View>
        <Card style={{height: 250}}>
          <View
            style={{
              height: 250,
              paddingHorizontal: 16,
              // alignItems: 'center',
              // justifyContent: 'center',
              // backgroundColor:'yellow'
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 6,
                paddingHorizontal: 12,
                // backgroundColor:'green',
                height: 70,
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/hour-split_icon.png')}
                    style={{height: 18, width: 18, resizeMode: 'contain'}}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      marginLeft: 8,
                      color: '#008B75',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Average Sleep Quality
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    width: 125,
                  }}>
                  <Text style={{fontFamily: 'Poppins-Medium'}}>Last Week</Text>
                </View>
              </View>
              <View style={{flex: 1, position: 'absolute', right: 20}}>
                <ProgressCircle
                  percent={average}
                  radius={30}
                  borderWidth={6}
                  color={Colors.mainBtnscolor}
                  shadowColor="#CAE3D3"
                  bgColor="#EEF6F5">
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#008B75',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    {`${average ? average : 0}%`}
                  </Text>
                </ProgressCircle>
              </View>
            </View>
            <View
              style={{
                height: '100%',
                position: 'absolute',
                justifyContent: 'flex-end',
                // flexDirection: 'row',
                width: widthPercentageToDP(98),
                // backgroundColor: 'red',
              }}>
              {/* <View style={{flexDirection: 'row'}}> */}
              <View
                style={{
                  marginBottom: 20,
                  marginLeft: 15,
                  // flexDirection: 'row',
                  justifyContent: 'flex-end',
                  // backgroundColor: 'blue',
                  height: '100%',
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: 'purple',
                    height: '60%',
                  }}>
                  <View
                    style={{
                      height: '100%',
                      justifyContent: 'space-between',
                      // width: 10,
                      marginBottom: 20,
                      // backgroundColor: 'red',
                    }}>
                    <Text>100%</Text>
                    <Text style={{marginBottom: 20}}>0%</Text>
                  </View>
                  <View
                    style={{
                      height: '100%',
                      // width: 10,
                      flexDirection: 'row',
                      // backgroundColor: 'red',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        marginLeft: 10,
                        // backgroundColor: 'blue',
                        height: '100%',
                        justifyContent: 'flex-end',
                        // flexWrap: 'nowrap',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          height: 120,
                          backgroundColor: '#CAE3D3',
                          width: 8,
                          borderRadius: 10,
                        }}></View>
                      <View
                        style={{
                          position: 'absolute',
                          height:
                            checkWeekly('Monday') == '10'
                              ? 120
                              : checkWeekly('Monday') == '9'
                              ? 120 / 1.2
                              : checkWeekly('Monday') == '8'
                              ? 120 / 1.4
                              : checkWeekly('Monday') == '7'
                              ? 120 / 1.6
                              : checkWeekly('Monday') == '6'
                              ? 120 / 1.8
                              : checkWeekly('Monday') == '5'
                              ? 120 / 1.9
                              : checkWeekly('Monday') == '4'
                              ? 120 / 2.3
                              : checkWeekly('Monday') == '3'
                              ? 120 / 2.6
                              : checkWeekly('Monday') == '2'
                              ? 120 / 2.9
                              : checkWeekly('Monday') == '1'
                              ? 120 / 3.2
                              : 0,
                          width: 8,
                          bottom: 26,
                          borderRadius: 20,
                          // left: 15,
                          backgroundColor: Colors.mainBtnscolor,
                        }}></View>
                      <Text
                        style={{
                          marginTop: 10,
                          // height: 14,

                          // backgroundColor: 'blue',
                        }}>
                        Mon
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        marginLeft: 15,
                        // backgroundColor: 'blue',
                        height: '100%',
                        justifyContent: 'flex-end',
                        // flexWrap: 'nowrap',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          height: 120,

                          backgroundColor: '#CAE3D3',
                          width: 8,
                          borderRadius: 10,
                        }}></View>
                      <View
                        style={{
                          position: 'absolute',
                          height:
                            checkWeekly('Tuesday') == '10'
                              ? 120
                              : checkWeekly('Tuesday') == '9'
                              ? 120 / 1.2
                              : checkWeekly('Tuesday') == '8'
                              ? 120 / 1.4
                              : checkWeekly('Tuesday') == '7'
                              ? 120 / 1.6
                              : checkWeekly('Tuesday') == '6'
                              ? 120 / 1.8
                              : checkWeekly('Tuesday') == '5'
                              ? 120 / 1.9
                              : checkWeekly('Tuesday') == '4'
                              ? 120 / 2.3
                              : checkWeekly('Tuesday') == '3'
                              ? 120 / 2.6
                              : checkWeekly('Tuesday') == '2'
                              ? 120 / 2.9
                              : checkWeekly('Tuesday') == '1'
                              ? 120 / 3.2
                              : 0,

                          width: 8,
                          bottom: 26,
                          borderRadius: 20,
                          // left: 15,
                          backgroundColor: Colors.mainBtnscolor,
                        }}></View>
                      <Text style={{marginTop: 10}}>Tue</Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        marginLeft: 15,
                        // backgroundColor: 'blue',
                        height: '100%',
                        justifyContent: 'flex-end',
                        // flexWrap: 'nowrap',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          height: 120,

                          backgroundColor: '#CAE3D3',
                          width: 8,
                          borderRadius: 10,
                        }}></View>
                      <View
                        style={{
                          position: 'absolute',
                          height:
                            checkWeekly('Wednesday') == '10'
                              ? 120
                              : checkWeekly('Wednesday') == '9'
                              ? 120 / 1.2
                              : checkWeekly('Wednesday') == '8'
                              ? 120 / 1.4
                              : checkWeekly('Wednesday') == '7'
                              ? 120 / 1.6
                              : checkWeekly('Wednesday') == '6'
                              ? 120 / 1.8
                              : checkWeekly('Wednesday') == '5'
                              ? 120 / 1.9
                              : checkWeekly('Wednesday') == '4'
                              ? 120 / 2.3
                              : checkWeekly('Wednesday') == '3'
                              ? 120 / 2.6
                              : checkWeekly('Wednesday') == '2'
                              ? 120 / 2.9
                              : checkWeekly('Wednesday') == '1'
                              ? 120 / 3.2
                              : 0,

                          width: 8,
                          bottom: 26,
                          borderRadius: 20,
                          // left: 15,
                          backgroundColor: Colors.mainBtnscolor,
                        }}></View>
                      <Text style={{marginTop: 10}}>Wed</Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        marginLeft: 15,
                        // backgroundColor: 'blue',
                        height: '100%',
                        justifyContent: 'flex-end',
                        // flexWrap: 'nowrap',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          height: 120,
                          backgroundColor: '#CAE3D3',
                          width: 8,
                          borderRadius: 10,
                        }}></View>
                      <View
                        style={{
                          position: 'absolute',
                          height:
                            checkWeekly('Thursday') == '10'
                              ? 120
                              : checkWeekly('Thursday') == '9'
                              ? 120 / 1.2
                              : checkWeekly('Thursday') == '8'
                              ? 120 / 1.4
                              : checkWeekly('Thursday') == '7'
                              ? 120 / 1.6
                              : checkWeekly('Thursday') == '6'
                              ? 120 / 1.8
                              : checkWeekly('Thursday') == '5'
                              ? 120 / 1.9
                              : checkWeekly('Thursday') == '4'
                              ? 120 / 2.3
                              : checkWeekly('Thursday') == '3'
                              ? 120 / 2.6
                              : checkWeekly('Thursday') == '2'
                              ? 120 / 2.9
                              : checkWeekly('Thursday') == '1'
                              ? 120 / 3.2
                              : 0,

                          width: 8,
                          bottom: 26,
                          borderRadius: 20,
                          // left: 15,
                          backgroundColor: Colors.mainBtnscolor,
                        }}></View>
                      <Text style={{marginTop: 10}}>Thu</Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        marginLeft: 15,
                        // backgroundColor: 'blue',
                        height: '100%',
                        justifyContent: 'flex-end',
                        // flexWrap: 'nowrap',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          height: 120,

                          backgroundColor: '#CAE3D3',
                          width: 8,
                          borderRadius: 10,
                        }}></View>
                      <View
                        style={{
                          position: 'absolute',
                          height:
                            checkWeekly('Friday') == '10'
                              ? 120
                              : checkWeekly('Friday') == '9'
                              ? 120 / 1.2
                              : checkWeekly('Friday') == '8'
                              ? 120 / 1.4
                              : checkWeekly('Friday') == '7'
                              ? 120 / 1.6
                              : checkWeekly('Friday') == '6'
                              ? 120 / 1.8
                              : checkWeekly('Friday') == '5'
                              ? 120 / 1.9
                              : checkWeekly('Friday') == '4'
                              ? 120 / 2.3
                              : checkWeekly('Friday') == '3'
                              ? 120 / 2.6
                              : checkWeekly('Friday') == '2'
                              ? 120 / 2.9
                              : checkWeekly('Friday') == '1'
                              ? 120 / 3.2
                              : 0,

                          width: 8,
                          bottom: 26,
                          borderRadius: 20,
                          // left: 15,
                          backgroundColor: Colors.mainBtnscolor,
                        }}></View>
                      <Text style={{marginTop: 10}}>Fri</Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        marginLeft: 15,
                        // backgroundColor: 'blue',
                        height: '100%',
                        justifyContent: 'flex-end',
                        // flexWrap: 'nowrap',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          height: 120,
                          backgroundColor: '#CAE3D3',
                          width: 8,
                          borderRadius: 10,
                        }}></View>
                      <View
                        style={{
                          position: 'absolute',
                          height:
                            checkWeekly('Saturday') == '10'
                              ? 120
                              : checkWeekly('Saturday') == '9'
                              ? 120 / 1.2
                              : checkWeekly('Saturday') == '8'
                              ? 120 / 1.4
                              : checkWeekly('Saturday') == '7'
                              ? 120 / 1.6
                              : checkWeekly('Saturday') == '6'
                              ? 120 / 1.8
                              : checkWeekly('Saturday') == '5'
                              ? 120 / 1.9
                              : checkWeekly('Saturday') == '4'
                              ? 120 / 2.3
                              : checkWeekly('Saturday') == '3'
                              ? 120 / 2.6
                              : checkWeekly('Saturday') == '2'
                              ? 120 / 2.9
                              : checkWeekly('Saturday') == '1'
                              ? 120 / 3.2
                              : 0,
                          width: 8,
                          bottom: 26,
                          borderRadius: 20,
                          // left: 15,
                          backgroundColor: Colors.mainBtnscolor,
                        }}></View>
                      <Text style={{marginTop: 10}}>Sat</Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        marginLeft: 15,
                        // backgroundColor: 'blue',
                        height: '100%',
                        justifyContent: 'flex-end',
                        // flexWrap: 'nowrap',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          height: 120,
                          backgroundColor: '#CAE3D3',
                          width: 8,
                          borderRadius: 10,
                        }}></View>
                      <View
                        style={{
                          position: 'absolute',
                          height:
                            checkWeekly('Sunday') == '10'
                              ? 120
                              : checkWeekly('Sunday') == '9'
                              ? 120 / 1.2
                              : checkWeekly('Sunday') == '8'
                              ? 120 / 1.4
                              : checkWeekly('Sunday') == '7'
                              ? 120 / 1.6
                              : checkWeekly('Sunday') == '6'
                              ? 120 / 1.8
                              : checkWeekly('Sunday') == '5'
                              ? 120 / 1.9
                              : checkWeekly('Sunday') == '4'
                              ? 120 / 2.3
                              : checkWeekly('Sunday') == '3'
                              ? 120 / 2.6
                              : checkWeekly('Sunday') == '2'
                              ? 120 / 2.9
                              : checkWeekly('Sunday') == '1'
                              ? 120 / 3.2
                              : 0,

                          width: 8,
                          bottom: 26,
                          borderRadius: 20,
                          // left: 15,
                          backgroundColor: Colors.mainBtnscolor,
                        }}></View>
                      <Text style={{marginTop: 10}}>Sun</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* </View> */}
            </View>
            {/* <View style={{justifyContent:'center',alignContent:'center',marginLeft:30,marginTop:-6}}>
            <Text style={{marginLeft:10}}>Last Week</Text>
</View> */}
            {/* <BarChart
              data={data}
              width={Dimensions.get('screen').width - 35}
              height={180}
              withInnerLines={false}
              fromZero={true}
              withVerticalLabels={true}
              //  style={{borderRadius:20,backgroundColor:'white'}}
              //  svg={{fill: Colors.mainBtnscolor, fillOpacity: 0.2}}

              // strokeWidth={1}
              // showBarTops={true}
              // style={{
              //   borderRadius: 10,
              //   elevation: 2,
              //   backgroundColor: 'red',
              // }}

              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: '#fff',
                barPercentage: 0.2,
                fillShadowGradient: Colors.mainBtnscolor,
                fillShadowGradientOpacity: 10,
                backgroundGradientTo: '#fff',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = ``) => `rgba(77, 77, 77, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(77, 77, 77, ${opacity})`,

                propsForDots: {
                  r: '6',
                  strokeWidth: '0',
                  stroke: '#fff',
                },
              }}
              horizontalLabelRotation={0}
              verticalLabelRotation={0}></BarChart> */}
          </View>
        </Card>
        <View style={{paddingHorizontal: 16}}>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor:'red',
              marginTop: 15,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Colors.black,
                fontFamily: 'Poppins-Medium',
              }}>
              Notes
            </Text>
            <TouchableOpacity
              onPress={() => setVis(!vis)}
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
                  marginRight: 10,
                  marginLeft: 5,
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>

          {notes.map((item, index) => (
            <TouchableOpacity
              key={'a' + index}
              onPress={() => {
                navigation.navigate('Editsleepscreen', {
                  id: item.id,
                  ind: index,
                });
                // console.log(index);
              }}>
              <Card
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    style={{
                      paddingVertical: 6,
                      fontFamily: 'Poppins-Regular',
                      color: Colors.mainBtnscolor,
                      fontSize: 14,
                      textAlign: 'center',
                    }}>
                    {item.note}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    // paddingHorizontal: 10,
                    // backgroundColor: 'red',
                    // justifyContent: 'flex-end',
                  }}>
                  <Text>{item.time}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}

          {/* <View
            style={{
              flexDirection: 'row',

              marginTop: 15,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Colors.black,
                fontFamily: 'Poppins-Medium',
              }}>
              Notes
            </Text>
            <TouchableOpacity
              onPress={() => setVis(!vis)}
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
                Sleep
              </Text>
            </TouchableOpacity>
          </View>
          {sleep.map((item, index) => (
            <TouchableOpacity
              key={'a' + index}
              onPress={() => {
                navigation.navigate('Editsleepscreen', {
                  id: item.id,
                  ind: index,
                });
                // console.log(index);
              }}>
              <Card style={{paddingVertical: 12, borderRadius: 10}}>
                <Text
                  style={{
                    paddingVertical: 6,
                    fontFamily: 'Poppins-Regular',
                    color: Colors.mainBtnscolor,
                    fontSize: 14,
                    textAlign: 'center',
                  }}>
                  {item.note}
                </Text>
              </Card>
            </TouchableOpacity>
          ))} */}
        </View>
      </ScrollView>
      {myModal()}
    </View>
  );
};

export default Sleepscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16
  },
});
