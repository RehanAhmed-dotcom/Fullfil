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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/FontAwesome';
import {questionsdata, history} from '../../lib/api';
import {useSelector} from 'react-redux';

import Colors from '../../constants/colors';
const BodyApreciationscaleHistory = ({navigation, route}) => {
  const [respectbodyId0, setrespectbodyId0] = useState(0);
  const {userData: user} = useSelector(({USER}) => USER);
  const [category, setCategory] = useState([]);
  const {cat, date, header} = route.params;

  const [page, setPage] = useState(1);
  const [respectbodyId1, setrespectbodyId1] = useState(0);
  const [respectbodyId2, setrespectbodyId2] = useState(0);
  const [respectbodyId3, setrespectbodyId3] = useState(0);
  const [respectbodyId4, setrespectbodyId4] = useState(0);
  const [respectmybody, setrespectmybody] = useState([
    {
      id: 1,
      no: 1,
      color: true,
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
  ]);
  const [respectmybody1, setrespectmybody1] = useState([
    {
      id: 1,
      no: 1,
      color: true,
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
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      title: '',
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
    history({Auth: user.userdata.api_token, date, cat: cat}).then(res => {
      console.log('resia', res);
      if (res) {
        setCategory(res.history);
      } else {
        navigation.navigate('Questioneer');
      }
    });
  }, [page, respectbodyId0, changed]);
  const checkOption = (id, index) => {
    // console.log('ind', index);
    const check = category[index]?.option == id;
    // console.log('check', check, id);
    return check;
  };
  console.log('res', cat);
  // console.log(category.questions);
  console.log('header', header);
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        {header == 'Body Appreciation Scale' ? (
          <View style={styles.Topcontainer}>
            <Text
              style={{
                fontSize: 16,
                paddingVertical: 6,
                fontFamily: 'Poppins-Medium',
              }}>
              Body Appreciation Scale
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#7B829E',
                fontFamily: 'Poppins-Regular',
              }}>
              Please indicate if the question is true about you never, seldom,
              sometimes, often, or always.
            </Text>
            <View style={styles.menuparent}>
              <Text style={styles.menustyle}>1= Never</Text>
              <Text style={styles.menustyle}>2= Seldom</Text>
              <Text style={styles.menustyle}>3= Sometimes</Text>
              <Text style={styles.menustyle}>4= Often</Text>
              <Text style={styles.menustyle}>5= Always</Text>
            </View>
          </View>
        ) : header == 'Intuitive Eating Scale' ? (
          <View style={styles.Topcontainer}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
                paddingVertical: 6,
              }}>
              Intuitive Eating Scale
            </Text>
            <View style={styles.menuparent}>
              <Text style={styles.menustyle}>1 = Strongly Disagree</Text>
              <Text style={styles.menustyle}>2 = Disagree</Text>
              <Text style={styles.menustyle}>3 = Neutral</Text>
              <Text style={styles.menustyle}>4 = Agree</Text>
              <Text style={styles.menustyle}>5 = Strongly Agree</Text>
            </View>
          </View>
        ) : (
          <View style={styles.Topcontainer}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
                paddingVertical: 6,
              }}>
              Mental/Physical Health Self-Assessment
            </Text>
            <View style={styles.menuparent}>
              <Text style={styles.menustyle}>
                Take a moment to assess your physical and mental health over the
                past 2-3 weeks
              </Text>
            </View>
          </View>
        )}

        <View style={styles.middlecontainer}>
          {category.map((item1, index1) => (
            <View key={index1 + 'a'}>
              <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
                {item1.question}
              </Text>
              <View>
                <FlatList
                  data={cat == 3 ? respectmybody1 : respectmybody}
                  // numColumns={cat == 3 ? 10 : 5}
                  horizontal
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.topViewscroll}>
                        <View
                          // onPress={() => {
                          //   const temphandleDatacheck = [...respectmybody];
                          //   temphandleDatacheck[index].color =
                          //     !temphandleDatacheck[index].color;
                          //   setrespectbodyId0(index + 1);
                          //   // console.log('redes', index + 1);
                          //   addQuestion({
                          //     Auth: user.userdata.api_token,
                          //     question_id: item1.id,
                          //     date: new Date().toISOString().slice(0, 10),
                          //     question_type_id: item1.question_type_id,
                          //     option1: index + 1 == 1 ? 1 : 0,
                          //     option2: index + 1 == 2 ? 1 : 0,
                          //     option3: index + 1 == 3 ? 1 : 0,
                          //     option4: index + 1 == 4 ? 1 : 0,
                          //     option5: index + 1 == 5 ? 1 : 0,
                          //   }).then(res => {
                          //     console.log('ressdf', res);
                          //     setChanged(!changed);
                          //   });
                          //   // console.log(item1['option' + (index + 1)] == 1);
                          //   // setrespectmybody(temphandleDatacheck)
                          // }}
                          style={{
                            height: 30,
                            alignItems: 'center',
                            borderRadius: 6,
                            justifyContent: 'center',
                            width: 58,
                            elevation: 4,
                            borderColor: '#008B75',
                            // borderColor: Colors.mainBtnscolor,
                            borderWidth: 0.7,
                            backgroundColor:
                              // respectbodyId0 === item.id
                              checkOption(item.id, index1)
                                ? Colors.mainBtnscolor
                                : '#fff',
                          }}>
                          {
                            <Text
                              style={{
                                fontFamily: 'Poppins-Regular',
                                color:
                                  // const str1=

                                  checkOption(item.id, index1)
                                    ? '#fff'
                                    : Colors.mainBtnscolor,

                                //   fontWeight: 'bold',
                              }}>
                              {item.no}
                            </Text>
                          }
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          ))}

          {/* <Text
            style={{
              textAlign: 'center',
              paddingVertical: 30,
              top: hp(10),
              fontSize: 18,
              fontFamily: 'Poppins-Medium',
            }}>
            1 to 5
          </Text> */}
          <View style={{height: hp(5)}}>{/* <Text>abc</Text> */}</View>
        </View>
      </ScrollView>
      {/* <View style={styles.bottomcontainer}>
        <Button
          title={'Next'}
          onPress={() => setPage(page + 1)}
          style={{borderRadius: 0, height: 80}}
        />
      </View> */}
    </View>
  );
};

export default BodyApreciationscaleHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
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
    // height: hp(70),
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
