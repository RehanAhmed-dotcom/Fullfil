import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {forgotMail} from '../lib/api';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {forgotMail} from '../../lib/api';
const SubmitEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const validateEmail = emailC => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <View
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
        }}> */}
      <TouchableOpacity
        style={{
          // elevation: 8,
          marginLeft: 12,
          borderRadius: 10,
          // backgroundColor: 'white',
          marginTop: Platform.OS === 'ios' ? 60 : 0,
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
      <View></View>
      <View style={{width: 20}}></View>
      {/* </View> */}
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
            fontFamily: 'Poppins-Bold',
            paddingBottom: 50,
          }}>
          Forgot Password:
        </Text>
      </View>
      <View style={{paddingHorizontal: 15, marginTop: 20}}>
        <Text style={{fontSize: 12, fontFamily: 'Poppins-Regular'}}>
          Enter your email to reset your Password
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
            marginTop: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: emailErr ? 'red' : '#ccc',
          }}>
          <TextInput
            returnKeyType="done"
            placeholder="Enter Your Email"
            value={email}
            onChangeText={mail => {
              emailErr && setEmailErr('');
              setEmail(mail);
            }}
            style={{fontSize: 14, flex: 1, fontFamily: 'Poppins-Medium'}}
          />
          {email !== '' && validateEmail(email) === true && (
            <Icon name="checkcircle" style={{color: '#008B75'}} size={20} />
          )}
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            if (validateEmail(email)) {
              forgotMail({email}).then(res => {
                if (res) {
                  navigation.navigate('EnterCode', {email});
                } else {
                  Alert.alert('Something went Wrong');
                }
              });
            } else {
              setEmailErr('ask');
            }
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
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SubmitEmail;
