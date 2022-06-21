// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
// import {useSelector} from 'react-redux';
import IconFacebook from 'react-native-vector-icons/Entypo';
import IconInstagrame from 'react-native-vector-icons/AntDesign';
import TwitterIcon from 'react-native-vector-icons/Entypo';
import Colors from '../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {logoutuser} from '../redux/actions';

const CustomSidebarMenu = ({props, navigation}) => {
  const dispatch = useDispatch();
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';
  const {userData: user} = useSelector(({USER}) => USER);
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <View style={styles.headerView}>
        <Image
          source={
            user.userdata.image
              ? {uri: user.userdata.image}
              : require('../assets/placeholder.png')
          }
          style={{...styles.sideMenuProfileIcon, marginTop: 5}}
        />
        <Text style={{fontSize: 14, top: 6, fontFamily: 'Poppins-Medium'}}>
          {user.userdata.username}
        </Text>
        <Text
          style={{
            fontSize: 14,
            paddingVertical: 10,
            color: '#555555',
            fontFamily: 'Poppins-Regular',
          }}>
          {user.userdata.email}
        </Text>
      </View>

      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <View style={{flex: 1, marginTop: -15}}>
          <DrawerItem
            label="My Profile"
            labelStyle={{
              color: 'black',
              fontFamily: 'Poppins-Medium',
              right: 10,
              // backgroundColor:'red'
            }}
            icon={() => (
              <Image
                source={require('../assets/my-profile_icon.png')}
                style={styles.DrawerIconstyle}
              />
            )}
            onPress={() => navigation.navigate('Myprofile')}
          />
          <DrawerItem
            label="Graphs (PRO)"
            labelStyle={{
              color: 'black',
              fontFamily: 'Poppins-Medium',
              right: 10,
            }}
            icon={() => (
              <Image
                source={require('../assets/graphs_icon.png')}
                style={styles.DrawerIconstyle}
              />
            )}
            onPress={() => navigation.navigate('Graphscreen')}
          />

          <DrawerItem
            label="Intuitive Eating"
            labelStyle={{
              color: 'black',
              fontFamily: 'Poppins-Medium',
              right: 10,
            }}
            icon={() => (
              <Image
                source={require('../assets/eating.png')}
                style={styles.DrawerIconstyle}
              />
            )}
            onPress={() => navigation.navigate('InuEating')}
          />
          <DrawerItem
            label="Grounding Techniques"
            labelStyle={{
              color: 'black',
              fontFamily: 'Poppins-Medium',
              right: 10,
            }}
            icon={() => (
              <Image
                source={require('../assets/grounding.png')}
                style={styles.DrawerIconstyle}
              />
            )}
            onPress={() => navigation.navigate('GroundingTech')}
          />
          <DrawerItem
            label="Hunger/Fullness Scale"
            labelStyle={{
              color: 'black',
              fontFamily: 'Poppins-Medium',
              right: 10,
            }}
            icon={() => (
              <Image
                source={require('../assets/fullnes.png')}
                style={styles.DrawerIconstyle}
              />
            )}
            onPress={() => navigation.navigate('Hunger')}
          />
          <DrawerItem
            label="Questionnaires (PRO)"
            labelStyle={{
              color: 'black',
              fontFamily: 'Poppins-Medium',
              right: 10,
            }}
            icon={() => (
              <Image
                source={require('../assets/questionnaires_icon.png')}
                style={styles.DrawerIconstyle}
              />
            )}
            onPress={() => navigation.navigate('Questioneer')}
          />
          <DrawerItem
            label="Reminders (PRO)"
            labelStyle={{
              color: 'black',
              fontFamily: 'Poppins-Medium',
              right: 10,
            }}
            icon={() => (
              <Image
                source={require('../assets/reminder_icon.png')}
                style={styles.DrawerIconstyle}
              />
            )}
            onPress={() => navigation.navigate('Reminder')}
          />

          <DrawerItem
            label="Support"
            labelStyle={{
              color: 'black',
              fontFamily: 'Poppins-Medium',
              right: 10,
            }}
            icon={() => (
              <Image
                source={require('../assets/support_icon.png')}
                style={styles.DrawerIconstyle}
              />
            )}
            onPress={() => navigation.navigate('ContactUs')}
          />
          <DrawerItem
            label="Invite Friends"
            labelStyle={{
              color: 'black',
              fontFamily: 'Poppins-Medium',
              right: 10,
            }}
            icon={() => (
              <Image
                source={require('../assets/frinds.png')}
                style={styles.DrawerIconstyle}
              />
            )}
            onPress={() => navigation.navigate('InviteFrinds')}
          />
          <DrawerItem
            label="Logout"
            labelStyle={{
              color: 'black',
              fontFamily: 'Poppins-Medium',
              right: 10,
            }}
            icon={() => (
              <IconInstagrame
                name="logout"
                size={20}
                color={Colors.mainBtnscolor}
              />
            )}
            onPress={() => logoutuser(false)(dispatch)}
          />
          {/* <DrawerItem
          label="Logout"
          labelStyle={{
            color: 'black',
            fontFamily: 'Poppins-Medium',
            right: 10,
          }}
          icon={() => (
            <IconInstagrame name="logout" size={18} color="red" />
            // <Image
            //  source={require('../assets/frinds.png')}
            //   style={styles.DrawerIconstyle}
            // />
          )}
          onPress={() => logoutuser(false)(dispatch)}
        /> */}

          <View
            style={{paddingHorizontal: 20, marginTop: 40, paddingBottom: 20}}>
            <Text style={{fontSize: 20, fontFamily: 'Poppins-Medium'}}>
              Follow Us
            </Text>
            <View style={styles.Iconparrent}>
              <IconFacebook
                onPress={() => Linking.openURL('https://www.facebook.com/')}
                name={'facebook-with-circle'}
                size={40}
                color={Colors.mainBtnscolor}
              />
              <TouchableOpacity
                onPress={() => Linking.openURL('http://www.instagram.com/')}
                style={styles.instagrameView}>
                <IconInstagrame name={'instagram'} size={22} color={'#fff'} />
              </TouchableOpacity>
              <TwitterIcon
                onPress={() => Linking.openURL('http://www.twitter.com/')}
                name={'twitter-with-circle'}
                size={40}
                color={Colors.mainBtnscolor}
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>

      {/* <Text
                style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: 'grey'
                }}>
                www.aboutreact.com
      </Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    // resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  DrawerIconstyle: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Iconparrent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    width: '80%',
  },
  instagrameView: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: Colors.mainBtnscolor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView: {
    // paddingTop: 32,
    // backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    color: 'grey',
    // backgroundColor:'green',
    // height:200
  },
});

export default CustomSidebarMenu;
