import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Colors from '../constants/colors';
const inputFields = ({
  value,
  onChangeText,
  placeholder,
  LeftIcon,
  user = true,
}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.bgColor,
        borderRadius: 6,
        height: 50,
        borderColor: user ? Colors.mainBtnscolor : Colors.mainBtnscolor,
        // elevation: 2,
        borderWidth: user ? 0 : 0.3,
        // borderWidth: forgot ? inputFieldstyle : 1,
        paddingHorizontal: 14,
        alignItems: 'center',
        flexDirection: 'row',
        // ...style
      }}>
      {!user ? <LeftIcon /> : null}

      <TextInput
        style={{
          backgroundColor: Colors.bgColor,
          // fontFamily: 'ElliotSans-Regular',
          fontSize: 14,
          paddingLeft: 16,
          color: '#008B75',
          fontFamily: 'Poppins-Medium',
          width: '85%',
        }}
        value={value}
        placeholderTextColor={'#008B75'}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {/* {right ? <RightIcon /> : null} */}
    </View>
  );
};

export default inputFields;

const styles = StyleSheet.create({});
