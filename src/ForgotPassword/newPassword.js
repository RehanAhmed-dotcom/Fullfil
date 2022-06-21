import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {resetPassword} from '../lib/api';
const NewPassword = ({navigation, route}) => {
  const {email, token} = route.params;
  const [password, setPassword] = useState('');
  const [passErr, setPassErr] = useState('');
  const [conPassErr, setConPassErr] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 56,
          backgroundColor: 'white',
          //   elevation: 3,
          // borderBottomColor: '#ccc',
          // borderBottomWidth: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          // paddingHorizontal: 15,
        }}>
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
        <View>
          {/* <Text
            style={{
              // marginLeft: 20,
              fontFamily: 'Boiling-BlackDemo',
              fontSize: 20,
              //   fontWeight: 'bold',
            }}>
            Baboosh
          </Text> */}
        </View>
        <View style={{width: 20}}></View>
      </View>
      <View
        style={{
          marginHorizontal: 15,
          paddingVertical: 30,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}>
        <Text
          style={{
            fontSize: 22,
            // fontFamily: 'Boiling-BlackDemo',
            paddingBottom: 50,
          }}>
          New Password:
        </Text>
      </View>
      <View style={{width: wp(100), alignItems: 'center'}}>
        <View
          style={{
            height: hp(7),
            width: '90%',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            justifyContent: 'center',
            marginTop: hp(10),
            borderColor: passErr ? 'red' : '#ccc',
          }}>
          <TextInput
            secureTextEntry
            returnKeyType="done"
            value={password}
            onChangeText={pass => {
              passErr && setPassErr('');
              setPassword(pass);
            }}
            placeholder="Enter New Password:"
            style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}
          />
        </View>
        <View
          style={{
            height: hp(7),
            width: '90%',
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 20,
            borderColor: conPassErr ? 'red' : '#ccc',
          }}>
          <TextInput
            secureTextEntry
            value={password_confirmation}
            returnKeyType="done"
            onChangeText={pass => {
              conPassErr && setConPassErr('');
              setPassword_confirmation(pass);
            }}
            placeholder="ReEnter New Password:"
            style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}
          />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            if (password.length >= 6 && password_confirmation.length >= 6) {
              if (password != password_confirmation) {
                setPassErr('sad');
                setConPassErr('sad');
              } else if (password.length < 6) {
                Alert.alert('Password must be greater then 5 characters');
              } else {
                resetPassword({
                  email,
                  token,
                  password,
                  password_confirmation,
                }).then(res => {
                  console.log('res', res);
                  if (res.status == 'success') {
                    navigation.navigate('Login');
                  } else {
                    Alert.alert('Something went wrong');
                  }
                });
              }
            } else {
              if (!password && !password_confirmation) {
                setPassErr('sdf');
                setConPassErr('sd');
              } else if (!password) {
                setPassErr('ds');
              } else if (!password_confirmation) {
                setConPassErr('sdf');
              }
            }
            // navigation.navigate('PROFILE');
            // if (validateEmail(email)) {
            //   forgotMail({email}).then(responce => {
            //     console.log('rss', responce);
            //     if (responce) {
            //       navigation.navigate('EnterCode', {email});
            //     }
            //   });
            //   //
            // } else {
            //   setEmailErr('ask');
            // }
          }}
          style={{
            height: hp(7),
            borderRadius: 10,
            paddingHorizontal: 30,
            marginTop: hp(10),
            width: wp(90),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#008B75',
            elevation: 4,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontFamily: 'Poppins-Regular',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default NewPassword;
