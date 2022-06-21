import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Button from '../components/Button';
import Colors from '../constants/colors';
import {CheckBox} from 'react-native-elements';
import ModalBox from '../components/ModalBox';
import Modal from 'react-native-modal';
import {Card} from 'native-base';
const MostEated = ({navigation, route}) => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [handleEatedDatacheck, sethandleEatedDatacheck] = useState([
    {
      id: 1,
      text: 'Very familiar',
      check: false,
    },
    {
      id: 2,
      text: 'Somewhat familiar',
      check: false,
    },
    {
      id: 3,
      text: 'Newbie',
      check: false,
    },
  ]);
  const {firName, lastName, eMail, userName, password, date, handleDatacheck} =
    route.params;
  // const arr = navigation.getParams('handleDataCheck', []);
  const [dataErr, setDataErr] = useState('');
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
  const toggleModal = () => {
    setisModalVisible(!isModalVisible);
    navigation.navigate('FimiliarModal', {
      firName,
      lastName,
      eMail,
      userName,
      password,
      date,
      handleDatacheck,
      handleEatedDatacheck,
    });
  };
  console.log(handleDatacheck);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.choiceText}>
          How familiar are you with Inuitive Eating?
        </Text>
        <View style={{marginTop: 5}} />
        {handleEatedDatacheck.map((item, index) => {
          return (
            <View style={styles.Checkcontainer}>
              <TouchableOpacity
                onPress={() => {
                  const temphandleDatacheck = [...handleEatedDatacheck];
                  temphandleDatacheck[index].check =
                    !temphandleDatacheck[index].check;
                  dataErr && setDataErr('');
                  sethandleEatedDatacheck(temphandleDatacheck);

                  //modal box handling
                  // const modalchange = [...handleEatedDatacheck]
                  // modalchange[index].isModalVisible = true
                  // sethandleEatedDatacheck(modalchange)
                }}
                style={styles.Checkcontainer}>
                <CheckBox
                  checked={item.check}
                  checkedColor={'#008B75'}
                  uncheckedColor={dataErr ? 'red' : Colors.mainBtnscolor}
                  onPress={() => {
                    const temphandleDatacheck = [...handleEatedDatacheck];
                    temphandleDatacheck[index].check =
                      !temphandleDatacheck[index].check;
                    dataErr && setDataErr('');
                    sethandleEatedDatacheck(temphandleDatacheck);

                    //modal box handling
                    // const modalchange = [...handleEatedDatacheck]
                    // modalchange[index].isModalVisible = true
                    // sethandleEatedDatacheck(modalchange)
                  }}
                />
                <Text style={styles.chekText}>{item.text}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title={'Next'}
          style={{width: '100%'}}
          onPress={() => {
            const fIndex = handleEatedDatacheck.findIndex(({check}) => check);
            fIndex > -1
              ? (setDataErr(''), setisModalVisible(true))
              : setDataErr('asdf');
          }}
        />
      </View>

      <Modal isVisible={isModalVisible}>
        <Card style={{borderRadius: 6, paddingVertical: 12}}>
          <View style={{alignItems: 'center', paddingHorizontal: 16}}>
            <Image
              source={require('../assets/smiley.png')}
              style={{height: 100, width: 100, resizeMode: 'contain'}}
            />
            <Text
              style={{
                paddingVertical: 6,
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
                textAlign: 'center',
                color: '#0A0D47',
              }}>
              Awesome! If you need a review, you can click here.
            </Text>
          </View>
          <View style={{height: 14}} />
          <View style={{paddingHorizontal: 24, paddingVertical: 18}}>
            <Button title={'Learn More'} onPress={toggleModal} />
            <View style={{height: 20}} />
            <Button
              title={'Skip'}
              onPress={() => {
                setisModalVisible(false);
                navigation.navigate('HealthAssesment', {
                  firName,
                  lastName,
                  eMail,
                  userName,
                  password,
                  date,
                  handleDatacheck,
                  handleEatedDatacheck,
                });
              }}
              titlstyle={{color: Colors.mainBtnscolor}}
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: Colors.mainBtnscolor,
              }}
            />
          </View>
        </Card>
      </Modal>
    </View>
  );
};

export default MostEated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  topContainer: {
    flex: 4,
    // backgroundColor: 'grey',
  },
  choiceText: {
    paddingHorizontal: 16,
    // paddingVertical: 6,
    width: 300,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  chekText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#0A0D47',
  },
  bottomContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingBottom: 40,

    // // backgroundColor: 'blue',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  Checkcontainer: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    width: '100%',

    // backgroundColor: 'green',
    alignItems: 'center',
  },
});
