import {Left, Right, Card, Body, Item} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import AddIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/colors';
import CalendarStrip from 'react-native-calendar-strip';
import {useSelector, useDispatch} from 'react-redux';
import {
  viewMeal,
  viewWaterbyId,
  viewMealbyId,
  deleteWater,
  deleteFood,
} from '../lib/api';
import moment from 'moment';
const Foodscreen = ({navigation}) => {
  const {userData: user} = useSelector(({USER}) => USER);
  const [meal, setMeal] = useState([]);
  const [show, setShow] = useState(false);
  const [opp, setOpp] = useState(false);
  const [selDate, setSelDate] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return show ? (
          <TextInput
            placeholder="Search Food"
            placeholderTextColor="grey"
            // value={jrnl}
            onChangeText={text => {
              // setJrnl(text);
              // searchText(text);
            }}
            style={{
              backgroundColor: '#ccc',
              marginLeft: 10,
              width: '100%',
              paddingLeft: 10,
              borderRadius: 10,
              height: 40,
              width: Platform.OS === 'ios' ? 200 : 130,
            }}
          />
        ) : null;
      },
      // headerTitleAlign: 'center',
      headerTitleStyle: {
        color: Colors.mainBtnscolor,
        fontSize: 16,
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.screenBgColor,
      },
      headerLeft: () => (
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            marginLeft: 24,
            color: Colors.mainBtnscolor,
          }}>
          Food
        </Text>
      ),
      // headerRight: () => (
      //   <TouchableOpacity onPress={() => setShow(true)}>
      //     <Image
      //       source={require('../assets/search.png')}
      //       style={{height: 30, width: 30, borderRadius: 10, marginRight: 16}}
      //     />
      //   </TouchableOpacity>
      // ),
    });
  }, [show]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewMeal({Auth: user.userdata.api_token})
        .then(res => {
          const locArray = [...res.data];
          console.log('res of meal time ', res);
          const promises = locArray.map(item => {
            console.log('whole item', item);
            // console.log('ids', item.id);
            // console.log('data', user.userdata.api_token);
            // console.log('dta', selDate);
            return item.title == 'Fluid Intake'
              ? viewWaterbyId({
                  Auth: user.userdata.api_token,
                  id: item.id,
                  date: selDate,
                })
              : viewMealbyId({
                  Auth: user.userdata.api_token,
                  id: item.id,
                  date: selDate,
                });
          });
          // console.log('promisessss', promises);

          Promise.all(promises)
            .then(results => {
              // console.log('result', results);
              results.forEach((item, index) => {
                locArray[index]['children'] = item ? item.data : [];
              });
            })
            .then(() => {
              setMeal(locArray);
              // console.log('Mealsssssssssss', locArray);
            })
            .catch(e => {
              console.log('results error', e);
            });
        })
        .catch(e => console.log('error outer api', e));
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    viewMeal({Auth: user.userdata.api_token})
      .then(res => {
        const locArray = [...res.data];

        const promises = locArray.map(item => {
          return item.title == 'Water'
            ? viewWaterbyId({
                Auth: user.userdata.api_token,
                id: item.id,
                date: selDate,
              })
            : viewMealbyId({
                Auth: user.userdata.api_token,
                id: item.id,
                date: selDate,
              });
        });
        // console.log('promisessss', promises);

        Promise.all(promises)
          .then(results => {
            console.log('result', JSON.stringify(results));
            results.forEach((item, index) => {
              locArray[index]['children'] = item ? item.data : [];
            });
          })
          .then(() => {
            setMeal(locArray);
            // console.log('Mealsssssssssss', locArray);
          })
          .catch(e => {
            console.log('results error', e);
          });
      })
      .catch(e => console.log('error outer api', e));
  }, [opp]);
  // console.log('me', meal);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: 8}} />
        <View>
          <CalendarStrip
            scrollable
            selectedDate={selDate}
            highlightDateContainerStyle={{backgroundColor: 'white'}}
            onDateSelected={date => {
              setSelDate(moment(date).format('YYYY-MM-DD'));
              console.log('date', moment(date).format('YYYY-MM-DD'));
              setOpp(!opp);
            }}
            style={{
              paddingTop: 10,
              borderRadius: 10,
              backgroundColor: Colors.mainBtnscolor,
              paddingBottom: 10,
            }}
            calendarColor={'#3343CE'}
            calendarHeaderStyle={{color: 'white', bottom: 5}}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            iconContainer={{flex: 0.1}}
          />
        </View>
        {meal.map((item, index) => (
          <>
            <View key={index + 'a'} style={{flexDirection: 'row'}}>
              <Left>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Poppins-Medium',
                      marginLeft: 12,
                      color: Colors.mainBtnscolor,
                    }}>
                    {item.title}
                  </Text>
                </View>
              </Left>
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    //  console.log('id', item.id)
                    item.title == 'Fluid Intake'
                      ? navigation.navigate('AddWater', {id: item.id})
                      : navigation.navigate('AddFood', {id: item.id});
                  }}
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
                      margin: Platform.OS === 'ios' ? 8 : 0,
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </Right>
            </View>
            <SwipeListView
              data={item.children}
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
                      // console.log('clicked', item);
                      item.drink_name
                        ? deleteWater({
                            Auth: user.userdata.api_token,
                            water_id: item.id,
                          }).then(res => {
                            setOpp(!opp);
                            console.log('res', res);
                          })
                        : deleteFood({
                            Auth: user.userdata.api_token,
                            meal_id: item.id,
                          }).then(res => {
                            setOpp(!opp);
                            console.log('res', res);
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
                // console.log()
                return (
                  <TouchableOpacity
                    onPress={() => {
                      console.log('items of list', item);
                      item.drink_name
                        ? navigation.navigate('EditWater', {item})
                        : navigation.navigate('EditFoodscreen', {item});
                    }}>
                    <Card
                      key={'a' + index}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        backgroundColor: '#fff',
                        // height: 80,
                        borderRadius: 10,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // backgroundColor: 'red',
                            }}>
                            {/* <Image
                              source={{uri: item.image}}
                              style={{height: 50, width: 50, borderRadius: 10}}
                            /> */}
                            <View
                              style={{
                                marginLeft: 10,
                                // backgroundColor: 'red',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  // marginLeft: 10,
                                  fontFamily: 'Poppins-Medium',
                                }}>
                                {item.drink_name ? item.drink_name : item.title}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  // backgroundColor: 'red',
                                  // width: '100%',
                                  justifyContent: 'space-between',
                                  // flex: 1,
                                  width: '90%',
                                  // paddingVertical: 20,
                                }}>
                                <Text
                                  style={{
                                    color: Colors.black,
                                    paddingTop: 10,
                                    fontSize: 14,
                                    fontFamily: 'Poppins-Regular',
                                  }}>
                                  {/* {item.amount_type
                                    ? 'Amount'
                                    : ``} */}
                                  {item.drink_name
                                    ? `Quantity: ${' '}`
                                    : `Hunger before:${' '}`}
                                  <Text
                                    style={{
                                      color: Colors.mainBtnscolor,
                                      fontSize: 14,
                                      fontFamily: 'Poppins-Regular',
                                    }}>
                                    {item.drink_name
                                      ? item.amount
                                      : item.hunger_level}
                                  </Text>
                                </Text>
                                <Text
                                  style={{
                                    color: Colors.black,
                                    paddingTop: 10,
                                    fontSize: 14,
                                    fontFamily: 'Poppins-Regular',
                                  }}>
                                  {item.drink_name
                                    ? `Type: ${' '}`
                                    : ` Felt After:${' '}`}

                                  <Text
                                    style={{
                                      color: Colors.mainBtnscolor,
                                      fontSize: 14,
                                      fontFamily: 'Poppins-Regular',
                                    }}>
                                    {item.drink_name
                                      ? item.amount_type
                                      : item.feel_after_eat == 'Other'
                                      ? item.feel_after_eat_note
                                      : item.feel_after_eat[0]}
                                    {/* {item.feel_after_eat
                                      ? item.feel_after_eat[0]
                                      : ''} */}
                                  </Text>
                                </Text>
                              </View>
                              {!item.drink_name && (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    // backgroundColor: 'red',
                                    // width: '100%',
                                    justifyContent: 'space-between',
                                    // flex: 1,
                                    width: '90%',
                                    // paddingVertical: 20,
                                  }}>
                                  <Text
                                    style={{
                                      color: Colors.black,
                                      paddingTop: 10,
                                      fontSize: 14,
                                      fontFamily: 'Poppins-Regular',
                                    }}>
                                    {/* {item.amount_type
                                    ? 'Amount'
                                    : ``} */}
                                    {item.drink_name
                                      ? `Quantity: ${' '}`
                                      : `Fullness:${' '}`}
                                    <Text
                                      style={{
                                        color: Colors.mainBtnscolor,
                                        fontSize: 14,
                                        fontFamily: 'Poppins-Regular',
                                      }}>
                                      {item.drink_name
                                        ? item.amount
                                        : item.fullness_level}
                                    </Text>
                                  </Text>
                                </View>
                              )}

                              <Text
                                style={{
                                  fontSize: 12,
                                  color: Colors.GreyText,
                                  // textAlign: 'right',
                                  marginTop: 10,
                                  fontFamily: 'Poppins-Regular',
                                }}>
                                {item.time}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <Body></Body>
                        <Right
                          style={{
                            flex: 3,
                            // backgroundColor: 'blue',
                            // justifyContent: 'flex-start',
                          }}>
                          <View
                            style={{
                              width: 140,
                              // backgroundColor: 'red',
                              flex: 1,
                            }}></View>
                        </Right>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              }}
            />
          </>
        ))}
      </ScrollView>
    </View>
  );
};

export default Foodscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.screenBgColor,
  },
});
