import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Button = ({title, onPress, style, titlstyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 50,
        backgroundColor: '#008B75',
        borderRadius: 10,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}>
      <Text
        style={{
          fontSize: 16,
          color: '#fff',
          ...titlstyle,
          fontFamily: 'Poppins-Medium',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
