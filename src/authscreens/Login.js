import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import InputFields from '../components/inputFields';
import Button from '../components/Button';
import Colors from '../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import IconEmailIcon from 'react-native-vector-icons/Ionicons';
import LockIcon from 'react-native-vector-icons/Fontisto';
import {login} from '../lib/api';
import {logged} from '../redux/actions';
import Loader from '../components/Loader';
const Login = ({navigation}) => {
  const [loading, setloading] = useState(false);

  const [userName, setuserName] = useState('');
  const [userErr, setUserErr] = useState('');
  const [password, setpassword] = useState('');
  const [passErr, setPassErr] = useState('');
  const [user, setUser] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   navigation.setOptions({
  //     title: '',

  //     headerStyle: {
  //       elevation: 0,
  //       backgroundColor: 'white',
  //     },
  //   });
  // }, []);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.containerTwo}>
        {loading ? <Loader /> : null}

        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/FeelGoodApp.png')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 10,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              marginTop: 10,
              fontFamily: 'Poppins-SemiBold',
              color: Colors.mainBtnscolor,
            }}>
            Feel Good App
          </Text>
        </View>
        <Text style={styles.creatText}>Login into existing account</Text>
        {/* <Text style={styles.accdetails}>
          so you can directly login with these details
        </Text> */}
        <View style={{}}>
          <Text style={styles.Namefields}>Username</Text>
          {/* <InputFields
            value={userName}
            placeholder={'Enter Username'}
            onChangeText={text => setuserName(text)}
            LeftIcon={() => (
              <IconEmailIcon
                color={Colors.mainBtnscolor}
                name={'person-outline'}
                size={18}
              />
            )}
            user={false}
          /> */}
          <View
            style={{
              backgroundColor: Colors.bgColor,
              borderRadius: 6,
              height: 50,
              borderColor: userErr ? 'red' : Colors.mainBtnscolor,
              // elevation: 2,
              borderWidth: user ? 0 : 0.5,
              // borderWidth: forgot ? inputFieldstyle : 1,
              paddingHorizontal: 14,
              alignItems: 'center',
              flexDirection: 'row',

              // ...style
            }}>
            {!user ? (
              <Image
                source={require('../assets/username.png')}
                style={{width: 18, resizeMode: 'contain', height: 18}}
              />
            ) : null}

            <TextInput
              returnKeyType="done"
              style={{
                backgroundColor: '#F2F2F2',
                // fontFamily: 'ElliotSans-Regular',
                fontSize: 14,
                paddingLeft: 16,

                color: '#008B75',
                fontFamily: 'Poppins-Regular',
                width: '85%',
              }}
              value={userName}
              placeholderTextColor={'#9D9EB5'}
              onChangeText={text => {
                userErr && setUserErr('');
                setuserName(text);
              }}
              placeholder={'Username'}
            />
            {/* {right ? <RightIcon /> : null} */}
          </View>
        </View>
        <View style={{height: 10}} />
        <View>
          <Text style={styles.Namefields}>Password</Text>
          <View
            style={{
              backgroundColor: Colors.bgColor,
              borderRadius: 6,
              height: 50,
              borderColor: passErr ? 'red' : Colors.mainBtnscolor,
              // elevation: 2,
              borderWidth: user ? 0 : 0.5,
              // borderWidth: forgot ? inputFieldstyle : 1,
              paddingHorizontal: 14,
              alignItems: 'center',
              flexDirection: 'row',
              // ...style
            }}>
            {!user ? (
              <LockIcon
                color={Colors.mainBtnscolor}
                name={'locked'}
                size={18}
              />
            ) : null}

            <TextInput
              secureTextEntry
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
              value={password}
              placeholderTextColor={'#9D9EB5'}
              onChangeText={text => {
                passErr && setPassErr('');
                setpassword(text);
              }}
              placeholder={'Enter Password'}
            />
            {/* {right ? <RightIcon /> : null} */}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SubmitEmail')}
          style={{
            marginTop: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
            }}>
            Forgot password ?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerThree}>
        <Button
          title={'Next'}
          onPress={() => {
            setloading(true);

            if (userName && password) {
              login({username: userName, password}).then(res => {
                if (res) {
                  setloading(false);

                  logged(res)(dispatch);
                  // navigation.navigate('Drawer');
                } else {
                  setloading(false);
                  Alert.alert('Wrong Username or Password');
                }
              });
            } else {
              if (!userName && !password) {
                setUserErr('asdf');
                setPassErr('asdf');
              } else if (!userName) {
                setUserErr('asdf');
              } else if (!password) {
                setPassErr('asdf');
              }
            }
          }}
        />
        <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12}}>
              Don't have an account?{' '}
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: Colors.mainBtnscolor,
                  fontSize: 14,
                  //   marginTop: 10,
                }}>
                Sign Up
              </Text>{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  creatText: {
    fontSize: 18,
    // paddingVertical: 6,
    marginTop: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#0A0B47',
  },
  Namefields: {
    paddingVertical: 6,
    marginTop: 20,
    fontFamily: 'Poppins-Medium',
    marginBottom: 6,
    fontSize: 16,
    color: '#111111',
  },
  containerTwo: {
    flex: 4,
    // paddingHorizontal: 16,
    bottom: 40,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  containerThree: {
    flex: 1,
    // paddingHorizontal: 16,
    justifyContent: 'center',
    // backgroundColor: 'yellow',
  },
  accdetails: {
    // paddingVertical: 6,
    color: '#9B9EB5',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});
