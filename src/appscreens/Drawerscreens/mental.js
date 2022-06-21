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
import moment from 'moment';
import Button from '../../components/Button';
import Colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {
  question,
  addquestion,
  selectquestionbackend,
  selectquestion,
} from '../../redux/actions';
import Icons from 'react-native-vector-icons/FontAwesome';
import {questionsdata, addQuestion} from '../../lib/api';
const mental = ({navigation, route}) => {
  const {cat} = route.params;
  const [respectbodyId, setrespectbodyId] = useState(1);
  const [feelgoodId, setfeelgoodId] = useState(1);
  const [satisfyId, setsatisfyId] = useState(1);
  const [flawsId, setflawsId] = useState(1);
  const [category, setCategory] = useState([]);
  const {userData: user} = useSelector(({USER}) => USER);
  const [page, setPage] = useState(1);
  const {Question, QuestionCopy, SelectedQuestion, SelectedQuestionBackEnd} =
    useSelector(({QUESTIONS}) => QUESTIONS);
  const dispatch = useDispatch();
  const checkOption = (id, index) => {
    // console.log('ind', index);
    const check = SelectedQuestion[index]?.option == id;
    // console.log('check', check, id);
    return check;
  };
  const [changed, setChanged] = useState(false);
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
              header: 'Mental/Physical Health Self-Assessment',
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
        if (res) {
          // console.log('i called', JSON.stringify(res));
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
  }, [page, respectbodyId, changed]);
  // console.log('cat', category[0]);
  console.log('question', Question);
  console.log('abc', Question[0]?.option);
  return (
    <View style={styles.container}>
      <ScrollView style={{flexGrow: 1}}>
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
        <View style={styles.middlecontainer}>
          {Question.map((item1, index1) => (
            <View
              style={{
                backgroundColor: '#ECF6F4',
                marginBottom: 10,
                borderRadius: 10,

                // flexWrap: 'wrap',
                padding: 10,
              }}
              key={index1 + 'a'}>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  width: wp(85),
                  // height: 50,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 5,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {item1.question}
                </Text>
                <Text>
                  {SelectedQuestion[index1].option == '1' ||
                  SelectedQuestion[index1].option == '2'
                    ? 'Poor'
                    : SelectedQuestion[index1].option == '3' ||
                      SelectedQuestion[index1].option == '4'
                    ? 'Fair'
                    : SelectedQuestion[index1].option == '5' ||
                      SelectedQuestion[index1].option == '6'
                    ? 'Good'
                    : SelectedQuestion[index1].option == '7' ||
                      SelectedQuestion[index1].option == '8'
                    ? 'Very Good'
                    : SelectedQuestion[index1].option == '9' ||
                      SelectedQuestion[index1].option == '10'
                    ? 'Excellent'
                    : ''}
                </Text>
              </View>
              <FlatList
                data={respectmybody}
                horizontal
                // numColumns={10}
                renderItem={({item, index}) => {
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
                        //   //   const temphandleDatacheck = [...respectmybody];
                        //   //   temphandleDatacheck[index].color =
                        //   // !temphandleDatacheck[index].color;
                        //   setrespectbodyId(item.id);
                        //   addQuestion({
                        //     Auth: user.userdata.api_token,
                        //     question_id: item1.id,
                        //     question_type_id: item1.question_type_id,
                        //     date: new Date().toISOString().slice(0, 10),
                        //     option1: index + 1 == 1 ? 1 : 0,
                        //     option2: index + 1 == 2 ? 1 : 0,
                        //     option3: index + 1 == 3 ? 1 : 0,
                        //     option4: index + 1 == 4 ? 1 : 0,
                        //     option5: index + 1 == 5 ? 1 : 0,
                        //     option6: index + 1 == 6 ? 1 : 0,
                        //     option7: index + 1 == 7 ? 1 : 0,
                        //     option8: index + 1 == 8 ? 1 : 0,
                        //     option9: index + 1 == 9 ? 1 : 0,
                        //     option10: index + 1 == 10 ? 1 : 0,
                        //   }).then(res => {
                        //     console.log(res);
                        //     setChanged(!changed);
                        //   });
                        //   // setrespectmybody(temphandleDatacheck)
                        // }}
                        style={{
                          height: 30,
                          alignItems: 'center',
                          borderRadius: 6,
                          justifyContent: 'center',
                          width: 58,
                          // borderColor: Colors.mainBtnscolor,
                          borderWidth: 0.7,
                          elevation: 4,
                          borderColor: '#008B75',
                          backgroundColor: checkOption(item.id, index1)
                            ? Colors.mainBtnscolor
                            : '#fff',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Regular',
                            color: checkOption(item.id, index1)
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
          ))}

          <View style={{height: hp(5)}}></View>
        </View>
      </ScrollView>
      <View style={styles.bottomcontainer}>
        <Button
          title={'Next'}
          onPress={() => setPage(page + 1)}
          style={{borderRadius: 0, height: 80}}
        />
      </View>
    </View>
  );
};

export default mental;

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
    color: 'grey',
  },
  Topcontainer: {
    flex: 1.3,
    paddingHorizontal: 16,
    backgroundColor: 'white',
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
    // back
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  menuparent: {
    // flexDirection: 'row',
    paddingVertical: 4,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomcontainer: {},
});
