import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import InputFields from '../components/inputFields';
import Button from '../components/Button';
import Colors from '../constants/colors';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import {checkemail} from '../lib/api';
import {checkmail} from '../redux/actions';
import {
  widthPercentageToDP,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
// import { TouchableOpacity } from 'react-native-gesture-handler';
const registerscreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [checkdata, setcheckdata] = useState('');
  const {height} = useWindowDimensions();
  const [firName, setfirName] = useState('');
  const [firstErr, setFirstErr] = useState('');
  const [lastName, setlastName] = useState('');
  const [lastErr, setLastErr] = useState('');
  const [user, setUser] = useState(false);
  const [eMail, seteMail] = useState('');
  const [eMailErr, seteMailErr] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
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
  const validateEmail = emailC => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };

  const signup = () => {
    if (!firName && !lastName && !validateEmail(eMail)) {
      setFirstErr('asdf');
      setLastErr('asdf');
      seteMailErr('asdf');
    } else if (!firName) {
      setFirstErr('asdf');
    } else if (!lastName) {
      setLastErr('asdf');
    } else if (!validateEmail(eMail)) {
      seteMailErr('asdf');
    } else {
      const formdata = new FormData();
      formdata.append('username', firName);
      formdata.append('email', eMail);

      checkemail(formdata).then(res => {
        console.log('response', res);
        setcheckdata(res);
        // alert(checkdata.email)
        if (res && !res.email && firName && lastName && validateEmail(eMail)) {
          checkmail(res)(dispatch);
          // alert('email does not already exist')

          navigation.navigate('Loginscreen', {firName, lastName, eMail});
        } else {
          alert('Email already exists');
        }
      });
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          // backgroundColor: 'red',
          height: hp(100),
          justifyContent: 'center',
        }}>
        <View style={styles.containerTwo}>
          {/* <Image source={require('../assets/logoMain.png')} style={styles.Logo} /> */}
          <Image
            source={require('../assets/FeelGoodApp.png')}
            style={styles.Logo}
          />
          <Text
            style={{
              marginTop: 10,
              fontFamily: 'Poppins-SemiBold',
              color: Colors.mainBtnscolor,
            }}>
            Feel Good App
          </Text>
          <Text style={styles.createAcc}>Create Account</Text>
          <Text
            style={{
              fontSize: 14,
              color: '#7F7F7F',
              fontFamily: 'Poppins-Medium',
            }}>
            Sign up to get started!
          </Text>
        </View>
        <View style={styles.containerThree}>
          <View>
            <View style={styles.inputfiledcontainer}>
              <Text style={styles.fieldName}>First Name</Text>
              <View
                style={{
                  backgroundColor: Colors.bgColor,
                  borderRadius: 6,
                  height: 50,
                  borderColor: firstErr ? 'red' : Colors.mainBtnscolor,

                  // elevation: 2,
                  borderWidth: user ? 0 : 0.3,
                  // borderWidth: forgot ? inputFieldstyle : 1,
                  paddingHorizontal: 14,
                  alignItems: 'center',
                  flexDirection: 'row',
                  // ...style
                }}>
                {/* {!user ? <LeftIcon /> : null} */}

                <TextInput
                  returnKeyType="done"
                  style={{
                    backgroundColor: Colors.bgColor,
                    // fontFamily: 'ElliotSans-Regular',
                    fontSize: 14,
                    paddingLeft: 16,
                    color: '#008B75',
                    fontFamily: 'Poppins-Regular',
                    width: '85%',
                  }}
                  value={firName}
                  placeholderTextColor={'#9D9EB5'}
                  onChangeText={text => {
                    firstErr && setFirstErr('');
                    setfirName(text);
                  }}
                  // placeholder={'first'}
                />
                {/* {right ? <RightIcon /> : null} */}
              </View>
            </View>
            <View style={styles.inputfiledcontainer}>
              <Text style={styles.fieldName}>Last Name</Text>
              <View
                style={{
                  backgroundColor: Colors.bgColor,
                  borderRadius: 6,
                  height: 50,
                  borderColor: lastErr ? 'red' : Colors.mainBtnscolor,
                  // elevation: 2,
                  borderWidth: user ? 0 : 0.3,
                  // borderWidth: forgot ? inputFieldstyle : 1,
                  paddingHorizontal: 14,
                  alignItems: 'center',
                  flexDirection: 'row',
                  // ...style
                }}>
                {/* {!user ? <LeftIcon /> : null} */}

                <TextInput
                  returnKeyType="done"
                  style={{
                    backgroundColor: Colors.bgColor,
                    // fontFamily: 'ElliotSans-Regular',
                    fontSize: 14,
                    paddingLeft: 16,
                    color: '#008B75',
                    fontFamily: 'Poppins-Regular',
                    width: '85%',
                  }}
                  value={lastName}
                  placeholderTextColor={'#9D9EB5'}
                  onChangeText={text => {
                    lastErr && setLastErr('');
                    setlastName(text);
                  }}
                  // placeholder={'last'}
                />
                {/* {right ? <RightIcon /> : null} */}
              </View>
            </View>
            <View style={styles.inputfiledcontainer}>
              <Text style={styles.fieldName}>Email</Text>
              <View
                style={{
                  // backgroundColor: 'red',
                  backgroundColor: Colors.bgColor,
                  borderRadius: 6,
                  height: 50,
                  borderColor: eMailErr ? 'red' : Colors.mainBtnscolor,
                  // elevation: 2,
                  borderWidth: user ? 0 : 0.3,
                  // borderWidth: forgot ? inputFieldstyle : 1,
                  paddingHorizontal: 14,
                  alignItems: 'center',
                  flexDirection: 'row',
                  // ...style
                }}>
                {/* {!user ? <LeftIcon /> : null} */}

                <TextInput
                  returnKeyType="done"
                  style={{
                    backgroundColor: Colors.bgColor,
                    // fontFamily: 'ElliotSans-Regular',
                    fontSize: 14,
                    paddingLeft: 16,
                    color: '#008B75',
                    fontFamily: 'Poppins-Regular',
                    width: '85%',
                  }}
                  value={eMail}
                  placeholderTextColor={'#9D9EB5'}
                  onChangeText={text => {
                    eMailErr && seteMailErr('');
                    seteMail(text);
                  }}
                  // placeholder={'mail'}
                />
                {/* {right ? <RightIcon /> : null} */}
                {eMail !== '' && validateEmail(eMail) === true && (
                  <Icon
                    style={{marginLeft: 40}}
                    name="checkcircle"
                    style={{color: Colors.mainBtnscolor}}
                    size={20}
                  />
                )}
              </View>
            </View>
            {eMailErr ? (
              <Text style={{marginTop: 5, color: 'red'}}>
                Enter correct Email
              </Text>
            ) : null}
          </View>
          <View style={styles.spaces} />
          <Button
            title={'Sign Up'}
            // onPress={() => {

            //   if (firName && lastName && validateEmail(eMail)) {
            //     navigation.navigate('Loginscreen', {firName, lastName, eMail});
            //   } else {
            //     if (!firName && !lastName && !validateEmail(eMail)) {
            //       setFirstErr('asdf');
            //       setLastErr('asdf');
            //       seteMailErr('asdf');
            //     } else if (!firName) {
            //       setFirstErr('asdf');
            //     } else if (!lastName) {
            //       setLastErr('asdf');
            //     } else if (!validateEmail(eMail)) {
            //       seteMailErr('asdf');
            //     }
            //   }
            // }}
            onPress={signup}
          />
          {keyboardStatus && <View style={{height: 200}} />}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 15,
                fontFamily: 'Poppins-SemiBold',
                fontSize: 12,
                // marginTop: 10,
              }}>
              Already have an account,
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: Colors.mainBtnscolor,
                  fontSize: 14,
                  marginTop: 10,
                  // backgroundColor:'red'
                }}>
                {' '}
                Sign In
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{height: 40}}></View> */}
      </View>
    </ScrollView>
  );
};

export default registerscreen;
const styles = StyleSheet.create({
  container: {
    // flex: 1,\
    flex: 1,
    // height: '100%',
    backgroundColor: 'white',
    paddingTop: 40,
    // paddingBottom: 30,
    // marginBottom: 20,
  },
  containerTwo: {
    // flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  createAcc: {
    fontSize: 18,
    marginTop: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  spaces: {
    height: 20,
    marginTop: 70,
  },
  fieldName: {
    paddingVertical: 4,
    paddingLeft: 3,
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Poppins-Medium',
  },
  containerThree: {
    // flex: 2.5,
    // position: 'absolute',
    // bottom: 0,
    justifyContent: 'center',
    // backgroundColor: 'red',
    paddingHorizontal: 16,
  },
  inputfiledcontainer: {
    margin: 2,
    marginTop: 30,
  },

  Logo: {
    height: 100,
    width: 100,
    // borderRadius: 20,
    borderRadius: 10,
    resizeMode: 'contain',
  },
});
