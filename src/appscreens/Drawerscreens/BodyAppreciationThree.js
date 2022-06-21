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
import Colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BodyApreciationscaleTwo = ({navigation}) => {
  const [respectbodyId, setrespectbodyId] = useState(1);
  const [feelgoodId, setfeelgoodId] = useState(1);
  const [feelgoodId1, setfeelgoodId1] = useState(1);
  const [satisfyId, setsatisfyId] = useState(1);
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
  const [FeelGoodmybody1, setFeelGoodmybody1] = useState([
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
        <Image
          source={require('../../assets/icon_back.png')}
          style={{height: 30, width: 30, borderRadius: 10, marginLeft: 16}}
        />
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
            Body Appreciation Scale
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.GreyText,
              fontFamily: 'Poppins-Regular',
            }}>
            Please indicate if the question is true about you never, seldom,
            sometimes, often, or always.
          </Text>
          <View style={styles.menuparent}>
            <Text style={styles.menustyle}>1 = Never</Text>
            <Text style={styles.menustyle}>2 = Seldom</Text>
            <Text style={styles.menustyle}>3 = Sometimes</Text>
            <Text style={styles.menustyle}>4 = Often</Text>
            <Text style={styles.menustyle}>5 = Always</Text>
          </View>
        </View>
        <View style={styles.middlecontainer}>
          <View>
            <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
              I engage in healthy behaviors to take care of my body.
            </Text>
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
                        // borderColor: Colors.mainBtnscolor,
                        borderWidth: 0.7,
                        backgroundColor:
                          respectbodyId === item.id
                            ? Colors.mainBtnscolor
                            : '#fff',
                      }}>
                      <Text
                        style={{
                          color:
                            respectbodyId === item.id
                              ? '#fff'
                              : Colors.mainBtnscolor,
                          fontFamily: 'Poppins-Regular',
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
            <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
              For women: I do not allow unrealisticaly thin images of women
              presented in the media to affect my attitudes toward my body.
            </Text>
            <FlatList
              data={FeelGoodmybody1}
              // horizontal={true}
              numColumns={5}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.topViewscroll}>
                    <TouchableOpacity
                      onPress={() => {
                        const temphandleDatacheck = [...FeelGoodmybody1];
                        temphandleDatacheck[index].color = !temphandleDatacheck[
                          index
                        ].color;
                        setfeelgoodId1(item.id);
                        // setFeelGoodmybody(temphandleDatacheck)
                      }}
                      style={{
                        height: 30,
                        alignItems: 'center',
                        borderRadius: 6,
                        justifyContent: 'center',
                        width: 58,
                        borderWidth: 0.7,
                        elevation: 4,
                        borderColor: '#008B75',
                        backgroundColor:
                          feelgoodId1 === item.id
                            ? Colors.mainBtnscolor
                            : '#fff',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color:
                            feelgoodId1 === item.id
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

          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
              For men: I do not allow unrealisticaly muscular images of men
              presented in the media to affect my attitudes toward my body.
            </Text>
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
                        elevation: 4,
                        borderWidth: 0.7,
                        borderColor: '#008B75',
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
            <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
              Despite its imperfections, I still like my body.
            </Text>
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
                        borderColor: '#008B75',
                        borderWidth: 0.7,
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
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins-Medium',
              paddingVertical: 10,
              top: hp(11),
              fontSize: 18,
            }}>
            11 to 14
          </Text>
          <View style={{height: hp(9)}}></View>
        </View>
      </ScrollView>
      <View style={styles.bottomcontainer}>
        <Button
          title={'Finish'}
          style={{borderRadius: 0, height: 80}}
          onPress={() => navigation.navigate('Questioneer')}
        />
      </View>
    </View>
  );
};

export default BodyApreciationscaleTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
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
    justifyContent: 'space-between',
  },
  bottomcontainer: {
    // backgroundColor: 'red',
  },
});
