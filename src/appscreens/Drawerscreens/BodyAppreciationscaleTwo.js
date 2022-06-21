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

import Colors from '../../constants/colors';
const BodyApreciationscaleTwo = ({navigation}) => {
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
              fontSize: 18,
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
        <View style={styles.middlecontainer}>
          <View>
            <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
              I take a positive attitude towards my body.
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
                        // borderColor: Colors.mainBtnscolor,
                        borderWidth: 0.7,
                        borderColor: '#008B75',
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
            <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
              I am attentive to my body's needs
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
                        borderColor: '#008B75',
                        borderWidth: 0.7,
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
              My self worth is independent of my body shape or weight
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
                        elevation: 4,
                        borderColor: '#008B75',
                        borderWidth: 0.7,
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
            <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
              I do not focus a lot of energy being concerned with my body shape
              or weight
            </Text>
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
                        elevation: 4,
                        borderColor: '#008B75',
                        borderWidth: 0.7,
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
          {/* Good quality */}

          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
              My feelings towards my body are positive, for the most part
            </Text>
            <FlatList
              data={goodqualitymybody}
              // horizontal={true}
              numColumns={5}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.topViewscroll}>
                    <TouchableOpacity
                      onPress={() => {
                        const temphandleDatacheck = [...goodqualitymybody];
                        temphandleDatacheck[index].color = !temphandleDatacheck[
                          index
                        ].color;
                        setgoodqualityId(item.id);
                        // setgoodqualitymybody(temphandleDatacheck)
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
                          goodqualityId === item.id
                            ? Colors.mainBtnscolor
                            : '#fff',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color:
                            goodqualityId === item.id
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
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 6,
              top: hp(7.5),
              fontSize: 18,
              fontFamily: 'Poppins-Medium',
            }}>
            6 to 10
          </Text>
          <View style={{height: hp(5)}}></View>
        </View>
      </ScrollView>
      <View style={styles.bottomcontainer}>
        <Button
          title={'Next'}
          onPress={() => navigation.navigate('BodyApreciationscaleThree')}
          style={{borderRadius: 0, height: 80}}
        />
      </View>
    </View>
  );
};

export default BodyApreciationscaleTwo;

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
  bottomcontainer: {},
});

// import React, { useEffect, useState } from 'react'
// import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
// import Button from '../../components/Button'
// import Colors from '../../constants/colors'
// const BodyApreciationscaleTwo = ({ navigation }) => {
//     const [respectmybody, setrespectmybody] = useState([
//         {
//             id: 1,
//             no: 1,
//             color: true
//         },
//         {
//             id: 2,
//             no: 2,
//             color: false
//         },
//         {
//             id: 3,
//             no: 3,
//             color: false
//         },
//         {
//             id: 4,
//             no: 4,
//             color: false
//         },
//         {
//             id: 5,
//             no: 5,
//             color: false
//         },

//     ])
//     const [FeelGoodmybody, setFeelGoodmybody] = useState([
//         {
//             id: 1,
//             no: 1,
//             color: true,
//         },
//         {
//             id: 2,
//             no: 2,
//             color: false
//         },
//         {
//             id: 3,
//             no: 3,
//             color: false
//         },
//         {
//             id: 4,
//             no: 4,
//             color: false
//         },
//         {
//             id: 5,
//             no: 5,
//             color: false
//         },
//     ])
//     const [satisfytmybody, setsatisfytmybody] = useState([
//         {
//             id: 1,
//             no: 1,
//             color: true
//         },
//         {
//             id: 2,
//             no: 2,
//             color: false
//         },
//         {
//             id: 3,
//             no: 3,
//             color: false
//         },
//         {
//             id: 4,
//             no: 4,
//             color: false
//         },
//         {
//             id: 5,
//             no: 5,
//             color: false
//         },
//     ])
//     const [flaws, setflaws] = useState([
//         {
//             id: 1,
//             no: 1,
//             color: true
//         },
//         {
//             id: 2,
//             no: 2,
//             color: false
//         },
//         {
//             id: 3,
//             no: 3,
//             color: false
//         },
//         {
//             id: 4,
//             no: 4,
//             color: false
//         },
//         {
//             id: 5,
//             no: 5,
//             color: false
//         },
//     ])
//     const [goodqualitymybody, setgoodqualitymybody] = useState([
//         {
//             id: 1,
//             no: 1,
//             color: true
//         },
//         {
//             id: 2,
//             no: 2,
//             color: false
//         },
//         {
//             id: 3,
//             no: 3,
//             color: false
//         },
//         {
//             id: 4,
//             no: 4,
//             color: false
//         },
//         {
//             id: 5,
//             no: 5,
//             color: false
//         },
//     ])
//     useEffect(() => {
//         navigation.setOptions({
//             title: '',
//             headerTitleAlign: 'center',
//             headerTitleStyle: {
//                 color: Colors.mainBtnscolor,
//                 fontSize: 16
//             },
//             headerStyle: {
//                 elevation: 0,
//                 backgroundColor: Colors.bgColor
//             },
//             headerLeft: () => (
//                 <Image source={require('../../assets/icon_back.png')} style={{ height: 30, width: 30, borderRadius: 10, marginLeft: 16 }} />
//             ),
//         })
//     }, [])

//     return (
//         <View style={styles.container}>
//             <ScrollView style={{ flexGrow: 1 }}>
//                 <View style={styles.Topcontainer}>
//                     <Text style={{ fontSize: 18, paddingVertical: 6, fontFamily: 'Poppins-SemiBold', }}>Body Appreciation Scale</Text>
//                     <Text style={{ fontSize: 12, color: Colors.GreyText, fontFamily: 'Poppins-Regular' }}>Please indicate where the Question is true about you never,seldom,sometimes,often, or always</Text>
//                     <View style={styles.menuparent}>
//                         <Text style={styles.menustyle}>1 = Never</Text>
//                         <Text style={styles.menustyle}>2 = Seldom</Text>
//                         <Text style={styles.menustyle}>3 = Sometimes</Text>
//                         <Text style={styles.menustyle}>4 = Often</Text>
//                         <Text style={styles.menustyle}>5 = Always</Text>
//                     </View>
//                 </View>
//                 <View style={styles.middlecontainer}>
//                     <View>
//                         <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', }}>I take possitive attitude toward my body</Text>
//                         <FlatList
//                             data={respectmybody}
//                             numColumns={5}
//                             renderItem={({ item, index }) => {
//                                 return (
//                                     <View style={styles.topViewscroll}>
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 const temphandleDatacheck = [...respectmybody]
//                                                 temphandleDatacheck[index].color = !temphandleDatacheck[index].color
//                                                 setrespectmybody(temphandleDatacheck)
//                                             }}
//                                             style={{
//                                                 height: 30,
//                                                 alignItems: 'center',
//                                                 borderRadius: 6,
//                                                 justifyContent: 'center',
//                                                 width: 58,
//                                                 borderWidth: .7,
//                                                 backgroundColor: item.color ? Colors.mainBtnscolor : '#fff'
//                                             }}>
//                                             <Text style={{ color: item.color ? '#fff' : Colors.mainBtnscolor, fontFamily: 'Poppins-Bold' }}>{item.no}</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 )
//                             }}
//                         />
//                     </View>
//                     {/* i feel good about my body */}
//                     <View style={{ marginTop: 15 }}>
//                         <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', }}>I am attentive to my body needs</Text>
//                         <FlatList
//                             data={FeelGoodmybody}
//                             // horizontal={true}
//                             numColumns={5}
//                             renderItem={({ item, index }) => {
//                                 return (
//                                     <View style={styles.topViewscroll}>
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 const temphandleDatacheck = [...FeelGoodmybody]
//                                                 temphandleDatacheck[index].color = !temphandleDatacheck[index].color
//                                                 setFeelGoodmybody(temphandleDatacheck)
//                                             }}
//                                             style={{
//                                                 height: 30,
//                                                 alignItems: 'center',
//                                                 borderRadius: 6,
//                                                 justifyContent: 'center',
//                                                 width: 58,
//                                                 borderWidth: .7,
//                                                 backgroundColor: item.color ? Colors.mainBtnscolor : '#fff'
//                                             }}>
//                                             <Text style={{ fontFamily: 'Poppins-Bold', color: item.color ? '#fff' : Colors.mainBtnscolor }}>{item.no}</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 )
//                             }}
//                         />
//                     </View>

//                     {/* satisfied with my body */}

//                     <View style={{ marginTop: 15 }}>
//                         <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', }}>my self worth is independent of my body shape or weight</Text>
//                         <FlatList
//                             data={satisfytmybody}
//                             // horizontal={true}
//                             numColumns={5}
//                             renderItem={({ item, index }) => {
//                                 return (
//                                     <View style={styles.topViewscroll}>
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 const temphandleDatacheck = [...satisfytmybody]
//                                                 temphandleDatacheck[index].color = !temphandleDatacheck[index].color
//                                                 setsatisfytmybody(temphandleDatacheck)
//                                             }}
//                                             style={{
//                                                 height: 30,
//                                                 alignItems: 'center',
//                                                 borderRadius: 6,
//                                                 justifyContent: 'center',
//                                                 width: 58,
//                                                 borderWidth: .7,
//                                                 backgroundColor: item.color ? Colors.mainBtnscolor : '#fff'
//                                             }}>
//                                             <Text style={{ fontFamily: 'Poppins-Bold', color: item.color ? '#fff' : Colors.mainBtnscolor }}>{item.no}</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 )
//                             }}
//                         />
//                     </View>

//                     {/* flaws...... */}

//                     <View style={{ marginTop: 15 }}>
//                         <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', }}>I donot focus a lot of energy being concrened with my body shape or weight</Text>
//                         <FlatList
//                             data={flaws}
//                             // horizontal={true}
//                             numColumns={5}
//                             renderItem={({ item, index }) => {
//                                 return (
//                                     <View style={styles.topViewscroll}>
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 const temphandleDatacheck = [...flaws]
//                                                 temphandleDatacheck[index].color = !temphandleDatacheck[index].color
//                                                 setflaws(temphandleDatacheck)
//                                             }}
//                                             style={{
//                                                 height: 30,
//                                                 alignItems: 'center',
//                                                 borderRadius: 6,
//                                                 justifyContent: 'center',
//                                                 width: 58,
//                                                 borderWidth: .7,
//                                                 backgroundColor: item.color ? Colors.mainBtnscolor : '#fff'
//                                             }}>
//                                             <Text style={{ fontFamily: 'Poppins-Bold', color: item.color ? '#fff' : Colors.mainBtnscolor }}>{item.no}</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 )
//                             }}
//                         />
//                     </View>
//                     {/* Good quality */}

//                     <View style={{ marginTop: 15 }}>
//                         <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', }}>My feelings towards my body are positive, for the most part</Text>
//                         <FlatList
//                             data={goodqualitymybody}
//                             // horizontal={true}
//                             numColumns={5}
//                             renderItem={({ item, index }) => {
//                                 return (
//                                     <View style={styles.topViewscroll}>
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 const temphandleDatacheck = [...goodqualitymybody]
//                                                 temphandleDatacheck[index].color = !temphandleDatacheck[index].color
//                                                 setgoodqualitymybody(temphandleDatacheck)
//                                             }}
//                                             style={{
//                                                 height: 30,
//                                                 alignItems: 'center',
//                                                 borderRadius: 6,
//                                                 justifyContent: 'center',
//                                                 width: 58,
//                                                 borderWidth: .7,
//                                                 backgroundColor: item.color ? Colors.mainBtnscolor : '#fff'
//                                             }}>
//                                             <Text style={{ fontFamily: 'Poppins-Bold', color: item.color ? '#fff' : Colors.mainBtnscolor }}>{item.no}</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 )
//                             }}
//                         />
//                     </View>
//                     <Text style={{
//                         textAlign: 'center',
//                         paddingVertical: 6, top: 7, fontSize: 18,
//                         fontFamily: 'Poppins-Bold',
//                     }}>6 to 10</Text>
//                 </View>
//             </ScrollView>
//             <View style={styles.bottomcontainer}>
//                 <Button
//                     title={'Next'}
//                     onPress={() => navigation.navigate('BodyApreciationscaleThree')}
//                     style={{ borderRadius: 0, height: 80 }}
//                 />
//             </View>
//         </View >
//     )
// }

// export default BodyApreciationscaleTwo

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // backgroundColor: 'red'
//     },
//     menustyle: {
//         fontSize: 14,
//         fontFamily: 'Poppins-SemiBold',
//         color: Colors.mainBtnscolor
//     },
//     Topcontainer: {
//         flex: 1.3,
//         paddingHorizontal: 16,
//         backgroundColor: Colors.bgColor
//     },
//     topViewscroll: {
//         alignItems: 'center',
//         margin: 4,

//     },
//     middlecontainer: {
//         flex: 3,
//         paddingBottom: 20,
//         paddingTop: 20,
//         paddingHorizontal: 16,
//         backgroundColor: '#fff'
//     },
//     menuparent: {
//         flexDirection: 'row',
//         paddingVertical: 4,
//         flexWrap: 'wrap',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     },
//     bottomcontainer: {
//         backgroundColor: '#fff'

//     },
// })
