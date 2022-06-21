import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import {Card, Left, Right} from 'native-base';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logoutuser} from '../../redux/actions';
import Colors from '../../constants/colors';
const Settingscreens = ({navigation}) => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled1, setIsEnabled1] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [isEnabled3, setIsEnabled3] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
  useEffect(() => {
    navigation.setOptions({
      title: 'Settings',
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
      // headerRight: () => (
      //     <Text style={{ marginRight: 16, fontSize: 16, color: Colors.mainBtnscolor }}>Cancel</Text>
      // ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text
          style={{marginTop: 10, fontSize: 14, fontFamily: 'Poppins-SemiBold'}}>
          Notification Settings
        </Text>
        <Card
          style={{
            // backgroundColor: 'red',
            marginTop: 10,
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Left style={{flex: 3}}>
              <Text style={styles.pushText}>Push Notification</Text>
              <Text style={styles.reciveNotification}>
                Recieve push notification
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{false: 'grey', true: Colors.physicalcolors}}
                thumbColor={isEnabled ? Colors.mainBtnscolor : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </Right>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 12}}>
            <Left style={{flex: 3}}>
              <Text style={styles.pushText}>Email Notification</Text>
              <Text numberOfLines={1} style={styles.reciveNotification}>
                Recieve email notification
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{false: 'grey', true: Colors.physicalcolors}}
                thumbColor={isEnabled1 ? Colors.mainBtnscolor : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch1}
                value={isEnabled1}
              />
            </Right>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 12}}>
            <Left style={{flex: 3}}>
              <Text style={styles.pushText}>Notification Sound</Text>
              <Text numberOfLines={1} style={styles.reciveNotification}>
                Enable or disable sound in application
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{false: 'grey', true: Colors.physicalcolors}}
                thumbColor={isEnabled2 ? Colors.mainBtnscolor : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={isEnabled2}
              />
            </Right>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 12}}>
            <Left style={{flex: 3}}>
              <Text style={styles.pushText}>Vibrations</Text>
              <Text numberOfLines={1} style={styles.reciveNotification}>
                Enable or disable vibration in application
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{false: 'grey', true: Colors.physicalcolors}}
                thumbColor={isEnabled3 ? Colors.mainBtnscolor : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch3}
                value={isEnabled3}
              />
            </Right>
          </View>
        </Card>
      </View>
      <View style={styles.BtmView}>
        <Button title={'Logout'} onPress={() => logoutuser(false)(dispatch)} />
      </View>
    </View>
  );
};

export default Settingscreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    flex: 5,
    paddingTop: 12,
    // backgroundColor: 'red',
    paddingHorizontal: 16,
  },
  reciveNotification: {
    fontSize: 14,
    paddingVertical: 4,
    fontFamily: 'Poppins-Regular',
    color: '#8C8C8C',
  },
  BtmView: {
    flex: 1,
    paddingHorizontal: 16,
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  pushText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});
