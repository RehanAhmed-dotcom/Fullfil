import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Card, Left, Body, Right} from 'native-base';
import Modal from 'react-native-modal';
import CalendarStrip from 'react-native-calendar-strip';
import {CheckBox} from 'react-native-elements';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import {SwipeListView} from 'react-native-swipe-list-view';
import {viewMoment, viewMomentbyId, deleteMoment} from '../lib/api';
import Colors from '../constants/colors';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import AddIcon from 'react-native-vector-icons/Ionicons';
const Movement = ({navigation}) => {
  const [defaultmodal, setdefaultmodal] = useState(true);
  const [modalCheck, setmodalCheck] = useState(false);
  const {userData: user} = useSelector(({USER}) => USER);
  const {showmov} = useSelector(({USER}) => USER);
  const [opp, setOpp] = useState(false);
  const [meal, setMeal] = useState([]);
  const [selDate, setSelDate] = useState(moment().format('YYYY-MM-DD'));
  const [show, setShow] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return show ? (
          <TextInput
            placeholder="Search Movement"
            placeholderTextColor="grey"
            // value={jrnl}
            onChangeText={text => {
              // setJrnl(text);
              searchText(text);
            }}
            style={{
              backgroundColor: '#ccc',
              marginLeft: 20,
              width: '100%',
              paddingLeft: 10,
              borderRadius: 10,
              height: 40,
            }}
          />
        ) : null;
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
        color: Colors.bgColor,
      },
      headerLeft: () => (
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            marginLeft: 24,
            color: Colors.mainBtnscolor,
          }}>
          Movement
        </Text>
        // <TouchableOpacity onPress={() => navigation.goBack()}>
        //     <Image source={require('../assets/icon_back.png')} style={{
        //         height: 30,
        //         width: 30,
        //         borderRadius: 10,
        //         marginLeft: 16
        //     }} />
        // </TouchableOpacity>
      ),
      // headerRight: () => (
      //   // <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 24, color: Colors.mainBtnscolor }}>Movement</Text>
      //   <TouchableOpacity onPress={() => setShow(true)}>
      //     <Image
      //       source={require('../assets/search.png')}
      //       style={{
      //         height: 30,
      //         width: 30,
      //         borderRadius: 10,
      //         marginRight: 16,
      //       }}
      //     />
      //   </TouchableOpacity>
      // ),
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.screenBgColor,
      },
    });
  }, [show]);
  // console.log(user.userdata.api_token, selDate);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewMomentbyId({
        Auth: user.userdata.api_token,
        movement_time: selDate,
      }).then(res => {
        setMeal(res.data);
        // console.log(res.data);
      });
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    viewMomentbyId({
      Auth: user.userdata.api_token,
      movement_time: selDate,
    }).then(res => {
      setMeal(res.data);
      // console.log(res.data);
    });
  }, [opp]);
  const searchText = e => {
    let filteredName = [];
    if (e) {
      filteredName = meal.filter(item => {
        // console.log(item);
        return item.title.includes(e);
      });
      setMeal(filteredName);
      // filteredName = [];
    }
  };
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     viewMoment({Auth: user.userdata.api_token}).then(res => {
  //       const locArray = [...res.data];
  //       // setMeal(res.data);
  //       // console.log(res.data);
  //       const promises = locArray.map(item => {
  //         return viewMomentbyId({Auth: user.userdata.api_token, id: item.id});
  //       });
  //       Promise.all(promises)
  //         .then(results => {
  //           results.forEach((item, index) => {
  //             locArray[index]['children'] = item ? item.data : [];
  //           });
  //         })
  //         .then(() => {
  //           setMeal(locArray);
  //         });
  //     });
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const AfterNoon = [
    {
      id: 1,
      cardText: 'Biking',
      timeago: '20 Minutes',
      notification: 'Excited',
      time: '07:30',
      stress: 'Stressed',
    },
  ];
  const morning = [
    {
      id: 1,
      cardText: 'Dancing',
      timeago: '20 Minutes',
      notification: 'Excited',
      time: '07:30',
      stress: 'Stressed',
    },
  ];
  // console.log('res', meal);
  const button = () => {
    setdefaultmodal(false);
  };
  // console.log('meal', meal);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 14,
        backgroundColor: Colors.screenBgColor,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Text onPress={() => setdefaultmodal(true)}>Show MOdal</Text> */}
        <View style={{height: 8}} />
        <View>
          <CalendarStrip
            scrollable
            selectedDate={selDate}
            highlightDateContainerStyle={{backgroundColor: 'white'}}
            onDateSelected={date => {
              setSelDate(moment(date).format('YYYY-MM-DD'));
              // console.log('date', moment(date).format('YYYY-MM-DD'));
              setOpp(!opp);
            }}
            style={{
              paddingTop: 20,
              backgroundColor: Colors.mainBtnscolor,
              paddingBottom: 10,
              borderRadius: 10,
            }}
            calendarColor={'#3343CE'}
            calendarHeaderStyle={{color: 'white', bottom: 5}}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            iconContainer={{flex: 0.1}}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Left>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-Medium',
                  marginLeft: 12,
                  color: Colors.mainBtnscolor,
                }}>
                Movement
              </Text>
            </View>
          </Left>
          <Right>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddNewmovement')}
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
          data={meal}
          rightOpenValue={-75}
          renderHiddenItem={({item}) => (
            <View
              style={{
                // backgroundColor: 'red',
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 0,
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  // console.log(item.id);
                  deleteMoment({
                    Auth: user.userdata.api_token,
                    movement_id: item.id,
                  }).then(res => {
                    setOpp(!opp);
                    // console.log('res', res);
                  });
                }}
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
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditMoment', {item})}>
                  <Card
                    key={'a' + index}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Left style={{flex: 3}}>
                        <View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'Poppins-Regular',
                              color: Colors.mainBtnscolor,
                              paddingTop: 6,
                              top: 4,
                            }}>
                            {item.time ? item.time : '0'} min
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'Poppins-Regular',
                              color: Colors.black,
                              paddingVertical: 16,
                            }}>
                            Felt Prior :{' '}
                            <Text
                              style={{
                                color: Colors.mainBtnscolor,
                                fontFamily: 'Poppins-Regular',
                              }}>
                              {item.feel_prior_attributes
                                ? item.feel_prior_attributes[0]
                                : ''}
                            </Text>
                          </Text>
                        </View>
                      </Left>
                      <Body></Body>
                      <Right style={{flex: 3}}>
                        <View>
                          <Text
                            style={{
                              fontSize: 12,
                              color: Colors.GreyText,
                              textAlign: 'right',
                              fontFamily: 'Poppins-Regular',
                            }}></Text>
                          <Text
                            style={{
                              color: Colors.black,
                              paddingVertical: 28,
                              top: 16,
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Felt After :{' '}
                            <Text
                              style={{
                                color: Colors.mainBtnscolor,
                                fontFamily: 'Poppins-Regular',
                              }}>
                              {item.feel_after_attributes
                                ? item.feel_after_attributes[0]
                                : ''}
                            </Text>
                          </Text>
                        </View>
                      </Right>
                    </View>
                  </Card>
                </TouchableOpacity>
              </>
            );
          }}
        />
        {/* </> */}
        {/* ))} */}
      </ScrollView>
      {!showmov ? (
        <Modal
          isVisible={defaultmodal}
          onBackButtonPress={() => setdefaultmodal(false)}>
          <Card
            style={{
              paddingVertical: 12,
              borderRadius: 8,
              paddingHorizontal: 12,
            }}>
            <Text style={styles.topTextModal}>
              This tab is designed to help you get back in touch with your body
              and explore joyful movement.
            </Text>
            <Text style={styles.topTextModal}>
              There are so many benefits to movement that have nothing to do
              with our shape, size or how our body looks.
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                marginTop: 20,
                fontFamily: 'Poppins-Medium',
                color: Colors.mainBtnscolor,
              }}>
              Movement has been shown to improve:
            </Text>
            <View style={{height: 15}} />
            <View
              style={{
                backgroundColor: '#ECF6F4',
                borderRadius: 10,
                paddingHorizontal: 6,
              }}>
              <Text style={styles.modalText}>Mood</Text>
              <Text style={styles.modalText}>Balance</Text>
              <Text style={styles.modalText}>Strength</Text>
              <Text style={styles.modalText}>Stress Level</Text>
              <Text style={styles.modalText}>Bone Strength</Text>
              <Text style={styles.modalText}>Memory</Text>
              <Text style={styles.micro}>Gut Microbiome</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CheckBox
                checked={modalCheck}
                onPress={() => {
                  setmodalCheck(!modalCheck);
                  //
                }}
                uncheckedColor={Colors.mainBtnscolor}
                checkedColor={Colors.mainBtnscolor}
              />
              <Text
                style={{
                  fontSize: 14,
                  right: 10,
                  color: Colors.mainBtnscolor,
                  fontFamily: 'Poppins-Medium',
                }}>
                Don't show this data again
              </Text>
            </View>
            <Button onPress={() => setdefaultmodal(false)} title={'Continue'} />
          </Card>
        </Modal>
      ) : null}
    </View>
  );
};

export default Movement;

const styles = StyleSheet.create({
  modalText: {
    borderBottomWidth: 0.3,
    borderColor: '#008B7533',

    paddingVertical: 6,
    textAlign: 'center',
    fontSize: 13,
    color: Colors.mainBtnscolor,
    fontFamily: 'Poppins-Medium',
  },
  topTextModal: {
    textAlign: 'center',
    paddingVertical: 6,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  micro: {
    paddingVertical: 6,
    textAlign: 'center',
    fontSize: 14,
    color: Colors.mainBtnscolor,
    fontFamily: 'Poppins-Medium',
    // fontWeight: 'bold',
  },
});
