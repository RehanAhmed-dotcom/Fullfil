import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/FontAwesome';
import {
  questionsdata,
  datesshow,
  sleepDelete,
  sleepDate,
  addQuestion,
} from '../../lib/api';
import {useSelector} from 'react-redux';

import Colors from '../../constants/colors';
const dates = ({navigation}) => {
  const {userData: user} = useSelector(({USER}) => USER);
  const [category, setCategory] = useState([]);
  const [render, setRender] = useState(false);
  //   const {cat, header} = route.params;
  //   console.log(user.userdata.api_token);
  useEffect(() => {
    navigation.setOptions({
      title: `Sleep`,
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
      //   headerRight: () => (
      //     <TouchableOpacity
      //       style={{
      //         marginRight: 16,
      //         height: 30,
      //         width: 30,
      //         backgroundColor: Colors.mainBtnscolor,
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //         borderRadius: 5,
      //         paddingHorizontal: 5,
      //       }}
      //       onPress={() => navigation.goBack()}>
      //       <Icons name="history" size={20} color={'white'} />
      //     </TouchableOpacity>
      //   ),
    });
  }, []);
  useEffect(() => {
    sleepDate({Auth: user.userdata.api_token}).then(res => {
      console.log('res', res);
      if (res) {
        setCategory(res.dates.reverse());
      } else {
        setCategory([]);
      }
    });
  }, [render]);
  // console.log('res', category);
  //   console.log('item', category);
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('EditSleep', {
          dates: item.date,
        })
      }
      style={{
        backgroundColor: Colors.mainBtnscolor,
        marginTop: 20,
        width: wp(90),
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,

        borderRadius: 10,
      }}>
      <Text style={{color: 'white'}}>{item.date}</Text>
    </TouchableOpacity>
  );
  // console.log(category.questions);
  return (
    <View style={styles.container}>
      {/* <View style={{width: '100%', alignItems: 'center'}}> */}
      <SwipeListView
        data={category}
        rightOpenValue={-75}
        renderItem={renderItem}
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
                sleepDelete({
                  Auth: user.userdata.api_token,
                  id: item.id,
                }).then(res => {
                  setRender(!render);
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
        keyExtractor={item => item.id}
      />
      {/* </View> */}
    </View>
  );
};

export default dates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    // marginTop: 20,
  },
  menustyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.mainBtnscolor,
  },
  Topcontainer: {
    flex: 1.3,
    paddingHorizontal: 16,
    backgroundColor: '#ECF6F4',
  },
  topViewscroll: {
    alignItems: 'center',
    margin: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  middlecontainer: {
    // flex: 3,
    height: hp(70),
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  menuparent: {
    flexDirection: 'row',
    paddingVertical: 4,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomcontainer: {},
});
