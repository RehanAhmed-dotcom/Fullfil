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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Button from '../../components/Button';
import Colors from '../../constants/colors';
const InuativescaleOne = ({navigation}) => {
  const [respectbodyId, setrespectbodyId] = useState(1);
  const [feelgoodId, setfeelgoodId] = useState(1);
  const [satisfyId, setsatisfyId] = useState(1);
  const [flawsId, setflawsId] = useState(1);
  const [goodqualityId, setgoodqualityId] = useState(1);
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
  const [FeelGoodmybody, setFeelGoodmybody] = useState([
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
  const [satisfytmybody, setsatisfytmybody] = useState([
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
  const [flaws, setflaws] = useState([
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
  const [goodqualitymybody, setgoodqualitymybody] = useState([
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
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{flexGrow: 1}}>
        <View style={styles.Topcontainer}>
          <Text
            style={{
              fontSize: 16,
              paddingVertical: 6,
              fontFamily: 'Poppins-Medium',
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
        <View style={styles.middlecontainer}>
          <View>
            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 5,
                fontFamily: 'Poppins-Medium',
              }}>
              I do not follow eating rules, or dieting plans that dictate what,
              when, and/or how much to eat.
            </Text>
            <View style={{height: 5}} />
            <FlatList
              data={respectmybody}
              numColumns={5}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.topViewscroll}>
                    <TouchableOpacity
                      onPress={() => {
                        const temphandleDatacheck = [...respectmybody];
                        temphandleDatacheck[index].color = !temphandleDatacheck[
                          index
                        ].color;
                        setrespectbodyId(item.id);
                        // setrespectmybody(temphandleDatacheck)
                      }}
                      style={{
                        height: 30,
                        alignItems: 'center',
                        borderRadius: 6,
                        justifyContent: 'center',
                        width: 58,
                        elevation: 4,
                        borderColor: '#008B75',
                        borderWidth: 0.7,
                        backgroundColor:
                          respectbodyId === item.id
                            ? Colors.mainBtnscolor
                            : '#fff',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color:
                            respectbodyId === item.id
                              ? '#fff'
                              : Colors.mainBtnscolor,
                          //   fontWeight: 'bold',
                        }}>
                        {item.no}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          {/* i feel good about my body */}
          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 5,
                fontFamily: 'Poppins-Medium',
              }}>
              I find myself eating when I'm feeling emotional (e.g anxious,
              depressed, sad), even I'm not physically hungry
            </Text>
            <View style={{height: 5}} />
            <FlatList
              data={FeelGoodmybody}
              // horizontal={true}
              numColumns={5}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.topViewscroll}>
                    <TouchableOpacity
                      onPress={() => {
                        const temphandleDatacheck = [...FeelGoodmybody];
                        temphandleDatacheck[index].color = !temphandleDatacheck[
                          index
                        ].color;
                        setfeelgoodId(item.id);
                        // setFeelGoodmybody(temphandleDatacheck)
                      }}
                      style={{
                        height: 30,
                        alignItems: 'center',
                        borderRadius: 6,
                        justifyContent: 'center',
                        width: 58,
                        borderWidth: 0.7,
                        borderColor: '#008B75',
                        elevation: 4,
                        backgroundColor:
                          feelgoodId === item.id
                            ? Colors.mainBtnscolor
                            : '#fff',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color:
                            feelgoodId === item.id
                              ? '#fff'
                              : Colors.mainBtnscolor,
                        }}>
                        {item.no}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>

          {/* satisfied with my body */}

          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 5,
                fontFamily: 'Poppins-Medium',
              }}>
              I find myself eating when I am lonely, even when I'm not
              physically hungry.
            </Text>
            <View style={{height: 5}} />
            <FlatList
              data={satisfytmybody}
              // horizontal={true}
              numColumns={5}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.topViewscroll}>
                    <TouchableOpacity
                      onPress={() => {
                        const temphandleDatacheck = [...satisfytmybody];
                        temphandleDatacheck[index].color = !temphandleDatacheck[
                          index
                        ].color;
                        setsatisfyId(item.id);
                        // setsatisfytmybody(temphandleDatacheck)
                      }}
                      style={{
                        height: 30,
                        alignItems: 'center',
                        borderRadius: 6,
                        justifyContent: 'center',
                        width: 58,
                        borderWidth: 0.7,
                        borderColor: '#008B75',
                        elevation: 4,
                        backgroundColor:
                          satisfyId === item.id ? Colors.mainBtnscolor : '#fff',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color:
                            satisfyId === item.id
                              ? '#fff'
                              : Colors.mainBtnscolor,
                        }}>
                        {item.no}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>

          {/* flaws...... */}

          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 5,
                fontFamily: 'Poppins-Medium',
              }}>
              I use food to help me soothe my negative emotions.
            </Text>
            <View style={{height: 5}} />
            <FlatList
              data={flaws}
              // horizontal={true}
              numColumns={5}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.topViewscroll}>
                    <TouchableOpacity
                      onPress={() => {
                        const temphandleDatacheck = [...flaws];
                        temphandleDatacheck[index].color = !temphandleDatacheck[
                          index
                        ].color;
                        setflawsId(item.id);
                        // setflaws(temphandleDatacheck)
                      }}
                      style={{
                        height: 30,
                        alignItems: 'center',
                        borderRadius: 6,
                        justifyContent: 'center',
                        width: 58,
                        borderWidth: 0.7,
                        borderColor: '#008B75',
                        elevation: 4,
                        backgroundColor:
                          flawsId === item.id ? Colors.mainBtnscolor : '#fff',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color:
                            flawsId === item.id ? '#fff' : Colors.mainBtnscolor,
                        }}>
                        {item.no}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 10,
              top: hp(12),
              fontSize: 18,
              fontFamily: 'Poppins-Medium',
            }}>
            6 to 9
          </Text>
          <View style={{height: hp(10)}}></View>
        </View>
      </ScrollView>
      <View style={styles.bottomcontainer}>
        <Button
          title={'Next'}
          onPress={() => navigation.navigate('InuativescaleTwo')}
          style={{borderRadius: 0, height: 80}}
        />
      </View>
    </View>
  );
};

export default InuativescaleOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },
  menustyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginVertical: 4,
    margin: 4,
    // padding: 4,
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
  },
  middlecontainer: {
    flex: 3,
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
    justifyContent: 'flex-start',
  },
  bottomcontainer: {},
});
