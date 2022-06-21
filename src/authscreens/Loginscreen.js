import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import InputFields from '../components/inputFields';
import Button from '../components/Button';
import Colors from '../constants/colors';
import IconEmailIcon from 'react-native-vector-icons/Ionicons';
import LockIcon from 'react-native-vector-icons/Fontisto';
import {colors} from 'react-native-elements';
const Loginscreen = ({navigation, route}) => {
  const [userName, setuserName] = useState('');
  const [userErr, setUserErr] = useState('');
  const [password, setpassword] = useState('');
  const [passErr, setPassErr] = useState('');
  const [user, setUser] = useState(false);
  const {firName, lastName, eMail} = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            // elevation: 8,
            marginLeft: 12,
            borderRadius: 10,
            // backgroundColor: 'white',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icon_back.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              // resizeMode: 'contain',
              // marginLeft: 12,
            }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: 'white',
      },
    });
    Alert.alert(
      'Complete all steps before closing the app. Progress will not be saved.',
    );
  }, []);
  // console.log(firName, lastName, eMail);
  return (
    <View style={styles.container}>
      <View style={styles.containerTwo}>
        <Text style={styles.creatText}>Create login details</Text>
        {/* <Text style={styles.accdetails}>
          so you can directly login with these details
        </Text> */}
        <View>
          <Text style={styles.Namefields}>Create Username</Text>
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
              returnKeyType="done"
              secureTextEntry
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

        {passErr ? (
          <Text style={{marginTop: 6, color: 'red'}}>
            Password must be greater than six
          </Text>
        ) : null}
      </View>
      <View style={styles.containerThree}>
        <Button
          title={'Next'}
          onPress={() => {
            // if(password.length<6)
            if (userName && password.length > 6) {
              navigation.navigate('DOB', {
                userName,
                password,
                firName,
                lastName,
                eMail,
              });
            } else {
              if (!userName && !password) {
                setUserErr('asdf');
                setPassErr('asdf');
              } else if (!userName) {
                setUserErr('asdf');
              } else if (!password) {
                setPassErr('asdf');
              } else if (!password.length < 6) {
                setPassErr('asdf');
              }
            }
          }}
        />
      </View>
    </View>
  );
};

export default Loginscreen;

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
    // marginVertical: 40,
    backgroundColor: 'white',
  },
  containerThree: {
    flex: 1,
    // paddingHorizontal: 16,
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  accdetails: {
    // paddingVertical: 6,
    color: '#9B9EB5',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});
