import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Keyboard,
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/colors';
import CameraIcon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import moment from 'moment';
import {contact} from '../../lib/api';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {update} from '../../redux/actions';
import {Alert} from 'react-native';
const ContactUs = ({navigation}) => {
  const {userData: user} = useSelector(({USER}) => USER);
  const dispatch = useDispatch();
  const [img, setImg] = useState('');

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [dob, setDob] = useState('');
  const [formatedDate, setFormatedDate] = useState('');
  const [date, setDate] = useState(Date.now());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Contact Us',
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
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {/* <View style={styles.topcontainer}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => pickImage()}>
              <ImageBackground
                borderRadius={50}
                source={
                  img ? {uri: img} : require('../../assets/placeholder.png')
                }
                style={{height: 100, width: 100, borderRadius: 50}}>
                <View style={styles.iconparent}>
                  <View style={{marginTop: '80%'}}>
                    <View style={styles.Iconview}>
                      <CameraIcon name={'camera'} size={15} color={'#fff'} />
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={styles.middlecontainer}>
          <View>
            <Text style={styles.Namestyle}>First Name</Text>
            <View style={styles.usernameView}>
              <TextInput
                returnKeyType="done"
                value={username}
                onChangeText={text => setUsername(text)}
                style={{
                  color: 'black',
                }}
              />
            </View>
            <Text style={styles.Namestyle}>Last Name</Text>
            <View style={styles.usernameView}>
              <TextInput
                returnKeyType="done"
                value={fullname}
                onChangeText={text => setFullname(text)}
                style={{
                  color: 'black',
                }}
              />
            </View>
            <Text style={styles.Namestyle}>Email</Text>
            <View style={styles.usernameView}>
              <TextInput
                returnKeyType="done"
                value={email}
                onChangeText={text => setEmail(text)}
                style={{
                  color: 'black',
                }}
              />
            </View>
            <Text style={styles.Namestyle}>Subject</Text>
            <View style={styles.usernameView}>
              <TextInput
                returnKeyType="done"
                value={phonenum}
                onChangeText={text => setPhonenum(text)}
                style={{
                  color: 'black',
                }}
              />
            </View>
            <Text style={styles.Namestyle}>Message</Text>
            <View
              style={{
                height: 100,
                borderRadius: 6,
                borderWidth: 0.5,
                paddingHorizontal: 6,
                borderColor: 'grey',
              }}>
              <TextInput
                returnKeyType="done"
                value={dob}
                onChangeText={text => setDob(text)}
                multiline
                numberOfLines={4}
                style={{
                  color: 'black',
                }}
              />
            </View>
            {/* <Text style={styles.Namestyle}>Date of Birth</Text> */}
            {/* <View style={styles.usernameView}> */}
            {/* <TouchableOpacity
              onPress={() => showDatePicker()}
              style={{
                height: 50,
                borderColor: '#ccc',
                borderWidth: 1,
                justifyContent: 'center',
                backgroundColor: '#fff',
                borderRadius: 15,
              }}>
              {/* <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                // minimumDate={new Date(currentY, currentM, currentD)}
              /> 
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                }}>
              </Text>
            </TouchableOpacity> */}
            {/* </View> */}
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <Button
            onPress={() => {
              contact({
                Auth: user.userdata.api_token,
                first_name: username,
                last_name: fullname,
                email,
                subject: phonenum,
                message: dob,
              }).then(res => {
                console.log('abc', res);
                if (res) {
                  if (res.status == 'success') {
                    Alert.alert('Message Send');
                  }
                } else {
                  Alert.alert('Something went wrong');
                }
              });
              //   const data1 = new FormData();
              //   {
              //     img != null &&
              //       data1.append('image', {
              //         uri: img,
              //         type: 'image/jpeg',
              //         name: 'image' + new Date() + '.jpg',
              //       });
              //   }
              //   // data1.append('', img);

              //   data1.append('username', username);
              //   data1.append('firstname', fullname);
              //   data1.append('email', email);
              //   data1.append('phoneno', phonenum);
              //   data1.append('dob', dob);
              //   editProfile(
              //     {
              //       Auth: user.userdata.api_token,
              //     },
              //     data1,
              //   ).then(res => {
              //     if (res) {
              //       update(res)(dispatch);
              //       navigation.goBack();
              //     } else {
              //       Alert.alert('Something went wrong');
              //     }
              //   });
              // navigation.goBack()
            }}
            title={'Send'}
          />
        </View>
        {keyboardStatus && <View style={{height: 200}} />}
      </ScrollView>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 16
  },
  usernameView: {
    height: 45,
    paddingHorizontal: 6,
    justifyContent: 'center',
    borderWidth: 0.5,
    // backgroundColor: 'red',
    borderRadius: 6,
    borderColor: 'grey',
  },
  Namestyle: {
    paddingVertical: 6,
    marginTop: 10,
    color: Colors.mainBtnscolor,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  iconparent: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
  },
  Iconview: {
    height: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    width: 30,
    backgroundColor: Colors.mainBtnscolor,
  },
  topcontainer: {
    flex: 0.5,
    backgroundColor: '#ECF6F4',
    paddingBottom: 10,
  },
  middlecontainer: {
    flex: 3,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  bottomcontainer: {
    flex: 1,
    paddingVertical: 10,
    // backgroundColor: 'yellow',
    paddingHorizontal: 16,
  },
});
