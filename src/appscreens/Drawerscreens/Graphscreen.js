import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Picker,
  FlatList,
} from 'react-native';
// import moment from 'moment';
import {useSelector} from 'react-redux';
import {hungerGraph, mindGraph, momentGraph} from '../../lib/api';
import {
  widthPercentageToDP,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getweeklySleepGraph} from '../../lib/api';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryGroup,
  VictoryLegend,
} from 'victory-native';
import moment from 'moment';
import {Card} from 'native-base';
import ProgressCircle from 'react-native-progress-circle';
import Colors from '../../constants/colors';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const Graphscreen = ({navigation}) => {
  const curr = new Date();
  var n = curr.getDay();
  const [graph, setGraph] = useState({});
  const [graph1, setGraph1] = useState({});
  const [graph2, setGraph2] = useState({});
  const [period, setPeriod] = useState('weekly');
  const [average, setAverage] = useState('');
  const [arr, setArr] = useState([
    {name1: 'monsfsldkjflskfjs', val1: 3, name2: 'tue', val2: 4},
    {name1: 'mon', val1: 5, name2: 'tue', val2: 4},
    {name1: 'mon', val1: 5, name2: 'tue', val2: 4},
    {name1: 'mon', val1: 5, name2: 'tue', val2: 4},
    {name1: 'mon', val1: 5, name2: 'tue', val2: 4},
  ]);
  const {userData: user} = useSelector(({USER}) => USER);
  const [first, setFirst] = useState(
    n == 0
      ? 'Sun'
      : n == 1
      ? 'Mon'
      : n == 2
      ? 'Tue'
      : n == 3
      ? 'Wed'
      : n == 4
      ? 'Thu'
      : n == 5
      ? 'Fri'
      : n == 6
      ? 'Sat'
      : 'Sun',
  );
  const [second, setSecond] = useState(
    n == 0
      ? 'Sun'
      : n == 1
      ? 'Mon'
      : n == 2
      ? 'Tue'
      : n == 3
      ? 'Wed'
      : n == 4
      ? 'Thu'
      : n == 5
      ? 'Fri'
      : n == 6
      ? 'Sat'
      : 'Sun',
  );
  const [third, setThird] = useState(
    n == 0
      ? 'Sun'
      : n == 1
      ? 'Mon'
      : n == 2
      ? 'Tue'
      : n == 3
      ? 'Wed'
      : n == 4
      ? 'Thu'
      : n == 5
      ? 'Fri'
      : n == 6
      ? 'Sat'
      : 'Sun',
  );
  const data = [
    'Energized',
    'Happy',
    'Calm',
    'Stressed',
    'Tired',
    'Bored',
    'Sad',
    'Anxious',
    'Guilty',
    'Other',
  ];
  const [last, setLast] = useState('');
  const [sleepProgressWeekly, setSleepProgressWeekly] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [date1, setDate1] = useState(new Date().toISOString().slice(0, 10));
  const [date2, setDate2] = useState(new Date().toISOString().slice(0, 10));
  const [sleepcheck, setSleepCheck] = useState('1 Week');
  const days = [
    {name: 'Sun', id: 0},
    {name: 'Mon', id: 1},
    {name: 'Tue', id: 2},
    {name: 'Wed', id: 3},
    {name: 'Thu', id: 4},
    {name: 'Fri', id: 5},
    {name: 'Sat', id: 6},
  ];
  const renderItem = ({item, index}) => (
    <View style={{flexDirection: 'row'}}>
      <Text
        style={{
          marginLeft: index == 0 ? 0 : 20,
          fontSize: 10,
          color: '#2CC52C',
          fontFamily: 'Poppins-Regular',
        }}>
        {index + 1} -
      </Text>
      <Text
        style={{color: '#2CC52C', fontFamily: 'Poppins-Regular', fontSize: 10}}>
        {' '}
        {item}{' '}
      </Text>
    </View>
  );
  useEffect(() => {
    navigation.setOptions({
      title: 'Graph',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: Colors.mainBtnscolor,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.bgColor,
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
  }, []);
  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    getweeklySleepGraph({Auth: user.userdata.api_token, period}).then(res => {
      console.log('rrrr', res);
      setSleepProgressWeekly(res.sleep);
      setLast(res.last_night);
      setAverage(res.average_sleep);
    });
    // });
    // return unsubscribe;
  }, [average]);
  useEffect(() => {
    hungerGraph({Auth: user.userdata.api_token, date}).then(res => {
      console.log('res for hunger', res);
      if (res) {
        setGraph(res.data);
      } else {
        setGraph([]);
      }
      // setGraph(res.data);
    });
    mindGraph({Auth: user.userdata.api_token, date1}).then(res => {
      console.log('mind', res);
      if (res) {
        setGraph1(res.data);
      } else {
        setGraph1([]);
      }
      // setGraph1(res.data);
    });
    momentGraph({Auth: user.userdata.api_token, date2}).then(res => {
      console.log('usama changed data', JSON.stringify(res));
      if (res) {
        setGraph2(res.data);
      } else {
        setGraph2([]);
      }
    });
  }, [date, date1, date2]);

  const checkWeekly = payload => {
    for (let i = 0; i < sleepProgressWeekly.length; i++) {
      // console.log('here', sleepProgressWeekly[i]);
      if (sleepProgressWeekly[i]?.day == payload) {
        // console.log('monday', sleepProgressWeekly[i]);
        return sleepProgressWeekly[i]?.sleep_quality;
      }
    }
  };
  const renderItem3 = ({item, index}) => (
    <>
      <View
        style={{
          alignItems: 'center',
          marginLeft: 50,
          width: 20,
          // backgroundColor: 'blue',
          height: '100%',
          justifyContent: 'flex-end',
          // flexWrap: 'nowrap',
        }}>
        <View
          style={{
            // flex: 1,
            height: hp(14),
            backgroundColor: '#CAE3D3',
            width: 8,
            borderRadius: 10,
            // right: 15,
          }}></View>
        <View
          style={{
            position: 'absolute',
            height:
              item.feel_prior == '10'
                ? hp(14)
                : item.feel_prior == '9'
                ? hp(14) / 1.1
                : item.feel_prior == '8'
                ? hp(14) / 1.25
                : item.feel_prior == '7'
                ? hp(14) / 1.4
                : item.feel_prior == '6'
                ? hp(14) / 1.6
                : item.feel_prior == '5'
                ? hp(14) / 1.9
                : item.feel_prior == '4'
                ? hp(14) / 2.25
                : item.feel_prior == '3'
                ? hp(14) / 2.8
                : item.feel_prior == '2'
                ? hp(14) / 3.7
                : item.feel_prior == '1'
                ? 120 / 5.0
                : 0,
            width: 8,
            bottom: 26,
            borderRadius: 20,
            // right: 15,
            backgroundColor: '#2CC52C',
          }}></View>
        {/* <View style={{backgroundColor: 'red'}}> */}
        <Text
          style={{
            marginTop: 10,
            // height: 14,
            color: 'white',
            // backgroundColor: 'blue',
          }}>
          a {/* {item.name1.substring(0, 1)} */}
        </Text>
        <View
          style={{
            position: 'absolute',
            width: 90,
            height: 25,
            // left: 0.1,
            zIndex: 2,
            // flexWrap: 'wrap',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <Text>{item.title.substring(0, 10)}</Text>
        </View>
        {/* </View> */}
      </View>
      <View
        style={{
          alignItems: 'center',
          // marginLeft: 15,
          // backgroundColor: 'blue',
          width: 20,
          height: '100%',
          justifyContent: 'flex-end',
          // flexWrap: 'nowrap',
        }}>
        <View
          style={{
            // flex: 1,
            height: hp(14),

            backgroundColor: '#CAE3D3',
            width: 8,
            borderRadius: 10,
          }}></View>
        <View
          style={{
            position: 'absolute',
            height:
              item.feel_after == '10'
                ? hp(14)
                : item.feel_after == '9'
                ? hp(14) / 1.1
                : item.feel_after == '8'
                ? hp(14) / 1.25
                : item.feel_after == '7'
                ? hp(14) / 1.4
                : item.feel_after == '6'
                ? hp(14) / 1.6
                : item.feel_after == '5'
                ? hp(14) / 1.9
                : item.feel_after == '4'
                ? hp(14) / 2.25
                : item.feel_after == '3'
                ? hp(14) / 2.8
                : item.feel_after == '2'
                ? hp(14) / 3.7
                : item.feel_after == '1'
                ? 120 / 5.0
                : 0,
            width: 8,
            bottom: 26,
            borderRadius: 20,
            // left: 15,
            backgroundColor: Colors.mainBtnscolor,
          }}></View>
        {/* <View style={{height: 20}}></View> */}
        <Text style={{marginTop: 10, zIndex: -1, color: '#ffffff00'}}>
          a {/* {item.name2.substring(0, 1)} */}
        </Text>
      </View>
    </>
  );
  const renderItem4 = ({item, index}) => (
    <>
      <View
        style={{
          alignItems: 'center',
          marginLeft: 50,
          width: 20,
          // backgroundColor: 'blue'
          // position: 'absolute',
          // bottom: 20,
          height: '100%',
          justifyContent: 'flex-end',
          // flexWrap: 'nowrap',
        }}>
        <View
          style={{
            // flex: 1,
            height: hp(14),
            backgroundColor: '#CAE3D3',
            width: 8,
            borderRadius: 10,
          }}></View>
        <View
          style={{
            position: 'absolute',
            height:
              item.hunger_level == '10'
                ? hp(14)
                : item.hunger_level == '9'
                ? hp(14) / 1.1
                : item.hunger_level == '8'
                ? hp(14) / 1.25
                : item.hunger_level == '7'
                ? hp(14) / 1.4
                : item.hunger_level == '6'
                ? hp(14) / 1.6
                : item.hunger_level == '5'
                ? hp(14) / 1.9
                : item.hunger_level == '4'
                ? hp(14) / 2.25
                : item.hunger_level == '3'
                ? hp(14) / 2.8
                : item.hunger_level == '2'
                ? hp(14) / 3.7
                : item.hunger_level == '1'
                ? 120 / 5.0
                : 0,
            width: 8,
            bottom: 26,
            borderRadius: 20,
            // left: 15,
            backgroundColor: '#2CC52C',
          }}></View>
        {/* <View style={{backgroundColor: 'red'}}> */}
        <Text
          style={{
            marginTop: 10,
            // height: 14,
            // marginBottom: 20,
            color: 'white',
            // backgroundColor: 'blue',
          }}>
          a{/* {item.title.substring(0, 1)} */}
        </Text>
        <View
          style={{
            position: 'absolute',
            width: 90,
            height: 25,
            // left: 0.1,
            zIndex: 2,
            // top: 120,
            // flexWrap: 'wrap',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}>
            {item.title.substring(0, 10)}
          </Text>
        </View>
        {/* </View> */}
      </View>
      <View
        style={{
          alignItems: 'center',
          // marginLeft: 15,
          // backgroundColor: 'blue',
          width: 20,
          height: '100%',
          justifyContent: 'flex-end',
          // flexWrap: 'nowrap',
        }}>
        <View
          style={{
            // flex: 1,
            height: hp(14),

            backgroundColor: '#CAE3D3',
            width: 8,
            borderRadius: 10,
          }}></View>
        <View
          style={{
            position: 'absolute',
            height:
              item.fullness_level == '10'
                ? hp(14)
                : item.fullness_level == '9'
                ? hp(14) / 1.1
                : item.fullness_level == '8'
                ? hp(14) / 1.25
                : item.fullness_level == '7'
                ? hp(14) / 1.4
                : item.fullness_level == '6'
                ? hp(14) / 1.6
                : item.fullness_level == '5'
                ? hp(14) / 1.9
                : item.fullness_level == '4'
                ? hp(14) / 2.25
                : item.fullness_level == '3'
                ? hp(14) / 2.8
                : item.fullness_level == '2'
                ? hp(14) / 3.7
                : item.fullness_level == '1'
                ? 120 / 5.0
                : 0,
            width: 8,
            bottom: 26,
            borderRadius: 20,
            // left: 15,
            backgroundColor: Colors.mainBtnscolor,
          }}></View>
        {/* <View style={{height: 20}}></View> */}
        <Text style={{marginTop: 10, zIndex: -1, color: '#ffffff00'}}>
          a {/* {item.name2.substring(0, 1)} */}
        </Text>
      </View>
    </>
  );
  const renderItem5 = ({item, index}) => (
    <>
      <View
        style={{
          alignItems: 'center',
          marginLeft: 50,
          width: 20,
          // backgroundColor: 'blue',
          height: '100%',
          justifyContent: 'flex-end',
          // flexWrap: 'nowrap',
        }}>
        <View
          style={{
            // flex: 1,
            height: hp(14),
            backgroundColor: '#CAE3D3',
            width: 8,
            borderRadius: 10,
          }}></View>
        <View
          style={{
            position: 'absolute',
            height:
              item.mindfulness_level == '10'
                ? hp(14)
                : item.mindfulness_level == '9'
                ? hp(14) / 1.1
                : item.mindfulness_level == '8'
                ? hp(14) / 1.25
                : item.mindfulness_level == '7'
                ? hp(14) / 1.4
                : item.mindfulness_level == '6'
                ? hp(14) / 1.6
                : item.mindfulness_level == '5'
                ? hp(14) / 1.9
                : item.mindfulness_level == '4'
                ? hp(14) / 2.25
                : item.mindfulness_level == '3'
                ? hp(14) / 2.8
                : item.mindfulness_level == '2'
                ? hp(14) / 3.7
                : item.mindfulness_level == '1'
                ? 120 / 5.0
                : 0,
            width: 8,
            bottom: 26,
            borderRadius: 20,
            // left: 15,
            backgroundColor: '#2CC52C',
          }}></View>
        {/* <View style={{backgroundColor: 'red'}}> */}
        <Text
          style={{
            marginTop: 10,
            // height: 14,
            color: '#ffff0000',
            // backgroundColor: 'blue',
          }}>
          a{/* {item.title.substring(0, 1)} */}
        </Text>
        <View
          style={{
            position: 'absolute',
            width: 90,
            height: 25,
            // left: 0.1,
            zIndex: 2,
            // flexWrap: 'wrap',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <Text>{item.title.substring(0, 10)}</Text>
        </View>
        {/* </View> */}
      </View>
      <View
        style={{
          alignItems: 'center',
          // marginLeft: 15,
          // backgroundColor: 'blue',
          width: 20,
          height: '100%',
          justifyContent: 'flex-end',
          // flexWrap: 'nowrap',
        }}>
        <View
          style={{
            // flex: 1,
            height: hp(14),

            backgroundColor: '#CAE3D3',
            width: 8,
            borderRadius: 10,
          }}></View>
        <View
          style={{
            position: 'absolute',
            height:
              item.fullness_level == '10'
                ? hp(14)
                : item.fullness_level == '9'
                ? hp(14) / 1.1
                : item.fullness_level == '8'
                ? hp(14) / 1.25
                : item.fullness_level == '7'
                ? hp(14) / 1.4
                : item.fullness_level == '6'
                ? hp(14) / 1.6
                : item.fullness_level == '5'
                ? hp(14) / 1.9
                : item.fullness_level == '4'
                ? hp(14) / 2.25
                : item.fullness_level == '3'
                ? hp(14) / 2.8
                : item.fullness_level == '2'
                ? hp(14) / 3.7
                : item.fullness_level == '1'
                ? 120 / 5.0
                : 0,
            width: 8,
            bottom: 26,
            borderRadius: 20,
            // left: 15,
            backgroundColor: Colors.mainBtnscolor,
          }}></View>
        {/* <View style={{height: 20}}></View> */}
        <Text style={{marginTop: 10, zIndex: -1, color: '#ffffff00'}}>
          a {/* {item.name2.substring(0, 1)} */}
        </Text>
      </View>
    </>
  );
  // console.log('day', n);
  // var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
  // console.log('date', date);
  console.log('day in state', graph2);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'red',
          width: '100%',
          // justifyContent: 'space-between',
          // height: 40,
          alignItems: 'center',
          // marginTop: 10,
          padding: 8,
        }}>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 100,
            backgroundColor: '#2CC52C',
            margin: 10,
          }}></View>
        <Text
          style={{
            color: '#2CC52C',
            fontFamily: 'Poppins-Regular',
            fontSize: 10,
          }}>
          Hunger
        </Text>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 100,
            backgroundColor: '#008B75',
            margin: 8,
          }}></View>
        <Text
          style={{
            color: '#008B75',
            fontFamily: 'Poppins-Regular',
            fontSize: 10,
          }}>
          Fullness
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'red',
          width: '100%',
          // paddingHorizontal: 15,
          justifyContent: 'space-between',
          // height: 40,
          alignItems: 'center',
          padding: 8,
        }}>
        {/* <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'red',
            width: '100%',
            // justifyContent: 'space-between',
            height: 40,
            alignItems: 'center',
            // marginTop: 10,
            padding: 8,
          }}>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 100,
              backgroundColor: '#2CC52C',
              // opacity: 0.5,
              margin: 10,
            }}></View>
          <Text
            style={{
              color: '#2CC52C',
              fontFamily: 'Poppins-Regular',
              fontSize: 10,
            }}>
            Hunger Level Prior
          </Text>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 100,
              backgroundColor: '#008B75',
              margin: 8,
            }}></View>
          <Text
            style={{
              color: '#008B75',
              fontFamily: 'Poppins-Regular',
              fontSize: 10,
            }}>
            Fullness Level After
          </Text>
        </View> */}
      </View>
      <Text
        style={{
          fontSize: 16,
          marginLeft: 15,
          color: '#008B75',
          fontFamily: 'Poppins-Bold',
        }}>
        Hunger Level Before / Fullness Level After
      </Text>
      <Card
        style={{
          height: 250,
          marginLeft: 15,
          borderRadius: 10,
          // backgroundColor: 'red',
          marginRight: 15,
          // marginTop: -7,
        }}>
        <View
          style={{
            height: 30,
            flexDirection: 'row',
            position: 'absolute',
            zIndex: 3,
            // backgroundColor: 'red',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}>
          {days.map(item => (
            <TouchableOpacity
              onPress={() => {
                setFirst(item.name);
                let firstday = new Date(
                  curr.setDate(curr.getDate() - curr.getDay() + item.id),
                );
                setDate(moment(firstday).format('YYYY-MM-DD'));
              }}
              style={{
                height: 22,
                backgroundColor: first == item.name ? '#008B75' : 'white',
                width: 40,

                borderRadius: 5,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
                borderWidth: 1,
                borderColor: '#008B75',
              }}>
              <Text
                style={{
                  color: first == item.name ? 'white' : '#008B75',
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            height: 250,
            paddingHorizontal: 16,
            // backgroundColor: 'red',
            // flexWrap: 'wrap',
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
              // backgroundColor: 'green',
              top: 20,
              height: 70,
            }}>
            <View>
              <View style={{flexDirection: 'row'}}>
                {/* <Image
                  source={require('../../assets/hour-split_icon.png')}
                  style={{height: 18, width: 18, resizeMode: 'contain'}}
                /> */}
                {/* <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 8,
                    color: '#008B75',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Hunger Level
                </Text> */}
              </View>
            </View>

            <View
              style={{
                marginLeft: 30,
                flex: 1,
                position: 'absolute',
                right: 20,
                height: 30,
                width: 150,
              }}></View>
          </View>

          <View
            style={{
              height: '100%',
              zIndex: -1,
              position: 'absolute',
              justifyContent: 'flex-end',
              // flexDirection: 'row',
              width: widthPercentageToDP(98),
              // backgroundColor: 'red',
            }}>
            {/* <View style={{flexDirection: 'row'}}> */}
            <View
              style={{
                // marginBottom: 20,
                marginLeft: 15,
                // flexDirection: 'row',
                justifyContent: 'flex-end',
                // backgroundColor: 'blue',
                // flexWrap: 'wrap',
                height: '100%',
                width: '90%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'purple',
                  width: '100%',
                  height: '60%',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    height: '100%',
                    justifyContent: 'space-between',
                    // width: 10,
                    // marginBottom: 20,
                    // height: hp(14),
                    // position: 'absolute',
                    // backgroundColor: 'red',
                  }}>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    10
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    8
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    6
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    4
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    2
                  </Text>
                  <Text
                    style={{
                      marginBottom: 20,
                      color: Colors.mainBtnscolor,
                      marginLeft: 10,
                    }}>
                    0
                  </Text>
                </View>

                <View
                  style={{
                    height: '100%',
                    width: '90%',
                    flexDirection: 'row',
                    // flexGrow: 1,
                    // backgroundColor: 'red',
                  }}>
                  <FlatList
                    data={graph}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem4}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
            </View>

            {/* </View> */}
          </View>
        </View>
      </Card>

      <View style={{marginTop: 10}}>
        {/* <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'red',
            height: 40,
            alignItems: 'center',
            // marginTop: 10,
            padding: 8,
          }}>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 100,
              backgroundColor: '#2CC52C',
              margin: 10,
            }}></View>
          <Text
            style={{
              color: '#2CC52C',
              fontFamily: 'Poppins-Regular',
              fontSize: 10,
            }}>
            Mindfulness During Meal
          </Text>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 100,
              backgroundColor: '#008B75',
              margin: 8,
            }}></View>
          <Text
            style={{
              color: '#008B75',
              fontFamily: 'Poppins-Regular',
              fontSize: 10,
            }}>
            Fullness Level After
          </Text>
          <View style={{position: 'absolute', right: 18, marginTop: 10}}>
           
          </View>
        </View> */}
        <Text
          style={{
            fontSize: 16,
            marginLeft: 15,
            color: '#008B75',
            fontFamily: 'Poppins-Bold',
          }}>
          Mindfulness Level / Fullness Level After Meal
        </Text>
        <View
          style={{
            width: '90%',
            // marginHorizontal: 10,
            marginLeft: 15,
            flexDirection: 'row',
            // height: 20,
            // backgroundColor: 'red',
          }}>
          {/* <View style={{flexDirection: 'row'}}> */}
          <Text
            style={{
              // marginLeft: ,
              fontSize: 11,
              color: '#2CC52C',
              fontFamily: 'Poppins-Regular',
            }}>
            (1-3) :Distracted
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 11,
              color: '#2CC52C',
              fontFamily: 'Poppins-Regular',
            }}>
            (4-6) :Somewhat Focused
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 11,
              color: '#2CC52C',
              fontFamily: 'Poppins-Regular',
            }}>
            (7-9) :Zenned Out
          </Text>
          {/* <Text style={{color: Colors.mainBtnscolor, fontSize: 12}}></Text> */}
          {/* </View> */}
        </View>

        <Card
          style={{
            height: 250,
            marginLeft: 15,
            borderRadius: 10,
            // backgroundColor: 'red',
            marginRight: 15,
            // marginTop: -7,
          }}>
          <View
            style={{
              height: 30,
              flexDirection: 'row',
              position: 'absolute',
              zIndex: 3,
              // backgroundColor: 'red',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            {days.map(item => (
              <TouchableOpacity
                onPress={() => {
                  setSecond(item.name);
                  let firstday = new Date(
                    curr.setDate(curr.getDate() - curr.getDay() + item.id),
                  );
                  setDate1(moment(firstday).format('YYYY-MM-DD'));
                }}
                style={{
                  height: 22,
                  backgroundColor: second == item.name ? '#008B75' : 'white',
                  width: 40,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: '#008B75',
                }}>
                <Text
                  style={{
                    color: second == item.name ? 'white' : '#008B75',
                    fontSize: 12,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              height: 250,
              paddingHorizontal: 16,
              // backgroundColor: 'red',
              // flexWrap: 'wrap',
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
                // backgroundColor: 'green',
                top: 20,
                height: 70,
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  {/* <Image
                    source={require('../../assets/hour-split_icon.png')}
                    style={{height: 18, width: 18, resizeMode: 'contain'}}
                  /> */}
                </View>
                {/* <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  width: 170,
                }}>
                <Text style={{fontFamily: 'Poppins-Medium', color: 'grey'}}>
                  Average Time {average > 0 ? `${average}h` : ''}
                </Text>
              </View> */}
              </View>

              <View
                style={{
                  marginLeft: 30,
                  flex: 1,
                  position: 'absolute',
                  right: 20,
                  height: 30,
                  width: 150,
                }}>
                {/* <View style={{flexDirection: 'row', marginLeft: 20}}>
                <TouchableOpacity
                  onPress={() => {
                    setSleepCheck('1 Week');
                    setAverage('weekly');
                    setPeriod('weekly');
                  }}
                  style={{
                    marginLeft: 20,
                    right: 10,
                    height: 30,
                    backgroundColor:
                      sleepcheck == '1 Week' ? '#008B75' : 'white',
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: '50%',
                    alignItems: 'center',
                    alignContent: 'center',
                    borderWidth: 0.5,
                    borderColor: sleepcheck == '1 Week' ? 'white' : '#008B75',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: sleepcheck == '1 Week' ? 'white' : '#008B75',
                      fontSize: 12,
                    }}>
                    1 Week
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSleepCheck('1 Month');
                    setAverage('monthly');
                    setPeriod('monthly');
                  }}
                  style={{
                    borderWidth: 0.5,
                    marginLeft: 10,
                    right: 10,
                    height: 30,
                    backgroundColor:
                      sleepcheck == '1 Month' ? '#008B75' : 'white',
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: '50%',
                    alignItems: 'center',
                    alignContent: 'center',
                    borderColor: sleepcheck == '1 Month' ? 'white' : '#008B75',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: sleepcheck == '1 Month' ? 'white' : '#008B75',
                      fontSize: 12,
                    }}>
                    1 Month
                  </Text>
                </TouchableOpacity>
              </View> */}
              </View>
            </View>
            {/* <View style={{justifyContent:'center',alignContent:'center',marginLeft:30,marginTop:-6}}>
            <Text style={{marginLeft:10}}>Last Week</Text>
</View> */}

            <View
              style={{
                height: '100%',
                zIndex: -1,
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
                  // flexWrap: 'wrap',
                  height: '100%',
                  width: '90%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: 'purple',
                    width: '100%',
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
                    <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                      10
                    </Text>
                    <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                      8
                    </Text>
                    <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                      6
                    </Text>
                    <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                      4
                    </Text>
                    <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                      2
                    </Text>
                    <Text
                      style={{
                        marginBottom: 20,
                        color: Colors.mainBtnscolor,
                        marginLeft: 10,
                      }}>
                      0
                    </Text>
                  </View>

                  <View
                    style={{
                      height: '100%',
                      width: '90%',
                      flexDirection: 'row',
                      // flexGrow: 1,
                      // backgroundColor: 'red',
                    }}>
                    <FlatList
                      data={graph1}
                      horizontal
                      showsVerticalScrollIndicator={false}
                      renderItem={renderItem5}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </View>
              </View>

              {/* </View> */}
            </View>
          </View>
        </Card>
      </View>
      <Card
        style={{
          height: 250,
          marginLeft: 15,
          borderRadius: 10,
          // backgroundColor: 'red',
          marginRight: 15,
          // marginTop: -7,
        }}>
        <View
          style={{
            height: 250,
            paddingHorizontal: 16,
            // backgroundColor: 'red',
            // flexWrap: 'wrap',
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
                  source={require('../../assets/hour-split_icon.png')}
                  style={{height: 18, width: 18, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 8,
                    color: '#008B75',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Sleep
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  width: 170,
                }}>
                <Text style={{fontFamily: 'Poppins-Medium', color: 'grey'}}>
                  Average Time {average > 0 ? `${average.slice(0, 4)}h` : ''}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginLeft: 30,
                flex: 1,
                position: 'absolute',
                right: 20,
                height: 30,
                width: 150,
              }}>
              <View style={{flexDirection: 'row', marginLeft: 20}}>
                <TouchableOpacity
                  onPress={() => {
                    setSleepCheck('1 Week');
                    setAverage('weekly');
                    setPeriod('weekly');
                  }}
                  style={{
                    marginLeft: 20,
                    right: 10,
                    height: 30,
                    backgroundColor:
                      sleepcheck == '1 Week' ? '#008B75' : 'white',
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: '50%',
                    alignItems: 'center',
                    alignContent: 'center',
                    borderWidth: 0.5,
                    borderColor: sleepcheck == '1 Week' ? 'white' : '#008B75',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: sleepcheck == '1 Week' ? 'white' : '#008B75',
                      fontSize: 12,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    1 Week
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSleepCheck('1 Month');
                    setAverage('monthly');
                    setPeriod('monthly');
                  }}
                  style={{
                    borderWidth: 0.5,
                    marginLeft: 10,
                    right: 10,
                    height: 30,
                    backgroundColor:
                      sleepcheck == '1 Month' ? '#008B75' : 'white',
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: '50%',
                    alignItems: 'center',
                    alignContent: 'center',
                    borderColor: sleepcheck == '1 Month' ? 'white' : '#008B75',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: sleepcheck == '1 Month' ? 'white' : '#008B75',
                      fontSize: 12,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    1 Month
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <View style={{justifyContent:'center',alignContent:'center',marginLeft:30,marginTop:-6}}>
            <Text style={{marginLeft:10}}>Last Week</Text>
</View> */}
          <View
            style={{
              height: '100%',
              zIndex: -1,
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
                // flexWrap: 'wrap',
                height: '100%',
                width: '90%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'purple',
                  width: '100%',
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
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    10
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    8
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    6
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    4
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    2
                  </Text>
                  <Text
                    style={{
                      marginBottom: 20,
                      color: Colors.mainBtnscolor,
                      marginLeft: 10,
                    }}>
                    0
                  </Text>
                </View>
                {period == 'weekly' ? (
                  <View
                    style={{
                      height: '100%',
                      // width: '90%',
                      flexDirection: 'row',
                      // flexGrow: 1,
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
                              ? 120 / 1.25
                              : checkWeekly('Monday') == '8'
                              ? 120 / 1.5
                              : checkWeekly('Monday') == '7'
                              ? 120 / 1.75
                              : checkWeekly('Monday') == '6'
                              ? 120 / 2
                              : checkWeekly('Monday') == '5'
                              ? 120 / 2.25
                              : checkWeekly('Monday') == '4'
                              ? 120 / 2.5
                              : checkWeekly('Monday') == '3'
                              ? 120 / 2.75
                              : checkWeekly('Monday') == '2'
                              ? 120 / 3
                              : checkWeekly('Monday') == '1'
                              ? 120 / 3.5
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
                              ? 120 / 1.25
                              : checkWeekly('Tuesday') == '8'
                              ? 120 / 1.5
                              : checkWeekly('Tuesday') == '7'
                              ? 120 / 1.75
                              : checkWeekly('Tuesday') == '6'
                              ? 120 / 2
                              : checkWeekly('Tuesday') == '5'
                              ? 120 / 2.25
                              : checkWeekly('Tuesday') == '4'
                              ? 120 / 2.5
                              : checkWeekly('Tuesday') == '3'
                              ? 120 / 2.75
                              : checkWeekly('Tuesday') == '2'
                              ? 120 / 3
                              : checkWeekly('Tuesday') == '1'
                              ? 120 / 3.5
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
                              ? 120 / 1.25
                              : checkWeekly('Wednesday') == '8'
                              ? 120 / 1.5
                              : checkWeekly('Wednesday') == '7'
                              ? 120 / 1.75
                              : checkWeekly('Wednesday') == '6'
                              ? 120 / 2
                              : checkWeekly('Wednesday') == '5'
                              ? 120 / 2.25
                              : checkWeekly('Wednesday') == '4'
                              ? 120 / 2.5
                              : checkWeekly('Wednesday') == '3'
                              ? 120 / 2.75
                              : checkWeekly('Wednesday') == '2'
                              ? 120 / 3
                              : checkWeekly('Wednesday') == '1'
                              ? 120 / 3.5
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
                              ? 120 / 1.25
                              : checkWeekly('Thursday') == '8'
                              ? 120 / 1.5
                              : checkWeekly('Thursday') == '7'
                              ? 120 / 1.75
                              : checkWeekly('Thursday') == '6'
                              ? 120 / 2
                              : checkWeekly('Thursday') == '5'
                              ? 120 / 2.25
                              : checkWeekly('Thursday') == '4'
                              ? 120 / 2.5
                              : checkWeekly('Thursday') == '3'
                              ? 120 / 2.75
                              : checkWeekly('Thursday') == '2'
                              ? 120 / 3
                              : checkWeekly('Thursday') == '1'
                              ? 120 / 3.5
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
                              ? 120 / 1.25
                              : checkWeekly('Friday') == '8'
                              ? 120 / 1.5
                              : checkWeekly('Friday') == '7'
                              ? 120 / 1.75
                              : checkWeekly('Friday') == '6'
                              ? 120 / 2
                              : checkWeekly('Friday') == '5'
                              ? 120 / 2.25
                              : checkWeekly('Friday') == '4'
                              ? 120 / 2.5
                              : checkWeekly('Friday') == '3'
                              ? 120 / 2.75
                              : checkWeekly('Friday') == '2'
                              ? 120 / 3
                              : checkWeekly('Friday') == '1'
                              ? 120 / 3.5
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
                              ? 120 / 1.25
                              : checkWeekly('Saturday') == '8'
                              ? 120 / 1.5
                              : checkWeekly('Saturday') == '7'
                              ? 120 / 1.75
                              : checkWeekly('Saturday') == '6'
                              ? 120 / 2
                              : checkWeekly('Saturday') == '5'
                              ? 120 / 2.25
                              : checkWeekly('Saturday') == '4'
                              ? 120 / 2.5
                              : checkWeekly('Saturday') == '3'
                              ? 120 / 2.75
                              : checkWeekly('Saturday') == '2'
                              ? 120 / 3
                              : checkWeekly('Saturday') == '1'
                              ? 120 / 3.5
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
                              ? 120 / 1.25
                              : checkWeekly('Sunday') == '8'
                              ? 120 / 1.5
                              : checkWeekly('Sunday') == '7'
                              ? 120 / 1.75
                              : checkWeekly('Sunday') == '6'
                              ? 120 / 2
                              : checkWeekly('Sunday') == '5'
                              ? 120 / 2.25
                              : checkWeekly('Sunday') == '4'
                              ? 120 / 2.5
                              : checkWeekly('Sunday') == '3'
                              ? 120 / 2.75
                              : checkWeekly('Sunday') == '2'
                              ? 120 / 3
                              : checkWeekly('Sunday') == '1'
                              ? 120 / 3.5
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
                ) : (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View
                      style={{
                        height: '100%',
                        // width: '90%',
                        flexDirection: 'row',
                        // flexGrow: 1,
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
                              checkWeekly('Monday1') == '10'
                                ? 120
                                : checkWeekly('Monday1') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Monday1') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Monday1') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Monday1') == '6'
                                ? 120 / 2
                                : checkWeekly('Monday1') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Monday1') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Monday1') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Monday1') == '2'
                                ? 120 / 3
                                : checkWeekly('Monday1') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Tuesday1') == '10'
                                ? 120
                                : checkWeekly('Tuesday1') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Tuesday1') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Tuesday1') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Tuesday1') == '6'
                                ? 120 / 2
                                : checkWeekly('Tuesday1') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Tuesday1') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Tuesday1') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Tuesday1') == '2'
                                ? 120 / 3
                                : checkWeekly('Tuesday1') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Wednesday1') == '10'
                                ? 120
                                : checkWeekly('Wednesday1') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Wednesday1') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Wednesday1') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Wednesday1') == '6'
                                ? 120 / 2
                                : checkWeekly('Wednesday1') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Wednesday1') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Wednesday1') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Wednesday1') == '2'
                                ? 120 / 3
                                : checkWeekly('Wednesday1') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Thursday1') == '10'
                                ? 120
                                : checkWeekly('Thursday1') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Thursday1') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Thursday1') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Thursday1') == '6'
                                ? 120 / 2
                                : checkWeekly('Thursday1') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Thursday1') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Thursday1') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Thursday1') == '2'
                                ? 120 / 3
                                : checkWeekly('Thursday1') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Friday1') == '10'
                                ? 120
                                : checkWeekly('Friday1') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Friday1') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Friday1') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Friday1') == '6'
                                ? 120 / 2
                                : checkWeekly('Friday1') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Friday1') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Friday1') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Friday1') == '2'
                                ? 120 / 3
                                : checkWeekly('Friday1') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Saturday1') == '10'
                                ? 120
                                : checkWeekly('Saturday1') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Saturday1') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Saturday1') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Saturday1') == '6'
                                ? 120 / 2
                                : checkWeekly('Saturday1') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Saturday1') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Saturday1') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Saturday1') == '2'
                                ? 120 / 3
                                : checkWeekly('Saturday1') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Sunday1') == '10'
                                ? 120
                                : checkWeekly('Sunday1') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Sunday1') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Sunday1') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Sunday1') == '6'
                                ? 120 / 2
                                : checkWeekly('Sunday1') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Sunday1') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Sunday1') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Sunday1') == '2'
                                ? 120 / 3
                                : checkWeekly('Sunday1') == '1'
                                ? 120 / 3.5
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
                    <View
                      style={{
                        height: '100%',
                        // width: '90%',
                        flexDirection: 'row',
                        // flexGrow: 1,
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
                              checkWeekly('Monday2') == '10'
                                ? 120
                                : checkWeekly('Monday2') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Monday2') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Monday2') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Monday2') == '6'
                                ? 120 / 2
                                : checkWeekly('Monday2') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Monday2') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Monday2') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Monday2') == '2'
                                ? 120 / 3
                                : checkWeekly('Monday2') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Tuesday2') == '10'
                                ? 120
                                : checkWeekly('Tuesday2') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Tuesday2') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Tuesday2') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Tuesday2') == '6'
                                ? 120 / 2
                                : checkWeekly('Tuesday2') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Tuesday2') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Tuesday2') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Tuesday2') == '2'
                                ? 120 / 3
                                : checkWeekly('Tuesday2') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Wednesday2') == '10'
                                ? 120
                                : checkWeekly('Wednesday2') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Wednesday2') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Wednesday2') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Wednesday2') == '6'
                                ? 120 / 2
                                : checkWeekly('Wednesday2') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Wednesday2') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Wednesday2') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Wednesday2') == '2'
                                ? 120 / 3
                                : checkWeekly('Wednesday2') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Thursday2') == '10'
                                ? 120
                                : checkWeekly('Thursday2') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Thursday2') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Thursday2') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Thursday2') == '6'
                                ? 120 / 2
                                : checkWeekly('Thursday2') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Thursday2') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Thursday2') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Thursday2') == '2'
                                ? 120 / 3
                                : checkWeekly('Thursday2') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Friday2') == '10'
                                ? 120
                                : checkWeekly('Friday2') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Friday2') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Friday2') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Friday2') == '6'
                                ? 120 / 2
                                : checkWeekly('Friday2') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Friday2') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Friday2') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Friday2') == '2'
                                ? 120 / 3
                                : checkWeekly('Friday2') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Saturday2') == '10'
                                ? 120
                                : checkWeekly('Saturday2') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Saturday2') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Saturday2') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Saturday2') == '6'
                                ? 120 / 2
                                : checkWeekly('Saturday2') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Saturday2') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Saturday2') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Saturday2') == '2'
                                ? 120 / 3
                                : checkWeekly('Saturday2') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Sunday2') == '10'
                                ? 120
                                : checkWeekly('Sunday2') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Sunday2') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Sunday2') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Sunday2') == '6'
                                ? 120 / 2
                                : checkWeekly('Sunday2') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Sunday2') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Sunday2') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Sunday2') == '2'
                                ? 120 / 3
                                : checkWeekly('Sunday2') == '1'
                                ? 120 / 3.5
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
                    <View
                      style={{
                        height: '100%',
                        // width: '90%',
                        flexDirection: 'row',
                        // flexGrow: 1,
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
                              checkWeekly('Monday3') == '10'
                                ? 120
                                : checkWeekly('Monday3') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Monday3') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Monday3') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Monday3') == '6'
                                ? 120 / 2
                                : checkWeekly('Monday3') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Monday3') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Monday3') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Monday3') == '2'
                                ? 120 / 3
                                : checkWeekly('Monday3') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Tuesday3') == '10'
                                ? 120
                                : checkWeekly('Tuesday3') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Tuesday3') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Tuesday3') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Tuesday3') == '6'
                                ? 120 / 2
                                : checkWeekly('Tuesday3') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Tuesday3') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Tuesday3') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Tuesday3') == '2'
                                ? 120 / 3
                                : checkWeekly('Tuesday3') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Wednesday3') == '10'
                                ? 120
                                : checkWeekly('Wednesday3') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Wednesday3') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Wednesday3') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Wednesday3') == '6'
                                ? 120 / 2
                                : checkWeekly('Wednesday3') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Wednesday3') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Wednesday3') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Wednesday3') == '2'
                                ? 120 / 3
                                : checkWeekly('Wednesday3') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Thursday3') == '10'
                                ? 120
                                : checkWeekly('Thursday3') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Thursday3') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Thursday3') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Thursday3') == '6'
                                ? 120 / 2
                                : checkWeekly('Thursday3') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Thursday3') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Thursday3') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Thursday3') == '2'
                                ? 120 / 3
                                : checkWeekly('Thursday3') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Friday3') == '10'
                                ? 120
                                : checkWeekly('Friday3') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Friday3') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Friday3') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Friday3') == '6'
                                ? 120 / 2
                                : checkWeekly('Friday3') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Friday3') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Friday3') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Friday3') == '2'
                                ? 120 / 3
                                : checkWeekly('Friday3') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Saturday3') == '10'
                                ? 120
                                : checkWeekly('Saturday3') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Saturday3') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Saturday3') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Saturday3') == '6'
                                ? 120 / 2
                                : checkWeekly('Saturday3') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Saturday3') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Saturday3') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Saturday3') == '2'
                                ? 120 / 3
                                : checkWeekly('Saturday3') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Sunday3') == '10'
                                ? 120
                                : checkWeekly('Sunday3') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Sunday3') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Sunday3') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Sunday3') == '6'
                                ? 120 / 2
                                : checkWeekly('Sunday3') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Sunday3') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Sunday3') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Sunday3') == '2'
                                ? 120 / 3
                                : checkWeekly('Sunday3') == '1'
                                ? 120 / 3.5
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
                    <View
                      style={{
                        height: '100%',
                        // width: '90%',
                        flexDirection: 'row',
                        // flexGrow: 1,
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
                              checkWeekly('Monday4') == '10'
                                ? 120
                                : checkWeekly('Monday4') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Monday4') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Monday4') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Monday4') == '6'
                                ? 120 / 2
                                : checkWeekly('Monday4') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Monday4') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Monday4') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Monday4') == '2'
                                ? 120 / 3
                                : checkWeekly('Monday4') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Tuesday4') == '10'
                                ? 120
                                : checkWeekly('Tuesday4') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Tuesday4') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Tuesday4') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Tuesday4') == '6'
                                ? 120 / 2
                                : checkWeekly('Tuesday4') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Tuesday4') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Tuesday4') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Tuesday4') == '2'
                                ? 120 / 3
                                : checkWeekly('Tuesday4') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Wednesday4') == '10'
                                ? 120
                                : checkWeekly('Wednesday4') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Wednesday4') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Wednesday4') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Wednesday4') == '6'
                                ? 120 / 2
                                : checkWeekly('Wednesday4') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Wednesday4') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Wednesday4') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Wednesday4') == '2'
                                ? 120 / 3
                                : checkWeekly('Wednesday4') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Thursday4') == '10'
                                ? 120
                                : checkWeekly('Thursday4') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Thursday4') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Thursday4') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Thursday4') == '6'
                                ? 120 / 2
                                : checkWeekly('Thursday4') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Thursday4') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Thursday4') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Thursday4') == '2'
                                ? 120 / 3
                                : checkWeekly('Thursday4') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Friday4') == '10'
                                ? 120
                                : checkWeekly('Friday4') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Friday4') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Friday4') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Friday4') == '6'
                                ? 120 / 2
                                : checkWeekly('Friday4') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Friday4') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Friday4') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Friday4') == '2'
                                ? 120 / 3
                                : checkWeekly('Friday4') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Saturday4') == '10'
                                ? 120
                                : checkWeekly('Saturday4') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Saturday4') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Saturday4') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Saturday4') == '6'
                                ? 120 / 2
                                : checkWeekly('Saturday4') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Saturday4') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Saturday4') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Saturday4') == '2'
                                ? 120 / 3
                                : checkWeekly('Saturday4') == '1'
                                ? 120 / 3.5
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
                              checkWeekly('Sunday4') == '10'
                                ? 120
                                : checkWeekly('Sunday4') == '9'
                                ? 120 / 1.25
                                : checkWeekly('Sunday4') == '8'
                                ? 120 / 1.5
                                : checkWeekly('Sunday4') == '7'
                                ? 120 / 1.75
                                : checkWeekly('Sunday4') == '6'
                                ? 120 / 2
                                : checkWeekly('Sunday4') == '5'
                                ? 120 / 2.25
                                : checkWeekly('Sunday4') == '4'
                                ? 120 / 2.5
                                : checkWeekly('Sunday4') == '3'
                                ? 120 / 2.75
                                : checkWeekly('Sunday4') == '2'
                                ? 120 / 3
                                : checkWeekly('Sunday4') == '1'
                                ? 120 / 3.5
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
                  </ScrollView>
                )}
              </View>
            </View>

            {/* </View> */}
          </View>
        </View>
      </Card>

      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'red',
          width: '100%',
          // justifyContent: 'space-between',
          // height: 40,
          alignItems: 'center',
          // marginTop: 10,
          padding: 8,
        }}>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 100,
            backgroundColor: '#2CC52C',
            margin: 10,
          }}></View>
        <Text
          style={{
            color: '#2CC52C',
            fontFamily: 'Poppins-Regular',
            fontSize: 10,
          }}>
          Feel Prior
        </Text>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 100,
            backgroundColor: '#008B75',
            margin: 8,
          }}></View>
        <Text
          style={{
            color: '#008B75',
            fontFamily: 'Poppins-Regular',
            fontSize: 10,
          }}>
          Feel After
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          marginLeft: 15,
          color: '#008B75',
          fontFamily: 'Poppins-Bold',
        }}>
        Movement
      </Text>
      <View
        style={{
          width: '95%',
          // marginHorizontal: 10,
          marginLeft: 15,
          flexDirection: 'row',
          // height: 20,
          // backgroundColor: 'red',
        }}>
        <FlatList
          data={data}
          numColumns={5}
          // horizontal
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Card
        style={{
          height: 250,
          marginLeft: 15,
          borderRadius: 10,
          // backgroundColor: 'red',
          marginRight: 15,
          // marginTop: -7,
        }}>
        <View
          style={{
            height: 30,
            flexDirection: 'row',
            position: 'absolute',
            zIndex: 3,
            // backgroundColor: 'red',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}>
          {days.map(item => (
            <TouchableOpacity
              onPress={() => {
                setThird(item.name);
                let firstday = new Date(
                  curr.setDate(curr.getDate() - curr.getDay() + item.id),
                );
                setDate2(moment(firstday).format('YYYY-MM-DD'));
              }}
              style={{
                height: 22,
                backgroundColor: third == item.name ? '#008B75' : 'white',
                width: 40,
                borderRadius: 5,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
                borderWidth: 1,
                borderColor: '#008B75',
              }}>
              <Text
                style={{
                  color: third == item.name ? 'white' : '#008B75',
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            height: 250,
            paddingHorizontal: 16,
            // backgroundColor: 'red',
            // flexWrap: 'wrap',
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
              // backgroundColor: 'green',
              top: 20,
              height: 70,
            }}>
            <View>
              <View style={{flexDirection: 'row'}}>
                {/* <Image
                  source={require('../../assets/hour-split_icon.png')}
                  style={{height: 18, width: 18, resizeMode: 'contain'}}
                /> */}
              </View>
              {/* <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  width: 170,
                }}>
                <Text style={{fontFamily: 'Poppins-Medium', color: 'grey'}}>
                  Average Time {average > 0 ? `${average}h` : ''}
                </Text>
              </View> */}
            </View>

            <View
              style={{
                marginLeft: 30,
                flex: 1,
                position: 'absolute',
                right: 20,
                height: 30,
                width: 150,
              }}>
              {/* <View style={{flexDirection: 'row', marginLeft: 20}}>
                <TouchableOpacity
                  onPress={() => {
                    setSleepCheck('1 Week');
                    setAverage('weekly');
                    setPeriod('weekly');
                  }}
                  style={{
                    marginLeft: 20,
                    right: 10,
                    height: 30,
                    backgroundColor:
                      sleepcheck == '1 Week' ? '#008B75' : 'white',
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: '50%',
                    alignItems: 'center',
                    alignContent: 'center',
                    borderWidth: 0.5,
                    borderColor: sleepcheck == '1 Week' ? 'white' : '#008B75',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: sleepcheck == '1 Week' ? 'white' : '#008B75',
                      fontSize: 12,
                    }}>
                    1 Week
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSleepCheck('1 Month');
                    setAverage('monthly');
                    setPeriod('monthly');
                  }}
                  style={{
                    borderWidth: 0.5,
                    marginLeft: 10,
                    right: 10,
                    height: 30,
                    backgroundColor:
                      sleepcheck == '1 Month' ? '#008B75' : 'white',
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: '50%',
                    alignItems: 'center',
                    alignContent: 'center',
                    borderColor: sleepcheck == '1 Month' ? 'white' : '#008B75',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: sleepcheck == '1 Month' ? 'white' : '#008B75',
                      fontSize: 12,
                    }}>
                    1 Month
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
          {/* <View style={{justifyContent:'center',alignContent:'center',marginLeft:30,marginTop:-6}}>
            <Text style={{marginLeft:10}}>Last Week</Text>
</View> */}

          <View
            style={{
              height: '100%',
              zIndex: -1,
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
                // flexWrap: 'wrap',
                height: '100%',
                width: '90%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'purple',
                  width: '100%',
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
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    10
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    8
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    6
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    4
                  </Text>
                  <Text style={{color: Colors.mainBtnscolor, marginLeft: 10}}>
                    2
                  </Text>
                  <Text
                    style={{
                      marginBottom: 20,
                      color: Colors.mainBtnscolor,
                      marginLeft: 10,
                    }}>
                    0
                  </Text>
                </View>

                <View
                  style={{
                    height: '100%',
                    width: '90%',
                    flexDirection: 'row',
                    // flexGrow: 1,
                    // backgroundColor: 'red',
                  }}>
                  <FlatList
                    data={graph2}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem3}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
            </View>

            {/* </View> */}
          </View>
        </View>
      </Card>
      <View style={{height: 50}} />
    </ScrollView>
  );
};

export default Graphscreen;

const styles = StyleSheet.create({});
