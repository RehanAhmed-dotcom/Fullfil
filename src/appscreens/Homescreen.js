import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Keyboard,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Colors from '../constants/colors';
import {Left, Right, Card} from 'native-base';
import {CheckBox} from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import AddIcon from 'react-native-vector-icons/Ionicons';
import RemoveIcon from 'react-native-vector-icons/Entypo';
import {
  viewAffirmation,
  addtodoList,
  viewTodoList,
  addQuestion,
  deleteTodoList,
} from '../lib/api';
import {clearQuestion} from '../redux/actions';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Button from '../components/Button';

const Homescreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [datachecked, setdatachecked] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [todoData, setTodoData] = useState('');
  const [id, setId] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [affirmation, setAffirmation] = useState('');
  const [vis, setVis] = useState(false);
  const [vis1, setVis1] = useState(false);
  const {Questions, QuestionCopy, SelectedQuestions, SelectedQuestionBackEnds} =
    useSelector(({QUESTIONS}) => QUESTIONS);
  const {userData: user} = useSelector(({USER}) => USER);
  // const { data } = route.params;

  console.log('array', user.userdata.api_token);
  // console.log('name', user.userdata.dob);
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: Colors.screenBgColor,
        elevation: 0,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../assets/menu_icon.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginLeft: 16,
            }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Mediascreen')}>
          <Image
            source={require('../assets/music_icon.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginRight: 16,
            }}
          />
        </TouchableOpacity>
      ),
    });
    SplashScreen.hide();
    if (SelectedQuestionBackEnds.length) {
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
      addQuestion({Auth: user.userdata.api_token}, data1).then(res => {
        console.log('responce of question', res);
        clearQuestion()(dispatch);
      });
    }
  }, []);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  useEffect(() => {
    // console.log('calling');

    viewTodoList({Auth: user.userdata.api_token}).then(res => {
      // console.log('calling', JSON.stringify(res));
      if (res) {
        setTodoList(res.data);
      }
    });
  }, [vis, vis1, datachecked]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewAffirmation({Auth: user.userdata.api_token}).then(res => {
        if (res) {
          setAffirmation(res.data.affirmation);
        } else {
          setAffirmation('Write your own daily affirmation');
        }
      });
    });
    return unsubscribe;
  }, [navigation]);
  const myModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {
          setVis(!vis);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: keyboardStatus ? 'flex-start' : 'center',
            backgroundColor: '#00000088',
          }}>
          <View
            style={{
              height: 400,
              width: '90%',
              marginTop: 40,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
                // backgroundColor: 'red',
                right: 10,
                marginTop: 10,
              }}>
              <Icon
                name="circle-with-cross"
                size={24}
                onPress={() => setVis(!vis)}
              />
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>To Do List</Text>
              <View
                style={{
                  borderColor: 'black',
                  marginTop: 20,
                  backgroundColor: '#ccc',
                  width: '90%',
                  borderRadius: 10,
                  margintop: 10,
                }}>
                <TextInput
                  numberOfLines={10}
                  multiline={true}
                  returnKeyType="done"
                  textAlignVertical="top"
                  placeholderTextColor={'grey'}
                  // placeholder={'Add Todo list data'}
                  // value={todoData}
                  onChangeText={text => {
                    setTodoData(text);
                  }}
                  // multiline
                  style={{
                    height: 170,
                    width: '95%',
                    borderColor: 'black',
                    // padding: 20,
                    paddingLeft: 15,
                    color: 'black',
                    paddingTop: 15,

                    // backgroundColor:'red',
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  // paddingBottom: 20,
                  marginTop: '20%',
                  paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    todoData &&
                      addtodoList({
                        Auth: user.userdata.api_token,
                        todo_task: todoData,
                      }).then(res => {
                        if (res) {
                          setVis(!vis);
                        } else {
                          Alert.alert('Some thing went wrong');
                        }
                      });
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderRadius: 15,
                    width: '45%',
                    backgroundColor: '#008B75',
                  }}>
                  <Text style={{color: 'white'}}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVis(!vis);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderRadius: 15,
                    width: '45%',
                    backgroundColor: 'grey',
                  }}>
                  <Text style={{color: 'white'}}> Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const myModal1 = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis1}
        onRequestClose={() => {
          setVis1(!vis1);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000088',
          }}>
          <View
            style={{
              height: '25%',
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
                // backgroundColor: 'red',
                right: 10,
                marginTop: 10,
              }}>
              <Icon
                name="circle-with-cross"
                size={20}
                onPress={() => setVis1(!vis1)}
              />
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Are you sure?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 30,
                  width: '50%',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    deleteTodoList({
                      Auth: user.userdata.api_token,
                      todo_id: id,
                    }).then(res => {
                      if (res) {
                        // console.log(res);
                        setVis1(!vis1);
                      }
                    });
                  }}>
                  <Text>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVis1(!vis1)}>
                  <Text>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // console.log(user.userdata.api_token);
  // console.log(todoList);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.subView}>
          <Text
            // onPress={() => navigation.navigate('ContactUs')}
            style={styles.WelcomeText}>
            Welcome {user.userdata.username}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Myprofile')}>
            <Image
              source={
                user?.userdata?.image
                  ? {uri: user?.userdata?.image}
                  : require('../assets/placeholder.png')
              }
              style={styles.userImage}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              paddingVertical: 6,
              fontSize: 16,
              color: 'black',
              fontFamily: 'Poppins-Medium',
            }}>
            Daily Affirmation
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Affirmation')}>
            <Card
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: 'white',
                borderRadius: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Left>
                  <Image
                    source={require('../assets/left_quote.png')}
                    style={{...styles.leftcote}}
                  />
                </Left>
                <Right />
              </View>
              <View style={{paddingHorizontal: 24}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: 'Poppins-Medium',
                    color: Colors.mainBtnscolor,
                  }}>
                  {affirmation}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Left />
                <Right>
                  <Image
                    source={require('../assets/left_quote.png')}
                    style={styles.rightcote}
                  />
                </Right>
              </View>
            </Card>
          </TouchableOpacity>
          <View style={{height: 20}} />
          <Button
            title={'Feel Good Flash Cards'}
            onPress={() => navigation.navigate('Affirmation')}
          />
          <View style={styles.AddingData}>
            <Left>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 20,
                  fontFamily: 'Poppins-Regular',
                }}>
                To do list
              </Text>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={() => {
                  setVis(!vis);
                }}
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                <AddIcon
                  name={'add-circle'}
                  size={24}
                  color={Colors.mainBtnscolor}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#008B75',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Add New
                </Text>
              </TouchableOpacity>
            </Right>
          </View>
          {todoList.map((item, index) => (
            <Card
              key={index + 'a'}
              style={{paddingHorizontal: 12, bottom: 5, borderRadius: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Left>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                      checked={item.is_complete == 0 ? false : true}
                      onPress={() => {
                        addtodoList({
                          Auth: user.userdata.api_token,
                          todo_id: item.id,
                          todo_task: item.todo_task,
                          is_complete: 1,
                        }).then(res => {
                          setdatachecked(res);
                        });
                      }}
                      checkedColor={'#64C277'}
                      uncheckedColor={'#64C277'}
                    />
                    <View style={styles.Line} />
                    <Text
                      style={{
                        marginLeft: 18,
                        textDecorationLine:
                          item.is_complete == 1 ? 'line-through' : null,
                        fontFamily: 'Poppins-Medium',
                        color: '#8788A5',
                      }}>
                      {item.todo_task}
                    </Text>
                  </View>
                </Left>
                <Right>
                  <RemoveIcon
                    onPress={() => {
                      setId(item.id);
                      setVis1(!vis1);
                    }}
                    name={'cross'}
                    size={24}
                    color={'#64C277'}
                  />
                </Right>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
      {myModal()}
      {myModal1()}
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBgColor,
    // marginTop: 40,
    paddingHorizontal: 16,
  },
  WelcomeText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  userImage: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#008B75',
    borderRadius: 40,
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
  Line: {
    height: 40,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: '#64C277',
    width: 3,
  },
  AddingData: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  subView: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  leftcote: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  rightcote: {
    height: 30,
    width: 30,
    transform: [{rotate: '180deg'}],
    resizeMode: 'contain',
  },
});
