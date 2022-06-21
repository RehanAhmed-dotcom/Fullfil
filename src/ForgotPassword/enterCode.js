import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {verifyPin} from '../lib/api';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
// import {verifyPin} from '../../lib/api';
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 20},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#008B75',
    borderBottomWidth: 1,
  },
  cellRoot2: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
  cellRoot1: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#797979',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#008B75',
    fontSize: 25,
    textAlign: 'center',
    // fontFamily: 'Nunito-SemiBold',
  },
});
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const EnterCode = ({navigation, route}) => {
  const CELL_COUNT = 4;
  const {email} = route.params;
  const ref = useBlurOnFulfill({token, cellCount: CELL_COUNT});
  const [token, setValue] = useState('');
  const [valueErr, setValueErr] = useState('');
  const [codeErr, setCodeErr] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    token,
    setValue,
  });
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
           
            marginTop:Platform.OS==='ios'?80:0
          }}
          onPress={() => navigation.goBack()}
          
          >
          <Image
              
            source={require('../assets/icon_back.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              // resizeMode: 'contain',
              // marginLeft: 12,
            // marginTop:Platform.OS==='ios'?80:0
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
            // fontFamily: 'Boiling-BlackDemo',
            paddingBottom: 50,
          }}>
          Confirmation Code
        </Text>
        <Text style={{fontSize: 12,}}>
          We've send a confirmation code to the given mail
        </Text>
      </View>
      <View style={{paddingHorizontal: 15, marginTop: 20}}>
        <Text style={{fontSize: 12}}>
          Please enter your Verification Code
        </Text>
      </View>
      <View style={{paddingHorizontal: 40, marginVertical: 10}}>
        <CodeField
          ref={ref}
          {...props}
          value={token}
          onChangeText={text => {
            valueErr && setValueErr('');
            setValue(text);
          }}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[
                symbol
                  ? styles.cellRoot
                  : valueErr
                  ? styles.cellRoot2
                  : styles.cellRoot1,
                isFocused && styles.focusCell,
              ]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('NewPassword');
            if (token) {
              verifyPin({token}).then(responce => {
                if (responce.status == 'error') {
                  Alert.alert('Wrong Code entered');
                } else if (responce.status == 'success') {
                  navigation.navigate('NewPassword', {email, token});
                }
              });
              //   // navigation.navigate('NewPassword');
            } else {
              setValueErr('ask');
            }
          }}
          style={{
            height: hp(7),
            borderRadius: 10,
            paddingHorizontal: 30,
            marginTop: 20,
            width: wp(90),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#008B75',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              // fontFamily: 'HelveticaNeue-Regular',
            }}>
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EnterCode;
