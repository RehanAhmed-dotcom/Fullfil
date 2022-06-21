import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Button from '../components/Button';
import Colors from '../constants/colors';
import {CheckBox} from 'react-native-elements';
const Dataselection = ({navigation, route}) => {
  const [handleDatacheck, sethandleDatacheck] = useState([
    {
      id: 1,
      text: 'Data collection',
      check: false,
    },
    {
      id: 2,
      text: 'Get back in touch with cues of body',
      check: false,
    },
    {
      id: 3,
      text: 'Practice gratitude',
      check: false,
    },
    {
      id: 4,
      text: 'Improve relationship with food',
      check: false,
    },
    {
      id: 5,
      text: 'Improve body image',
      check: false,
    },
    {
      id: 6,
      text: 'Improve relationship with movement',
      check: false,
    },
    {
      id: 7,
      text: 'Not sure, just looking around',
      check: false,
    },
  ]);
  const [dataErr, setDataErr] = useState('');
  const {firName, lastName, eMail, userName, password, date} = route.params;
  // console.log('date of birth',date)
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icon_back.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginLeft: 16,
            }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: 'white',
      },
    });
  }, []);
  console.log('object', handleDatacheck);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.choiceText}>What are you using this app for ?</Text>
        <View style={{marginTop: -15}} />
        {handleDatacheck.map((item, index) => {
          return (
            <View style={styles.Checkcontainer}>
            <TouchableOpacity      
               onPress={() => {
                  const temphandleDatacheck = [...handleDatacheck];
                  temphandleDatacheck[index].check = !temphandleDatacheck[index]
                    .check;
                  dataErr && setDataErr('');
                  sethandleDatacheck(temphandleDatacheck);
                }} 
                
                style={styles.Checkcontainer}>


              <CheckBox
                checked={item.check}
                checkedColor={'#008B75'}
                uncheckedColor={dataErr ? 'red' : Colors.mainBtnscolor}
                onPress={() => {
                  const temphandleDatacheck = [...handleDatacheck];
                  temphandleDatacheck[index].check = !temphandleDatacheck[index]
                    .check;
                  dataErr && setDataErr('');
                  sethandleDatacheck(temphandleDatacheck);
                }}
              />
              <Text  style={styles.chekText}>{item.text}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title={'Next'}
          onPress={() => {
            // let i=0;
            // for (i; i < handleDatacheck.length; i++) {
            //   if (handleDatacheck[i].check === false) {
            //     setDataErr('asdf');
            //   } else {
            //     setDataErr('');
            //     navigation.navigate('MostEated');
            //   }
            // }
       
            const fIndex = handleDatacheck.findIndex(({check}) => check);
            fIndex > -1
              ? (setDataErr(''),
                navigation.navigate('MostEated', {
                  firName,
                  lastName,
                  eMail,
                  userName,
                  password,
                  date,
                  handleDatacheck,
                }))
              : setDataErr('asdf');
          }}
        />
      </View>
    </View>
  );
};

export default Dataselection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal: 16
    paddingTop: 40,
  },
  choiceText: {
    paddingHorizontal: 16,
    marginBottom: 20,
    width: 250,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  topContainer: {
    flex: 4,
    // backgroundColor: 'grey'
  },
  chekText: {
    fontSize: 14,
    color: '#0A0D47',
    fontFamily: 'Poppins-Medium',
  },
  bottomContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    paddingHorizontal: 16,
    justifyContent: 'center',
    // bottom: 0,
  },
  Checkcontainer: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    width: '100%',
    // marginTop: 30,
    // backgroundColor: 'green',
    alignItems: 'center',
  },
});
