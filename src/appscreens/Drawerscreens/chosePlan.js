import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/colors';
import Button from '../../components/Button';
import CheckBox from '@react-native-community/checkbox';
const chosePlan = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: Colors.mainBtnscolor,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginLeft: 16,
              backgroundColor: Colors.mainBtnscolor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="cross" color="white" size={20} />
          </View>
          {/* <Image
            source={require('../../assets/icon_back.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginLeft: 16,
            }}
          /> */}
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Mediascreen')}>
          <Text style={{marginRight: 16, color: 'grey'}}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.screenBgColor,
      },
    });
    // navigation.setOptions({
    //   title: '',
    //   headerStyle: {
    //     backgroundColor: Colors.screenBgColor,
    //     elevation: 0,
    //   },
    //   headerLeft: () => (
    //     <TouchableOpacity onPress={() => navigation.openDrawer()}>
    //       <Image
    //         source={require('../../assets/menu_icon.png')}
    //         style={{
    //           height: 30,
    //           width: 30,
    //           borderRadius: 10,
    //           marginLeft: 16,
    //         }}
    //       />
    //     </TouchableOpacity>
    //   ),
    //   headerRight: () => (
    //     <TouchableOpacity onPress={() => navigation.navigate('Mediascreen')}>
    //       <Image
    //         source={require('../../assets/music_icon.png')}
    //         style={{
    //           height: 30,
    //           width: 30,
    //           borderRadius: 10,
    //           marginRight: 16,
    //         }}
    //       />
    //     </TouchableOpacity>
    //   ),
    // });
  }, []);
  return (
    <ScrollView>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text
          style={{marginTop: 30, fontSize: 24, fontFamily: 'Poppins-Medium'}}>
          Choose Plan
        </Text>
        <View
          style={{
            //   alignContent: 'center',
            //   alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            height: 100,
            width: 100,
            marginTop: 20,
            borderRadius: 20,
          }}>
          <Icon1 name="star" color={Colors.mainBtnscolor} size={50} />
        </View>
        <View style={{width: '90%', marginTop: 20}}>
          <Text style={{color: 'grey', fontFamily: 'Poppins-Regular'}}>
            Gain access to all of the premium content we offer such as
            affirmation cards, Feel Good Dietitian On Demand and trend
            identifying graphs.
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            backgroundColor: 'white',
            flexDirection: 'row',
            borderRadius: 10,
            width: '90%',
            height: 60,
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'grey',
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
            }}>
            Not sure yet? Continue with basic access
          </Text>
          <Switch
            trackColor={{false: 'red', true: '#ccc'}}
            thumbColor={isEnabled ? Colors.mainBtnscolor : 'grey'}
            //   ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setIsEnabled(!isEnabled);
              // toggleCheckBox && setToggleCheckBox();
            }}
            value={isEnabled}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 5,
            borderRadius: 20,
            marginTop: 40,
            left: 30,
            top: 10,
            zIndex: 2,
            opacity: isEnabled ? 0.5 : 1,
            backgroundColor: Colors.mainBtnscolor,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: 10,
            }}>
            Upgrade To Premium - Save 38%
          </Text>
        </View>
        <View
          style={{
            //   marginTop: 20,
            alignItems: 'center',
            backgroundColor: 'white',
            flexDirection: 'row',
            borderRadius: 10,
            width: '90%',
            borderWidth: 1,
            opacity: isEnabled ? 0.5 : 1,
            borderColor: toggleCheckBox ? Colors.mainBtnscolor : 'white',
            height: 50,
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
            }}>
            1 year - $35.99 (only $2.99/month)
          </Text>
          <CheckBox
            tintColor={Colors.mainBtnscolor}
            onCheckColor={'white'}
            onTintColor={Colors.mainBtnscolor}
            onFillColor={Colors.mainBtnscolor}
            disabled={isEnabled ? true : false}
            value={toggleCheckBox}
            onValueChange={newValue => {
              setToggleCheckBox(newValue);
              toggleCheckBox1 && setToggleCheckBox1(false);
            }}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            backgroundColor: 'white',
            flexDirection: 'row',
            borderRadius: 10,
            width: '90%',
            borderWidth: 1,
            opacity: isEnabled ? 0.5 : 1,
            borderColor: toggleCheckBox1 ? Colors.mainBtnscolor : 'white',
            height: 50,
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
            }}>
            1 month - $4.99
          </Text>
          <CheckBox
            tintColor={Colors.mainBtnscolor}
            onCheckColor={'white'}
            onTintColor={Colors.mainBtnscolor}
            onFillColor={Colors.mainBtnscolor}
            disabled={isEnabled ? true : false}
            value={toggleCheckBox1}
            onValueChange={newValue => {
              setToggleCheckBox1(newValue);
              toggleCheckBox && setToggleCheckBox(false);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            marginTop: 20,
            alignItems: 'center',
            backgroundColor: Colors.mainBtnscolor,
            flexDirection: 'row',
            borderRadius: 10,
            marginBottom: 10,
            width: '90%',
            // borderWidth: 1,
            // opacity: isEnabled ? 0.5 : 1,
            // borderColor: toggleCheckBox1 ? Colors.mainBtnscolor : 'white',
            height: 50,
            paddingHorizontal: 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              // ...titlstyle,
              fontFamily: 'Poppins-Medium',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
        {/* <Button
        title={'Feel Good Flash Cards'}
        onPress={() => navigation.navigate('Affirmation')}
      /> */}
      </View>
    </ScrollView>
  );
};
export default chosePlan;
