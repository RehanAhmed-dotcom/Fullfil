import * as React from 'react';
import {Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Homescreen from '../../appscreens/Homescreen';
import Journalscreen from '../../appscreens/Journalscreen';
import Movescreen from '../../appscreens/Movement';
import Sleepscreen from '../../appscreens/Sleepscreen';
import Foodscreen from '../../appscreens/Foodscreen';
import ContactUs from '../../appscreens/Drawerscreens/ContactUs';
import Myprofile from '../../appscreens/Drawerscreens/Myprofile';
import Graphscreen from '../../appscreens/Drawerscreens/Graphscreen';
import HungerAndFullnes from '../../appscreens/Drawerscreens/HungerAndFullnes';
import InuEating from '../../appscreens/Drawerscreens/InuEating';
import Questioneer from '../../appscreens/Drawerscreens/Questioneer';
import BodyApreciationscale from '../../appscreens/Drawerscreens/BodyApreciationscale';
import BodyApreciationscaleHistory from '../../appscreens/Drawerscreens/BodyApreciationscaleHistory';
import dates from '../../appscreens/Drawerscreens/dates';
import historySleep from '../../appscreens/Drawerscreens/historySleep';
import BodyApreciationscaleTwo from '../../appscreens/Drawerscreens/BodyAppreciationscaleTwo';
import BodyApreciationscaleThree from '../../appscreens/Drawerscreens/BodyAppreciationThree';
import Inuativescale from '../../appscreens/Drawerscreens/Inuativescale';
import mental from '../../appscreens/Drawerscreens/mental';
import GroundingTech from '../../appscreens/Drawerscreens/GroundingTech';
import InuativescaleOne from '../../appscreens/Drawerscreens/InuaticescaleOne';
import InuativescaleTwo from '../../appscreens/Drawerscreens/InuativescaleTwo';
import InuativescaleThree from '../../appscreens/Drawerscreens/InuativescaleThree';
import InuativescaleFoure from '../../appscreens/Drawerscreens/InuativescaleFoure';
import Reminderscreen from '../../appscreens/Drawerscreens/Reminderscreen';
import Invitefriendsscreen from '../../appscreens/Drawerscreens/Invitefriendsscreen';
import Settingscreens from '../../appscreens/Drawerscreens/Settingscreens';
import AddNewReminder from '../../appscreens/Drawerscreens/AddNewReminder';
import Method from '../../appscreens/Drawerscreens/5-1Method';
import boxBreath from '../../appscreens/Drawerscreens/boxBreath';
import UpdateReminder from '../../appscreens/Drawerscreens/UpdateReminder';
import JournalDataEdit from '../../appscreens/Drawerscreens/JournalDataEdit';
import AddNewJournal from '../../appscreens/Drawerscreens/AddNewJournal';
import AddFoodscreen from '../../appscreens/Drawerscreens/AddFoodscreen';
import EditFoodscreen from '../../appscreens/Drawerscreens/EditFoodscreen';
import EditWater from '../../appscreens/Drawerscreens/EditWater';
import AddNewmovement from '../../appscreens/Drawerscreens/AddNewmovement';
import EditMoment from '../../appscreens/Drawerscreens/EditMoment';
import AddSleep from '../../appscreens/Drawerscreens/AddSleep';
import EditSleep from '../../appscreens/Drawerscreens/EditSleep';
import AddWater from '../../appscreens/Drawerscreens/AddWater';
import Editsleepscreen from '../../appscreens/Drawerscreens/Editsleepscreen';
import UpdateJournal from '../../appscreens/Drawerscreens/UpdateJournal';
import Mediascreen from '../../appscreens/Drawerscreens/Mediascreen';
import Paymentscreen from '../../appscreens/Drawerscreens/Paymentscreen';
import chosePlan from '../../appscreens/Drawerscreens/chosePlan';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Colors from '../../constants/colors';
const Tab = createBottomTabNavigator();
const Home = createStackNavigator();
const Move = createStackNavigator();
const Food = createStackNavigator();
const Journal = createStackNavigator();
const Slept = createStackNavigator();
const Homestack = () => (
  <Home.Navigator>
    <Home.Screen name={'Home'} component={Homescreen} />
    <Home.Screen name="Myprofile" component={Myprofile} />
    <Home.Screen name="ContactUs" component={ContactUs} />
    <Home.Screen name="Graphscreen" component={Graphscreen} />
    <Home.Screen name="Hunger" component={HungerAndFullnes} />
    <Home.Screen name="GroundingTech" component={GroundingTech} />
    <Home.Screen name="InuEating" component={InuEating} />
    <Home.Screen name="Questioneer" component={Questioneer} />
    <Home.Screen name="BodyApreciationscale" component={BodyApreciationscale} />
    <Home.Screen
      name="BodyApreciationscaleHistory"
      component={BodyApreciationscaleHistory}
    />
    <Home.Screen name="dates" component={dates} />

    <Home.Screen
      name="BodyApreciationscaleTwo"
      component={BodyApreciationscaleTwo}
    />
    <Home.Screen
      name="BodyApreciationscaleThree"
      component={BodyApreciationscaleThree}
    />
    <Home.Screen name="Inuativescale" component={Inuativescale} />
    <Home.Screen name="mental" component={mental} />
    <Home.Screen name="InuativescaleOne" component={InuativescaleOne} />
    <Home.Screen name="InuativescaleTwo" component={InuativescaleTwo} />
    <Home.Screen name="InuativescaleThree" component={InuativescaleThree} />
    <Home.Screen name="InuativescaleFoure" component={InuativescaleFoure} />
    <Home.Screen name="InviteFrinds" component={Invitefriendsscreen} />
    <Home.Screen name="Reminder" component={Reminderscreen} />
    <Home.Screen name="Setting" component={Settingscreens} />
    <Home.Screen name="AddNewReminder" component={AddNewReminder} />
    <Home.Screen name="Method" component={Method} />
    <Home.Screen name="boxBreath" component={boxBreath} />
    <Home.Screen name="UpdateReminder" component={UpdateReminder} />
    <Home.Screen name="Mediascreen" component={Mediascreen} />
    <Home.Screen name="Paymentscreen" component={Paymentscreen} />
    <Home.Screen name="chosePlan" component={chosePlan} />
  </Home.Navigator>
);
const Movestack = () => (
  <Move.Navigator>
    <Move.Screen name={'Move'} component={Movescreen} />
    <Move.Screen name={'AddNewmovement'} component={AddNewmovement} />
    <Move.Screen name={'EditMoment'} component={EditMoment} />
  </Move.Navigator>
);
const Foodstack = () => (
  <Food.Navigator>
    <Food.Screen name={'Food'} component={Foodscreen} />
    <Food.Screen name={'AddFood'} component={AddFoodscreen} />
    <Food.Screen name={'AddWater'} component={AddWater} />
    <Food.Screen name={'EditFoodscreen'} component={EditFoodscreen} />
    <Food.Screen name={'EditWater'} component={EditWater} />
    <Food.Screen name="Hungers" component={HungerAndFullnes} />
  </Food.Navigator>
);

const Journalstack = () => (
  <Journal.Navigator>
    <Journal.Screen name={'Journal'} component={Journalscreen} />
    <Journal.Screen name="JournalDataEdit" component={JournalDataEdit} />
    <Journal.Screen name="AddNewJournal" component={AddNewJournal} />
    <Journal.Screen name="UpdateJournal" component={UpdateJournal} />
  </Journal.Navigator>
);

const Sleptstack = () => (
  <Slept.Navigator>
    <Slept.Screen name={'Slept'} component={Sleepscreen} />
    <Slept.Screen name={'Editsleepscreen'} component={Editsleepscreen} />
    <Slept.Screen name="AddSleep" component={AddSleep} />
    <Slept.Screen name="EditSleep" component={EditSleep} />

    <Slept.Screen name="historySleep" component={historySleep} />
  </Slept.Navigator>
);
const _BottomIndx = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          // height: Platform.OS === 'ios' ? 80 : 60
        },
        activeTintColor: Colors.mainBtnscolor,
        inactiveTintColor: Colors.GreyText,
        labelStyle: {
          fontSize: 12,
          marginLeft: 6,
          fontFamily: 'Poppins-SemiBold',
          paddingVertical: 4,
          // paddingHorizontal: 12
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Homestack}
        options={({route}) => ({
          tabBarLabel: 'Home',

          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/home_icon.png')}
                style={{
                  height: 20,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  width: 20,
                  resizeMode: 'contain',
                  left: 4,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/home_icon_grey.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  resizeMode: 'contain',
                }}
              />
            ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Myprofile') {
              return false;
            } else if (routeName === 'Graphscreen') {
              return false;
            } else if (routeName === 'Hunger') {
              return false;
            } else if (routeName === 'InuEating') {
              return false;
            } else if (routeName === 'GroundingTech') {
              return false;
            } else if (routeName === 'Questioneer') {
              return false;
            } else if (routeName === 'BodyApreciationscale') {
              return false;
            } else if (routeName === 'BodyApreciationscaleHistory') {
              return false;
            } else if (routeName === 'dates') {
              return false;
            } else if (routeName === 'historySleep') {
              return false;
            } else if (routeName === 'BodyApreciationscaleTwo') {
              return false;
            } else if (routeName === 'BodyApreciationscaleThree') {
              return false;
            } else if (routeName === 'Inuativescale') {
              return false;
            } else if (routeName === 'mental') {
              return false;
            } else if (routeName === 'InuativescaleOne') {
              return false;
            } else if (routeName === 'InuativescaleTwo') {
              return false;
            } else if (routeName === 'InuativescaleThree') {
              return false;
            } else if (routeName === 'InuativescaleFoure') {
              return false;
            } else if (routeName === 'InviteFrinds') {
              return false;
            } else if (routeName === 'Setting') {
              return false;
            } else if (routeName === 'Reminder') {
              return false;
            } else if (routeName === 'AddNewReminder') {
              return false;
            } else if (routeName === 'Method') {
              return false;
            } else if (routeName === 'boxBreath') {
              return false;
            } else if (routeName === 'Mediascreen') {
              return false;
            } else if (routeName === 'Paymentscreen') {
              return false;
            } else if (routeName === 'chosePlan') {
              return false;
            }
            return true;
          })(route),
        })}
      />
      <Tab.Screen
        name="Journal"
        component={Journalstack}
        options={({route}) => ({
          tabBarLabel: 'Journal',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/notes_icon_active.png')}
                style={{
                  height: 20,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  width: 20,
                  resizeMode: 'contain',
                  left: 4,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/notes_icon.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  resizeMode: 'contain',
                }}
              />
            ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'JournalDataEdit') {
              return false;
            } else if (routeName === 'AddNewJournal') {
              return false;
            }
            return true;
          })(route),
        })}
      />
      <Tab.Screen
        name="Food"
        component={Foodstack}
        options={({route}) => ({
          tabBarLabel: 'Food',

          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/restaurant_icon_active.png')}
                style={{
                  height: 20,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  width: 20,
                  resizeMode: 'contain',
                  left: 4,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/restaurant_icon.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  resizeMode: 'contain',
                }}
              />
            ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'AddFood') {
              return false;
            } else if (routeName === 'AddWater') {
              return false;
            } else if (routeName === 'EditFoodscreen') {
              return false;
            } else if (routeName === 'EditWater') {
              return false;
            }
            return true;
          })(route),
        })}
      />
      <Tab.Screen
        name="Move"
        component={Movestack}
        options={({route}) => ({
          tabBarLabel: 'Movement',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/movement_icon_active.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  resizeMode: 'contain',
                  left: 4,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/movement_icon.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  resizeMode: 'contain',
                }}
              />
            ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'AddNewmovement') {
              return false;
            }
            if (routeName === 'EditMoment') {
              return false;
            }
            return true;
          })(route),
        })}
      />
      {/*  */}
      <Tab.Screen
        name="Slept"
        component={Sleptstack}
        options={({route}) => ({
          tabBarLabel: 'Sleep',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/sleep_icon_active.png')}
                style={{
                  height: 20,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  width: 20,
                  resizeMode: 'contain',
                  left: 4,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/sleep_icon.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  resizeMode: 'contain',
                }}
              />
            ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Editsleepscreen') {
              return false;
            } else if (routeName === 'AddSleep') {
              return false;
            } else if (routeName === 'EditSleep') {
              return false;
            }
            return true;
          })(route),
        })}
      />
    </Tab.Navigator>
  );
};

export default _BottomIndx;
