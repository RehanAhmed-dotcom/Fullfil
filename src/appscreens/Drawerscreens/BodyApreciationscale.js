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
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/FontAwesome';
import {questionsdata, addQuestion} from '../../lib/api';
import {useSelector, useDispatch} from 'react-redux';
import {
  question,
  addquestion,
  selectquestionbackend,
  selectquestion,
} from '../../redux/actions';
import Colors from '../../constants/colors';
const BodyApreciationscale = ({navigation, route}) => {
  const [respectbodyId0, setrespectbodyId0] = useState(0);
  const {userData: user} = useSelector(({USER}) => USER);
  const {Question, QuestionCopy, SelectedQuestion, SelectedQuestionBackEnd} =
    useSelector(({QUESTIONS}) => QUESTIONS);
  const [category, setCategory] = useState([]);
  const {cat} = route.params;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
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
  const checkOption = (id, index) => {
    // console.log('ind', index);
    const check = SelectedQuestion[index]?.option == id;
    // console.log('check', check, id);
    return check;
  };
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
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 16,
            height: 30,
            width: 30,
            backgroundColor: Colors.mainBtnscolor,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            paddingHorizontal: 5,
          }}
          onPress={() =>
            navigation.navigate('dates', {
              cat,
              header: 'Body Appreciation Scale',
            })
          }>
          <Icons name="history" size={20} color={'white'} />
        </TouchableOpacity>
      ),
    });
  }, []);
  useEffect(() => {
    questionsdata({Auth: user.userdata.api_token, cat: cat, page: page}).then(
      res => {
        console.log('res', JSON.stringify(res));
        if (res) {
          question(res.data.data)(dispatch);
          setCategory(res.data.data);
        } else {
          if (SelectedQuestionBackEnd.length) {
            let newArr = [];
            SelectedQuestionBackEnd.forEach(element => {
              newArr.push({
                question_id: element.id,
                question_type_id: element.question_type_id,
                select_option: element.option,
              });
            });
            console.log('new array', newArr);
            const data1 = {
              date: moment().format('YYYY-MM-DD HH:mm:ss'),

              questionire: newArr,
            };
            addQuestion(
              {
                Auth: user.userdata.api_token,
              },
              data1,
            ).then(res => {
              console.log('responce of question add data', res);
            });
          }
          navigation.navigate('Questioneer');
        }
      },
    );
  }, [page, respectbodyId0, changed]);
  console.log('question', Question);
  console.log('selected array', SelectedQuestionBackEnd);
  console.log('question Copy', QuestionCopy);
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
          {Question.map((item1, index1) => (
            <View key={index1 + 'a'}>
              <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
                {item1.question}
              </Text>
              <FlatList
                data={respectmybody}
                numColumns={5}
                renderItem={({item, index}) => {
                  // console.log('index', item.id);
                  //   'checking condition',
                  //   checkOption(item.id, index) == item.id,
                  // );
                  return (
                    <View style={styles.topViewscroll}>
                      <TouchableOpacity
                        onPress={() => {
                          selectquestion({item1, index: index + 1})(dispatch);
                          selectquestionbackend({item1, index: index + 1})(
                            dispatch,
                          );
                          console.log('includes', item.id, index);
                        }}
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
                          backgroundColor: checkOption(item.id, index1)
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
                              // item1['option' + (index + 1)] == 1
                              //   ? '#fff'
                              //   : Colors.mainBtnscolor,

                              //   fontWeight: 'bold',
                            }}>
                            {item.no}
                          </Text>
                        }
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
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
          <View style={{height: hp(5)}}></View>
        </View>
      </ScrollView>
      <View style={styles.bottomcontainer}>
        <Button
          title={'Next'}
          onPress={() => {
            addquestion()(dispatch);
            setPage(page + 1);
          }}
          style={{borderRadius: 0, height: 80}}
        />
      </View>
    </View>
  );
};

export default BodyApreciationscale;

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
