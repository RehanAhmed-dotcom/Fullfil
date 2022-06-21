import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Platform,
} from 'react-native';
import Button from '../components/Button';
import Colors from '../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {register, questionMental} from '../lib/api';
import {logged} from '../redux/actions';
import moment from 'moment';
import {
  questions,
  addquestion,
  selectquestionbackends,
  selectquestions,
} from '../redux/actions';
// import {useSelector, useDispatch} from 'react-redux';
const HealthAssesment = ({navigation, route}) => {
  const {Questions, QuestionCopy, SelectedQuestions, SelectedQuestionBackEnds} =
    useSelector(({QUESTIONS}) => QUESTIONS);
  const dispatch = useDispatch();
  const [selectedId, setselectedId] = useState(0);
  const [selectedIdErr, setselectedIdErr] = useState('');
  const [selectedIdEnergy, setselectedIdEnergy] = useState(0);
  const [selectedIdEnergyErr, setselectedIdEnergyErr] = useState('');
  const [DisgestionId, setDisgestionId] = useState(0);
  const [DisgestionIdErr, setDisgestionIdErr] = useState('');
  const [MoodId, setMoodId] = useState(0);
  const [MoodIdErr, setMoodIdErr] = useState('');
  const [FoodId, setFoodId] = useState(0);
  const [FoodIdErr, setFoodIdErr] = useState('');
  const [cope, setCope] = useState(0);
  const [copeErr, setCopeErr] = useState('');
  const [activity, setActivity] = useState(0);
  const [activityErr, setActivityErr] = useState('');
  // const dispatch = useDispatch();
  const {
    firName,
    lastName,
    eMail,
    userName,
    password,
    date,
    handleDatacheck,
    handleEatedDatacheck,
  } = route.params;
  console.log(
    //   firName,
    //   lastName,
    //   eMail,
    //   userName,
    //   password,
    //   date,
    handleDatacheck,
    handleEatedDatacheck,
    selectedId,
    selectedIdEnergy,
    DisgestionId,
    MoodId,
    FoodId,
  );
  const [SleepQuality, setSleepQuality] = useState([
    {
      id: 1,
      number: 1,
      color: false,
    },
    {
      id: 2,
      number: 2,
      color: false,
    },
    {
      id: 3,
      number: 3,
      color: false,
    },
    {
      id: 4,
      number: 4,
      color: false,
    },
    {
      id: 5,
      number: 5,
      color: false,
    },
    {
      id: 6,
      number: 6,
      color: false,
    },
    {
      id: 7,
      number: 7,
      color: false,
    },
    {
      id: 8,
      number: 8,
      color: false,
    },
    {
      id: 9,
      number: 9,
      color: false,
    },
    {
      id: 10,
      number: 10,
      color: false,
    },
  ]);
  const checkOption = (id, index) => {
    // console.log('ind', index);
    const check = SelectedQuestions[index]?.option == id;
    // console.log('check', check, id);
    return check;
  };

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icon_back.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginLeft: 16,
            }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: 'white',
      },
    });
  }, []);
  // const SleepQuality = [
  useEffect(() => {
    questionMental().then(res => {
      console.log('mental', res);
      questions(res.question)(dispatch);
    });
  }, []);
  // ]
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.Topcontainer}>
          <Text
            style={{
              fontSize: 18,
              color: '#0A0D47',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Mental/Physical Health Self-Assessment
          </Text>
          <Text
            style={{
              fontSize: 16,
              paddingVertical: 12,
              fontFamily: 'Poppins-Medium',
              color: '#9D9EB5',
            }}>
            Take a moment to assess your physical and mental health over the
            past 2-3 weeks
          </Text>
        </View>

        <View style={styles.Midcontainer}>
          {Questions.map((item1, index1) => (
            <View
              style={{
                backgroundColor: '#ECF6F4',
                borderRadius: 10,
                paddingVertical: 10,
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                }}>
                <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
                  {item1.question}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.mainBtnscolor,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  {SelectedQuestions[index1].option == '1' ||
                  SelectedQuestions[index1].option == '2'
                    ? 'Poor'
                    : SelectedQuestions[index1].option == '3' ||
                      SelectedQuestions[index1].option == '4'
                    ? 'Fair'
                    : SelectedQuestions[index1].option == '5' ||
                      SelectedQuestions[index1].option == '6'
                    ? 'Good'
                    : SelectedQuestions[index1].option == '7' ||
                      SelectedQuestions[index1].option == '8'
                    ? 'Very Good'
                    : SelectedQuestions[index1].option == '9' ||
                      SelectedQuestions[index1].option == '10'
                    ? 'Excellent'
                    : ''}
                </Text>
              </View>
              <FlatList
                data={SleepQuality}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{margin: 6, marginVertical: 6}}
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <View style={{margin: 10}}>
                      <TouchableOpacity
                        onPress={() => {
                          selectquestions({item1, index: index + 1})(dispatch);
                          selectquestionbackends({item1, index: index + 1})(
                            dispatch,
                          );
                          console.log('includes', item.id, index);
                        }}
                        // onPress={() => {
                        //   setselectedIdErr('');
                        //   const temphandleDatacheck = [...SleepQuality];
                        //   temphandleDatacheck[index].color =
                        //     !temphandleDatacheck[index].color;
                        //   selectedId == item.id
                        //     ? setselectedId(0)
                        //     : setselectedId(item.id);

                        //   setSleepQuality(temphandleDatacheck);
                        // }}
                        style={{
                          height: 30,
                          alignItems: 'center',
                          backgroundColor: checkOption(item.id, index1)
                            ? Colors.mainBtnscolor
                            : '#fff',
                          // backgroundColor: item.color ? Colors.mainBtnscolor : '#fff',
                          padding: 4,
                          paddingLeft: 6,
                          paddingRight: 6,
                          justifyContent: 'center',
                          width: 30,
                          borderRadius: 20,
                          borderColor: selectedIdErr
                            ? 'red'
                            : Colors.mainBtnscolor,
                          borderWidth: 1,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Poppins-Medium',
                            color: checkOption(item.id, index1)
                              ? '#fff'
                              : Colors.mainBtnscolor,
                          }}>
                          {item.number}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          ))}

          {/* .........Digestion data.......... */}

          {/* Enrrgy data */}

          {/* .....Mood data......... */}

          {/* .....Mood data......... */}
        </View>
        <View style={{height: 20}} />
      </ScrollView>
      <View style={styles.Bottomcontainer}>
        <Button
          title={'Next'}
          onPress={() => {
            let newArr = [];
            SelectedQuestionBackEnds.forEach(element => {
              newArr.push({
                question_id: element.id,
                question_type_id: element.question_type_id,
                select_option: element.option,
              });
            });
            const data1 = {
              date: moment().format('YYYY-MM-DD HH:mm:ss'),

              questionire: newArr,
            };
            console.log('data', data1);
            // if (
            //   selectedId &&
            //   selectedIdEnergy &&
            //   DisgestionId &&
            //   MoodId &&
            //   FoodId &&
            //   cope &&
            //   activity
            // ) {
            const data = new FormData();
            data.append('email', eMail);
            data.append('password', password);
            data.append('firstname', firName);
            data.append('lastname', lastName);
            data.append('username', userName);
            data.append('dob', date);
            data.append('date', moment().format('YYYY-MM-DD HH:mm:ss'));
            // data.append('')
            // SelectedQuestionBackEnds.forEach(item => {
            // data.append('questionire', newArr);
            // });
            //-----
            // data.append('question_data', data1);
            //-----
            handleDatacheck.forEach(item => {
              item.check == true && data.append('using_app[]', item.text);
            });
            handleEatedDatacheck.forEach(item1 => {
              item1.check == true &&
                data.append('inuitive_eating[]', item1.text);
            });
            console.log('Diplay', JSON.stringify(data));

            // alert(date)
            register(data)
              .then(res => {
                console.log('res of signup', res);
                if (res) {
                  console.log('abc', res);
                  logged(res)(dispatch);
                } else {
                  Alert.alert('Some thing went wrong');
                }
              })
              .catch(err => {
                console.log('err in signup', err.response.message);
              });
            // navigation.navigate('HomeScreen',{});
            // } else {
            //   if (
            //     !selectedId &&
            //     !selectedIdEnergy &&
            //     !DisgestionId &&
            //     !MoodId &&
            //     !FoodId &&
            //     !cope &&
            //     !activity
            //   ) {
            //     setselectedIdErr('asdf');
            //     setselectedIdEnergyErr('asdf');
            //     setDisgestionIdErr('asdf');
            //     setMoodIdErr('asdf');
            //     setFoodIdErr('asdf');
            //     setCopeErr('asd');
            //     setActivityErr('asd');
            //   } else if (!selectedId) {
            //     setselectedIdErr('adf');
            //   } else if (!selectedIdEnergy) {
            //     setselectedIdEnergyErr('asdf');
            //   } else if (!DisgestionId) {
            //     setDisgestionIdErr('asdf');
            //   } else if (!MoodId) {
            //     setMoodIdErr('asdf');
            //   } else if (!FoodId) {
            //     setFoodIdErr('asdf');
            //   } else if (!cope) {
            //     setCopeErr('asdf');
            //   } else if (!activity) {
            //     setActivityErr('asdf');
            //   }
            // }
          }}
        />
      </View>
    </View>
  );
};

export default HealthAssesment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  Topcontainer: {
    flex: 0.2,
    paddingHorizontal: 4,
    paddingVertical: 6,
    // backgroundColor: 'grey'
  },
  Midcontainer: {
    flex: 4,
    // backgroundColor: 'green'
  },
  Bottomcontainer: {
    flex: 1,
    paddingBottom: 60,
    // backgroundColor: 'yellow'
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
});
