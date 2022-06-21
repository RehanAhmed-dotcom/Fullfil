import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';

const JournalDataEdit = ({route, navigation}) => {
  const {date, note, id, title} = route.params.item;

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: Colors.bgColor,
        elevation: 0,
      },
      headerTitleStyle: {
        fontFamily: 'Poppins-SemiBold',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icon_back.png')}
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UpdateJournal', {date, note, title, id})
          }>
          <Image
            source={require('../../assets/edit_icon.png')}
            style={{
              height: 25,
              width: 25,
              borderRadius: 10,
              resizeMode: 'contain',
              marginRight: 16,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  // console.log('My teXT', myText);
  return (
    <View style={styles.container}>
      <View style={{paddingVertical: 16}}>
        <Text
          style={{
            color: Colors.mainBtnscolor,
            fontSize: 18,
            fontFamily: 'Poppins-Medium',
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: '#8C8C8C',
            paddingVertical: 12,

            fontFamily: 'Poppins-Regular',
          }}>
          {date}
        </Text>
        <Text style={{fontFamily: 'Poppins-Medium', color: '#0A0D47'}}>
          {note}
        </Text>
      </View>
    </View>
  );
};

export default JournalDataEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
